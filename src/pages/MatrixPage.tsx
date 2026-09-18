import React, { useEffect } from 'react';
import { ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

interface MatrixPageProps {
  navigate: (path: string) => void;
}

export const MatrixPage: React.FC<MatrixPageProps> = ({ navigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);
  const annexThreeDomains = [
    {
      nr: '1',
      domain: 'Biometrische Identifizierung & Kategorisierung',
      examples: 'Fernidentifizierung (Echtzeit & nachträglich), biometrische Kategorisierung nach sensiblen Attributen, Emotionserkennung.',
      exceptions: 'Reine biometrische Verifikation für autorisierten Zugang (z. B. Smartphone-Entsperrung).',
      conformity: 'Benannte Stelle (Anhang VII) bei Fernidentifikation; sonst Anhang VI.'
    },
    {
      nr: '2',
      domain: 'Kritische Infrastruktur (KRITIS)',
      examples: 'Sicherheitskomponenten im Betrieb von Straßenverkehr, Wasser-, Gas-, Heiz- und Stromversorgung.',
      exceptions: 'Reine Abrechnungssoftware ohne Einfluss auf physische Steuerungsnetze.',
      conformity: 'Interne Kontrolle (Anhang VI) + Sektorspezifische Sicherheitsaudits.'
    },
    {
      nr: '3',
      domain: 'Bildung & Berufsausbildung',
      examples: 'Zulassungsentscheidungen, Prüfungsauswertung, Überwachung des Prüfungsverhaltens (Proctoring).',
      exceptions: 'Administrative Terminverwaltung oder einfache Stundenplan-Tools.',
      conformity: 'Interne Kontrolle (Anhang VI).'
    },
    {
      nr: '4',
      domain: 'Beschäftigung, Personalmanagement & Selbstständigkeit',
      examples: 'Gezielte Stellenanzeigen, CV-Filterung, Leistungsbeurteilung, Beförderungs- oder Kündigungsentscheidungen.',
      exceptions: 'Reine Kalenderplanung von Vorstellungsgesprächen ohne Kandidatenbewertung.',
      conformity: 'Interne Kontrolle (Anhang VI).'
    },
    {
      nr: '5',
      domain: 'Zugang zu essenziellen privaten & öffentlichen Diensten',
      examples: 'Kredit-Scoring, Risikobewertung bei Kranken-/Lebensversicherungen, Notruf-Klassifizierung.',
      exceptions: 'Einfache Betrugserkennungstools ohne Bonitätsbeurteilung natürlicher Personen.',
      conformity: 'Interne Kontrolle (Anhang VI).'
    },
    {
      nr: '6',
      domain: 'Strafverfolgung',
      examples: 'Bewertung von Rückfallrisiken, Profiling natürlicher Personen, Zuverlässigkeitsprüfung von Beweismitteln.',
      exceptions: 'Einfache Recherche in Textdatenbanken ohne algorithmische Verhaltensprognose.',
      conformity: 'Interne Kontrolle (Anhang VI) oder Anhang VII je nach Instrument.'
    },
    {
      nr: '7',
      domain: 'Migration, Asyl & Grenzkontrolle',
      examples: 'Prüfung von Reisedokumenten, Risikoanalyse bei Asylanträgen, biometrische Identitätsprüfung an Außengrenzen.',
      exceptions: 'Standard-Warteschlangenmanagement an Flughäfen.',
      conformity: 'Interne Kontrolle (Anhang VI).'
    },
    {
      nr: '8',
      domain: 'Rechtspflege & Demokratische Prozesse',
      examples: 'Unterstützung von Richtern bei Rechtsfindung und Urteilsbegründung, Beeinflussung von Wahlausgängen.',
      exceptions: 'Reine Dokumentensuche in juristischen Fachdatenbanken (Juris, Beck-Online).',
      conformity: 'Interne Kontrolle (Anhang VI).'
    }
  ];

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-slate-900 cursor-pointer">
            Startseite
          </button>
          <span>/</span>
          <span className="font-semibold text-slate-900">Hochrisiko-Spezifikationsmatrix</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-950 border border-amber-300 mb-4">
            <ShieldAlert className="w-4 h-4 text-amber-700" />
            <span>Spezifikationsmatrix nach Art. 6, Anhang I &amp; Anhang III</span>
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            EU AI Act Hochrisiko-Katalog &amp; Konformitätsverfahren
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
            Wann gilt ein KI-System rechtlich als Hochrisiko-KI? Die Verordnung (EU) 2024/1689 unterscheidet 
            grundlegend zwischen Sicherheitsbauteilen in regulierten Produkten (Anhang I) und eigenständigen 
            Hochrisiko-Anwendungen (Anhang III).
          </p>

          {/* Art. 6 Abs. 3 Exception Callout */}
          <div className="mt-6 p-4 sm:p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
            <div className="flex items-center gap-2 text-emerald-950 font-black text-sm mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Praxis-Tipp: Die Ausnahmeregelung nach Art. 6 Abs. 3 EU AI Act</span>
            </div>
            <p className="text-slate-800 leading-relaxed">
              Ein System aus Anhang III gilt <strong>nicht</strong> als Hochrisiko-System, wenn es kein erhebliches Risiko für Gesundheit, Sicherheit oder Grundrechte birgt. Das greift insbesondere, wenn die KI (a) nur eine enge verfahrenstechnische Teilaufgabe erfüllt, (b) die Ergebnisse einer vorangegangenen menschlichen Tätigkeit lediglich verbessert, (c) nur rein vorbereitende Muster detektiert oder (d) keine wesentliche Beeinflussung der menschlichen Entscheidung bewirkt. <em>Achtung: Anbieter müssen diese Ausnahmegründe vor dem Inverkehrbringen schriftlich dokumentieren und auf Anfrage der Aufsichtsbehörde vorlegen.</em>
            </p>
          </div>
        </div>

        {/* Section 1: Comparison Annex I vs Annex III */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Annex I Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                I
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">Anhang I: Regulierte Produkte</h2>
                <span className="text-xs text-slate-500">Harmonisierte Produktsicherheits-Richtlinien</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Das KI-System ist selbst ein Produkt oder eine Sicherheitskomponente eines Produkts, das bereits 
              nach bestehenden EU-Richtlinien einer Konformitätsbewertung durch Dritte unterliegt.
            </p>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
              <span className="font-bold text-slate-900 block">Betroffene Branchen &amp; Richtlinien:</span>
              <ul className="space-y-1 text-slate-700">
                <li>• Medizinprodukte &amp; In-vitro-Diagnostika (MDR / IVDR)</li>
                <li>• Maschinen &amp; Industrieanlagen (Maschinenverordnung)</li>
                <li>• Kraftfahrzeuge &amp; Autonome Transportsysteme</li>
                <li>• Zivilluftfahrt &amp; Schiffsausrüstung</li>
                <li>• Spielzeug- und Aufzugssicherheit</li>
              </ul>
            </div>

            <div className="pt-2 text-xs text-amber-900 font-bold bg-amber-50 p-3 rounded-lg border border-amber-200">
              Geltungsbeginn: 02. August 2027 (36 Monate Übergangsfrist nach Art. 111).
            </div>
          </div>

          {/* Annex III Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                III
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">Anhang III: Standalone-Systeme</h2>
                <span className="text-xs text-emerald-800 font-bold">8 spezifische Hochrisiko-Einsatzgebiete</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Eigenständige KI-Systeme, die in sensiblen Lebensbereichen erhebliche Auswirkungen auf Grundrechte, 
              Chancengleichheit, Sicherheit oder Rechtsstaatlichkeit haben.
            </p>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
              <span className="font-bold text-slate-900 block">Kernbereiche:</span>
              <ul className="space-y-1 text-slate-700">
                <li>• HR &amp; Mitarbeiterbewertung (Bewerbung, Beförderung)</li>
                <li>• Kredit-Scoring &amp; Lebensversicherungs-Tarifierung</li>
                <li>• Biometrische Fernerkennung &amp; Kategorisierung</li>
                <li>• Steuerung kritischer Infrastrukturen (Strom, Wasser)</li>
                <li>• Justizwesen, Polizei &amp; Asylentscheidungen</li>
              </ul>
            </div>

            <div className="pt-2 text-xs text-emerald-950 font-bold bg-emerald-100 p-3 rounded-lg border border-emerald-300">
              Geltungsbeginn: 02. August 2026 (24 Monate Frist nach Art. 111).
            </div>
          </div>

        </div>

        {/* Section 2: Table of Annex III Domains */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
          <div className="p-6 border-b border-slate-200 bg-slate-50/70">
            <h2 className="text-lg font-black text-slate-900">
              Übersicht der 8 Anwendungsbereiche nach Anhang III
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Detaillierte Abgrenzung mit typischen Praxisbeispielen, Ausnahmen nach Art. 6 Abs. 3 und Konformitätspfad.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/80 text-slate-900 font-extrabold border-b border-slate-200 uppercase tracking-wider">
                  <th className="p-4 w-12 text-center">Nr.</th>
                  <th className="p-4 min-w-[200px]">Bereich nach Anhang III</th>
                  <th className="p-4 min-w-[240px]">Typische Anwendungsfälle</th>
                  <th className="p-4 min-w-[200px]">Mögliche Ausnahme (Art. 6 Abs. 3)</th>
                  <th className="p-4 min-w-[180px]">Konformitätsverfahren</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {annexThreeDomains.map((item) => (
                  <tr key={item.nr} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-900 text-center bg-slate-50/50">
                      {item.nr}
                    </td>
                    <td className="p-4 font-bold text-slate-900">
                      {item.domain}
                    </td>
                    <td className="p-4 leading-relaxed">
                      {item.examples}
                    </td>
                    <td className="p-4 text-slate-500 leading-relaxed">
                      {item.exceptions}
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 block text-center">
                        {item.conformity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Conformity Pathways: Annex VI vs Annex VII */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs mb-12">
          <h2 className="text-xl font-black text-slate-950 mb-4">
            Konformitätsbewertungsverfahren: Wann reicht die Eigenzertifizierung?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/40">
              <div className="flex items-center gap-2 font-black text-emerald-950 text-sm mb-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <span>Interne Kontrolle (Anhang VI) – Standardweg</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed mb-3">
                Für die überwiegende Mehrheit der Anhang-III-Systeme (z. B. HR-Software, Kredit-Scoring, Bildung) 
                sieht Art. 43 Abs. 1 vor, dass der <strong>Anbieter die Konformitätsbewertung selbst durchführen kann</strong>.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5">
                <li>✓ Erstellung der technischen Dokumentation (Anhang IV)</li>
                <li>✓ Nachweis des Risikomanagements (Art. 9) &amp; Bias-Tests (Art. 10)</li>
                <li>✓ Ausstellung der EU-Konformitätserklärung</li>
                <li>✓ Anbringung der offiziellen CE-Kennzeichnung</li>
                <li>✓ Registrierung in der EU-Datenbank vor Marktstart</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl border border-slate-300 bg-slate-50">
              <div className="flex items-center gap-2 font-black text-slate-900 text-sm mb-2">
                <ShieldAlert className="w-5 h-5 text-slate-700" />
                <span>Benannte Stelle (Anhang VII) – Externe Prüfung</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed mb-3">
                Eine obligatorische Prüfung durch eine akkreditierte Zertifizierungsstelle (z. B. TÜV, DEKRA) 
                ist nur in eng umgrenzten Ausnahmefällen zwingend:
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5">
                <li>• Biometrische Fernidentifizierungssysteme (Art. 43 Abs. 1 lit. b)</li>
                <li>• Sofern keine harmonisierten Normen angewendet wurden</li>
                <li>• Sicherheitsbauteile in regulierten Produkten nach Anhang I</li>
                <li>• Auditierung des Qualitätsmanagementsystems vor Ort</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Navigation CTA */}
        <div className="p-8 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">
              Eigene Systeme jetzt nach Anhang III einstufen
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Nutzen Sie unseren kostenfreien Audit-Check zur strukturierten Einstufung.
            </p>
          </div>
          <button
            onClick={() => {
              navigate('/audit-check');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-sm px-6 py-3 rounded-xl transition-all cursor-pointer"
          >
            <span>Audit-Check starten *</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
