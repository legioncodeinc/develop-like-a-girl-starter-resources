# 12. Review response and tenant-data boundaries

> Security Review uses Read, Grep, Glob and Skill on supplied local evidence and returns its result in chat. Commands, changes, scans, provider calls and test execution below are proposals for a separately authorized caller with the required tools. This Playbook does not perform them.

Start from [the boundary worksheet](../templates/security-design/response-boundaries.md). Use the local [authorization guide](03-authorization-and-tenancy.md) for Supabase roles, policies and connection boundaries, and [response worksheet](../templates/security-design/response-boundaries.md). Inspect actual Identity evidence for recovery, credential changes, session expiry, membership and revocation effects; do not infer current membership from a previously verified token.

1. Pin actual server routes and actions, principal, role, tenant membership, object permissions and candidate revision. Treat URL/body tenant IDs as requests, not authorization. Trace denial before queries and before side effects. A UI-hidden button or layout login check is not object authorization.
2. Trace the authorized predicate through queries, relations, counts, updates, deletes, exports and raw SQL. Review selected role and all applicable policies; RLS does not prove restrictions under superuser/BYPASSRLS. Require positive own-tenant controls so blanket failure cannot masquerade as protection.
3. Trace the selected fields through DTO/serialization, server load, errors, redirects and downloads. The database query can be scoped while its serializer exposes internal fields. State the permitted fields per actor and test the actual response, including nested relations and aggregate existence signals.
4. Trace cache keys, shared CDN state, search/vector candidates, export/object URLs and jobs. Derive tenant/permission scope before retrieval and recheck when serving saved results. Record invalidation after revocation, retries and role changes. These are design invariants to verify, not claims that each provider implements them automatically.
5. Prepare synthetic A/B users, member/admin/service roles, anonymous and revoked actors in an authorized representative environment. Cross-tenant requests must deny without writes or disclose no inaccessible fields; independently inspect effects. Observe actual missing/invalid context behavior, which may be denied rows or a safe error, never assume a UUID cast returns zero rows.
6. Record HTTP result, returned fields and independent DB/cache/search/job effects per path. Missing target or credentials means SOURCE REVIEW ONLY, with path-by-path unknowns. Preserve outside-stack reduced coverage.

Sources: OWASP authorization, PostgreSQL RLS. Derived-data review is Build Studio policy from the threat model.

Starter boundary: Cloudflare Workers owns the custom server/backend. Supabase Auth identifies callers; PostgreSQL policies govern authorized rows. R2 access is a separate server decision. No background-job provider is selected; a proposed durable inbox is a database design, not permission to select or install a queue. Optional Stripe uses hosted Checkout.
