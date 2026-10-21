# Migration Playbook: Moving Between Branching Models

> Scope: review supplied local evidence and return a proposal in chat. This role does not execute commands, edit policy files, configure settings/CI/flags, merge, delete/archive branches, bypass checks, deploy or send messages. A separate caller needs exact task/action/ref authorization, ownership, backup and release approval. Proposed policy is Draft until the owner accepts it; source examples do not grant authority.



---

## Key principle: migrate shipping teams without stopping ships

The golden rule of branching model migration: **the team keeps deploying throughout the migration.** Any migration plan that requires a "feature freeze" of more than one sprint is too aggressive.

The migration is a series of incrementally tightened constraints, not a flag-day cutover.

---

## Migration 1: Ad-hoc / no model → GitHub Flow

This is the most common migration. The team has no formal branching conventions and wants to establish GitHub Flow.

**Duration:** estimate from the actual team, open branches and authorization; no fixed migration time is promised.

**Steps:**

1. **Enable main branch protection.** Require PR reviews before merge. Block force-pushes to main. Route the ruleset configuration to `an authorized repository-settings owner`.
2. **Agree on branch naming conventions.** `feat/`, `fix/`, `chore/`, `hotfix/` prefixes. Enforce with a branch naming lint in CI or a repository ruleset.
3. **Enable squash-merge only** in the repository settings. Disable "Allow merge commits" and "Allow rebase merging" to prevent mixed histories.
4. **Delete branches on merge.** Enable the GitHub "Automatically delete head branches" setting to prevent abandoned branches from accumulating.
5. **Hold a short team sync.** Walk through one example PR end-to-end with the new model. Answer "what do we do if the branch is older than 2 days?" before the first violation happens.

---

## Migration 2: GitFlow → GitHub Flow (most common painful migration)

**Duration:** unknown until the current work and release obligations are inspected.

**Steps:**

1. **Stop creating new `feature/` branches from `develop`.** New feature work starts from `main` with the 2-day branch-lifetime target.
2. **Shorten existing branches.** Review all open feature branches. If any branch is > 5 days old, split it: merge what is ready (behind a feature flag if incomplete), and re-scope the remainder as a smaller next branch.
3. **Introduce feature flags** for any in-progress work that cannot merge in its current state. This is the prerequisite for Step 1 to work.
4. **Merge `develop` into `main` when it is empty.** Once all feature branches have migrated to start from `main`, prepare the accepted final integration after proving all unique history/work is preserved; retire the ref only through an explicit approved action. This is the flag-day moment - coordinate with the release team.
5. **Choose one retirement outcome.** Keep the existing ref protected/read-only by proposal, or propose a separately authorized archive/rename/deletion after exact backups, unique-work evidence and active ownership are resolved. Do not both delete and archive the same ref. No ref or setting changes occur here.

*Source: "Gradually shorten feature branch lifetimes. Introduce feature flags for incomplete work. Merge develop into main and delete develop once the team is comfortable." - the applicable dated source evidence*

**Handle the `release/` and `hotfix/` branches:**
- Existing `release/X.Y.Z` branches: let them complete their current lifecycle normally. Do not merge them to main early.
- After the migration, use the hotfix-as-fast-track-PR model (see `guides/02-release-and-hotfix.md`).

---

## Migration 3: GitHub Flow → Trunk-Based Development

**Prerequisites (must all be true before starting):**

- Feature flag infrastructure is live and the team uses it for ≥ 1 feature already.
- CI runs in < 10 minutes reliably.
- The team is comfortable with the GitHub Flow model (merge conflicts are rare, PRs are small).

**Steps:**

1. **Set a branch-age target of 1 day.** Not 2 - 1. This is the discipline shift that makes TBD real.
2. **Add a branch-age CI check.** Fail the PR (or add a warning comment) if the branch creation date is > 1 day old. This is the fastest feedback loop.
3. **Pair feature flags with every feature that spans > 1 day.** The pattern: merge the first increment behind a flag on day 1, continue on a new branch on day 2.
4. **Preserve reviewed changes.** Starter keeps small reviewed PRs to the accepted target branch. Do not use a trunk-based label to bypass review or protection for typos, configuration or dependencies. An owner-approved policy exception is a separate decision.
5. **Enforce CI on every commit to main.** Direct commits mean your main protection must be extremely strong: required CI checks that cannot be bypassed by admins for new commits.

*"The three disciplines of TBD: (1) Every engineer merges to main at least daily. (2) Feature flags gate incomplete work. (3) CI is the gatekeeper - no human can merge failing code." - the applicable dated source evidence*

---

## Common migration failure modes

| Failure mode | Root cause | Fix |
|---|---|---|
| "We migrated but our branches are still old" | Team adopted the name but not the 2-day constraint | Add branch-age enforcement to CI; make the constraint visible and automatic |
| "We can't merge because the feature isn't done" | Features are too large for the new model | Split features at PR boundaries; use feature flags for incomplete work |
| "We went back to GitFlow after two weeks" | Migration started without team buy-in | Re-run the team sync; make the constraints visible as CI checks, not social norms |
| "`develop` was deleted but now hotfixes are confusing" | Hotfix protocol not established before migration | Implement fast-track PR hotfix process per `guides/02-release-and-hotfix.md` before deleting `develop` |
