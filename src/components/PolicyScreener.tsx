import React, { useState, useMemo } from 'react';
import { POLICY_SNIPPETS } from '../data/regulatoryFeedData';
import { FileSearch, ArrowRight, Sparkles, Copy, Check, ShieldAlert, AlertTriangle, PenTool, Layers } from 'lucide-react';

interface PolicyScreenerProps {
  navigate?: (path: string) => void;
}

interface CustomAnalysisResult {
  riskScore: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  gaps: {
    article: string;
    issue: string;
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
    recommendation: string;
  }[];
  suggestedText: string;
}

export const PolicyScreener: React.FC<PolicyScreenerProps> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState<'custom' | 'presets'>('custom');
  const [selectedSnippetId, setSelectedSnippetId] = useState<string>(POLICY_SNIPPETS[0].id);
  const [customInput, setCustomInput] = useState<string>(
    'Die Vorauswahl und Absage von Bewerbern erfolgt vollautomatisch durch unseren KI-Algorithmus basierend auf CV-Matching und Audio-Stimmungsanalyse im Video-Interview.'
  );
  const [copied, setCopied] = useState<boolean>(false);

  const currentSnippet = POLICY_SNIPPETS.find((s) => s.id === selectedSnippetId) || POLICY_SNIPPETS[0];

  // Dynamic Rule-Engine for Custom Text
  const customAnalysis: CustomAnalysisResult = useMemo(() => {
    const text = customInput.toLowerCase();
    const gaps: CustomAnalysisResult['gaps'] = [];

    // 1. Prohibited Risk Detection (Art. 5)
    if (text.includes('stimme') || text.includes('emotion') || text.includes('mimik') || text.includes('stimmung') || text.includes('gesichtserkennung') || text.includes('social scoring')) {
      gaps.push({
        article: 'Art. 5 Abs. 1 lit. f EU AI Act',
        issue: 'Erkennung von Emotionen / psychologischen Zuständen am Arbeitsplatz oder im Bewerbungsverfahren ist gesetzlich streng verboten.',
        severity: 'CRITICAL',
        recommendation: 'Emotions- und Stimmungsanalysen müssen unverzüglich aus dem System entfernt und deaktiviert werden.',
      });
    }

    // 2. High Risk / Human Oversight (Art. 14)
    if (text.includes('vollautomatisch') || text.includes('ohne mensch') || text.includes('automatische absage') || text.includes('autonom') || text.includes('ohne prüfung')) {
      gaps.push({
        article: 'Art. 14 EU AI Act (Menschliche Aufsicht)',
        issue: 'Vollautomatisierte Entscheidungen ohne wirksame menschliche Letztverantwortung verstoßen gegen Art. 14 und Art. 22 DSGVO.',
        severity: 'HIGH',
        recommendation: 'Implementieren Sie ein Human-in-the-Loop-Prinzip: KI darf nur strukturierte Empfehlungen liefern, die Letztentscheidung trifft eine qualifizierte Fachkraft.',
      });
    }

    // 3. Data Governance & Bias (Art. 10)
    if (text.includes('bewerber') || text.includes('cv') || text.includes('scoring') || text.includes('kredit') || text.includes('profiling')) {
      gaps.push({
        article: 'Art. 10 EU AI Act (Daten-Governance & Diskriminierungsschutz)',
        issue: 'Hochrisiko-Systeme erfordern dokumentierte Maßnahmen zur Erkennung und Vermeidung von statistischen Verzerrungen (Biases).',
        severity: 'HIGH',
        recommendation: 'Dokumentieren Sie Trainingsdatenquellen und etablieren Sie regelmäßige Bias-Audits für geschützte Merkmale (AGG/Gleichbehandlung).',
      });
    }

    // 4. Logging & Tracing (Art. 12)
    if (!text.includes('protokoll') && !text.includes('audit') && !text.includes('log') && !text.includes('nachvollziehbar')) {
      gaps.push({
        article: 'Art. 12 EU AI Act (Automatische Protokollierung)',
        issue: 'Keine Angaben zur lückenlosen Protokollierung von System-Ereignissen und Entscheidungsfindung auffindbar.',
        severity: 'MEDIUM',
        recommendation: 'Automatische Speicherung aller Input-Daten, System-Scores und menschlicher Freigaben für mindestens 6 Monate vorschreiben.',
      });
    }

    // 5. Transparency (Art. 50)
    if (text.includes('chatbot') || text.includes('gpt') || text.includes('bot') || text.includes('assistent')) {
      gaps.push({
        article: 'Art. 50 EU AI Act (Transparenzpflicht)',
        issue: 'Interaktionspartner müssen unverzüglich darüber informiert werden, dass sie mit einem KI-System kommunizieren.',
        severity: 'HIGH',
        recommendation: 'Eindeutigen Hinweis vor Beginn der Konversation vorschalten („Sie sprechen mit einem KI-Assistenten“).',
      });
    }

    // Determine overall risk score
    let riskScore: CustomAnalysisResult['riskScore'] = 'LOW';
    if (gaps.some(g => g.severity === 'CRITICAL')) riskScore = 'CRITICAL';
    else if (gaps.some(g => g.severity === 'HIGH')) riskScore = 'HIGH';
    else if (gaps.length > 0) riskScore = 'MEDIUM';

    // Generate Suggested Formulation
    let suggested = '„Das eingesetzte KI-System dient ausschließlich der strukturierten Voranalyse und Risikobewertung. ';
    suggested += 'Sämtliche Vorfilterungen erfolgen auf Basis geprüfter, diskriminierungsfreier Datensätze (Art. 10). ';
    suggested += 'Die finale Entscheidungsbefugnis verbleibt ausnahmslos bei geschulten Fachkräften (Human-in-the-Loop, Art. 14). ';
    suggested += 'Alle Entscheidungsschritte, Eingabeparameter und menschlichen Überprüfungen werden manipulationssicher und revisionskonform protokolliert (Art. 12).“';

    return { riskScore, gaps, suggestedText: suggested };
  }, [customInput]);

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleInputs = [
    {
      title: 'HR & Recruiting',
      text: 'Die Vorauswahl und Absage von Bewerbern erfolgt vollautomatisch durch unseren KI-Algorithmus basierend auf CV-Matching und Audio-Stimmungsanalyse im Video-Interview.',
    },
    {
      title: 'Kundenservice Chatbot',
      text: 'Unser Kundensupport beantwortet Anfragen über einen automatisierten KI-Assistenten, ohne dass der Nutzer darauf hingewiesen wird.',
    },
    {
      title: 'Finanz & Bonitätsscoring',
      text: 'Kreditanträge werden autonom durch ein Machine-Learning-Modell bewertet und bei schlechtem Score ohne personelle Nachprüfung final abgelehnt.',
    },
  ];

  return (
    <section id="policy-screener" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-950 border border-amber-300 mb-3 shadow-2xs">
              <FileSearch className="w-3.5 h-3.5 text-amber-700" />
              <span>Interaktive Klauselprüfung mit Freitext-Scan</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              AI Act Policy- &amp; Klausel-Screener
            </h2>
            <p className="mt-2 text-base sm:text-lg text-slate-600 max-w-3xl font-normal">
              Testen Sie Ihre eigenen Richtlinien, Arbeitsverträge, AGB oder KI-Systembeschreibungen in Echtzeit auf Non-Compliance mit den Artikeln 5, 9–15 und 50 des EU AI Acts.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 border border-slate-200 rounded-xl">
            <button
              onClick={() => setActiveTab('custom')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'custom'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PenTool className="w-3.5 h-3.5 text-amber-400" />
              <span>Eigener Freitext-Scan</span>
            </button>
            <button
              onClick={() => setActiveTab('presets')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'presets'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>Standard-Presets</span>
            </button>
          </div>
        </div>

        {/* CUSTOM FREITEXT MODE */}
        {activeTab === 'custom' && (
          <div className="space-y-6">
            
            {/* Input Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <label htmlFor="custom-policy-input" className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-emerald-600" />
                  <span>Ihre Klausel oder Systembeschreibung einfügen (Freitext):</span>
                </label>
                
                {/* Sample quick buttons */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-slate-500 font-semibold mr-1">Beispiele:</span>
                  {sampleInputs.map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCustomInput(sample.text)}
                      className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-white hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                    >
                      {sample.title}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                id="custom-policy-input"
                rows={3}
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Fügen Sie hier Ihren Entwurf, eine HR-Richtlinie, AGB-Klausel oder Systembeschreibung ein..."
                className="w-full p-4 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent font-mono leading-relaxed"
              />

              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <span>Echtzeit-Prüfung gegen Art. 5 (Verbote), Art. 10 (Daten), Art. 12 (Logs), Art. 14 (Aufsicht), Art. 50 (Transparenz)</span>
                <span className="font-bold text-slate-700">{customInput.length} Zeichen</span>
              </div>
            </div>

            {/* Results Display */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs">
              
              {/* Header result bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">Prüfergebnis:</span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    customAnalysis.riskScore === 'CRITICAL'
                      ? 'bg-red-100 text-red-950 border border-red-300'
                      : customAnalysis.riskScore === 'HIGH'
                      ? 'bg-amber-100 text-amber-950 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                  }`}>
                    {customAnalysis.riskScore === 'CRITICAL' && <AlertTriangle className="w-3.5 h-3.5 text-red-700" />}
                    {customAnalysis.riskScore === 'HIGH' && <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />}
                    Risikostufe: {customAnalysis.riskScore}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-md">
                    {customAnalysis.gaps.length} regulatorische Handlungsfelder identifiziert
                  </span>
                </div>
              </div>

              {/* Side by side analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Left: Non compliance findings */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                      Gefundene Schwachstellen &amp; Artikel
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold">Audit-Befund</span>
                  </div>

                  {customAnalysis.gaps.length === 0 ? (
                    <div className="p-6 text-center text-slate-500 text-xs">
                      Keine offensichtlichen Gesetzesverstöße erkannt. Prüfen Sie Ihr gesamtes System im Audit-Check.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {customAnalysis.gaps.map((gap, i) => (
                        <div
                          key={i}
                          className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                            gap.severity === 'CRITICAL'
                              ? 'bg-red-50/70 border-red-200'
                              : 'bg-amber-50/70 border-amber-200'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-slate-950">{gap.article}</span>
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                              gap.severity === 'CRITICAL' ? 'bg-red-200 text-red-950' : 'bg-amber-200 text-amber-950'
                            }`}>
                              {gap.severity}
                            </span>
                          </div>
                          <p className="text-slate-800 font-medium leading-relaxed">{gap.issue}</p>
                          <div className="pt-1 text-[11px] text-slate-600 font-semibold">
                            Empfohlene Korrektur: <span className="font-normal text-slate-800">{gap.recommendation}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Suggested Compliant Formulation */}
                <div className="bg-white rounded-xl border border-emerald-300 p-5 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-950">
                          EU-Konforme Formulierungsvorlage
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Audit-Ready
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200 text-xs sm:text-sm text-slate-900 leading-relaxed font-mono">
                      {customAnalysis.suggestedText}
                    </div>

                    <div className="mt-4 p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                      <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Rechtliche Absicherung durch diese Formulierung:</span>
                      </div>
                      <ul className="text-slate-600 text-xs list-disc list-inside space-y-1">
                        <li>Schließt verbotene Emotionsanalysen explizit aus (Art. 5)</li>
                        <li>Verankert menschliche Letztverantwortung vor Gericht (Art. 14)</li>
                        <li>Erfüllt behördliche Nachweispflichten bei Audits und Kontrollen</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => copyText(customAnalysis.suggestedText)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Klausel kopiert!' : 'Klauseltext kopieren'}</span>
                    </button>

                    <button
                      onClick={() => navigate ? navigate('/audit-check') : window.location.assign('/audit-check')}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 hover:text-emerald-800 underline cursor-pointer"
                    >
                      <span>Gesamtsystem prüfen *</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* PRESET SCENARIOS MODE */}
        {activeTab === 'presets' && (
          <div>
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
                      onClick={() => copyText(currentSnippet.compliantText)}
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
        )}

      </div>
    </section>
  );
};
