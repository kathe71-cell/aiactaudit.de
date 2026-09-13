export interface NationalSpecificQuestion {
  questionTitle: string;
  questionSubtitle: string;
  legalRef: string;
  options: {
    label: string;
    description: string;
    points: number;
    gapWarning?: string;
  }[];
}

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
  nationalSpecifics: string;
  officialUrl: string;
  nationalQuestion: NationalSpecificQuestion;
  recommendedNextStep: string;
}

export const EU_AUTHORITIES_DATA: EUAuthorityInfo[] = [
  {
    id: 'eu-office',
    country: 'Europäische Union (EU-Zentrale)',
    flag: '🇪🇺',
    isoCode: 'EU',
    geoName: 'Belgium',
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
    officialUrl: 'https://digital-strategy.ec.europa.eu/en/policies/ai-office',
    nationalQuestion: {
      questionTitle: '8. [EU AI Office] Basiert Ihr System auf General-Purpose AI (GPAI / LLM) oder ist es in der zentralen EU-Datenbank zu registrieren?',
      questionSubtitle: 'Das AI Office fordert bei GPAI-Modellen Transparenz über Trainingsdaten und Copyright-Compliance (Art. 53).',
      legalRef: 'Art. 51–56 & Art. 71',
      options: [
        {
          label: 'Ja, vollständige Model Card, Urheberrechts-Nachweise und Dokumentation nach Art. 53 liegen vor',
          description: 'Modellkarten und Trainingsdaten-Zusammenfassungen sind behördlich einsehbar.',
          points: 15
        },
        {
          label: 'Wir nutzen Drittanbieter-APIs (z. B. OpenAI/Anthropic), haben aber keine eigene Dokumentation erstellt',
          description: 'Bisherige Annahme: Der Modellhersteller haftet allein für die Compliance.',
          points: 8,
          gapWarning: 'Downstream-Deployer müssen nach Art. 25 prüfen, ob Anpassungen eigene Anbieterpflichten auslösen.'
        },
        {
          label: 'Kein GPAI / reines Spezialmodell mit geringem Risiko',
          description: 'Spezifisches Modell ohne General-Purpose-Eigenschaften.',
          points: 15
        }
      ]
    },
    recommendedNextStep: 'Prüfen Sie vor dem 02.08.2025 die Anforderungen an GPAI-Dokumentation und tragen Sie Hochrisiko-Systeme in die zentrale EU-Datenbank (Art. 71) ein.'
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
    nationalSpecifics: 'KIDG (KI-Durchführungsgesetz): BNetzA als zentrale Anlaufstelle; strenge Kriterien für Arbeitnehmerüberwachung und Betriebsverfassungsgesetz (§ 87 Abs. 1 Nr. 6 BetrVG).',
    officialUrl: 'https://www.bundesnetzagentur.de',
    nationalQuestion: {
      questionTitle: '8. [Deutschland / KIDG] Wurde die arbeitsrechtliche Mitbestimmung (§ 87 Abs. 1 Nr. 6 BetrVG) und das BNetzA-Verfahren beachtet?',
      questionSubtitle: 'In Deutschland erfordert der Einsatz von KI zur Überwachung von Arbeitnehmern zwingend die Beteiligung des Betriebsrats.',
      legalRef: 'KIDG Entwurf & § 87 Abs. 1 Nr. 6 BetrVG',
      options: [
        {
          label: 'Ja, Betriebsvereinbarung abgeschlossen bzw. kein Beschäftigten-Bezug vorhanden',
          description: 'Betriebsrat wurde rechtzeitig und umfassend beteiligt, oder das System betrifft keine Mitarbeiterdaten.',
          points: 15
        },
        {
          label: 'Betriebsrat wurde informiert, Verhandlungen zur Betriebsvereinbarung laufen noch',
          description: 'System ist im Testbetrieb, aber die formale Vereinbarung steht noch aus.',
          points: 8,
          gapWarning: 'Achtung: Einführung von Systemen zur Verhaltens- oder Leistungskontrolle ohne Betriebsvereinbarung ist rechtswidrig.'
        },
        {
          label: 'Nein, Betriebsrat wurde bisher nicht beteiligt trotz Mitarbeiter-Bezug',
          description: 'System wird im HR- oder Produktivitätsbereich ohne formale Vereinbarung eingesetzt.',
          points: 0,
          gapWarning: 'Dringender Handlungsbedarf: Verstoß gegen § 87 BetrVG kann zum gerichtlichen Nutzungsstopp führen.'
        }
      ]
    },
    recommendedNextStep: 'Beteiligen Sie den Betriebsrat bei HR-Systemen und bereiten Sie die Dokumentation für die BNetzA-Marktüberwachung nach KIDG vor.'
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
    officialUrl: 'https://www.rtr.at',
    nationalQuestion: {
      questionTitle: '8. [Österreich / RTR] Wurde die Einstufung mit der RTR AI-Servicestelle oder im nationalen KI-Reallabor abgestimmt?',
      questionSubtitle: 'Österreich bietet über die RTR eine frühzeitige Orientierung und Pilot-Reallabore für Art. 57 AI Act.',
      legalRef: 'Art. 57 AI Act & RTR-Leitfaden',
      options: [
        {
          label: 'Ja, Reallabor-Teilnahme oder Orientierungsleitfaden der RTR AI-Servicestelle angewendet',
          description: 'Systemarchitektur folgt den österreichischen Best-Practice-Empfehlungen der RTR.',
          points: 15
        },
        {
          label: 'Orientierungsleitfaden bekannt, aber noch keine behördliche Abstimmung erfolgt',
          description: 'Interne Vorbereitung läuft, Beratungstermin bei der Servicestelle ist geplant.',
          points: 10
        },
        {
          label: 'Bisher keine Berücksichtigung der österreichischen RTR-KI-Servicestelle',
          description: 'Die österreichischen Besonderheiten und Sandbox-Chancen wurden bisher nicht genutzt.',
          points: 5,
          gapWarning: 'Nutzen Sie die kostenfreie Orientierung der RTR AI-Servicestelle zur rechtssicheren Hochrisiko-Abgrenzung.'
        }
      ]
    },
    recommendedNextStep: 'Nutzen Sie das Orientierungsangebot der RTR AI-Servicestelle Wien zur Validierung Ihrer Art. 6 Einstufung vor August 2026.'
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
    officialUrl: 'https://www.bakom.admin.ch',
    nationalQuestion: {
      questionTitle: '8. [Schweiz / Extraterritorialität] Wurde ein EU-Bevollmächtigter nach Art. 22 benannt und Art. 2 Abs. 1 lit. c geprüft?',
      questionSubtitle: 'Schweizer Anbieter mit Kunden in der EU müssen zwingend einen bevollmächtigten Vertreter mit Sitz in der Europäischen Union bestellen.',
      legalRef: 'Art. 2 Abs. 1 lit. c & Art. 22 AI Act',
      options: [
        {
          label: 'Ja, schriftliches Mandat für einen EU-Bevollmächtigten in einem EU-Mitgliedsstaat liegt vor',
          description: 'Der Bevollmächtigte vertritt das Schweizer Unternehmen gegenüber den EU-Aufsichtsbehörden.',
          points: 15
        },
        {
          label: 'Unser System wird ausschließlich und isoliert in der Schweiz für Schweizer Nutzer betrieben',
          description: 'Kein Vertrieb in die EU und keine Verwertung von System-Outputs im EU-Binnenmarkt.',
          points: 15
        },
        {
          label: 'Wir beliefern Kunden in der EU, haben aber noch keinen EU-Bevollmächtigten benannt',
          description: 'Vertragliche Vertretung in der EU fehlt bislang vollständig.',
          points: 0,
          gapWarning: 'Kritisch: Ohne EU-Bevollmächtigten (Art. 22) droht ein Import- und Vertriebsstopp für den gesamten EU-Markt.'
        }
      ]
    },
    recommendedNextStep: 'Benennen Sie unverzüglich einen EU-Bevollmächtigten nach Art. 22 mit Sitz in einem EU-Mitgliedsstaat (z. B. Deutschland oder Österreich).'
  },
  {
    id: 'gr',
    country: 'Griechenland',
    flag: '🇬🇷',
    isoCode: 'GR',
    geoName: 'Greece',
    authorityName: 'Ministerium für digitale Governance & HDPA (Datenschutz)',
    authorityAcronym: 'Mindigital / HDPA',
    roleType: 'Marktüberwachungsbehörde (MSA)',
    status: 'Gesetzgebung im parlamentarischen Verfahren',
    sandboxStatus: 'Reallabor im Aufbau',
    headquarters: 'Athen',
    focusArea: 'Gesetz 4961/2022 (Griechisches KI-Rahmengesetz) & Vorreiter bei Ethik-Ausschüssen',
    description: 'Griechenland hat bereits 2022 mit Gesetz 4961/2022 einen nationalen Rechtsrahmen für KI im öffentlichen und privaten Sektor geschaffen, der Algorithmenregister und Ethikausschüsse vorschreibt.',
    keyFacts: [
      'Pioniergesetz 4961/2022 verpflichtet private Unternehmen zur Folgenabschätzung bei algorithmischer HR-Auswahl',
      'Hellenic Data Protection Authority (HDPA) überwacht biometrische Identifikationssysteme strikt',
      'Aufbau des ersten nationalen KI-Reallabors im Athener Tech-Hub'
    ],
    nationalSpecifics: 'Griechisches Gesetz 4961/2022: Pflicht zur Einrichtung von Ethikausschüssen für KI in mittleren und großen Unternehmen.',
    officialUrl: 'https://mindigital.gr',
    nationalQuestion: {
      questionTitle: '8. [Griechenland / Gesetz 4961/2022] Wurde ein Ethikausschuss eingerichtet und das nationale Algorithmenregister beachtet?',
      questionSubtitle: 'In Griechenland verlangt Art. 7 ff. des Gesetzes 4961/2022 ethische Vorprüfungen und Registerpflichten bei KI-Einsatz.',
      legalRef: 'Griechisches Gesetz 4961/2022 & Art. 26 AI Act',
      options: [
        {
          label: 'Ja, ethische Konformitätsprüfung nach Gesetz 4961/2022 durchgeführt',
          description: 'Interne Richtlinien und Transparenzpflichten für algorithmische Entscheidungen sind hinterlegt.',
          points: 15
        },
        {
          label: 'System erfüllt Standard-AI-Act, griechische Sondernormen wurden aber noch nicht geprüft',
          description: 'Prüfung nach EU-Vorgaben läuft, lokales Gesetz 4961/2022 steht noch aus.',
          points: 8,
          gapWarning: 'Unternehmen mit griechischen Niederlassungen müssen Ethikausschuss-Vorgaben nach Gesetz 4961/2022 beachten.'
        },
        {
          label: 'Bisher keine Prüfung der griechischen Gesetzeslage',
          description: 'Keine Dokumentation nach Gesetz 4961/2022 vorhanden.',
          points: 0,
          gapWarning: 'In Griechenland drohen arbeits- und datenschutzrechtliche Beanstandungen der HDPA.'
        }
      ]
    },
    recommendedNextStep: 'Prüfen Sie bei Betrieb in Griechenland die Pflichten zur Einsetzung eines betrieblichen Ethikausschusses nach Gesetz 4961/2022.'
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
    officialUrl: 'https://www.cnil.fr/fr/intelligence-artificielle',
    nationalQuestion: {
      questionTitle: '8. [Frankreich / CNIL] Entspricht die Trainingsdaten-Verarbeitung den veröffentlichten Leitlinien des CNIL AI Service?',
      questionSubtitle: 'Die CNIL hat strenge Kriterien für Rechtsgrundlagen bei Web-Scraping und Reallabor-Erleichterungen (Bac à sable) erlassen.',
      legalRef: 'CNIL AI Recommandations & Art. 10 AI Act',
      options: [
        {
          label: 'Ja, CNIL-Leitlinien für DSGVO-konformes Modelltraining wurden voll umgesetzt',
          description: 'Rechtmäßigkeit der Datenbeschaffung und Opt-Out-Rechte sind revisionssicher dokumentiert.',
          points: 15
        },
        {
          label: 'Datenverarbeitung läuft nach Standard-DSGVO, aber spezifische CNIL-Checkliste wurde noch nicht abgeglichen',
          description: 'Allgemeine Datenschutz-Folgenabschätzung liegt vor, KI-Spezifika fehlen teilweise.',
          points: 8,
          gapWarning: 'Gleichen Sie die Daten-Governance mit den konkreten Prüfbögen des CNIL AI Service ab.'
        },
        {
          label: 'Kein Personenbezug in den Trainings- oder Betriebsdaten vorhanden',
          description: 'Reine industrielle Telemetrie- oder Physikdaten ohne Personenbezug.',
          points: 15
        }
      ]
    },
    recommendedNextStep: 'Nutzen Sie die CNIL-Checkliste zur Dokumentation der Trainingsdaten-Governance nach Art. 10 Abs. 5.'
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
    officialUrl: 'https://www.aesia.gob.es',
    nationalQuestion: {
      questionTitle: '8. [Spanien / AESIA] Wurde die Konformitätsbewertung nach dem offiziellen AESIA-Pilot-Leitfaden strukturiert?',
      questionSubtitle: 'Die AESIA hat den europaweit ersten Referenzleitfaden für Risikomanagement-Audits nach Art. 9 veröffentlicht.',
      legalRef: 'AESIA Guía de Conformidad & Art. 9 AI Act',
      options: [
        {
          label: 'Ja, Konformitätsakte orientiert sich an den veröffentlichten AESIA-Templates',
          description: 'Risikoanalyse und Dokumentation erfüllen die spanischen Pilot-Standards.',
          points: 15
        },
        {
          label: 'Interne Vorbereitung läuft nach allgemeinen ISO-Standards, aber AESIA-Templates noch nicht integriert',
          description: 'Standard-Risikomanagement ist etabliert.',
          points: 10
        },
        {
          label: 'Bisher keine Ausrichtung an den AESIA-Standards',
          description: 'Spanische Aufsichtspraxis wurde in der Konformitätsakte nicht berücksichtigt.',
          points: 5,
          gapWarning: 'Die AESIA ist die strengste spezialisierte KI-Behörde Europas; unvollständige Akten führen zu Verkaufsverboten.'
        }
      ]
    },
    recommendedNextStep: 'Gleichen Sie Ihre technische Dokumentation mit den Guías de Conformidad der AESIA ab.'
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
    officialUrl: 'https://www.acn.gov.it',
    nationalQuestion: {
      questionTitle: '8. [Italien / ACN] Wurden Penetration-Tests nach den Cybersicherheitsvorgaben der ACN durchgeführt?',
      questionSubtitle: 'In Italien verlangt die ACN bei Hochrisiko-Systemen Nachweise über Widerstandsfähigkeit gegen Model-Inversion und Prompt Injection.',
      legalRef: 'Art. 15 AI Act & DDL Intelligenza Artificiale',
      options: [
        {
          label: 'Ja, formale Schwachstellenanalyse und Penetrationstests für KI-Pipelines liegen vor',
          description: 'Cybersicherheitsaudit nach Art. 15 wurde erfolgreich absolviert.',
          points: 15
        },
        {
          label: 'Standard-Webanwendungs-Security vorhanden, aber keine KI-spezifischen Angriffsanalysen',
          description: 'Allgemeine Firewall aktiv, Modellgrenzen jedoch nicht adversarial getestet.',
          points: 7,
          gapWarning: 'Art. 15 erfordert spezifische Resilienz gegen Data Poisoning und Prompt Injection.'
        },
        {
          label: 'Bisher keine gesonderten Cybersicherheitstests für das Modell durchgeführt',
          description: 'Modell wurde ohne formale Sicherheitsüberprüfung deployt.',
          points: 0,
          gapWarning: 'Erhebliches Risiko bei ACN-Kontrollen für Hochrisiko-Systeme in Italien.'
        }
      ]
    },
    recommendedNextStep: 'Führen Sie ein spezifisches Robustheits- und Cybersicherheitsaudit nach Art. 15 vor Markteinführung in Italien durch.'
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
    officialUrl: 'https://www.autoriteitpersoonsgegevens.nl',
    nationalQuestion: {
      questionTitle: '8. [Niederlande / DCA] Ist das System für das niederländische Algorithmenregister (Algoritmeregister) vorbereitet?',
      questionSubtitle: 'Die Directie Coördinatie Algoritmes (DCA) überwacht Algorithmen mit Bürger- und Konsumentenbezug besonders strikt.',
      legalRef: 'DCA Algoritmeregister & Art. 10/26 AI Act',
      options: [
        {
          label: 'Ja, Algorithmen-Steckbrief nach niederländischem Standard ist dokumentiert',
          description: 'Funktionsweise, Risikoabwägungen und Bias-Prüfungen sind transparent aufbereitet.',
          points: 15
        },
        {
          label: 'System wird im privaten B2B-Bereich ohne Konsumentenbezug eingesetzt',
          description: 'Keine direkte Auswirkung auf niederländische Bürger oder Verbraucher.',
          points: 15
        },
        {
          label: 'System betrifft Konsumenten in den Niederlanden, Dokumentation fehlt jedoch',
          description: 'Kein formaler Nachweis gegen algorithmische Diskriminierung.',
          points: 0,
          gapWarning: 'Die niederländische DCA prüft Scoring-Systeme intensiv auf Diskriminierungsrisiken.'
        }
      ]
    },
    recommendedNextStep: 'Erstellen Sie ein DCA-konformes Transparenzdossier zur Vorlage bei niederländischen Geschäftspartnern und Behörden.'
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
    officialUrl: 'https://www.dataprotection.ie',
    nationalQuestion: {
      questionTitle: '8. [Irland / DPC] Wurden grenzüberschreitende Datentransfers und API-Haftungsketten vertraglich geregelt?',
      questionSubtitle: 'Die irische DPC fokussiert sich auf Datenübermittlungen in Drittländer und Verantwortlichkeiten bei Cloud-KI.',
      legalRef: 'Art. 25 AI Act & Kapitel V DSGVO',
      options: [
        {
          label: 'Ja, EU-Standardvertragsklauseln (SCCs) und Data Processing Agreements (DPA) mit KI-Zusatz liegen vor',
          description: 'Verantwortlichkeiten zwischen Cloud-Provider und Betreiber sind lückenlos geregelt.',
          points: 15
        },
        {
          label: 'Standard-Cloud-AGBs akzeptiert, aber keine gesonderte Prüfung der KI-Haftungsklauseln',
          description: 'Haftungsübergänge bei Fehlentscheidungen der KI sind nicht explizit vertraglich fixiert.',
          points: 8,
          gapWarning: 'Prüfen Sie nach Art. 25, wer bei fehlerhaften Modell-Ausgaben die Anbieterhaftung trägt.'
        },
        {
          label: 'Keine vertraglichen Regelungen zu KI-Risiken vorhanden',
          description: 'Ungeregelter Einsatz von US-Cloud-APIs.',
          points: 0,
          gapWarning: 'Hohes Bußgeldrisiko bei DPC-Prüfungen wegen unklarer Datentransfer-Grundlagen.'
        }
      ]
    },
    recommendedNextStep: 'Sichern Sie Cloud-KI-Verträge mit spezifischen AI-Act-Zusatzvereinbarungen und DPA-Klauseln ab.'
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
    officialUrl: 'https://economie.fgov.be',
    nationalQuestion: {
      questionTitle: '8. [Belgien / FÖD] Wurde die Übereinstimmung mit harmonisierten Normen für den Benelux-Raum geprüft?',
      questionSubtitle: 'Der FÖD Wirtschaft legt den Schwerpunkt auf Konformitätsbewertungsstellen und CE-Zertifizierung.',
      legalRef: 'Art. 40–43 AI Act',
      options: [
        {
          label: 'Ja, harmonisierte Normen (CEN-CENELEC) werden bei der Systemarchitektur angewendet',
          description: 'Konformitätsvermutung nach Art. 40 wird angestrebt.',
          points: 15
        },
        {
          label: 'System folgt internen Standards, Konformitätsbewertung nach Anhang VI ist geplant',
          description: 'Vorbereitung auf die CE-Kennzeichnung läuft.',
          points: 10
        },
        {
          label: 'Bisher keine Vorbereitung auf die Konformitätsbewertung erfolgt',
          description: 'CE-Pflichten für Hochrisiko-Systeme wurden nicht adressiert.',
          points: 0,
          gapWarning: 'Hochrisiko-Systeme dürfen ohne Konformitätsverfahren nicht im Benelux-Raum betrieben werden.'
        }
      ]
    },
    recommendedNextStep: 'Bereiten Sie das Konformitätsbewertungsverfahren nach Anhang VI für den belgischen Markt vor.'
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
    officialUrl: 'https://www.gov.pl/web/cyfryzacja',
    nationalQuestion: {
      questionTitle: '8. [Polen / MC] Entsprechen Nearshoring- und Entwicklungsverträge dem polnischen KI-Gesetzentwurf?',
      questionSubtitle: 'Polen reguliert Entwicklungsdienstleister und Modell-Feintuning streng hinsichtlich der Anbieter-Verantwortung.',
      legalRef: 'Ustawa o systemach SI & Art. 25 AI Act',
      options: [
        {
          label: 'Ja, Entwicklungsverträge regeln IP, Trainingsdaten-Qualität und Konformitätspflichten eindeutig',
          description: 'Verantwortungsteilung zwischen Auftraggeber und Entwicklungsdienstleister ist festgeschrieben.',
          points: 15
        },
        {
          label: 'Verträge sind standardmäßig auf Time & Material ausgelegt ohne KI-spezifische Haftung',
          description: 'Rechtliche Rolle als Anbieter oder Betreiber ist vertraglich nicht geklärt.',
          points: 8,
          gapWarning: 'Klären Sie nach Art. 25 vertraglich, wer die CE-Kennzeichnungspflicht übernimmt.'
        },
        {
          label: 'Entwicklung erfolgt rein intern im Unternehmen ohne externe Dienstleister',
          description: 'Keine Drittverträge erforderlich.',
          points: 15
        }
      ]
    },
    recommendedNextStep: 'Aktualisieren Sie Ihre Software-Lieferverträge mit polnischen Entwicklern um AI-Act-Konformitätsklauseln.'
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
    officialUrl: 'https://pts.se',
    nationalQuestion: {
      questionTitle: '8. [Schweden / PTS] Werden Edge-AI- und Netzwerksicherheitsstandards nach nordischem Vorbild erfüllt?',
      questionSubtitle: 'In Schweden fokussiert sich die Marktüberwachung auf die Robustheit und Notfallabschaltung dezentraler Systeme.',
      legalRef: 'Art. 14 & 15 AI Act',
      options: [
        {
          label: 'Ja, dezentrale Notfallabschaltung und robuste Ausfallkonzepte sind dokumentiert',
          description: 'System kann bei Netzwerk- oder Modellfehlern sicher in einen Fail-Safe-Zustand übergehen.',
          points: 15
        },
        {
          label: 'System läuft rein in der Cloud, lokale Notfallmechanismen sind nicht implementiert',
          description: 'Ausfallsicherheit hängt vollständig von der Internetverbindung ab.',
          points: 10
        },
        {
          label: 'Keine Notfallabschaltung oder Ausfallsicherung vorhanden',
          description: 'Systemausfälle können unkontrollierte Prozesse verursachen.',
          points: 0,
          gapWarning: 'Art. 15 Abs. 1 fordert angemessene Robustheit und Redundanz für kritische Einsätze.'
        }
      ]
    },
    recommendedNextStep: 'Dokumentieren Sie Fail-Safe- und Not-Aus-Mechanismen für das schwedische Marktüberwachungs-Dossier.'
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
    officialUrl: 'https://digst.dk',
    nationalQuestion: {
      questionTitle: '8. [Dänemark / DIGST] Erfüllt das System die dänischen Standards für öffentliche Beschaffung (Public Procurement)?',
      questionSubtitle: 'Dänemark verlangt bei behördlicher oder kommunaler KI-Nutzung strenge Nachweise über Erklärbarkeit nach Art. 13.',
      legalRef: 'Art. 13 & Art. 26 AI Act',
      options: [
        {
          label: 'Ja, vollständige Transparenz- und Erklärbarkeitsdokumentation für öffentliche Ausschreibungen liegt vor',
          description: 'Entscheidungsfindung ist für Sachbearbeiter und Bürger transparent nachvollziehbar.',
          points: 15
        },
        {
          label: 'System ist für private B2B-Nutzung vorgesehen, keine Teilnahme an dänischen Ausschreibungen',
          description: 'Keine behördliche Anwendung in Dänemark.',
          points: 15
        },
        {
          label: 'Ausschreibungsteilnahme beabsichtigt, aber Dokumentation nach Art. 13 noch unvollständig',
          description: 'Wesentliche Leistungs- und Fehlergrenzen sind noch nicht dokumentiert.',
          points: 5,
          gapWarning: 'Dänische Behörden schließen unzureichend dokumentierte KI-Systeme von Vergabeverfahren aus.'
        }
      ]
    },
    recommendedNextStep: 'Erstellen Sie ein Erklärbarkeitsdossier nach Art. 13 Abs. 3 für dänische Vergabeverfahren.'
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
    officialUrl: 'https://www.traficom.fi',
    nationalQuestion: {
      questionTitle: '8. [Finnland / Traficom] Wurde die KI-Kompetenz des Personals nach Art. 4 AI Act formal geschult und nachgewiesen?',
      questionSubtitle: 'Finnland legt als Vorreiter der „Elements of AI“ besonderen Wert auf den Nachweis von KI-Kompetenz der Beschäftigten.',
      legalRef: 'Art. 4 AI Act (KI-Kompetenz)',
      options: [
        {
          label: 'Ja, strukturierter Schulungsplan und Kompetenzzertifikate für Bediener und Entwickler liegen vor',
          description: 'Personal versteht Funktionsweise, Risiken und Grenzen der eingesetzten Systeme.',
          points: 15
        },
        {
          label: 'Mitarbeiter haben informelle Erfahrung, aber keine formalen Zertifikate oder Schulungsnachweise',
          description: 'Keine schriftliche Schulungsdokumentation im Unternehmen hinterlegt.',
          points: 8,
          gapWarning: 'Art. 4 fordert seit 02.02.2025 verbindlich angemessene Maßnahmen zur KI-Kompetenz.'
        },
        {
          label: 'Bisher keine KI-Schulungen für Mitarbeiter durchgeführt',
          description: 'Personal arbeitet ohne Einweisung mit KI-Tools.',
          points: 0,
          gapWarning: 'Verstoß gegen Art. 4 AI Act (unmittelbar in Kraft seit 02.02.2025).'
        }
      ]
    },
    recommendedNextStep: 'Implementieren Sie verbindliche Schulungsnachweise zur KI-Kompetenz nach Art. 4 für Ihr Personal.'
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
    officialUrl: 'https://www.anacom.pt',
    nationalQuestion: {
      questionTitle: '8. [Portugal / ANACOM] Wird das System in einer portugiesischen Technologiezone (ZLT) erprobt?',
      questionSubtitle: 'In Portugal können experimentelle KI-Systeme von beschleunigten Prüfverfahren in freien Technologiezonen profitieren.',
      legalRef: 'Art. 57 AI Act & Zonas Livres Tecnológicas',
      options: [
        {
          label: 'Ja, ZLT-Sonderstatus oder Reallabor-Erprobung mit den Behörden vereinbart',
          description: 'Prototyp läuft unter behördlicher Aufsicht im Testbetrieb.',
          points: 15
        },
        {
          label: 'Regulärer kommerzieller Betrieb ohne Inanspruchnahme von Sonderzonen',
          description: 'Vollständige Standard-Konformität nach AI Act ist erforderlich.',
          points: 15
        },
        {
          label: 'Experimentelles System ohne Sondergenehmigung bereits im Produktivbetrieb',
          description: 'Ungetestetes System mit unvollständiger Dokumentation am Markt.',
          points: 0,
          gapWarning: 'Ohne formale ZLT-Zulassung gelten sofort die vollen Sanktionen des Art. 99.'
        }
      ]
    },
    recommendedNextStep: 'Prüfen Sie bei innovativen Modellen die Anmeldung in einer portugiesischen ZLT vor dem Rollout.'
  },
  {
    id: 'cz',
    country: 'Tschechien',
    flag: '🇨🇿',
    isoCode: 'CZ',
    geoName: 'Czech Republic',
    authorityName: 'Ministerstvo průmyslu a obchodu (MPO) & ÚOOÚ',
    authorityAcronym: 'MPO / ÚOOÚ',
    roleType: 'Marktüberwachungsbehörde (MSA)',
    status: 'Gesetzgebung im parlamentarischen Verfahren',
    sandboxStatus: 'Reallabor im Aufbau',
    headquarters: 'Prag',
    focusArea: 'Industrie 4.0, Robotik-KI und Produktsicherheits-Integration',
    description: 'Das Ministerium für Industrie und Handel (MPO) koordiniert die Marktüberwachung für industrielle und eingebettete KI in Zusammenarbeit mit dem Tschechischen Datenschutzamt (ÚOOÚ).',
    keyFacts: [
      'Starker Fokus auf KI im Maschinenbau und Automotive-Zulieferbereich (Anhang I)',
      'Prager KI-Cluster für Cybersicherheit und Machine Learning'
    ],
    nationalSpecifics: 'Nationale KI-Strategie der Tschechischen Republik (NAIS) mit Schwerpunkt auf KMU-Förderung bei der CE-Zertifizierung.',
    officialUrl: 'https://www.mpo.cz',
    nationalQuestion: {
      questionTitle: '8. [Tschechien / MPO] Handelt es sich um eine Sicherheitskomponente eines Maschinen- oder Industrie-4.0-Produkts (Anhang I)?',
      questionSubtitle: 'Tschechien fokussiert sich auf die Schnittstelle zwischen der EU-Maschinenverordnung und dem AI Act.',
      legalRef: 'Art. 6 Abs. 1 i.V.m. Anhang I AI Act',
      options: [
        {
          label: 'Ja, Konformitätsbewertung wird mit der Maschinen-CE-Zertifizierung harmonisiert',
          description: 'Sicherheitsbauteil erfüllt sowohl Maschinen- als auch KI-Verordnung.',
          points: 15
        },
        {
          label: 'Reine Software ohne Einbettung in physische Maschinen oder Industrieanlagen',
          description: 'System unterliegt nicht den Anhang-I-Sondervorschriften.',
          points: 15
        },
        {
          label: 'Industrie-KI, aber Konformitätsüberlappung mit Maschinenrichtlinie noch ungeprüft',
          description: 'Sicherheitsrisiken an Industrieanlagen sind nicht systematisch harmonisiert.',
          points: 0,
          gapWarning: 'Anhang I verlangt die einheitliche CE-Prüfung vor Inverkehrbringen in der Industrie.'
        }
      ]
    },
    recommendedNextStep: 'Prüfen Sie bei tschechischen Fertigungsstandorten die Konformitätsüberlappung mit der EU-Maschinenverordnung.'
  },
  {
    id: 'ro',
    country: 'Rumänien',
    flag: '🇷🇴',
    isoCode: 'RO',
    geoName: 'Romania',
    authorityName: 'Autoritatea pentru Digitalizarea României (ADR) & ANSPDCP',
    authorityAcronym: 'ADR / ANSPDCP',
    roleType: 'Marktüberwachungsbehörde (MSA)',
    status: 'In Vorbereitung (Frist 02.08.2025)',
    sandboxStatus: 'Konzeptphase',
    headquarters: 'Bukarest',
    focusArea: 'Digitalisierungsbehörde und Überwachung von IT-Outsourcing-Hubs',
    description: 'Rumänien setzt auf die Digitalisierungsbehörde ADR zur Bündelung der KI-Marktaufsicht, insbesondere für den stark wachsenden IT-Dienstleistungssektor in Bukarest und Cluj-Napoca.',
    keyFacts: [
      'Bedeutender europäischer Entwicklungs- und BPO-Standort für KI-Datenannotation',
      'Nationale KI-Strategie betont ethische Entwicklung und Datensicherheit'
    ],
    nationalSpecifics: 'Strategia Națională în domeniul Inteligenței Artificiale: Fokus auf Transparenz von Outsourcing-Lieferketten.',
    officialUrl: 'https://www.adr.gov.ro',
    nationalQuestion: {
      questionTitle: '8. [Rumänien / ADR] Werden Qualitätsstandards bei Daten-Annotation und Modellentwicklung durch rumänische Teams dokumentiert?',
      questionSubtitle: 'Rumänien legt Wert auf lückenlose Dokumentation von Data Labeling und menschlicher Vorfilterung.',
      legalRef: 'Art. 10 Abs. 2–4 AI Act',
      options: [
        {
          label: 'Ja, standardisierte Annotationsrichtlinien und Qualitätsmetriken für Trainingsdaten liegen vor',
          description: 'Konsistenz und Bias-Kontrollen beim Labeling sind revisionssicher dokumentiert.',
          points: 15
        },
        {
          label: 'Annotations-Richtlinien existieren informell, aber keine statistische Qualitätsprüfung',
          description: 'Kennzeichnung erfolgte nach Erfahrungswerten.',
          points: 8,
          gapWarning: 'Art. 10 fordert spezifische Governance-Verfahren bei der Datenbereinigung und Annotation.'
        },
        {
          label: 'Keine Dokumentation über Herkunft oder Annotations-Methoden der Datensätze',
          description: 'Trainingsdaten wurden ohne formale Dokumentation aufbereitet.',
          points: 0,
          gapWarning: 'Kritische Lücke bei behördlichen Audits nach Art. 10.'
        }
      ]
    },
    recommendedNextStep: 'Dokumentieren Sie die Annotation-Pipelines und Qualitätskontrollen Ihrer rumänischen Entwicklerteams.'
  },
  {
    id: 'hu',
    country: 'Ungarn',
    flag: '🇭🇺',
    isoCode: 'HU',
    geoName: 'Hungary',
    authorityName: 'Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH) & NKI',
    authorityAcronym: 'NAIH / NKI',
    roleType: 'Marktüberwachungsbehörde (MSA)',
    status: 'Gesetzgebung im parlamentarischen Verfahren',
    sandboxStatus: 'Reallabor im Aufbau',
    headquarters: 'Budapest',
    focusArea: 'Nationale Datenschutzbehörde (NAIH) & KI-Koalition für industrielle Automation',
    description: 'In Ungarn übernimmt die NAIH die Aufsicht über Grundrechte und automatisierte Entscheidungen in enger Koordination mit der nationalen KI-Koalition (Mesterséges Intelligencia Koalíció).',
    keyFacts: [
      'Ungarische KI-Koalition vereint über 400 Industrie- und Forschungspartner',
      'Strikte Auslegung der Informationsrechte betroffener Personen durch die NAIH'
    ],
    nationalSpecifics: 'Ungarische KI-Strategie 2020–2030: Fokus auf automatisierte Fertigung und Souveränität digitaler Infrastrukturen.',
    officialUrl: 'https://www.naih.hu',
    nationalQuestion: {
      questionTitle: '8. [Ungarn / NAIH] Sind Auskunftsrechte und Erklärbarkeit gegenüber ungarischen Endnutzern gesichert?',
      questionSubtitle: 'Die NAIH prüft automatisierte Entscheidungen mit Schwerpunkt auf Transparenz und Einspruchsmöglichkeiten.',
      legalRef: 'Art. 86 AI Act & NAIH Leitlinien',
      options: [
        {
          label: 'Ja, strukturierter Auskunftsprozess nach Art. 86 AI Act ist etabliert',
          description: 'Betroffene Personen können die tragenden Gründe einer KI-Entscheidung unkompliziert anfordern.',
          points: 15
        },
        {
          label: 'Auskunft nach DSGVO (Art. 15) möglich, aber keine KI-spezifische Erklärbarkeit',
          description: 'Begründungen für Score-Werte können nicht automatisiert ausgegeben werden.',
          points: 8,
          gapWarning: 'Art. 86 gewährt ein echtes Recht auf Erklärung bei Hochrisiko-Entscheidungen.'
        },
        {
          label: 'Kein formaler Auskunfts- oder Begründungsprozess implementiert',
          description: 'Systementscheidungen können gegenüber Betroffenen nicht erklärt werden.',
          points: 0,
          gapWarning: 'Erhebliches Sanktionsrisiko bei Beschwerden an die NAIH.'
        }
      ]
    },
    recommendedNextStep: 'Richten Sie einen Auskunftsworkflow nach Art. 86 zur Erklärung von KI-Einzelfallentscheidungen ein.'
  },
  {
    id: 'no',
    country: 'Norwegen',
    flag: '🇳🇴',
    isoCode: 'NO',
    geoName: 'Norway',
    authorityName: 'Datatilsynet & Digitaliseringsdirektoratet (Digdir)',
    authorityAcronym: 'Datatilsynet / Digdir',
    roleType: 'Marktüberwachungsbehörde (MSA)',
    status: 'Aktiv benannt',
    sandboxStatus: 'Reallabor aktiv',
    headquarters: 'Oslo',
    focusArea: 'EWR-Integration des AI Acts & Pionier des europäischen KI-Reallabors',
    description: 'Als EWR-Mitglied übernimmt Norwegen den EU AI Act vollständig. Das norwegische Datatilsynet betreibt seit 2020 eines der renommiertesten KI-Reallabore Europas für ethische Algorithmen.',
    keyFacts: [
      'Pionier: Norwegisches Reallabor (Sandkasse for ansvarlig AI) seit 2020 im operativen Betrieb',
      'Veröffentlichung wegweisender Fallstudien zu Fairness, Diskriminierung und Transparenz',
      'Volle Unterwerfung unter die Marktüberwachungsregeln durch EWR-Abkommen'
    ],
    nationalSpecifics: 'EWR-Relevanz: Übernahme des AI Acts in norwegisches Recht; Reallabor-Erfahrung als europäischer Goldstandard.',
    officialUrl: 'https://www.datatilsynet.no',
    nationalQuestion: {
      questionTitle: '8. [Norwegen / EWR] Orientiert sich das System an den Fallstudien des norwegischen KI-Reallabors (Sandkasse)?',
      questionSubtitle: 'Das Datatilsynet Oslo fordert strenge Dokumentation von Diskriminierungsrisiken und Fairnessmetriken.',
      legalRef: 'Art. 57 AI Act & EWR-Übernahme',
      options: [
        {
          label: 'Ja, Best Practices des norwegischen Datatilsynet für verantwortungsvolle KI sind umgesetzt',
          description: 'Methoden zur Fairnessmessung entsprechen den norwegischen Pilot-Fallstudien.',
          points: 15
        },
        {
          label: 'Reallabor-Ergebnisse bekannt, aber eigene Fairness-Metriken noch nicht validiert',
          description: 'Grundsätzliche Compliance vorhanden, vertiefte Prüfung steht aus.',
          points: 10
        },
        {
          label: 'Bisher keine Ausrichtung an den EWR-spezifischen Richtlinien',
          description: 'Norwegische Prüfpraxis wurde nicht berücksichtigt.',
          points: 5
        }
      ]
    },
    recommendedNextStep: 'Nutzen Sie die frei zugänglichen Audit-Reports des norwegischen Reallabors zur Schließung Ihrer Bias-Lücken.'
  }
];
