# 02 - Branch Protection and Rulesets Audit

> Evidence-only audit: this role uses supplied local files and dated owner-provided settings/API/run exports. It does not execute Git/gh/shell, authenticate, request tokens, contact GitHub, run workflows, inspect credentials, write reports/settings or apply fixes. Commands and API shapes below are proposals for a separate authorized collection owner. Missing evidence is unknown/N/A, never proof of an absent or perfect control. Examples are illustrative, not actual repository findings.


## Context: classic branch protection and rulesets

Inspect which protections actually apply to the exact target branch, including active rulesets, classic rules, required reviews/checks, bypass actors and organization inheritance. The presence of a ruleset definition does not prove active enforcement or that all actors are constrained. Product/version/plan availability requires supplied current evidence; no release-year assertion substitutes for it.

## Data collection

```bash
# List rulesets (modern)
gh api /repos/{owner}/{repo}/rulesets --jq '.[] | {id, name, enforcement, target}'

# Check rules active on a branch
gh api /repos/{owner}/{repo}/rules/branches/main

# Legacy branch protection (fallback)
gh api /repos/{owner}/{repo}/branches/main/protection
```

## 2026 minimum floor (default branch)

| Rule | Minimum | Nice-to-have |
|---|---|---|
| `required_pull_request` | Required (1+ reviewer) | 2 reviewers for teams > 3 |
| `required_status_checks` | Lint + test + build | Add security-scan stage |
| `non_fast_forward` (block force push) | Required | |
| `dismiss_stale_reviews` | Required | |
| `required_linear_history` | Nice-to-have | Enforces clean history |
| `required_signatures` | Nice-to-have | GPG/SSH signed commits |
| `branch_name_pattern` | Nice-to-have | Enforce naming convention |

## Scoring rubric

| Points | Condition |
|---|---|
| 10 | All minimum rules + 2+ nice-to-have |
| 8 | All minimum rules |
| 6 | `required_pull_request` + `required_status_checks` only |
| 4 | `required_pull_request` only |
| 2 | Observed partial/inactive rule definition exists, but required PR/check enforcement is absent |
| 0 | Supplied current evidence confirms no branch protection/ruleset in the declared scope |

## Report section template

```markdown
### Branch Protection / Rulesets (Score: X/10)

**Enforcement mechanism:** GitHub Rulesets (modern) / Legacy branch protection rules / None

**Default branch (`main`) ruleset:**
| Rule | Status | Notes |
|---|---|---|
| required_pull_request | ✅ Enabled (2 reviewers) | |
| required_status_checks | ✅ Enabled (lint, test, build) | Missing security-scan |
| non_fast_forward | ✅ Enabled | |
| dismiss_stale_reviews | ⚠️ Disabled | Recommend enabling |
| required_linear_history | ❌ Disabled | Low-effort improvement |
| required_signatures | ❌ Disabled | Consider for regulated environments |

**Bypass actors:** @org/platform-leads (admin bypass)

**Findings:**
- RECOMMEND: Enable `dismiss_stale_reviews` - takes 2 minutes in Settings > Branches.
- CONSIDER: Enable `required_linear_history` to enforce clean merge history.
```

## Handoffs

- Required status check gaps (missing CI stages): surface finding, hand to `the authorized CI implementation owner` for CI architecture.
- Force-push incident investigation: hand the finding to Security Review; actual incident response requires its own authorization.

The 2/0 distinction requires observed control state; missing settings/API evidence is N/A. An inactive/partial definition is not active protection. Score current policy evidence, not a historical configuration file or an inferred product release date.
