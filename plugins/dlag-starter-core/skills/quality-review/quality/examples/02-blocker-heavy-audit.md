# Example 02, Blocker-Heavy Audit

> Constructed source-review teaching specimen, NOT_RUN for any real app/provider. These are expected report forms, not actual Security/Quality review receipts. Referenced project paths/lines are illustrative. A positive source assessment assumes the full stipulated source and matching Security evidence; it cannot establish runtime or release readiness.

Demonstrates an implementation with multiple Critical findings (plan gaps, an N+1 dataset read, a scope-filter leak) and several Warnings. Illustrates the report at its most impactful: dense, specific, and prioritized.

**Illustrates guides:** `03-cross-reference-audit.md` (thorough traceability), `04-five-axis-evaluation.md` (multiple axes failing), `05-severity-classification.md` (Critical vs. Warning judgment), `07-common-gaps.md` (scope filter, N+1, missing gate).

---

## Input, Plan document excerpt

Plan file: `library/requirements/<lifecycle>/prd-013-library-search/prd-013-library-search-index.md`

```markdown
# PRD: Library Search (Phase 3)

## Goal
Let a user search the library corpus and get ranked results. Part of the retrieval rollout.

## User Stories
- US-1: As a user, I run `the application search route "<query>"` and see ranked entries with title, path, and score.
- US-2: As a user, I open a result to view its full entry.
- US-3: As a user, results respect the public/private split of the library.
- US-4: As a user, when the accepted optional dependency is disabled the search falls back to the accepted fallback automatically and labels the result mode.

## Acceptance Criteria
- AC-1: Search is scoped to the requested library partition (public vs private); private entries never leak into a public search.
- AC-2: Only the required server authorization gate-approved query path reaches the dataset; raw queries are validated first.
- AC-3: Empty-result message shown when nothing matches.
- AC-4: Results are capped (20 per call, cursor-based).

## Non-Goals
- NG-1: No reprocessing of the corpus in this phase.
- NG-2: No changes to the unrequested maintenance lifecycle.
```

## Constructed repository and security assumptions

The repository methods in the excerpt are a hypothetical local interface, not copy-ready Supabase SDK calls. For this scenario only, its implementation is expressly stipulated to use unrestricted privileged reads across private/public rows, with no database-policy safeguard. That extra source assumption makes the scope-leak finding supported; a missing filter alone would not establish an actual leak if the real query or RLS policy were unknown. Matching Security evidence must exist before an actual final Quality verdict. Source snippets and this expected report demonstrate findings, not execution.

## Input, Diff (summary)

```
A  app/routes/search.tsx
A  app/routes/search-result.tsx
A  src/search/format-result.ts
A  app/services/search.server.ts
A  app/services/unrequested-maintenance.server.ts        <- out-of-scope
M  supabase/migrations/[actual-migration].sql
```

Key excerpts (abridged):

**`app/services/search.server.ts`**
```ts
export async function search(query: string) {
  const hits = await repository.search({ text: query });   // no partition filter, no limit
  return Promise.all(
    hits.map(async (h) => ({
      ...h,
      entry: await repository.get(h.id),                   // one read per hit (N+1)
    }))
  );
}

export async function onOptionalServiceUnavailable() {
  logger.warn("optional service unavailable");
  // TODO: accepted degraded-mode behavior
}
```

**`app/routes/search.tsx`**
```ts
export async function searchCommand(query: string) {
  const results = await search(query);
  for (const r of results) {
    process.stdout.write(formatResult(r) + "\n");
  }
}
```

**`app/routes/search-result.tsx`**, no partition/visibility check.

**`app/services/unrequested-maintenance.server.ts`**, 52 lines restarting the unrequested processing service, violating NG-2.

---

## Output, QA Report

Written to `library/requirements/<lifecycle>/prd-013-library-search/qa/2026-04-24-qa-report.md`.

```markdown
# QA Report: feature-013 Library Search

**Plan document:** `library/requirements/<lifecycle>/prd-013-library-search/prd-013-library-search-index.md`
**Audit date:** 2026-04-24
**Base branch:** `main`
**Head:** `feat/library-search`
**Auditor:** Quality Review

## Summary

The library-search implementation has three Critical blockers that must be addressed before merge: a partition-scoping gap that leaks private entries into public search (AC-1), a missing gate/validation on the query path (AC-2), and the accepted degraded-mode behavior from US-4 is entirely absent. Four Warnings surfaced in addition, including an N+1 dataset read on the result path and an out-of-scope daemon-restart file that violates NG-2. The supplied source shows the listed gaps; no ranking/runtime success was observed, and final readiness is not established.

## Scorecard

| Category      | Status | Notes |
|---------------|--------|-------|
| Completeness  | ❌ | US-4 accepted degraded-mode behavior absent; AC-4 cursor capping not implemented |
| Correctness   | ❌ | Partition scoping missing, correctness of the public/private split compromised |
| Alignment     | ⚠️ | Out-of-scope daemon-restart file added (NG-2 violation) |
| Gaps          | ❌ | No gate/validation, no empty-result message, no error path on dataset read |
| Detrimental   | ⚠️ | N+1 dataset read on result path; no capping; dead TODO in fallback handler |

## Critical Issues (must fix)

- [ ] **Partition leak, search is not scoped to the requested public/private partition (AC-1)**, `app/services/search.server.ts:2`

  `repository.search({ text: query })` searches every entry, public and private, not just the requested partition. This leaks private library entries into a public search. AC-1 explicitly requires the partition split to hold.

  Suggested: derive authorized owner/partition scope after actual Worker identity and permission checks, then enforce it in the query and the real database policies. Never treat a caller-provided private visibility flag as authorization. Inspect the actual repository/RLS contract before recommending exact SDK syntax.

  ```ts
  export async function search(query: string) {
    const hits = await repository.search({ text: query });   // <- missing where: { visibility }
  ```

- [ ] **Missing gate and validation on the query path (AC-2)**, `app/routes/search-result.tsx:1-24`

  The result path reaches the dataset with the raw query string and never routes through the required server authorization gate or validates the input. A crafted query can reach the dataset unchecked.

  Suggested: validate the query with the shared `zod`/`valibot` schema and route the call through the gate before it reaches `repository.search`.

- [ ] **US-4 accepted degraded-mode behavior not implemented**, `app/services/search.server.ts:14-17`

  The `onOptionalServiceUnavailable` handler logs and returns. No accepted degraded-mode operation runs, so search returns nothing when the accepted optional dependency is disabled. This is a core plan requirement, not an edge case.

  Suggested: call the accepted alternative over the library corpus and label the result mode `degraded`.

  ```ts
  export async function onOptionalServiceUnavailable() {
    logger.warn("optional service unavailable");
    // TODO: accepted degraded-mode behavior   <- entire requirement lives in this TODO
  }
  ```

## Warnings (should fix)

- [ ] **N+1 dataset read on result path**, `app/services/search.server.ts:2-8`

  The result path runs one query for hits and then one `repository.get` per hit. For 200 hits, this is 201 dataset reads.

  Suggested: replace the `Promise.all(...map)` pattern with a single batched read that returns the full entry inline.

- [ ] **Missing result capping (AC-4)**, `app/services/search.server.ts:2`

  `repository.search` returns the full result set. AC-4 specifies 20 per call with a cursor.

  Suggested: accept `{ cursor, take: 20 }` args, return `{ items, nextCursor }`.

- [ ] **Out-of-scope daemon-restart flow (NG-2 violation)**, `app/services/unrequested-maintenance.server.ts:1-52`

  NG-2 explicitly excludes changes to the unrequested maintenance lifecycle in this phase. A full 52-line daemon-restart implementation landed in this PR.

  Suggested: remove the file, or open a scope-amendment PRD with `Project Notebook` if daemon changes are now desired for this phase.

- [ ] **Missing empty-result message (AC-3)**, `app/routes/search.tsx:1-7`

  AC-3 calls for an empty-result message when nothing matches. The current command prints nothing.

  Suggested: branch on `results.length === 0` and print a "No matches" message.

## Suggestions (consider improving)

- [ ] **Extract the optional processing-state handler to a thin adapter**, `app/services/search.server.ts:14-17`

  Once the fallback logic lands, the handler will carry non-trivial branching. Consider moving the optional processing-availability knowledge to a separate `optional processing-state.ts` adapter and keep `search-service.ts` ranking-agnostic.

## Plan Item Traceability

| #    | Plan Requirement                                    | Status | Implementation Location                              | Notes |
|------|-----------------------------------------------------|--------|-------------------------------------------------------|-------|
| US-1 | User runs search, sees ranked entries               | ⚠️ | `app/routes/search.tsx:1-7`                  | Renders, but with partition leak and N+1 |
| US-2 | User opens a result to view the entry               | ⚠️ | `app/routes/search-result.tsx:1-24`                   | Works, but no gate/validation |
| US-3 | Results respect public/private split                | ❌ | `app/services/search.server.ts:2`                   | No partition filter |
| US-4 | accepted degraded-mode behavior when optional processing off                   | ❌ | `app/services/search.server.ts:14-17`               | TODO only, not implemented |
| AC-1 | Search scoped to requested partition                | ❌ | `app/services/search.server.ts:2`                   | No partition filter |
| AC-2 | Query path gated and validated                      | ❌ | `app/routes/search-result.tsx`                        | No gate, no validation |
| AC-3 | Empty-result message                                | ❌ | `app/routes/search.tsx`                     | Prints nothing |
| AC-4 | Capping (20/call, cursor-based)                     | ❌ | `app/services/search.server.ts:2`                   | No capping |
| NG-1 | No reprocessing of the corpus                       | ✅ |,                                                    | Honored |
| NG-2 | No unrequested maintenance lifecycle changes              | ❌ | `app/services/unrequested-maintenance.server.ts:1-52`            | Violated, 52-line daemon restart added |

## Files Changed

- `app/routes/search-result.tsx` (A), result detail view; missing gate/validation (AC-2 gap)
- `src/search/format-result.ts` (A), result formatter; US-1 ✅
- `app/routes/search.tsx` (A), CLI command; empty-result message absent, partition leak inherited from service
- `app/services/unrequested-maintenance.server.ts` (A), out-of-scope daemon restart (NG-2 violation)
- `app/services/search.server.ts` (A), central service; three Critical issues and one Warning live here
- `supabase/migrations/[actual-migration].sql` (M), adds the search index tensor to the Supabase PostgreSQL schema
```

---

## Why the audit looks this way

- **Three Criticals, four Warnings.** Each Critical matches a bullet in the `05-severity-classification.md` decision tree (plan requirement missing, data-correctness risk, plan requirement absent). Each Warning is "should fix", non-hot-path N+1, scope creep, implied gap.
- **Partition leak is Critical, not Warning**, per `07-common-gaps.md`, a scope-filter violation that mixes private and public data is always Critical.
- **Daemon restart is Warning, not Critical.** The code itself works; it just violates a non-goal. If the restart code were broken, severity would escalate.
- **The report names each axis even though three have failed**, no silent passes (`00-principles.md`).
- **Traceability table includes both NG rows.** One is Pass, one is Fail, so scope auditing is visible.
