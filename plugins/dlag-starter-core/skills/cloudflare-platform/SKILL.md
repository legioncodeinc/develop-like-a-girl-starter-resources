---
name: cloudflare-platform
description: "Adapt Starter React Router SSR hosting and backend boundaries to Cloudflare Workers. Use for local Worker entrypoints, bindings, secrets boundaries and static asset routing."
license: AGPL-3.0-or-later
compatibility: Claude Code
---

# Cloudflare Platform Playbook

Cloudflare Workers host the Starter application and its custom backend. Supabase owns database and authentication. R2 owns files and media. Resend owns transactional delivery. Do not introduce Pages, Supabase Edge Functions, D1, a queue or an additional backend by default.

1. Read [the platform procedure](guides/workers-boundaries.md), [Worker entry recipe](templates/worker-entry.md), [binding checklist](templates/bindings-checklist.md), [official references](references/official-sources.md) and [edition boundaries](../../references/edition-boundaries.md).
2. Inspect package.json, lockfile, Vite integration, Worker entry, local configuration names and generated Env types. Avoid opening secret value files. Record existing CLI/scaffold choice and requested environment.
3. Implement only the requested local Worker or server integration, keeping environment and user identity scoped to each request. Use [React Router SSR](../react-router-ssr/SKILL.md) for routes. Preserve unrelated scaffold settings.
4. Draft binding names and required secret names without values. Existing account resources, secret changes, remote bindings, installs and deployments require their own explicit authorization. Never use deploy as a validation shortcut.
5. Read edits back, inspect import/runtime boundaries and identify the smallest available local runtime or build check. Report exactly what ran and which provider behaviors remain unproven.

The [Specialist](../../agents/cloudflare-platform.md) may edit scoped local application files. Without dispatch, the host follows directly using available tools and reports direct use. Do not repeat approval for an already requested local edit. This Playbook supplies recipes; it does not automatically call a CLI, provision a resource or assert that an application is deployed. [Provenance](../../PROVENANCE.md) records authorship.
