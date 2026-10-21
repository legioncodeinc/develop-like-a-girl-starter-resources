# Identity implementation handoff

Project / date / reporter / project revision / environment:
Installed framework and SDK versions:
Status: Draft. Mark results only from observed evidence.

## Decision and implementation

Supabase fit and accepted sign-in methods:
Cookie topology and exact trusted origins:
MFA and recovery policy:

| Surface | Project file and line | Implemented behavior | Actual check / pending gap |
|---|---|---|---|
| Request-scoped client and binding validation | | | |
| Login initiation and PKCE verifier propagation | | | |
| Callback exchange, refusal and return allowlist | | | |
| Claims/current user validation | | | |
| Refresh/deletion cookies and final response headers | | | |
| Per-route authorization and current membership | | | |
| RLS and non-database object authorization | | | |
| Factor enrollment/challenge/verification | | | |
| Recovery request, proof and support boundary | | | |
| Logout scope, revocation and cache consumers | | | |
| Profile synchronization/provisioning if accepted | | | |

## Scope inventory

| Exact scope | Current tier/source | Feature and code location | Data retention | Justification |
|---|---|---|---|---|
| | | | | |

## Failure review

Walk every applicable row of [the failure catalog](../guides/11-common-failure-modes.md). Use pass / fail / not applicable with reason / pending.

| Concern | Status | Exact evidence or missing proof |
|---|---|---|
| Wrong/missing/replayed PKCE proof and provider state | Pending | |
| Token signature, issuer, audience, expiry and current-user requirement | Pending | |
| Unsafe callback/return destination and credential leakage | Pending | |
| Request isolation and concurrent refresh | Pending | |
| Cookies on success, redirect, refusal and thrown Response | Pending | |
| Cookie attributes match browser-SSR or server-only topology | Pending | |
| Shared CDN/cache exclusion | Pending | |
| CSRF and mutation methods | Pending | |
| Tenant/object denial through web and direct API/RLS | Pending | |
| Role/membership changes and residual access window | Pending | |
| Service/secret key exclusion from user paths and bundles | Pending | |
| MFA enrollment completion and protected factor changes | Pending | |
| Recovery evidence, generic response and abuse controls | Pending | |
| Concurrent/replayed/expired/wrong-account recovery proofs | Pending | |
| Link preview and recovery-only authority | Pending | |
| Logout/compromise response across every consumer | Pending | |
| Audit events, account-linking and safe notification | Pending | |
| Google verification and inactive-client operations | Pending | |

## Findings and handoffs

| Severity | File:line and trigger | Supporting reference | Required correction or question |
|---|---|---|---|
| | | | |

Data Foundation: schema, policies, membership indexes and atomic storage requirements.
React Foundation: accessible forms, pending/error/cancel/recovery states.
Security Review: independent abuse, session, factor and tenant isolation review.
Quality Review: accepted behavior after Security corrections.

Checks actually executed, command and output:
Native framework/provider/browser/RLS checks still pending:
Owner decisions and explicitly excluded surfaces:
