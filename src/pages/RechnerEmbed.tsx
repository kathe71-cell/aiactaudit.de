import React, { useState } from 'react';
import { FineCalculator } from '../components/FineCalculator';
import { AuditFinder } from '../components/AuditFinder';
import { ShieldCheck, ExternalLink, Calculator, Search } from 'lucide-react';

export const RechnerEmbed: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'finder'>('calculator');

  const dummyNavigate = (path: string) => {
    window.open(`https://aiactaudit.de${path}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-2 sm:p-6 flex flex-col justify-between font-sans">
      <div className="max-w-5xl mx-auto w-full">
        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'calculator'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Bußgeld- & Haftungsrechner (Art. 99)</span>
          </button>
          <button
            onClick={() => setActiveTab('finder')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'finder'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Risikoklassen-Finder</span>
          </button>
        </div>

        {activeTab === 'calculator' ? (
          <FineCalculator navigate={dummyNavigate} />
        ) : (
          <AuditFinder navigate={dummyNavigate} />
        )}
      </div>

      <div className="max-w-5xl mx-auto w-full mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-1.5 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>EU AI Act Konformitäts-Audit • Verordnung (EU) 2024/1689 • Stand: September 2026</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Bereitgestellt von</span>
          <a
            href="https://aiactaudit.de"
            target="_blank"
            rel="noopener"
            className="text-emerald-700 font-bold hover:underline inline-flex items-center gap-0.5"
          >
            aiactaudit.de
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
