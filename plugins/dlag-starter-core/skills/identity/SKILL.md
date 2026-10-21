---
name: identity
description: "Implement Supabase authentication, SSR session refresh, Google sign-in, MFA, recovery and server authorization. Starter React Router SSR and Cloudflare Workers only."
license: AGPL-3.0-or-later
compatibility: Claude Code
---

# Identity Playbook

Implement the requested Supabase identity flow on React Router framework SSR and Cloudflare Workers. Start with the [resource map](README.md), [principles](guides/00-principles.md) and [request procedure](guides/supabase-identity.md).

1. Inspect the named project files, lockfile, placeholder binding names and accepted identity/tenant policy. Read the current official references for APIs affected by the change.
2. Select the relevant guide: provider fit, SSR sessions, Google OAuth, permissions, MFA or account recovery. Missing assurance, tenancy or provider capability is an explicit requirement to resolve.
3. Fill the applicable complete worksheet and save the requested local implementation. Use actual provider methods and preserve all response cookies; a boolean or decoded token is not an identity adapter.
4. Check success, refusal, malformed input and applicable concurrency/revocation cases. Distinguish local helper checks from native framework, browser, provider and RLS evidence.
5. Hand protocol changes to Security Review first, then Quality Review. Keep decisions and results in the project's existing notebook or feature record.

Read only scoped source and placeholder configuration. Write/Edit may change only the app files and examples the user requested after inspecting existing destinations. Preserve unrelated work. Never read actual secret files, print credentials or cookies, install tools, invoke providers, send email, apply migrations, deploy, commit or push from this Playbook. Those actions need their own explicit authorization and available tools. A saved implementation example is not a running service.

The optional [pure checks](scripts/README.md) accept explicitly supplied sanitized inputs and have no file, network or credential access. This Specialist has no execution tool. Do not claim a helper or review ran unless an authorized available tool actually ran it.

If delegation is unavailable, use the Playbook directly and report direct use. The [paired Specialist](../../agents/identity.md) and [edition boundaries](../../references/edition-boundaries.md) apply.
