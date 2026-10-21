# Repository-health scoring and coverage

Declare the exact audit scope, source revision/date, receiving policy and evidence collection mode before scoring. This role reads supplied files/exports only. Every finding cites a file path/line/revision or safe settings/export locator. A settings/API requirement does not authorize requesting tokens or collecting data.

| Dimension | Weight | Full rubric |
| --- | --- | --- |
| Branch protection / rulesets | 20% | [Protection](../../guides/health/02-branch-protection.md) |
| Commit quality | 15% | [Commit quality](../../guides/health/03-commit-quality.md) |
| CODEOWNERS coverage | 15% | [Ownership](../../guides/health/04-codeowners.md) |
| CI workflow density | 15% | [CI](../../guides/health/05-ci-workflows.md) |
| Documentation presence | 10% | [Docs](../../guides/health/06-docs-presence.md) |
| Repository settings | 10% | [Settings](../../guides/health/09-repo-settings.md) |
| Issue/PR templates | 8% | [Templates](../../guides/health/08-templates.md) |
| Ignore-rule coverage | 7% | [Ignore rules](../../guides/health/07-gitignore.md) |

Apply each complete 0–10 rubric to observed evidence and its stated applicability. Record deliberate project-policy exceptions; if a criterion is inapplicable, explain N/A or an explicitly labeled owner-accepted rubric adaptation rather than silently inventing a score. Report all eight dimensions. Unsupported/unavailable facts are N/A with exact missing evidence, never zero or perfect. Use the project's accepted conventions before treating an optional tool/merge choice as a defect. A scoped audit may be unscored. Branching strategy is a separate qualitative narrative. [Automation review](../../guides/health/10-review-automation-permissions.md) contributes to existing dimensions, not a ninth score, and one missing-control fact must not be deducted twice.

## Calculation

Use decimal weights summing to 1. Full coverage score is `10 × sum(score × weight)`. Assessed weight is `sum(weight for assessed dimensions)`. Partial normalized score is `10 × sum(known score × weight) / assessed weight`, clearly labeled partial with the assessed percentage and missing dimensions. With no assessed dimensions, return N/A and no numeric score. A 74% partial result at 50% assessed weight is not a 74/100 full-repository score.

Rank proposed remediation by impact divided by effort, each 1–5, with confidence, evidence, actual ownership and a specific correction. Estimates are contextual, not promised minutes. Score arithmetic does not establish that a control works, CI ran, a vulnerability exists or a fix was applied.
