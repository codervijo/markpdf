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
- **Result:** Reviewed 2026-10-02 (late). 28d: 2 impressions / 0 clicks / avg pos 1.5; 1 of 7 sitemap URLs indexed (`/` only). No organic signal yet on the template-SEO distribution bet. Re-review 2026-10-30.
- **Learning:** The hypothesis hasn't been tested: Google has not discovered the content that's meant to carry it (see 2026-07-24 entry). The bottleneck is discovery/crawl priority, not the offer.

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
- **Result:** Reviewed 2026-10-02 (late). 28d: 2 impressions / 0 clicks / avg pos 1.5. Indexed 1/7: all 5 new content URLs (`/templates/`, consulting/freelance/web-design proposal, SOW guide) plus `/pricing/` are `url_is_unknown_to_google`. That's despite (a) being in the sitemap Google downloaded 2026-07-25 and (b) being linked from the homepage Google crawled 2026-09-06. Live checks pass: HTTP 200, `robots.txt` allows all, no noindex. Minor: homepage links `/pricing` (no trailing slash → 308) while the sitemap/canonical uses `/pricing/`. Re-review 2026-10-30.
- **Learning:** The on-page bet can't be judged yet; the pages haven't been crawled. The site is technically clean, so this looks like low crawl priority (no external links/authority), not something blocking crawlers. Next levers to consider: manual "Request Indexing" in GSC for the 5 content URLs, and getting the first external links to a template page. Watch whether the low-KD proposal/SOW template keywords convert impressions → clicks on a fresh domain, and which template earns first. Two SOW pages remain out of the index until their default contractual wording is reviewed.

## 2026-10-02 — trailing-slash internal links + sitemap force-resubmit
- **Status:** active
- **KPI:** URL Inspection coverage for the 6 `url_is_unknown_to_google` URLs (`/pricing/`, `/templates/`, 3 proposal templates, SOW guide); indexed-page count.
- **Baseline:** 1/7 sitemap URLs indexed; 28d 2 impressions / 0 clicks / avg pos 1.5.
- **Action:** internal links to `/pricing` and `/templates` now point to the canonical trailing-slash URLs (no more 308 hop from homepage/nav). Force-resubmitted `sitemap-index.xml` and `sitemap-0.xml` via `lamill settings gsc submit-sitemap --force`. Manual "Request Indexing" isn't available through the API; it has to be clicked in GSC for each URL.
- **Result:** TBD — review 2026-10-30
- **Learning:** TBD. The 2026-07-23 resubmit alone moved nothing, so if coverage changes this time, credit the manual Request Indexing clicks (if done), not the resubmit.
