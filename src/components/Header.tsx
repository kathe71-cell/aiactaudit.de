import React, { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { LogoMark } from './LogoMark';

interface HeaderProps {
  currentPath: string;
  navigate: (path: string) => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, navigate, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Horizon Scanning', path: '/#horizon-feed', targetId: 'horizon-feed' },
    { label: 'EU-Radar', path: '/#eu-radar', targetId: 'eu-radar' },
    { label: 'Watchtowers', path: '/#watchtowers', targetId: 'watchtowers' },
    { label: 'Policy-Screener', path: '/#policy-screener', targetId: 'policy-screener' },
    { label: 'Hochrisiko-Matrix', path: '/hochrisiko-matrix' },
    { label: 'Fristen-Guide', path: '/fristen-guide' },
  ];

  const handleNav = (path: string, targetId?: string) => {
    setMobileMenuOpen(false);
    if (targetId) {
      if (currentPath === '/') {
        const el = document.getElementById(targetId);
        if (el) {
          const headerOffset = 90;
          const elementPosition = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: Math.max(0, elementPosition - headerOffset),
            behavior: 'smooth'
          });
          return;
        }
      } else {
        navigate('/');
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
        }, 150);
        return;
      }
    }
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            onClick={() => handleNav('/')}
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              <LogoMark className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl sm:text-2xl text-slate-950 tracking-tight">AI Act Audit</span>
                <span className="text-[11px] font-black bg-emerald-100 text-emerald-950 border border-emerald-300 px-1.5 py-0.5 rounded-sm">.de</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide">EU Regulatory Intelligence &amp; Audit-Readiness</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.path, link.targetId)}
                className="text-xs font-bold text-slate-700 hover:text-emerald-700 transition-colors cursor-pointer py-1.5"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Actions: Quick Search trigger (⌘K) */}
          <div className="hidden sm:flex items-center">
            <button
              onClick={onOpenSearch}
              title="Volltextsuche öffnen (⌘K)"
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 font-medium text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 transition-all cursor-pointer shadow-2xs"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden md:inline">Suchen...</span>
              <kbd className="hidden md:inline-flex items-center gap-0.5 text-[10px] font-mono text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-300">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Mobile Search & Menu Buttons */}
          <div className="flex items-center gap-1.5 sm:hidden">
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Suche öffnen"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Menü umschalten"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Medium Screen Menu Button (between sm and xl) */}
          <div className="hidden sm:flex xl:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Menü umschalten"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in fade-in duration-200">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSearch?.();
            }}
            className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 mb-2"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-emerald-600" />
              <span>Volltextsuche starten...</span>
            </span>
            <kbd className="text-[10px] font-mono text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-300">
              ⌘K
            </kbd>
          </button>

          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.path, link.targetId)}
              className="block w-full text-left py-2.5 px-3 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
