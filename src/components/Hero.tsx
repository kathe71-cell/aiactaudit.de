import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, AlertTriangle, CheckCircle2, Clock, Radio, ArrowUpRight } from 'lucide-react';
import { REGULATORY_EVENTS } from '../data/regulatoryFeedData';

interface HeroProps {
  navigate: (path: string) => void;
  onScrollToFinder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ navigate, onScrollToFinder }) => {
  const [activeTab, setActiveTab] = useState<'scan' | 'classes'>('scan');
  const recentEvents = REGULATORY_EVENTS.slice(0, 3);

  const scrollToHorizon = () => {
    const el = document.getElementById('horizon-feed');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/70 pt-8 pb-16 lg:pt-12 lg:pb-24 border-b border-slate-200">
      {/* Decorative subtle ambient background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Badges (Myriad-style source tag cluster) */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-950 border border-emerald-300 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            Verordnung (EU) 2024/1689
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-950 border border-amber-300 shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            Stufe 1 &amp; 2 in Kraft (Art. 5 Verbote &amp; GPAI)
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            Unabhängige Regulatory Intelligence DACH
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column: B2B Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-[46px] font-black text-slate-950 tracking-tight leading-[1.14]">
              Europas führende <span className="text-emerald-700 underline decoration-emerald-300 decoration-wavy underline-offset-4">Regulatory Intelligence</span> &amp; Audit-Plattform für den EU AI Act
            </h1>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              Die maßgeblichen Rechtsakte liegen dort, wo herkömmliche Suchmaschinen und allgemeine KI nicht hinreichen: 
              Wir erfassen fortlaufend alle Veröffentlichungen des <strong>EU AI Office, der BaFin, des BSI und von CEN-CENELEC</strong>, 
              übersetzen Gesetzesänderungen in konkrete Handlungspflichten nach <strong>Art. 9–15</strong> und begleiten Sie lückenlos bis zur behördlichen Audit-Readiness.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => navigate('/audit-check')}
                className="inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base px-6 py-3.5 rounded-xl shadow-md transition-all hover:shadow-lg cursor-pointer"
              >
                <span>Audit-Check starten *</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={scrollToHorizon}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-900 font-bold text-base px-6 py-3.5 rounded-xl border border-slate-300 shadow-2xs hover:border-slate-400 transition-all cursor-pointer"
              >
                <Radio className="w-4 h-4 text-emerald-600" />
                <span>Live Horizon Scanning öffnen</span>
              </button>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              * Kostenfreie, neutrale Selbsteinstufung &amp; Modellrechnung nach § 5 DDG.
            </p>

            {/* Position-0 Definition Snippet */}
            <div className="text-left bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border-l-4 border-emerald-600 p-4 sm:p-5 rounded-r-xl bg-white shadow-xs">
              <div className="flex items-center gap-2 mb-2 text-xs font-extrabold uppercase tracking-wider text-emerald-950">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Definition &amp; Rechtsgrundlage (Position-0)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                Ein <strong className="text-slate-950 font-bold">AI Act Audit</strong> bezeichnet die systematische Prüfung von Systemen künstlicher Intelligenz auf Konformität mit der europäischen <strong className="text-slate-950 font-bold">Verordnung (EU) 2024/1689 (KI-Verordnung)</strong>. Es umfasst die Einstufung in vier Risikoklassen sowie für Hochrisiko-Systeme den Nachweis von Risikomanagement, Daten-Governance, technischer Dokumentation, automatischer Protokollierung, menschlicher Aufsicht und Cybersicherheit (Art. 9–15) vor der CE-Kennzeichnung.
              </p>
            </div>

            {/* Trust Metric Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-200">
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-xl sm:text-2xl font-black text-slate-900">270k+</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Regulatorische Events</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-xl sm:text-2xl font-black text-emerald-700">120+</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Behörden &amp; Gremien</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-xl sm:text-2xl font-black text-amber-700">27 Staaten</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">EU-weite Abdeckung</div>
              </div>
            </div>

          </div>

          {/* Right Card: Myriad-Style Multi-Layer Deck Component */}
          <div className="lg:col-span-5 relative">
            
            {/* Background Floating Stack Cards (Like Myriad.ai) */}
            <div className="hidden lg:block absolute -top-4 -right-3 w-[88%] bg-white/70 border border-slate-200/80 rounded-2xl p-4 shadow-sm rotate-[2.5deg] pointer-events-none -z-10">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1">
                <span>Watchtower · EU AI Act</span>
                <span className="text-emerald-600 font-black">AKTIV</span>
              </div>
              <div className="text-xs font-bold text-slate-600 truncate">EU AI Office · Code of Practice GPAI veröffentlicht</div>
            </div>

            <div className="hidden lg:block absolute -top-8 -left-3 w-[85%] bg-white/70 border border-slate-200/80 rounded-2xl p-4 shadow-sm -rotate-[2deg] pointer-events-none -z-10">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1">
                <span>Policy Screener · Audit-Trail</span>
                <span className="text-amber-600 font-black">GAP-SCAN</span>
              </div>
              <div className="text-xs font-bold text-slate-600 truncate">Art. 14 Human-in-the-Loop validiert</div>
            </div>

            {/* Foreground Main SaaS Interface Widget */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 relative">
              
              {/* Top Selector Bar */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                <div className="flex items-center gap-1.5 p-0.5 bg-slate-100 rounded-lg border border-slate-200">
                  <button
                    onClick={() => setActiveTab('scan')}
                    className={`text-xs font-bold px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                      activeTab === 'scan'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Live Scanning
                  </button>
                  <button
                    onClick={() => setActiveTab('classes')}
                    className={`text-xs font-bold px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                      activeTab === 'classes'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Risikoklassen
                  </button>
                </div>
                
                <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  LIVE RADAR
                </span>
              </div>

              {activeTab === 'scan' ? (
                <div className="space-y-3">
                  <div className="text-xs text-slate-500 font-medium flex items-center justify-between mb-1">
                    <span>Zuletzt erfasste Veröffentlichungen</span>
                    <span className="text-emerald-700 font-bold">Heute synchronisiert</span>
                  </div>

                  {recentEvents.map((evt) => (
                    <div
                      key={evt.id}
                      onClick={scrollToHorizon}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-400 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-900 text-white">
                          {evt.sourceCode}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500">
                          {evt.date}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 line-clamp-2">
                        {evt.title}
                      </h4>
                      <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-500">
                        <span>Ref: {evt.officialRef}</span>
                        <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                          Details <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="pt-2">
                    <button
                      onClick={scrollToHorizon}
                      className="w-full text-center py-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 rounded-lg border border-emerald-200 cursor-pointer"
                    >
                      Alle Veröffentlichungen im Horizon Feed anzeigen →
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-xs">
                  {/* Prohibited */}
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-950">
                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                        Unannehmbares Risiko (Art. 5)
                      </span>
                      <span className="bg-red-200/80 text-red-900 px-2 py-0.5 rounded font-black text-[10px]">VERBOTEN</span>
                    </div>
                    <p className="mt-1 text-red-800 text-[11px] leading-relaxed">
                      Social Scoring, Emotionserkennung am Arbeitsplatz. Bußgeld bis 35 Mio. € oder 7% Umsatz.
                    </p>
                  </div>

                  {/* High Risk */}
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950">
                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                        Hochrisiko-KI (Art. 6 / Anhang III)
                      </span>
                      <span className="bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded font-black text-[10px]">CE-PFLICHT</span>
                    </div>
                    <p className="mt-1 text-amber-900 text-[11px] leading-relaxed">
                      HR-Recruiting, Kreditscoring, kritische Infrastruktur. Verpflichtendes Risikomanagement Art. 9–15.
                    </p>
                  </div>

                  {/* Specific Transparency */}
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-950">
                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
                        Spezifische Transparenz (Art. 50)
                      </span>
                      <span className="bg-blue-200/80 text-blue-900 px-2 py-0.5 rounded font-black text-[10px]">HINWEISPFLICHT</span>
                    </div>
                    <p className="mt-1 text-blue-900 text-[11px] leading-relaxed">
                      Chatbots &amp; Deepfake-Generatoren: Kennzeichnungspflicht bei KI-Interaktion.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={onScrollToFinder}
                      className="w-full text-center py-2 text-xs font-bold text-slate-800 hover:text-slate-950 bg-slate-100 rounded-lg border border-slate-200 cursor-pointer"
                    >
                      Zum Risikoklassen-Finder springen →
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-500">Prüfungsdauer: ~ 4 Minuten</span>
                <button
                  onClick={() => navigate('/audit-check')}
                  className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>Eigenes System prüfen *</span>
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
