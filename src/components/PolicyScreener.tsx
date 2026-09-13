import React, { useState } from 'react';
import { POLICY_SNIPPETS } from '../data/regulatoryFeedData';
import { FileSearch, ArrowRight, Sparkles, Copy, Check, ShieldAlert, AlertTriangle } from 'lucide-react';

interface PolicyScreenerProps {
  navigate?: (path: string) => void;
}

export const PolicyScreener: React.FC<PolicyScreenerProps> = ({ navigate }) => {
  const [selectedSnippetId, setSelectedSnippetId] = useState<string>(POLICY_SNIPPETS[0].id);
  const [copied, setCopied] = useState<boolean>(false);

  const currentSnippet = POLICY_SNIPPETS.find((s) => s.id === selectedSnippetId) || POLICY_SNIPPETS[0];

  const copyCompliantText = () => {
    navigator.clipboard.writeText(currentSnippet.compliantText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="policy-screener" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-950 border border-amber-300 mb-3 shadow-2xs">
              <FileSearch className="w-3.5 h-3.5 text-amber-700" />
              <span>Interaktive Klauselprüfung</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              AI Act Policy- &amp; Klausel-Screener
            </h2>
            <p className="mt-2 text-base sm:text-lg text-slate-600 max-w-3xl font-normal">
              Myriad-inspiriertes Screener-Modul: Vergleichen Sie typische Unternehmens-Policies in Echtzeit mit den gesetzlichen Vorgaben nach Art. 9, 10, 12, 14 und 50 des EU AI Acts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              3 Standard-Szenarien verfügbar
            </span>
          </div>
        </div>

        {/* Preset Selector Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {POLICY_SNIPPETS.map((snippet) => {
            const isSelected = snippet.id === selectedSnippetId;
            return (
              <button
                key={snippet.id}
                onClick={() => setSelectedSnippetId(snippet.id)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                }`}
              >
                <div className={`text-[11px] font-extrabold uppercase tracking-wider mb-1 ${
                  isSelected ? 'text-amber-400' : 'text-slate-500'
                }`}>
                  {snippet.category}
                </div>
                <div className="text-sm font-bold truncate">{snippet.title}</div>
                <div className={`text-xs mt-1 font-medium ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  {snippet.detectedGaps.length} rechtliche Lücken erkannt
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Comparison Workspace */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs">
          
          {/* Top Info Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Prüfgegenstand:</span>
              <span className="text-sm font-black text-slate-900">{currentSnippet.title}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded-md">
                <ShieldAlert className="w-3.5 h-3.5" />
                {currentSnippet.detectedGaps.length} Non-Compliance Befunde
              </span>
            </div>
          </div>

          {/* Side by Side Screener */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left: Original (Non-compliant) Text */}
            <div className="bg-white rounded-xl border border-red-200 p-5 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-red-950">
                      Aktuelle Praxis / Unzureichend
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    Audit-Status: Kritisch
                  </span>
                </div>

                <div className="p-3.5 rounded-lg bg-red-50/50 border border-red-100 text-xs sm:text-sm text-slate-800 leading-relaxed font-mono">
                  &ldquo;{currentSnippet.originalText}&rdquo;
                </div>

                {/* Detected GAP List */}
                <div className="mt-4 space-y-2.5">
                  <span className="text-xs font-bold text-slate-900 block">Identifizierte Rechtsverstöße:</span>
                  {currentSnippet.detectedGaps.map((gap, i) => (
                    <div key={i} className="p-3 rounded-lg bg-white border border-red-200 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-red-700">{gap.article}</span>
                        <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-red-100 text-red-950">
                          {gap.severity}
                        </span>
                      </div>
                      <p className="text-slate-700 font-medium">{gap.issue}</p>
                      <p className="text-[11px] text-slate-500 italic mt-1">Abhilfe: {gap.recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-red-600 font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Hohes Bußgeldrisiko bei behördlicher Prüfung</span>
              </div>
            </div>

            {/* Right: Compliant Formulation */}
            <div className="bg-white rounded-xl border border-emerald-300 p-5 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-950">
                      Audit-Ready Klausel (EU-konform)
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    Konform nach Art. 9–15
                  </span>
                </div>

                <div className="p-3.5 rounded-lg bg-emerald-50/50 border border-emerald-200 text-xs sm:text-sm text-slate-900 leading-relaxed font-mono">
                  &ldquo;{currentSnippet.compliantText}&rdquo;
                </div>

                <div className="mt-4 p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Konformitäts-Vorteile im Audit:</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-600 text-xs list-disc list-inside">
                    <li>Explizite Festlegung menschlicher Letztentscheidungsbefugnis (Human-in-the-Loop)</li>
                    <li>Rechtssichere Nachweiserbringung für Konformitätsbewertungsstellen</li>
                    <li>Dokumentierte Schutzmaßnahmen gegen algorithmische Voreingenommenheit (Bias)</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={copyCompliantText}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Kopiert!' : 'Klausel kopieren'}</span>
                </button>

                <button
                  onClick={() => navigate ? navigate('/audit-check') : window.location.assign('/audit-check')}
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 hover:text-emerald-800 underline cursor-pointer"
                >
                  <span>Gesamtes System prüfen *</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
