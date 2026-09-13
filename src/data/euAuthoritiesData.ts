export interface EUAuthorityInfo {
  id: string;
  country: string;
  flag: string;
  isoCode: string;
  geoName: string; // matches europePaths.json key
  authorityName: string;
  authorityAcronym: string;
  roleType: 'Marktüberwachungsbehörde (MSA)' | 'Notifizierende Behörde' | 'Datenschutz & KI' | 'Europäische Dachbehörde';
  status: 'Aktiv benannt' | 'Gesetzgebung im parlamentarischen Verfahren' | 'In Vorbereitung (Frist 02.08.2025)';
  sandboxStatus: 'Reallabor aktiv' | 'Reallabor im Aufbau' | 'Konzeptphase';
  headquarters: string;
  focusArea: string;
  description: string;
  keyFacts: string[];
  nationalSpecifics: string; // Specific national laws (e.g. KIDG in DE, AI Servicestelle in AT, etc.)
  officialUrl: string;
}

export const EU_AUTHORITIES_DATA: EUAuthorityInfo[] = [
  {
    id: 'eu-office',
    country: 'Europäische Union (EU-Zentrale)',
    flag: '🇪🇺',
    isoCode: 'EU',
    geoName: 'Belgium', // visual focal link
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
    nationalSpecifics: 'Übergeordnete Unionsaufsicht für GPAI. Koordiniert das European Artificial Intelligence Board (Art. 65).',
    officialUrl: 'https://digital-strategy.ec.europa.eu/en/policies/ai-office'
  },
  {
    id: 'de',
    country: 'Deutschland',
    flag: '🇩🇪',
    isoCode: 'DE',
    geoName: 'Germany',
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
    nationalSpecifics: 'KIDG (KI-Durchführungsgesetz): BNetzA als zentrale Anlaufstelle; strenge Kriterien für Arbeitnehmerüberwachung und Betriebsverfassungsgesetz (§ 87 BetrVG).',
    officialUrl: 'https://www.bundesnetzagentur.de'
  },
  {
    id: 'at',
    country: 'Österreich',
    flag: '🇦🇹',
    isoCode: 'AT',
    geoName: 'Austria',
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
    nationalSpecifics: 'RTR AI-Servicestelle als First Point of Contact; enge Verzahnung mit dem Bundeskanzleramt (BKA) und der Datenschutzbehörde (DSB).',
    officialUrl: 'https://www.rtr.at'
  },
  {
    id: 'ch',
    country: 'Schweiz',
    flag: '🇨🇭',
    isoCode: 'CH',
    geoName: 'Switzerland',
    authorityName: 'BAKOM / Eidgenössisches Justiz- und Polizeidepartement (EJPD)',
    authorityAcronym: 'BAKOM / EJPD',
    roleType: 'Marktüberwachungsbehörde (MSA)',
    status: 'Gesetzgebung im parlamentarischen Verfahren',
    sandboxStatus: 'Konzeptphase',
    headquarters: 'Bern',
    focusArea: 'Autonomer Nachvollzug des EU AI Acts für Schweizer Exporteure (Art. 2 Extraterritorialität)',
    description: 'Obwohl nicht EU-Mitglied, unterliegen Schweizer Unternehmen voll dem AI Act, sobald KI-Systeme oder deren Outputs in der EU in Verkehr gebracht werden (Art. 2 Abs. 1 lit. c). Der Bundesrat prüft Regulierungsvorschläge.',
    keyFacts: [
      'Volle Unterwerfung Schweizer Anbieter bei Vertrieb oder Downstream-Nutzung in der EU',
      'Schweizer Datenschutzgesetz (revDSG) verlangt bereits Dokumentation automatisierter Einzelentscheidungen',
      'Bundesamt für Kommunikation (BAKOM) koordiniert die KI-Kompetenzen auf Bundesebene'
    ],
    nationalSpecifics: 'Extraterritoriale Geltung von Art. 2 Abs. 1 lit. c AI Act. Pflicht zur Benennung eines EU-Bevollmächtigten (Art. 22).',
    officialUrl: 'https://www.bakom.admin.ch'
  },
  {
    id: 'fr',
    country: 'Frankreich',
    flag: '🇫🇷',
    isoCode: 'FR',
    geoName: 'France',
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
    nationalSpecifics: 'CNIL KI-Richtlinien für LLM-Training; enge Kooperation mit Mistral/Europäischen Modellherstellern.',
    officialUrl: 'https://www.cnil.fr/fr/intelligence-artificielle'
  },
  {
    id: 'es',
    country: 'Spanien',
    flag: '🇪🇸',
    isoCode: 'ES',
    geoName: 'Spain',
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
    nationalSpecifics: 'AESIA Guidelines für Konformitätsbewertungen; staatliche Förderungen an AI Act Audits gekoppelt.',
    officialUrl: 'https://www.aesia.gob.es'
  },
  {
    id: 'it',
    country: 'Italien',
    flag: '🇮🇹',
    isoCode: 'IT',
    geoName: 'Italy',
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
    nationalSpecifics: 'Italienisches DDL Intelligenza Artificiale; verschärfte Strafen für KI-Deepfakes im Strafgesetzbuch.',
    officialUrl: 'https://www.acn.gov.it'
  },
  {
    id: 'nl',
    country: 'Niederlande',
    flag: '🇳🇱',
    isoCode: 'NL',
    geoName: 'Netherlands',
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
    nationalSpecifics: 'Verpflichtendes Algorithmenregister für öffentliche Stellen; DCA Audits bei automatisiertem Scoring.',
    officialUrl: 'https://www.autoriteitpersoonsgegevens.nl'
  },
  {
    id: 'ie',
    country: 'Irland',
    flag: '🇮🇪',
    isoCode: 'IE',
    geoName: 'Ireland',
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
    nationalSpecifics: 'Regulierungs-Drehscheibe für Hyperscaler (Microsoft, Google, Meta, Apple) in der EU.',
    officialUrl: 'https://www.dataprotection.ie'
  },
  {
    id: 'be',
    country: 'Belgien',
    flag: '🇧🇪',
    isoCode: 'BE',
    geoName: 'Belgium',
    authorityName: 'FÖD Wirtschaft & Datenschutzbehörde (GBA/APD)',
    authorityAcronym: 'FÖD Wirtschaft / APD',
    roleType: 'Marktüberwachungsbehörde (MSA)',
    status: 'In Vorbereitung (Frist 02.08.2025)',
    sandboxStatus: 'Reallabor im Aufbau',
    headquarters: 'Brüssel',
    focusArea: 'Wirtschaftliche Marktüberwachung und direkte Anbindung an EU-Institutionen',
    description: 'Der Föderale Öffentliche Dienst Wirtschaft koordiniert die Benennung der notifizierenden Behörden in enger Abstimmung mit den belgischen Regionen und der Datenschutzbehörde.',
    keyFacts: [
      'Koordination der Konformitätsstellen für Benelux-Unternehmen',
      'Fokus auf Harmonisierung mit den Leitlinien des benachbarten EU AI Office'
    ],
    nationalSpecifics: 'Belgischer Föderalismus erfordert Koordination zwischen Flandern, Wallonie und Brüssel-Hauptstadt.',
    officialUrl: 'https://economie.fgov.be'
  },
  {
    id: 'pl',
    country: 'Polen',
    flag: '🇵🇱',
    isoCode: 'PL',
    geoName: 'Poland',
    authorityName: 'Ministerstwo Cyfryzacji & UODO',
    authorityAcronym: 'MC / UODO',
    roleType: 'Marktüberwachungsbehörde (MSA)',
    status: 'Gesetzgebung im parlamentarischen Verfahren',
    sandboxStatus: 'Reallabor im Aufbau',
    headquarters: 'Warschau',
    focusArea: 'Nationale KI-Kommission und Regulierung von IT-Nearshoring-Dienstleistern',
    description: 'Polen plant die Errichtung einer neuen Kommission für Entwicklung und Sicherheit von KI (Komisja Rozwoju i Bezpieczeństwa SI) unter Führung des Ministeriums für Digitalisierung.',
    keyFacts: [
      'Gesetzentwurf für ein einheitliches polnisches KI-Gesetz vorgelegt',
      'Bedeutender Markt für KI-Entwicklungsdienstleister und Modell-Feintuning'
    ],
    nationalSpecifics: 'Neues Gesetz über KI-Systeme (Ustawa o systemach sztucznej inteligencji) mit nationalem KI-Fond.',
    officialUrl: 'https://www.gov.pl/web/cyfryzacja'
  },
  {
    id: 'se',
    country: 'Schweden',
    flag: '🇸🇪',
    isoCode: 'SE',
    geoName: 'Sweden',
    authorityName: 'Integritetsskyddsmyndigheten (IMY) & Post- och telestyrelsen (PTS)',
    authorityAcronym: 'PTS / IMY',
    roleType: 'Marktüberwachungsbehörde (MSA)',
    status: 'Gesetzgebung im parlamentarischen Verfahren',
    sandboxStatus: 'Reallabor aktiv',
    headquarters: 'Stockholm',
    focusArea: 'Telekommunikationsaufsicht, Edge-AI und nordische Innovations-Sandboxes',
    description: 'PTS wurde als koordinierende Behörde für die Marktüberwachung vorgeschlagen, unterstützt von IMY für Grundrechte und Vinnova für Innovationsförderung.',
    keyFacts: [
      'Starker Fokus auf Innovation und offene KI-Reallabore durch AI Sweden',
      'Traditionell hoher Grad an Transparenz und behördlicher Offenlegung'
    ],
    nationalSpecifics: 'Zusammenarbeit mit AI Sweden; Reallabor-Programme für öffentliche Verwaltung und Industrie.',
    officialUrl: 'https://pts.se'
  },
  {
    id: 'dk',
    country: 'Dänemark',
    flag: '🇩🇰',
    isoCode: 'DK',
    geoName: 'Denmark',
    authorityName: 'Digitaliseringsstyrelsen & Datatilsynet',
    authorityAcronym: 'DIGST / Datatilsynet',
    roleType: 'Marktüberwachungsbehörde (MSA)',
    status: 'Aktiv benannt',
    sandboxStatus: 'Reallabor aktiv',
    headquarters: 'Kopenhagen',
    focusArea: 'Digitalisierungsagentur als koordinierende Stelle für KI im Public Sector',
    description: 'Die dänische Agentur für Digitalisierung (Digitaliseringsstyrelsen) steuert die Umsetzung des AI Act mit speziellem Fokus auf ethische Leitlinien und das Reallabor des Datatilsynet.',
    keyFacts: [
      'Etabliertes Reallabor für KI und Datenschutz beim Datatilsynet',
      'Nordischer Vorreiter bei der Digitalisierung der öffentlichen Verwaltung'
    ],
    nationalSpecifics: 'Dänische nationale KI-Strategie mit starker Ausrichtung auf öffentliche Beschaffung (Art. 26).',
    officialUrl: 'https://digst.dk'
  },
  {
    id: 'fi',
    country: 'Finnland',
    flag: '🇫🇮',
    isoCode: 'FI',
    geoName: 'Finland',
    authorityName: 'Traficom & Tietosuojavaltuutetun toimisto',
    authorityAcronym: 'Traficom',
    roleType: 'Marktüberwachungsbehörde (MSA)',
    status: 'Gesetzgebung im parlamentarischen Verfahren',
    sandboxStatus: 'Reallabor im Aufbau',
    headquarters: 'Helsinki',
    focusArea: 'Transport- und Kommunikationsagentur als zentraler Prüfer für Hard- und Software',
    description: 'Finnland setzt auf die bewährte Marktüberwachungsorganisation Traficom, die bereits Cybersicherheit, Funk und Produktsicherheit bündelt.',
    keyFacts: [
      'Hohe technische Expertise durch nationales Cybersecurity Center (NCSC-FI)',
      'Enge Anbindung an finnische KI-Forschungsinstitute (FCAI)'
    ],
    nationalSpecifics: 'Kopplung an Elements of AI Bildungsinitiativen und Art. 4 KI-Kompetenz-Nachweise.',
    officialUrl: 'https://www.traficom.fi'
  },
  {
    id: 'pt',
    country: 'Portugal',
    flag: '🇵🇹',
    isoCode: 'PT',
    geoName: 'Portugal',
    authorityName: 'ANACOM & CNPD',
    authorityAcronym: 'ANACOM / CNPD',
    roleType: 'Marktüberwachungsbehörde (MSA)',
    status: 'In Vorbereitung (Frist 02.08.2025)',
    sandboxStatus: 'Konzeptphase',
    headquarters: 'Lissabon',
    focusArea: 'Nationale Kommunikationsbehörde & Reallabore für Tech-Startups',
    description: 'Portugal bereitet die Verteilung der Kompetenzen zwischen der Telekom-Aufsicht ANACOM, der Datenschutzbehörde CNPD und der Innovationsagentur vor.',
    keyFacts: [
      'Strategischer Fokus auf KI-Startups und Web Summit Ökosystem',
      'Entwicklung von Zonas Livres Tecnológicas (ZLT) als Experimentierräume'
    ],
    nationalSpecifics: 'Zonas Livres Tecnológicas bieten regulatorische Erleichterungen für Prototypen.',
    officialUrl: 'https://www.anacom.pt'
  }
];
