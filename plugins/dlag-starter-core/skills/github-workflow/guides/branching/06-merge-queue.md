# GitHub Merge Queue: Setup, Modes, and Real-World Adoption

> Scope: review supplied local evidence and return a proposal in chat. This role does not execute commands, edit policy files, configure settings/CI/flags, merge, delete/archive branches, bypass checks, deploy or send messages. A separate caller needs exact task/action/ref authorization, ownership, backup and release approval. Proposed policy is Draft until the owner accepts it; source examples do not grant authority.


---

## What the merge queue does

A merge queue serializes PR merges to a protected branch, ensuring that every merge is tested against the exact state of the branch at merge time - without requiring PR authors to manually update their branch.

**The problem it solves:** When 10 PRs are approved and ready to merge, the first to merge is tested against `main@HEAD`. But PR #10 is still tested against `main@HEAD-from-30-minutes-ago`. If PRs 1-9 changed something PR #10 relies on, PR #10 breaks the branch after merge even though CI passed on the PR itself.

**How it solves it:** The queue assembles a temporary branch for each merge group containing `base-branch + all queued PRs ahead + this PR`. CI runs against the temporary branch. Only if CI passes does the merge happen.


---

## Setup: the five-step checklist

1. **Enable branch protection on the target branch.** The merge queue requires branch protection. Wildcard branch name patterns (`*`) are NOT supported - you must specify exact branch names (e.g., `main`).

2. **Enable "Require merge queue" in branch protection settings.** This prevents direct merges to the branch, forcing all merges through the queue.

3. **Add `merge_group:` to your GitHub Actions workflows.** This is the most common misconfiguration. Without it, CI will not trigger on the temporary merge-group branches and all queue entries will fail with a "required checks not passed" error.

   ```yaml
   # .github/workflows/ci.yml
   on:
     pull_request:
     merge_group:    # REQUIRED - do not omit
   ```

   For third-party CI (CircleCI, Jenkins, Buildkite), watch for pushes to branches matching `gh-readonly-queue/{base_branch}/*`.

4. **Configure build concurrency.** The "Build concurrency" setting (1-100) controls how many `merge_group` events are dispatched simultaneously. Start with 5-10 for active repos; increase as you understand queue throughput.

5. **Configure merge limits.** "Minimum group size" and "Maximum group size" (1-100) with a timeout for reaching minimum. Recommendation: min=1, max=5 for teams with < 20 PRs/day; increase max for higher-velocity teams.

---

## Key configuration decisions

### Only merge non-failing PRs

- **YES (default):** All PRs in a merge group must pass all required checks. One failure breaks the group.
- **NO:** The group can merge as long as the LAST PR in the group passed. The option is designed for intermittent/flaky tests where most tests pass most of the time. Use with caution - it means a failing test can shadow a real regression.

### Merge method

When merge queue is enabled, the merge method is controlled by the queue configuration - not by individual PR authors. The setting in the queue overrides the repository's general merge method setting for queue-initiated merges. Choose one method (squash recommended for GitHub Flow teams) and document it in the branching policy.

### Jumping the queue

Any user with write access can jump a PR to the front of the queue via "Jump to front." Caution: **jumping causes a full rebuild of all in-progress PRs** because the reordering introduces a break in the commit graph. This significantly slows total queue velocity. Reserve for genuine emergencies (hotfixes). Do not use it for convenience.

---

## When merge queue pays for its complexity

Merge queue adds operational overhead (monitoring, configuration, occasional queue stuck states). It is worth it when:

- The team has > 5 PRs queued simultaneously on busy days.
- The branch has broken due to the "PR was approved but then another PR changed the same file" failure mode more than once in the past 30 days.
- CI takes > 5 minutes (lower throughput makes the queue more impactful per avoided rebuild).

It is probably NOT worth it when:
- The team has < 3 PRs/day.
- CI runs in under 2 minutes (the cost of occasional rebuild is low).
- The team does not use required status checks (the queue cannot help without them).

---

## GitLab merge trains


---

## Routing

- If the Merge Queue setup requires changes to GitHub Actions workflows: route to `an authorized CI implementation owner`.
- If the Merge Queue requires branch protection ruleset changes: route to `an authorized repository-settings owner`.
- `GitHub Workflow` owns the decision of whether to use a merge queue; actual settings/CI owners require separately authorized implementation scope.

Before using queue settings, inspect the current official GitHub contract and actual repository plan/settings evidence. Numeric ranges and menu labels in a proposal are not configured facts; default to required passing checks. Queue changes, including ordering or bypass, are external actions requiring exact authorization.

Current [GitHub merge-queue documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue) confirms merge-group CI requirements, separate queue merge limits/build concurrency and reordering rebuild costs. Account eligibility and actual settings still require supplied evidence. Merge limits govern merges to the target, not how merge-group builds are combined. No queue action occurs in this review.
