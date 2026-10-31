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
      "Write a scope of work step by step: deliverables, acceptance, exclusions and dates, with vague-vs-specific rewrites and a worked example.",
    published: "2026-07-24",
    updated: "2026-10-30",
    live: true,
  },
  {
    path: "/guide/statement-of-work-vs-scope-of-work/",
    title: "Statement of Work vs Scope of Work",
    description:
      "The difference between a statement of work and a scope of work, which one your project needs, and the same project written both ways.",
    published: "2026-10-30",
    updated: "2026-10-30",
    live: true,
  },
  {
    path: "/guide/pandoc-markdown-to-pdf/",
    title: "How to Convert Markdown to PDF with Pandoc",
    description:
      "Convert Markdown to PDF with Pandoc: the commands, a reusable defaults file, and fixes for the errors you'll hit. Tested on Pandoc 3.11.",
    published: "2026-10-30",
    updated: "2026-10-30",
    live: true,
  },
  {
    path: "/consulting-rate-calculator/",
    title: "Consulting Rate Calculator",
    description:
      "Work out your minimum consulting hourly and day rate from income, expenses, time off and billable hours, with the formula shown.",
    published: "2026-10-30",
    updated: "2026-10-30",
    live: true,
  },
  {
    path: "/guide/markdown-to-docx/",
    title: "How to Convert Markdown to DOCX (Word)",
    description:
      "Convert Markdown to DOCX with Pandoc: what becomes which Word style, a reference document for your own styles, and what gets lost.",
    published: "2026-10-30",
    updated: "2026-10-30",
    live: true,
  },
  {
    path: "/guide/proposal-format/",
    title: "Proposal Format",
    description:
      "Client proposal format, section by section: what goes in each part, the order and why, a filled-in skeleton, and layout tips.",
    published: "2026-10-30",
    updated: "2026-10-30",
    live: true,
  },
  {
    path: "/guide/proposal-vs-quote/",
    title: "Proposal vs Quote",
    description:
      "Proposal vs quote: what each contains, how to tell which a client needs, and the same request answered both ways.",
    published: "2026-10-30",
    updated: "2026-10-30",
    live: true,
  },
  {
    path: "/guide/fixed-price-vs-time-and-materials/",
    title: "Fixed Price vs Time and Materials",
    description:
      "Fixed price vs time and materials: when each fits, who carries the risk, hybrid models, and one project priced both ways.",
    published: "2026-10-30",
    updated: "2026-10-30",
    live: true,
  },
  {
    path: "/day-rate-calculator/",
    title: "Day Rate Calculator",
    description:
      "Calculate a day rate from the salary you're replacing, days off, unbilled days and costs, and see what an offered day rate is worth.",
    published: "2026-10-30",
    updated: "2026-10-30",
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
