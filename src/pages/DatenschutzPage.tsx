import React from 'react';
import { Lock, CheckCircle2 } from 'lucide-react';

interface DatenschutzPageProps {
  navigate: (path: string) => void;
}

export const DatenschutzPage: React.FC<DatenschutzPageProps> = ({ navigate }) => {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-slate-900 cursor-pointer">
            Startseite
          </button>
          <span>/</span>
          <span className="font-semibold text-slate-900">Datenschutzerklärung</span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
          
          <div className="border-b border-slate-200 pb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-white mb-3">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>DSGVO-Konformität</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Datenschutzerklärung
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Informationen über die Verarbeitung personenbezogener Daten nach Art. 12, 13 und 14 DSGVO
            </p>
          </div>

          {/* Privacy highlights badge */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2">
            <div className="font-black text-xs uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Datensparsame Architektur &amp; Lokale Rechner-Verarbeitung</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Dieses Fachportal verwendet keine externen Schriftarten (keine Google Fonts CDNs) – stattdessen greift der native System-Font-Stack Ihres Betriebssystems. 
              Sämtliche interaktiven Selbstevaluationen und Risiko-Checks werden rein lokal im Browser-Arbeitsspeicher ausgeführt und niemals auf unseren Servern gespeichert. 
              Werbeeinbindungen durch Google AdSense sind in Ziffer 5 transparent und detailliert ausgewiesen.
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
            
            {/* 1. Verantwortlicher */}
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-2">1. Name und Kontaktdaten des Verantwortlichen</h2>
              <p>Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO):</p>
              <div className="mt-2 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <p className="font-bold text-slate-900">Jens Kathe</p>
                <p>Hansastraße 6, 34119 Kassel, Deutschland</p>
                <p>E-Mail: <a href="mailto:jens@kathe.org" className="text-emerald-700 hover:underline">jens@kathe.org</a></p>
                <p>Telefon: <a href="tel:+491786652623" className="text-emerald-700 hover:underline">+49 178 6652623</a></p>
              </div>
            </div>

            {/* 2. Erhebung und Speicherung bei Serveraufruf */}
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-2">2. Bereitstellung der Website und Server-Logfiles</h2>
              <p>
                Beim Aufrufen unserer Website durch Ihren Browser werden durch den Webserver (Hosting-Infrastruktur) 
                automatisch Informationen temporär in sogenannten Server-Logdateien erhoben. Dies sind:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-slate-600">
                <li>Browsertyp und Browserversion</li>
                <li>Verwendetes Betriebssystem</li>
                <li>Referrer URL (die zuvor besuchte Seite)</li>
                <li>Hostname des zugreifenden Rechners / anonymisierte IP-Adresse</li>
                <li>Datum und Uhrzeit der Serveranfrage</li>
                <li>HTTP-Statuscode und übertragene Datenmenge</li>
              </ul>
              <p className="mt-2 text-xs">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der technischen 
                Stabilität, Fehlersuche und Gewährleistung der IT-Sicherheit). Eine Zusammenführung dieser Daten mit anderen 
                Datenquellen wird nicht vorgenommen.
              </p>
            </div>

            {/* 3. Kontaktaufnahme */}
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-2">3. Kontaktaufnahme per E-Mail oder Telefon</h2>
              <p>
                Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden 
                personenbezogenen Daten (z. B. Name, E-Mail-Adresse, Telefonnummer, Inhalt der Nachricht) zum Zwecke der Bearbeitung 
                Ihres Anliegens bei uns gespeichert und verarbeitet.
              </p>
              <p className="mt-1 text-xs">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags 
                oder vorvertraglichen Maßnahmen zusammenhängt; im Übrigen Art. 6 Abs. 1 lit. f DSGVO auf Basis unseres berechtigten Interesses 
                an einer effizienten Kommunikation.
              </p>
            </div>

            {/* 4. Schriftarten (Zero-CDN) & Lokale Browser-Berechnung */}
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-2">4. Schriftarten (Zero-CDN) &amp; Lokale Browser-Berechnung</h2>
              <p>
                Zur Schriftartendarstellung nutzen wir ausschließlich den System-Schriftarten-Stack Ihres Betriebssystems. 
                Es werden keine externen Verbindungen zu Google Fonts oder ähnlichen Drittanbieter-Netzwerken aufgebaut.
                Alle interaktiven Checks (wie der Audit-Readiness Rechner und der Bußgeld-Kalkulator) laufen rein lokal im Arbeitsspeicher Ihres 
                Browsers und werden zu keinem Zeitpunkt an unsere Server übermittelt oder gespeichert.
                Hinsichtlich Werbe-Cookies verweisen wir auf die nachfolgende Ziffer 5 zu Google AdSense.
              </p>
            </div>

            {/* 5. Google AdSense */}
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-2">5. Google AdSense</h2>
              <p>
                Diese Website nutzt Google AdSense, einen Dienst zum Einbinden von Werbeanzeigen der Google Ireland Limited, 
                Gordon House, Barrow Street, Dublin 4, Irland („Google“).
              </p>
              <p className="mt-2">
                Google AdSense verwendet Cookies und Web Beacons (unsichtbare Grafiken), um die Schaltung von Werbung zu optimieren 
                und die Nutzung der Website auszuwerten. Die durch Cookies und Web Beacons erzeugten Informationen über die Benutzung 
                dieser Website (einschließlich Ihrer IP-Adresse) werden in der Regel an Server von Google in den USA übertragen und dort gespeichert.
              </p>
              <p className="mt-2">
                Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern 
                oder personalisierte Werbung über die Google-Einstellungen für Werbung deaktivieren unter:{' '}
                <a 
                  href="https://www.google.de/settings/ads" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-emerald-700 underline font-semibold"
                >
                  https://www.google.de/settings/ads
                </a>.
              </p>
              <p className="mt-2 text-xs">
                Weitere Informationen zur Datennutzung durch Google finden Sie in der Google-Datenschutzerklärung unter:{' '}
                <a 
                  href="https://policies.google.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-emerald-700 underline font-semibold"
                >
                  https://policies.google.com/privacy
                </a>.
              </p>
            </div>

            {/* 6. Betroffenenrechte */}
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-2">6. Ihre Rechte als betroffene Person</h2>
              <p>Sie haben nach der DSGVO jederzeit folgende Rechte:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-slate-600">
                <li><strong>Recht auf Auskunft</strong> über Ihre bei uns gespeicherten personenbezogenen Daten (Art. 15 DSGVO)</li>
                <li><strong>Recht auf Berichtigung</strong> unrichtiger oder unvollständiger Daten (Art. 16 DSGVO)</li>
                <li><strong>Recht auf Löschung</strong> („Recht auf Vergessenwerden“, Art. 17 DSGVO)</li>
                <li><strong>Recht auf Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
                <li><strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
                <li><strong>Widerspruchsrecht</strong> gegen die Verarbeitung aus Gründen Ihrer besonderen Situation (Art. 21 DSGVO)</li>
              </ul>
              <p className="mt-2 text-xs">
                Zur Ausübung Ihrer Rechte reicht eine formlose Mitteilung an <a href="mailto:jens@kathe.org" className="text-emerald-700 underline font-semibold">jens@kathe.org</a>.
              </p>
            </div>

            {/* 7. Beschwerderecht */}
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-2">7. Beschwerderecht bei der Aufsichtsbehörde</h2>
              <p className="text-xs">
                Sie haben das Recht auf Beschwerde bei einer Datenschutz-Aufsichtsbehörde (Art. 77 DSGVO). Für unseren Sitz 
                in Hessen ist dies unter anderem der <em>Hessische Beauftragte für Datenschutz und Informationsfreiheit</em> (Postfach 3163, 65021 Wiesbaden, https://datenschutz.hessen.de).
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
