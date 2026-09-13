# aiactaudit.de – EU AI Act Konformitäts- & Audit-Portal

> **Schlüsselfertiges, rechtssicheres und verkaufsfertiges Domain-Projekt für `aiactaudit.de`**  
> Entwickelt gemäß den Master-Prompt-Richtlinien für den Vercel-Export.

---

## 1. Domain-Steckbrief & Projekt-Übergabe

| Parameter | Spezifikation |
| :--- | :--- |
| **Domain** | `aiactaudit.de` |
| **Nische / Branche** | B2B LegalTech & KI-Compliance / Verordnung (EU) 2024/1689 (EU AI Act) |
| **Zielgruppe** | KI-Entwickler (Provider), B2B-Anwender (Deployer), Compliance Officer, Geschäftsführer, IT-Leiter |
| **Projekt-Modus** | **Multi-Provider Nischen-Fachportal & Audit-Plattform** |
| **Seitenumfang** | Startseite (`/`), Audit-Check (`/audit-check`), Hochrisiko-Matrix (`/hochrisiko-matrix`), Fristen-Guide (`/fristen-guide`), Impressum (`/impressum`), Datenschutz (`/datenschutz`) |
| **Visual Identity** | Helles Farbkonzept: Warm Alabaster (`#f8fafc`), Deep Slate (`#0f172a`), Tech Emerald (`#059669` / `#10b981`), Amber (`#d97706`) |
| **Typografie & Privacy**| 100 % DSGVO Zero-CDN (System Font Stack, keine Google Fonts, keine Tracking-Cookies) |
| **Barrierefreiheit** | WCAG AAA konforme Kontraste auf allen Buttons, Badges und interaktiven Controls |

---

## 2. Enthaltene Features & Interaktive Komponenten

1. **Interaktiver Audit-Readiness Check (`/audit-check`)**:
   - 7-stufiger strukturierter Fragebogen zur Bestimmung der Risikoklasse (Art. 5, Art. 6, Art. 50, Minimal).
   - Dynamischer Readiness-Score (0–100 %) mit Buchstabeneinstufung.
   - Konkrete GAP-Analyse mit priorisierten Handlungsempfehlungen.
   - Druck- und PDF-Export-Funktion für interne Compliance-Berichte.
2. **Klassifizierungs- & Audit-Finder (Multi-Provider / Category Filter)**:
   - Live-Suche über alle Anwendungsfälle.
   - Filterung nach Branche (HR, Finanzwesen, Kundenservice, KRITIS, GPAI).
   - Rollenwechsler zwischen *Anbieter (Provider)* und *Betreiber (Deployer)*.
3. **Die 7 Kernanforderungen für Hochrisiko-Systeme (Art. 9–15)**:
   - Detaillierter Kriterienkatalog, erforderliche Dokumentationsakten und konkrete Audit-Prüffragen.
4. **Fristen- & Stufen-Timeline (2024–2027)**:
   - Chronologischer Zeitplan mit Countdown-Status zu allen Stichtagen (Feb 2025, Aug 2025, Aug 2026, Aug 2027).
   - Leitfaden zu Bestandsschutz und Übergangsvorschriften (Art. 111).
5. **Bußgeld- & Haftungskalkulator (Art. 99)**:
   - Interaktive Modellrechnung mit Berücksichtigung des KMU-/Start-up-Deckels.
6. **Anerkannte Audit-Frameworks & Toolkits**:
   - Neutrale Übersicht etablierter Standards (Fairlearn, ISO/IEC 42001, AVID, C2PA) mit transparenter Partnerlink-Kennzeichnung (`* Partnerlink`).
7. **Fach-FAQ**:
   - 8 fundierte Rechts- und Praxisfragen mit Verweisen auf die konkreten Artikel des EU AI Act.
8. **Mobile Sticky Conversion Bar**:
   - Erscheint auf Mobilgeräten ab 350px Scrolltiefe mit High-Contrast CTA.

---

## 3. Rechtliche Konformität & Abmahnsicherheit (DE/EU)

- **Impressum gemäß § 5 DDG & § 18 MStV**:
  - Vollständige Angaben für Jens Kathe, Hansastraße 6, 34119 Kassel.
  - Hinweis auf Kleinunternehmerregelung (§ 19 UStG).
  - EU-Online-Streitbeilegung (OS-Plattform) und VSBG-Erklärung.
- **UWG-Schutz**:
  - Striktes Verbot unbefugter Superlative und fiktiver Testsiegel eingehalten.
  - Alle Produkt- und Fristenangaben basieren rein auf dem Amtsblatt der Europäischen Union (Verordnung (EU) 2024/1689).
- **Affiliate- & Werbekennzeichnung**:
  - Alle Call-to-Action Buttons mit Sternchen (*) und Hinweis `* Partnerlink / Werbelink`.
  - Unabhängigkeitserklärung im Header und Footer verankert.
- **Rechner-Transparenz**:
  - Kennzeichnung als unverbindliche Modellrechnung / Orientierungshilfe mit rechtlichem Hinweis.

---

## 4. Lokale Entwicklung & Build

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Produktions-Build erstellen
npm run build

# Code-Qualitätsprüfung durchführen
npm run lint
```

---

## 5. Vercel Deployment-Anleitung

Das Projekt ist durch `vercel.json` mit SPA-Rewrites vollständig für das Vercel-Hosting vorbereitet.

```bash
# 1. Vercel CLI installieren (falls noch nicht vorhanden)
npm i -g vercel

# 2. Vorschau-Deployment durchführen
vercel deploy --temporary

# 3. Produktions-Deployment (unter verknüpfter Domain)
vercel --prod
```
