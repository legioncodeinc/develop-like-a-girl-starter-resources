# Example 01, Happy-Path Clean Audit

> Constructed source-review teaching specimen, NOT_RUN for any real app/provider. These are expected report forms, not actual Security/Quality review receipts. Referenced project paths/lines are illustrative. A positive source assessment assumes the full stipulated source and matching Security evidence; it cannot establish runtime or release readiness.

Demonstrates a small, faithful implementation that passes the audit with one Suggestion. Illustrates the minimum viable report, even when nothing is wrong, the full structure is produced.

**Illustrates guides:** `00-principles.md` (no silent passes), `04-five-axis-evaluation.md` (all-green scorecard), `06-report-writing.md` (voice and metadata).

---

## Input, Plan document excerpt

Plan file: `library/requirements/<lifecycle>/prd-007-result-mode-label/prd-007-result-mode-label-index.md`

```markdown
# PRD: Result Mode Label

## Goal
Tag each retrieval result with the mode that produced it so callers can tell
primary results from degraded results.

## User Stories
- US-1: As a caller, I read a `mode` field on each result so that I know whether it came from optional processing or the accepted degraded-mode behavior.

## Acceptance Criteria
- AC-1.1: `mode` is `"primary"` when primary operation ran.
- AC-1.2: `mode` is `"degraded"` when the lexical ranker ran.
- AC-1.3: The field is part of the exported `SearchResult` type.

## Non-Goals
- NG-1: No new ranking logic in this phase, only labeling.
- NG-2: No changes to the unrequested processing service.

## Tasks
- [ ] Add a `tagMode` helper.
- [ ] Apply it in `rank`.
```

## Constructed scope and complete type evidence

Assume the plan and exact supplied candidate are matched by a prior Security report in this teaching scenario. The reviewed scope is a pure result-label helper, not ranking correctness, authentication, private file access or provider behavior. The hypothetical types file contains `type RankMode = "primary" | "degraded"` and `interface SearchResult { id: string; mode: RankMode }`; the caller source is supplied as part of this scenario. No runtime checks were run for this specimen. The exported type declaration, not merely a helper return annotation, supports AC-1.3.

## Input, Diff

```
A  app/services/tag-mode.server.ts
M  app/services/rank.server.ts
```

Contents of `app/services/tag-mode.server.ts`:

```ts
import type { SearchResult, RankMode } from "./types.js";

export function tagMode(results: SearchResult[], mode: RankMode): SearchResult[] {
  return results.map((r) => ({ ...r, mode }));
}
```

Excerpt of `app/services/rank.server.ts` showing the integration:

```ts
import { tagMode } from "./tag-mode.js";
// ...
const ranked = optionalServiceAvailable
  ? tagMode(await primarySearch(query), "primary")
  : tagMode(await degradedSearch(query), "degraded");
return ranked;
```

---

## Output, QA Report

Written to `library/requirements/<lifecycle>/prd-007-result-mode-label/qa/2026-04-24-qa-report.md`.

```markdown
# QA Report: feature-007 Result Mode Label

**Plan document:** `library/requirements/<lifecycle>/prd-007-result-mode-label/prd-007-result-mode-label-index.md`
**Audit date:** 2026-04-24
**Base branch:** `main`
**Head:** `feat/result-mode-label`
**Auditor:** Quality Review

## Summary

The result-mode-label implementation is complete, faithful to the plan, within the stipulated source-inspection scope; actual test/app/provider behavior is NOT_RUN. One optional Suggestion on documenting non-mutation is included but does not block merge.

## Scorecard

| Category      | Status | Notes |
|---------------|--------|-------|
| Completeness  | ✅ | The user story and all three acceptance criteria implemented |
| Correctness   | ✅ | `mode` is set correctly on both the dense and fallback paths |
| Alignment     | ✅ | Uses the exported `SearchResult` / `RankMode` types as specified |
| Gaps          | ✅ | No implicit gaps, helper is pure with no async paths |
| Detrimental   | ✅ | No such issue visible within the stipulated pure-helper source scope; broader security/runtime behavior not evaluated |

## Critical Issues (must fix)

None.

## Warnings (should fix)

None.

## Suggestions (consider improving)

- [ ] **Consider a short non-mutation contract comment**, `app/services/tag-mode.server.ts:3-5`

  The map/spread helper returns a fresh array and top-level result objects rather than changing the supplied ones. That behavior is visible in the stipulated source and the plan did not require a documentation comment. A short comment could help future callers avoid treating it as an in-place mutation. This is optional; it is not a missing type or runtime result.

## Plan Item Traceability

| #     | Plan Requirement                                          | Status | Implementation Location                     | Notes |
|-------|-----------------------------------------------------------|--------|---------------------------------------------|-------|
| US-1  | Caller reads a `mode` field on each result                | ✅     | `app/services/rank.server.ts:4-7`                 | Applied via `tagMode(...)` on both paths |
| AC-1.1| `mode` is `"primary"` when primary operation ran          | ✅     | `app/services/rank.server.ts:5`                   | `tagMode(..., "primary")` |
| AC-1.2| `mode` is `"degraded"` when lexical ran             | ✅     | `app/services/rank.server.ts:6`                   | `tagMode(..., "degraded")` |
| AC-1.3| `mode` is part of the exported `SearchResult` type      | ✅     | `app/services/types.ts:1-2`             | Returns `SearchResult[]` |
| T-1   | Add `tagMode` helper                                     | ✅     | `app/services/tag-mode.server.ts` (new)           |, |
| T-2   | Apply it in `rank`                                       | ✅     | `app/services/rank.server.ts:4-7`                 |, |
| NG-1  | Non-goal: No new ranking logic                           | ✅     |,                                           | Honored, helper only labels |
| NG-2  | Non-goal: No unrequested processing service changes                   | ✅     |,                                           | Honored, no daemon file touched |

## Files Changed

- `app/services/rank.server.ts` (M), imports `tagMode` and applies it on both the dense and fallback ranking paths
- `app/services/tag-mode.server.ts` (A), new pure helper: accepts `SearchResult[]` and a `RankMode`, returns the results with the `mode` field set
```

---

## Why the audit looks this way

- **All-green scorecard.** Every plan item maps to implementation. No regressions, no gaps, no anti-patterns.
- **Full report despite no Criticals.** Per `guides/00-principles.md` rule #4 (No silent passes), the scorecard and traceability are written out even when everything passes.
- **One Suggestion, not a Warning.** Per `guides/05-severity-classification.md`, a documentation improvement on otherwise supported source is a Suggestion, not a Warning.
- **Non-Goals traced.** Both NG rows appear in the traceability table, confirming scope was audited.
