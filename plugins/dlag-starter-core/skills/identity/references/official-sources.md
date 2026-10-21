# Official identity references

Checked 2026-10-21. Pin the project's installed versions before applying code. These references describe provider and framework behavior, while the project's accepted policy controls features, assurance and scope. No account operation or provider configuration was executed to prepare this resource.

- [Supabase SSR advanced guidance](https://supabase.com/docs/guides/auth/server-side/advanced-guide): cookie topology, refresh and cache handling.
- [Supabase SSR request client API](https://github.com/supabase/ssr/blob/main/src/createServerClient.ts) and [cookie method types](https://github.com/supabase/ssr/blob/main/src/types.ts): getAll/setAll and outgoing cache headers; confirm the pinned release.
- [Verified claims](https://supabase.com/docs/reference/javascript/auth-getclaims) and [current Auth user](https://supabase.com/docs/reference/javascript/auth-getuser): distinguish token validation from current user retrieval.
- [Supabase sessions](https://supabase.com/docs/guides/auth/sessions): refresh reuse, timeouts and session revocation.
- [Google provider](https://supabase.com/docs/guides/auth/social-login/auth-google): provider callback and SSR code exchange.
- [Google client management](https://support.google.com/cloud/answer/15549257?hl=en): exact redirect requirements, inactive clients, notices and restoration.
- [Google OAuth production readiness](https://developers.google.com/identity/protocols/oauth2/production-readiness/policy-compliance), [restricted scopes](https://developers.google.com/identity/protocols/oauth2/production-readiness/restricted-scope-verification) and [Gmail scope table](https://developers.google.com/workspace/gmail/api/auth/scopes): current classifications and applicable review.
- [Google Identity Services migration](https://developers.google.com/identity/oauth2/web/guides/migration-to-gis): direct browser identity flows.
- [Supabase MFA](https://supabase.com/docs/guides/auth/auth-mfa) and [TOTP](https://supabase.com/docs/guides/auth/auth-mfa/totp): enrollment, challenge and enforcement.
- [Supabase passkeys](https://supabase.com/docs/guides/auth/passkeys): experimental status, SDK and origin requirements.
- [Recovery code generation](https://supabase.com/docs/reference/javascript/auth-mfa-recovery-codes-generate) and [verification](https://supabase.com/docs/reference/javascript/auth-mfa-recovery-codes-verify): experimental opt-in and one-time recovery semantics.
- [Password auth](https://supabase.com/docs/guides/auth/passwords) and [password reset](https://supabase.com/docs/reference/javascript/auth-resetpasswordforemail): provider-issued credential flows.
- [Supabase SSO](https://supabase.com/docs/reference/javascript/auth-signinwithsso): configured domain/provider routing.
- [Postgres RLS](https://supabase.com/docs/guides/database/postgres/row-level-security): database enforcement and policy design.
- [React Router sessions/cookies](https://reactrouter.com/explanation/sessions-and-cookies) and [Workers React Router integration](https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/): route response ownership and server context.
- [OWASP session management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html), [CSRF](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html), [MFA](https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html) and [password reset](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html): security design checks.
- [NIST account recovery](https://pages.nist.gov/800-63-4/sp800-63b.html#recovery): apply only the relevant adopted assurance requirements; a worksheet cannot establish conformance.
