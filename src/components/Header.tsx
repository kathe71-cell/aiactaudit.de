import React, { useState } from 'react';
import { ShieldCheck, Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, navigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Horizon Scanning', path: '/#horizon-feed', targetId: 'horizon-feed' },
    { label: 'Watchtowers', path: '/#watchtowers', targetId: 'watchtowers' },
    { label: 'Policy-Screener', path: '/#policy-screener', targetId: 'policy-screener' },
    { label: 'Hochrisiko-Matrix', path: '/hochrisiko-matrix' },
    { label: 'Fristen-Guide', path: '/fristen-guide' },
    { label: 'Bußgeld-Rechner', path: '/#bussgeld', targetId: 'bussgeld' },
    { label: 'FAQ', path: '/#faq', targetId: 'faq' },
  ];

  const handleNav = (path: string, targetId?: string) => {
    setMobileMenuOpen(false);
    if (targetId) {
      if (currentPath === '/') {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return;
      }
    }
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            onClick={() => handleNav('/')}
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl text-slate-950 tracking-tight">AI Act Audit</span>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 px-1.5 py-0.5 rounded-sm">.de</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide">EU Regulatory Intelligence &amp; Audit-Readiness</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5">
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

          {/* Right Action CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNav('/audit-check')}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all hover:shadow-md cursor-pointer"
            >
              <span>Audit-Check starten *</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
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
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in fade-in duration-200">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.path, link.targetId)}
              className="block w-full text-left py-2.5 px-3 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => handleNav('/audit-check')}
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm px-4 py-3 rounded-xl shadow-xs"
            >
              <span>Audit-Check starten *</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
