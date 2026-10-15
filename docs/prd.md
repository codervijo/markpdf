---
project: markpdf.dev
prd_version: 1
project_version: v0.A
status: planned
owner: Vijo
last_updated: 2026-10-14
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
| **v1.C** | guide polish + shared guide kit | `src/lib/guides.mjs` registry (single source for dates, sitemap lastmod, index, cross-links); `GuidePage` (TechArticle schema + visible "Updated" date); reusable `ExtensionCta`, `MarkpdfCta`, `GuideFigure`, `RelatedGuide`; asset slots that render only when the file exists; page-specific og:image + `summary_large_image`; `/guides/` index + nav/footer links; applied to `/save-webpage-as-pdf/` | in progress |

## 6. Open questions

- *(append-only log; mark answered with date but never delete)*
