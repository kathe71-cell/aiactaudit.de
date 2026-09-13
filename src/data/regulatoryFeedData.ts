export interface RegulatoryEvent {
  id: string;
  sourceCode: string; // e.g. "EU · ABl.", "DE · BaFin", "DE · BSI", "EU · AI Office"
  jurisdiction: 'EU' | 'DE' | 'FR' | 'INT';
  category: 'AI_ACT' | 'DORA' | 'NIS2' | 'GDPR_AI';
  categoryLabel: string;
  status: 'IN_FORCE' | 'NEW' | 'GUIDANCE' | 'DRAFT';
  statusLabel: string;
  title: string;
  date: string;
  bindingStatus: string;
  affectedIndustries: string;
  summary: string;
  officialRef: string;
  actionRequired: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
}

export interface WatchtowerMetric {
  id: string;
  title: string;
  tag: string;
  eventsCount: number;
  criticalAlerts: number;
  progressPercent: number;
  statusBadge: string;
  description: string;
  keyLegislation: string;
  lastUpdate: string;
}

export interface PolicySnippet {
  id: string;
  title: string;
  category: string;
  originalText: string;
  detectedGaps: {
    article: string;
    issue: string;
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
    recommendation: string;
  }[];
  compliantText: string;
}

export const REGULATORY_EVENTS: RegulatoryEvent[] = [
  {
    id: 'reg-01',
    sourceCode: 'EU · AI Office',
    jurisdiction: 'EU',
    category: 'AI_ACT',
    categoryLabel: 'EU AI Act',
    status: 'NEW',
    statusLabel: 'NEU',
    title: 'Code of Practice für General Purpose AI (GPAI) – Veröffentlichung des Entwurfs',
    date: '10. September 2026',
    bindingStatus: 'Verbindliche Leitlinie · Konsultation läuft',
    affectedIndustries: 'Software, Tech-Plattformen, KI-Modellhersteller',
    summary: 'Das europäische KI-Büro hat die vorläufigen Verhaltenskodizes für Hersteller von GPAI-Modellen (u. a. Transparenz über Trainingsdaten, Copyright-Compliance und systemische Risikobewertungen nach Art. 53 & 55) vorgelegt.',
    officialRef: 'Verordnung (EU) 2024/1689, Art. 53, 56',
    actionRequired: 'Prüfung der Modellkarten und Urheberrechts-Filter vor dem Stichtag August 2025.',
    priority: 'CRITICAL'
  },
  {
    id: 'reg-02',
    sourceCode: 'EU · ABl.',
    jurisdiction: 'EU',
    category: 'AI_ACT',
    categoryLabel: 'EU AI Act',
    status: 'IN_FORCE',
    statusLabel: 'IN KRAFT',
    title: 'Stufe 1 des AI Acts aktiv: Vollständiges Verbot unannehmbarer Risiken',
    date: '02. Februar 2025',
    bindingStatus: 'Unmittelbar geltend · Bußgeldbewehrt',
    affectedIndustries: 'Alle Branchen, HR, Bildung, Sicherheitssektor',
    summary: 'Kapitel II (Art. 5) ist seit dem 02.02.2025 europaweit verbindlich. Emotionserkennung am Arbeitsplatz, Social Scoring sowie manipulative Systeme sind verboten. Bei Verstößen greifen Strafen bis zu 35 Mio. € bzw. 7 % des Umsatzes.',
    officialRef: 'ABl. L 2024/1689, Art. 5 i.V.m. Art. 99 Abs. 3',
    actionRequired: 'Unverzügliche Stilllegung verbotener Tools in HR- und Videokonferenz-Systemen.',
    priority: 'CRITICAL'
  },
  {
    id: 'reg-03',
    sourceCode: 'DE · BaFin',
    jurisdiction: 'DE',
    category: 'DORA',
    categoryLabel: 'DORA & Banken',
    status: 'IN_FORCE',
    statusLabel: 'IN KRAFT',
    title: 'DORA-Umsetzungsrundschreiben: IKT-Drittparteienrisiko & KI-Klauseln',
    date: '15. August 2026',
    bindingStatus: 'Verwaltungspraxis Deutschland · Finanzaufsicht',
    affectedIndustries: 'Banken, Versicherungen, FinTechs, Krypto-Dienstleister',
    summary: 'Die BaFin präzisiert die Auslagerungsanforderungen für KI-gestützte Scoring- und Trading-Systeme nach DORA. Verträge mit Cloud- und KI-Anbietern müssen zwingende Auskunfts- und Auditrechte nach Art. 30 DORA enthalten.',
    officialRef: 'Verordnung (EU) 2022/2554, Art. 28–30 / BaFin Rundschreiben',
    actionRequired: 'Auditierung des IKT-Dienstleisterregisters und Nachtragsklauseln für KI-Lieferanten.',
    priority: 'HIGH'
  },
  {
    id: 'reg-04',
    sourceCode: 'DE · BSI',
    jurisdiction: 'DE',
    category: 'NIS2',
    categoryLabel: 'NIS-2 & BSI',
    status: 'GUIDANCE',
    statusLabel: 'LEITFADEN',
    title: 'BSI-Leitfaden: Technische Robustheit von KI-Systemen in KRITIS-Infrastrukturen',
    date: '28. August 2026',
    bindingStatus: 'Technischer Sicherheitsstandard',
    affectedIndustries: 'Energie, Wasser, Gesundheit, Transport, IT-Dienstleister',
    summary: 'Empfehlungen zur Härtung von Machine-Learning-Pipelines gegen Data Poisoning, Adversarial Evasion und Prompt Injections im Rahmen des NIS-2-Umsetzungsgesetzes (NIS2UmsuCG).',
    officialRef: 'BSI CS-104 / Art. 15 EU AI Act',
    actionRequired: 'Penetration-Testing für produktive KI-Endpunkte in Kernprozessen terminieren.',
    priority: 'HIGH'
  },
  {
    id: 'reg-05',
    sourceCode: 'EU · EDSA',
    jurisdiction: 'EU',
    category: 'GDPR_AI',
    categoryLabel: 'DSGVO & KI',
    status: 'GUIDANCE',
    statusLabel: 'LEITFADEN',
    title: 'EDSA-Stellungnahme: Rechtsgrundlagen für das Training von LLMs mit personenbezogenen Daten',
    date: '04. September 2026',
    bindingStatus: 'Europäischer Datenschutzausschuss',
    affectedIndustries: 'KI-Startups, Forschung, Enterprise IT',
    summary: 'Der Europäische Datenschutzausschuss klärt die Grenzen von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) beim Web-Scraping und Modelltraining. Strikte Opt-Out-Mechanismen und Zweckbindungsnachweise erforderlich.',
    officialRef: 'EDSA Leitlinien 02/2026 zu Art. 5, 6 & 17 DSGVO',
    actionRequired: 'Dokumentation der Interessenabwägung und Löschkonzepte für Trainingskorpora.',
    priority: 'MEDIUM'
  },
  {
    id: 'reg-06',
    sourceCode: 'EU · CEN-CENELEC',
    jurisdiction: 'EU',
    category: 'AI_ACT',
    categoryLabel: 'Normung & Standards',
    status: 'DRAFT',
    statusLabel: 'ENTWURF',
    title: 'Harmonisierte Normen JTC 21: Konformitätsbewertungsverfahren für Hochrisiko-KI',
    date: '01. September 2026',
    bindingStatus: 'Europäisches Normungsgremium · Standardisierungsauftrag',
    affectedIndustries: 'Industrie, Medizintechnik, HR-Softwareanbieter',
    summary: 'Veröffentlichung des ersten vollständigen Entwurfs für prEN 17998 zur Erfüllung von Art. 9 (Risikomanagementsystem) und Art. 11 (Technische Dokumentation). Vermutungswirkung bei Einhaltung.',
    officialRef: 'CEN/CLC JTC 21 / Mandat M/593 der EU-Kommission',
    actionRequired: 'Abgleich interner Dokumentationsvorlagen mit den Normentwürfen.',
    priority: 'HIGH'
  }
];

export const WATCHTOWER_METRICS: WatchtowerMetric[] = [
  {
    id: 'wt-ai-act',
    title: 'EU AI Act Radar',
    tag: 'Verordnung (EU) 2024/1689',
    eventsCount: 214,
    criticalAlerts: 18,
    progressPercent: 92,
    statusBadge: 'STUFE 1 AKTIV',
    description: 'Vollständige Überwachung aller delegierten Rechtsakte, Leitlinien des KI-Büros und nationalen Durchsetzungsmaßnahmen in den 27 EU-Staaten.',
    keyLegislation: 'Kapitel I–XII, Anhänge I–XIII',
    lastUpdate: 'Heute, vor 2 Stunden'
  },
  {
    id: 'wt-dora',
    title: 'DORA & Finanzen',
    tag: 'Verordnung (EU) 2022/2554',
    eventsCount: 148,
    criticalAlerts: 9,
    progressPercent: 78,
    statusBadge: 'IN KRAFT',
    description: 'Regulatorische Anforderungen für IKT-Drittparteien, KI-Nutzung in Kernbanksystemen und digitale operationale Resilienz.',
    keyLegislation: 'RTS & ITS der ESAs (EBA, EIOPA, ESMA)',
    lastUpdate: 'Gestern, 18:40 Uhr'
  },
  {
    id: 'wt-nis2',
    title: 'NIS-2 & Cyber Resilience',
    tag: 'Richtlinie (EU) 2022/2555 & CRA',
    eventsCount: 112,
    criticalAlerts: 12,
    progressPercent: 65,
    statusBadge: 'NATIONALES GESETZ',
    description: 'Sicherheitsanforderungen für digitale Lieferketten, Meldepflichten (24h/72h) und Haftung der Geschäftsleitung.',
    keyLegislation: 'NIS2UmsuCG (DE) & Cyber Resilience Act',
    lastUpdate: 'Vor 1 Tag'
  },
  {
    id: 'wt-gdpr-ai',
    title: 'DSGVO & KI-Governance',
    tag: 'Verordnung (EU) 2016/679',
    eventsCount: 84,
    criticalAlerts: 6,
    progressPercent: 85,
    statusBadge: 'RECHTSPRECHUNG',
    description: 'Schnittstelle zwischen KI-Modellen und Datenschutz: DSFA nach Art. 35, automatisierte Einzelentscheidungen (Art. 22) und Betroffenenrechte.',
    keyLegislation: 'EDSA-Leitlinien, EuGH-Urteile, DSK-Beschlüsse',
    lastUpdate: 'Vor 2 Tagen'
  }
];

export const POLICY_SNIPPETS: PolicySnippet[] = [
  {
    id: 'policy-hr',
    title: '1. HR-Recruiting & Bewerberauswahl-Richtlinie',
    category: 'Beschäftigung & Personalmanagement (Anhang III Nr. 4)',
    originalText: `„Unser Unternehmen setzt automatisierte Screening-Algorithmen ein, um Bewerbungen vorzufiltern. 
Kandidaten mit einem Score unter 65 % erhalten automatisch eine systemische Absage. Eine Überprüfung durch die 
Personalabteilung findet nur bei explizitem Widerspruch des Bewerbers statt. Trainingsdaten basieren auf den 
bisherigen Neueinstellungen der letzten 5 Jahre.“`,
    detectedGaps: [
      {
        article: 'Art. 14 EU AI Act',
        issue: 'Fehlende menschliche Aufsicht (Human-in-the-Loop)',
        severity: 'CRITICAL',
        recommendation: 'Vollautomatische Absagen bei Hochrisiko-Systemen verletzen Art. 14. Mindestens ein geschulter HR-Mitarbeiter muss Absageentscheidungen vorab validieren und überstimmen können.'
      },
      {
        article: 'Art. 10 EU AI Act',
        issue: 'Historischer Bias in den Trainingsdaten',
        severity: 'CRITICAL',
        recommendation: 'Historische Einstellungsdaten der letzten 5 Jahre spiegeln oft bestehende Ungleichheiten (z. B. Geschlechterverteilung) wider. Statistische Bias-Audits und Nachweise zur Repräsentativität sind Pflicht.'
      },
      {
        article: 'Art. 26 Abs. 11',
        issue: 'Mangelnde Informationspflicht gegenüber Bewerbern',
        severity: 'HIGH',
        recommendation: 'Bewerber müssen vorab transparent darüber informiert werden, dass sie einem Hochrisiko-KI-System unterliegen.'
      }
    ],
    compliantText: `„Unser Unternehmen setzt ein KI-gestütztes Assistenzsystem zur Unterstützung der Bewerbungsvorauswahl ein. 
Sämtliche Systemausgaben dienen als unverbindliche Entscheidungshilfe für die Personalabteilung. Jede Absageentscheidung 
bedarf der individuellen Prüfung und finalen Freigabe durch geschultes HR-Personal (Art. 14 Human-in-the-Loop). 
Die zugrundeliegenden Trainings- und Validierungsdaten werden halbjährlich durch unabhängige Bias-Audits auf Gleichbehandlung 
geschützter Merkmale auditiert (Art. 10). Alle Bewerber werden vorab über den KI-Einsatz informiert (Art. 26 Abs. 11).“`
  },
  {
    id: 'policy-chatbot',
    title: '2. Kundenservice-Chatbot & Conversational AI',
    category: 'Transparenzpflichten für Interaktionssysteme (Art. 50 Abs. 1)',
    originalText: `„Unser Support-Chatbot ‚Anna‘ beantwortet Kundenfragen rund um die Uhr. Zur Steigerung der 
Kundenzufriedenheit spricht der Bot Kunden mit einem menschlichen Avatar und individuellem Vornamen an. 
Ein Hinweis darauf, dass es sich um eine Software handelt, erfolgt nicht, um ein natürliches Gesprächserlebnis zu sichern.“`,
    detectedGaps: [
      {
        article: 'Art. 50 Abs. 1 EU AI Act',
        issue: 'Verstoß gegen die Offenlegungspflicht bei KI-Interaktion',
        severity: 'CRITICAL',
        recommendation: 'Natürliche Personen müssen rechtzeitig und eindeutig darüber informiert werden, dass sie mit einem KI-System interagieren, es sei denn, dies ist aus den Umständen offensichtlich.'
      }
    ],
    compliantText: `„Unser Support-Assistent ‚Anna‘ ist ein KI-gestütztes Sprach- und Textsystem. 
Beim ersten Kontakt wird dem Nutzer in der Begrüßungsnachricht transparent mitgeteilt: ‚Ich bin ein virtueller KI-Assistent.‘ 
Dem Kunden steht jederzeit die Option zur Verfügung, zu einem menschlichen Kundendienstmitarbeiter weitergeleitet zu werden (Art. 50 Abs. 1).“`
  },
  {
    id: 'policy-logging',
    title: '3. Protokollierung & System-Logging (Art. 12)',
    category: 'Technische Nachweisführung & Audit-Fähigkeit',
    originalText: `„Zur Einsparung von Cloud-Speicherkosten werden Protokolldaten des internen KI-Kreditbewertungstools 
täglich überschrieben. Im Fehlerfall wird lediglich ein aggregierter Error-Code ohne Eingabeparameter gespeichert.“`,
    detectedGaps: [
      {
        article: 'Art. 12 EU AI Act',
        issue: 'Unzureichendes Logging von Ereignissen',
        severity: 'CRITICAL',
        recommendation: 'Hochrisiko-Systeme müssen automatische Aufzeichnungen über den gesamten Lebenszyklus ermöglichen, inklusive Eingabedaten und Systemzuständen.'
      },
      {
        article: 'Art. 26 Abs. 6',
        issue: 'Verletzung der 6-monatigen Mindestaufbewahrungspflicht für Betreiber',
        severity: 'HIGH',
        recommendation: 'Betreiber müssen die automatisch erzeugten Protokolle für mindestens 6 Monate revisionssicher archivieren.'
      }
    ],
    compliantText: `„Das Hochrisiko-KI-System zeichnet Eingabedaten, Entscheidungsparameter und Zeitstempel automatisch und manipulationssicher 
in einem Append-Only-Log auf (Art. 12). Gemäß Art. 26 Abs. 6 werden alle Protokolle für mindestens sechs Monate verschlüsselt aufbewahrt, 
um im Streitfall eine lückenlose Rekonstruktion für Wirtschaftsprüfer und Aufsichtsbehörden zu gewährleisten.“`
  }
];
