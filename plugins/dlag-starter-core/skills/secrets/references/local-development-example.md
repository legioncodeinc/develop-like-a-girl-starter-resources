# Example: local Worker bindings and server modules

Constructed wiring example. These are placeholders and operator instructions, not actual credentials or an application deployment.

## Existing app prerequisites

The app already has its selected Node/package-manager versions, a lockfile, Wrangler, the Cloudflare Vite plugin where applicable, and a working React Router SSR entry. If one is absent, record that gap for the existing app implementation task. Do not install a second toolchain here.

Review the current scripts. A Vite-based app can keep its ordinary dev command:

```json
{
  "scripts": {
    "dev": "react-router dev",
    "build": "react-router build"
  }
}
```

These script names are illustrative; retain the real application's scripts. The Cloudflare plugin must already be configured for Workers runtime bindings. A plain Vite browser build cannot read a server-only binding merely because this script exists.

## Placeholder file and ignore rules

A committed `dev-vars.example` can document names without matching a secret loader's default filename:

```dotenv
# Documentation only. Never put real values in this example.
RESEND_API_KEY="LOCAL_FIXTURE_ONLY"
```

Public Supabase configuration and the non-secret sender string can live in the reviewed local `vars` section. The operator supplies any actual development credential in an ignored `.dev.vars` beside the source configuration. The Playbook does not read that file or copy hosted production values into it.

```gitignore
.dev.vars*
.env*
```

If a repository intentionally commits `.env.example`, its exception needs a review of the placeholder contents. Do not add an exception for `.env.production` or for a pattern containing real values. Name-only tracking checks are sufficient to identify tracked secret filenames; investigating an existing exposure belongs to Security Review.

## Explicit environment invocation

Inert commands for an authorized developer, from the app directory:

```sh
# Existing Cloudflare Vite plugin: select the environment at dev time.
CLOUDFLARE_ENV=staging npm run dev

# Existing plain Wrangler app: use its source configuration explicitly.
./node_modules/.bin/wrangler dev --config wrangler.jsonc --env staging
```

Use the applicable path, not both. Local dev can still call real services if the application code or remote bindings do so. A dev server command is not permission for those calls. With `.dev.vars.staging`, that file must contain the complete local secret set required for staging; a missing key does not fall back to `.dev.vars`.

For a monorepo, each app uses the file beside its own source configuration. Do not use a repository-root secrets file as an implicit source for unrelated apps. When changing directories or moving an app, recheck the configuration path and loader filename.

## Request boundary

Use the project's existing Worker entry and React Router context. The following function is deliberately independent of a framework adapter:

```ts
import { publicSupabaseConfig, requireTransactionalBindings } from './bindings.server';
import type { StarterEnv } from './bindings.server';

export function publicLoaderConfiguration(env: StarterEnv) {
  return publicSupabaseConfig(env);
}

export function transactionalOperationConfiguration(env: StarterEnv) {
  return requireTransactionalBindings(env);
}
```

The first return shape may be deliberately serialized by the application's server loader. The second must remain inside server code and must never be returned as loader data, logged or passed to a browser component. These functions do not authenticate a user, authorize a send or call a provider.

Use the [complete boundary example](../examples/bindings.server.ts) and review its call sites. The `.server` filename is a convention that must be enforced by the actual framework build; changing a filename alone does not prove that imports are safe.

## Verification cases

| Input or action | Expected local result |
| --- | --- |
| Modern publishable key and clean hosted project origin | Return exactly normalized `url` and `publishableKey` |
| Secret key, legacy JWT key, credential-bearing URL or non-project host | Refuse with a fixed error that omits input values |
| Extra private fields present | Omit them from public output |
| Missing public name, wrong type or whitespace-only value | Refuse with a fixed binding-name error |
| Optional email names absent on a public-only path | Public helper still works |
| Transactional path with missing key or sender | Refuse before any provider call |
| Token containing whitespace within a nonempty value | Preserve the input exactly; do not silently rewrite credentials |

Those cases test pure data boundaries. Actual generated types, application import behavior, local runner loading, compiled browser output and external services need their own relevant checks. Record which ones were performed.

Sources: [local development variables](https://developers.cloudflare.com/workers/local-development/environment-variables/), [Cloudflare Vite secrets](https://developers.cloudflare.com/workers/vite-plugin/reference/secrets/), [Vite environment exposure](https://vite.dev/guide/env-and-mode#env-variables).
