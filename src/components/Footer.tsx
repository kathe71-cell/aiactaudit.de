import React from 'react';
import { ShieldCheck, Scale, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const handleNav = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Disclaimer Box */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Scale className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  Rechtliche Offenlegung &amp; Unabhängigkeitshinweis
                </h2>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Dieses Portal (<strong>aiactaudit.de</strong>) ist ein unabhängiges, privates Informations- und Orientierungsangebot 
                  zur Verordnung (EU) 2024/1689 (EU Artificial Intelligence Act) und steht in keinem gesellschaftsrechtlichen Verhältnis 
                  zu den genannten Softwareanbietern, Normungsinstituten oder den europäischen Aufsichtsbehörden.
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Stand: Verordnung (EU) 2024/1689
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand summary */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">AI Act Audit</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Systematische Audit-Readiness, Risikoklassen-Einstufung und Pflichtenprüfung für KI-Entwickler, 
              Anbieter und Betreiber im DACH-Raum und der Europäischen Union.
            </p>
          </div>

          {/* Col 2: Thematic Sections */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Audit-Themenbereiche
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => handleNav('/audit-check')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Interaktiver Audit-Readiness Check *
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/hochrisiko-matrix')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Hochrisiko-Matrix (Anhang I &amp; III)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/fristen-guide')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Fristen-Kalender &amp; Stufenplan 2024–2027
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  7 Kernanforderungen nach Art. 9–15
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Bußgeld- &amp; Haftungskalkulator *
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: EU AI Act Reference Articles */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Rechtsgrundlagen &amp; Artikel
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center justify-between">
                <span>Art. 5: Verbotene KI-Praktiken</span>
                <span className="text-[10px] bg-red-950 text-red-300 px-1.5 py-0.5 rounded border border-red-800 font-bold">Feb 2025</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Art. 6: Hochrisiko-Einstufung</span>
                <span className="text-[10px] bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded border border-amber-800 font-bold">Aug 2026</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Art. 9–15: Technische Pflichten</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800 font-bold">Standard</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Art. 50: Transparenz-Pflichten</span>
                <span className="text-[10px] bg-blue-950 text-blue-300 px-1.5 py-0.5 rounded border border-blue-800 font-bold">Chatbots</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Art. 99: Sanktionen &amp; Bußgelder</span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">bis 35 Mio. €</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Rechtliches & Datenschutz */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Rechtliches
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => handleNav('/impressum')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Impressum
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/datenschutz')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Datenschutzerklärung
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Disclaimer Details */}
        <div className="pt-8 text-[11px] text-slate-500 space-y-3 leading-relaxed">
          <p>
            <strong>* Partnerlink / Werbehinweis:</strong> Die mit einem Sternchen (*) gekennzeichneten Links sind Partner- bzw. Empfehlungslinks. 
            Wenn Sie über diese Links ein Angebot unserer Kooperationspartner (z. B. Audit-Software, Schulungsanbieter oder Prüfstellen) wahrnehmen, 
            können wir eine Vermittlungsprovision erhalten. Für Sie als Nutzer entstehen dadurch keinerlei zusätzliche Kosten oder Nachteile.
          </p>
          <p>
            <strong>* Modellrechnung &amp; Orientierungshilfe:</strong> Sämtliche bereitgestellten Risiko-Klassifizierungs-Tools, Fristenberechnungen 
            und Bußgeld-Kalkulatoren stellen eine strukturierte Orientierungshilfe und beispielhafte Modellrechnungen dar. Sie ersetzen keine 
            qualifizierte juristische Prüfung oder offizielle Konformitätsbewertung durch ein benanntes Prüfinstitut.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-4 border-t border-slate-800/80 text-slate-400">
            <p>© {new Date().getFullYear()} aiactaudit.de • Alle Rechte vorbehalten.</p>
            <p className="text-[10px]">Entwickelt nach den europäischen Standards für barrierefreie, datenschutzkonforme Webangebote (WCAG AAA / DSGVO Zero-CDN).</p>
          </div>
        </div>

      </div>
    </footer>
  );
};
