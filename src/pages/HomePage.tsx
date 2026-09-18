import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { HorizonFeed } from '../components/HorizonFeed';
import { WatchtowersSection } from '../components/WatchtowersSection';
import { EuEnforcementRadar } from '../components/EuEnforcementRadar';
import { PolicyScreener } from '../components/PolicyScreener';
import { AuditFinder } from '../components/AuditFinder';
import { RequirementsMatrix } from '../components/RequirementsMatrix';
import { TimelineSection } from '../components/TimelineSection';
import { FineCalculator } from '../components/FineCalculator';
import { AuditToolsSection } from '../components/AuditToolsSection';
import { FaqSection } from '../components/FaqSection';
import { Code2, Copy, Check, ShieldCheck, Scale, FileCheck2 } from 'lucide-react';

interface HomePageProps {
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const [copiedEmbed, setCopiedEmbed] = useState<boolean>(false);

  const scrollToFinder = () => {
    const el = document.getElementById('audit-finder');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyEmbedCode = () => {
    const code = `<iframe src="https://www.aiactaudit.de/rechner-embed" width="100%" height="720" style="border:none; border-radius:16px; box-shadow:0 4px 16px rgba(0,0,0,0.08);" title="EU AI Act Audit Rechner"></iframe>\n<p style="font-size:12px; color:#64748b; text-align:center;">Audit-Rechner bereitgestellt von <a href="https://www.aiactaudit.de" target="_blank" rel="noopener" style="color:#059669; text-decoration:underline;">aiactaudit.de</a></p>`;
    navigator.clipboard.writeText(code);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2500);
  };

  return (
    <main>
      {/* 1. Hero with split B2B value proposition & interactive Live Scanning preview */}
      <Hero navigate={navigate} onScrollToFinder={scrollToFinder} />

      {/* 2. Myriad-style Horizon Scanning Feed with multi-jurisdiction filters & expandable action callouts */}
      <HorizonFeed navigate={navigate} />

      {/* 3. Regulatory Watchtowers & Progress Radar (AI Act, DORA, NIS-2, GDPR-AI) */}
      <WatchtowersSection navigate={navigate} />

      {/* 3b. Interactive EU Enforcement Radar (National Authorities & Sandboxes Art. 70 / Art. 57) */}
      <EuEnforcementRadar navigate={navigate} />

      {/* 4. Policy & Clause Screener (Interactive Non-Compliance vs. Compliant formulation comparison) */}
      <PolicyScreener navigate={navigate} />

      {/* 5. Proven Interactive Self-Assessment Tools */}
      <AuditFinder navigate={navigate} />
      <RequirementsMatrix navigate={navigate} />
      <TimelineSection navigate={navigate} />
      <FineCalculator navigate={navigate} />

      {/* 6. Embed Code Widget Box for B2B & Tech Media */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-2">
                  <Code2 className="w-3.5 h-3.5" />
                  Kostenloses B2B-Widget für Fachportale &amp; Kanzleien
                </div>
                <h3 className="text-xl font-black text-white">AI Act Audit-Tool auf Ihrer Website einbetten</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Integrieren Sie den interaktiven Bußgeld-Rechner und Risikoklassen-Finder per iFrame – responsive, werbefrei &amp; DSGVO-konform.
                </p>
              </div>
              <button
                onClick={copyEmbedCode}
                className="self-start md:self-center px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors shadow-sm cursor-pointer shrink-0"
              >
                {copiedEmbed ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
                <span>{copiedEmbed ? 'Code kopiert!' : 'Embed-Code kopieren'}</span>
              </button>
            </div>
            <div className="bg-slate-900 rounded-lg p-3 text-xs font-mono text-slate-300 overflow-x-auto border border-slate-800">
              <code>{`<iframe src="https://www.aiactaudit.de/rechner-embed" width="100%" height="720" style="border:none; border-radius:16px;" title="EU AI Act Audit Rechner"></iframe>\n<p style="font-size:12px; color:#64748b; text-align:center;">Bereitgestellt von <a href="https://www.aiactaudit.de" target="_blank" rel="noopener">aiactaudit.de</a></p>`}</code>
            </div>
          </div>
        </div>
      </section>

      <AuditToolsSection />
      <FaqSection />

      {/* 7. E-E-A-T Editorial Trust Box */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-4 border-b border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-lg shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Fachredaktion aiactaudit.de</h4>
                <p className="text-xs text-slate-500">Stand: September 2026 • Rechtsquelle: Verordnung (EU) 2024/1689 des Europäischen Parlaments und des Rates</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                  <Scale className="w-4 h-4 text-emerald-700" />
                  <span>Strikter Verordnungsabgleich</span>
                </div>
                <p>Systematische Übertragung der Artikel 5 bis 15 sowie Art. 99 (Sanktionsrahmen) in operative Prüfschritte.</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                  <FileCheck2 className="w-4 h-4 text-emerald-700" />
                  <span>Unabhängige Selbsteinstufung</span>
                </div>
                <p>Reines Fach- und Prüfungsvorbereitungsportal nach § 5 DDG. Keine Rechtsberatung im Sinne des RDG.</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>KMU &amp; Startup Schutz</span>
                </div>
                <p>Berücksichtigung des KMU-Haftungsdeckels nach Art. 99 Abs. 6 für kleine und mittlere Unternehmen.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
