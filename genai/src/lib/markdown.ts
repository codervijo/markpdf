import { marked } from "marked";
import DOMPurify from "dompurify";

marked.setOptions({ gfm: true, breaks: false });

export function renderMarkdown(md: string): string {
  const raw = marked.parse(md ?? "", { async: false }) as string;
  if (typeof window === "undefined") return raw;
  return DOMPurify.sanitize(raw, { USE_PROFILES: { html: true } });
}
