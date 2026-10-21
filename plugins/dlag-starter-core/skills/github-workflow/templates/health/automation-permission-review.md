# Automation and permission review worksheet

> Evidence-only audit: this role uses supplied local files and dated owner-provided settings/API/run exports. It does not execute Git/gh/shell, authenticate, request tokens, contact GitHub, run workflows, inspect credentials, write reports/settings or apply fixes. Commands and API shapes below are proposals for a separate authorized collection owner. Missing evidence is unknown/N/A, never proof of an absent or perfect control. Examples are illustrative, not actual repository findings.

Data collection mode: local clone / supplied evidence / authorized read-only API.
Review date, repository/product/version, source revision:
Coverage gaps (live rules, organization policy, environment, provider, runners):
No workflows/scripts/artifacts executed; no settings changed:

| Job and exact source path:lines | Event and filters | Workflow source revision | Checkout/fetch repository and SHA | Who controls executable code/config/dependencies? |
|---|---|---|---|---|
| | | | | |

| Job | Workflow/job token grants and effective-default evidence | Secret names/scopes only | Environment protections/bypass evidence | OIDC request and provider trust evidence |
|---|---|---|---|---|
| | | | | |

| Boundary | Producer repository/ref/SHA/run | Consumer authority | Artifact selection/digest and execution | Cache scope/restore/access | Runner reuse/isolation/network evidence |
|---|---|---|---|---|---|
| | | | | | |

| Candidate SHA/ref | Run ID/attempt and workflow revision | Required name/expected App | Conclusion and skip/cancellation reason | Executed stages | Missing candidate proof |
|---|---|---|---|---|---|
| | | | | | |

| Finding | Evidence and archive/settings URL | Observed / supplied / inferred | Boundary and implication | Confidence/gaps | Impact | Effort | Impact/effort | Owner |
|---|---|---|---|---|---|---|---|---|
| | | | | | | | | |

Eight-dimension score if full audit: each dimension scored or N/A; assessed weight; full or partial formula; scoped review may be unscored. Never claim passing tests from skipped success, verified cloud policy from id-token permission, or safe automation from event name alone.
