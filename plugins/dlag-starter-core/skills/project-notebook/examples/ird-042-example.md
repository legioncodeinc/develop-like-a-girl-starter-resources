# IRD-042: Password reset link expires too quickly

> Synthetic example only, NOT_RUN. The illustrated GitHub issue #42 and target-project files must exist before creating a real IRD. Example project path: `library/issues/backlog/ird-042-password-reset-expiry/ird-042-password-reset-expiry-index.md`; QA remains in its `qa/` folder. Status: Backlog. Priority: P2. Effort: S, illustrative and unverified.

## Problem and reproduction

Observed: a user returns to an emailed recovery link after 15 minutes and the application reports expiry. Expected: this illustrative project's accepted recovery policy calls for 60 minutes, with single use, no cross-account access and preserved assurance. Reproduce with a controlled test account and the supported Supabase Auth flow after an approved test task; record callback route, request time, use time, provider response and redacted correlation. Never capture recovery links, tokens or customer records in the public report.

## Current state and root cause

Supabase Auth is the recovery-token authority. Do not implement another token issuer or assume an app variable changes a provider-issued link. Inspect the application's existing Supabase Auth request/callback wiring and supplied configuration evidence. The root cause remains UNKNOWN until those sources establish whether the issue is provider TTL, premature use, client preview consumption, callback validation or stale application messaging. A requested policy does not establish a currently supported provider setting.

## Fix plan

1. Confirm the supplied GitHub issue and actual recovery policy; identify the exact test environment, owner and scope before any provider-dependent work.
2. Trace the React Router recovery request action, Supabase Auth redirect allowlist, Worker callback and recovery-session handling. Preserve nondisclosing request responses and approved request-rate controls.
3. Ask the authorized provider owner to inspect the provider's supported expiry settings if required. Provider settings and credentials are outside Project Notebook tools. Any change and live test need their applicable task authorization.
4. Correct authorized local documentation or application requirements. Keep valid callback checks and single-use behavior. Never relax issuer, audience, signature or state validation merely to extend usability.
5. Record meaningful cases below and route implementation through the relevant existing identity and security methods. Save findings as source observations or planned tests until evidence exists.

## Acceptance criteria

| ID | Criterion and proof requirement |
| --- | --- |
| AC-1 | The supported provider-issued link follows the accepted policy, demonstrated against the actual configured test environment; no custom token issuer is added. |
| AC-2 | A controlled link used at 59 minutes succeeds only if the actual approved 60-minute configuration and provider contract support it. |
| AC-3 | An expired or already-used link fails safely; the callback gives a clear restart path, never a session or private-data leak. Do not assume the provider returns a particular HTTP status without checking it. |
| AC-4 | Configuration evidence and effective behavior agree. An application TTL variable alone cannot count as proof of provider configuration. |
| AC-5 | Links issued before a configuration change obey the actual provider contract. Record the result instead of assuming they are grandfathered or extended. |
| AC-6 | Account A cannot obtain account B's recovery session; reused links and tampered callback/state are denied; request messages avoid account enumeration. |

## Files touched and checks

Illustrative paths to confirm in the real project: `app/routes/auth.recovery.tsx`, `app/routes/auth.callback.ts`, `app/services/supabase.server.ts`, the corresponding existing tests, and `library/knowledge/private/auth/recovery.md`. No provider settings are local file edits. Record exact inspected symbols and source hashes. Use actual package/provider documentation during implementation; this specimen pins no guessed API method or version.

Tests need controlled clocks where the local application owns timing plus separate provider evidence where Supabase owns timing. A mocked 59-minute pass does not prove live provider TTL. Keep anonymous, replay, cross-account and callback failure checks separate. No test ran for this example.

## Out of scope and related records

Email redesign and unrelated rate-limit implementation remain separate tracked work. An IRD-044 reference is an illustrative future project path, not a claim another issue exists. Link actual accepted recovery architecture and related GitHub issue evidence after checking their paths in the target repository. Never invent issue numbers or create a GitHub issue from this example. Lifecycle moves require the complete folder and appropriate tools; Project Notebook only proposes them.
