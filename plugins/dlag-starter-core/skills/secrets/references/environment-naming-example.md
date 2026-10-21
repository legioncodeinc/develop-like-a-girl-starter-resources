# Example: one application, explicit destinations

Constructed example. Names and placeholders illustrate the mapping; no account, Worker, bucket or credential has been created.

| App directory | Source config | Selector | Expected Worker | Value owner |
| --- | --- | --- | --- | --- |
| `apps/web/` | `apps/web/wrangler.jsonc` | default, local only | No hosted target selected | Developer's approved local inputs |
| `apps/web/` | same source config | `staging` | `example-web-staging` | Staging operator |
| `apps/web/` | same source config | `production` | `example-web-production` | Production operator |

Use a service prefix and stable environment names. Do not place private client or project details in a public Worker hostname. A second independently deployed service would get its own configuration and access boundary, for example `apps/api/wrangler.jsonc`; it would not become an `api` environment of this app.

## Configuration fragment

Merge only the selected non-secret configuration into the existing project's file. Preserve its actual entrypoint, compatibility settings, routes and adapter settings. This fragment is not a standalone deployable project.

```json
{
  "name": "example-web",
  "vars": {
    "APP_STAGE": "local",
    "SUPABASE_URL": "https://local-example.supabase.co",
    "SUPABASE_PUBLISHABLE_KEY": "sb_publishable_LOCAL_PLACEHOLDER",
    "TRANSACTIONAL_FROM": "Local Example <local@example.invalid>"
  },
  "secrets": { "required": ["RESEND_API_KEY"] },
  "env": {
    "staging": {
      "name": "example-web-staging",
      "vars": {
        "APP_STAGE": "staging",
        "SUPABASE_URL": "https://staging-example.supabase.co",
        "SUPABASE_PUBLISHABLE_KEY": "sb_publishable_STAGING_PLACEHOLDER",
        "TRANSACTIONAL_FROM": "Staging Example <staging@example.invalid>"
      },
      "secrets": { "required": ["RESEND_API_KEY"] }
    },
    "production": {
      "name": "example-web-production",
      "vars": {
        "APP_STAGE": "production",
        "SUPABASE_URL": "https://production-example.supabase.co",
        "SUPABASE_PUBLISHABLE_KEY": "sb_publishable_PRODUCTION_PLACEHOLDER",
        "TRANSACTIONAL_FROM": "Example <app@example.invalid>"
      },
      "secrets": { "required": ["RESEND_API_KEY"] }
    }
  }
}
```

The Supabase-looking origins and keys above are invented format examples, not working projects or credentials. The boundary example checks key class and clean hosted-origin format; the owner must separately approve the exact real project. Custom domains and legacy anon JWT keys need an explicit reviewed adaptation rather than bypassing the checks.

This example assumes transactional email is required in each selected environment. If the real feature is optional, document its enablement and failure behavior instead of declaring a required unused key. Public Supabase values are deliberately non-secret. The privileged Supabase key is absent because this example does not establish a need for one. Real public identifiers still require the project's access-policy review.

`secrets.required` lists names, not values. Verify support against the installed Wrangler. If the project already uses R2, retain its bucket binding in every applicable environment and record each exact bucket separately; do not add an R2 account key to the secret list.

## Name-only requirement matrix

| Name | Local | Staging | Production | Browser output |
| --- | --- | --- | --- | --- |
| `SUPABASE_URL` | Public placeholder or approved dev URL | Staging project's public URL | Production project's public URL | Explicit URL field only |
| `SUPABASE_PUBLISHABLE_KEY` | Approved dev publishable key | Staging publishable key | Production publishable key | Explicit publishable-key field only |
| `RESEND_API_KEY` | Local test fixture or approved dev key | Separate restricted test/send key | Approved production sending key | Never |
| `TRANSACTIONAL_FROM` | Non-delivering example for fixtures | Approved staging sender | Approved production sender | Only if deliberately required by UI |

Only names and intended properties belong here. The operator checks real values separately.

## Growth and shared credentials

Add a CI credential only for the actual CI operation. A unit test with synthetic bindings does not need a hosted CI Worker or production key. If a second service must share a provider key, record both Worker names, owners and versions in the rotation worksheet. Prefer distinct restricted provider keys where supported. A string such as `${another-worker.RESEND_API_KEY}` is literal data in a Worker secret, not a managed reference.

Sources: [Wrangler environments](https://developers.cloudflare.com/workers/wrangler/environments/), [required secret names](https://developers.cloudflare.com/workers/wrangler/configuration/#secrets), [Supabase key types](https://supabase.com/docs/guides/getting-started/api-keys).
