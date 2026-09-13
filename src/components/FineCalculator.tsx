import React, { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';

interface FineCalculatorProps {
  navigate: (path: string) => void;
}

export const FineCalculator: React.FC<FineCalculatorProps> = ({ navigate }) => {
  const [revenue, setRevenue] = useState<number>(25); // in Million Euro
  const [isSme, setIsSme] = useState<boolean>(false); // KMU Privileg
  const [violationType, setViolationType] = useState<'prohibited' | 'high' | 'misleading'>('high');

  // Calculation logic based on Art. 99
  const calculateFine = () => {
    let fixedLimit = 15; // Million Euro
    let percentage = 0.03; // 3%

    if (violationType === 'prohibited') {
      fixedLimit = 35;
      percentage = 0.07;
    } else if (violationType === 'misleading') {
      fixedLimit = 7.5;
      percentage = 0.015;
    }

    const percentAmount = revenue * percentage;

    // Art. 99: For non-SMEs, whichever is higher applies. For SMEs (Art. 99 Abs. 6), whichever is LOWER applies!
    let maxFine = 0;
    if (isSme) {
      maxFine = Math.min(fixedLimit, percentAmount);
    } else {
      maxFine = Math.max(fixedLimit, percentAmount);
    }

    return {
      fixedLimit,
      percentage: (percentage * 100).toFixed(1),
      percentAmount: percentAmount.toFixed(2),
      maxFine: maxFine.toFixed(2),
      ruleApplied: isSme ? 'KMU-Deckel (niedrigerer Betrag greift)' : 'Standard-Regel (höherer Betrag greift)'
    };
  };

  const result = calculateFine();

  return (
    <section id="bussgeld" className="py-16 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Col: Explainer & Inputs */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 mb-3">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Bußgeld- &amp; Haftungs-Modellrechnung (Art. 99)</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Gesetzliche Bußgeld-Höchstgrenzen simulieren
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Der EU AI Act sieht bei Verstößen drakonische Geldbußen vor. Berechnen Sie das 
                  theoretische Maximalrisiko anhand des weltweiten Jahresumsatzes Ihres Unternehmens.
                </p>
              </div>

              {/* Controls */}
              <div className="space-y-4 pt-2">
                
                {/* Revenue Slider */}
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <label htmlFor="fine-revenue-slider" className="text-slate-300">Weltweiter Jahresumsatz des Konzerns:</label>
                    <span className="text-emerald-400 font-mono font-bold text-sm">{revenue} Mio. €</span>
                  </div>
                  <input
                    id="fine-revenue-slider"
                    type="range"
                    min="1"
                    max="500"
                    step="1"
                    value={revenue}
                    onChange={(e) => setRevenue(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>1 Mio. €</span>
                    <span>100 Mio. €</span>
                    <span>250 Mio. €</span>
                    <span>500 Mio. €</span>
                  </div>
                </div>

                {/* Violation Type Tabs */}
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-slate-300">Schweregrad des Verstoßes:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      onClick={() => setViolationType('prohibited')}
                      className={`p-2.5 rounded-xl text-left border text-xs font-bold transition-all cursor-pointer ${
                        violationType === 'prohibited'
                          ? 'bg-red-950/80 text-red-200 border-red-600'
                          : 'bg-slate-800/60 text-slate-300 border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      <div className="font-extrabold text-white">Art. 5: Verboten</div>
                      <div className="text-[10px] font-normal opacity-80">Max. 35 Mio. € / 7 %</div>
                    </button>

                    <button
                      onClick={() => setViolationType('high')}
                      className={`p-2.5 rounded-xl text-left border text-xs font-bold transition-all cursor-pointer ${
                        violationType === 'high'
                          ? 'bg-amber-950/80 text-amber-200 border-amber-600'
                          : 'bg-slate-800/60 text-slate-300 border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      <div className="font-extrabold text-white">Hochrisiko-Pflichten</div>
                      <div className="text-[10px] font-normal opacity-80">Max. 15 Mio. € / 3 %</div>
                    </button>

                    <button
                      onClick={() => setViolationType('misleading')}
                      className={`p-2.5 rounded-xl text-left border text-xs font-bold transition-all cursor-pointer ${
                        violationType === 'misleading'
                          ? 'bg-blue-950/80 text-blue-200 border-blue-600'
                          : 'bg-slate-800/60 text-slate-300 border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      <div className="font-extrabold text-white">Falschangaben</div>
                      <div className="text-[10px] font-normal opacity-80">Max. 7,5 Mio. € / 1,5 %</div>
                    </button>
                  </div>
                </div>

                {/* SME Toggle */}
                <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-xl border border-slate-700">
                  <input
                    type="checkbox"
                    id="sme-check"
                    checked={isSme}
                    onChange={(e) => setIsSme(e.target.checked)}
                    className="w-4 h-4 rounded accent-emerald-500 cursor-pointer"
                  />
                  <label htmlFor="sme-check" className="text-xs text-slate-300 cursor-pointer">
                    <strong className="text-white">KMU- oder Start-up-Privileg aktivieren</strong> (gemäß Art. 99 Abs. 6 greift bei KMUs der jeweils <em>niedrigere</em> Betrag).
                  </label>
                </div>

              </div>

            </div>

            {/* Right Col: Output Box */}
            <div className="lg:col-span-5">
              <div className="bg-slate-950 p-6 sm:p-7 rounded-2xl border border-slate-700 shadow-2xl relative">
                
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Gesetzliche Höchstgrenze (Modellrechnung *)
                </div>

                <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono tracking-tight">
                  bis zu {result.maxFine} Mio. €
                </div>

                <div className="mt-3 text-xs text-slate-300 bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span>Fester Sockelbetrag:</span>
                    <span className="font-bold text-white">{result.fixedLimit} Mio. €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prozentualer Umsatzanteil ({result.percentage} %):</span>
                    <span className="font-bold text-white">{result.percentAmount} Mio. €</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-800 text-[11px] text-emerald-400">
                    <span>Angewandte Regel:</span>
                    <span>{result.ruleApplied}</span>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <button
                    onClick={() => {
                      navigate('/audit-check');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-sm py-3 px-4 rounded-xl transition-all cursor-pointer"
                  >
                    <span>Audit-Check starten &amp; Haftung minimieren *</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-4 text-[10px] text-slate-400 leading-relaxed">
                  * <strong>Modellrechnung.</strong> Die tatsächliche Höhe hängt vom individuellen Nutzungsverhalten, 
                  der Schwere des Verschuldens, kooperativem Verhalten gegenüber Behörden und der behördlichen Einzelfallprüfung ab.
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
