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
  applicability?: 'all' | 'high_risk_only';
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
  exemptCount: number;
  applicableCount: number;
  isDeployer: boolean;
  roleTitle: string;
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
  const [showExemptQuestions, setShowExemptQuestions] = useState<boolean>(false);
  const reportRef = React.useRef<HTMLDivElement>(null);

  // Guarantee instant scroll-to-top on route or path change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentPath]);

  // Guarantee that submitting or resetting the audit check brings the relevant content directly into the viewport
  useEffect(() => {
    // Reset immediately to top of document to avoid any clamped bottom position
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    if (submitted) {
      // Bring the audit report container cleanly into the visible viewport
      const timer = setTimeout(() => {
        if (reportRef.current) {
          const headerOffset = 90; // Header height plus breathing room
          const elementPosition = reportRef.current.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = Math.max(0, elementPosition - headerOffset);
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [submitted]);

  const activeJurisdiction: EUAuthorityInfo =
    EU_AUTHORITIES_DATA.find(a => a.isoCode === selectedCountry) || EU_AUTHORITIES_DATA[1];

  const baseQuestions: Question[] = [
    {
      id: 'purpose',
      title: '1. In welchem Bereich wird das KI-System primär eingesetzt?',
      subtitle: 'Der Einsatzzweck bestimmt die fundamentale Risikostufe nach dem EU AI Act.',
      category: 'Klassifizierung',
      legalRef: 'Art. 5 & 6',
      applicability: 'all',
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
      applicability: 'all',
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
      applicability: 'high_risk_only',
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
      applicability: 'high_risk_only',
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
      applicability: 'high_risk_only',
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
      applicability: 'high_risk_only',
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
      applicability: 'high_risk_only',
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
      applicability: 'all',
      options: activeJurisdiction.nationalQuestion.options
    }
  ];

  const handleSelect = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const selectedPurposeIdx = answers['purpose'];
  const currentRisk = selectedPurposeIdx !== undefined ? baseQuestions[0].options[selectedPurposeIdx]?.riskTrigger : undefined;
  const isMinimalOrTransparency = currentRisk === 'minimal' || currentRisk === 'transparency';

  const isQuestionApplicable = (q: Question): boolean => {
    if (isMinimalOrTransparency && q.applicability === 'high_risk_only') {
      return false;
    }
    return true;
  };

  const applicableQuestions = questions.filter(isQuestionApplicable);
  const isComplete = applicableQuestions.every(q => answers[q.id] !== undefined);

  // Compute results with legal branching by risk class and role
  const computeResults = (): AuditResult => {
    // 1. Determine fundamental risk tier from Q1 (purpose)
    const purposeOptIdx = answers['purpose'];
    const purposeOpt = purposeOptIdx !== undefined ? baseQuestions[0].options[purposeOptIdx] : undefined;
    const worstRisk: RiskLevel = purposeOpt?.riskTrigger || 'minimal';

    // 2. Determine legal role from Q2 (role)
    const roleOptIdx = answers['role'];
    const isDeployer = roleOptIdx === 1;
    const roleTitle = roleOptIdx === 0
      ? 'Anbieter (Provider / Entwickler)'
      : roleOptIdx === 1
      ? 'Reiner Betreiber (Deployer / Anwender)'
      : roleOptIdx === 2
      ? 'Betreiber mit wesentlicher Modifikation (Quasi-Anbieter nach Art. 25)'
      : 'Nicht angegeben';

    let totalScore = 0;
    let maxScore = 0;
    let exemptCount = 0;
    let applicableCount = 0;
    const identifiedGaps: { question: string; warning: string; legalRef: string }[] = [];

    questions.forEach(q => {
      const selectedOptIdx = answers[q.id];
      const option = selectedOptIdx !== undefined ? q.options[selectedOptIdx] : undefined;
      const isHighRiskReq = q.applicability === 'high_risk_only';

      // Branching: High-risk requirements (Art. 9–15) do NOT apply to minimal-risk or pure transparency systems!
      const isExempt = (worstRisk === 'minimal' || worstRisk === 'transparency') && isHighRiskReq;

      if (isExempt) {
        exemptCount++;
        // Do not deduct points or trigger false GAPs for non-applicable legal requirements!
        return;
      }

      applicableCount++;
      const highest = Math.max(...q.options.map(o => o.points));
      maxScore += highest;

      if (option) {
        totalScore += option.points;

        if (option.gapWarning) {
          // Specific branch for Deployer vs Provider on Art. 11 (Technical documentation Anhang IV):
          if (q.id === 'tech_doc' && isDeployer) {
            // A pure deployer does not author Anhang IV. Deployer must check CE-mark & instructions (Art. 26 Abs. 1).
            if (selectedOptIdx !== 0) {
              identifiedGaps.push({
                question: 'Prüfpflicht des Betreibers (Deployer)',
                warning: 'Als reiner Betreiber müssen Sie nicht selbst die technische Akte nach Anhang IV erstellen. Sie müssen jedoch vor Inbetriebnahme zwingend prüfen, ob der Anbieter die CE-Kennzeichnung, Konformitätserklärung und die Gebrauchsanweisung bereitgestellt hat (Art. 26 Abs. 1).',
                legalRef: 'Art. 26 Abs. 1'
              });
            }
          } else {
            identifiedGaps.push({
              question: q.title,
              warning: option.gapWarning,
              legalRef: q.legalRef
            });
          }
        }
      }
    });

    let percent = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 100;

    // Strict cap for prohibited practices under Art. 5
    if (worstRisk === 'prohibited') {
      percent = Math.min(percent, 10);
    }

    return {
      totalScore,
      maxScore,
      percent,
      worstRisk,
      identifiedGaps,
      exemptCount,
      applicableCount,
      isDeployer,
      roleTitle
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
            Beantworten Sie die 8 Prüffragen (7 Kernbereiche nach EU AI Act + 1 länderspezifische Aufsichtsfrage für {activeJurisdiction.country}). 
            Sie erhalten eine strukturierte, rollen- und risikoadaptive Audit-Bewertung mit konkreten GAP-Hinweisen.
          </p>
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <span>Anonyme Auswertung im Browser • Keine Datenspeicherung</span>
            <span>
              Fortschritt: {applicableQuestions.filter(q => answers[q.id] !== undefined).length} von {applicableQuestions.length} erforderlichen Fragen beantwortet
              {questions.length - applicableQuestions.length > 0 && ` (${questions.length - applicableQuestions.length} freigestellt)`}
            </span>
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

            {(() => {
              const elements: React.ReactNode[] = [];
              let skipBannerRendered = false;

              questions.forEach((q) => {
                const currentAnswer = answers[q.id];
                const isHighRisk = q.applicability === 'high_risk_only';
                const isExempt = isMinimalOrTransparency && isHighRisk;

                if (isExempt) {
                  if (!skipBannerRendered) {
                    skipBannerRendered = true;
                    elements.push(
                      <div key="exempt_skip_banner" className="bg-emerald-50/80 rounded-2xl border border-emerald-200/90 p-5 sm:p-6 shadow-2xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-2xs">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-white text-emerald-950 border border-emerald-300">
                                  Art. 6 Ausnahme / Freistellung
                                </span>
                                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                                  Art. 9–15 EU AI Act
                                </span>
                              </div>
                              <h3 className="text-sm sm:text-base font-black text-slate-950">
                                5 Hochrisiko-Prüfpunkte übersprungen (Als „Nicht anwendbar“ gewertet)
                              </h3>
                              <p className="text-xs text-slate-700 leading-relaxed max-w-2xl">
                                Da Ihr System unter Art. 6 als <strong>{currentRisk === 'minimal' ? 'Minimalrisiko' : 'reine Transparenz-KI (Art. 50)'}</strong> eingestuft ist, sind Risikomanagementsystem (Art. 9), Bias-Prüfung (Art. 10), technische Dokumentation Anhang IV (Art. 11), automatisches Logging (Art. 12) und formale menschliche Aufsicht (Art. 14) <strong>gesetzlich nicht obligatorisch</strong>. Diese Fragen wurden automatisch übersprungen.
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setShowExemptQuestions(prev => !prev)}
                            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-emerald-100/50 border border-emerald-300 text-emerald-950 transition-all cursor-pointer shrink-0 shadow-2xs"
                          >
                            {showExemptQuestions ? 'Fragen wieder ausblenden' : 'Optionale Fragen dennoch anzeigen'}
                          </button>
                        </div>
                      </div>
                    );
                  }

                  if (!showExemptQuestions) {
                    return;
                  }
                }

                elements.push(
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
                          {isExempt && (
                            <span className="text-[10px] font-bold text-emerald-900 bg-emerald-100/70 px-2 py-0.5 rounded border border-emerald-300">
                              Freigestellt nach Art. 6 (N/A)
                            </span>
                          )}
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

                    {isExempt && (
                      <div className="mb-4 p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/90 flex items-center justify-between gap-2 text-xs text-emerald-950 font-medium">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                          <span>
                            <strong>Freigestellt für Ihre Risikoklasse:</strong> Da Ihr System unter Art. 6 als {currentRisk === 'minimal' ? 'Minimalrisiko' : 'reine Transparenz-KI (Art. 50)'} eingestuft ist, sind die Hochrisiko-Auflagen nach Art. 9–15 für dieses System rechtlich nicht obligatorisch.
                          </span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200 shrink-0 hidden sm:inline-block">
                          Freiwillig / N/A
                        </span>
                      </div>
                    )}

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
              });

              return elements;
            })()}

            {/* Submit Action */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-slate-900">
                  {isComplete
                    ? (applicableQuestions.length < questions.length
                        ? `Alle erforderlichen Fragen beantwortet (${questions.length - applicableQuestions.length} Hochrisiko-Fragen freigestellt)!`
                        : 'Alle Fragen beantwortet!')
                    : 'Bitte beantworten Sie alle erforderlichen Fragen für ein verlässliches Ergebnis.'}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  * Unverbindliche Modellrechnung &amp; strukturierte Orientierungshilfe
                </p>
              </div>

              <button
                disabled={!isComplete}
                onClick={() => {
                  window.scrollTo(0, 0);
                  document.documentElement.scrollTop = 0;
                  document.body.scrollTop = 0;
                  setSubmitted(true);
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
          <div ref={reportRef} id="audit-report-container" className="space-y-8 scroll-mt-24">
            
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
                      <span>Minimales / Kein Risiko (Art. 6)</span>
                    </div>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                      Für dieses System greifen nach den getroffenen Angaben keine obligatorischen Hochrisiko-Auflagen nach Art. 9–15 EU AI Act. 
                      Keine Lücken innerhalb der geprüften, anwendbaren Kriterien erkannt. Dies bestätigt keine vollständige Rechtskonformität. 
                      Wir empfehlen die Dokumentation der Einstufung im betrieblichen KI-Verzeichnis.
                    </p>
                  </div>
                )}
              </div>

              {/* Role and Legal Applicability Section */}
              <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs font-bold text-slate-900">
                      Rollen- &amp; Anwendbarkeitsanalyse: {result.roleTitle}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded border border-emerald-300">
                    {result.exemptCount > 0 ? `${result.exemptCount} von ${questions.length} Kriterien freigestellt` : 'Alle Prüfkriterien anwendbar'}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {result.worstRisk === 'minimal' ? (
                    <span>
                      <strong>Rechtsfolge nach Art. 6:</strong> Da Ihr System als Minimalrisiko eingestuft wurde, sind die umfassenden Hochrisiko-Pflichten der Art. 9–15 (Risikomanagementsystem, Anhang-IV-Akte, automatisches Logging, formale menschliche Aufsicht) <strong>gesetzlich nicht anwendbar</strong> ({result.exemptCount} Kriterien freigestellt). Keine Lücken innerhalb der geprüften, anwendbaren Kriterien erkannt. Dies bestätigt keine vollständige Rechtskonformität.
                    </span>
                  ) : result.worstRisk === 'transparency' ? (
                    <span>
                      <strong>Rechtsfolge nach Art. 50:</strong> Als Dialog- bzw. Chatbot-System unterliegt die KI primär der Transparenzkennzeichnung gegenüber Nutzern. Vollumfängliche Hochrisiko-Audits nach Art. 9–15 entfallen ({result.exemptCount} Prüfkriterien freigestellt). Keine Lücken innerhalb der geprüften, anwendbaren Kriterien erkannt. Dies bestätigt keine vollständige Rechtskonformität.
                    </span>
                  ) : result.isDeployer ? (
                    <span>
                      <strong>Pflichtenverteilung für Betreiber (Deployer nach Art. 26):</strong> Als Anwender eines Drittsystems müssen Sie dieses bestimmungsgemäß einsetzen, Eingabedaten überwachen, Logs für mind. 6 Monate speichern und menschliche Aufsicht gewährleisten. Die technische Dokumentation nach Anhang IV obliegt dem Anbieter.
                    </span>
                  ) : (
                    <span>
                      <strong>Pflichtenverteilung für Anbieter (Provider nach Art. 16):</strong> Als Hersteller tragen Sie die Gesamtverantwortung für die CE-Konformitätsbewertung, die Anhang-IV-Akte und das Risikomanagementsystem nach Art. 9.
                    </span>
                  )}
                </p>
              </div>

              {/* Identified Gaps List */}
              <div className="mt-8">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Identifizierte Compliance-GAPs &amp; Handlungsempfehlungen ({result.identifiedGaps.length})</span>
                </h3>

                {result.identifiedGaps.length === 0 ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs">
                    <div className="flex items-center gap-2 mb-1.5 text-emerald-950 font-black text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>Keine Compliance-GAPs innerhalb der geprüften Kriterien identifiziert</span>
                    </div>
                    <p className="text-emerald-900 leading-relaxed font-medium">
                      Keine Lücken innerhalb der geprüften, anwendbaren Kriterien erkannt. Dies bestätigt keine vollständige Rechtskonformität.
                      {result.worstRisk === 'minimal' && ' Für dieses System greifen nach den getroffenen Angaben keine obligatorischen Hochrisiko-Auflagen nach Art. 9–15 EU AI Act.'}
                    </p>
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
                    window.scrollTo(0, 0);
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
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
              * <strong>Orientierungshilfe &amp; Modellrechnung:</strong> Diese Auswertung basiert auf unüberprüften Selbstauskünften und dient ausschließlich der vorbereitenden Selbsteinschätzung. 
              Keine Lücken innerhalb der geprüften, anwendbaren Kriterien erkannt. Dies bestätigt keine vollständige Rechtskonformität und ersetzt keine behördliche Prüfung oder Rechtsberatung.
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
