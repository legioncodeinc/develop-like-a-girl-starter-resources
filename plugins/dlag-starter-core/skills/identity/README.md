# Identity resource map

Use these local resources for Supabase Auth on React Router framework SSR and Cloudflare Workers. Read only the topic needed for the requested change after the principles.

| Task | Guides | Complete output or example |
|---|---|---|
| Establish scope and provider fit | [Principles](guides/00-principles.md), [fit](guides/01-provider-fit.md), [existing-system migration](guides/02-provider-migration.md) | [Fit worksheet](templates/provider-fit.md) |
| Implement SSR identity | [Request procedure](guides/supabase-identity.md), [Supabase flow](guides/05-supabase-auth.md), [sessions](guides/10-session-storage.md) | [Request adapter](examples/request-supabase.server.ts), [protocol handlers](examples/auth-routes.server.ts), [route guards](examples/auth-route-guards.mjs), [cookie policy](templates/session-cookie-config.mjs) |
| Add Google sign-in | [OAuth](guides/06-google-oauth.md), [verification](guides/07-google-oauth-verification.md) | [Consumer example](examples/consumer-google-sign-in.md), [consent checklist](templates/google-oauth-consent-screen-checklist.md), [scope justification](templates/scope-justification-template.md) |
| Enforce tenant access | [Authorization](guides/09-rbac.md) | [Permission table](templates/rbac-policy-table.md), [enterprise example](examples/enterprise-access.md) |
| Add factors or password flows | [MFA](guides/08-mfa-and-passkeys.md) | [Password/factor example](examples/password-and-factor-flow.md) |
| Build account recovery | [Recovery](guides/12-account-recovery.md) | [Recovery evidence](templates/account-recovery-evidence.md), [eight design cases](examples/account-recovery-cases.md) |
| Review the implementation | [Failure catalog](guides/11-common-failure-modes.md) | [Audit handoff](templates/audit-report-template.md), [run report](templates/run-report-template.md), [identity worksheet](templates/identity-plan.md) |
| Check supplied sanitized input | [Helper instructions](scripts/README.md) | [Cookie checker](scripts/cookie-attribute-checker.mjs), [scope checker](scripts/validate-oauth-scopes.mjs) |

The [official references](references/official-sources.md) identify current provider/platform documentation. Record the project's installed versions and native test gaps before using the examples. Reports belong in the project's existing notebook or feature record, not in the installed playbook directory.
