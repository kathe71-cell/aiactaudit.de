import React, { useEffect } from 'react';
import { Scale, Mail, Phone, ExternalLink } from 'lucide-react';

interface ImpressumPageProps {
  navigate: (path: string) => void;
}

export const ImpressumPage: React.FC<ImpressumPageProps> = ({ navigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-slate-900 cursor-pointer">
            Startseite
          </button>
          <span>/</span>
          <span className="font-semibold text-slate-900">Impressum</span>
        </div>

        {/* Main Content Box */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
          
          <div className="border-b border-slate-200 pb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-white mb-3">
              <Scale className="w-3.5 h-3.5 text-emerald-400" />
              <span>Gesetzliche Anbieterkennzeichnung</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Impressum
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG) und § 18 Abs. 2 Medienstaatsvertrag (MStV)
            </p>
          </div>

          {/* Fixed Impressum Data */}
          <div className="space-y-4 text-sm text-slate-800">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <p className="font-bold text-base text-slate-950">Angaben gemäß § 5 DDG:</p>
              <p className="font-medium">Jens Kathe</p>
              <p>Hansastraße 6</p>
              <p>34119 Kassel</p>
              <p>Deutschland</p>
            </div>

            {/* Contact */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <p className="font-bold text-slate-950">Kontakt &amp; Schnelle elektronische Kommunikation:</p>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>E-Mail: </span>
                  <a href="mailto:jens@kathe.org" className="font-semibold text-slate-900 hover:text-emerald-700 underline">
                    jens@kathe.org
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Telefon: </span>
                  <a href="tel:+491786652623" className="font-semibold text-slate-900 hover:text-emerald-700">
                    +49 178 6652623
                  </a>
                </div>
              </div>
            </div>

            {/* MStV */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <p className="font-bold text-slate-950">Inhaltlich Verantwortlicher gemäß § 18 Abs. 2 MStV:</p>
              <p className="text-xs sm:text-sm text-slate-700">
                Jens Kathe<br />
                Hansastraße 6<br />
                34119 Kassel<br />
                Deutschland
              </p>
            </div>

            {/* Streitbeilegung */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <p className="font-bold text-slate-950">EU-Streitschlichtung &amp; Verbraucherstreitbeilegung:</p>
              <p className="text-xs text-slate-700 leading-relaxed">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                <a 
                  href="https://ec.europa.eu/consumers/odr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-semibold text-emerald-700 hover:underline ml-1 inline-flex items-center gap-1"
                >
                  <span>https://ec.europa.eu/consumers/odr</span>
                  <ExternalLink className="w-3 h-3" />
                </a>.
              </p>
              <p className="text-xs text-slate-700 leading-relaxed">
                Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, 
                an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>

            {/* Haftungshinweise */}
            <div className="space-y-4 pt-4 text-xs text-slate-600 leading-relaxed">
              <div>
                <h2 className="font-bold text-slate-900 mb-1">Haftung für Inhalte</h2>
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den 
                  allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, 
                  übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine 
                  rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den 
                  allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis 
                  einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte 
                  umgehend entfernen.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-slate-900 mb-1">Haftung für Links</h2>
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb 
                  können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets 
                  der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der 
                  Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht 
                  erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer 
                  Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-slate-900 mb-1">Urheberrecht</h2>
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. 
                  Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes 
                  bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur 
                  für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, 
                  werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem 
                  auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von 
                  Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                </p>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 font-medium">
                <strong>Rechtlicher Hinweis zu AI Act Inhalten:</strong> Die auf diesem Portal publizierten 
                Checklisten, Leitfäden und Risikoeinstufungen stellen eine technische und fachliche Orientierungshilfe 
                zur Verordnung (EU) 2024/1689 dar. Sie ersetzen keine anwaltliche Beratung im Einzelfall oder offizielle Konformitätsbewertungen 
                durch akkreditierte Prüfstellen.
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
