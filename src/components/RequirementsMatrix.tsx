import React, { useState } from 'react';
import { CORE_REQUIREMENTS } from '../data/auditData';
import { ChevronDown, ChevronUp, FileCheck2, CheckSquare, Lightbulb, ShieldCheck, ArrowRight } from 'lucide-react';

interface RequirementsMatrixProps {
  navigate: (path: string) => void;
}

export const RequirementsMatrix: React.FC<RequirementsMatrixProps> = ({ navigate }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section id="anforderungen" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-950 border border-emerald-300 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            Hochrisiko-Konformität (Art. 9–15)
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Die 7 Kernanforderungen an Hochrisiko-Systeme
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Für Systeme nach Anhang I und Anhang III ist die Einhaltung dieser sieben Kapitel 
            zwingende Voraussetzung für die CE-Kennzeichnung und das rechtssichere Inverkehrbringen im EU-Binnenmarkt.
          </p>
        </div>

        {/* Matrix Grid / Accordion */}
        <div className="space-y-4">
          {CORE_REQUIREMENTS.map((req, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div
                key={req.article}
                className={`rounded-2xl border transition-all ${
                  isExpanded
                    ? 'border-emerald-500 bg-slate-50/70 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-2xs'
                }`}
              >
                {/* Header Row */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                    <span className="w-fit px-3 py-1 rounded-lg text-sm font-black font-mono bg-slate-900 text-white shrink-0">
                      {req.article}
                    </span>
                    <div>
                      <h3 className="text-lg font-black text-slate-950 tracking-tight">
                        {req.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {req.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline-block text-xs font-semibold text-slate-500">
                      {isExpanded ? 'Details verbergen' : 'Prüffragen anzeigen'}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </button>

                {/* Collapsible Content */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-200/80">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                      
                      {/* Col 1: Gesetzliche Kernpflichten */}
                      <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 mb-3 uppercase tracking-wider">
                          <CheckSquare className="w-4 h-4 text-emerald-600" />
                          <span>Gesetzliche Vorgaben</span>
                        </div>
                        <ul className="space-y-2 text-xs text-slate-700">
                          {req.coreRequirements.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 2: Pflichtdokumentation fürs Audit */}
                      <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 mb-3 uppercase tracking-wider">
                          <FileCheck2 className="w-4 h-4 text-blue-600" />
                          <span>Audit-Dokumentationsakte</span>
                        </div>
                        <ul className="space-y-2 text-xs text-slate-700">
                          {req.documentationRequired.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 3: Prüffragen & Praxistipp */}
                      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 mb-3 uppercase tracking-wider">
                            <Lightbulb className="w-4 h-4 text-amber-600" />
                            <span>Audit-Prüffragen</span>
                          </div>
                          <ul className="space-y-2 text-xs text-slate-700">
                            {req.auditChecklist.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 font-medium">
                                <span className="text-emerald-700 font-bold">✓</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 bg-amber-50/50 p-2.5 rounded-lg border border-amber-200/60">
                          <span className="text-[10px] font-extrabold uppercase text-amber-900 block mb-0.5">Praxistipp:</span>
                          <p className="text-xs text-amber-950 font-normal">{req.practicalTip}</p>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom deep dive CTA */}
        <div className="mt-10 p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-white">
              Vollständige Spezifikationsmatrix nach Anhang I &amp; Anhang III
            </h4>
            <p className="text-xs text-slate-400">
              Prüfen Sie, welche Konformitätsbewertung (Selbstprüfung nach Anhang VI vs. Benannte Stelle nach Anhang VII) erforderlich ist.
            </p>
          </div>
          <button
            onClick={() => {
              navigate('/hochrisiko-matrix');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="shrink-0 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-sm px-5 py-2.5 rounded-xl cursor-pointer transition-all"
          >
            <span>Zur Hochrisiko-Matrix</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
