# Starter security control reference

This catalog explains the security mechanisms applied by the fifteen complete local guides, checklist, code contracts and five design worksheets. Its selected stack is React/Vite with React Router framework SSR on Workers, Supabase PostgreSQL/Auth, Cloudflare secrets, R2 and transactional Resend, with optional hosted Stripe. No other CMS, auth, secret, hosting, telemetry, queue, newsletter or intake service is selected by this method. Match the actual target before making a finding.

The [primary reference index](../official-sources.md) links technical evidence and its authoring limits. Local procedures need no separate repository or fetch archive. An external documentation link is neither an executed test nor proof the target implements it. Default/API/version, incident and standard claims require their actual applicable source. Expected results in worksheets remain NOT RUN until observed evidence exists. This read-only method proposes fixes and proof for authorized implementation owners.

## 1. Awareness categories and target findings

The [OWASP Top 10:2025 list](https://top10.owasp.org/2025/) is an awareness map. It does not itself supply target severity or every verification-standard requirement.

| Category | Example Starter lead |
| --- | --- |
| A01 Broken Access Control | Direct route/file access lacks object permission |
| A02 Security Misconfiguration | Private response is cached publicly |
| A03 Software Supply Chain Failures | Lockfile or privileged CI trusts unexpected code |
| A04 Cryptographic Failures | Token/key verification or confidentiality fails |
| A05 Injection | Untrusted input reaches raw SQL/HTML/URL sinks |
| A06 Insecure Design | No owner/file/payment-effect invariant exists |
| A07 Authentication Failures | Client principal state grants access |
| A08 Software or Data Integrity Failures | Forged intake becomes trusted work |
| A09 Security Logging and Alerting Failures | Sensitive diagnostics escape or failures go unseen |
| A10 Mishandling of Exceptional Conditions | Error paths permit effects or lose work |

Show actor, input, missing control and harmful effect before assigning severity. Distinguish CONFIRMED, HYPOTHESIS, NEEDS HUMAN REVIEW and NOT REVIEWED. [The rubric](../severity-rubric.md) prohibits lowering actual PII/financial exposure merely to pass a gate. Unavailable target proof is a coverage gap, not evidence of an exploit.

## 2. Framework SSR and browser boundaries

| Surface | Failure mechanism | Evidence/control |
| --- | --- | --- |
| Loader/action/resource route | UI/parent state mistaken for request authorization | Verify real request guard/mount and object permission before work |
| Nested/independent loading | Sensitive work starts before an assumed parent guard | Trace actual framework version, SSR/data/navigation/fetcher paths |
| Cookie mutation | Cross-site request causes a change | Inspect actual Origin/token policy, SameSite and exact exceptions |
| Returned data | Server code serializes tokens or internal fields | Explicit DTO fields, nested/error/redirect/cache review |
| Client variables/imports | Public prefix or transitive import leaks a credential | Actual .server/build boundary, public config and production artifact inspection |
| Raw HTML/URLs | Imported/user content reaches an unsafe sink | Runtime-compatible sanitizer/URL policy at the render boundary |
| Cookies | Signed contents mistaken for encrypted/private session state | Selected provider flow, integrity/confidentiality, lifecycle and current permission |
| CSP | Wrong/reused nonce or blanket unsafe policy | Installed SSR renderer API and real response/browser evidence |

React Router's server module convention expresses a build boundary, but server code can still deliberately return or log a secret. Vite exposes public-prefixed variables at build time; inspect custom prefixes, define replacements, window configuration, assets/maps and loader/SSR output. A public Supabase publishable key and a privileged secret/service-role key have different authority. A unit test, typecheck or development page does not prove a production client artifact is secret-free.

A cached parent/layout login check cannot be assumed to cover every private server request. Inspect actual middleware enablement/mount order if used, otherwise each boundary's real shared guard. Keep permission before sensitive queries/effects; redirecting after work does not undo it. Match versioned CSRF behavior rather than importing another framework's flags/defaults. CORS is not identity verification. Cookie SameSite helps but does not prove all mutation paths safe; webhooks use a distinct raw-body trust contract.

React escapes ordinary text, while dangerouslySetInnerHTML, DOM innerHTML, unsafe URL schemes and custom script/Markdown serialization need explicit review. SSR can place malicious markup in a script-capable browser before hydration; it does not execute JavaScript in a JavaScript-disabled client. Use actual demonstrated consequences. A per-response CSP nonce must match the real renderer's script output. A fixed nonce in a static/cached document is not per-response protection; static pages need a compatible policy/hash design. See [the complete framework guide](../../guides/02-react-router-attack-surface.md).

## 3. Supabase identity, RLS, direct connections and files

Verified identity does not establish permission over every object or workspace. Treat URL/body owner/tenant IDs as requests, resolve actual current membership/action rules, and compare them with the requested resource before any effect. A personal-row auth.uid()/owner_id policy does not implement workspace membership. Stored session user data is not a verified principal.

| Path | Required review |
| --- | --- |
| Supabase Data API | Actual token/project/environment, role, grants, exposed schema and policies |
| Private row operations | SELECT/DELETE USING and INSERT/UPDATE WITH CHECK, applicable read policies and all permissive/anonymous rules |
| Privileged access | Secret/service-role clients, table owner, superuser/BYPASSRLS, views/RPC/definer functions and search_path/execute grants |
| Direct PostgreSQL | Real connection role and verified request-context wiring; API JWT context is not automatic |
| Custom pooled context | Membership-checked transaction-local set_config, same transaction, rollback, pool reuse and wrapper bypasses |
| Response | Actor-specific fields/relations/counts/errors and existence signals |
| Derived data | Cache/search/export/job scoping, current permission and invalidation |
| R2 | Actor/record/action authorization before server-owned key and byte/capability access |

A tenant column, application WHERE convention or comment does not enforce row access. A debug query, raw RPC, join or aggregate can omit scope. RLS protects only the roles and paths actually subject to it. Table owners normally bypass policies; FORCE can constrain owner bypass, but superusers/BYPASSRLS remain exceptions. A server-only privileged client can still bypass all intended customer restrictions. Inspect actual Authorization role as well as constructor key and avoid broad administrator fallbacks.

For reviewed direct SQL using a tenant setting, the verified context and query must share a transaction. The true flag of set_config limits the setting to that transaction; plain session-level SET can leak between pooled requests. Keep policies, nonprivileged role, context validation, transaction lifetime and indexes together. Missing current_setting can be NULL; empty/malformed UUID casts may error. Test actual missing/empty/invalid/stale behavior without foreign rows or effects instead of claiming every bad context returns zero rows.

Database RLS on an R2 metadata row does not guard an R2 binding read, public URL or presigned URL. The Worker separately authorizes the actor/record/operation/key. Separate private/unfinalized/user files from public assets. A presigned URL is a capability for its actual operation/key/lifetime and can remain usable after a database permission change. Immediate revocation may need server-mediated access; expiry is not immediate revocation. See [authorization](../../guides/03-authorization-and-tenancy.md), [response review](../../guides/12-response-and-tenant-boundaries.md) and [the policy/file contracts](../secure-by-default-snippets.md).

## 4. SQL values and selected identifiers

| Construction | Rule |
| --- | --- |
| Bound parameter | Verify the installed driver's actual binding; no caller text substitution |
| Fluent SDK/filter | Inspect actual filter/raw/RPC APIs and dynamic selection boundaries |
| Raw SQL/template concatenation | Trace every untrusted value; a missing binding/tag changes semantics despite a small diff |
| Identifier/order/function choice | Fixed map of intended choices plus object/action permission |
| Escaped identifier | Syntax escaping is not authority to choose that table or column |
| Policy/definer/context helper | Verified caller/context and real role, bypass and execute/search_path rules |

No ORM/driver is selected here. A familiar API name, copied version fix or a no-error execution does not prove a query is safe. Actual installed raw/identifier APIs and current relevant advisory evidence are required. Parameterization prevents value injection; it does not scope tenants or decide allowed columns. Preserve both positive allowed queries and malicious/unsupported selector tests. The [code contracts](../secure-by-default-snippets.md) deliberately leave a driver's binding implementation explicit rather than supplying an unselected engine.

## 5. Secret bindings, public output, history and containment

| Scope | Control/evidence |
| --- | --- |
| Worker binding | Name, consumer, environment and custodian only; no value collection |
| Environment routing | Separate actual development/preview/production binding/resource evidence |
| Missing/wrong secret | Fail closed with sanitized diagnostics, no hardcoded/admin fallback |
| Source/config | No real keys in vars/.env/.dev.vars/YAML/examples/fixtures/build args |
| Client artifact | VITE_/custom prefix/define, serialized config, loader/SSR, assets/maps and URLs |
| History | Earlier commits, published bundles, CI artifacts and logs remain distinct scopes |
| GitHub controls | Actual scanning/protection/bypass state and responsible owner |
| Incident | Source/artifact correction separate from authorized issued-key containment/rotation and misuse review |

Cloudflare hosting or typed bindings do not prove secret provisioning. A preview must not unintentionally send live email or create real payment effects. A secret in a query string can enter logs/caches/referrers even when the HTTP call is made on a server. A value absent from current source may still be in a deployed bundle, source map, exported log or historical commit. File-name history alone cannot prove a file held a real credential; do not dump credential-bearing patches or search matches into chat.

Placeholders and public identifiers are classified by actual use/authority, not the word KEY. Removing a literal does not revoke an issued credential; an authorized custodian handles containment, affected artifact/environment scope and evidence of misuse. A history rewrite needs its own destructive-operation approval and is not the primary substitute for key containment. The reviewer never reads/sets/rotates credentials. See [secrets](../../guides/04-secrets-and-env.md) and [exposure scope](../../guides/14-browser-log-and-context-secrets.md).

## 6. Optional hosted Stripe and durable verified work

| Stage | Required invariant |
| --- | --- |
| Checkout creation | Verified actor, selected offer/amount/environment and real customer mapping server-side |
| Browser return | URL/UI/client state never grants entitlement |
| Body | Actual byte bound, original bytes preserved before parse/normalization |
| Signature | Supported installed SDK, actual endpoint/environment secret and timestamp policy |
| Event | Supported schema/type/object/account/environment and permitted state transition |
| Acceptance | Durable recoverable verified work or atomic authorized projection before success acknowledgment |
| Dedupe | Unique delivery identity with pending/leased/failed/completed state distinguished |
| Effect | Object-level invariant prevents repeated grant/credit across deliveries and different event IDs |
| Order | Older events cannot regress a newer projection; actual version/state reconciliation |
| Recovery | Same serialized writer, complete pagination, retained effect/dedupe history and approved operator scope |
| Failure | Before/after acceptance/effect/completion crash cases with independently observed effects |
| Key lifecycle | Approved overlap/retirement, stale-key refusal and sanitized delivery-health monitoring |

A verified signature is not schema or business permission. A unique event insert is not completed work. An in-memory callback or waitUntil cannot substitute for a durable recovery store. No job provider is selected: a missing durable inbox/projection remains an implementation gap. Do not clear completed dedupe rows, disable signature/timestamp checks or accept an expired recorded delivery as fresh to make replay convenient. Inspect the provider's real retry/acknowledgment contract and return an appropriate failure when acceptance is unavailable.

Hosted Checkout fulfillment is distinct from a success-page redirect. Server-authoritative selected state grants entitlements only to the mapped account. An authorized current-resource re-fetch/reconciliation is a separate provider action; source authoring does not perform it. See [intake](../../guides/05-webhooks-and-third-party-intake.md), [recovery](../../guides/13-webhook-forgery-replay-and-recovery.md) and [webhook contracts](../secure-by-default-snippets.md).

## 7. Token, cookie, session and revocation semantics

Verify the actual token project/environment, signature, allowed algorithm, issuer/audience where applicable, trusted key source/rotation and expiry. Decoding a JWT is not verifying it. Supabase getClaims validates token claims; getUser obtains a fresh server-confirmed user; getSession provides stored session/token access and its embedded user object alone is not authority. A valid token still needs object/action and current membership permission.

Pin the selected refresh/session lifecycle and configuration rather than importing another provider's default minutes/days. A valid unexpired JWT can remain cryptographically valid after a role changes; document the real freshness/revocation check needed by each sensitive action. Do not invent an automatic denylist or a provider guarantee. Logout, cookie clearing, refresh-token invalidation and access-token expiry may be different operations.

A custom server-only session needs entropy, lifecycle/fixation protection, expiry, appropriate Secure/HttpOnly/SameSite attributes and narrow Domain/Path. A signed cookie is not encrypted. A __Host- cookie requires Secure, Path=/ and no Domain. SameSite must fit the actual flow/CSRF policy; None broadens cross-site exposure and requires Secure. Supabase browser/SSR shared-token cookies can require browser access, so the custom opaque HttpOnly example is not a drop-in replacement. Inspect actual SDK storage and XSS defenses. See [framework review](../../guides/02-react-router-attack-surface.md).

## 8. Selected other senders, delivery health and SSRF

A separately selected intake provider needs its current signature header/algorithm, key source, raw-byte representation, recency/replay, rotation, retry/acknowledgment, duplicate and pause/escalation contract. An unselected sender or unavailable current contract remains unsupported/unverified. No additional CRM/integration service becomes a default. Do not infer another provider's behavior from Stripe or a historical header/date table.

Acknowledgment of an internal processing error cannot authorize forged input or losing unpersisted accepted work. Keep authenticated receipt, durable recoverable processing and applied effects separate. Delivery pause/circuit breakers and unattended failure alerts can look like ordinary inactivity; assign an actual accountable owner to supplied operational evidence.

Payload-sourced file/avatar URLs can remain attacker-influenced even when the surrounding event is signed. The receiving server fetch is a separate SSRF decision. Prefer no arbitrary fetch; otherwise enforce parsed exact approved schemes/origins/ports, no embedded credentials, controlled redirects and actual runtime private/internal address restrictions. A substring hostname check is not an allowlist. Uploads also need type/byte/count/record/key/finalization rules and independent R2 download permission. See [intake guide](../../guides/05-webhooks-and-third-party-intake.md).

## 9. Supply-chain trust layers

| Layer | Failure | Evidence/control |
| --- | --- | --- |
| Name/API | Invented dependency or unexpected publisher | Actual expected source/version/current docs; no install to establish trust |
| Lockfile pair | resolved and integrity changed together | Full diff, exact parsed origin, immutable approved exception and parent graph |
| Install | Build changes resolution or executes unreviewed lifecycle | Actual frozen install configuration, scripts and downloaded binaries |
| Registry release | Correctly signed/pinned content is malicious | Signature/provenance limits plus behavior/source/advisory review |
| CI privilege | Fork/cache/artifact/checkout reaches release credentials | Mount/cache/token/OIDC/action trust and exact artifact evidence |
| Bot settings | Automation assumed but not configured | Actual repository settings, permissions and update evidence |

A hash demonstrates matching bytes, not expected origin when both origin and hash can be altered. A valid registry signature/attestation does not prove benign intent or catch every compromised publisher. A scanner covers the versions/tree/database/time it actually analyzed; a green result cannot rule out unknown compromise. Missing resolved fields need actual workspace/lockfile semantics reviewed. Do not blindly allow private/Git/local exceptions or assume every unusual diff is malicious. See [supply-chain procedure](../../guides/06-dependencies-and-supply-chain.md).

## 10. Generated-code uncertainty and iterative regression

Practical failure patterns include absent authorization/RLS, placeholder credential fallbacks, unvalidated raw/redirect/URL sinks, invented dependencies/APIs, false explanation of a helper and a previously correct guard lost in a later edit. Inspect whole operations with independent intent; a parameterized query can still read a foreign record, and a fluent-looking SDK call can still bypass policy under a privileged role.

Historical studies/incident numbers characterize their own samples and dates; they do not measure the receiving project, establish a new model's security or prove a current fixed version. Require the actual primary source/scope before repeating a statistic, advisory or default. Preserve the testable mechanism instead of asserting a vulnerability from reputation. Re-review relevant neighboring invariants after changes and periodically broaden scope only when authorized. An author's polished explanation or generated test summary is not independent evidence. See [generated-code review](../../guides/08-ai-generated-code-patterns.md).

## 11. Headers, caches, transport and abuse

Inspect actual Worker/asset/document/resource/error responses on the real hostname/environment. CSP needs the installed renderer's nonce/hash design and real script/style/embed requirements. Report-Only observes rather than enforces. A deployment-constant or publicly cached nonce is not a per-response nonce. Static output must use a compatible policy; blanket unsafe directives are not a safe fix for broken UI.

Verify actual HTTPS/HSTS, subdomain/preload scope, nosniff and correct content types, frame-ancestors/framing policy and referrer leakage. A meta policy cannot express every response-header directive. Do not assume Cloudflare hosting proves a selected plan, managed WAF or rate rule is deployed. A firewall does not decide record/file/payment permission.

Private caches need actual actor/permission keys or private/no-store behavior and revocation/invalidation evidence across HTML/data/errors/downloads. Separate public website assets from private user artifacts; do not serve .env/.dev.vars/.git/backups or private source maps accidentally. Limits must bound bytes, counts, pages, time and operation frequency across costly auth/recovery/upload/search/export/Checkout/email/intake paths. A legitimate webhook retry and pending work must remain safe under rate/dependency failure. See [headers guide](../../guides/07-headers-and-transport.md).

## 12. PII, diagnostics, replay and agent context

Trace every sink: returned props/errors, request/response logs, exception arguments, breadcrumbs, DB query values, transaction/span names, custom events, maps/CI artifacts, replay/autocapture and agent context. Minimize/allowlist fields and scrub before transmission, including URL queries, headers, cookies and personal payloads. Record real sink access/retention. A server-side scrubber is a backstop after data has left the source.

When Sentry is actually selected, inspect the installed sendDefaultPii, beforeSend/beforeSendLog/beforeBreadcrumb and relevant span/transaction hooks. Deleting one email field does not sanitize arbitrary request or exception properties. When PostHog/replay is actually present, inspect maskAllInputs, static personal text, custom sensitive inputs, captured URLs/network and manual event properties. Names such as maskTextSelector and maskCapturedNetworkRequestFn are search leads needing the actual SDK API; this method neither adds a telemetry provider nor promises its defaults.

Native input masking is not general page-text masking. A custom password component may not have the semantics an SDK expects. Inspect actual recorded fields from sanitized supplied evidence before claiming privacy. Likewise, do not echo a credential match or unnecessary customer record into a security report, tool transcript or chat. Use class/path:line/candidate/hash and redacted fragments. A sentinel fixture can qualify only that procedure/example, never prove all secrets absent. See [exposure review](../../guides/14-browser-log-and-context-secrets.md).

## Threat-to-proof use

Use [risk verification](../../guides/15-verify-actual-risk.md) to connect each actual threat with a positive allowed control, denial/effect invariant, target/fixture and independent side-effect oracle. Load an exact standard version/requirement before asserting conformance. SOURCE REVIEW, SYNTHETIC EXERCISE, NOT RUN and TARGET RUNTIME evidence remain separate. Security Review precedes Quality Review and orchestrator repository-health review on the actual final candidate. This catalog, its snippets and its report template do not establish application execution, deployment readiness or complete skill-migration fidelity.
