import React, { useState } from 'react';
import { EU_AUTHORITIES_DATA } from '../data/euAuthoritiesData';
import type { EUAuthorityInfo } from '../data/euAuthoritiesData';
import europePathsData from '../data/europePaths.json';
import { Compass, ExternalLink, CheckCircle2, Sparkles, Scale, ArrowRight } from 'lucide-react';

const europePaths: Record<string, string> = europePathsData;

interface EuEnforcementRadarProps {
  navigate?: (path: string) => void;
}

export const EuEnforcementRadar: React.FC<EuEnforcementRadarProps> = ({ navigate }) => {
  const [selectedId, setSelectedId] = useState<string>('de');

  const selectedAuthority: EUAuthorityInfo =
    EU_AUTHORITIES_DATA.find((a) => a.id === selectedId) || EU_AUTHORITIES_DATA[1];

  const handleAuditForCountry = (iso: string) => {
    if (navigate) {
      navigate(`/audit-check?country=${iso.toLowerCase()}`);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <section id="eu-radar" className="py-16 sm:py-24 bg-white border-b border-slate-200 relative overflow-hidden scroll-mt-24">
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
            EU Enforcement Radar: Geografische Aufsicht &amp; Reallabore
          </h2>
          <p className="mt-2 text-base sm:text-lg text-slate-600 font-normal">
            Der EU AI Act gilt unmittelbar in ganz Europa – doch die Marktüberwachung (Art. 70), nationale Reallabore (Art. 57) 
            und Prüfpraxen sind länderspezifisch geregelt. Klicken Sie auf ein Land, um das jeweilige Dossier zu laden.
          </p>
        </div>

        {/* Interactive Layout: Real Vector Europe Map + Detailed Intelligence Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Top: Real Vector Europe Map (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
            
            {/* Top Bar of Map */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800/80 mb-5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono font-bold text-slate-300 tracking-wider uppercase">
                  EUROPEAN AI JURISDICTIONS
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Interaktive Vektorkarte · {EU_AUTHORITIES_DATA.length} Hoheitsgebiete aktiv
              </div>
            </div>

            {/* REAL SVG EUROPE MAP */}
            <div className="relative w-full aspect-[4/3.2] bg-slate-900/90 rounded-2xl border border-slate-800 p-2 sm:p-4 flex items-center justify-center overflow-hidden">
              <svg 
                viewBox="50 40 700 600" 
                className="w-full h-full filter drop-shadow-md"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Subtle map pattern */}
                  <pattern id="radarGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" opacity="0.3" />
                  </pattern>
                </defs>

                {/* Grid Background */}
                <rect x="50" y="40" width="700" height="600" fill="url(#radarGrid)" />

                {/* Render ALL European Country Outlines */}
                {Object.entries(europePaths).map(([countryName, pathD]) => {
                  // Check if this country is tracked in our EU authorities dataset
                  const matchedAuth = EU_AUTHORITIES_DATA.find((a) => a.geoName === countryName);
                  const isSelected = matchedAuth && (matchedAuth.id === selectedId || (selectedId === 'eu-office' && countryName === 'Belgium'));

                  return (
                    <path
                      key={countryName}
                      d={pathD}
                      id={`geo-${countryName}`}
                      onClick={() => {
                        if (matchedAuth) {
                          setSelectedId(matchedAuth.id);
                        }
                      }}
                      className={`transition-all duration-200 stroke-[0.8] ${
                        matchedAuth
                          ? isSelected
                            ? 'fill-emerald-500 stroke-white stroke-[1.8] cursor-pointer z-30 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.7)]'
                            : 'fill-slate-800 hover:fill-emerald-700/80 stroke-slate-700 hover:stroke-emerald-400 cursor-pointer'
                          : 'fill-slate-900/60 stroke-slate-800 pointer-events-none'
                      }`}
                    >
                      <title>{matchedAuth ? `${matchedAuth.country} (${matchedAuth.authorityAcronym})` : countryName}</title>
                    </path>
                  );
                })}
              </svg>

              {/* Active Selection Floating Pill on Map */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-slate-700 backdrop-blur-md text-xs font-mono text-slate-200 shadow-md">
                <span className="text-base">{selectedAuthority.flag}</span>
                <span className="font-bold text-white">{selectedAuthority.country}</span>
                <span className="text-[10px] text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800">
                  {selectedAuthority.authorityAcronym}
                </span>
              </div>
            </div>

            {/* Quick Country Selection Matrix (All 31 at a glance without scrolling) */}
            <div className="mt-5 pt-4 border-t border-slate-800/80">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                  Alle 31 Hoheitsgebiete im Direktzugriff:
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  Klick wählt Land &amp; synchronisiert Karte
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1.5">
                {EU_AUTHORITIES_DATA.map((item) => {
                  const isSelected = item.id === selectedId;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedId(item.id)}
                      data-no-autoscroll="true"
                      title={`${item.country} (${item.authorityAcronym})`}
                      className={`px-2 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 text-center ${
                        isSelected
                          ? 'bg-emerald-500 text-slate-950 font-black shadow-xs ring-1 ring-white'
                          : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:text-white hover:border-slate-600 hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-xs shrink-0">{item.flag}</span>
                      <span className="font-mono text-[11px]">{item.isoCode}</span>
                    </button>
                  );
                })}
              </div>
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
            <p className="text-xs font-semibold text-slate-600 mb-5 pb-4 border-b border-slate-100">
              {selectedAuthority.authorityName}
            </p>

            {/* Status Grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
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

            {/* National Specifics Highlight Box */}
            <div className="mb-5 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950">
              <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-amber-900 mb-1">
                <Scale className="w-3.5 h-3.5 text-amber-700" />
                <span>Nationale Besonderheiten &amp; Gesetzgebung</span>
              </div>
              <p className="text-xs font-medium text-amber-900 leading-relaxed">
                {selectedAuthority.nationalSpecifics}
              </p>
            </div>

            {/* Substantive Description & Facts */}
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
                data-no-autoscroll="true"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-extrabold text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl border border-slate-300 transition-colors"
              >
                <span>Behördenportal</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>

              <button
                onClick={() => handleAuditForCountry(selectedAuthority.isoCode)}
                data-no-autoscroll="true"
                className="inline-flex items-center justify-center gap-2 text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2.5 rounded-xl transition-colors shadow-xs cursor-pointer flex-1"
              >
                <span>Konformität für {selectedAuthority.isoCode} prüfen *</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default EuEnforcementRadar;
