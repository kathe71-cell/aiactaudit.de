import { AUDIT_USE_CASES, CORE_REQUIREMENTS, TIMELINE_MILESTONES, AUDIT_TOOLS, FAQ_ITEMS } from '../data/auditData';
import { EU_AUTHORITIES_DATA } from '../data/euAuthoritiesData';
import { REGULATORY_EVENTS, WATCHTOWER_METRICS } from '../data/regulatoryFeedData';

export type SearchCategory = 'ARTICLE' | 'AUTHORITY' | 'USE_CASE' | 'TIMELINE' | 'EVENT' | 'TOOL' | 'FAQ';

export interface SearchResultItem {
  id: string;
  category: SearchCategory;
  categoryLabel: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  snippet: string;
  targetPath: string;
  targetAnchor?: string;
  keywords: string[];
}

export const buildSearchIndex = (): SearchResultItem[] => {
  const index: SearchResultItem[] = [];

  // 1. Gesetzesartikel & Pflichtenkataloge (Art. 9-15 etc.)
  CORE_REQUIREMENTS.forEach((art) => {
    index.push({
      id: `art-${art.article.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`,
      category: 'ARTICLE',
      categoryLabel: 'Gesetzesartikel & Pflichten',
      badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-300',
      title: `${art.article}: ${art.title}`,
      subtitle: art.subtitle,
      snippet: `${art.coreRequirements.slice(0, 2).join(' • ')}`,
      targetPath: '/hochrisiko-matrix',
      keywords: [
        'artikel', art.article, art.title, art.subtitle,
        ...art.coreRequirements,
        ...art.documentationRequired,
        ...art.auditChecklist,
        'risikomanagement', 'dokumentation', 'governance', 'ce-kennzeichnung', 'hochrisiko'
      ]
    });
  });

  // 2. Europäische Aufsichtsbehörden & Reallabore (31 Gebiete)
  EU_AUTHORITIES_DATA.forEach((auth) => {
    index.push({
      id: `auth-${auth.id}`,
      category: 'AUTHORITY',
      categoryLabel: 'Aufsichtsbehörde & Reallabor',
      badgeColor: 'bg-blue-100 text-blue-950 border-blue-300',
      title: `${auth.flag} ${auth.country}: ${auth.authorityAcronym}`,
      subtitle: `${auth.authorityName} (${auth.headquarters})`,
      snippet: `${auth.roleType} · ${auth.focusArea}`,
      targetPath: '/#eu-radar',
      targetAnchor: 'eu-radar',
      keywords: [
        auth.country, auth.isoCode, auth.authorityAcronym, auth.authorityName,
        auth.headquarters, auth.focusArea, auth.nationalSpecifics,
        ...auth.keyFacts,
        'aufsicht', 'behörde', 'marktüberwachung', 'reallabor', 'sandbox'
      ]
    });
  });

  // 3. Anwendungsfälle & Risikoklassen (HR, Scoring, etc.)
  AUDIT_USE_CASES.forEach((uc) => {
    index.push({
      id: `usecase-${uc.id}`,
      category: 'USE_CASE',
      categoryLabel: 'Anwendungsfall & Risikostufe',
      badgeColor: uc.riskLevel === 'prohibited' 
        ? 'bg-rose-100 text-rose-950 border-rose-300' 
        : 'bg-amber-100 text-amber-950 border-amber-300',
      title: uc.title,
      subtitle: `${uc.category} · ${uc.riskLabel}`,
      snippet: uc.description,
      targetPath: '/#horizon-feed',
      targetAnchor: 'horizon-feed',
      keywords: [
        uc.title, uc.category, uc.riskLabel, uc.articleRef, uc.description,
        ...uc.providerObligations,
        ...uc.deployerObligations,
        uc.auditFocus,
        'anwendungsfall', 'risikoklasse', 'praxis', 'verbot', 'hochrisiko'
      ]
    });
  });

  // 4. Fristen & Meilensteine (Timeline)
  TIMELINE_MILESTONES.forEach((m) => {
    index.push({
      id: `milestone-${m.dateRaw}`,
      category: 'TIMELINE',
      categoryLabel: 'Frist & Meilenstein',
      badgeColor: 'bg-purple-100 text-purple-950 border-purple-300',
      title: `${m.date}: ${m.title}`,
      subtitle: m.targetGroup,
      snippet: m.description,
      targetPath: '/fristen-guide',
      keywords: [
        m.date, m.dateRaw, m.title, m.targetGroup, m.description,
        ...m.keyPoints,
        'frist', 'inkrafttreten', 'übergangsfrist', 'stichtag', 'strafen'
      ]
    });
  });

  // 5. Regulatory Watchtowers & Events
  REGULATORY_EVENTS.forEach((evt) => {
    index.push({
      id: `event-${evt.id}`,
      category: 'EVENT',
      categoryLabel: 'Regulatory Intelligence',
      badgeColor: 'bg-slate-200 text-slate-900 border-slate-300',
      title: `[${evt.sourceCode}] ${evt.title}`,
      subtitle: `${evt.categoryLabel} · ${evt.date} (${evt.statusLabel})`,
      snippet: evt.summary,
      targetPath: '/#horizon-feed',
      targetAnchor: 'horizon-feed',
      keywords: [
        evt.sourceCode, evt.categoryLabel, evt.title, evt.date, evt.summary,
        evt.bindingStatus, evt.affectedIndustries, evt.officialRef,
        'dora', 'nis2', 'bafin', 'bsi', 'edsa', 'ai office', 'watchtower'
      ]
    });
  });

  WATCHTOWER_METRICS.forEach((wt) => {
    index.push({
      id: `wt-${wt.id}`,
      category: 'EVENT',
      categoryLabel: 'Regulatory Watchtower',
      badgeColor: 'bg-indigo-100 text-indigo-950 border-indigo-300',
      title: `${wt.title} (${wt.tag})`,
      subtitle: `${wt.statusBadge} · ${wt.eventsCount} Events erfasst`,
      snippet: wt.description,
      targetPath: '/#watchtowers',
      targetAnchor: 'watchtowers',
      keywords: [
        wt.title, wt.tag, wt.description, wt.keyLegislation,
        'watchtower', 'überwachung', 'radar'
      ]
    });
  });

  // 6. Audit & Bias Tools
  AUDIT_TOOLS.forEach((tool) => {
    index.push({
      id: `tool-${tool.id}`,
      category: 'TOOL',
      categoryLabel: 'Prüf- & Open-Source-Tool',
      badgeColor: 'bg-cyan-100 text-cyan-950 border-cyan-300',
      title: tool.name,
      subtitle: `${tool.type} · ${tool.category}`,
      snippet: tool.description,
      targetPath: '/hochrisiko-matrix',
      keywords: [
        tool.name, tool.category, tool.type, tool.description, tool.useCase,
        'tool', 'software', 'open source', 'bias testing', 'audit'
      ]
    });
  });

  // 7. FAQs
  FAQ_ITEMS.forEach((faq, idx) => {
    index.push({
      id: `faq-${idx}`,
      category: 'FAQ',
      categoryLabel: 'Häufige Fachfrage (FAQ)',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
      title: faq.question,
      subtitle: `Thema: ${faq.category}`,
      snippet: faq.answer,
      targetPath: '/#faq',
      targetAnchor: 'faq',
      keywords: [
        faq.question, faq.answer, faq.category,
        'faq', 'frage', 'antwort', 'wissen'
      ]
    });
  });

  return index;
};

export const searchIndex = (query: string, items: SearchResultItem[], maxResults: number = 10): SearchResultItem[] => {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return [];

  const queryTokens = cleanQuery.split(/\s+/).filter(t => t.length > 0);

  const scored = items.map((item) => {
    let score = 0;
    const titleLower = item.title.toLowerCase();
    const subtitleLower = item.subtitle.toLowerCase();
    const snippetLower = item.snippet.toLowerCase();
    const keywordsJoined = item.keywords.join(' ').toLowerCase();

    // Exact full query match
    if (titleLower.includes(cleanQuery)) score += 100;
    if (subtitleLower.includes(cleanQuery)) score += 50;
    if (snippetLower.includes(cleanQuery)) score += 25;
    if (keywordsJoined.includes(cleanQuery)) score += 15;

    // Token match scoring
    for (const token of queryTokens) {
      if (token.length < 2) continue;
      if (titleLower.includes(token)) score += 35;
      if (subtitleLower.includes(token)) score += 18;
      if (snippetLower.includes(token)) score += 10;
      if (keywordsJoined.includes(token)) score += 6;
    }

    return { item, score };
  });

  return scored
    .filter(res => res.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(res => res.item);
};
