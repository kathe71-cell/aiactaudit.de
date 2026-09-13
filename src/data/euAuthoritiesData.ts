export interface EUAuthorityInfo {
  id: string;
  country: string;
  flag: string;
  isoCode: string;
  authorityName: string;
  authorityAcronym: string;
  roleType: 'Marktüberwachungsbehörde (MSA)' | 'Notifizierende Behörde' | 'Datenschutz & KI' | 'Europäische Dachbehörde';
  status: 'Aktiv benannt' | 'Gesetzgebung im parlamentarischen Verfahren' | 'In Vorbereitung (Frist 02.08.2025)';
  sandboxStatus: 'Reallabor aktiv' | 'Reallabor im Aufbau' | 'Konzeptphase';
  headquarters: string;
  focusArea: string;
  description: string;
  keyFacts: string[];
  officialUrl: string;
  coordinates: { x: number; y: number }; // SVG map percentage coordinates
}

export const EU_AUTHORITIES_DATA: EUAuthorityInfo[] = [
  {
    id: 'eu-office',
    country: 'Europäische Union (EU-Zentrale)',
    flag: '🇪🇺',
    isoCode: 'EU',
    authorityName: 'European AI Office (Europäisches Amt für Künstliche Intelligenz)',
    authorityAcronym: 'AI Office',
    roleType: 'Europäische Dachbehörde',
    status: 'Aktiv benannt',
    sandboxStatus: 'Reallabor aktiv',
    headquarters: 'Brüssel, Belgien',
    focusArea: 'General Purpose AI (GPAI / LLMs), Kodizes für die Praxis (Art. 56), zentrale Notifizierung',
    description: 'Direkt bei der EU-Kommission (DG CONNECT) angesiedelt. Zuständig für die Überwachung von Basismodellen, Koordination des AI Board und EU-weites Horizon Scanning.',
    keyFacts: [
      'Exklusive Durchsetzungsbefugnis für GPAI-Modelle mit systemischem Risiko (Art. 51 ff.)',
      'Leitung bei der Ausarbeitung der Verhaltenskodizes (Codes of Practice)',
      'Betrieb der zentralen EU-Datenbank für Hochrisiko-Systeme (Art. 71)'
    ],
    officialUrl: 'https://digital-strategy.ec.europa.eu/en/policies/ai-office',
    coordinates: { x: 44, y: 46 }
  },
  {
    id: 'de',
    country: 'Deutschland',
    flag: '🇩🇪',
    isoCode: 'DE',
    authorityName: 'Bundesnetzagentur (BNetzA) & BfDI',
    authorityAcronym: 'BNetzA / BfDI',
    roleType: 'Marktüberwachungsbehörde (MSA)',
    status: 'Gesetzgebung im parlamentarischen Verfahren',
    sandboxStatus: 'Reallabor im Aufbau',
    headquarters: 'Bonn / Berlin',
    focusArea: 'Marktüberwachung nach Art. 70 AI Act i.V.m. KI-Durchführungsgesetz (KIDG)',
    description: 'Im nationalen Gesetzgebungsverfahren (KIDG) ist die Bundesnetzagentur als zentrale Marktüberwachungsbehörde vorgesehen, während der BfDI die Grundrechte und Hochrisiko-Überwachung im Beschäftigtenkontext flankiert.',
    keyFacts: [
      'BNetzA übernimmt nach aktuellem KIDG-Entwurf die Rolle der zentralen Marktüberwachungsbehörde',
      'BfDI und Landesdatenschutzbehörden bleiben für Art. 50 Transparenz und Art. 26 Betreiberaufsicht relevant',
      'Aufbau des ersten nationalen KI-Reallabors (Art. 57) in Zusammenarbeit mit dem BMWK'
    ],
    officialUrl: 'https://www.bundesnetzagentur.de',
    coordinates: { x: 50, y: 43 }
  },
  {
    id: 'at',
    country: 'Österreich',
    flag: '🇦🇹',
    isoCode: 'AT',
    authorityName: 'RTR-GmbH / Servicestelle für Künstliche Intelligenz (AI Servicestelle)',
    authorityAcronym: 'RTR / AI-Servicestelle',
    roleType: 'Marktüberwachungsbehörde (MSA)',
    status: 'Aktiv benannt',
    sandboxStatus: 'Reallabor aktiv',
    headquarters: 'Wien',
    focusArea: 'Zentrale Koordinierungsstelle und KI-Reallabor-Pilotprogramm',
    description: 'Österreich hat bei der Rundfunk und Telekom Regulierungs-GmbH (RTR) eine spezialisierte KI-Servicestelle etabliert, die als Vorläufer und operative Schnittstelle der nationalen Marktüberwachung dient.',
    keyFacts: [
      'KI-Servicestelle bei der RTR berät Unternehmen und Behörden bei der Vorbereitung auf Art. 6',
      'Aktiver Pilotbetrieb für das österreichische KI-Reallabor nach Art. 57',
      'Enge Vernetzung mit der österreichischen Datenschutzbehörde (DSB)'
    ],
    officialUrl: 'https://www.rtr.at',
    coordinates: { x: 57, y: 53 }
  },
  {
    id: 'es',
    country: 'Spanien',
    flag: '🇪🇸',
    isoCode: 'ES',
    authorityName: 'Agencia Española de Supervisión de la Inteligencia Artificial',
    authorityAcronym: 'AESIA',
    roleType: 'Marktüberwachungsbehörde (MSA)',
    status: 'Aktiv benannt',
    sandboxStatus: 'Reallabor aktiv',
    headquarters: 'A Coruña',
    focusArea: 'Erste voll funktionsfähige spezialisierte KI-Aufsichtsbehörde der Europäischen Union',
    description: 'Spanien nahm mit der Gründung der AESIA eine europäische Vorreiterrolle ein. Die Behörde leitete das offizielle Pilot-Reallabor der EU-Kommission für Hochrisiko-Systeme.',
    keyFacts: [
      'Europas erste eigenständige KI-Regulierungsbehörde mit vollem Mandat',
      'Verfasser des offiziellen spanischen Leitfadens für Art. 9 Risikomanagementsysteme',
      'Umfassende Erfahrung durch das 2023/2024 durchgeführte paneuropäische Sandbox-Pilotprojekt'
    ],
    officialUrl: 'https://www.aesia.gob.es',
    coordinates: { x: 26, y: 68 }
  },
  {
    id: 'fr',
    country: 'Frankreich',
    flag: '🇫🇷',
    isoCode: 'FR',
    authorityName: 'Commission Nationale de l\'Informatique et des Libertés & DGE',
    authorityAcronym: 'CNIL / DGE',
    roleType: 'Marktüberwachungsbehörde (MSA)',
    status: 'Aktiv benannt',
    sandboxStatus: 'Reallabor aktiv',
    headquarters: 'Paris',
    focusArea: 'KI-Sicherheitsaudits, Grundrechte, LLM-Compliance und KI-Sandbox-Programme',
    description: 'Frankreich nutzt die CNIL als erfahrene Grundrechte- und KI-Aufsichtsbehörde in enger Koordination mit der Direction Générale des Entreprises (DGE) für industrielle KI-Anwendungen.',
    keyFacts: [
      'CNIL betreibt seit 2023 ein dediziertes „AI Service“-Team für Konformitätsaudits',
      'Veröffentlichung detaillierter Prüfmethoden für Trainingsdaten nach DSGVO und AI Act',
      'Etabliertes KI-Reallabor (Bac à sable données) für hochriskante Machine-Learning-Pipelines'
    ],
    officialUrl: 'https://www.cnil.fr/fr/intelligence-artificielle',
    coordinates: { x: 38, y: 55 }
  },
  {
    id: 'ie',
    country: 'Irland',
    flag: '🇮🇪',
    isoCode: 'IE',
    authorityName: 'Data Protection Commission & CCPC',
    authorityAcronym: 'DPC / CCPC',
    roleType: 'Marktüberwachungsbehörde (MSA)',
    status: 'Gesetzgebung im parlamentarischen Verfahren',
    sandboxStatus: 'Reallabor im Aufbau',
    headquarters: 'Dublin',
    focusArea: 'Aufsicht über europäische Hauptsitze internationaler Technologie- und Modellentwickler',
    description: 'Wegen der Ansiedlung zahlreicher US-Tech-Riesen in Dublin spielt Irland eine strategische Schlüsselrolle bei der Schnittstelle zwischen DSGVO, Wettbewerbsrecht und KI-Governance.',
    keyFacts: [
      'DPC überwacht Datenschutzaspekte beim Training großer Basismodelle in Europa',
      'Competition and Consumer Protection Commission (CCPC) koordiniert Marktüberwachungsbefugnisse',
      'Schwerpunkt auf Downstream-Haftung und API-Bereitstellung'
    ],
    officialUrl: 'https://www.dataprotection.ie',
    coordinates: { x: 29, y: 39 }
  },
  {
    id: 'nl',
    country: 'Niederlande',
    flag: '🇳🇱',
    isoCode: 'NL',
    authorityName: 'Autoriteit Persoonsgegevens (Directie Coördinatie Algoritmes)',
    authorityAcronym: 'AP / DCA',
    roleType: 'Marktüberwachungsbehörde (MSA)',
    status: 'Aktiv benannt',
    sandboxStatus: 'Reallabor aktiv',
    headquarters: 'Den Haag',
    focusArea: 'Nationale Algorithmen-Koordination (DCA) und Überwachung diskriminierender Algorithmen',
    description: 'Die Niederlande haben innerhalb der Datenschutzbehörde (AP) eine spezialisierte Direktion für Algorithmenaufsicht (DCA) eingerichtet, die das niederländische KI-Register führt.',
    keyFacts: [
      'Führung des öffentlichen Algorithmen-Registers zur Vermeidung von Diskriminierung',
      'Vorreiter bei der Überwachung automatisierter Entscheidungssysteme im öffentlichen Sektor',
      'Enge Verzahnung von Art. 10 Daten-Governance und Art. 26 Betreiberpflichten'
    ],
    officialUrl: 'https://www.autoriteitpersoonsgegevens.nl',
    coordinates: { x: 44, y: 42 }
  },
  {
    id: 'it',
    country: 'Italien',
    flag: '🇮🇹',
    isoCode: 'IT',
    authorityName: 'Agenzia per la Cybersicurezza Nazionale & AGID',
    authorityAcronym: 'ACN / AGID',
    roleType: 'Marktüberwachungsbehörde (MSA)',
    status: 'Gesetzgebung im parlamentarischen Verfahren',
    sandboxStatus: 'Reallabor im Aufbau',
    headquarters: 'Rom',
    focusArea: 'Cybersicherheit nach Art. 15, kritische Infrastrukturen und staatliche KI-Strategie',
    description: 'Der italienische Gesetzentwurf sieht eine Doppelspitze aus der Agentur für nationale Cybersicherheit (ACN) und der Agentur für digitales Italien (AGID) vor, mit Garante Privacy als Grundrechte-Wächter.',
    keyFacts: [
      'ACN übernimmt die Prüfung robuster Cybersicherheitsmaßnahmen bei Hochrisiko-Systemen',
      'AGID fördert KI-Innovationen im öffentlichen Sektor und überwacht Konformitätsprüfungen',
      'Garante per la protezione dei dati personali führt strenge Kontrollen bei LLM-Trainingsdaten'
    ],
    officialUrl: 'https://www.acn.gov.it',
    coordinates: { x: 54, y: 69 }
  }
];
