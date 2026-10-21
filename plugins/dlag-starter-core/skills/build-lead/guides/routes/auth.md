# Auth routing

Use **Authentication** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain
Identity owns Supabase Auth integration, session-cookie boundaries, OAuth flows supported by the selected project, recovery, MFA/passkey decisions where actually supported, and authorization enforcement across server and data layers. Use least-privilege scopes and justified cookie defaults. Provider comparisons, migrations onto another identity provider and enterprise SSO/SCIM services are unavailable. Separate identity protocol from sign-in UI, persistent schema and independent security review.

## Trigger phrases
- "set up auth for this app"
- "which auth provider should we pick, Clerk or Better Auth or Supabase"
- "wire up Google sign-in"
- "our Google OAuth client is about to get deleted"
- "set up MFA and passkeys"
- "recover a lost factor without an account takeover"
- "design password reset or support recovery"
- "design RBAC for a multi-tenant app"
- "migrate from NextAuth to Better Auth"
- "review our session cookie config"

## Do NOT route when
- Another identity provider, SSO/SCIM platform or provider migration is outside this selected method; report the missing capability.
- The request is a security audit of an auth implementation already built; that is Security Review.
- The request is the `<SignIn />` / `<UserMenu />` JSX itself; that is React Foundation.
- The request is the `users` / `sessions` / `accounts` / `roles` table schema or RLS policies; that is Data Foundation.
- The request is the auth PRD; that is Project Notebook.
- Self-hosted identity and alternate providers are outside this method. Keep Supabase Auth as the selected identity target; record a scope question rather than recommending a replacement provider.

## Inputs the Specialist needs
- B2C vs B2B classification, hosted UI vs custom, and scope footprint (sign-in only vs Workspace data access).
- The runtime stack from `package.json` / `.env.example`: framework, existing auth libs, existing provider, existing cookie config.
- Whether Google OAuth is in play, since that triggers the scope-justification and unused-client-deletion checks.

## Outputs
- A selected Supabase Auth approach, with compatibility gaps and any requested alternate-provider work clearly separated.
- Hardened session-cookie config, an RBAC policy table with two-layer enforcement, and an MFA/passkey strategy spec.
- A recovery evidence worksheet via the current owner's local Playbook, with pinned provider/version, accepted support policy and actual differential checks for the selected provider; synthetic constructed examples are not account proof.
- A handoff package: schema needs to Data Foundation, an audit-report template to Security Review, UI needs to React Foundation.

## Commonly sequenced with
- Another identity provider, SSO/SCIM platform or provider migration is outside this selected method; report the missing capability.
- Security Review: audits the implementation this Specialist produces, using its audit-report template.
- Data Foundation: builds the `users`/`sessions`/`roles` schema this Specialist's RBAC and session design depend on.
- React Foundation: builds the sign-in UI against this Specialist's auth spec.
