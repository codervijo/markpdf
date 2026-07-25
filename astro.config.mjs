// astro.config.mjs
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://markpdf.dev',
  integrations: [
    // Keep auth-gated app routes out of the sitemap — they render empty to
    // crawlers (client:only) and will never rank. Paired with noindex on those
    // pages (see Layout `noindex` prop). Indexable surface = home, pricing,
    // templates.
    sitemap({
      filter: (page) =>
        ![
          // auth-gated app routes (empty to crawlers, noindex)
          'https://markpdf.dev/auth/',
          'https://markpdf.dev/dashboard/',
          'https://markpdf.dev/brand-kit/',
          'https://markpdf.dev/documents/',
          'https://markpdf.dev/documents/new/',
          'https://markpdf.dev/documents/edit/',
          // SOW templates — held from index pending legal review of the
          // contractual language (noindex in their .astro/.md too).
          'https://markpdf.dev/templates/scope-of-work/',
          'https://markpdf.dev/templates/statement-of-work/',
        ].includes(page),
    }),
    react(),
  ],
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
