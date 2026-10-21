# 04. SQL, server secrets and source-history exposure

> Role boundary: review supplied local evidence with Read/Grep/Glob/Skill and return findings in chat. Execution, remediation, configuration, external requests and saves require a separate authorized caller. Examples below do not grant those tools or permissions.

## Parameterization and identifiers

Follow an untrusted value from request, route parameter, search input or webhook to every SQL/RPC operation. Use the application's chosen parameter-binding/query API for values. Raw string concatenation or template interpolation into SQL is unsafe when input reaches it. A compile-time schema object is different from a user-selected table, column, order direction or function name. Permit only identifiers from a fixed reviewed map; escaping an identifier does not authorize access to it. Review raw-query escape hatches and any helper that builds a filter string. A plausible API name from generated code is not evidence the driver actually parameterizes it.

For projects that separately select an ORM, inspect its installed raw SQL, identifier, alias and execute APIs and current relevant advisory evidence. Do not import an alternative ORM or provider as a Starter default. The [snippet contracts](../references/secure-by-default-snippets.md) show value binding and fixed identifier maps without making a driver selection. Review database definer functions, tenant-context helpers and policy code under the same rule.

## Workers bindings and environment separation

Server secrets belong in Cloudflare secret bindings for the intended Worker and environment. Inventory variable names, consumers, environment and custodian without reading values. Compare development, preview/staging and production binding names and resources; a production-only secret record does not prove another environment is configured. Check that a preview cannot accidentally send real email or operate live payments. Missing secrets should fail closed, with sanitized diagnostics rather than a hardcoded fallback.

Do not commit real values to Wrangler vars, source code, `.env`, `.dev.vars`, fixtures, workflow YAML, logs, build args or application templates. Local examples contain names/placeholders only and remain ignored as appropriate. Workers environment declarations and generated types are not proof the values are installed or correctly scoped. Configuration operations and credential provisioning require a separate authorized caller. No secrets platform beyond Cloudflare is introduced here.

## Public/client exposure

Review `VITE_`, custom public prefixes, Vite define replacements, browser config serialization, loaders, action results, public assets and source maps. A server helper can still explicitly return its secret, so `.server.ts` alone does not prove confidentiality. Send provider credentials in their supported authorization mechanism, never as a URL query string that can be retained in logs, caches, referrers or traces. Keep Supabase secret/service-role credentials and database connection strings server-only. Supabase publishable keys are intentionally public but carry only the access allowed by the actual role, grants and RLS design.

A value can be absent from current source and still exist in the last published bundle or CI artifact. Pin the real build/deployment artifact and inspection scope with [exposure review](14-browser-log-and-context-secrets.md). Do not echo a secret match into the evidence chain while investigating it. Report variable/class, path:line, affected artifact hash and a redacted fragment only.

## Git history and push protection

Inspect supplied repository scanning/history evidence rather than reading credential-bearing patches in chat. File-name history can establish that an environment file existed; it cannot establish whether it held a real credential. GitHub secret scanning and push protection have repository/account/plan settings and bypass semantics that must be verified for the actual repository. They are separate from `.gitignore`; neither `.gitignore` nor a green packaging test erases reachable history. A push-protection bypass needs its actual reason, unresolved alert state and accountable owner, not an assumption that a contributor's promise closed it.

For a confirmed issued credential exposed in source, artifacts or logs, urgent containment and authorized revocation/rotation are distinct from deleting the literal. Notify the custodian, record the exposure window and permissions, preserve sanitized misuse evidence, and propose the narrow source/artifact correction. The read-only reviewer does not retrieve, rotate, set or test the key. A history rewrite is a separate destructive operation with collaborator/clone consequences; it must not replace credential containment or occur automatically.

## Verification and error paths

Review missing, wrong-environment, expired and revoked credentials through supplied negative-test evidence. Ensure failures cannot default to an administrator client or send a payload/connection string to an error logger. For every claimed secret control identify the inspected source and unavailable published/log/provider scope. A synthetic sentinel can qualify a detector for that sentinel only; no-match results cannot certify that every secret is absent.

Sources: [Vite environment rules, Cloudflare secret bindings, Supabase API keys, GitHub and OWASP secrets/SQL references](../references/official-sources.md).
