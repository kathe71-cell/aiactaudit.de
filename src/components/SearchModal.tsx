import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Search, X, ArrowRight, CornerDownLeft, Sparkles, FileText, Globe, AlertTriangle, Calendar, Wrench, HelpCircle } from 'lucide-react';
import { buildSearchIndex, searchIndex } from '../services/searchIndex';
import type { SearchResultItem, SearchCategory } from '../services/searchIndex';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  navigate: (path: string) => void;
  initialQuery?: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  navigate,
  initialQuery = ''
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Build static index once
  const allItems = useMemo(() => buildSearchIndex(), []);

  // Focus input upon mounting
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Results calculation
  const results = useMemo(() => {
    if (!query.trim()) {
      return allItems.slice(0, 6);
    }
    return searchIndex(query, allItems, 12);
  }, [query, allItems]);

  const handleSelectResult = useCallback((item: SearchResultItem) => {
    onClose();
    if (item.targetAnchor) {
      if (window.location.pathname === '/') {
        const el = document.getElementById(item.targetAnchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(item.targetAnchor!);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return;
      }
    }
    navigate(item.targetPath);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [navigate, onClose]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1 < results.length ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : results.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          handleSelectResult(results[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, handleSelectResult]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  const getCategoryIcon = (category: SearchCategory) => {
    switch (category) {
      case 'ARTICLE':
        return <FileText className="w-4 h-4 text-emerald-600 shrink-0" />;
      case 'AUTHORITY':
        return <Globe className="w-4 h-4 text-blue-600 shrink-0" />;
      case 'USE_CASE':
        return <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />;
      case 'TIMELINE':
        return <Calendar className="w-4 h-4 text-purple-600 shrink-0" />;
      case 'TOOL':
        return <Wrench className="w-4 h-4 text-cyan-600 shrink-0" />;
      case 'FAQ':
        return <HelpCircle className="w-4 h-4 text-slate-500 shrink-0" />;
      default:
        return <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col max-h-[80vh] z-10">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="AI Act durchsuchen (z. B. Art. 10, Biometrie, Bußgeld, CNIL, Fristen)..."
            className="flex-1 bg-transparent text-sm sm:text-base font-medium text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setSelectedIndex(0);
              }}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors"
              title="Eingabe löschen"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors cursor-pointer"
            title="Schließen (ESC)"
            aria-label="Suche schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results List */}
        <div ref={listRef} className="overflow-y-auto divide-y divide-slate-100 p-2 sm:p-3 space-y-1">
          {results.length > 0 ? (
            results.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  data-index={idx}
                  onClick={() => handleSelectResult(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-xl cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-emerald-50/80 border border-emerald-300 shadow-2xs'
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="mt-0.5">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${item.badgeColor}`}>
                          {item.categoryLabel}
                        </span>
                      </div>
                      <h4 className="text-sm font-extrabold text-slate-950 truncate leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                        {item.snippet}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1 self-center">
                    {isSelected ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-1 rounded-lg border border-emerald-300">
                        <span>Öffnen</span>
                        <CornerDownLeft className="w-3 h-3" />
                      </span>
                    ) : (
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500" />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <Search className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-800">Keine direkten Treffer für „{query}“ gefunden</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Versuchen Sie es mit allgemeineren Begriffen wie <em>„Risikomanagement“</em>, <em>„Art. 9“</em>, <em>„Bußgeld“</em> oder <em>„Aufsicht“</em>.
              </p>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 text-slate-700 font-bold">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 text-slate-700 font-bold">↓</kbd>
              <span>Navigieren</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 text-slate-700 font-bold">↵</kbd>
              <span>Auswählen</span>
            </span>
          </div>
          <span className="text-[10px] text-slate-400">
            100 % Lokale In-Memory-Suche · Zero-CDN
          </span>
        </div>

      </div>
    </div>
  );
};
