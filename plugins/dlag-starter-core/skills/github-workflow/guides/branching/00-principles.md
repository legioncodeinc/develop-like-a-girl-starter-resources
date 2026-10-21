# Principles: The Non-Negotiables

> Scope: review supplied local evidence and return a proposal in chat. This role does not execute commands, edit policy files, configure settings/CI/flags, merge, delete/archive branches, bypass checks, deploy or send messages. A separate caller needs exact task/action/ref authorization, ownership, backup and release approval. Proposed policy is Draft until the owner accepts it; source examples do not grant authority.

These principles apply on every `GitHub Workflow` invocation. They are the floor - no recommendation may violate them.


---

## 1. The 2-working-day branch-age threshold

**Rule:** Use two working days as a review trigger for active feature branches; inspect scope, dependencies, team calendar and accepted release obligations before drawing conclusions.


**What to do with it:** Name the threshold explicitly in every model recommendation. Do not soften it. When a team's branches routinely exceed 2 days, the root cause is almost always: features that are too large, missing feature flag infrastructure, or inadequate CI speed - not an inherent property of the team's branching model.

---

## 2. The four canonical models and when each is justified

| Model | Justified when | Default? |
|---|---|---|
| **GitHub Flow** | SaaS/web, ≤ 50 engineers, continuous or sprint delivery, no multi-version requirement | YES for many of teams |
| **Trunk-based development** | Feature flag infra already deployed, CI < 10 min, engineers commit daily, 50+ engineers who have outgrown GitHub Flow | NO - requires prerequisites; do not recommend without confirming them |
| **GitLab Flow** | Explicit environment promotion gates needed as first-class Git objects | NO - niche; recommend only when staging/UAT/prod promotion is the stated pain |
| **GitFlow** | Team simultaneously supports multiple live product versions AND has an external release gate (App Store, enterprise upgrade cycles) | NEVER as default - explicitly antipattern for CD/SaaS teams |


---

## 3. The merge-strategy guardrails

**Squash merge** into main/trunk is the default for feature branches:
- Produces clean, revertable main history (one commit = one feature)
- Hides in-progress "WIP" commits from the shared history
- Trade-off: loses per-commit bisect granularity for changes within the branch

**Rebase** within a local feature branch (before opening PR) is acceptable:
- Keeps branch history tidy relative to main
- Never rebase a branch that other engineers have cloned

**Merge commit** is appropriate for:
- Merging release branches back to main (preserves the audit trail that "release 2.4.0 was merged here")
- Long-running branches where per-commit history has independent audit value

**Never** mix merge strategies on the same target branch without documenting the exception. Inconsistent history makes bisect unreliable.

---

## 4. The feature-flag cost-benefit calculation

Feature flags are not free. Before recommending them as the solution to long-lived branches, acknowledge both sides:

**Benefits:**
- Deploy incomplete code to production safely
- Enable percentage rollout and instant rollback (toggle-off in seconds)
- Unblock trunk by hiding work-in-progress

**Real costs (often understated by vendors):**
- Non-additive schema changes cannot be hidden behind a flag without a dual-path migration strategy
- Every flag doubles the test matrix (code must work with flag on AND off)
- Stale flags become technical debt; average flag lifespan exceeds intended cleanup window
- Flag debt can cause production incidents when teams forget to remove old flag paths

**Rule:** Flag recommendation requires the team to commit to a cleanup SLA (typically: remove within 2 weeks of full rollout for Release flags). See `guides/04-feature-flag-vs-branch.md` for the full decision matrix.

---

## 5. "Most teams run something in between"

The research corpus (notably the applicable dated source evidence) notes: "most teams in 2026 run something between trunk-based and GitFlow: short-lived branches (1-3 days), mandatory PR review, squash merges into main, and automated deployment on merge."

Whether you call this "GitHub Flow" or "trunk-based with short-lived branches" is mostly a naming debate. The important invariants are:
1. Branches are short-lived (≤ 2 working days)
2. Every merge is reviewed (PR or pair-programming)
3. Main is always deployable
4. CI runs on every branch and must be green before merge

A team that satisfies these four invariants is in a good branching posture regardless of what they name their model.
