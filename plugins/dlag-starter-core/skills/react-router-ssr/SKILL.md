---
name: react-router-ssr
description: "Build Starter server-rendered routes with React Router framework loaders, actions, request context, cookies and honest HTTP responses on Cloudflare Workers."
license: AGPL-3.0-or-later
compatibility: Claude Code
---

# React Router SSR Playbook

Use framework SSR for the Starter website and application route boundary.

1. Inspect package.json, route configuration, Worker entry and generated types. Preserve the pinned scaffold. The official Cloudflare guide observed on 2026-10-20 describes React Router v8; do not silently upgrade an existing project or transplant a newer API into an older version.
2. Read [route boundaries](guides/route-boundaries.md), [the route recipe](templates/account-route.md), [framework settings](templates/framework-settings.md) and [edition boundaries](../../references/edition-boundaries.md).
3. Implement one requested loader/action/component slice. Obtain identity from the current request, validate inputs, enforce object ownership, and serialize only safe fields. Coordinate Worker environment access through [Cloudflare Platform](../cloudflare-platform/SKILL.md).
4. Preserve Set-Cookie values and private cache headers through the complete response and parent route composition. Add route pending/validation/empty/error states with real status codes.
5. Read changed files back. When the host can execute project tools, use the existing type/build check and one affected route check. Otherwise mark execution pending. SSR requires an actual runtime response and browser hydration check; writing ssr: true alone is source evidence.

Use the [Specialist](../../agents/react-router-ssr.md), or follow directly with available host tools when dispatch is unavailable. Scoped requested local edits can proceed without another approval. Do not install dependencies, configure providers, run migrations, send emails or deploy automatically. The recipe is an integration pattern with named application-owned dependencies, not a complete running app. [Official references](references/official-sources.md) and [provenance](../../PROVENANCE.md) record the boundaries.
