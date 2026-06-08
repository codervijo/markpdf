import { useMemo } from "react";
import { renderMarkdown } from "@/lib/markdown";
import { type TemplateId } from "@/lib/templates";

export interface BrandKitLike {
  company_name?: string | null;
  website?: string | null;
  email?: string | null;
  primary_color?: string | null;
  accent_color?: string | null;
  logo_url?: string | null;
  footer_text?: string | null;
}

interface Props {
  templateId: TemplateId | string;
  brand: BrandKitLike | null;
  title: string;
  clientName: string;
  markdown: string;
  className?: string;
}

export function DocumentPreview({ templateId, brand, title, clientName, markdown, className }: Props) {
  const html = useMemo(() => renderMarkdown(markdown), [markdown]);
  const primary = brand?.primary_color || "#0F172A";
  const accent = brand?.accent_color || "#0EA5E9";
  const company = brand?.company_name || "Your Studio";
  const website = brand?.website || "";
  const email = brand?.email || "";
  const footer = brand?.footer_text || `© ${new Date().getFullYear()} ${company}. All rights reserved.`;

  const style = {
    ["--brand-primary" as string]: primary,
    ["--brand-accent" as string]: accent,
  } as React.CSSProperties;

  const isExec = templateId === "executive-brief";
  const isSow = templateId === "clean-sow";

  return (
    <div className={`doc-sheet doc-preview mx-auto ${className ?? ""}`} style={style}>
      {/* Header band */}
      <div
        className="flex items-center justify-between px-12 py-6"
        style={{ borderBottom: `1px solid var(--hairline)` }}
      >
        <div className="flex items-center gap-3">
          {brand?.logo_url ? (
            <img src={brand.logo_url} alt={company} className="h-8 w-auto object-contain" />
          ) : (
            <div
              className="h-8 w-8 rounded-sm"
              style={{ background: primary }}
              aria-hidden
            />
          )}
          <span className="text-[11pt] font-medium tracking-tight" style={{ color: primary }}>
            {company}
          </span>
        </div>
        <div className="text-right text-[9pt] uppercase tracking-[0.14em]" style={{ color: "#64748b" }}>
          {isSow ? "Scope of Work" : isExec ? "Project Brief" : "Proposal"}
        </div>
      </div>

      {/* Cover-ish header for proposal/sow */}
      {!isExec && (
        <div className="px-12 pt-12 pb-6">
          <div
            className="text-[9pt] uppercase tracking-[0.18em] mb-4"
            style={{ color: accent }}
          >
            Prepared for {clientName || "Client"}
          </div>
          <h1
            className="font-serif text-[34pt] leading-[1.05] mb-0"
            style={{ color: primary }}
          >
            {title || "Untitled Document"}
          </h1>
          <div
            className="mt-6 h-px w-16"
            style={{ background: accent }}
          />
        </div>
      )}

      {/* Body */}
      <div className="px-12 pb-16 pt-4">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between px-12 py-5 text-[8.5pt]"
        style={{ borderTop: `1px solid var(--hairline)`, color: "#64748b" }}
      >
        <span>{footer}</span>
        <span className="flex items-center gap-3">
          {website && <span>{website}</span>}
          {website && email && <span aria-hidden>·</span>}
          {email && <span>{email}</span>}
        </span>
      </div>
    </div>
  );
}
