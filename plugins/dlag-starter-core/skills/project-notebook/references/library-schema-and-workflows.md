# Project Notebook schema and workflow reference

Read [capability boundaries](library-boundaries.md) before any operation. The output map describes intended document locations, not permission to create reports, contracts, notes or perform lifecycle moves.

## Path conventions enforced (schema v2)

| Output | Location |
|---|---|
| Customer-facing docs | `library/knowledge/public/<domain>/<slug>.md` |
| Internal engineering/business docs | `library/knowledge/private/<domain>/<slug>.md` |
| Stable shared contracts | `library/knowledge/private/contracts/CTR-<###>-<slug>.md` |
| ADRs | `library/knowledge/private/architecture/ADR-<n>-<slug>.md` |
| PRD folder (backlog) | `library/requirements/backlog/prd-<###>-<slug>/` |
| PRD index | `library/requirements/backlog/prd-<###>-<slug>/prd-<###>-<slug>-index.md` |
| PRD sub-feature | `library/requirements/backlog/prd-<###>-<slug>/prd-<###><letter>-<slug>-<feature>.md` |
| PRD QA report | `library/requirements/backlog/prd-<###>-<slug>/qa/prd-<###>-<slug>-qa.md` |
| PRD in-work | `library/requirements/in-work/prd-<###>-<slug>/` (same structure) |
| Completed PRD | `library/requirements/completed/prd-<###>-<slug>/` |
| Routine scan report | `library/requirements/reports/<YYYY-MM-DD>-<type>-report.md` |
| Build plans (PRD map, wave plan, handoff packet) | `library/requirements/plans/` |
| Project standards (Definition of Done) | `library/knowledge/private/standards/<slug>.md` |
| IRD folder (backlog) | `library/issues/backlog/ird-<###>-<slug>/` |
| IRD index | `library/issues/backlog/ird-<###>-<slug>/ird-<###>-<slug>-index.md` |
| IRD QA report | `library/issues/backlog/ird-<###>-<slug>/qa/ird-<###>-<slug>-qa.md` |
| Completed IRD | `library/issues/completed/ird-<###>-<slug>/` |
| Notes (human only) | `library/notes/` - agents NEVER write here |

**NOT in `library/`:**

| Asset | Correct location |
|---|---|
| Brand assets (logos, fonts, colors) | Wherever the deployment stores shared brand assets (e.g. a `brands/` or `assets/` folder outside this repo) |
| Derived wiki / docs vault mirrors | Any aggregated wiki or docs vault that mirrors `library/` is derived - never edit it directly |
| Binary files (images, fonts, PDFs) | An `assets/` or `public/` folder appropriate to the deployment |

**Legacy v1 paths (do NOT create new content here):**

| v1 path | v2 replacement |
|---|---|
| `library/knowledge-base/` | `library/knowledge/private/` |
| `library/architecture/` | `library/knowledge/private/architecture/` |
| `library/requirements/features/` | `library/requirements/backlog/` |
| `library/requirements/issues/` | `library/issues/backlog/` |
| `library/qa/` | `library/requirements/reports/` |

See [page coexistence](../guides/07-wiki-sync.md) for source and ownership rules.

## Audience document packets

Audience Word/PDF generation is unavailable in Starter. Preserve source Markdown, audience boundaries and citations; do not claim export or publication occurred.

## Reusable templates from real workflows

Read [Guide 08](../guides/08-reuse-workflow-templates.md) and the [evidence fields](template-reuse-fields.md) before adapting an existing template. Preserve source revisions, observed/proposed/unrun distinctions and authority boundaries. Keep source observations and unrun execution separate.
