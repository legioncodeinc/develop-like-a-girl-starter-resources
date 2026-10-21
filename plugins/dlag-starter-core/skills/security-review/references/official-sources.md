# Primary security references

The local guides carry the procedures; no separate repository or source archive is required to use this Playbook. External links support verification of technical facts. The Security Specialist cannot browse with its read-only tools: use supplied current versioned documentation or ask the appropriately authorized caller for the exact missing evidence. Documentation access does not authorize API calls, installations or settings changes.

React Router and Supabase server-boundary documentation was checked during authoring on October 20, 2026, using official documentation and a documentation connector. Workers secret bindings, R2 presigned capabilities and Stripe webhook documentation were also opened. Other links below are primary reference locations to qualify against the receiving project's installed version and task; their presence is not a claim that every current page or API was fetched/tested.

| Subject | Primary reference | Review use |
| --- | --- | --- |
| React Router server-only modules | [Server modules](https://reactrouter.com/api/framework-conventions/server-modules) | Actual framework mode/build boundaries and client imports |
| React Router sessions/cookies | [Sessions and cookies](https://reactrouter.com/explanation/sessions-and-cookies) | Installed cookie/session APIs, mutations and trust |
| React Router SSR CSP | [Security](https://reactrouter.com/how-to/security) | Installed renderer nonce path and actual response policy |
| React Router middleware | [Middleware](https://reactrouter.com/how-to/middleware) | Actual version/config/mount order; no assumed parent loader guard |
| Vite public environment | [Environment variables and modes](https://vite.dev/guide/env-and-mode) | Public prefixes, modes and build-time exposure |
| React raw HTML | [Common DOM props](https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html) | Escaped text versus raw HTML sinks |
| Supabase server identity | [Creating an SSR client](https://supabase.com/docs/guides/auth/server-side/creating-a-client) | getClaims/getUser/getSession verification and cookie flow |
| Supabase keys | [API keys](https://supabase.com/docs/guides/api/api-keys) | Publishable versus privileged authority; actual request role |
| Supabase policies | [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security) | Operation policies, auth.uid context, grants/bypass roles |
| PostgreSQL policy semantics | [Row security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) | Owner/BYPASSRLS/force behavior, policy composition and roles |
| PostgreSQL transaction settings | [System administration functions](https://www.postgresql.org/docs/current/functions-admin.html#FUNCTIONS-ADMIN-SET) | set_config transaction lifetime and missing-setting semantics |
| Cloudflare server secrets | [Workers secrets](https://developers.cloudflare.com/workers/configuration/secrets/) | Server binding names, environment scope and local configuration |
| R2 temporary capabilities | [Presigned URLs](https://developers.cloudflare.com/r2/api/s3/presigned-urls/) | Key/operation/expiry authority and separate file permission |
| Workers execution lifetime | [Context waitUntil](https://developers.cloudflare.com/workers/runtime-apis/context/#waituntil) | Bounded request-lifetime extension; not a durable queue |
| Stripe event intake | [Webhooks](https://docs.stripe.com/webhooks) and [signature verification](https://docs.stripe.com/webhooks/signature) | Original bytes, endpoint secret, retry/order/duplicate contract |
| Hosted Checkout fulfillment | [Fulfill orders](https://docs.stripe.com/checkout/fulfillment) | Server fulfillment and success-return limits |
| npm frozen install | [npm ci](https://docs.npmjs.com/cli/commands/npm-ci) | Lock consistency and actual package-manager behavior |
| npm registry signatures | [Audit signatures](https://docs.npmjs.com/verifying-registry-signatures) | Origin/integrity evidence and its limits |
| GitHub secret controls | [Push protection](https://docs.github.com/en/code-security/secret-scanning/introduction/about-push-protection) | Actual eligibility, settings, bypass and incident evidence |
| GitHub privileged CI | [Secure use reference](https://docs.github.com/en/actions/reference/security/secure-use) | Fork/cache/artifact/token trust and action pinning |
| Threat modeling | [OWASP threat model](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html) | Assets, actors, dataflow, abuse, controls and evidence |
| Authorization | [OWASP authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) | Deny-by-default and action/object permission |
| Session security | [OWASP sessions](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) | Cookie/session lifecycle and fixation review |
| CSRF | [OWASP CSRF](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) | Actual same-origin/token policy and exceptions |
| SQL injection | [OWASP SQL injection prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html) | Values versus allowed identifiers and unsafe raw queries |
| SSRF | [OWASP SSRF prevention](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html) | Parsed origins, redirects and address boundaries |
| CSP and headers | [OWASP secure headers](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html) | Response-policy evidence and correct context |
| Logging | [OWASP logging](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html) | Minimize sensitive fields and inspect sinks/access |
| Secrets lifecycle | [OWASP secrets](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html) | Exposure, containment, rotation and evidence scopes |
| Risk qualification | [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) | Load exact version/requirement text before asserting compliance |

A fact about a product/version/plan must come from the actual relevant documentation and target evidence. Do not treat an overview as the text of every ASVS requirement, old incident statistics as a target verdict, or a source URL as proof that the code implements its controls. A selected telemetry, third-party intake or database library needs its own installed API/current primary contract before a vendor-specific conclusion.
