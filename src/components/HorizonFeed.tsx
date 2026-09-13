import React, { useState } from 'react';
import { REGULATORY_EVENTS, type RegulatoryEvent } from '../data/regulatoryFeedData';
import { Radio, Search, ExternalLink, AlertCircle, ChevronDown, ChevronUp, Clock, Filter, Sparkles, BookOpen } from 'lucide-react';

interface HorizonFeedProps {
  navigate?: (path: string) => void;
}

export const HorizonFeed: React.FC<HorizonFeedProps> = ({ navigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [activeJurisdiction, setActiveJurisdiction] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('reg-01');

  const filteredEvents = REGULATORY_EVENTS.filter((evt) => {
    const matchesCategory = activeCategory === 'ALL' || evt.category === activeCategory;
    const matchesJurisdiction = activeJurisdiction === 'ALL' || evt.jurisdiction === activeJurisdiction;
    const matchesSearch =
      searchQuery.trim() === '' ||
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.sourceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.officialRef.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesJurisdiction && matchesSearch;
  });

  const getPriorityBadge = (priority: RegulatoryEvent['priority']) => {
    switch (priority) {
      case 'CRITICAL':
        return 'bg-red-100 text-red-950 border-red-300';
      case 'HIGH':
        return 'bg-amber-100 text-amber-950 border-amber-300';
      default:
        return 'bg-emerald-100 text-emerald-950 border-emerald-300';
    }
  };

  const getStatusBadge = (status: RegulatoryEvent['status']) => {
    switch (status) {
      case 'NEW':
        return 'bg-amber-400 text-slate-950 font-extrabold';
      case 'IN_FORCE':
        return 'bg-emerald-600 text-white font-bold';
      case 'GUIDANCE':
        return 'bg-blue-600 text-white font-bold';
      case 'DRAFT':
        return 'bg-purple-600 text-white font-bold';
    }
  };

  return (
    <section id="horizon-feed" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-950 border border-emerald-300 mb-3 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <Radio className="w-3.5 h-3.5 text-emerald-700" />
              <span>Echtzeit Regulatory Intelligence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Horizon Scanning Feed
            </h2>
            <p className="mt-2 text-base sm:text-lg text-slate-600 max-w-2xl font-normal">
              Automatisierte Erfassung, Klassifikation und juristische Folgenabschätzung aller Veröffentlichungen des EU AI Office, der Bundesnetzagentur, BaFin, BSI und CEN-CENELEC.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-600" />
              Täglich synchronisiert
            </span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              {filteredEvents.length} Dokumente erfasst
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-8 shadow-xs">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Filter:
              </span>
              {[
                { id: 'ALL', label: 'Alle Rechtsakte' },
                { id: 'AI_ACT', label: 'EU AI Act' },
                { id: 'DORA', label: 'DORA' },
                { id: 'NIS2', label: 'NIS-2' },
                { id: 'GDPR_AI', label: 'DSGVO / EDSA' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Jurisdiction & Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              {/* Jurisdiction Select */}
              <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
                {[
                  { id: 'ALL', label: 'Alle Regionen' },
                  { id: 'EU', label: 'EU' },
                  { id: 'DE', label: 'DE' },
                ].map((j) => (
                  <button
                    key={j.id}
                    onClick={() => setActiveJurisdiction(j.id)}
                    className={`px-2.5 py-1 text-xs font-bold rounded cursor-pointer ${
                      activeJurisdiction === j.id
                        ? 'bg-emerald-700 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {j.label}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Thema, Behörde oder Art. suchen..."
                  className="w-full sm:w-64 pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Feed List Items */}
        <div className="space-y-4">
          {filteredEvents.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center">
              <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-700 font-bold">Keine regulatorischen Ereignisse für diese Filterkombination gefunden.</p>
              <button
                onClick={() => {
                  setActiveCategory('ALL');
                  setActiveJurisdiction('ALL');
                  setSearchQuery('');
                }}
                className="mt-3 text-xs font-extrabold text-emerald-700 hover:text-emerald-800 underline cursor-pointer"
              >
                Filter zurücksetzen
              </button>
            </div>
          ) : (
            filteredEvents.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <article
                  key={item.id}
                  className={`bg-white rounded-2xl border transition-all ${
                    isExpanded
                      ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/20'
                      : 'border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="p-5 sm:p-6 cursor-pointer select-none"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      {/* Meta Tags */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded text-[11px] font-extrabold tracking-wide uppercase bg-slate-900 text-white">
                          {item.sourceCode}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-black uppercase tracking-wider ${getStatusBadge(item.status)}`}>
                          {item.statusLabel}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          {item.categoryLabel}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${getPriorityBadge(item.priority)}`}>
                          Priorität: {item.priority}
                        </span>
                      </div>

                      {/* Date & Expand toggle */}
                      <div className="flex items-center gap-3 self-end sm:self-auto text-xs text-slate-500 font-medium">
                        <span>{item.date}</span>
                        <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-slate-950 hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h3>

                    {/* Short Summary Teaser */}
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed font-normal">
                      {item.summary}
                    </p>

                    {/* Quick Metadata chips */}
                    <div className="mt-3 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500">
                      <div>
                        <strong className="text-slate-700 font-semibold">Geltungsbereich:</strong> {item.affectedIndustries}
                      </div>
                      <div>
                        <strong className="text-slate-700 font-semibold">Rechtsreferenz:</strong> {item.officialRef}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detailed Analysis */}
                  {isExpanded && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-slate-100 bg-slate-50/60 rounded-b-2xl">
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Legal Impact Box */}
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-2">
                            <BookOpen className="w-4 h-4 text-emerald-600" />
                            <span>Rechtsstatus &amp; Verbindlichkeit</span>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed font-medium">
                            {item.bindingStatus}
                          </p>
                          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                            <strong>Zitierfähige Fundstelle:</strong> {item.officialRef}
                          </div>
                        </div>

                        {/* Action Required Box */}
                        <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-2xs">
                          <div className="flex items-center gap-2 text-xs font-extrabold text-amber-950 mb-2">
                            <Sparkles className="w-4 h-4 text-amber-600" />
                            <span>Erforderliche Handlungsschritte im Audit</span>
                          </div>
                          <p className="text-xs text-slate-800 leading-relaxed font-medium">
                            {item.actionRequired}
                          </p>
                          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                            <span className="text-slate-500">Sofortige Prüfung empfohlen</span>
                            <button
                              onClick={() => {
                                if (navigate) navigate('/audit-check');
                                else window.location.assign('/audit-check');
                              }}
                              className="font-bold text-emerald-700 hover:text-emerald-800 underline inline-flex items-center gap-1 cursor-pointer"
                            >
                              Audit-Check starten * <ExternalLink className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}
                </article>
              );
            })
          )}
        </div>

        {/* Bottom Banner */}
        <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-white">Automatischer wöchentlicher Regulatory Digest</h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Erhalten Sie neue Veröffentlichungen des AI Office und DIN-Normen direkt in Ihre Compliance-Workflows.
            </p>
          </div>
          <button
            onClick={() => {
              if (navigate) navigate('/audit-check');
              else window.location.assign('/audit-check');
            }}
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs transition-colors shrink-0 shadow-sm text-center cursor-pointer"
          >
            Audit-Digest anfordern *
          </button>
        </div>

      </div>
    </section>
  );
};
