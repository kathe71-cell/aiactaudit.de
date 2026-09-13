import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, Printer, Globe, Scale } from 'lucide-react';
import type { RiskLevel } from '../types';
import { EU_AUTHORITIES_DATA } from '../data/euAuthoritiesData';
import type { EUAuthorityInfo } from '../data/euAuthoritiesData';

interface AuditCheckPageProps {
  navigate: (path: string) => void;
  currentPath?: string;
}

interface Question {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  legalRef: string;
  options: {
    label: string;
    description: string;
    points: number;
    riskTrigger?: RiskLevel;
    gapWarning?: string;
  }[];
}

interface AuditResult {
  totalScore: number;
  maxScore: number;
  percent: number;
  worstRisk: RiskLevel;
  identifiedGaps: { question: string; warning: string; legalRef: string }[];
}

const getCountryFromPath = (path?: string): string => {
  if (typeof window !== 'undefined') {
    const searchStr = path?.includes('?') ? path.split('?')[1] : window.location.search;
    const params = new URLSearchParams(searchStr);
    const c = params.get('country');
    if (c) {
      const found = EU_AUTHORITIES_DATA.find(a => a.isoCode.toLowerCase() === c.toLowerCase() || a.id.toLowerCase() === c.toLowerCase());
      if (found) return found.isoCode;
    }
  }
  return 'DE';
};

export const AuditCheckPage: React.FC<AuditCheckPageProps> = ({ navigate, currentPath }) => {

  const [selectedCountry, setSelectedCountry] = useState<string>(() => getCountryFromPath(currentPath));
  const [systemName, setSystemName] = useState<string>('');
  const [systemDescription, setSystemDescription] = useState<string>('');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Guarantee instant scroll-to-top on route or path change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentPath]);

  const activeJurisdiction: EUAuthorityInfo =
    EU_AUTHORITIES_DATA.find(a => a.isoCode === selectedCountry) || EU_AUTHORITIES_DATA[1];

  const baseQuestions: Question[] = [
    {
      id: 'purpose',
      title: '1. In welchem Bereich wird das KI-System primär eingesetzt?',
      subtitle: 'Der Einsatzzweck bestimmt die fundamentale Risikostufe nach dem EU AI Act.',
      category: 'Klassifizierung',
      legalRef: 'Art. 5 & 6',
      options: [
        {
          label: 'HR, Bewerberauswahl, Arbeitsplatz-Evaluation oder Beförderung',
          description: 'Filterung von Lebensläufen, Performance-Scoring, automatisierte Interviews.',
          points: 10,
          riskTrigger: 'high',
          gapWarning: 'Fällt unter Anhang III Nr. 4 (Hochrisiko-KI). Volle Audit-Pflichten nach Art. 9–15.'
        },
        {
          label: 'Emotionserkennung am Arbeitsplatz oder in Schulen/Universitäten',
          description: 'Analyse von Mimik, Stimme oder Aufmerksamkeit von Mitarbeitern oder Schülern.',
          points: 0,
          riskTrigger: 'prohibited',
          gapWarning: 'Art. 5 Abs. 1 lit. f: Verbotene KI-Praktik! Seit 02.02.2025 rechtswidrig.'
        },
        {
          label: 'Bonitätsprüfung, Kreditvergabe oder Risikobewertung bei Finanzdienstleistungen',
          description: 'Kredit-Scoring natürlicher Personen, Prämienkalkulation bei Lebens-/Krankenversicherungen.',
          points: 10,
          riskTrigger: 'high',
          gapWarning: 'Fällt unter Anhang III Nr. 5 lit. b (Hochrisiko-KI). Begründungspflicht nach Art. 86.'
        },
        {
          label: 'Kundenservice-Chatbot, Sprachassistent oder Textgenerierung für Kunden',
          description: 'Direkte Interaktion mit Endkunden zur Beantwortung von Anfragen.',
          points: 15,
          riskTrigger: 'transparency',
          gapWarning: 'Fällt unter Art. 50 Abs. 1. Transparenzhinweis an Nutzer zwingend vorgeschrieben.'
        },
        {
          label: 'HR, Scoring oder Bildung – jedoch nur rein verfahrenstechnische Vorarbeit (Art. 6 Abs. 3)',
          description: 'Das Tool sortiert nur Dubletten oder formatiert Daten, ohne Entscheidungen materiell zu beeinflussen (gesetzliche Ausnahme).',
          points: 18,
          riskTrigger: 'minimal',
          gapWarning: 'Art. 6 Abs. 3 Ausnahme: Dokumentationspflicht der Ausnahmegründe vor Inbetriebnahme erforderlich!'
        },
        {
          label: 'Interne Büro-Tools, Spam-Filter, Übersetzung, Code-Assistenten für Entwickler',
          description: 'Standardisierte Software-Unterstützung ohne Grundrechtseingriff bei Dritten.',
          points: 20,
          riskTrigger: 'minimal'
        }
      ]
    },
    {
      id: 'role',
      title: '2. Welche rechtliche Rolle nimmt Ihr Unternehmen ein?',
      subtitle: 'Die Pflichtenverteilung unterscheidet strikt zwischen Anbietern und reinen Betreibern.',
      category: 'Rolle',
      legalRef: 'Art. 3 & Art. 25',
      options: [
        {
          label: 'Anbieter (Provider / Entwickler)',
          description: 'Wir entwickeln das System selbst oder vermarkten es unter unserer eigenen Marke.',
          points: 10
        },
        {
          label: 'Reiner Betreiber (Deployer / Anwender)',
          description: 'Wir nutzen ein fertiges Drittanbieter-System für betriebliche Zwecke ohne wesentliche Änderungen.',
          points: 15
        },
        {
          label: 'Betreiber mit wesentlicher Modifikation / Re-Branding',
          description: 'Wir haben ein fremdes Basismodell feingetunt oder unter eigenem Namen neu deklariert.',
          points: 5,
          gapWarning: 'Achtung: Nach Art. 25 werden Sie rechtlich zum Anbieter mit vollen CE-Pflichten!'
        }
      ]
    },
    {
      id: 'risk_mgmt',
      title: '3. Ist ein dokumentiertes Risikomanagementsystem nach Art. 9 etabliert?',
      subtitle: 'Gefordert ist ein kontinuierlicher, iterativer Prozess über den gesamten Lebenszyklus.',
      category: 'Risikomanagement',
      legalRef: 'Art. 9',
      options: [
        {
          label: 'Ja, vollständig dokumentiert nach anerkannten Standards (z. B. ISO 42001)',
          description: 'Risiken und vernünftigerweise vorhersehbarer Fehlgebrauch werden systematisch erfasst und gemindert.',
          points: 20
        },
        {
          label: 'Teilweise vorhanden (z. B. allgemeines IT-Risikomanagement / ISO 27001)',
          description: 'Es gibt Risikoanalysen, aber keine spezifische Prüfung von KI-Fehlverhalten oder Bias.',
          points: 10,
          gapWarning: 'Allgemeines IT-Risikomanagement genügt nicht für Art. 9. Spezifische KI-Risiken fehlen.'
        },
        {
          label: 'Nein, bisher kein strukturiertes Risikomanagement für KI vorhanden',
          description: 'Das System wurde ohne formale Risikoanalyse in Betrieb genommen.',
          points: 0,
          gapWarning: 'Art. 9 ist die zwingende Basispflicht für alle Hochrisiko-Systeme vor Markteinführung.'
        }
      ]
    },
    {
      id: 'data_governance',
      title: '4. Werden Trainings- und Testdaten auf Bias und Qualität geprüft?',
      subtitle: 'Art. 10 verlangt repräsentative, fehlerfreie Datensätze und Schutz gegen Diskriminierung.',
      category: 'Daten-Governance',
      legalRef: 'Art. 10',
      options: [
        {
          label: 'Ja, statistische Bias-Audits und vollständige Datenblatt-Dokumentation liegen vor',
          description: 'Datensätze sind auf Verzerrungen untersucht und Herkunft (Data Provenance) ist lückenlos nachweisbar.',
          points: 20
        },
        {
          label: 'Grundlegende Plausibilitätsprüfungen, jedoch keine formalen statistischen Fairness-Tests',
          description: 'Daten werden bereinigt, aber es gibt keine formalen Bias-Audit-Berichte für sensible Merkmale.',
          points: 10,
          gapWarning: 'Fehlende Bias-Prüfberichte verletzen Art. 10 Abs. 2 und führen zu Beanstandungen bei Audits.'
        },
        {
          label: 'Keine gesonderte Prüfung der Datensätze auf Verzerrungen oder Repräsentativität',
          description: 'Nutzung vorhandener Daten ohne formale Qualitätskriterien.',
          points: 0,
          gapWarning: 'Gefahr diskriminierender Entscheidungen mit unmittelbarem Haftungsrisiko.'
        }
      ]
    },
    {
      id: 'tech_doc',
      title: '5. Liegt eine behördlich prüffähige technische Dokumentation (Anhang IV) vor?',
      subtitle: 'Die technische Akte muss vor dem Inverkehrbringen vollständig vorliegen und 10 Jahre aufbewahrt werden.',
      category: 'Dokumentation',
      legalRef: 'Art. 11 & Anhang IV',
      options: [
        {
          label: 'Ja, lückenlose technische Akte gemäß Anhang IV vorhanden und versioniert',
          description: 'Architektur, Trainingsmethoden, Modellparameter und Validierungsergebnisse sind vollständig erfasst.',
          points: 15
        },
        {
          label: 'Entwickler-Dokumentation vorhanden, aber nicht nach dem formalen Schema von Anhang IV',
          description: 'Code-Repositories und READMEs existieren, aber keine konsolidierte regulatorische Akte.',
          points: 8,
          gapWarning: 'Formale Lücke: Anhang IV verlangt eine spezifische Struktur zur Vorlage bei der Marktüberwachung.'
        },
        {
          label: 'Keine systematische Dokumentation der Entwicklungsentscheidungen',
          description: 'Modell wurde ohne formale Architekturdokumentation implementiert.',
          points: 0,
          gapWarning: 'Ohne technische Akte nach Art. 11 darf kein Hochrisiko-System in der EU betrieben werden.'
        }
      ]
    },
    {
      id: 'logging',
      title: '6. Werden Eingaben, Ausgaben und Systemzustände automatisiert protokolliert?',
      subtitle: 'Art. 12 fordert automatisches Logging von Eingaben, Ausgaben und Systemzuständen.',
      category: 'Logging',
      legalRef: 'Art. 12 & Art. 26 Abs. 6',
      options: [
        {
          label: 'Ja, Revisionssicheres Logging mit mindestens 6 Monaten Aufbewahrung',
          description: 'Eingabedaten, Entscheidungsergebnisse und Systemzustände werden nachvollziehbar gespeichert.',
          points: 15
        },
        {
          label: 'Standard-Server-Logs vorhanden, aber keine KI-spezifischen Entscheidungsprotokolle',
          description: 'Fehler und Systemaufrufe werden geloggt, jedoch nicht die exakten Input-/Output-Zustände.',
          points: 7,
          gapWarning: 'Reine Server-Logs genügen nicht für die Pflicht zur Nachvollziehbarkeit bei Zwischenfällen.'
        },
        {
          label: 'Kein kontinuierliches Logging aktiviert',
          description: 'Aus Datenschutz- oder Speichergründen werden keine Protokolle aufbewahrt.',
          points: 0,
          gapWarning: 'Betreiber von Hochrisiko-Systemen müssen Logs nach Art. 26 Abs. 6 mind. 6 Monate speichern.'
        }
      ]
    },
    {
      id: 'human_oversight',
      title: '7. Ist eine qualifizierte menschliche Aufsicht (Human-in-the-Loop) implementiert?',
      subtitle: 'Art. 14 verlangt, dass Menschen KI-Entscheidungen verstehen, anhalten und überstimmen können.',
      category: 'Menschliche Aufsicht',
      legalRef: 'Art. 14',
      options: [
        {
          label: 'Ja, geschultes Personal mit dokumentierter Überstimmungs- und Not-Aus-Befugnis',
          description: 'Personal versteht Systemgrenzen und kann automatisierte Entscheidungen jederzeit korrigieren.',
          points: 15
        },
        {
          label: 'Mitarbeiter schauen gelegentlich auf die Ergebnisse, haben aber keinen formalen Prozess',
          description: 'Keine schriftliche Arbeitsanweisung zur Überstimmung oder Schulung gegen Automation Bias.',
          points: 6,
          gapWarning: 'Gefahr von „Automation Bias“. Schulungsnachweise und klare Weisungsrechte sind Pflicht.'
        },
        {
          label: 'Vollautomatische Dunkelverarbeitung ohne menschliche Prüfung',
          description: 'Entscheidungen werden direkt umgesetzt, ohne dass ein Mensch eingreifen kann.',
          points: 0,
          gapWarning: 'Bei Hochrisiko-Systemen unzulässig, sofern Rechtswirkungen für natürliche Personen entstehen.'
        }
      ]
    }
  ];

  // Dynamically attach the country-specific 8th question
  const questions: Question[] = [
    ...baseQuestions,
    {
      id: `national_${activeJurisdiction.isoCode.toLowerCase()}`,
      title: activeJurisdiction.nationalQuestion.questionTitle,
      subtitle: activeJurisdiction.nationalQuestion.questionSubtitle,
      category: `Länderspezifik (${activeJurisdiction.isoCode})`,
      legalRef: activeJurisdiction.nationalQuestion.legalRef,
      options: activeJurisdiction.nationalQuestion.options
    }
  ];

  const handleSelect = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const isComplete = questions.every(q => answers[q.id] !== undefined);

  // Compute results
  const computeResults = (): AuditResult => {
    let totalScore = 0;
    let maxScore = 0;
    let worstRisk: RiskLevel = 'minimal';
    const identifiedGaps: { question: string; warning: string; legalRef: string }[] = [];

    questions.forEach(q => {
      const selectedOptIdx = answers[q.id];
      if (selectedOptIdx !== undefined) {
        const option = q.options[selectedOptIdx];
        totalScore += option.points;

        if (option.riskTrigger === 'prohibited') worstRisk = 'prohibited';
        else if (option.riskTrigger === 'high' && worstRisk !== 'prohibited') worstRisk = 'high';
        else if (option.riskTrigger === 'transparency' && worstRisk !== 'prohibited' && worstRisk !== 'high') worstRisk = 'transparency';

        if (option.gapWarning) {
          identifiedGaps.push({
            question: q.title,
            warning: option.gapWarning,
            legalRef: q.legalRef
          });
        }
      }
      // max points calculation
      const highest = Math.max(...q.options.map(o => o.points));
      maxScore += highest;
    });

    const percent = Math.round((totalScore / maxScore) * 100);

    return {
      totalScore,
      maxScore,
      percent,
      worstRisk,
      identifiedGaps
    };
  };

  const result = computeResults();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-slate-900 cursor-pointer">
            Startseite
          </button>
          <span>/</span>
          <span className="font-semibold text-slate-900">Audit-Readiness Check</span>
        </div>

        {/* Top Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-950 border border-emerald-300 mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>5-Minuten Selbstevaluation nach Verordnung (EU) 2024/1689</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Interaktiver AI Act Audit-Readiness Check
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Beantworten Sie die 7 Schlüsselfragen zur Einstufung und zum Reifegrad Ihrer KI-Systeme. 
            Sie erhalten eine strukturierte Risikobewertung, konkrete GAP-Hinweise und eine exportierbare Checkliste.
          </p>
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <span>Anonyme Auswertung im Browser • Keine Datenspeicherung</span>
            <span>Fortschritt: {Object.keys(answers).length} von {questions.length} beantwortet</span>
          </div>
        </div>

        {/* Questions Form */}
        {!submitted ? (
          <div className="space-y-6">
            
            {/* System Info & Freetext Assessment Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  Angaben zum KI-System (Optional &amp; vertraulich)
                </h2>
              </div>
              <p className="text-xs text-slate-600 mb-4">
                Geben Sie den Namen und eine kurze Freitext-Beschreibung ein, um die individuelle Auswertung und den Prüfbericht für Ihre Dokumentation zu personalisieren.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Name des KI-Systems / Projekts
                  </label>
                  <input
                    type="text"
                    value={systemName}
                    onChange={(e) => setSystemName(e.target.value)}
                    placeholder="z. B. SmartRecruit AI, SupportBot v2, ScoringEngine..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kurzbeschreibung &amp; geplanter Einsatzzweck (Freitext)
                  </label>
                  <input
                    type="text"
                    value={systemDescription}
                    onChange={(e) => setSystemDescription(e.target.value)}
                    placeholder="z. B. Automatische Filterung von Bewerberprofilen vor Fachabteilungsinterview..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent font-medium"
                  />
                </div>
              </div>

              {/* National Jurisdiction Selection */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Zuständiger europäischer Rechtsraum / Marktüberwachung:</span>
                  </label>
                  <span className="text-[11px] font-mono text-slate-500">
                    Aufsicht: <strong className="text-slate-900">{activeJurisdiction.authorityAcronym}</strong> ({activeJurisdiction.headquarters})
                  </span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1.5 mb-3">
                  {EU_AUTHORITIES_DATA.map((item) => {
                    const isSelected = item.isoCode === selectedCountry;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setSelectedCountry(item.isoCode)}
                        title={`${item.country} (${item.authorityAcronym})`}
                        className={`px-2 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-2xs font-extrabold ring-1 ring-emerald-600'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                        }`}
                      >
                        <span className="text-xs">{item.flag}</span>
                        <span className="font-mono text-[11px]">{item.isoCode}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Country specifics callout */}
                <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/80 flex items-start gap-2.5">
                  <Scale className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-950">
                    <strong className="font-bold">{activeJurisdiction.country} ({activeJurisdiction.authorityAcronym}): </strong>
                    <span>{activeJurisdiction.nationalSpecifics}</span>
                  </div>
                </div>
              </div>

            </div>

            {questions.map((q) => {
              const currentAnswer = answers[q.id];
              return (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-2xs hover:border-slate-300 transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                          {q.category}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {q.legalRef}
                        </span>
                      </div>
                      <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight pt-1">
                        {q.title}
                      </h2>
                    </div>
                    {currentAnswer !== undefined && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                    )}
                  </div>

                  <p className="text-xs text-slate-500 mb-4 font-normal">
                    {q.subtitle}
                  </p>

                  <div className="space-y-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = currentAnswer === optIdx;
                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleSelect(q.id, optIdx)}
                          className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-emerald-50/80 border-emerald-500 ring-1 ring-emerald-500'
                              : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                              isSelected ? 'border-emerald-600 bg-emerald-600' : 'border-slate-400 bg-white'
                            }`}>
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                            <div className="space-y-0.5">
                              <div className="text-xs sm:text-sm font-bold text-slate-900">
                                {opt.label}
                              </div>
                              <div className="text-xs text-slate-600">
                                {opt.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              );
            })}

            {/* Submit Action */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-slate-900">
                  {isComplete ? 'Alle Fragen beantwortet!' : 'Bitte beantworten Sie alle Fragen für ein verlässliches Ergebnis.'}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  * Unverbindliche Modellrechnung &amp; strukturierte Orientierungshilfe
                </p>
              </div>

              <button
                disabled={!isComplete}
                onClick={() => {
                  setSubmitted(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-extrabold text-sm transition-all shadow-md cursor-pointer ${
                  isComplete
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-lg'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Audit-Ergebnisbericht erstellen *</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        ) : (
          /* Results View */
          <div className="space-y-8">
            
            {/* Main Scorecard */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg text-slate-900 relative overflow-hidden">
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
                <div className="space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Audit-Readiness Gesamtbewertung
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
                    {systemName.trim() ? `Ergebnisbericht: ${systemName}` : 'Ergebnisbericht für Ihr KI-System'}
                  </h2>
                  {systemDescription.trim() && (
                    <p className="text-xs text-slate-700 bg-slate-100 p-2 rounded-lg border border-slate-200 inline-block font-mono">
                      Prüfgegenstand: {systemDescription}
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">
                      Erstellt auf Grundlage der Verordnung (EU) 2024/1689.
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-950 border border-emerald-300">
                      <span>{activeJurisdiction.flag}</span>
                      <span>Hoheitsgebiet: {activeJurisdiction.country} ({activeJurisdiction.authorityAcronym})</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 shrink-0">
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-500 uppercase">Readiness-Score</div>
                    <div className="text-3xl font-black text-slate-900 font-mono">{result.percent} %</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-lg">
                    {result.percent >= 75 ? 'A' : result.percent >= 50 ? 'B' : 'C'}
                  </div>
                </div>
              </div>

              {/* National Authority & Sandbox Callout in Audit Report */}
              <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs font-bold text-slate-900">
                      Zuständige nationale Aufsichtsbehörde: {activeJurisdiction.authorityName} ({activeJurisdiction.headquarters})
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded border border-emerald-300">
                    Status Reallabor: {activeJurisdiction.sandboxStatus}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong className="font-semibold">Nationale Rechtsbesonderheit:</strong> {activeJurisdiction.nationalSpecifics}
                </p>
                <div className="mt-3 pt-3 border-t border-slate-200 flex items-start gap-2 text-xs font-bold text-emerald-900 bg-emerald-100/50 p-2.5 rounded-lg border border-emerald-200">
                  <span className="shrink-0 text-emerald-700 font-extrabold">▶ Länderspezifische Handlungsempfehlung:</span>
                  <span>{activeJurisdiction.recommendedNextStep}</span>
                </div>
              </div>

              {/* Classification Banner */}
              <div className="mt-6">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                  Ermittelte Risikoeinstufung:
                </h3>

                {result.worstRisk === 'prohibited' && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-300 text-red-950">
                    <div className="flex items-center gap-2 font-black text-base text-red-900">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <span>ACHTUNG: Tatbestand für unannehmbares Risiko erkannt (Art. 5)</span>
                    </div>
                    <p className="text-xs text-red-900 mt-1 leading-relaxed">
                      Ihr System enthält Merkmale, die seit dem 02.02.2025 in der EU verboten sind (z. B. Emotionserkennung am Arbeitsplatz). 
                      Ein unverzüglicher Betriebsstopp oder eine technische Deaktivierung ist rechtlich zwingend erforderlich, 
                      um Bußgelder bis zu 35 Mio. € bzw. 7 % des Umsatzes abzuwenden.
                    </p>
                  </div>
                )}

                {result.worstRisk === 'high' && (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950">
                    <div className="flex items-center gap-2 font-black text-base text-amber-900">
                      <ShieldCheck className="w-5 h-5 text-amber-700" />
                      <span>Einstufung als Hochrisiko-KI (Art. 6 / Anhang III)</span>
                    </div>
                    <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                      Das System unterliegt den vollumfänglichen Konformitätsanforderungen nach Art. 9–15 (Risikomanagementsystem, 
                      Bias-geprüfte Trainingsdaten, technische Dokumentation, automatisches Logging, menschliche Aufsicht und CE-Kennzeichnung).
                    </p>
                  </div>
                )}

                {result.worstRisk === 'transparency' && (
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-300 text-blue-950">
                    <div className="flex items-center gap-2 font-black text-base text-blue-900">
                      <CheckCircle2 className="w-5 h-5 text-blue-700" />
                      <span>Spezifische Transparenzpflichten (Art. 50)</span>
                    </div>
                    <p className="text-xs text-blue-900 mt-1 leading-relaxed">
                      Kein Hochrisiko-System, jedoch besteht eine gesetzliche Hinweispflicht gegenüber Endnutzern, 
                      dass sie mit einer KI interagieren (z. B. bei Support-Chatbots).
                    </p>
                  </div>
                )}

                {result.worstRisk === 'minimal' && (
                  <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 text-slate-900">
                    <div className="flex items-center gap-2 font-black text-base text-slate-900">
                      <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                      <span>Minimales / Kein Risiko</span>
                    </div>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                      Für dieses System bestehen keine obligatorischen Sonderpflichten nach dem EU AI Act. 
                      Wir empfehlen die Dokumentation der Einstufung im betrieblichen KI-Verzeichnis.
                    </p>
                  </div>
                )}
              </div>

              {/* Identified Gaps List */}
              <div className="mt-8">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Identifizierte Compliance-GAPs &amp; Handlungsempfehlungen ({result.identifiedGaps.length})</span>
                </h3>

                {result.identifiedGaps.length === 0 ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs font-semibold">
                    Hervorragend! Auf Basis Ihrer Angaben wurden keine kritischen Abweichungen identifiziert.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {result.identifiedGaps.map((gap, gIdx) => (
                      <div key={gIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-slate-900">{gap.question}</span>
                          <span className="text-[10px] font-mono font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                            {gap.legalRef}
                          </span>
                        </div>
                        <p className="text-xs text-red-700 font-semibold mt-1">
                          {gap.warning}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions & Print buttons */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setAnswers({});
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Check wiederholen</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 cursor-pointer shadow-2xs"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Drucken / Als PDF speichern</span>
                  </button>

                  <button
                    onClick={() => {
                      navigate('/hochrisiko-matrix');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-xs"
                  >
                    <span>Zur Hochrisiko-Matrix</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Micro disclaimer */}
            <div className="text-center text-xs text-slate-500">
              * <strong>Orientierungshilfe &amp; Modellrechnung:</strong> Diese Auswertung dient ausschließlich der vorbereitenden Selbsteinschätzung 
              und begründet kein Mandatsverhältnis oder behördliche Rechtsverbindlichkeit.
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
