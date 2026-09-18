import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8');
const { render } = await import('./dist-ssr/entry-server.js');

const routesToPrerender = [
  {
    url: '/',
    title: 'AI Act Audit – EU KI-Verordnung Konformitäts- & Regulatory Intelligence Portal',
    desc: 'Europäische Regulatory Intelligence & Audit-Readiness Plattform für den EU AI Act (Verordnung 2024/1689). Klassifizierung, Fristen-Fahrplan und Compliance-Check.'
  },
  {
    url: '/audit-check',
    title: 'AI Act Konformitäts-Check & Klassifizierungs-Wizard | aiactaudit.de',
    desc: 'Interaktiver 4-Schritte Audit-Check zur Einstufung Ihres KI-Systems nach EU AI Act (Verbotene Praktiken, Hochrisiko, Transparenz).'
  },
  {
    url: '/hochrisiko-matrix',
    title: 'Hochrisiko-Kriterien & Anhang III Matrix | aiactaudit.de',
    desc: 'Detaillierte Analyse aller 8 Hochrisiko-Bereiche nach Anhang III des EU AI Act inklusive Pflichten für Betreiber und Anbieter.'
  },
  {
    url: '/fristen-guide',
    title: 'Fristen-Fahrplan & Sanktions-Matrix 2025–2030 | aiactaudit.de',
    desc: 'Übersicht aller Stufen und Übergangsfristen der KI-Verordnung sowie Bußgeld-Matrix bis zu 35 Mio. € bzw. 7% des weltweiten Jahresumsatzes.'
  },
  {
    url: '/rechner-embed',
    title: 'AI Act Quick-Check Widget (Embed) | aiactaudit.de',
    desc: 'Kompaktes Widget zur schnellen Risikoklassifizierung nach EU-KI-Verordnung zum Einbinden auf Partner- und Fachportalen.'
  },
  {
    url: '/impressum',
    title: 'Impressum | aiactaudit.de',
    desc: 'Rechtliche Angaben und Kontaktdaten gemäß § 5 DDG für aiactaudit.de.'
  },
  {
    url: '/datenschutz',
    title: 'Datenschutzerklärung | aiactaudit.de',
    desc: 'Informationen zur Verarbeitung personenbezogener Daten auf aiactaudit.de gemäß DSGVO.'
  }
];

console.log(`Starting prerendering of ${routesToPrerender.length} routes for aiactaudit.de...`);

for (const route of routesToPrerender) {
  try {
    const { html: appHtml } = render(route.url);
    let rendered = template.replace(/<div id="root"[^>]*><\/div>/, `<div id="root">${appHtml}</div>`);
    rendered = rendered.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);
    rendered = rendered.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${route.desc}" />`);
    const fullUrl = `https://www.aiactaudit.de${route.url === '/' ? '' : route.url}`;
    rendered = rendered.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${fullUrl}" />`);
    rendered = rendered.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${fullUrl}" />`);
    rendered = rendered.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${route.title}" />`);
    rendered = rendered.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${route.title}" />`);
    rendered = rendered.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${route.desc}" />`);
    rendered = rendered.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${route.desc}" />`);

    const filePath = route.url === '/' ? 'dist/index.html' : `dist${route.url}/index.html`;
    const absolutePath = toAbsolute(filePath);
    fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
    fs.writeFileSync(absolutePath, rendered);
    console.log(`  ✓ ${route.url} -> ${filePath} (${(rendered.length / 1024).toFixed(1)} kB)`);
  } catch (err) {
    console.error(`  ✗ Error prerendering ${route.url}:`, err);
    process.exit(1);
  }
}

console.log('Prerendering complete!');
