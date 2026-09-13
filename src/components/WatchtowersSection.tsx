import React, { useState } from 'react';
import { WATCHTOWER_METRICS } from '../data/regulatoryFeedData';
import { TowerControl as RadioTower, ArrowRight, ChevronRight, BellRing } from 'lucide-react';

interface WatchtowersSectionProps {
  navigate?: (path: string) => void;
}

export const WatchtowersSection: React.FC<WatchtowersSectionProps> = ({ navigate }) => {
  const [activeTowerId, setActiveTowerId] = useState<string>(WATCHTOWER_METRICS[0].id);

  const activeTower = WATCHTOWER_METRICS.find((t) => t.id === activeTowerId) || WATCHTOWER_METRICS[0];

  return (
    <section id="watchtowers" className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Intro */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-blue-100 text-blue-950 border border-blue-300 mb-3 shadow-2xs">
            <RadioTower className="w-3.5 h-3.5 text-blue-700" />
            <span>Harmonisierte EU-Überwachung</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Regulatorische Watchtowers &amp; Frühwarnung
          </h2>
          <p className="mt-2 text-base sm:text-lg text-slate-600 font-normal">
            Verfolgen Sie die Umsetzung, Standardisierung und Prüfpraxis über 4 zusammenhängende Rechtsrahmen hinweg – vom AI Act bis hin zu DORA, NIS-2 und Datenschutz.
          </p>
        </div>

        {/* Watchtower Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {WATCHTOWER_METRICS.map((tower) => {
            const isSelected = tower.id === activeTowerId;
            return (
              <div
                key={tower.id}
                onClick={() => setActiveTowerId(tower.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer bg-white relative ${
                  isSelected
                    ? 'border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                    {tower.tag}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    {tower.statusBadge}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-950 tracking-tight mb-2">
                  {tower.title}
                </h3>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
                  <div>
                    <div className="text-2xl font-black text-slate-900">{tower.eventsCount}</div>
                    <div className="text-[11px] text-slate-500 font-medium">Dokumente / Normen</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-amber-700">{tower.criticalAlerts} Dringend</div>
                    <div className="text-[11px] text-slate-400 font-medium">{tower.progressPercent}% Implementiert</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${tower.progressPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Watchtower Detail Inspector Box */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span>Ausgewählter Watchtower</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-900 font-extrabold">{activeTower.title}</span>
              </div>

              <h3 className="text-2xl font-black text-slate-950">
                {activeTower.title} – Status &amp; Durchsetzung
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                {activeTower.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="text-slate-500 font-semibold block mb-1">Maßgebliche Rechtsakte &amp; Normen:</span>
                  <span className="font-bold text-slate-900">{activeTower.keyLegislation}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="text-slate-500 font-semibold block mb-1">Letztes regulatorisches Signal:</span>
                  <span className="font-bold text-slate-900">{activeTower.lastUpdate}</span>
                </div>
              </div>
            </div>

            {/* Right Action Card */}
            <div className="lg:col-span-4 bg-slate-900 text-white rounded-xl p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 text-amber-300 text-xs font-bold mb-3">
                  <BellRing className="w-3.5 h-3.5" />
                  <span>Compliance Alerting</span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">
                  Direkter Abgleich mit {activeTower.tag}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Prüfen Sie, ob Ihre internen Richtlinien und KI-Dokumentation diesen Anforderungen standhalten.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => navigate ? navigate('/audit-check') : window.location.assign('/audit-check')}
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-4 py-3 rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  <span>Audit-Check für {activeTower.tag} starten *</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-[10px] text-slate-400 text-center">
                  * Unverbindliche Selbsteinstufung
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
