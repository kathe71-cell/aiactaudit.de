import React from 'react';
import { AUDIT_TOOLS } from '../data/auditData';
import { Wrench, ExternalLink } from 'lucide-react';

export const AuditToolsSection: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-white mb-3">
            <Wrench className="w-3.5 h-3.5 text-emerald-400" />
            <span>Audit-Frameworks &amp; Toolkits</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Anerkannte Prüf-Standards &amp; Audit-Tools
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Die technische Umsetzung der Vorgaben erfordert verlässliche Frameworks für Bias-Audits, 
            Qualitätsmanagementsysteme und Cybersicherheitstests.
          </p>
        </div>

        {/* Grid of Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AUDIT_TOOLS.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all hover:border-emerald-300"
            >
              <div>
                {/* Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-950 px-2 py-0.5 rounded border border-emerald-200">
                    {tool.badge}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500">
                    {tool.type}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900">
                  {tool.name}
                </h3>
                <div className="text-xs font-semibold text-emerald-700 mt-0.5">
                  {tool.category}
                </div>

                <p className="mt-3 text-xs text-slate-600 leading-relaxed font-normal">
                  {tool.description}
                </p>

                <div className="mt-4 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-700">
                  <span className="font-bold block text-slate-900 mb-0.5">Audit-Einsatzbereich:</span>
                  <span>{tool.useCase}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500">{tool.pricing}</span>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-emerald-700 cursor-pointer"
                >
                  <span>Website *</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-slate-500">
          * Partnerlink / Empfehlungslink. Wir listen ausschließlich nachprüfbare, anerkannte Industrie-Standards und neutrale Open-Source-Initiativen.
        </div>

      </div>
    </section>
  );
};
