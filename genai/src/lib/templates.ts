export type TemplateId = "modern-proposal" | "clean-sow" | "executive-brief";
export type DocType = "proposal" | "scope_of_work" | "project_brief";

export interface TemplateDef {
  id: TemplateId;
  name: string;
  description: string;
  docType: DocType;
  starter: (vars: { client: string; title: string; company: string }) => string;
}

const today = () =>
  new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

export const TEMPLATES: TemplateDef[] = [
  {
    id: "modern-proposal",
    name: "Modern Proposal",
    description: "Cover, scope, deliverables, investment, and next steps.",
    docType: "proposal",
    starter: ({ client, title, company }) => `# ${title || "Project Proposal"}

Prepared for **${client || "Client Name"}**
By ${company || "Your Studio"} — ${today()}

---

## Overview

A short, confident summary of what you're proposing and why it matters for the client.

## Scope of Work

- Discovery & strategy
- Design system & key screens
- Frontend implementation
- Launch support

## Deliverables

| Phase | Deliverable | Timeline |
| --- | --- | --- |
| 1 | Discovery doc | Week 1 |
| 2 | Design system | Week 2–3 |
| 3 | Build | Week 4–6 |

## Investment

A fixed fee of **$24,000** covering all phases above. Billed 50% on kickoff, 50% on launch.

## Next Steps

1. Approve this proposal
2. Sign the SOW
3. Kickoff call scheduled within 5 business days
`,
  },
  {
    id: "clean-sow",
    name: "Clean Scope of Work",
    description: "Tight, contract-ready SOW with deliverables and assumptions.",
    docType: "scope_of_work",
    starter: ({ client, title, company }) => `# Scope of Work — ${title || "Engagement"}

**Client:** ${client || "Client Name"}
**Contractor:** ${company || "Your Studio"}
**Effective:** ${today()}

## 1. Engagement Summary

One paragraph describing what we will do and the outcome the client receives.

## 2. Deliverables

- Item one
- Item two
- Item three

## 3. Timeline

Estimated duration: **6 weeks** from kickoff.

## 4. Assumptions

- Client provides feedback within 2 business days
- All content and assets supplied by client
- Out of scope work billed at $180/hr

## 5. Fees

A fixed fee of **$18,000**, billed in two milestones.
`,
  },
  {
    id: "executive-brief",
    name: "Executive Project Brief",
    description: "One-page brief: context, goals, success criteria.",
    docType: "project_brief",
    starter: ({ client, title, company }) => `# ${title || "Project Brief"}

> Prepared by ${company || "Your Studio"} for ${client || "Client"} — ${today()}

## Context

Why this project exists and what business problem it addresses.

## Goals

1. Primary outcome
2. Secondary outcome
3. Constraints to respect

## Success Criteria

- Quantifiable metric one
- Quantifiable metric two

## Stakeholders

- **Sponsor:** Name, Title
- **Lead:** Name, Title

## Open Questions

- Question one
- Question two
`,
  },
];

export const getTemplate = (id: string): TemplateDef =>
  TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];

export const DOC_TYPE_LABEL: Record<DocType, string> = {
  proposal: "Proposal",
  scope_of_work: "Scope of Work",
  project_brief: "Project Brief",
};
