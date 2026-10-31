# Growth Log — markpdf.dev

> **What this file is for:** an honest, append-only log of growth experiments
> on this site — what was tried, what was measured, what happened. The data
> source is GSC; this file narrates *why*. Future-you (or future-Claude)
> reads this when deciding what to try next, both on this site and on
> related sister sites.

## How to use this (workflow — re-read this when you forget)

**Add an entry whenever you do something growth-relevant.** That includes:
shipping new content, structural SEO changes (sitemap, schema, redirects,
internal linking), tech changes that affect crawl/indexing, marketing
pushes, backlink campaigns. *Not* every code commit — just things you'd
want to point at when GSC numbers move (or fail to).

**Each entry is a hypothesis you can be wrong about.** Commit to a
measurable KPI and an observation window before acting — otherwise "did
this work?" is just a feeling.

### Lifecycle of one entry

1. **Day of action** — append a new dated H2 with `Status: active`, the
   hypothesis, the KPI you'll watch, current baseline numbers, what you
   did, and the date to review (default: today + 28 days, matching GSC's
   reporting window).
2. **Review day** — pull current GSC numbers, compute delta vs baseline.
   Fill in **Result** and **Learning**. Set **Status** to `shipped` (worked,
   keep going), `failed` (didn't pay off, abandon), or extend the review
   another window if results are ambiguous.
3. **Never rewrite older entries.** Wrong hypotheses are the most valuable
   data — they tell you what NOT to repeat on the next site. Append, don't
   edit.

### Where to get the numbers

```bash
lamill project seo markpdf.dev --refresh --all --yes
```

28d totals + per-URL coverage (URL Inspection API); raw JSON cached at
`sites/portfolio/data/gsc/markpdf.dev/<date>.json`. (`portfolio gsc sync`
no longer exists.) Or pull from
https://search.google.com/search-console directly.

### Format

```
## YYYY-MM-DD — <one-line hypothesis or action>
- **Status:** active | testing | shipped | failed | abandoned
- **Hypothesis:** <what you're betting will work — only on initial / new-bet entries>
- **KPI:** <what GSC metric / query / page>
- **Baseline:** <numbers at start>
- **Action:** <what was done; 1-2 lines>
- **Result:** <numbers after window; "TBD — review YYYY-MM-DD" until then>
- **Learning:** <why it worked / didn't; what to try next; "TBD" until reviewed>
```

---

## 2026-06-07 — Developers will try markpdf.dev if it gives them a high-quality…
- **Status:** active — extended; untestable until content is indexed
- **Hypothesis:** Developers will try markpdf.dev if it gives them a high-quality markdown proposal template and instantly shows a better PDF than they can make themselves. Distribution should start with free templates, Obsidian/markdown communities, freelancer forums, and “proposal/SOW template for developers” SEO. Retention comes from saved brand kits, reusable templates, and the habit of using markpdf.dev for every client-facing document.
- **KPI:** any GSC traffic — clicks, impressions, indexed-page count
- **Baseline:** 0 clicks / 0 impressions (just deployed)
- **Action:** project scaffolded via `portfolio new bootstrap`; first deploy pending. After deploy: verify in GSC as `sc-domain:markpdf.dev` and submit the sitemap.
- **Result:** Reviewed 2026-10-02 (late). 28d: 2 impressions / 0 clicks / avg pos 1.5; 1 of 7 sitemap URLs indexed (`/` only). No organic signal yet on the template-SEO distribution bet. Re-review 2026-10-30. **Reviewed 2026-10-30:** 28d 0 impressions / 0 clicks (down from 2 impressions); still 1 of 9 sitemap URLs indexed (`/`, last crawled 2026-10-21). Content URLs moved from `url_is_unknown_to_google` to `discovered_not_indexed` (see 2026-10-02 entry), but none crawled yet. Re-review 2026-11-27.
- **Learning:** The hypothesis hasn't been tested: Google has not discovered the content that's meant to carry it (see 2026-07-24 entry). The bottleneck is discovery/crawl priority, not the offer. 2026-10-30: still untested. Google has now discovered the content but hasn't crawled it, so the bottleneck is crawl priority, not discovery.

## 2026-07-23 — submitted child sitemap directly to nudge GSC crawl
- **Status:** failed
- **KPI:** GSC "Discovered pages" on the `sitemap-0.xml` row (and, downstream, indexed-page count)
- **Baseline:** GSC Sitemaps report — `sitemap-index.xml` submitted Jun 18, last read Jun 21, status Success, **0 discovered pages**. Sitemap chain verified healthy: index → `sitemap-0.xml` → 8 valid URLs, all HTTP 200, only robots meta is `index, follow` (no `noindex`). So the 0 is GSC reporting lag on a fresh domain, not a broken sitemap.
- **Action:** submitted the child sitemap directly via `lamill settings gsc submit-sitemap --site markpdf.dev --url https://markpdf.dev/sitemap-0.xml` (Webmasters API PUT). The child row's discovered count tends to populate faster than the index row. No site change — GSC-side diagnostic nudge only.
- **Result:** Reviewed 2026-10-02 (late). Google fetched `sitemap-0.xml` on 2026-07-25 (status OK, 0 errors, 0 warnings) after the v1.B force-resubmit, but URL Inspection still returns `url_is_unknown_to_google` for 6 of 7 listed URLs 10 weeks later. Only `/` is indexed (last crawled 2026-09-06). The index sitemap row hasn't been re-fetched since 2026-06-21.
- **Learning:** Resubmitting the sitemap gets it downloaded but does not get its URLs crawled on a fresh, low-authority domain. Don't repeat this as an indexing lever. Caveat noted at submit time: 5 of the 8 sitemap URLs are auth-gated app routes (`/auth/`, `/dashboard/`, `/brand-kit/`, `/documents/*`) with no indexable content — this nudge cannot produce SEO traffic on its own; that still depends on shipping real v1 content.

## 2026-07-24 — shipped template/guide content surface (2 → 7 indexable pages)
- **Status:** active — extended; content not yet crawled
- **Hypothesis:** A library of genuinely useful, paste-ready templates + a how-to guide will attract "[doc] template" intent (consulting proposal, web design proposal, freelance proposal, scope of work, how-to-write-a-SOW) — the exact searches this ICP makes — and convert via the free-markdown → branded-PDF funnel. Depth (real templates, section-by-section guidance, filled examples, FAQ) is the bet, not page count.
- **KPI:** GSC impressions + indexed-page count on `/templates/*` and `/guide/*`; first ranking positions for "consulting proposal template", "web design proposal template", "freelance proposal template", "how to write a scope of work".
- **Baseline:** 0 impressions / 0 clicks; only 1 URL indexed (`/`) as of the 2026-07-24 GSC probe. Site had effectively 2 indexable pages (home, pricing).
- **Action:** shipped (v1.A/v1.B) 5 template pages + 1 guide behind a shared `TemplatePage` component — `/templates/consulting-proposal/`, `/web-design-proposal/`, `/freelance-proposal/`, `/guide/how-to-write-a-scope-of-work/` indexed; `/templates/scope-of-work/` + `/statement-of-work/` built but `noindex` + sitemap-excluded pending legal review of contractual language. Each: real SSR HTML, single `<h1>`, WebPage+BreadcrumbList+HowTo+FAQPage JSON-LD, canonical==og:url, copy/download template block. Also fixed technical SEO: trailing-slash canonicals, real 404s (dist/404.html on CF Pages), and `noindex`+sitemap-exclusion of 6 empty app routes. Sitemap now 7 indexable URLs; force-resubmitted to GSC.
- **Result:** Reviewed 2026-10-02 (late). 28d: 2 impressions / 0 clicks / avg pos 1.5. Indexed 1/7: all 5 new content URLs (`/templates/`, consulting/freelance/web-design proposal, SOW guide) plus `/pricing/` are `url_is_unknown_to_google`. That's despite (a) being in the sitemap Google downloaded 2026-07-25 and (b) being linked from the homepage Google crawled 2026-09-06. Live checks pass: HTTP 200, `robots.txt` allows all, no noindex. Minor: homepage links `/pricing` (no trailing slash → 308) while the sitemap/canonical uses `/pricing/`. Re-review 2026-10-30. **Reviewed 2026-10-30:** 28d 0 impressions / 0 clicks. Indexed 1/9. Consulting/freelance/web-design proposal templates and the SOW guide are now `discovered_not_indexed` (never crawled); `/templates/` is still `url_is_unknown_to_google`. Re-review 2026-11-27.
- **Learning:** The on-page bet can't be judged yet; the pages haven't been crawled. The site is technically clean, so this looks like low crawl priority (no external links/authority), not something blocking crawlers. Next levers to consider: manual "Request Indexing" in GSC for the 5 content URLs, and getting the first external links to a template page. Watch whether the low-KD proposal/SOW template keywords convert impressions → clicks on a fresh domain, and which template earns first. Two SOW pages remain out of the index until their default contractual wording is reviewed. 2026-10-30: the on-page bet still can't be judged because no template page has been crawled. Request Indexing and a first external link are still the untried levers.

## 2026-10-02 — trailing-slash internal links + sitemap force-resubmit
- **Status:** active — extended; partial movement (discovered, not crawled)
- **KPI:** URL Inspection coverage for the 6 `url_is_unknown_to_google` URLs (`/pricing/`, `/templates/`, 3 proposal templates, SOW guide); indexed-page count.
- **Baseline:** 1/7 sitemap URLs indexed; 28d 2 impressions / 0 clicks / avg pos 1.5.
- **Action:** internal links to `/pricing` and `/templates` now point to the canonical trailing-slash URLs (no more 308 hop from homepage/nav). Force-resubmitted `sitemap-index.xml` and `sitemap-0.xml` via `lamill settings gsc submit-sitemap --force`. Manual "Request Indexing" isn't available through the API; it has to be clicked in GSC for each URL.
- **Result:** Reviewed 2026-10-30. 5 of the 6 target URLs moved `url_is_unknown_to_google` → `discovered_not_indexed` (`/pricing/`, 3 proposal templates, SOW guide); `/templates/` is still unknown. None has a crawl date yet. Indexed count unchanged: 1 (`/`, crawled 2026-10-21). Google read both sitemaps on 2026-10-24 (OK, 0 errors). 28d 0 impressions / 0 clicks (baseline 2 / 0). No manual Request Indexing recorded. Re-review 2026-11-27.
- **Learning:** Coverage changed this time, and no Request Indexing clicks were recorded, so that isn't the cause. The 2026-07-23 resubmit alone moved nothing, so the likely driver is the trailing-slash links (no 308 hop) on the homepage Google recrawled 2026-10-21. The resubmit may have helped too; the two can't be separated. This got the URLs discovered but not crawled. Next lever is manual Request Indexing in GSC, then an external link.

## 2026-10-11 — tool page `/save-webpage-as-pdf/` (paired with the Save Page as Markdown or PDF extension)
- **Status:** active
- **Hypothesis:** A how-to that explains *why* printed pages come out messy (no print stylesheet) and how to get just the article, will earn impressions for "save webpage as pdf" and related phrasings, and send traffic to Lamill's extension (via the lamill.io hub until it's in the Chrome Web Store). It's a head term led by large PDF-tool sites and this domain has almost no authority, so long-tail phrasings in the FAQ are the realistic first wins.
- **KPI:** GSC impressions + average position for the page; queries containing "webpage" + "pdf"; clicks to `lamill.io/extensions/save-page-pdf-md`.
- **Baseline:** 0 — new URL. Site: 1/7 sitemap URLs indexed (2026-10-02 entry).
- **Action:** new page via `TemplatePage` (WebPage + BreadcrumbList + HowTo + FAQPage JSON-LD; canonical == og:url, trailing slash); in the sitemap. Brief from tabmill (`tabmill landing save-page-pdf-md`, D-033/D-035). No install button: the extension isn't published yet.
- **Result:** TBD — review 28 days after the page is first indexed.
- **Learning:** TBD.

## 2026-10-14 — install button on `/save-webpage-as-pdf/` (extension now in the Chrome Web Store)
- **Status:** active
- **KPI:** Chrome Web Store installs attributed to `utm_source=markpdf.dev&utm_campaign=save-page-pdf-md`; page impressions/position as in the 2026-10-11 entry.
- **Baseline:** 0 — the page had no install link (the old notice said "coming soon").
- **Action:** two UTM-tagged "Add to Chrome" buttons (top notice + extension section); lamill.io hub link kept.
- **Result:** TBD — review 28 days after the page is first indexed.
- **Learning:** TBD.

## 2026-10-14 — v1.C: `/save-webpage-as-pdf/` gets internal links, `/guides/` index, TechArticle schema, sitemap lastmod
- **Status:** active
- **Hypothesis:** The page had no inbound internal links (orphan, reachable only via sitemap). Linking it from the homepage footer, the header nav and a new `/guides/` index, and adding `lastmod`, gives Google a crawl path from the one indexed URL (`/`), so the page gets discovered sooner.
- **KPI:** URL Inspection coverage for `/save-webpage-as-pdf/` and `/guides/` (unknown → indexed); then impressions per the 2026-10-11 entry.
- **Baseline:** `/save-webpage-as-pdf/` unknown to Google; site 1/7 sitemap URLs indexed (2026-10-02 entry).
- **Action:** guides registry (`src/lib/guides.mjs`) drives visible "Updated" date, TechArticle `dateModified`, and sitemap `lastmod`; `GuidePage` shell for both guides; `/guides/` index; nav/footer links; og:image / video / before-after slots that render only once assets exist.
- **Result:** TBD — review 2026-11-11
- **Learning:** TBD.

## 2026-10-30 — v1.D: thicken the crawl path (homepage, SOW guide, hubs)
- **Status:** active
- **Hypothesis:** Google has discovered the content URLs but won't crawl them, and the only indexed page (`/`) had 119 words and a tagline H1. Turning the homepage into a real "convert markdown to pdf" page (direct answer, 4 methods, error fixes, FAQ) and thickening the SOW guide and the two hubs raises the site's quality signal and crawl priority, so the 7 `discovered_not_indexed` URLs get crawled.
- **KPI:** URL Inspection coverage for the 8 non-indexed sitemap URLs (discovered → indexed); homepage impressions for "convert markdown to pdf" (SE Ranking: 920/mo, KD 21, US, 2026-10).
- **Baseline:** 1/9 indexed; 28d 0 impressions / 0 clicks (2026-10-30 GSC pull).
- **Action:** homepage H1 → "Convert Markdown to PDF that looks designed", ~740 words of SSR content + FAQPage JSON-LD; SOW guide 659 → ~1,215 words (direct-answer intro, vague-vs-specific rewrites, worked security-assessment example with failure case, 2 real FAQs replacing a definitional one; `updated` 2026-10-30 → sitemap lastmod); `/templates/` 127 → ~390 words, `/guides/` 76 → ~150, both with CollectionPage + ItemList schema and metadata within limits; template pages no longer share an H2 skeleton or CTA sentence.
- **Result:** TBD — review 2026-11-27
- **Learning:** TBD.

## 2026-10-30 — v1.E: four low-KD pages (SOW vs scope, Pandoc, rate calculator, cover letter)
- **Status:** active
- **Hypothesis:** Low-KD queries with stable volume are winnable on a fresh domain once crawled, and four more homepage-linked pages give Google more reasons to crawl the site.
- **KPI:** indexed status + impressions for `/guide/statement-of-work-vs-scope-of-work/` ("statement of work vs scope of work" 480/KD 7), `/guide/pandoc-markdown-to-pdf/` ("pandoc markdown to pdf" 480/KD 20), `/consulting-rate-calculator/` (320/KD 17), `/templates/proposal-cover-letter/` (260/KD 6). Volumes: SE Ranking via treg, US, 2026-10.
- **Baseline:** 0 — new URLs. Site 1/9 indexed (2026-10-30).
- **Action:** 4 pages built after SERP checks via treg; every Pandoc command/error on the guide verified against pandoc 3.11 in Docker; all linked from homepage footer, hubs and sibling pages; sitemap 9 → 13 URLs.
- **Result:** TBD — review 28 days after first indexed.
- **Learning:** TBD.

## 2026-10-30 — v1.F: ten more low-KD pages
- **Status:** active
- **Hypothesis:** Broadening from proposals into adjacent client-document and pricing queries (low KD, stable volume) multiplies the queries the site can win once Google starts crawling, and gives the homepage crawl path 10 more targets.
- **KPI:** indexed count (sitemap 13 → 23 URLs) and per-page impressions for: proposal format (810/KD 36), markdown to docx (590/25), readme template (480/30), design doc template (390/8), fixed price vs time and materials (320/11), pentest report template (320/26 + "penetration test report template" 210/26), proposal vs quote (260/11), day rate calculator (260/7), project kickoff template (260/12), consulting report template (260/19). SE Ranking via treg, US, 2026-10.
- **Baseline:** 0 — new URLs. Site 1/9 indexed (2026-10-30).
- **Action:** 85-keyword treg batch → 10 topics (skipped volume-jump artifacts and contract-language templates); SERP checked per page; Markdown→DOCX commands verified on pandoc 3.11; 744–1,300 words each with worked example + failure case; linked from homepage footer, hubs and siblings. Deployed 2026-10-30 (`f7306ff`, live sitemap 23 URLs); `sitemap-index.xml` + `sitemap-0.xml` force-resubmitted to GSC via `lamill settings gsc submit-sitemap --force`.
- **Result:** TBD — review 28 days after first indexed.
- **Learning:** TBD.
