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

  // Dynamic Rule-Engine for Custom Text with Negation & Context Awareness
  const customAnalysis: CustomAnalysisResult = useMemo(() => {
    const text = customInput.toLowerCase();
    const gaps: CustomAnalysisResult['gaps'] = [];

    // Helper: checks if keywords appear in a negated context within the sentence
    const isNegated = (keywords: string[]): boolean => {
      // Split into sentences / clauses
      const clauses = text.split(/[.;,!\n]/);
      for (const clause of clauses) {
        const hasKeyword = keywords.some(k => clause.includes(k));
        if (hasKeyword) {
          const hasNegationWord = /\b(kein|keine|keinen|keinem|keiner|keines|nicht|nie|niemals|ohne jegliche|ausgeschlossen|verzichten|vermeiden)\b/.test(clause);
          if (hasNegationWord) {
            return true;
          }
        }
      }
      return false;
    };

    // 1. Prohibited Risk Detection (Art. 5) - Emotionserkennung / Mimik / Social Scoring
    const emotionKeywords = ['stimme', 'emotion', 'mimik', 'stimmung', 'gesichtserkennung', 'social scoring'];
    const hasEmotionTerm = emotionKeywords.some(k => text.includes(k));
    if (hasEmotionTerm) {
      if (isNegated(emotionKeywords)) {
        // Negation recognized! Don't trigger CRITICAL breach, provide confirmation / verification note
        gaps.push({
          article: 'Art. 5 Abs. 1 lit. f EU AI Act (Ausschluss verbotener Praktiken)',
          issue: 'Prüfhinweis: Der Text enthält einen Verneinungsvermerk bezüglich Emotions- oder Stimmungsanalyse. Sofern diese Funktionen technisch wirksam deaktiviert sind, liegt kein Art. 5 Verbot vor.',
          severity: 'MEDIUM',
          recommendation: 'Halten Sie den Ausschluss verbotener Praktiken in der Systemdokumentation und in Vereinbarungen mit Dienstleistern schriftlich fest.',
        });
      } else {
        gaps.push({
          article: 'Art. 5 Abs. 1 lit. f EU AI Act (Prüfhinweis: Verbotene Praktik)',
          issue: 'Hinweis auf Erkennung von Emotionen oder psychologischen Zuständen am Arbeitsplatz / im HR-Prozess. Nach Art. 5 Abs. 1 lit. f streng verboten.',
          severity: 'CRITICAL',
          recommendation: 'Prüfen Sie, ob diese Funktionen tatsächlich aktiv sind. Falls ja, müssen sie unverzüglich aus dem System entfernt und deaktiviert werden.',
        });
      }
    }

    // 2. High Risk / Human Oversight (Art. 14) - Vollautomatisierte Entscheidungen
    const autoDecisionKeywords = ['vollautomatisch', 'ohne mensch', 'automatische absage', 'autonom', 'ohne prüfung', 'automatisiert bewertet', 'automatische bewertung'];
    const hasAutoDecision = autoDecisionKeywords.some(k => text.includes(k));
    if (hasAutoDecision) {
      if (isNegated(autoDecisionKeywords)) {
        gaps.push({
          article: 'Art. 14 EU AI Act (Menschliche Aufsicht)',
          issue: 'Prüfhinweis: Der Text schließt eine rein automatisierte Bewertung aus. Dies stützt die Einhaltung des Human-in-the-Loop-Grundsatzes.',
          severity: 'MEDIUM',
          recommendation: 'Dokumentieren Sie die konkrete fachliche Qualifikation und Überstimmungsbefugnis der prüfenden Personen.',
        });
      } else {
        gaps.push({
          article: 'Art. 14 EU AI Act (Prüfhinweis: Menschliche Aufsicht)',
          issue: 'Hinweis auf vollautomatisierte Absagen oder Bewertungen. Nach Art. 14 und Art. 22 DSGVO ist bei wesentlichen Entscheidungen eine menschliche Letztverantwortung erforderlich.',
          severity: 'HIGH',
          recommendation: 'Stellen Sie sicher, dass das System nur strukturierte Vorschläge liefert und die finale Entscheidung durch eine geschulte Fachkraft getroffen wird.',
        });
      }
    }

    // 3. Data Governance & Bias (Art. 10)
    const hrDataKeywords = ['bewerber', 'cv', 'scoring', 'kredit', 'profiling', 'lebenslauf'];
    const hasHrData = hrDataKeywords.some(k => text.includes(k));
    if (hasHrData) {
      const isCompliantOrNegated = isNegated(hrDataKeywords) || text.includes('diskriminierungsfrei') || text.includes('bias-geprüft') || text.includes('statistisch geprüft');
      if (!isCompliantOrNegated) {
        gaps.push({
          article: 'Art. 10 EU AI Act (Prüfhinweis: Daten-Governance)',
          issue: 'Hinweis auf personenbezogene Einstufungs- oder HR-Prozesse. Hochrisiko-Systeme erfordern Maßnahmen zur Erkennung und Minderung statistischer Verzerrungen (Bias).',
          severity: 'HIGH',
          recommendation: 'Dokumentieren Sie Trainingsdatenquellen und etablieren Sie regelmäßige Bias-Audits für geschützte Merkmale.',
        });
      }
    }

    // 4. Logging & Tracing (Art. 12)
    const isAlreadyCompliant = text.includes('human-in-the-loop') || text.includes('protokoll') || text.includes('audit') || text.includes('log') || text.includes('revisionssicher');
    const isSubstantialHrSystem = hasHrData && !isNegated(hrDataKeywords);
    if (isSubstantialHrSystem && !isAlreadyCompliant) {
      gaps.push({
        article: 'Art. 12 EU AI Act (Prüfhinweis: Protokollierung)',
        issue: 'Keine Hinweise auf automatisierte Protokollierung von System-Entscheidungen aufgefunden.',
        severity: 'MEDIUM',
        recommendation: 'Automatische Speicherung aller Input-Daten, System-Scores und menschlicher Freigaben für mindestens 6 Monate vorsehen.',
      });
    }

    // 5. Transparency (Art. 50)
    const chatbotKeywords = ['chatbot', 'gpt', 'bot', 'assistent'];
    const hasChatbot = chatbotKeywords.some(k => text.includes(k));
    if (hasChatbot && !isNegated(chatbotKeywords)) {
      const hasTransparencyNotice = text.includes('sie sprechen mit') || text.includes('hinweis') || text.includes('gekennzeichnet') || text.includes('informiert');
      if (!hasTransparencyNotice) {
        gaps.push({
          article: 'Art. 50 EU AI Act (Prüfhinweis: Transparenz)',
          issue: 'Hinweis auf interaktive KI-Komponenten ohne erkennbaren Nutzerhinweis aufgefunden.',
          severity: 'HIGH',
          recommendation: 'Eindeutigen Hinweis vor Beginn der Konversation vorschalten („Sie sprechen mit einem KI-Assistenten“).',
        });
      }
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
    <section id="policy-screener" className="py-16 sm:py-24 bg-white border-b border-slate-200 scroll-mt-24">
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
                      Regulatorische Prüfhinweise &amp; Artikel-Abgleich
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold">Ergebnis der Textanalyse</span>
                  </div>

                  {customAnalysis.gaps.length === 0 ? (
                    <div className="p-6 text-center text-slate-500 text-xs">
                      Keine offensichtlichen Gesetzeskonflikte oder Risikobegriffe erkannt. Führen Sie für eine vollständige Bewertung den Audit-Check durch.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {customAnalysis.gaps.map((gap, i) => (
                        <div
                          key={i}
                          className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                            gap.severity === 'CRITICAL'
                              ? 'bg-red-50/70 border-red-200'
                              : gap.severity === 'HIGH'
                              ? 'bg-amber-50/70 border-amber-200'
                              : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-slate-950">{gap.article}</span>
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                              gap.severity === 'CRITICAL' ? 'bg-red-200 text-red-950' : gap.severity === 'HIGH' ? 'bg-amber-200 text-amber-950' : 'bg-slate-200 text-slate-800'
                            }`}>
                              {gap.severity}
                            </span>
                          </div>
                          <p className="text-slate-800 font-medium leading-relaxed">{gap.issue}</p>
                          <div className="pt-1 text-[11px] text-slate-600 font-semibold">
                            Empfohlene Prüfung / Anpassung: <span className="font-normal text-slate-800">{gap.recommendation}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Suggested Formulation Template */}
                <div className="bg-white rounded-xl border border-emerald-300 p-5 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-950">
                          Muster-Formulierungshilfe (Orientierungsvorlage)
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Vorlage
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200 text-xs sm:text-sm text-slate-900 leading-relaxed font-mono">
                      {customAnalysis.suggestedText}
                    </div>

                    <div className="mt-4 p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                      <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Zielsetzung dieser Formulierungshilfe:</span>
                      </div>
                      <ul className="text-slate-600 text-xs list-disc list-inside space-y-1">
                        <li>Dient als Textbaustein zur Dokumentation organisatorischer Grenzen (Art. 5)</li>
                        <li>Formuliert den Grundsatz menschlicher Letztentscheidungsbefugnis (Art. 14)</li>
                        <li>Unterstützt als Vorlage für interne Richtlinien und Prozessbeschreibungen</li>
                      </ul>
                      <p className="text-[10px] text-slate-500 pt-1 italic">
                        * Hinweis: Eine Textvorlage ersetzt nicht den technischen Nachweis der tatsächlichen Systemfunktion bei behördlichen Prüfungen.
                      </p>
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
                          Muster-Formulierungshilfe
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        Orientierungshilfe
                      </span>
                    </div>

                    <div className="p-3.5 rounded-lg bg-emerald-50/50 border border-emerald-200 text-xs sm:text-sm text-slate-900 leading-relaxed font-mono">
                      &ldquo;{currentSnippet.compliantText}&rdquo;
                    </div>

                    <div className="mt-4 p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-2">
                      <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Zielsetzung dieser Formulierungshilfe:</span>
                      </div>
                      <ul className="space-y-1.5 text-slate-600 text-xs list-disc list-inside">
                        <li>Formuliert das Human-in-the-Loop-Prinzip für organisatorische Richtlinien</li>
                        <li>Dient als Textbaustein zur Vorbereitung behördlicher Unterlagen</li>
                        <li>Unterstützt bei der internen Dokumentation von Kontrollprozessen</li>
                      </ul>
                      <p className="text-[10px] text-slate-500 pt-1 italic">
                        * Hinweis: Die tatsächliche Konformität erfordert den technischen Nachweis der Prozesse im Betrieb.
                      </p>
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
