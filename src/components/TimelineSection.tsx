import React from 'react';
import { TIMELINE_MILESTONES } from '../data/auditData';
import { Calendar, AlertCircle, ArrowRight, Clock } from 'lucide-react';

interface TimelineSectionProps {
  navigate: (path: string) => void;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ navigate }) => {
  return (
    <section id="fristen" className="py-16 bg-slate-50 border-b border-slate-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-950 border border-amber-300 mb-3">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            Verbindlicher Stufenplan
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Fristen &amp; Durchsetzungszeitpunkte (2024–2027)
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Der EU AI Act tritt stufenweise in Kraft. Seit dem <strong>02. Februar 2025</strong> greifen die ersten 
            strikten Verbote nach Art. 5. Prüfen Sie die Meilensteine für Ihre Systeme.
          </p>
        </div>

        {/* Timeline Visual Cards */}
        <div className="relative">
          {/* Vertical central bar (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-slate-300 -translate-x-1/2" />

          <div className="space-y-8">
            {TIMELINE_MILESTONES.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const isPast = item.status === 'past';
              const isImminent = item.status === 'imminent';

              return (
                <div 
                  key={item.dateRaw}
                  className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Content card */}
                  <div className="w-full lg:w-1/2">
                    <div className={`p-6 sm:p-7 rounded-2xl border transition-all ${
                      isImminent 
                        ? 'bg-amber-50/70 border-amber-300 shadow-md ring-2 ring-amber-400/20' 
                        : isPast 
                        ? 'bg-white border-slate-300 shadow-2xs' 
                        : 'bg-white border-slate-200 shadow-2xs'
                    }`}>
                      
                      {/* Top status bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-emerald-600" />
                          <span className="font-extrabold text-sm text-slate-950 font-mono">
                            {item.date}
                          </span>
                        </div>

                        <div>
                          {isPast && (
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                              Bereits in Kraft
                            </span>
                          )}
                          {isImminent && (
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-200 text-amber-950 border border-amber-300 animate-pulse">
                              Nächster Stichtag
                            </span>
                          )}
                          {!isPast && !isImminent && (
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                              Übergangsfrist läuft
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Title & target */}
                      <h3 className="text-lg font-black text-slate-900 mt-3">
                        {item.title}
                      </h3>
                      <p className="text-xs font-semibold text-emerald-800 mt-1">
                        Zielgruppe: {item.targetGroup}
                      </p>

                      <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Key Points */}
                      <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                        {item.keyPoints.map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-700">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-900 mt-1.5 shrink-0" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>

                      {/* Penalty risk tag */}
                      <div className="mt-4 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-950 text-xs flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Haftungsrisiko: </span>
                          <span>{item.penaltyRisk}</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Central Node / Marker */}
                  <div className="hidden lg:flex w-10 h-10 rounded-full bg-white border-2 border-slate-900 items-center justify-center z-10 shadow-sm shrink-0">
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-600" />
                  </div>

                  {/* Empty spacer for grid alignment on desktop */}
                  <div className="hidden lg:block w-1/2" />

                </div>
              );
            })}
          </div>
        </div>

        {/* Action link to detailed Fristen Guide */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              navigate('/fristen-guide');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 px-6 py-3 rounded-xl shadow-2xs transition-all cursor-pointer"
          >
            <span>Detaillierten Stufenplan &amp; Ausnahmeregelungen einsehen</span>
            <ArrowRight className="w-4 h-4 text-emerald-600" />
          </button>
        </div>

      </div>
    </section>
  );
};
