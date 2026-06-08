// router-shim — drop-in replacements for the bits of @tanstack/react-router
// the ported UI used. Astro owns routing now; these map onto the browser.
//
// Route mapping note: the source's dynamic route "/documents/$id" maps to
// Astro's "/documents/[id].astro". The editor reads the id from the path at
// runtime; see src/lib/server-todo.md for the static-hosting caveat.
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

// Replacement for Route.useParams() on the editor page: id is the last path
// segment of /documents/<id> (e.g. "/documents/abc" -> "abc").
export function useIdParam(): string {
  if (typeof window === "undefined") return "";
  const segs = window.location.pathname.split("/").filter(Boolean);
  return decodeURIComponent(segs[segs.length - 1] ?? "");
}
