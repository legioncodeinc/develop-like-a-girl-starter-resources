# Domain taxonomy: choose only source-supported topics

For each requested domain record what belongs, what belongs elsewhere and which actual sources support it. Create no empty folders or fixed quota. Literal library/ paths follow the existing Project Notebook schema. The approved stack is React Router SSR on Workers, Supabase PostgreSQL/Auth, Cloudflare secrets, R2 and transactional Resend.

## `architecture/`

Narrative docs explain actual system shape alongside the separate ADRs that record decisions.

**What belongs:** a system overview with a Mermaid diagram and component/decision tables; request lifecycle with caller, identity gate, data/file operations and response; server/client placement; current route-to-service boundaries. Cite actual routes, server-only modules and accepted choices.

**What NOT to include:** copying an ADR as a how-it-works explanation, inventing services to make a diagram symmetrical, or treating a desired architecture as implemented. Explain actual mechanisms and link to the existing accepted record for why.

---

## `ai/`

Use this domain only when an actual, separately accepted application feature uses AI. Inspect its actual prompts, retrieval, model/embedding boundaries, data flow and failure behavior before documenting them. No AI provider, vector store, daemon, session capture, memory or model call is selected by Starter.

**What belongs:** a bounded explanation of the feature actually present, its authorized data sources, optional versus required dependencies and explicit unsupported/failure paths.

**What NOT to include:** transplanting an unrelated memory pipeline, automatic schema healing, synthetic vector tables or an assumed provider. Missing implementation is a gap, not permission to add one.

---

## `auth/`

Explain Supabase Auth identity and actual application permission enforcement separately.

**What belongs:** the supported sign-in/recovery/callback sequence; exact server verification path and identity source; cookie/session lifetime and revocation behavior; account-versus-record ownership; actual optional membership policy. Show denied/expired/cross-owner cases and client/server secret boundaries.

**What NOT to include:** a new token issuer, device-flow CLI or credential file that the app does not implement. Sign-in alone never proves access to another owner's record or R2 object.

---

## `data/`

Provide one consolidated reference for the actual in-scope Supabase PostgreSQL schema rather than disconnected feature fragments.

**What belongs:** every table/column/type/nullability/default, primary/foreign/unique/check constraints, indexes, triggers/functions, RLS policies and relevant grants; their real migration sources; writers/readers and record ownership; file metadata versus R2 bytes; actual migration/backfill/version behavior. A key/catalog reference records its purpose, owner, lifecycle, expiry and actual usage where such objects exist.

**What NOT to include:** a fixed seven-table schema, guessed defaults, omitted columns replaced with ellipses, unselected automatic healing or R2 access supposedly inherited from RLS. Feature-specific planned schema changes stay in their PRD until their status is explicit.

---

## `integrations/`

Explain actual supported external boundaries used by the application, not a roster of unrelated coding assistants.

**What belongs:** request/webhook contracts, verified sender and raw-body signature handling, environment/account mapping, input validation, idempotency, retry ownership, durable state and provider acceptance versus final delivery. Examples may concern selected Supabase, R2, Resend or optional hosted Stripe only when actually used.

**What NOT to include:** automatic assistant shims, unselected vendors or a background queue merely because a source example mentions one. Claude Code is the only supported assistant; no adapter development is required for a site/app explanation.

---

## `plugins/`

Ordinary Starter applications do not require an MCP/plugin domain. Use it only for an explicitly accepted extension that the real target implements.

**What belongs when present:** actual transport/lifecycle, tool inputs/outputs, permissions and data effects from inspected source. Keep the extension boundary distinct from application routes.

**What NOT to include:** invented MCP servers, plugin distribution, extra assistants or source-registry dependencies. If the requested product has none, omit the domain.

---

## `frontend/`

Explain React and React Router framework-mode SSR surfaces from actual loaders/actions, components, forms and state ownership.

**What belongs:** visible user journey, data provenance, server/client split, pending/error/empty states, accessible controls, Tailwind and React shadcn primitives actually used. Record SSR/hydration evidence separately from source review.

**What NOT to include:** a dashboard/graph visualizer that does not exist, server secrets in loader output, or client UI visibility as server authorization.

---

## `infrastructure/`

Document the actual repository build, test, CI and Workers hosting boundaries.

**What belongs:** existing package scripts/versions/lockfile and React Router/Vite build flow; actual Worker entry and bindings; Cloudflare secret placement by environment; actual R2/Resend connectivity; observed release/rollback steps. Distinguish a proposed configuration from a deployed one.

**What NOT to include:** automatic npm publishing, daemon provisioning, deployment, new dependencies or an unselected hosting provider. No background runner is selected.

---

## `multi-tenant/`

Use only when the accepted product actually has organizations/workspaces or a tenant model. Otherwise document user-owned data without inventing extra account levels.

**What belongs:** actual identity-to-membership mapping, trusted tenant derivation, owner/role checks, scoped queries, cross-tenant denials and any revocation behavior. Explain which checks are application-enforced and which database policies implement them.

**What NOT to include:** tenant authority derived from a browser ID, an unimplemented role hierarchy or claimed isolation based only on function names.

---

## `security/`

Explain actual trust boundaries, data classification and secret handling; this narrative is not an independent vulnerability clearance.

**What belongs:** a Mermaid boundary diagram with enforcement source for each crossing; browser input to Worker validation; Supabase identity versus record permission; database versus R2 file authorization; webhook signature and entitlement boundaries; public/private data categories, output/log redaction and credential lifecycle. Name unknown enforcement explicitly.

**What NOT to include:** tokens, signed URLs, customer records, hypothetical guarantees or the inference that a box labeled trusted enforces access. Independent Security Review remains separate.

---

## `standards/`

Record conventions proven by the actual project rather than importing another repository's preferences.

**What belongs:** TypeScript boundaries/strictness, request validation, HTTP/error conventions, server-only modules, actual formatting/lint/package manager, testing and Git/PR conventions. Cite real configuration, symbols and examples.

**What NOT to include:** an npm-versus-pnpm decree without target evidence, a special ORM/column-definition pattern not used by the app, or an install/upgrade task hidden inside documentation.

---

## `collaboration/` and `operations/` (as needed)

Use collaboration/ only for actual application collaboration or authorized worker ownership, not assumed shared memory. Operations/ explains real diagnostics, incident handling, capacity, retention, retry, recovery and escalation procedures. Cite actual tooling and runbooks, environment scope and owner gates; never turn a document into authorization to prune data, change providers or restart a live system.

---

## `overview.md` (top-level, not in a subfolder)

A single `overview.md` at the root of `library/knowledge/private/`. The human-curated entry point - the README for the entire knowledge base.

**Required sections:**
1. What the target repo is (1-2 paragraphs in plain English). Do not infer product features from a documentation template.
2. Top-level architecture summary from actual components, boundaries and data objects; name only mechanisms observed in the target
3. Key modules / components
4. Where to start reading (role-based reading guide)
5. Coverage facts with inspected scope, missing decisions/domains and actual verification date; counts alone do not prove fidelity
