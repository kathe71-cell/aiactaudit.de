import React, { useState, useMemo } from 'react';
import { AUDIT_USE_CASES } from '../data/auditData';
import { Search, Filter, AlertCircle, ShieldAlert, CheckCircle, ArrowRight, UserCheck, Briefcase } from 'lucide-react';
import type { UserRole, RiskLevel } from '../types';

interface AuditFinderProps {
  navigate: (path: string) => void;
}

export const AuditFinder: React.FC<AuditFinderProps> = ({ navigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Alle');
  const [selectedRole, setSelectedRole] = useState<UserRole>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');

  const categories = useMemo(() => {
    const cats = ['Alle', ...new Set(AUDIT_USE_CASES.map(item => item.category))];
    return cats;
  }, []);

  const filteredCases = useMemo(() => {
    return AUDIT_USE_CASES.filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.articleRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.auditFocus.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === 'Alle' || item.category === selectedCategory;
      const matchesRisk = selectedRisk === 'all' || item.riskLevel === selectedRisk;

      return matchesSearch && matchesCat && matchesRisk;
    });
  }, [searchQuery, selectedCategory, selectedRisk]);

  const getRiskBadge = (risk: RiskLevel, label: string) => {
    switch (risk) {
      case 'prohibited':
        return (
          <span className="inline-flex items-center gap-1 bg-red-100 text-red-950 border border-red-300 px-2.5 py-1 rounded-md text-xs font-extrabold tracking-wide">
            <AlertCircle className="w-3.5 h-3.5 text-red-700" />
            {label}
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-950 border border-amber-300 px-2.5 py-1 rounded-md text-xs font-extrabold tracking-wide">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
            {label}
          </span>
        );
      case 'transparency':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-950 border border-blue-300 px-2.5 py-1 rounded-md text-xs font-extrabold tracking-wide">
            <CheckCircle className="w-3.5 h-3.5 text-blue-700" />
            {label}
          </span>
        );
      case 'minimal':
        return (
          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-900 border border-slate-300 px-2.5 py-1 rounded-md text-xs font-extrabold tracking-wide">
            <CheckCircle className="w-3.5 h-3.5 text-slate-700" />
            {label}
          </span>
        );
    }
  };

  return (
    <section id="audit-finder" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-white mb-3">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interaktive Klassifizierungs- &amp; Audit-Datenbank</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Anwendungsfälle &amp; Prüfpflichten im Detail
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Filtern Sie konkrete KI-Einsatzszenarien nach Ihrer Rolle, Branche und Risikostufe, 
            um die exakten Audit-Anforderungen und Dokumentationspflichten zu ermitteln.
          </p>
        </div>

        {/* Filter Control Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-4">
          
          {/* Row 1: Search & Role Filter */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Field */}
            <div className="md:col-span-7 relative">
              <label htmlFor="audit-search-input" className="sr-only">Suchbegriff eingeben</label>
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="audit-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Suchbegriff eingeben (z. B. HR, Bewerbung, Chatbot, Kredit, Scoring, Art. 5)..."
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Löschen
                </button>
              )}
            </div>

            {/* Role Switcher */}
            <div className="md:col-span-5 flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setSelectedRole('all')}
                className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedRole === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Alle Rollen
              </button>
              <button
                onClick={() => setSelectedRole('provider')}
                className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  selectedRole === 'provider'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Anbieter (Provider)</span>
              </button>
              <button
                onClick={() => setSelectedRole('deployer')}
                className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  selectedRole === 'deployer'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Betreiber (Deployer)</span>
              </button>
            </div>

          </div>

          {/* Row 2: Category Chips & Risk Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
            {/* Category pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-500 mr-1">Branche:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Risk filter dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="risk-select" className="text-xs font-semibold text-slate-500">Risikostufe:</label>
              <select
                id="risk-select"
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
                className="bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="all">Alle Stufen</option>
                <option value="prohibited">Art. 5: Verboten</option>
                <option value="high">Art. 6: Hochrisiko</option>
                <option value="transparency">Art. 50: Transparenz</option>
                <option value="minimal">Minimales Risiko</option>
              </select>
            </div>
          </div>

          {/* Results count info */}
          <div className="text-xs text-slate-500 flex items-center justify-between pt-1">
            <span>Gefundene Anwendungsfälle: <strong>{filteredCases.length}</strong></span>
            <span>Filter aktiv: {selectedCategory} • {selectedRole === 'all' ? 'Alle Rollen' : selectedRole}</span>
          </div>

        </div>

        {/* Results Cards List */}
        <div className="space-y-6">
          {filteredCases.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
              <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">Keine passenden Anwendungsfälle gefunden</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Passen Sie Ihre Suchbegriffe oder Filterkriterien an, um relevante Treffer anzuzeigen.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Alle');
                  setSelectedRisk('all');
                  setSelectedRole('all');
                }}
                className="mt-4 px-4 py-2 text-xs font-bold bg-slate-900 text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                Filter zurücksetzen
              </button>
            </div>
          ) : (
            filteredCases.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all relative"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {getRiskBadge(item.riskLevel, item.riskLabel)}
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                        {item.articleRef}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight pt-1">
                      {item.title}
                    </h3>
                  </div>

                  <div className="shrink-0 text-right">
                    <div className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Haftungsrahmen</div>
                    <div className="text-xs font-bold text-red-700 mt-0.5">{item.penalties}</div>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-sm text-slate-700 leading-relaxed font-normal">
                  {item.description}
                </p>

                {/* Split obligations: Provider vs. Deployer */}
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Provider Box (shown if role is 'all' or 'provider') */}
                  {(selectedRole === 'all' || selectedRole === 'provider') && (
                    <div className={`p-4 rounded-xl border ${selectedRole === 'provider' ? 'md:col-span-2 bg-emerald-50/50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex items-center gap-2 font-bold text-xs text-slate-900 mb-2">
                        <Briefcase className="w-4 h-4 text-emerald-700" />
                        <span>Pflichten für Anbieter (Provider / Entwickler)</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {item.providerObligations.map((ob, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                            <span>{ob}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Deployer Box (shown if role is 'all' or 'deployer') */}
                  {(selectedRole === 'all' || selectedRole === 'deployer') && (
                    <div className={`p-4 rounded-xl border ${selectedRole === 'deployer' ? 'md:col-span-2 bg-slate-100 border-slate-300' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex items-center gap-2 font-bold text-xs text-slate-900 mb-2">
                        <UserCheck className="w-4 h-4 text-slate-800" />
                        <span>Pflichten für Betreiber (Deployer / Anwender)</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {item.deployerObligations.map((ob, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-800 mt-1.5 shrink-0" />
                            <span>{ob}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>

                {/* Audit-Focus Callout */}
                <div className="mt-4 p-3.5 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs">
                    <span className="font-extrabold text-emerald-400 uppercase tracking-wider block text-[10px] mb-0.5">
                      Prüfschwerpunkt im Audit:
                    </span>
                    <span className="text-slate-200">{item.auditFocus}</span>
                  </div>

                  <button
                    onClick={() => {
                      navigate('/audit-check');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs rounded-lg transition-all cursor-pointer shadow-xs"
                  >
                    <span>{item.partnerLinkText || 'Audit-Checkliste öffnen *'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
};
