// Single source of truth for guide metadata. Read by the guide pages (visible
// "Updated" date + TechArticle dates), the /guides/ index, the sitemap lastmod
// (astro.config.mjs), and cross-links. Plain .mjs so astro.config can import it.
//
// - published / updated: ISO dates. Bump `updated` when a guide's content changes.
// - ogImage: path under public/; emitted only once the file exists (see assets.mjs).
// - live: false = route not built yet; RelatedGuide links to it don't render.

export const GUIDES = [
  {
    path: "/save-webpage-as-pdf/",
    title: "How to Save a Webpage as a PDF",
    description:
      "Save any webpage as a PDF in Chrome, Edge, Firefox or Safari — and how to keep the article without the menus, ads and cookie banners that print with it.",
    published: "2026-10-12",
    updated: "2026-10-14",
    ogImage: "/og/save-webpage-as-pdf.png",
    live: true,
  },
  {
    path: "/guide/how-to-write-a-scope-of-work/",
    title: "How to Write a Scope of Work",
    description:
      "A step-by-step guide to writing a scope of work: objective, deliverables, acceptance criteria, exclusions, timeline, and terms — with free templates to start from.",
    published: "2026-07-24",
    updated: "2026-07-24",
    live: true,
  },
  {
    path: "/save-webpage-as-markdown/",
    title: "Save a Webpage as Markdown",
    live: false,
  },
];

export const liveGuides = () => GUIDES.filter((g) => g.live);

export function getGuide(path) {
  const g = GUIDES.find((x) => x.path === path);
  if (!g) throw new Error(`guides.mjs: no entry for ${path}`);
  return g;
}

// "2026-10-14" → "October 2026"
export const formatMonthYear = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
