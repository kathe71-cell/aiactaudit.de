import React from 'react';
import { Calendar, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

interface TimelinePageProps {
  navigate: (path: string) => void;
}

export const TimelinePage: React.FC<TimelinePageProps> = ({ navigate }) => {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-slate-900 cursor-pointer">
            Startseite
          </button>
          <span>/</span>
          <span className="font-semibold text-slate-900">Fristen-Guide 2024–2027</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-950 border border-emerald-300 mb-4">
            <Clock className="w-4 h-4 text-emerald-700" />
            <span>Verbindlicher Stufenplan nach Art. 111</span>
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            EU AI Act Fristenkalender &amp; Übergangsvorschriften
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Die Verordnung (EU) 2024/1689 wird nicht auf einen Schlag, sondern in vier aufeinanderfolgenden Stufen wirksam. 
            Hier finden Sie den vollständigen Zeitplan mit den konkreten Stichtagen und Übergangsregeln für Bestands-Systeme.
          </p>
        </div>

        {/* Deep Dive on the 4 Stages */}
        <div className="space-y-6 mb-12">
          
          {/* Phase 1 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <span className="text-base font-black text-slate-900 font-mono">02. Februar 2025 (6 Monate nach Inkrafttreten)</span>
              </div>
              <span className="text-xs font-black uppercase px-2.5 py-1 rounded bg-red-100 text-red-950 border border-red-300">
                STUFE 1: AKTIV IN KRAFT
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <h2 className="text-lg font-black text-slate-950">Geltung von Kapitel I (Allgemeines) &amp; Kapitel II (Verbotene Praktiken)</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Seit diesem Stichtag sind alle in Art. 5 definierten KI-Praktiken im gesamten EU-Binnenmarkt 
                vollständig untersagt. Es gibt für diese Tatbestände <strong>keine Übergangsfristen für Altsysteme</strong>.
              </p>
            </div>

            <div className="mt-4 p-3.5 bg-red-50 rounded-xl border border-red-200 text-xs text-red-950 space-y-1">
              <div className="font-bold">Sofortiges Verbot für:</div>
              <div>• Emotionserkennung am Arbeitsplatz und in Bildungseinrichtungen (Art. 5 Abs. 1 lit. f)</div>
              <div>• Social Scoring zur Bewertung der Vertrauenswürdigkeit (Art. 5 Abs. 1 lit. c)</div>
              <div>• Kognitive Verhaltensmanipulation zur Ausnutzung von Schwächen (Art. 5 Abs. 1 lit. a/b)</div>
              <div>• Ungezieltes Scrapen von Gesichtsbildern zur Erstellung von Datenbanken (Art. 5 Abs. 1 lit. e)</div>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="bg-white rounded-2xl border-2 border-amber-300 bg-amber-50/20 p-6 sm:p-7 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-amber-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-700" />
                <span className="text-base font-black text-slate-900 font-mono">02. August 2025 (12 Monate nach Inkrafttreten)</span>
              </div>
              <span className="text-xs font-black uppercase px-2.5 py-1 rounded bg-amber-100 text-amber-950 border border-amber-300 animate-pulse">
                STUFE 2: IN VORBEREITUNG
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <h2 className="text-lg font-black text-slate-950">Kapitel V: GPAI-Modelle &amp; Governance-Strukturen</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Hersteller von General-Purpose AI Modellen (Basismodellen / LLMs) müssen Modellkarten, Urheberrechts-Strategien 
                und Zusammenfassungen der Trainingsinhalte veröffentlichen. Das europäische KI-Büro (AI Office) nimmt seine 
                Marktaufsicht auf.
              </p>
            </div>

            <div className="mt-4 p-3.5 bg-white rounded-xl border border-amber-200 text-xs text-slate-800 space-y-1">
              <div className="font-bold text-amber-950">Handlungsbedarf bis August 2025:</div>
              <div>• Copyright-Compliance-Dokumentation für Trainingskorpora nachweisen (Art. 53 Abs. 1 lit. c)</div>
              <div>• Technische Modelldokumentation für nachgelagerte Integratoren bereitstellen</div>
              <div>• Nationale Notifizierungsbehörden für Prüfstellen (Benannte Stellen) benannt</div>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-slate-700" />
                <span className="text-base font-black text-slate-900 font-mono">02. August 2026 (24 Monate nach Inkrafttreten)</span>
              </div>
              <span className="text-xs font-bold uppercase px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                STUFE 3: ALLGEMEINE GELTUNG
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <h2 className="text-lg font-black text-slate-950">Volle Geltung für Hochrisiko-Systeme nach Anhang III</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Der Hauptteil der Verordnung wird verbindlich. Alle Systeme in HR, Kreditscoring, kritischer Infrastruktur, 
                Bildung und Justiz müssen die vollständigen Pflichten nach Art. 9–15 erfüllen und CE-gekennzeichnet sein.
              </p>
            </div>
          </div>

          {/* Phase 4 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-slate-700" />
                <span className="text-base font-black text-slate-900 font-mono">02. August 2027 (36 Monate nach Inkrafttreten)</span>
              </div>
              <span className="text-xs font-bold uppercase px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                STUFE 4: REGULIERTE PRODUKTE
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <h2 className="text-lg font-black text-slate-950">Abschluss der Übergangsphase für Anhang I</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Verpflichtende Konformität für KI-Systeme als Sicherheitskomponenten in Medizinprodukten, 
                Maschinen, Automobilen und Flugzeugen.
              </p>
            </div>
          </div>

        </div>

        {/* Section: Grandfathering & Legacy Rules (Art. 111) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-10">
          <div className="flex items-center gap-2 text-sm font-black text-slate-950 uppercase tracking-wider mb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Übergangsbestimmungen für Bestands-Systeme (Art. 111)</span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              Unternehmen, die bereits KI-Systeme im produktiven Einsatz haben, fragen häufig nach dem <strong>Bestandsschutz</strong>. 
              Hier gelten nach Art. 111 differenzierte Regelungen:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-900 block text-xs">Bestandssysteme nach Anhang III:</span>
                <p className="text-xs text-slate-600">
                  Systeme, die vor dem 02. August 2026 in Verkehr gebracht wurden, unterliegen den Hochrisiko-Pflichten 
                  grundsätzlich nur dann, wenn sie nach diesem Stichtag einer <strong>wesentlichen Veränderung (substantial modification)</strong> 
                  in ihrer Bauart oder Zweckbestimmung unterzogen werden.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-900 block text-xs">Bestandsmodelle GPAI:</span>
                <p className="text-xs text-slate-600">
                  Modelle mit allgemeinem Verwendungszweck, die vor dem 02. August 2025 in Verkehr gebracht wurden, 
                  haben eine Übergangsfrist bis zum <strong>02. August 2027</strong>, um die vollständige Dokumentation 
                  nachzuholen.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Banner */}
        <div className="p-8 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">
              Warten Sie nicht bis zum Stichtag 2026
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Der Aufbau von Risikomanagement und Daten-Governance erfordert in der Praxis 6 bis 12 Monate Vorlaufzeit.
            </p>
          </div>
          <button
            onClick={() => {
              navigate('/audit-check');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-sm px-6 py-3 rounded-xl transition-all cursor-pointer"
          >
            <span>Jetzt Audit-Readiness prüfen *</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
