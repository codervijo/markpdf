---
project: markpdf.dev
prd_version: 1
project_version: v1.D
status: planned
owner: Vijo
last_updated: 2026-10-30
---

# markpdf.dev — PRD

## 1. Problem

<1-2 sentence problem statement — fill in: what user-facing problem
does this site solve? Who has it? Why does it matter?>

## 2. Users

<who uses this — target user, what they care about, rough audience size>

## 3. Goals & non-goals

**Goals:**
- <fill in>

**Non-goals:**
- <fill in>

## 4. Versions

Two-level versioning convention (canonical: `sites/portfolio/AI_AGENTS.md`):

- `vN` = major capability tier; SemVer-MAJOR semantics.
- `vN.X` = phase letter within a tier; internal slicing.

| Version | Theme | Acceptance |
|---|---|---|
| v0 | scaffold | local builds, CF wrangler.jsonc + public/_headers in place, repo initialized |
| v1 | <fill in: first real shipped capability> | <fill in: what users get> |

## 5. Phases

| Phase | Theme | Features | Status |
|---|---|---|---|
| **v0.A** | scaffolded | `portfolio new bootstrap` ran; standard files written; git initialized | ✅ |
| **v1.A** | templates + SEO baseline | templates library, homepage SEO, real 404 on CF Pages, noindex/sitemap-exclude app routes | ✅ |
| **v1.B** | template library expansion | 5 template/guide pages via shared `TemplatePage` | ✅ |
| **v1.C** | guide polish + shared guide kit | `src/lib/guides.mjs` registry (single source for dates, sitemap lastmod, index, cross-links); `GuidePage` (TechArticle schema + visible "Updated" date); reusable `ExtensionCta`, `MarkpdfCta`, `GuideFigure`, `RelatedGuide`; asset slots that render only when the file exists; page-specific og:image + `summary_large_image`; `/guides/` index + nav/footer links; applied to `/save-webpage-as-pdf/` | ✅ |
| **v1.D** | thin-page repair (crawl path) | homepage retargeted to "convert markdown to pdf" with real SSR content + direct links to every guide/template; SOW guide brought to the write-lamill-seo-page bar (direct answer, worked example incl. failure case, real FAQs); `/templates/` and `/guides/` hubs get unique prose, schema, metadata in limits; template pages lose the shared H2 skeleton + repeated CTA sentence | ✅ |
| **v1.E** | new low-KD pages | SOW vs scope of work (480/KD 7), pandoc markdown to pdf (480/20), consulting rate calculator (320/17), proposal cover letter (260/6); Volumes: SE Ranking via treg, US, 2026-10 | ✅ |
| **v1.F** | 10 more low-KD pages | 10 topics chosen from treg keyword data (low KD, highest volume, ICP fit), each built to the write-lamill-seo-page bar (SERP checked, direct answer, worked example with failure case, real FAQs, schema, linked from hubs + homepage): proposal format, proposal vs quote, fixed price vs T&M, markdown to docx, day rate calculator; README, design doc, pentest report, consulting report, project kickoff templates | ✅ |

## 6. Open questions

- *(append-only log; mark answered with date but never delete)*
