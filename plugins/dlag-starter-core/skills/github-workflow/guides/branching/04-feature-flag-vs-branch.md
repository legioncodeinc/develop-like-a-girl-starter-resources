# Feature Flag vs Feature Branch: The Decision Framework

> Scope: review supplied local evidence and return a proposal in chat. This role does not execute commands, edit policy files, configure settings/CI/flags, merge, delete/archive branches, bypass checks, deploy or send messages. A separate caller needs exact task/action/ref authorization, ownership, backup and release approval. Proposed policy is Draft until the owner accepts it; source examples do not grant authority.


**Example:** `examples/edge-case-gitflow-justified.md` (contrasting scenario)

---

## The core rule

> If a feature cannot be merged to `main` in ≤ 2 working days, first split the scope or evaluate a release flag; do not automatically add a flag platform or extend a branch indefinitely.

The inverse is NOT "therefore all features need feature flags." Short-lived branches (≤ 2 days) that are reviewed and merged cleanly are fine without flags.

---

## The long-lived-branch trap (formalized)

A long-lived branch exhibits the following failure mode:

1. Feature starts on a branch. Day 1: clean diff, no conflicts.
2. Other engineers merge work to main. Day 3: first conflicts appear.
3. More merges happen. Day 5: the branch owner spends half a day on merge resolution.
4. The feature is still not done. Day 8: the branch is now "risky to touch" - no one is sure what the full impact of merging is. The branch is put on ice.
5. Eventually, a big-bang merge creates a production incident.

Older diverging branches can make integration harder; actual conflict risk depends on overlapping work and team cadence. - the applicable dated source evidence

The trap is caused by feature scope, not the branch model. The branch model is just where the symptoms appear.

---

## Feature flag taxonomy (Fowler/Hodgson)

The canonical four-category framework from Pete Hodgson's article on martinfowler.com (the applicable dated source evidence):

| Type | Purpose | Expected lifetime | Cleanup discipline |
|---|---|---|---|
| **Release toggle** | Deploy incomplete features to production hidden from users | Days to weeks | Remove within 2 weeks of full rollout - MANDATORY |
| **Experiment toggle** | A/B or multivariate testing | Days to weeks | Remove when experiment concludes |
| **Ops toggle** | Kill switches, circuit breakers, operational behavior control | Weeks to months | Remove when the operational risk it guards against is resolved |
| **Permission toggle** | Gate features by user role, plan tier, or beta group | Potentially permanent | Manage as a product feature, not technical debt |

**Management rule:** Release and Experiment toggles are transient - clean up aggressively. Ops and Permission toggles are longer-lived - manage as product configuration.

---

## Six-dimension comparison table

| Dimension | Feature branch | Feature flag |
|---|---|---|
| **Isolation mechanism** | Git branch | Runtime toggle |
| **Merge cost** | Grows with branch lifetime | Near zero (code ships to main immediately) |
| **Partial rollout** | Not possible | Percentage rollout, user targeting |
| **Rollback speed** | Revert commit + redeploy (minutes) | Toggle off in seconds |
| **Technical debt** | Branch divergence (resolved on merge) | Stale flags in codebase (ongoing) |
| **Schema change support** | Full - any migration runs on merge | Limited - non-additive changes cannot be hidden behind a flag |

*Adapted from the applicable dated source evidence*

---

## The real costs of feature flags (honest accounting)

Most vendor-authored content underplays flag costs. The research corpus provides the corrective:

**From the applicable dated source evidence (Kevin Berridge):**

1. **Schema changes that are non-additive cannot be hidden behind a flag.** If your feature requires dropping a column, renaming a field, or changing a table constraint, the database change cannot be wrapped in a runtime toggle. You need a two-phase migration (expand: add new column → migrate data → contract: remove old column) regardless of flags.

2. **Every independent flag adds on/off states; interacting flags can increase the combination matrix.** The code must work with the flag on AND with the flag off. If you have 5 flags, your test matrix can be up to 2^5 = 32 combinations. Testing only all-on/all-off is insufficient when interacting flags share a code path. Identify risk-relevant combinations and denied/access states as well as each flag's on/off behavior.

3. **Cleanup cost is real and is systematically underestimated.** The average Release toggle lives 3-5x longer than teams plan for. Stale flag paths cause production incidents when engineers assume a flag is always-true and remove the conditional without checking the flag status in production.

**Recommendation:** Require a cleanup ticket to be created BEFORE the flag is turned on in production, linked to the flag's name in the flag management system. When the flag reaches full rollout, the ticket moves to the next sprint.

---

## Decision matrix: when to use a flag vs a branch

| Scenario | Recommendation |
|---|---|
| Feature is complete, < 2 working days of work | Short-lived branch; no flag needed |
| Feature is large (> 2 days), can be built incrementally | Feature flag (Release type); merge partial work behind flag |
| Feature requires a non-additive schema change | Branch + phased migration; flag cannot help with the schema change itself |
| Team needs to A/B test a user experience | Experiment flag; no branch needed after initial feature ship |
| Platform/kill-switch behavior control | Ops flag; always a flag, never a branch |
| Premium feature / plan tier gating | Server-enforced entitlement/permission policy; an optional display flag is not authorization |
| Hotfix for a production bug | Fast-track reviewed PR with required checks; existing kill switches may mitigate only within approved response scope |

---

## Feature flag platform selection


The decision principle that applies regardless of platform: a flag is only as clean as its lifecycle management. A flag system with no cleanup process will accumulate debt faster than long-lived branches ever did.

No flag provider is selected by Starter. UI visibility is not record/file/payment permission; enforce customer ownership and entitlement server-side in Workers and the accepted database design. Schema expansion/backfill/contract needs a reviewed migration plan even when UI rollout is hidden. A safe flag rollback does not reverse data writes or external side effects automatically.
