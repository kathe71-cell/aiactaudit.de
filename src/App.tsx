import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { StickyBar } from './components/StickyBar';
import { ScrollToTop } from './components/ScrollToTop';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { AuditCheckPage } from './pages/AuditCheckPage';
import { MatrixPage } from './pages/MatrixPage';
import { TimelinePage } from './pages/TimelinePage';
import { ImpressumPage } from './pages/ImpressumPage';
import { DatenschutzPage } from './pages/DatenschutzPage';
import { RechnerEmbed } from './pages/RechnerEmbed';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

export const App: React.FC<{ initialPath?: string }> = ({ initialPath }) => {
  // Normalize initial path
  const getInitialPath = () => {
    const path = initialPath || (typeof window !== 'undefined' ? window.location.pathname : '/');
    const search = typeof window !== 'undefined' ? window.location.search : '';
    if (path.startsWith('/audit-check')) return `/audit-check${search}`;
    if (path.startsWith('/hochrisiko-matrix')) return '/hochrisiko-matrix';
    if (path.startsWith('/fristen-guide')) return '/fristen-guide';
    if (path.startsWith('/impressum')) return '/impressum';
    if (path.startsWith('/datenschutz')) return '/datenschutz';
    if (path.startsWith('/rechner-embed')) return '/rechner-embed';
    
    // Hash fallback
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    if (hash === '#audit-check') return '/audit-check';
    if (hash === '#hochrisiko-matrix') return '/hochrisiko-matrix';
    if (hash === '#fristen-guide') return '/fristen-guide';
    if (hash === '#impressum') return '/impressum';
    if (hash === '#datenschutz') return '/datenschutz';
    if (hash === '#rechner-embed') return '/rechner-embed';

    return '/';
  };

  // Check initial URL query parameters directly (e.g. ?q=bussgeld for Schema.org SearchAction)
  const getInitialSearchQuery = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('q') || '';
    }
    return '';
  };

  const initialSearchQ = getInitialSearchQuery();
  const [currentPath, setCurrentPath] = useState<string>(getInitialPath());
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(Boolean(initialSearchQ));
  const [searchInitialQuery, setSearchInitialQuery] = useState<string>(initialSearchQ);

  // Global keyboard shortcut: Cmd+K or Ctrl+K or '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if already typing in an input or textarea
      const activeTag = document.activeElement?.tagName.toLowerCase();
      const isInput = activeTag === 'input' || activeTag === 'textarea';

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === '/' && !isInput) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getInitialPath());
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    // Track SPA route changes in Vercel Analytics and update dynamic Document Title & Canonical
    if (typeof window !== 'undefined') {
      const w = window as unknown as { va?: (event: string, data: { route: string }) => void };
      if (w.va) {
        w.va('pageview', { route: currentPath });
      }

      // Dynamic Title & Canonical per route
      const cleanPath = currentPath.split('?')[0].split('#')[0];
      const titles: Record<string, string> = {
        '/': 'AI Act Audit – EU KI-Verordnung Konformitäts- & Regulatory Intelligence Portal',
        '/audit-check': 'Audit-Readiness Check & Risikoklassifizierung – AI Act Audit',
        '/hochrisiko-matrix': 'Hochrisiko-Matrix & Pflichtenkatalog (Art. 6, Anhang III) – AI Act Audit',
        '/fristen-guide': 'Fristen-Guide & Meilensteine (2025–2027) – AI Act Audit',
        '/impressum': 'Impressum – AI Act Audit',
        '/datenschutz': 'Datenschutzerklärung – AI Act Audit',
      };

      document.title = titles[cleanPath] || 'AI Act Audit – EU KI-Verordnung Konformitäts-Portal';

      // Update Canonical Link
      let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      const canonicalUrl = cleanPath === '/' 
        ? 'https://www.aiactaudit.de/' 
        : `https://www.aiactaudit.de${cleanPath}`;
      canonicalLink.setAttribute('href', canonicalUrl);
    }
  }, [currentPath]);

  // Auto-scroll clicked interactive cards/accordions into comfortable viewport view
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find closest interactive card, article, or accordion item
      const container = target.closest<HTMLElement>(
        'article, details, .accordion-item, .clickable-card'
      );

      if (container) {
        // Skip sticky bars, scroll to top buttons, navigation links, and full page CTAs
        if (container.closest('header, aside, .fixed, nav, [data-no-autoscroll="true"]')) return;

        setTimeout(() => {
          const rect = container.getBoundingClientRect();
          const headerOffset = 90; // Header height
          if (rect.top < headerOffset || rect.bottom > window.innerHeight) {
            const elementPosition = rect.top + window.scrollY;
            const offsetPosition = Math.max(0, elementPosition - headerOffset - 16);
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
          }
        }, 120);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  const navigate = useCallback((path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);

    if (path.includes('#')) {
      const targetId = path.split('#')[1];
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const headerOffset = 90;
          const elementPosition = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: Math.max(0, elementPosition - headerOffset),
            behavior: 'smooth'
          });
        }
      }, 50);
    } else {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, []);

  const basePath = currentPath.split('?')[0].split('#')[0];

  if (basePath === '/rechner-embed') {
    return (
      <>
        <RechnerEmbed />
        <Analytics />
        <SpeedInsights />
      </>
    );
  }

  const renderPage = () => {
    switch (basePath) {
      case '/audit-check':
        return <AuditCheckPage navigate={navigate} currentPath={currentPath} />;
      case '/hochrisiko-matrix':
        return <MatrixPage navigate={navigate} />;
      case '/fristen-guide':
        return <TimelinePage navigate={navigate} />;
      case '/impressum':
        return <ImpressumPage navigate={navigate} />;
      case '/datenschutz':
        return <DatenschutzPage navigate={navigate} />;
      case '/':
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-200 selection:text-emerald-950 font-sans">
      <Header
        currentPath={currentPath}
        navigate={navigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
      
      <div className="flex-1">
        {renderPage()}
      </div>

      <Footer navigate={navigate} />
      <StickyBar navigate={navigate} currentPath={currentPath} />
      <ScrollToTop />
      
      {/* Full-Text Search Overlay Modal (⌘K) */}
      {isSearchOpen && (
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => {
            setIsSearchOpen(false);
            setSearchInitialQuery('');
          }}
          navigate={navigate}
          initialQuery={searchInitialQuery}
        />
      )}

      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default App;
