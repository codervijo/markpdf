import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// `templates` — the free markdown template library. Each entry is a real,
// copy-pasteable client document. Frontmatter holds the SEO/intro metadata;
// the markdown body IS the template a user copies. Rendered fully at build
// time (server-side HTML), so every /templates/* page is crawlable — unlike
// the client:only app routes.
const templates = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/templates" }),
  schema: z.object({
    title: z.string(),
    // meta description + gallery blurb (≤160 chars for SERP)
    description: z.string(),
    docType: z.string(), // badge: "Proposal", "SOW", "Report", …
    audience: z.string(), // who it's for
    whenToUse: z.string(), // 1–2 sentences shown above the preview
    order: z.number().default(100), // gallery sort
    // Rich templates get a hand-built page (src/pages/templates/<slug>.astro)
    // instead of the generic [slug] renderer. Still listed in the gallery.
    customPage: z.boolean().default(false),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { templates };
