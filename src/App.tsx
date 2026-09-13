import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { StickyBar } from './components/StickyBar';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { AuditCheckPage } from './pages/AuditCheckPage';
import { MatrixPage } from './pages/MatrixPage';
import { TimelinePage } from './pages/TimelinePage';
import { ImpressumPage } from './pages/ImpressumPage';
import { DatenschutzPage } from './pages/DatenschutzPage';
import { RechnerEmbed } from './pages/RechnerEmbed';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

export const App: React.FC = () => {
  // Normalize initial path
  const getInitialPath = () => {
    const path = window.location.pathname;
    if (path.startsWith('/audit-check')) return '/audit-check';
    if (path.startsWith('/hochrisiko-matrix')) return '/hochrisiko-matrix';
    if (path.startsWith('/fristen-guide')) return '/fristen-guide';
    if (path.startsWith('/impressum')) return '/impressum';
    if (path.startsWith('/datenschutz')) return '/datenschutz';
    if (path.startsWith('/rechner-embed')) return '/rechner-embed';
    
    // Hash fallback
    const hash = window.location.hash;
    if (hash === '#audit-check') return '/audit-check';
    if (hash === '#hochrisiko-matrix') return '/hochrisiko-matrix';
    if (hash === '#fristen-guide') return '/fristen-guide';
    if (hash === '#impressum') return '/impressum';
    if (hash === '#datenschutz') return '/datenschutz';
    if (hash === '#rechner-embed') return '/rechner-embed';

    return '/';
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath());

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getInitialPath());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    // Track SPA route changes in Vercel Analytics
    if (typeof window !== 'undefined') {
      const w = window as unknown as { va?: (event: string, data: { route: string }) => void };
      if (w.va) {
        w.va('pageview', { route: currentPath });
      }
    }
  }, [currentPath]);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (currentPath === '/rechner-embed') {
    return (
      <>
        <RechnerEmbed />
        <Analytics />
        <SpeedInsights />
      </>
    );
  }

  const renderPage = () => {
    switch (currentPath) {
      case '/audit-check':
        return <AuditCheckPage navigate={navigate} />;
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
      <Header currentPath={currentPath} navigate={navigate} />
      <div className="flex-1">
        {renderPage()}
      </div>
      <Footer navigate={navigate} />
      <StickyBar navigate={navigate} />
      <ScrollToTop />
      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default App;
