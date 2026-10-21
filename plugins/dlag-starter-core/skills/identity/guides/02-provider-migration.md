# Assess an existing identity system before moving it

This procedure applies when a project already uses hosted components, self-managed auth, or an older framework integration. The target remains the approved Supabase stack. It does not execute an account migration.

## Inventory the actual contract

Read the provider and SDK versions, sign-in methods, callback handlers, account-linking rules, session strategy, trusted origins, user profile sync, organization mappings and authorization consumers. Enumerate every server route, scheduled operation and direct data API that accepts the old identity. A UI widget is not the entire system.

For each stored field distinguish stable identity, mutable profile and application authority. Preserve the relationship between an external provider's subject and your internal UUID. Do not merge two accounts only because their email strings match. Reauthentication and a provider-supported linking flow are required for a link that changes access.

## Hosted-component systems

Prebuilt forms can hide dependencies on provider session APIs, profile webhooks and organization permissions. Record how user creation, profile change, deletion and suspension reach your database. Verify webhook signatures over the exact raw body before decoding; make duplicate and out-of-order events safe. A temporary sync failure should not grant extra access.

Export scope must be confirmed with the current vendor. Password plaintext is unavailable. Hash import formats, federated identifiers and MFA secrets may be nonportable; do not promise their export. A reset or reenrollment may be necessary and needs an explicit user communication and support policy. Reusing a Google client can reduce a configuration change, but does not guarantee consent or account linkage behavior.

## Self-managed systems

Inventory adapter tables, verification records, factor storage, encryption keys, trusted origins and custom callbacks. Generated schema is not an approved migration. Data Foundation reviews keys, unique constraints, indexes, deletion behavior and tenant policies. Secrets have separate rolling and rollback requirements; replacing a signing key in place can invalidate every session.

For old framework versions, compare the actual cookie format, callback semantics, CSRF mechanism, adapter and environment names. A renamed API is not evidence that a session remains compatible. Browser storage and server storage can fail differently during rollout.

## Design the cutover

1. Build a nonsecret mapping of source subject to target UUID, preserving tenant ownership and explicit account links.
2. Test import compatibility on synthetic accounts with the exact target SDK and provider features. Verify confirmed-email semantics and denial for missing or mismatched identity links.
3. Choose a bounded migration window. Accepting both session systems is a security-sensitive design, not a default recipe. Specify which system issues new sessions, which validates old sessions, the expiry deadline, and how revocation reaches both.
4. Define password reset and factor reenrollment for material that cannot be safely imported. Avoid promising a migration with no reauthentication.
5. Verify redirect registration in both systems and the Google-to-Supabase callback distinction. Confirm old sessions cannot be promoted into higher privileges.
6. Test suspension, deletion, changed email, duplicated webhook events, unknown tenant, removed member, expired session, failed import and rollback.
7. Retire old issuance and readers only after the agreed evidence and owner approval. Never silently keep an old acceptance path indefinitely.

## UI and operational handoff

React Foundation needs loading, retry, cancellation, expired-session, denied-access, reenrollment and recovery states. No raw provider error, token or credential belongs in UI text or analytics. Show the same public recovery response for missing and existing accounts.

The implementation record must identify the authoritative provider, profile sync owner, role lookup, cookie topology, revocation limit and rollback decision. Independent Security Review examines account linking, parallel acceptance and tenant isolation. Quality Review checks the accepted user journeys after security fixes. This assessment does not select a new provider, import users or issue credentials.
