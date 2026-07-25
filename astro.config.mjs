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
          'https://markpdf.dev/auth/',
          'https://markpdf.dev/dashboard/',
          'https://markpdf.dev/brand-kit/',
          'https://markpdf.dev/documents/',
          'https://markpdf.dev/documents/new/',
          'https://markpdf.dev/documents/edit/',
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
