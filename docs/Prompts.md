# Prompt History — markpdf.dev

<!-- Append new prompts at the bottom, newest last. Format:

## YYYY-MM-DD [optional title]
> <prompt text or short summary>

The dated H2 (`## YYYY-MM-DD`) is what `portfolio project check` parses
to surface "last AI prompt" per project. Keep entries append-only.
-->

## 2026-06-07 — scaffolded via portfolio new bootstrap

> Created project skeleton. Stack chosen, scaffolding written, git initialized.

## 2026-10-11 — tool page for the Save Page as Markdown or PDF extension
> "write the markpdf.dev and lamill.io landing page for save-page-pdf-md" (from a tabmill session;
> target "save webpage as pdf" at `/save-webpage-as-pdf/`, chosen by the operator over "markdown to pdf",
> which is this site's home query)
> → `src/pages/save-webpage-as-pdf.astro`; growth.md entry.

## 2026-10-14 — install button on /save-webpage-as-pdf/
> "add a button to use that chrome extension" (extension now live in the Chrome Web Store)
> → replaced the "coming soon" notice with UTM-tagged Add to Chrome buttons (notice + extension section) and kept the lamill.io hub link.

## 2026-10-14 — v1.C guide polish + shared guide kit
> "Improve the existing guide at /save-webpage-as-pdf/ … visuals, social cards, schema, brand consistency, freshness … reusable components" (brand: Markpdf; PRD slot v1.C)
> → guides.mjs registry, GuidePage/SiteHeader/ExtensionCta/MarkpdfCta/GuideFigure/RelatedGuide, /guides/ index, og:image support in Layout, sitemap lastmod. Asset slots pending operator files.

## 2026-10-30 — v1.D thin-page repair
> "use treg to find more SEO pages … low KD high to medium SV", "are all pages thick and useful based on our seo custom skill", "dont try to make me request indexing … make progress"
> → audit vs write-lamill-seo-page (4 thin pages); keyword shortlist via treg (SE Ranking) → PRD v1.D/v1.E; v1.D shipped locally: homepage retarget + convert-markdown-to-pdf content, SOW guide rewrite, hub prose/schema, de-templated template pages.

## 2026-10-30 — v1.E new low-KD pages
> "start v1.E"
> → SERP checks (treg); /guide/statement-of-work-vs-scope-of-work/, /guide/pandoc-markdown-to-pdf/ (commands verified on pandoc 3.11), /consulting-rate-calculator/ (interactive, SSR default), /templates/proposal-cover-letter/.

## 2026-10-30 — v1.F ten more pages
> "write another 10 pages using custom seo skills with thick useful pages, after finding 10 topics using low kd high sv topics from tregs"
> → 85-keyword SE Ranking batch via treg; 10 topics picked (KD ≤36, stable volume, ICP fit, no contract-language templates); written in 3 parallel forks, integrated + audited centrally.

## 2026-10-30 — v1.D–v1.F shipped
> "commit this" / "push it"
> → `ee31628` (v1.D) and `f7306ff` (v1.E + v1.F) pushed; CF Pages live in ~40s; 14 new URLs return 200, sitemap 9 → 23 URLs, both sitemaps force-resubmitted to GSC. Next: growth reviews 2026-11-11 (v1.C), 2026-11-27 (v1.D + earlier entries), 28d after first indexing for v1.E/v1.F pages.
