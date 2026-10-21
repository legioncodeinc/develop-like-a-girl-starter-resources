# Access and deployment credentials

Separate human access, CI deployment authority and application runtime credentials. A Resend key lets the application use Resend; it does not authorize Cloudflare deployment. A Cloudflare API token lets a job perform management operations; it does not belong in the application's Worker bindings or browser bundle.

## Name the minimum operation

| Actor | Intended work | Recommended boundary |
| --- | --- | --- |
| Local developer | Develop against approved local inputs | Existing personal tooling and development-only values |
| Reviewer | Inspect configuration and evidence | Repository files and name-only metadata sufficient for the task |
| Staging deploy job | Update an existing staging Worker | Its own API token limited to that Worker and needed operations |
| Production deploy job | Update an existing production Worker | Separate token and protected production job |
| Application request | Use the feature's existing provider credential | Only its required runtime bindings |
| Credential rotation operator | Issue/revoke the external credential | Provider authority held separately from normal application access |

Current Workers roles can scope an API token to selected existing Workers. `Editor` can manage their code, versions and secrets. It is broader than a secret-name-only grant: someone able to deploy code can potentially make that code read the Worker's secrets. Metadata-only access and content access have different purposes. Creating a new Worker requires broader administration and must not be silently added to an update job. See [Workers permissions](https://developers.cloudflare.com/workers/authorization/workers/).

Choose the narrowest resource scope the actual account supports, record the effective grants, and test the intended denied targets when an operator authorizes verification. An account-scoped legacy token does not become environment-scoped because its GitHub secret is named `STAGING_TOKEN`. A GitHub Environment controls access to that stored token; Cloudflare enforces the token's actual permissions.

## Credential handling

Use an API token rather than a Global API key for automation. Supply `CLOUDFLARE_API_TOKEN` only to the step that needs it, with the intended account identifier separately documented. Do not put token values in flags, repository configuration, reports, command examples or workflow outputs. Existing human browser login belongs to that developer's tooling; do not copy its stored credentials into CI. Cloudflare's [GitHub Actions authentication guide](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/) describes the token/account inputs.

Record an expiry and renewal owner where supported. Cloudflare documents token activation and expiry timestamps and optional IP restrictions; these controls need to fit the actual runner network. Do not grant token-creation authority just to make every job mint another token. See [token restrictions](https://developers.cloudflare.com/fundamentals/api/how-to/create-via-api/). A short lifetime limits future API use, not the damage an already-authorized deployment can cause.

No GitHub OIDC-to-Cloudflare exchange is assumed here. `id-token: write` alone does not implement an identity exchange. If the project has a separately reviewed federation mechanism, inspect its trust conditions and actual provider support before changing the CI path.

## Revocation and incidents

For a suspected leaked deployment token, the authorized owner revokes or rotates that token and investigates changes made with it. For a leaked application key, rotate the provider credential and update every consumer. These are different incident scopes. Revoking a deployment token does not erase Worker bindings, undo deployed code or revoke a third-party API key already copied elsewhere.

Keep the report to token identifiers, owners, scopes, times and outcomes. Do not retrieve a token value for comparison. If permissions fail, report the exact operation and resource; do not broaden permissions, use another person's token or fall back to an account-wide key.

For a requested access design, complete the [access worksheet](../templates/access-and-ci-map.md). For live exposure analysis, hand the bounded evidence to Security Review.
