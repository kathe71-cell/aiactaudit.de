import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Nach oben scrollen"
      className="fixed bottom-20 md:bottom-8 right-5 sm:right-8 z-40 p-3 rounded-full bg-slate-900/90 hover:bg-slate-950 text-white shadow-lg border border-slate-700/60 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group"
    >
      <ArrowUp className="w-5 h-5 text-slate-200 group-hover:text-emerald-400 transition-colors" />
    </button>
  );
};
