---
name: data-foundation
description: "Design and draft Supabase PostgreSQL schemas, indexes, migrations and ownership policies for Starter React Router SSR and Cloudflare Workers."
license: AGPL-3.0-or-later
compatibility: Claude Code
---

# Data Foundation Playbook

Start with the user's accepted data requirements and the named local files. Preserve the existing schema, applied migration history, project conventions and other people's work. Supabase Postgres and Supabase Auth are selected. Use versioned SQL drafts; an ORM or different database needs its own accepted project decision.

1. Read the [procedure](guides/design-data.md) and [principles](guides/00-principles.md). Capture actual database, client and migration-runner versions from supplied non-secret evidence. Do not connect to discover them.
2. Choose the relevant route below. Read its guide, complete its worksheet and retain uncertainty where a product rule or historical fact is missing.
3. Draft only the requested local schema, query, migration proposal or report. Code examples are review inputs until explicitly adapted, executed and observed in an authorized environment.
4. Read changed files back. Check schema/query consistency, local links and the requested behavior. Report source review, executed checks and missing native evidence separately.

| Request | Read | Deliver |
|---|---|---|
| New schema or existing schema review | [Schema](guides/01-schema-design.md), [indexes](guides/02-indexing.md) | [Schema specification](templates/schema-spec.md), requested SQL draft |
| Index review | [Indexing](guides/02-indexing.md), [decision tree](templates/indexes-decision-tree.md) | [Findings](templates/audit-template.md) tied to a named workload |
| Migration | [Migration patterns](guides/03-migrations.md), [live changes](guides/11-live-schema-migration.md) | [Migration plan](templates/migration-plan.md), [phase checklist](templates/expand-backfill-contract-checklist.md), [live packet](templates/live-schema-migration-packet.md) |
| Partitioning | [Partitioning](guides/04-partitioning.md) | Key, lifecycle, locking and rollback design |
| Query performance or connection issues | [Performance and pooling](guides/05-performance-pooling.md), [supplied-plan review](guides/review-query-plan.md) | Evidence-based diagnosis, expected checks and missing measurements |
| Search storage or full-text search | [Special-purpose PostgreSQL](guides/06-special-purpose.md) | Storage/query shape and explicit retrieval handoff |
| Existing ORM or client fit | [Client and ORM review](guides/07-orm-choice.md) | [Decision record](templates/ADR.md) or concrete compatibility finding |
| Platform or recovery fit | [Selected services](guides/08-serverless-platforms.md), [workload](guides/09-workload-platform-fit.md), [recovery](guides/10-recovery-and-exit-fit.md) | [Fit worksheet](templates/platform-fit-decision.md) with one recommendation |
| Personal or tenant ownership | [Tenant boundaries](guides/12-tenant-data-boundaries.md) | [Boundary worksheet](templates/tenant-boundary-proof.md), per-principal expected outcomes |

The [resource index](README.md) includes complete examples and SQL review specimens. The [official references](references/official-sources.md) support database behavior; project requirements still come from the user.

## Scope and handoffs

Read only named project files and placeholder configuration. Write/Edit may change only the requested local app files or documents. Never read actual secret files, print credentials or cookies, install dependencies, configure providers, execute database statements, apply migrations, deploy, commit or push through this Playbook. Those operations require separate explicit authorization and tools. `EXPLAIN ANALYZE` executes its statement and can have side effects; even a SELECT can invoke mutating functions.

Data Foundation drafts constraints and policies. Security Review evaluates the access design before Quality Review checks the authorized implementation. React Foundation owns component and loader integration. Search Foundation owns retrieval behavior and evaluation when available. Project Planning records unresolved product decisions. If a required Specialist is unavailable, identify the missing review and continue only the independent work. Do not claim a dispatch or acceptance that did not occur.

Follow the [edition boundaries](../../references/edition-boundaries.md). The [paired Specialist](../../agents/data-foundation.md) uses the same local scope. If delegation is unavailable, follow this Playbook directly and report direct use.
