# 03 - Small PR Discipline

> Local review scope: inspect supplied diff/description/timeline exports and return draft descriptions, checklists, coached comments or findings in chat. Do not execute commands, call GitHub APIs, post comments, approve/merge, configure settings, install dependencies or save files through this read-only role. Example people, issues and checks are illustrative, not actual test or publication evidence. A separate authorized caller owns any external action.

The 400-line threshold, split strategies, the trunk-based discipline, and how AI-assisted coding has made small PRs more urgent in 2025-2026.


---

## Review-size evidence

The 400-line threshold is a configurable review heuristic. It is not a measured guarantee about defect detection, working memory or AI review cost. Inspect logical scope, testability, dependencies and mechanical/generated portions before proposing a split. A large atomic migration may need a documented exception; a small security-sensitive diff may need deep review.

## Canonical size signals

Flag a PR when ANY of the following is true:

| Signal | Threshold | Action |
|---|---|---|
| Changed lines | > 400 | Flag; suggest splits |
| Unrelated logical concerns | > 3 | Flag; suggest split by concern |
| Files changed | > 20 | Audit for mixed concerns |
| Expected review time | > 60 minutes | Recommend scheduling a sync review session |
| Separate service boundaries crossed | > 1 | Split by service unless migration requires cross-boundary change |

The 400-line threshold is the default. It can be lowered to 300 for security-critical code or raised to 600 for mechanical refactors (e.g., automated renaming, whitespace normalization) where defect risk is low.

---

## Split strategies

### Split by logical concern

The most common fix. Each split PR addresses one independent logical change.

**Anti-pattern:** A single PR adds a new feature, refactors a shared utility, and updates the test harness.

**Fix:**
1. PR A: refactor the shared utility (no behavior change; easiest to review)
2. PR B: add the new feature using the refactored utility (depends on A)
3. PR C: update the test harness (depends on B; or merge with B if small)

Submit PRs in order. Mark each with `depends on #<N>` in the description.

### Split by service boundary

When a change touches multiple services or packages in a monorepo, split along the service boundary. This allows each service's owners to review only their scope.

### Split using feature flags

For large features that cannot be reviewed in a single PR without context, use a feature flag to ship the infrastructure first (behind the flag) and the activation second. Allows incremental review without feature-flag debt accumulating.

**Pattern:**
1. PR A: Add infrastructure behind `feature_flag_name = false` (reviewable without knowing the full feature)
2. PR B: Implement behavior; still gated by flag
3. PR C: Enable the flag (1-line PR; easiest to review)

### Split by layer

For full-stack changes, split into a backend PR and a frontend PR. This allows backend and frontend reviewers to work in parallel and reduces context-switching for generalist reviewers.

---

## Trunk-based development and small PRs

Short-lived feature branches (1-2 days) are the structural enforcement of small PRs. Long-lived branches are almost always associated with large PRs because developers defer the "split the PR" problem until it becomes a "resolve 200 merge conflicts" problem.

**Trunk-based checklist for the reviewer:**

- [ ] Branch is less than 2 days old? If not, flag for merge or split.
- [ ] Diff is against `main`/`trunk` directly? Stacking on other feature branches creates hidden size.
- [ ] All CI checks pass on trunk at the point the branch was cut? If not, the PR review will be contaminated by pre-existing failures.


---

## How the reviewer flags a large PR

When a PR exceeds a threshold, the reviewer's output is:

```text
🔔 PR size flag
Lines changed: 643 (threshold: 400)
Logical concerns identified: 4

Suggested splits:
  - PR A: extract `useAuthContext` hook (45 lines) - no behavioral change
  - PR B: add token-refresh logic using the new hook (280 lines)
  - PR C: update E2E auth tests (120 lines)
  - PR D: update documentation (50 lines)

Splitting PRs A + B would bring each under 300 lines. Merging C+D with B is acceptable (total: 450 lines).
```

The reviewer never blocks the PR based on size alone. It flags the risk and proposes splits. The human decides.
