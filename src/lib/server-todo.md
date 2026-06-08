# Server-side code dropped during the Astro port

The source (`genai/`) was a **TanStack Start** app (SSR + a Nitro/Cloudflare
server entry) backed by **Supabase**. Astro here is configured for **static
output** (`output: 'static'`), so the framework-specific server pieces below do
**not** translate. They are listed here as TODOs rather than ported.

## Dropped TanStack Start / server files

- `genai/src/server.ts` — TanStack Start SSR entry (the SSR error wrapper that
  `vite.config.ts` redirected the server build to). **No Astro equivalent in
  static mode.**
- `genai/src/start.ts` — TanStack Start bootstrap.
- `genai/src/router.tsx` + `genai/src/routeTree.gen.ts` — TanStack Router setup.
  Replaced by Astro file-based routing under `src/pages/` plus the thin
  `src/lib/router-shim.tsx` for the bits of `@tanstack/react-router` the UI used
  (`Link`, `useNavigate`, params, pathname).
- `genai/src/routes/__root.tsx` — root document/shell, head + auth-state wiring.
  Replaced by `src/layouts/Layout.astro` (head/fonts/theme) and the per-page
  `<head>` in `src/pages/index.astro`.
- `genai/src/integrations/supabase/client.server.ts`,
  `auth-middleware.ts`, `auth-attacher.ts` — server-side Supabase/SSR auth.
  The static site only ships the browser client (`client.ts`); the
  `_authenticated` route guard is reproduced client-side in
  `src/lib/use-user.ts`.
- `genai/src/lib/api/example.functions.ts` — TanStack server functions.
- `genai/src/lib/config.server.ts`, `error-page.ts`, `error-capture.ts`,
  `lovable-error-reporting.ts` — server config + SSR error reporting. Not ported.
- `genai/supabase/**` (migrations, config) — backend schema/config; deploy
  concern, left in `genai/`.

## Data layer note

`@tanstack/react-query` is a banned dependency for the port, so the data hooks
were re-implemented as a minimal fetch-on-mount shim in
`src/lib/query-shim.tsx` (`useQuery` / `useMutation` / `useQueryClient`). It is
**not** a full cache — no background refetch, retries, or stale-time logic.
The authenticated pages (`dashboard`, `documents`, `documents/new`,
`documents/[id]`, `brand-kit`) are mounted as **`client:only="react"`** islands
because they need a live Supabase session + browser storage and cannot be
prerendered.

## Static-hosting caveats (needs operator decision)

- **Auth + live data**: the app pages require real `VITE_SUPABASE_URL` /
  `VITE_SUPABASE_PUBLISHABLE_KEY` env vars at build/runtime, and Supabase must be
  reachable from the browser. Without them the islands error on mount.
- **`/documents/[id]`**: static output prerenders only the placeholder path
  (`/documents/preview`). The editor reads the real id from the URL at runtime,
  so serving arbitrary `/documents/<uuid>` URLs needs an SPA-style 404→app
  fallback (or moving to an SSR adapter). Decide per hosting target.
