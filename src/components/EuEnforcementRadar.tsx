import React, { useState } from 'react';
import { EU_AUTHORITIES_DATA } from '../data/euAuthoritiesData';
import { Compass, ExternalLink, CheckCircle2, Sparkles } from 'lucide-react';

interface EuEnforcementRadarProps {
  navigate?: (path: string) => void;
}

export const EuEnforcementRadar: React.FC<EuEnforcementRadarProps> = ({ navigate }) => {
  const [selectedId, setSelectedId] = useState<string>('de');

  const selectedAuthority = EU_AUTHORITIES_DATA.find((a) => a.id === selectedId) || EU_AUTHORITIES_DATA[0];

  return (
    <section id="eu-radar" className="py-16 sm:py-24 bg-white border-b border-slate-200 relative overflow-hidden">
      {/* Background Architectural Grid Pattern (Myriad style) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#0f172a 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-950 border border-emerald-300 mb-3 shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-emerald-700" />
            <span>Art. 70 &amp; Art. 57 EU AI Act</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            EU Enforcement Radar: Nationale Aufsichtsbehörden &amp; Reallabore
          </h2>
          <p className="mt-2 text-base sm:text-lg text-slate-600 font-normal">
            Der EU AI Act gilt unmittelbar in allen 27 Mitgliedsstaaten – doch die Überwachungspraxis, 
            Prüfbehörden und KI-Reallabore (Sandboxes) sind national organisiert. 
            Navigieren Sie durch die europäischen Aufsichtszuständigkeiten.
          </p>
        </div>

        {/* Interactive Layout: Radar Map + Detailed Intelligence Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Top: Interactive Map & Node Selector (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
            
            {/* Subtle Map Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800/80 mb-6">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono font-bold text-slate-300 tracking-wider uppercase">
                  EUROPEAN AI SUPERVISORY MATRIX
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                8 Schlüsselhoheitsgebiete erfasst
              </div>
            </div>

            {/* Stylized Vector Europe Map with Precision Target Nodes */}
            <div className="relative w-full aspect-[4/3] bg-slate-900/60 rounded-2xl border border-slate-800 p-4 flex items-center justify-center overflow-hidden">
              
              {/* Minimalist Europe Silhouette SVG Paths */}
              <svg 
                className="w-full h-full text-slate-800 select-none pointer-events-none" 
                viewBox="0 0 800 600" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
              >
                {/* Lat/Long Grid lines */}
                <path d="M50 150 H750 M50 300 H750 M50 450 H750" stroke="#1e293b" strokeDasharray="3 4" opacity="0.6"/>
                <path d="M200 50 V550 M400 50 V550 M600 50 V550" stroke="#1e293b" strokeDasharray="3 4" opacity="0.6"/>

                {/* Scandinavia & UK/Ireland Silhouettes */}
                <path d="M220 180 L235 150 L260 160 L250 200 L230 220 Z" fill="#0f172a" stroke="#334155" />
                <path d="M280 120 L320 80 L350 110 L330 190 L300 230 L275 220 Z" fill="#0f172a" stroke="#334155" />
                {/* Western & Central Europe */}
                <path d="M300 240 L350 220 L440 220 L480 250 L450 340 L390 370 L340 350 L310 300 Z" fill="#0f172a" stroke="#334155" />
                {/* Iberian Peninsula */}
                <path d="M190 390 L270 380 L260 470 L180 480 Z" fill="#0f172a" stroke="#334155" />
                {/* Italian Peninsula */}
                <path d="M410 370 L450 360 L480 430 L450 490 L420 460 Z" fill="#0f172a" stroke="#334155" />
                {/* Central East & Balkans */}
                <path d="M460 250 L560 260 L590 350 L520 420 L460 350 Z" fill="#0f172a" stroke="#334155" />
              </svg>

              {/* Interactive Country / Authority Nodes */}
              {EU_AUTHORITIES_DATA.map((item) => {
                const isSelected = item.id === selectedId;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    aria-label={`${item.country} - ${item.authorityAcronym}`}
                    style={{ left: `${item.coordinates.x}%`, top: `${item.coordinates.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-200 z-20 focus:outline-hidden`}
                  >
                    {/* Pulsing ring on active */}
                    {isSelected && (
                      <span className="absolute -inset-2.5 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />
                    )}

                    {/* Node Core Button */}
                    <div 
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold tracking-tight transition-all shadow-lg ${
                        isSelected
                          ? 'bg-emerald-400 text-slate-950 ring-2 ring-white scale-110'
                          : 'bg-slate-900/90 text-slate-200 border border-slate-700 hover:border-emerald-500 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-xs">{item.flag}</span>
                      <span>{item.isoCode}</span>
                    </div>

                    {/* Mini Tooltip on Hover */}
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-slate-950 text-white text-[10px] font-sans font-medium rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-700 z-30 shadow-md">
                      {item.authorityAcronym}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Country Pills Selection */}
            <div className="mt-6 flex flex-wrap gap-2">
              {EU_AUTHORITIES_DATA.map((item) => {
                const isSelected = item.id === selectedId;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950 font-black shadow-xs'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <span>{item.flag}</span>
                    <span>{item.isoCode}</span>
                    <span className="text-[10px] font-normal opacity-70">({item.authorityAcronym})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed Authority Dossier (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md relative">
            
            {/* Country Badge & Role Header */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{selectedAuthority.flag}</span>
                  <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                    {selectedAuthority.isoCode} · {selectedAuthority.country}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight leading-snug">
                  {selectedAuthority.authorityAcronym}
                </h3>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 shrink-0">
                {selectedAuthority.headquarters}
              </span>
            </div>

            {/* Official full name */}
            <p className="text-xs font-semibold text-slate-600 mb-6 pb-4 border-b border-slate-100">
              {selectedAuthority.authorityName}
            </p>

            {/* Status Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">
                  Rechtlicher Status
                </span>
                <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  {selectedAuthority.status}
                </span>
              </div>
              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/80">
                <span className="block text-[10px] uppercase font-bold text-emerald-800 tracking-wider mb-1">
                  KI-Reallabor (Art. 57)
                </span>
                <span className="text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  {selectedAuthority.sandboxStatus}
                </span>
              </div>
            </div>

            {/* Substantive Description */}
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Aufgabenbereich &amp; Mandat
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedAuthority.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Zentrale Durchsetzungs-Fakten
                </h4>
                <ul className="space-y-2">
                  {selectedAuthority.keyFacts.map((fact, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={selectedAuthority.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-extrabold text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl border border-slate-300 transition-colors"
              >
                <span>Behördenportal besuchen</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>

              <button
                onClick={() => {
                  if (navigate) navigate('/audit-check');
                }}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2.5 rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                <span>Konformität für {selectedAuthority.isoCode} prüfen *</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default EuEnforcementRadar;
