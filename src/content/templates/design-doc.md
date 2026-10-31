---
title: Design Doc Template
description: A software design doc template in markdown with context, goals, non-goals, proposed design, alternatives, risks and rollout. Copy it and fill it in.
docType: Docs
audience: Engineers, tech leads and consultants proposing a technical change before building it
whenToUse: Write one before any change that is expensive to reverse, touches several teams or systems, or needs someone else's sign-off.
order: 65
customPage: true
noindex: false
updated: 2026-10-30
---

# [Design name]

**Author:** [Name] · **Reviewers:** [Names] · **Status:** [Draft / In review / Approved / Superseded]
**Last updated:** [Date]

## Context

[What exists today and what's wrong with it, in a few paragraphs. Include
the numbers that make the problem real: error rates, latency, cost, hours
spent. A reviewer who knows nothing about this area should understand why
this doc exists.]

## Goals

- [Measurable outcome, e.g. "p95 checkout latency under 400 ms"]
- [Measurable outcome]

## Non-goals

- [Something a reader might reasonably expect this to do, that it won't]
- [Something deliberately left for later]

## Proposed design

[The design in enough detail that someone else could build it. Start with
a diagram or a short overview, then go component by component.]

### Data model / API changes

[New tables, fields, endpoints, events. Show the shapes.]

### Key flows

[Step-by-step for the two or three most important paths, including what
happens when something fails.]

## Alternatives considered

### [Alternative A]

[What it is, why it's attractive, and the specific reason it lost.]

### [Alternative B]

[Same.]

### Do nothing

[What happens if we don't build this. Sometimes this is the right answer.]

## Risks and open questions

| Risk / question | Impact | Mitigation or owner |
|---|---|---|
| [Risk] | [What breaks] | [Plan] |
| [Open question] | [What it blocks] | [Who decides, by when] |

## Security, privacy and cost

[New data stored, new access paths, new spend. "None" is a valid answer if
you checked.]

## Rollout and rollback

[How it ships: flags, migration order, phases. How to undo each step.]

## Testing and monitoring

[How we'll know it works before and after launch: tests, dashboards, alerts.]

## Decision log

- [Date] — [Decision and who made it]
