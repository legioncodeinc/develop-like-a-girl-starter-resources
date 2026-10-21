# Alert review and optional grade policy

## Default: evidence-backed alerts

Review high-risk observations every pass and explicitly record the outcome. An alert needs the exact capture/field, affected route, threat, confidence and justified severity. Missing CSP, HSTS or another header alone is not automatically an exploitable Critical vulnerability. Use the existing local [severity rubric](../../references/severity-rubric.md) for source-level impact judgments only when the evidence supports the relevant impact and preconditions; public response observations often remain lower-confidence hardening recommendations.

## Optional numeric reporting contract

If an owner explicitly chose a 0-6 worksheet, boolean checks use 6/1 and genuine N/A uses the owner's explicit convention. Unknown observations stay unknown. An independent customer contract may also define a grade cap when any Security leaf scores 1. Preserve that mapping if the contract actually selects it: enumerate every triggering leaf, evidence, numeric result and contractual cap, and identify who applies the final rollup. Do not call that administrative label a clinical security severity or claim it is Starter's default policy.

There is no packaged scoring owner required by this method. Without an explicit scoring contract, write score policy NOT_SELECTED and grade cap NOT_APPLIED. Do not invent a 20% weight, a C cap, other categories or a final grade.

## Placement and negative record

When an alert or selected grade cap is justified, place it ahead of the findings table and mirror every triggering row in the alert worksheet. If none is justified, record reviewed/no confirmed alert at this evidence scope. If inputs were insufficient, record incomplete rather than not-triggered. Absence of an alert file cannot establish that the check ran.

Unscored TLS/payment gaps never trigger the numerical cap as if they were scored 1. Record rejected/reframed candidates with the exact reason, including presence-only checks downgraded after context review.
