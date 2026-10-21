# Record an architectural decision

Use a plain Markdown Nygard record for a consequential choice. Preserve the existing project's decision directory and numbering. In a new Project Notebook use `library/knowledge/private/architecture/ADR-<number>-<slug>.md`, with three-digit padding through 999 and natural width thereafter. Scan all existing ADR filenames before taking max plus one; never fill a historical gap or renumber an old record.

## Choose the requested method

| Request | Full guide | Template or specimen |
| --- | --- | --- |
| Decide whether an ADR is needed | [Principles](guides/00-principles.md) | Preserve the distinction between a decision, PRD and narrative explanation |
| Record a simple decision | [Nygard](guides/01-nygard-format.md) | [Nygard template](templates/nygard.md), [PR-derived specimen](examples/nygard-from-pr.md) |
| Compare substantial alternatives | [MADR](guides/02-madr-format.md) | [MADR template](templates/madr.md) |
| Write a concise summary | [Y-statements](guides/03-y-statements.md) | [Five-clause template](templates/y-statement.md) |
| Replace or retire a decision | [Supersession](guides/04-supersession-workflow.md) | [Two-record walkthrough](examples/supersession-walkthrough.md) |
| Navigate or audit a decision log | [Onboarding](guides/06-adr-as-onboarding-tool.md) | [Log review](reports/README.md) |
| Specifically requested tooling setup | [Optional tooling](guides/05-tooling-integration.md) | Plain Markdown remains the default; no installation or publication follows from authoring |

Read [Project Notebook permissions](../references/library-boundaries.md). The same Markdown Write/Edit limits apply. Source code, PRs and meeting summaries supply context; the actual owner's accepted choice supplies decision authority. Record the owner, acceptance locator/date and observed subject revision. Never infer that the decision or implementation was approved just because a PR exists.

## Core principles

### 1. Decisions, not docs

An ADR captures a **closed, consequential decision**, one that is hard or expensive to reverse and that future engineers will want to understand. It is NOT:

- A design proposal (use an RFC or PRD instead)
- A meeting summary (use a shared doc)
- A description of how something works (use the wiki)
- A changelog entry (use CHANGELOG.md)

The test: "If I delete this ADR, does the team lose understanding of *why* the codebase is the way it is?" If yes, write it. If no, do not.

### 2. Four useful questions (extended Nygard)

Every ADR must answer:

1. **What is the architectural context?** (forces at play, constraints, the problem)
2. **What decision did we make?** (the concrete, stated choice, no weasel words)
3. **What are the consequences?** (positive, negative, neutral, the trade-offs accepted)
4. **What alternatives were considered and rejected?** (and why)

### 3. Sequential numbering is permanent

ADR numbers are forever. They appear in commit messages (`ADR-0012`), code comments, PR descriptions, and onboarding docs. Never reuse, never renumber, never deliberately skip. A "deleted" ADR becomes `Status: Deprecated` with an explanation.

### 4. Supersession is bidirectional

When ADR-0025 supersedes ADR-0012:
- ADR-0025 must say `Supersedes: ADR-0012` in its header
- ADR-0012 must say `Status: Superseded by ADR-0025`

Both links must be present. One-directional supersession breaks the audit trail.

### 5. Status lifecycle

```
Proposed -> Accepted -> Superseded (by ADR-NNNN)
                    -> Deprecated  (rationale required)
         -> Rejected  (rationale required)
```

A `Proposed` ADR is in-flight. A Proposed record may be discussed and linked as a proposal, but it is never binding implementation authority. For an actually accepted decision record the accepted state and its decision evidence. If acceptance is missing, leave it Proposed instead of inferring approval from a PR or source comment.

---

## Format comparison matrix

| Criterion | Nygard | MADR | Y-statement |
|---|---|---|---|
| Length | 1 to 2 pages | 2 to 4 pages | 1 to 5 sentences |
| Sections | Context, Decision, Consequences | Title, Status, Context, Decision, Consequences, Pros, Cons, Alternatives | Single sentence with embedded structure |
| Best for | Most team decisions | Decisions needing explicit trade-off tables | Quick records, ADR log summaries |
| Tooling | adr-tools (native) | MADR template repo | Any markdown |
| Recommended default | Yes | When alternatives are complex | As supplement to Nygard/MADR |

Recommendation: use Nygard as the default. Switch to MADR when the team needs explicit pros/cons tables (common in multi-stakeholder decisions). Use Y-statements as a one-liner summary inside Nygard/MADR, not as a standalone format.

---


## Evidence and tools

A correctly written ADR does not prove implementation, security, provider behavior or migration completion. Record related source paths, known conflicts, checks actually performed and unresolved work. A replacement decision may be accepted while its implementation is still pending; name the migration owner, affected components, required checks and any actual deadline instead of silently claiming migration. Security-sensitive decisions need Security Review, then the applicable independent Quality Review. No publication, external PR edit, commit, dependency or configuration change is part of this Markdown method.

The blank templates use NNNN as a generic number placeholder, not a four-digit requirement. Use the actual permanent identifier and the project's established width.
