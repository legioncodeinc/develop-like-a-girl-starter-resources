# Connect one request at a time

Use Supabase for Postgres and Auth. Keep custom request handlers in the React Router app running on Cloudflare Workers. Do not introduce Supabase Edge Functions, Supabase Storage, another database or another identity provider as defaults.

Read package.json, the lockfile, existing migrations and placeholder bindings. Record the installed Supabase client/SSR versions, environment names and current migration workflow. Do not assume a project's Postgres version or reset an existing database.

For ordinary user queries, use a publishable key plus that request's validated user session so RLS remains active. A server location alone does not justify a secret/admin key. Admin access needs a separately authorized operation with explicit authorization before its query. The [official API-key reference](../references/official-sources.md) explains current and legacy keys.

Use the [request-local helper](../../identity/examples/request-supabase.server.ts) from Identity. Wire the existing Worker load context to pass its typed env into the helper; never use process-global clients or return the env object in loader data. Public configuration is an explicit allowlist of URL and publishable key. Browser code receives no provider secrets.

Keep database changes as versioned local SQL migrations, reviewed before application. Draft a new migration rather than editing one already applied. Existing schema changes require affected queries, data volume, lock class, compatibility, backup/restore and rollback decisions. Do not silently create or link a hosted Supabase project. Use the existing project's migration tooling when a later task authorizes execution.

Use a two-user fictional note as the first example: owner sees her note; another user cannot read or alter it; signed-out access is refused. These are expected outcomes until tested as ordinary authenticated identities against a disposable database. A privileged SQL editor success does not demonstrate RLS.

Return the connection map, proposed file edits, migration paths and evidence gaps. Provider connectivity, email delivery and production readiness remain unproven until executed in their approved environment.
