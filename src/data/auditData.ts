import type { AuditUseCase, RequirementArticle, TimelineMilestone, AuditTool, FaqItem } from '../types';

export const AUDIT_USE_CASES: AuditUseCase[] = [
  {
    id: 'hr-recruiting',
    title: 'KI-gestützte Bewerberauswahl & CV-Screening',
    category: 'HR & Beschäftigung',
    riskLevel: 'high',
    riskLabel: 'Hochrisiko-KI (Art. 6 Abs. 2 i.V.m. Anhang III Nr. 4)',
    articleRef: 'Anhang III Nr. 4 lit. a',
    description: 'Systeme zur Veröffentlichung gezielter Stellenanzeigen, Filterung von Bewerbungen und Bewertung von Kandidaten bei Einstellungsverfahren oder Beförderungen.',
    providerObligations: [
      'Einrichtung eines dokumentierten Risikomanagementsystems (Art. 9)',
      'Validierung von Trainings- und Testdaten auf Verzerrungen / Bias (Art. 10)',
      'Vollständige technische Dokumentation vor Markteinführung (Art. 11)',
      'Automatische Protokollierung (Logging) von Systementscheidungen (Art. 12)',
      'Konformitätsbewertung nach Anhang VI durchführen & CE-Kennzeichnung anbringen'
    ],
    deployerObligations: [
      'Gewährleistung qualifizierter menschlicher Aufsicht (Human-in-the-Loop, Art. 26)',
      'Information der betroffenen Bewerber über den Einsatz eines Hochrisiko-KI-Systems (Art. 26 Abs. 11)',
      'Aufbewahrung automatisch generierter Protokolle (mindestens 6 Monate, Art. 26 Abs. 6)',
      'Betriebliche Datenschutz-Folgenabschätzung (DSFA) gem. DSGVO'
    ],
    auditFocus: 'Prüfung der Bias-Audits, Trainingsdaten-Repräsentativität, Nachvollziehbarkeit automatisierter Absagen und Dokumentation der menschlichen Eingriffsmöglichkeiten.',
    penalties: 'Bis zu 15 Mio. € oder bis zu 3 % des weltweiten Jahresumsatzes (Art. 99 Abs. 4)',
    recommendedAction: 'Sofortige Bestandsaufnahme, Nachweis der Trainingsdaten-Governance und Etablierung verbindlicher Kontrollprozesse durch HR-Verantwortliche.',
    partnerLinkText: 'Audit-Checkliste für HR-Systeme anfordern *',
    partnerLinkUrl: '#audit-check'
  },
  {
    id: 'emotion-recognition-workplace',
    title: 'Emotionserkennung am Arbeitsplatz oder in Bildungseinrichtungen',
    category: 'HR & Beschäftigung',
    riskLevel: 'prohibited',
    riskLabel: 'Verbotene KI-Praktik (Art. 5 Abs. 1 lit. f)',
    articleRef: 'Art. 5 Abs. 1 lit. f',
    description: 'Systeme zur Ableitung von Emotionen von Beschäftigten oder Schülern am Arbeitsplatz bzw. in Bildungseinrichtungen (ausgenommen medizinische oder sicherheitsrelevante Gründe).',
    providerObligations: [
      'Verbot des Inverkehrbringens, der Inbetriebnahme und des Vertriebs in der EU'
    ],
    deployerObligations: [
      'Strikter Nutzungsstopp und Außerbetriebnahme bestehender Systeme bis spätestens 02.02.2025'
    ],
    auditFocus: 'Vollständige Identifikation und Stilllegung von Tools zur Stimmungs-, Mimik- oder Aufmerksamkeitsanalyse im Arbeitsverhältnis.',
    penalties: 'Bis zu 35 Mio. € oder bis zu 7 % des weltweiten Jahresumsatzes (Art. 99 Abs. 3)',
    recommendedAction: 'Unverzügliche Deaktivierung entsprechender Systemfunktionen in Videokonferenz- oder Produktivitätstools.',
    partnerLinkText: 'Rechtsprüfung für Verbotstatbestände *',
    partnerLinkUrl: '#audit-check'
  },
  {
    id: 'credit-scoring',
    title: 'KI zur Bonitätsprüfung & Kreditwürdigkeitsbewertung',
    category: 'Finanzwesen & Verträge',
    riskLevel: 'high',
    riskLabel: 'Hochrisiko-KI (Art. 6 Abs. 2 i.V.m. Anhang III Nr. 5 lit. b)',
    articleRef: 'Anhang III Nr. 5 lit. b',
    description: 'Systeme zur Bewertung der Kreditwürdigkeit natürlicher Personen oder zur Festlegung ihrer Kredit-Scores (ausgenommen einfache Betrugserkennungstools).',
    providerObligations: [
      'Mathematische Validierung gegen diskriminierende Merkmale (Art. 10)',
      'Detaillierte Erklärbarkeit der Score-Zustandekommen (Art. 13)',
      'Robustheit gegenüber adversarialen Manipulationen (Art. 15)',
      'EU-Konformitätserklärung und Eintragung in die EU-Datenbank (Art. 49/71)'
    ],
    deployerObligations: [
      'Begründungspflicht bei Ablehnung gegenüber betroffenen Kreditantragstellern (Art. 86)',
      'Kontinuierliches Performance-Monitoring und Überwachung von Drift-Effekten',
      'Menschliche Freigabe relevanter Bonitätsentscheidungen'
    ],
    auditFocus: 'Plausibilitätsprüfung der Algorithmen, Korrelationsprüfungen zu geschützten Attributen (Geschlecht, Herkunft) und Auditierung der Begründungsmechanismen.',
    penalties: 'Bis zu 15 Mio. € oder bis zu 3 % des weltweiten Jahresumsatzes (Art. 99 Abs. 4)',
    recommendedAction: 'Modellvalidierung nachprüfbar dokumentieren und Auskunftsprozesse für Kunden einrichten.',
    partnerLinkText: 'Audit-Leitfaden Kredit-Scoring *',
    partnerLinkUrl: '#audit-check'
  },
  {
    id: 'customer-chatbot',
    title: 'Kunden-Chatbots & KI-Sprachassistenten (Conversational AI)',
    category: 'Kundenservice & Support',
    riskLevel: 'transparency',
    riskLabel: 'Spezifische Transparenzpflicht (Art. 50 Abs. 1)',
    articleRef: 'Art. 50 Abs. 1',
    description: 'Systeme mit künstlicher Intelligenz, die direkt mit Menschen interagieren (z. B. Support-Bots, automatisierte Helpdesks, virtuelle Assistenten).',
    providerObligations: [
      'Design des Systems so auslegen, dass die KI-Natur für Nutzer offenkundig ist'
    ],
    deployerObligations: [
      'Klarer, unmissverständlicher Hinweis an den Nutzer beim ersten Kontakt, dass er mit einer KI interagiert',
      'Ausnahme: Wenn dies aus den Umständen und dem Kontext bereits offensichtlich hervorgeht'
    ],
    auditFocus: 'Prüfung der Hinweistexte bei Begrüßungsnachrichten, Barrierefreiheit der Kennzeichnung und Opt-out-Möglichkeiten zum menschlichen Support.',
    penalties: 'Bis zu 15 Mio. € oder bis zu 3 % des weltweiten Jahresumsatzes (Art. 99 Abs. 4)',
    recommendedAction: 'Standard-Begrüßungstexte im Chatbot-Widget anpassen und Transparenzhinweis revisionssicher hinterlegen.',
    partnerLinkText: 'Transparenz-Checkliste für Chatbots *',
    partnerLinkUrl: '#audit-check'
  },
  {
    id: 'deepfake-generation',
    title: 'Generierung von synthetischen Medien (Bild, Video, Audio / Deepfakes)',
    category: 'Marketing & Medien',
    riskLevel: 'transparency',
    riskLabel: 'Transparenz- & Kennzeichnungspflicht (Art. 50 Abs. 2 & 4)',
    articleRef: 'Art. 50 Abs. 2 & 4',
    description: 'Systeme, die Bild-, Ton- oder Videoinhalte erzeugen oder manipulieren, die echten Personen oder Ereignissen täuschend ähnlich sehen.',
    providerObligations: [
      'Einbettung maschinenlesbarer Wasserzeichen und Provenienz-Metadaten (z. B. C2PA-Standard)'
    ],
    deployerObligations: [
      'Sichtbare Kennzeichnung für Betrachter („Künstlich erzeugt“ oder „Synthetisch manipuliert“)',
      'Ausnahme: Künstlerische Freiheit oder parodistischer Kontext mit angemessener Offenlegung'
    ],
    auditFocus: 'Prüfung der Metadaten-Integrität, Wasserzeichen-Robustheit und lückenlosen Auszeichnung auf Webseiten und Werbekanälen.',
    penalties: 'Bis zu 15 Mio. € oder bis zu 3 % des weltweiten Jahresumsatzes (Art. 99 Abs. 4)',
    recommendedAction: 'Workflow für maschinenlesbare Kennzeichnung und visuelle Disclaimers in Content-Pipelines verankern.',
    partnerLinkText: 'Kennzeichnungs-Leitfaden ansehen *',
    partnerLinkUrl: '#audit-check'
  },
  {
    id: 'critical-infra',
    title: 'KI-Sicherheitskomponenten in kritischer Infrastruktur (KRITIS)',
    category: 'Industrie & Energie',
    riskLevel: 'high',
    riskLabel: 'Hochrisiko-KI (Art. 6 Abs. 2 i.V.m. Anhang III Nr. 2)',
    articleRef: 'Anhang III Nr. 2',
    description: 'Systeme zur Steuerung oder als Sicherheitskomponente für die Verwaltung und den Betrieb von Stromnetzen, Wasserversorgung, Fernwärme oder digitaler Infrastruktur.',
    providerObligations: [
      'Zertifizierung nach einschlägigen Cybersicherheitsstandards (Art. 15)',
      'Nachweis extrem hoher Ausfallsicherheit und Redundanz-Architektur',
      'Umfassende Risikobewertung physischer und digitaler Gefahrenlagen'
    ],
    deployerObligations: [
      'Permanente Überwachung durch zertifiziertes Betriebspersonal',
      'Meldung schwerwiegender Vorfälle an das nationale KI-Büro binnen 72 Stunden (Art. 73)',
      'Protokollierung aller Schalthandlungen und Stellbefehle'
    ],
    auditFocus: 'Architektur-Audit, Penetration-Testing, Notfallabschaltungs-Mechanismen (Fail-Safe) und Dokumentation nach Anhang IV.',
    penalties: 'Bis zu 15 Mio. € oder bis zu 3 % des weltweiten Jahresumsatzes (Art. 99 Abs. 4)',
    recommendedAction: 'Interdisziplinäres Audit zwischen OT-Sicherheit, IT-Compliance und KI-Verantwortlichen terminieren.',
    partnerLinkText: 'Audit-Kriterien KRITIS abrufen *',
    partnerLinkUrl: '#audit-check'
  },
  {
    id: 'gpai-llm',
    title: 'General-Purpose AI Modelle (GPAI / LLMs / Basismodelle)',
    category: 'Entwicklung & Basismodelle',
    riskLevel: 'high',
    riskLabel: 'GPAI-Regulierung (Art. 51 ff. / Strenge Transparenz & Systemisches Risiko)',
    articleRef: 'Art. 51 - 55',
    description: 'Basismodelle mit breitem Einsatzzweck (z. B. vortrainierte Large Language Models mit Rechenleistung > 10^25 FLOPs als Modell mit systemischem Risiko).',
    providerObligations: [
      'Erstellung technischer Modelldokumentation und Modellkarten (Art. 53)',
      'Einhaltung des EU-Urheberrechts (Art. 53 Abs. 1 lit. c)',
      'Veröffentlichung einer Zusammenfassung der genutzten Trainingsinhalte',
      'Bei systemischem Risiko: Adversarial Testing, Risikobewertung & Energieeffizienz-Reports'
    ],
    deployerObligations: [
      'Prüfung der Downstream-Verpflichtungen bei Feintuning oder Einbindung über APIs',
      'Sicherstellung, dass der Einsatzzweck nicht in verbotene oder nicht-konforme Bereiche fällt'
    ],
    auditFocus: 'Nachweis der Copyright-Compliance-Richtlinie, Filterung urheberrechtlicher Daten und Nachweise zum Modelltraining.',
    penalties: 'Bis zu 15 Mio. € oder bis zu 3 % des weltweiten Jahresumsatzes (Art. 101)',
    recommendedAction: 'Urheberrechts-Dokumentation erstellen und Modell-Evaluierungsberichte vorlegen.',
    partnerLinkText: 'GPAI Compliance-Toolkit *',
    partnerLinkUrl: '#audit-check'
  },
  {
    id: 'internal-spam-filter',
    title: 'Interne KI-Spamfilter & einfache Textkorrektur-Tools',
    category: 'Büro & IT-Administration',
    riskLevel: 'minimal',
    riskLabel: 'Minimales / Kein Risiko (Art. 95 Verhaltenskodizes)',
    articleRef: 'Art. 95 (Freiwillig)',
    description: 'Klassische Machine-Learning-Filter für E-Mail-Spam, Rechtschreibkorrektur, automatische Inventarisierung oder Computerspiele.',
    providerObligations: [
      'Keine gesetzlichen Pflichten nach EU AI Act',
      'Freiwilliger Beitritt zu Verhaltenskodizes möglich'
    ],
    deployerObligations: [
      'Beachtung allgemeiner Datenschutzvorgaben (DSGVO) bei personenbezogenen Daten'
    ],
    auditFocus: 'Bestätigung der Nicht-Einstufung unter Anhang I oder Anhang III und Abwesenheit von Art. 5 Verboten.',
    penalties: 'Keine gesonderten AI Act Bußgelder',
    recommendedAction: 'Dokumentation der Klassifizierung im internen KI-Verzeichnis zur Nachweisführung bei Kontrollen.',
    partnerLinkText: 'Minimal-Risiko Bestätigung anlegen *',
    partnerLinkUrl: '#audit-check'
  }
];

export const CORE_REQUIREMENTS: RequirementArticle[] = [
  {
    article: 'Art. 9',
    title: 'Risikomanagementsystem',
    subtitle: 'Kontinuierlicher, iterativer Prozess über den gesamten Lebenszyklus',
    coreRequirements: [
      'Systematische Identifizierung und Bewertung bekannter und vorhersehbarer Risiken',
      'Schätzung von Risiken bei bestimmungsgemäßer Verwendung und vernünftigerweise vorhersehbarem Fehlgebrauch',
      'Evaluierung von Risiken anhand von Daten aus der Marktüberwachung nach dem Inverkehrbringen',
      'Einführung angemessener und gezielter Risikominderungsmaßnahmen'
    ],
    documentationRequired: [
      'Risikomanagement-Plan und Risikomatrix',
      'Testprotokolle zur Wirksamkeit der Risikominimierung',
      'Restrisiko-Bewertung mit Begründung der Vertretbarkeit'
    ],
    auditChecklist: [
      'Wurde das Risikomanagementsystem vor Markteinführung etabliert?',
      'Werden iterative Aktualisierungen bei Modell-Updates nachvollziehbar dokumentiert?',
      'Sind Maßnahmen gegen Fehlgebrauch implementiert?'
    ],
    practicalTip: 'Nutzen Sie etablierte Standards wie ISO/IEC 23894 oder ISO/IEC 42001 als Basis für die Dokumentationsstruktur.'
  },
  {
    article: 'Art. 10',
    title: 'Daten-Governance & Trainingsdaten',
    subtitle: 'Hohe Qualitätsstandards für Trainings-, Validierungs- und Testdatensätze',
    coreRequirements: [
      'Datensätze müssen relevant, repräsentativ, fehlerfrei und vollständig sein',
      'Berücksichtigung der spezifischen geografischen, kontextuellen und verhaltensbezogenen Merkmale',
      'Untersuchung auf mögliche Verzerrungen (Bias), die Diskriminierungen verursachen könnten',
      'Spezifische Daten-Governance-Prozesse (Design-Entscheidungen, Datenbeschaffung, Bereinigung)'
    ],
    documentationRequired: [
      'Data-Sheets / Datenblatt zur Datensatz-Zusammensetzung',
      'Bias-Audit-Berichte und statistische Verteilungsanalysen',
      'Dokumentation der Datenbereinigung und Annotation'
    ],
    auditChecklist: [
      'Ist die Herkunft (Data Provenance) aller Trainingsdaten nachweisbar?',
      'Wurden statistische Tests zur Gleichbehandlung geschützter Gruppen durchgeführt?',
      'Sind sensible Daten gemäß Art. 10 Abs. 5 geschützt?'
    ],
    practicalTip: 'Führen Sie automatisierte Bias-Tests in Ihrer CI/CD-Pipeline durch und speichern Sie Prüfberichte unveränderlich.'
  },
  {
    article: 'Art. 11 & Anhang IV',
    title: 'Technische Dokumentation',
    subtitle: 'Umfassender Nachweis der Konformität vor Markteinführung',
    coreRequirements: [
      'Detaillierte Beschreibung der Systemarchitektur, Algorithmen und Datenstrukturen',
      'Dokumentation der Entwicklungsentscheidungen und Design-Spezifikationen',
      'Nachweise über angewandte harmonisierte Normen oder gemeinsame Spezifikationen',
      'Aktualisierungspflicht bei wesentlichen Änderungen während des Betriebs'
    ],
    documentationRequired: [
      'Vollständige technische Akte gemäß Anhang IV',
      'Architekturdiagramme und Komponenten-Spezifikationen',
      'Validierungsberichte und Software-Metriken'
    ],
    auditChecklist: [
      'Liegt die Dokumentation in strukturierter, behördlich prüffähiger Form vor?',
      'Ist sie für mindestens 10 Jahre nach Inverkehrbringen archiviert?',
      'Enthält sie nachvollziehbare Hard- und Softwarevoraussetzungen?'
    ],
    practicalTip: 'Halten Sie die technische Akte als Versioned Living Document im Repository parallel zum Quellcode.'
  },
  {
    article: 'Art. 12',
    title: 'Automatische Protokollierung (Logging)',
    subtitle: 'Revisionssichere Aufzeichnung während des Betriebs',
    coreRequirements: [
      'Automatische Aufzeichnung von Ereignissen (Logs) über den gesamten Lebenszyklus',
      'Erfassung von Betriebszeiträumen, Eingabedaten, Referenzdatenbanken und Ausgabewerten',
      'Ermöglichung der Erkennung von Systemdrift, Fehlfunktionen und Sicherheitsvorfällen',
      'Aufbewahrungspflicht für Betreiber von mindestens 6 Monaten (Art. 26 Abs. 6)'
    ],
    documentationRequired: [
      'Logging-Konzept und Schema der gespeicherten Log-Attribute',
      'Löschkonzept unter Wahrung der DSGVO-Speicherbegrenzung',
      'Integritätsschutz-Nachweis gegen nachträgliche Manipulation'
    ],
    auditChecklist: [
      'Können Eingaben und Ausgaben im Streitfall eindeutig rekonstruiert werden?',
      'Sind Logs vor Manipulation und unberechtigtem Zugriff geschützt?',
      'Erfolgt eine Überwachung auf Ausfälle des Logging-Dienstes?'
    ],
    practicalTip: 'Nutzen Sie append-only Speicher mit kryptografischen Prüfsummen zur Revisionssicherheit.'
  },
  {
    article: 'Art. 13',
    title: 'Transparenz & Nutzerinformation',
    subtitle: 'Verständliche Gebrauchsanweisungen für Betreiber',
    coreRequirements: [
      'Betreiber müssen in der Lage sein, die Funktionsweise und Grenzen des Systems zu verstehen',
      'Beifügung einer digitalen Gebrauchsanweisung in verständlicher Sprache',
      'Angabe der Genauigkeitsgrade, Robustheit und bekannten Leistungsgrenzen',
      'Klare Benennung vorhersehbarer Umstände, die zu Risiken führen können'
    ],
    documentationRequired: [
      'Benutzerhandbuch / Operator Manual nach Art. 13 Abs. 3',
      'Spezifikation der Hard- und Software-Anforderungen',
      'Modellkarten mit dokumentierten Einschränkungen'
    ],
    auditChecklist: [
      'Ist die Gebrauchsanweisung für das Fachpersonal des Betreibers verständlich formuliert?',
      'Sind die Bedingungen für eine sichere Abschaltung beschrieben?',
      'Werden Genauigkeitsmetriken transparent deklariert?'
    ],
    practicalTip: 'Erstellen Sie eine 1-seitige Schnellübersicht (One-Pager) der Einsatzgrenzen für das operative Personal.'
  },
  {
    article: 'Art. 14',
    title: 'Menschliche Aufsicht (Human Oversight)',
    subtitle: 'Effektive Eingriffsmöglichkeiten für natürliche Personen',
    coreRequirements: [
      'Design des Systems muss wirksame menschliche Überwachung ermöglichen (Human-in-the-Loop / Human-on-the-Loop)',
      'Aufsichtspersonen müssen die Fähigkeiten und Grenzen der KI vollständig erfassen können',
      'Vermeidung von Automation Bias (übermäßiges Vertrauen in KI-Entscheidungen)',
      'Möglichkeit, den Betrieb jederzeit anzuhalten oder Ausgaben zu überstimmen (Not-Aus / Override)'
    ],
    documentationRequired: [
      'Schulungskonzept für Aufsichtspersonen',
      'Prozessbeschreibung für Interventionen und Korrekturentscheidungen',
      'Nachweis von UI/UX-Maßnahmen gegen Automation Bias'
    ],
    auditChecklist: [
      'Haben benannte Personen die fachliche Kompetenz und Entscheidungsbefugnis zur Überstimmung?',
      'Gibt es einen dokumentierten „Stop-Button“ bzw. Unterbrechungsmechanismus?',
      'Werden Überstimmungen protokolliert und analysiert?'
    ],
    practicalTip: 'Führen Sie regelmäßige Simulationsübungen für das Aufsichtspersonal zu Fehlentscheidungen der KI durch.'
  },
  {
    article: 'Art. 15',
    title: 'Genauigkeit, Robustheit & Cybersicherheit',
    subtitle: 'Widerstandsfähigkeit gegen Fehler, Angriffe und Störungen',
    coreRequirements: [
      'Angemessenes Niveau an Genauigkeit über den gesamten Lebenszyklus',
      'Robustheit gegen Fehler und Inkonsistenzen in Eingabedaten',
      'Schutz gegen Cyberbedrohungen und spezifische KI-Angriffe (Data Poisoning, Adversarial Attacks, Model Theft)',
      'Implementierung von Redundanz- und Ausfallsicherheitslösungen'
    ],
    documentationRequired: [
      'Genauigkeits-Testberichte und Konfidenzintervalle',
      'Penetration-Testing- und Vulnerability-Reports für KI-Pipelines',
      'Disaster-Recovery- und Notfallkonzept'
    ],
    auditChecklist: [
      'Wurden Adversarial Attacks und Datenvergiftungstests durchgeführt?',
      'Gibt es Fallback-Systeme bei unplausiblen Eingaben?',
      'Ist das System gegen Prompt-Injection (bei NLP-Komponenten) geschützt?'
    ],
    practicalTip: 'Integrieren Sie automatisierte Robustheitstests (z. B. Rausch-Injektion) in regelmäßige Validierungsläufe.'
  }
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    date: '01. August 2024',
    dateRaw: '2024-08-01',
    title: 'Inkrafttreten des EU AI Act',
    status: 'past',
    targetGroup: 'Alle Unternehmen in der EU & Drittland-Anbieter',
    description: 'Veröffentlichung im EU-Amtsblatt und Beginn der offiziellen Übergangsfristen der Verordnung (EU) 2024/1689.',
    keyPoints: [
      '20-tägige Frist nach Veröffentlichung abgelaufen',
      'Start der nationalen Vorbereitungen der Aufsichtsbehörden',
      'Beginn der Umsetzungsfristen für Unternehmen'
    ],
    penaltyRisk: 'Noch keine operativen Bußgelder für materielle Anforderungen'
  },
  {
    date: '02. Februar 2025',
    dateRaw: '2025-02-02',
    title: 'Stufe 1: Verbot unannehmbarer Risiken (Kapitel I & II)',
    status: 'past',
    targetGroup: 'Alle Entwickler, Anbieter und Betreiber von KI-Systemen',
    description: 'Vollständiges Verbot bestimmter KI-Praktiken nach Art. 5. Verstöße sind seit diesem Tag EU-weit rechtswidrig und unmittelbar bußgeldbewehrt.',
    keyPoints: [
      'Verbot von Social Scoring durch Behörden und private Stellen',
      'Verbot kognitiver Verhaltensmanipulation mit Schadensfolge',
      'Verbot von Emotionserkennung am Arbeitsplatz & in Bildungseinrichtungen',
      'Verbot ungezielter Gesichtsbild-Scrapes aus dem Internet oder Videoüberwachung'
    ],
    penaltyRisk: 'Höchststrafe: Bis zu 35 Mio. € oder 7 % des weltweiten Jahresumsatzes (Art. 99 Abs. 3)'
  },
  {
    date: '02. August 2025',
    dateRaw: '2025-08-02',
    title: 'Stufe 2: GPAI-Basismodelle & europäisches KI-Büro (Kapitel V)',
    status: 'past',
    targetGroup: 'Hersteller von General Purpose AI (LLMs) & Notifizierungsstellen',
    description: 'Inkrafttreten der Pflichten für Basismodelle. Das europäische KI-Büro überwacht Transparenz, Urheberrecht und systemische Risiken.',
    keyPoints: [
      'Verbindliche Transparenz- und Copyright-Vorgaben für GPAI-Modelle (Art. 53)',
      'Zusatzpflichten für Modelle mit systemischem Risiko (Rechenaufwand > 10^25 FLOPs)',
      'Volle Durchsetzungsbefugnisse des europäischen KI-Büros (AI Office)',
      'Akkreditierung benannter Konformitätsbewertungsstellen in den EU-Staaten'
    ],
    penaltyRisk: 'Geldbußen bei GPAI-Verstößen: Bis zu 15 Mio. € oder 3 % des Jahresumsatzes (Art. 101)'
  },
  {
    date: '02. August 2026',
    dateRaw: '2026-08-02',
    title: 'Stufe 3: Vollständige Geltung & Hochrisiko-Systeme (Anhang III)',
    status: 'imminent',
    targetGroup: 'Anbieter & Betreiber aller Anhang-III-Hochrisiko-Systeme',
    description: 'Der zentrale Durchsetzungs-Meilenstein des EU AI Acts: Sämtliche Hochrisiko-Systeme aus Anhang III müssen auditiert, CE-zertifiziert und registriert sein.',
    keyPoints: [
      'Volle Pflichten für HR-Systeme, Kredit-Scoring, Bildungsbewertung und Justiz',
      'Vollständige Einhaltung von Art. 9–15 (Risikomanagement, Logging, Aufsicht)',
      'Pflicht zur Registrierung in der zentralen EU-Hochrisiko-Datenbank',
      'Umfassende Betreiberpflichten nach Art. 26'
    ],
    penaltyRisk: 'Geldbußen bei Pflichtverletzung: Bis zu 15 Mio. € oder 3 % des Jahresumsatzes (Art. 99 Abs. 4)'
  },
  {
    date: '02. August 2027',
    dateRaw: '2027-08-02',
    title: 'Stufe 4: Regulierte Produkte & Anhang-I-Systeme',
    status: 'future',
    targetGroup: 'Hersteller von Medizinprodukten, Maschinen, Fahrzeugen, Luftfahrt',
    description: 'Inkrafttreten für KI-Systeme, die Sicherheitsbauteile bereits harmonisierter EU-Produktsicherheitsvorschriften sind.',
    keyPoints: [
      'Integration der KI-Anforderungen in bestehende Konformitätsverfahren (z. B. MDR, Maschinenverordnung)',
      'Abschluss der 36-monatigen Übergangsfrist für Altprodukte',
      'Vollständige Angleichung des europäischen Produktsicherheitsrechts'
    ],
    penaltyRisk: 'Produktbezogene Rückrufe, Marktrücknahmen und Bußgelder'
  }
];

export const AUDIT_TOOLS: AuditTool[] = [
  {
    id: 'tool-fairlearn',
    name: 'Fairlearn (Open Source)',
    category: 'Bias & Fairness Testing',
    type: 'Python Library / Open Source',
    description: 'Von führenden Forschern entwickeltes Toolkit zur Messung und Minderung algorithmischer Ungleichbehandlung in Machine-Learning-Modellen.',
    useCase: 'Art. 10 Daten-Governance & Bias-Auditierung bei HR- und Scoring-Systemen',
    url: 'https://fairlearn.org',
    pricing: 'Kostenfrei (MIT Lizenz)',
    badge: 'Open Source Standard'
  },
  {
    id: 'tool-iso42001',
    name: 'ISO/IEC 42001 Audit-Frameworks',
    category: 'Zertifizierung & Managementsystem',
    type: 'Internationaler Standard / Audit-Norm',
    description: 'Das weltweit erste zertifizierbare Managementsystem für Künstliche Intelligenz (AIMS). Bildet die ideale organisatorische Grundlage für den EU AI Act.',
    useCase: 'Art. 9 Risikomanagement & unternehmensweites Qualitätsmanagement',
    url: 'https://www.iso.org/standard/81230.html',
    pricing: 'Standarderwerb & Auditorenhonorar',
    badge: 'Akkreditierter Standard'
  },
  {
    id: 'tool-avid',
    name: 'AVID (AI Vulnerability Database)',
    category: 'Cybersicherheit & Risikokatalog',
    type: 'Security Framework / Knowledge Base',
    description: 'Strukturierte Datenbank zur Erfassung von Schwachstellen, Fehlern und Sicherheitsrisiken in KI- und Sprachmodellen.',
    useCase: 'Art. 15 Cybersicherheit & Adversarial Testing',
    url: 'https://avidml.org',
    pricing: 'Open Community / Frei zugänglich',
    badge: 'Security Fokus'
  },
  {
    id: 'tool-c2pa',
    name: 'C2PA Content Credentials',
    category: 'Transparenz & Provenienz',
    type: 'Offener Industriestandard',
    description: 'Standard zur kryptografischen Herkunftsnachweisführung von synthetischen Medien, Bildern und Audiodateien.',
    useCase: 'Art. 50 Abs. 2 Kennzeichnungspflicht für KI-generierte Medien',
    url: 'https://c2pa.org',
    pricing: 'Offener Standard',
    badge: 'Transparenz-Referenz'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Gilt der EU AI Act auch für Unternehmen außerhalb der Europäischen Union?',
    category: 'Geltungsbereich',
    legalRef: 'Art. 2 Abs. 1',
    answer: 'Ja, der EU AI Act besitzt wie die DSGVO ein extraterritoriales Marktortprinzip. Er gilt für alle Anbieter weltweit, deren KI-Systeme in der EU in den Verkehr gebracht oder in Betrieb genommen werden, sowie für Betreiber, wenn die durch das System erzeugten Ausgaben in der Europäischen Union verwendet werden.'
  },
  {
    question: 'Welche Kriterien stufen ein KI-System als Hochrisiko nach Anhang III ein?',
    category: 'Klassifizierung',
    legalRef: 'Art. 6 & Anhang III',
    answer: 'Anhang III definiert 8 spezifische Anwendungsbereiche: (1) Biometrie, (2) Kritische Infrastruktur, (3) Bildung & Berufsbildung, (4) Beschäftigung & Personalmanagement, (5) Zugang zu essenziellen privaten & öffentlichen Diensten (z. B. Kredit-Scoring), (6) Strafverfolgung, (7) Migration & Asyl, (8) Rechtspflege & demokratische Prozesse. Systeme in diesen Bereichen sind grundsätzlich Hochrisiko, es sei denn, sie stellen kein erhebliches Schadensrisiko dar (Art. 6 Abs. 3 Ausnahme-Regel).'
  },
  {
    question: 'Was ist die Ausnahme nach Art. 6 Abs. 3 (kein Hochrisiko trotz Anhang III)?',
    category: 'Ausnahmeregelung',
    legalRef: 'Art. 6 Abs. 3',
    answer: 'Ein System aus Anhang III gilt ausnahmsweise nicht als Hochrisiko, wenn es die Entscheidungsfindung nicht materiell beeinflusst. Dies betrifft Systeme, die nur: (a) eine eng definierte Verfahrensaufgabe ausführen, (b) das Ergebnis einer vorherigen menschlichen Tätigkeit verbessern, (c) rein vorbereitende Mustererkennung ohne Vorgriff leisten, oder (d) nur vorbereitende Aufgaben wahrnehmen. Anbieter müssen diese Nicht-Einstufung jedoch vor Markteinführung vollständig dokumentieren.'
  },
  {
    question: 'Müssen alle Hochrisiko-Systeme von einer externen Prüfstelle (Benannte Stelle) zertifiziert werden?',
    category: 'Konformitätsbewertung',
    legalRef: 'Art. 43 & Anhänge VI/VII',
    answer: 'Nein. Für die meisten Hochrisiko-Systeme nach Anhang III (wie HR-Software oder Kredit-Scoring) genügt nach Art. 43 Abs. 1 das interne Konformitätsbewertungsverfahren nach Anhang VI (Selbstzertifizierung durch den Anbieter mit lückenloser technischer Dokumentation und CE-Erklärung). Eine Einbindung Benannter Stellen (Anhang VII) ist vor allem bei biometrischer Fernidentifikation oder bei regulierten Produkten nach Anhang I vorgeschrieben.'
  },
  {
    question: 'Welche Dokumente müssen für ein behördliches Audit zwingend vorliegen?',
    category: 'Audit & Dokumentation',
    legalRef: 'Art. 11 & Anhang IV',
    answer: 'Ein vollständiges Audit erfordert: (1) Die technische Dokumentation nach Anhang IV, (2) das dokumentierte Risikomanagementsystem nach Art. 9, (3) Datenblatt- und Bias-Audit-Berichte der Trainingsdaten (Art. 10), (4) Logging-Architektur und Protokolle (Art. 12), (5) Bedienungsanleitung nach Art. 13, (6) Schulungs- und Überwachungsnachweis für menschliche Aufsicht (Art. 14), (7) Robustheits- und Cybersicherheitsberichte (Art. 15), (8) die EU-Konformitätserklärung sowie (9) den Nachweis der Registrierung in der EU-Datenbank.'
  },
  {
    question: 'Was müssen reine Anwender bzw. Betreiber (Deployer) von Standard-KI-Tools tun?',
    category: 'Betreiberpflichten',
    legalRef: 'Art. 26',
    answer: 'Unternehmen, die fertige KI-Lösungen einsetzen, müssen: (1) die Gebrauchsanweisung des Anbieters strikt befolgen, (2) qualifizierte Mitarbeiter für die menschliche Aufsicht abstellen, (3) bei Hochrisiko-Systemen die automatisch erzeugten Logs mindestens 6 Monate aufbewahren, (4) Mitarbeiter und Betriebsräte informieren und (5) das System stoppen sowie den Anbieter informieren, falls ein ernstes Risiko oder ein Vorfall auftritt.'
  },
  {
    question: 'Wann wird ein Betreiber rechtlich selbst zum Anbieter (Provider)?',
    category: 'Rollenwechsel',
    legalRef: 'Art. 25',
    answer: 'Ein Betreiber wird automatisch zum Anbieter mit allen damit verbundenen Pflichten, wenn er: (a) seinen eigenen Namen oder seine Handelsmarke auf einem Hochrisiko-KI-System anbringt, (b) die Zweckbestimmung eines bestehenden Systems so ändert, dass es zum Hochrisiko-System wird, oder (c) eine wesentliche Veränderung (substantial modification) an einem bestehenden System vornimmt.'
  },
  {
    question: 'Welche Sonderregeln gelten für Open-Source-KI-Modelle?',
    category: 'Open Source',
    legalRef: 'Art. 2 Abs. 12',
    answer: 'Frei zugängliche Open-Source-KI-Modelle (unter freien und offenen Lizenzen, bei denen Parameter, Gewichte und Modellarchitektur öffentlich sind) sind von wesentlichen Pflichten ausgenommen, sofern sie nicht als Hochrisiko-Systeme eingesetzt werden, nicht verboten sind und keine Modelle mit allgemeinem Verwendungszweck mit systemischem Risiko darstellen.'
  }
];
