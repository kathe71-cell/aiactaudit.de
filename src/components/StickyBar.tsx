import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldAlert } from 'lucide-react';

interface StickyBarProps {
  navigate: (path: string) => void;
}

export const StickyBar: React.FC<StickyBarProps> = ({ navigate }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <aside aria-label="Mobile Schnell-Aktion" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-2xl transition-all duration-300">
      <div className="flex flex-col gap-1.5 max-w-md mx-auto">
        <button
          onClick={() => {
            navigate('/audit-check');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-md cursor-pointer transition-all active:scale-[0.99]"
        >
          <ShieldAlert className="w-4 h-4 text-emerald-200" />
          <span>EU AI Act Audit-Check starten *</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-[10px] text-center text-slate-500 font-medium">
          * Unverbindliche Orientierungshilfe nach Verordnung (EU) 2024/1689
        </p>
      </div>
    </aside>
  );
};
