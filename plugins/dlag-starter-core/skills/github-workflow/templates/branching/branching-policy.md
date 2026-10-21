# Branching Policy - [PROJECT NAME]

> Scope: review supplied local evidence and return a proposal in chat. This role does not execute commands, edit policy files, configure settings/CI/flags, merge, delete/archive branches, bypass checks, deploy or send messages. A separate caller needs exact task/action/ref authorization, ownership, backup and release approval. Proposed policy is Draft until the owner accepts it; source examples do not grant authority.

> **Instructions for `GitHub Workflow`:** Replace every `[PLACEHOLDER]` with team-specific values. Delete sections that do not apply. Return a draft for `docs/engineering/branching-policy.md` (or equivalent). Route branch-protection ruleset changes to `an authorized repository-settings owner`.

---

**Model:** GitHub Flow (Starter default), unless an existing accepted policy or explicit owner decision names another model
**Date adopted:** [YYYY-MM-DD]
**Owner:** [Team or person responsible for enforcing this policy]
**Last reviewed:** [YYYY-MM-DD]

---

## Core rules

- `main` is always deployable. A broken main is a production incident.
- All work happens on short-lived reviewed feature branches. Any direct-target exception requires an explicit accepted policy and is not inferred from urgency.
- Target branch lifetime: ≤ [2 working days | 1 day for TBD].
- Every branch requires [1 | 2] PR review(s) before merge.
- Merge strategy: [squash-merge only | merge commit | rebase-then-merge]. Configure in repository settings.
- Delete branches on merge (enable "Automatically delete head branches" in GitHub repository settings).

---

## Branch naming conventions

| Prefix | Purpose | Example |
|---|---|---|
| `feat/` | New feature | `feat/user-search-autocomplete` |
| `fix/` | Bug fix | `fix/login-redirect-loop` |
| `chore/` | Maintenance, refactor, dependency bump | `chore/upgrade-node-20` |
| `hotfix/` | Emergency production fix | `hotfix/payment-timeout` |
| `release/` | Release stabilization (if applicable) | `release/2.4.0` |

[Delete `release/` row if team does not use release branches.]

---

## Hotfix process

[Choose one of the following based on your model:]

**GitHub Flow / TBD (fast-track PR):**
1. Open a PR to `main` with the label `hotfix`.
2. Request expedited review: minimum 1 reviewer.
3. CI must pass.
4. Request the accepted expedited merge/release process after review and checks; neither action is performed here.

**GitFlow (hotfix branch):**
1. Branch from the production tag: `git checkout -b hotfix/description vX.Y.Z`
2. Apply the minimal fix.
3. Run full CI.
4. Merge to `main` and tag (`vX.Y.Z+1`).
5. Back-merge or cherry-pick to `develop`.

---

## Release process

[Delete this section if the team deploys directly from main without a release step.]

1. **Cut release branch** from `[develop | main]` when entering release-candidate phase: `git checkout -b release/X.Y.Z`
2. **Bug fixes only** on the release branch - no new features.
3. **Back-merge every fix** from the release branch to `[develop | main]`.
4. **Tag on merge** to main: `git tag -a vX.Y.Z -m "Release X.Y.Z"`
5. **Delete after EOL.**

---

## Feature flag policy

[Populate if the team uses feature flags; delete if not.]

- Feature flags are required for any feature that cannot be merged to main in ≤ [2 working days].
- Flag types in use: [Release | Experiment | Ops | Permission] (see Fowler taxonomy).
- Cleanup SLA for Release flags: remove within [2 weeks] of full rollout. A cleanup ticket must be created BEFORE the flag is turned on in production.
- Flag mechanism: [existing accepted mechanism or not selected]; no new provider is chosen by this policy.

---

## Merge queue

[Delete if not using GitHub Merge Queue.]

- GitHub Merge Queue is enabled on `main`.
- Merge method: [squash | merge commit].
- Build concurrency: [N].
- All GitHub Actions workflows include the `merge_group:` event trigger.
- To bypass for hotfixes: follow the accepted emergency policy and current repository capability; any bypass/reordering is a separately authorized external action and does not waive required review evidence.

---

## Branch protection rules

> Route all ruleset configuration to `an authorized repository-settings owner`.

Required status checks:
- [ci-build]
- [ci-test]
- [linter] (if applicable)

Rules:
- Require PR reviews before merge: [1 | 2]
- Dismiss stale reviews on new commits: [yes | no]
- Require branches to be up to date before merging: [yes if no merge queue | no if merge queue is enabled]
- Block force-push to main: yes
- Block deletion of main: yes

---

## Model-specific addendum

[GitFlow only - delete for other models:]

### GitFlow branch map

| Branch | Source | Merges into | Lifetime |
|---|---|---|---|
| `main` | - | - | Permanent |
| `develop` | `main` | - | Permanent |
| `feature/X` | `develop` | `develop` | ≤ [2 working days] |
| `release/X.Y.Z` | `develop` | `main` + `develop` | Duration of release candidate phase |
| `hotfix/X` | `main` (tag) | `main` + `develop` | Hours |

---

*Policy authored by `GitHub Workflow`. Last forged: [YYYY-MM-DD].*
