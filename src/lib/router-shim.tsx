// router-shim — drop-in replacements for the bits of @tanstack/react-router
// the ported UI used. Astro owns routing now; these map onto the browser.
//
// Route mapping note: the source's dynamic route "/documents/$id" is served by
// the prerendered "/documents/edit/" page (src/pages/documents/edit.astro),
// which reads the id from the "?id=" query string at runtime. No server-side
// dynamic path means unknown URLs return a real 404 (not a soft-200 SPA
// fallback) — see wrangler.jsonc not_found_handling: "404-page".
import * as React from "react";

type Params = Record<string, string | number>;

function resolveHref(to: string, params?: Params): string {
  let href = to;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      href = href.replace(`$${k}`, encodeURIComponent(String(v)));
    }
  }
  return href;
}

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string;
  params?: Params;
  replace?: boolean;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, params, replace, children, ...rest }, ref) => (
    <a ref={ref} href={resolveHref(to, params)} {...rest}>
      {children}
    </a>
  ),
);
Link.displayName = "Link";

export function navigate(opts: { to: string; params?: Params; replace?: boolean }) {
  const href = resolveHref(opts.to, opts.params);
  if (opts.replace) window.location.replace(href);
  else window.location.href = href;
}

export function useNavigate() {
  return navigate;
}

export function usePathname(): string {
  return typeof window === "undefined" ? "/" : window.location.pathname;
}

// Replacement for Route.useParams() on the editor page: id comes from the
// "?id=" query string of /documents/edit?id=<id>.
export function useIdParam(): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("id") ?? "";
}
