# 03. Supabase authorization, row ownership and tenant isolation

> Role boundary: review supplied local evidence with Read/Grep/Glob/Skill and return findings in chat. Execution, remediation, configuration, external requests and saves require a separate authorized caller. Examples below do not grant those tools or permissions.

## Establish identity before authority

For a browser request, verify the Supabase access token with the selected supported server verifier. Supabase `getClaims` verifies token claims; `getUser` asks Auth for a current user record. Storage-backed `getSession` alone does not revalidate the embedded user object. Neither token verification nor a current user record establishes permission over every record, workspace, export or R2 object. Derive identity from verified server context; treat owner/tenant IDs in URLs, form fields and JSON as requested selectors. Resolve current membership and action permission through the application's actual policy.

## The forgotten predicate failure

A tenant column by itself enforces nothing. `SELECT ... WHERE id = supplied_id`, a join, an aggregate count, a search candidate set or a privileged debug endpoint can cross an owner boundary when the owner predicate is forgotten. Do not accept a UI filter or a convention that every developer remembers the WHERE clause as the sole evidence of protection. Review a representative request end to end and use database policies as a backstop where the selected access path supports them.

## Supabase API and database role paths

Supabase's Data API can apply PostgreSQL RLS using verified JWT context. Inspect the actual request token, `anon`/`authenticated`/privileged role, table grants, schema exposure and policies. A publishable key's intentional public presence does not make the data safe without correct access rules. Secret/service-role keys can bypass RLS under their privileged role. Never put those keys into browsers or routine user-scoped database helpers, and do not assume RLS applies merely because a client was created in a `.server.ts` file. Inspect any privileged client override of the Authorization header and its actual role; do not infer role solely from a constructor key.

Enable RLS on every exposed private table. With no applicable policy, ordinary-role row access is denied; table grants and non-row operations still need review. SELECT/DELETE USING predicates evaluate existing rows; INSERT WITH CHECK constrains new rows; UPDATE needs both existing-row and new-row restrictions and the corresponding read permission. A policy protecting only SELECT does not authorize secure writes by implication. Check permissive policy composition, public/anonymous policies, views, SQL/RPC functions and SECURITY DEFINER paths. A definer function needs deliberate owner privilege, search_path and execute grants review, not an automatic green label because it centralizes a query.

For simple personally owned records, the [SQL example](../references/secure-by-default-snippets.md) uses `auth.uid()` compared with `owner_id` for each operation. Workspace tenancy requires real membership/role policy, not equating workspace ID with user ID. A user must not choose another owner's ID on INSERT or move a row to another tenant on UPDATE. Review membership lookup recursion, revocation, indexes and function privileges with Data Foundation before accepting the design.

## Direct PostgreSQL connections and pool reuse

A direct SQL client does not acquire Supabase's JWT-to-role/claims context automatically. Pin the actual connection role. Table owners normally bypass RLS; FORCE ROW LEVEL SECURITY subjects the owner to row policies, while superusers and BYPASSRLS remain exceptions. A privileged application connection can therefore bypass a correctly written policy. The migration role and request role must not be assumed equivalent or safe.

If a reviewed direct-SQL design uses transaction-local tenant context, four pieces travel together: enable the policies; force owner enforcement when appropriate while keeping the app role nonprivileged; set verified tenant context inside the same transaction; write restrictive USING/WITH CHECK predicates and index the scope column. A representative statement is `SELECT set_config('app.tenant_id', $1, true)` using a driver-bound value after actual membership authorization. Plain session-level SET outside that transaction can leak context to the next pooled request. Pool mode, transaction lifetime and error/rollback behavior need actual tests. Do not export a raw unrestricted client that lets routes bypass the scoped wrapper.

`current_setting('app.tenant_id', true)` can return NULL when absent. Empty or malformed UUID context can cause a cast error; an error is not zero rows. Test missing, empty, invalid and stale contexts explicitly and ensure all fail without disclosure or writes. A context-setting helper that trusts a client tenant string merely moves the vulnerability into one function. Inspect its caller and every bypass path.

## Queries, responses and files are different boundaries

Allowlist table/column/sort identifiers, bind values, and review raw SQL/RPC even when ordinary SDK queries are safe. Apply ownership before joins, pagination, counts and exports. Parameterization prevents value injection; it does not decide which table/column/action an actor may use. The chosen query library's escaping behavior and version need supplied documentation; no ORM is selected by this Playbook.

A correctly scoped row query can still leak data through an overbroad serializer, cached response, error, presigned URL or asynchronous export. Return approved fields only and include current actor/permission scope in private cache/search/export decisions. Inspect nested relations, existence signals and revocation behavior with [guide 12](12-response-and-tenant-boundaries.md).

R2 stores bytes separately from Supabase. An RLS policy on an object metadata row does not guard an R2 URL or binding read. The Worker must authorize actor, record, requested operation and storage key before reading bytes or issuing a short-lived object capability. Never accept arbitrary bucket/key values from the browser. A leaked public bucket URL or still-valid presigned URL can outlive a database permission change. Document its actual lifetime and revocation limitations; immediate revocation may require a server-mediated download design. Keep public site assets separate from private user uploads.

## Denial tests and evidence limits

Prepare synthetic A/B owners, members/admins, anonymous, expired, revoked and privileged-service cases. Include own-record allowed reads/writes so blanket denial is not mistaken for security. Attempt foreign IDs, owner changes, joins/counts, raw RPC, exports, direct data URLs, stale sessions and R2 reads/presigned links. Independently inspect database/file/external effects, not merely the returned status. Exercise the actual roles/policies in an authorized representative environment and test pooled reuse if used. Missing runtime/schema/credentials means SOURCE REVIEW ONLY for that path. The Specialist must not access credentials or execute those tests itself.

Sources: [Supabase RLS/Auth, PostgreSQL policy/role settings and R2](../references/official-sources.md). No policy example proves a real deployed schema or tenancy model.
