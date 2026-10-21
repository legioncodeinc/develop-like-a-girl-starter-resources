# Severity and confidence rubric

Assign severity from an actual plausible actor/input/control/effect path before proposing a correction. State confidence separately: CONFIRMED defect with evidence, HYPOTHESIS requiring a named check, or NOT REVIEWED. Do not report missing runtime proof as an observed exploit. No-count tables or uncalibrated risk percentages replace reasoning. All unresolved Medium-or-higher confirmed findings block Quality Review until corrected and re-evaluated; a human exception must be explicit, scoped and recorded rather than silently downgrading it.

## Critical

Urgent containment and an authorized implementation/custodian correction are required before proceeding.

- An issued privileged key, database credential or session-signing secret exposed to an attacker through source/history, client output, artifacts or logs.
- A reachable unauthenticated/foreign-owner read or write of sensitive tenant data, or missing identity/token verification that grants protected access.
- Reachable value-based SQL injection or an unauthorized dynamic identifier/RPC path exposing protected data or privileged effects.
- Unverified/incorrectly verified webhook input able to grant paid entitlements or another privileged effect.
- Attacker-controlled stored/reflected raw HTML reaching an SSR/browser execution sink with demonstrated severe account/data consequence.
- Session fixation or arbitrary client-controlled principal state that actually bypasses authentication/permission.

Do not infer a live issued secret from a placeholder, all-table access from a column name, or script execution in JavaScript-disabled clients. Record actual reachability and impact.

## High

Correction and candidate-specific re-evaluation are required before Quality Review.

- A private loader/action/resource route lacks a permission check enforced by its siblings, or a UI/parent-layout-only design leaves a reachable path unprotected.
- Sensitive tenant/financial data relies on a predicate convention while actual bypass paths, broad policies, privileged connection roles or missing write checks defeat the intended backstop.
- Verified intake lacks recoverable acceptance, concurrent effect protection or safe ordering, allowing lost fulfillment or duplicate financial effects.
- A meaningful lockfile/source/workflow tamper path or privileged install behavior is demonstrated; the exact origin and execution boundary matter more than a single unusual diff.
- Weak cookie/token/CSRF/redirect behavior creates a plausible account or private-data attack under the actual SDK/session design.
- Production CSP/raw HTML/telemetry exposure materially enables personal-data or account compromise.

Confirmed financial-data or PII disclosure/effect findings are at least High. Do not lower them to save time. Classify consequences and scope, not just the vendor name.

## Medium

Examples include a material missing defense or information disclosure with bounded reach: absent nosniff/framing controls for an exposed route; unqualified permanent Report-Only policy; a needed environment's missing safe secret routing; an unbounded costly/auth operation without the actual abuse protection; client-visible detailed exceptions; missing lockfile-origin review automation; or a current relevant non-High dependency advisory. Evaluate context rather than stamping the same severity onto every header or failed check.

This read-only role documents the smallest correction even if it is one line. It does not edit because the diff is small. The gate still requires resolution and actual re-evaluation of applicable Medium-or-higher issues.

## Low

Bounded hygiene with no established material attack path: an unnecessarily broad cookie path under an otherwise constrained design, a documented CSP rollout staging improvement, or outdated but currently non-vulnerable dependency evidence. “No exploit found yet” is not a reason to move a plausible High issue into Low. A confirmed higher-impact data/money consequence keeps that impact severity.

## Needs human review

For ambiguous evidence, state the competing interpretations, what each would change, and the one smallest required fact/test. Preserve a conservative provisional severity when harm could be material and mark NEEDS HUMAN REVIEW. Do not invent the result, waive an unavailable provider check, or make a legal/compliance determination from an automated/static review. Use [the report skeleton](audit-output-format.md) and [risk worksheet](../templates/security-design/risk-verification.md).
