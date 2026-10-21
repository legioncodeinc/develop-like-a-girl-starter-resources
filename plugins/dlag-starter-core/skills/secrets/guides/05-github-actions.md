# Keep CI authority separate from runtime secrets

Most frontend and server bundle builds should need no production application credentials. Provisioned Worker secrets are runtime bindings. Keep test fixtures synthetic, build with public configuration only where necessary, and give a deployment token only to the final authorized deployment operation.

## Three distinct needs

| Need | Delivery method | Review point |
| --- | --- | --- |
| Deployed app uses an existing provider key | Worker runtime binding | No copy in the build job merely for convenience |
| CI deploys the reviewed app | GitHub environment secret containing a restricted Cloudflare API token | Trusted revision, target Worker, least permissions and step-only exposure |
| CI intentionally changes an application secret | Separate approved secret-update job with an explicit name allowlist | Value input, logging, target, version and activation all require review |

The third case is not a prerequisite for every deployment. Do not create a continuous secret sync, export every GitHub secret or duplicate production keys across jobs unless a specific requirement calls for it. GitHub's secret API returns metadata rather than stored values, so an inventory read cannot recover keys. See [GitHub's secret API](https://docs.github.com/en/rest/actions/secrets).

## Trust boundary

Keep the deployment job on a reviewed branch or revision. Do not expose credentials to untrusted pull-request code, fork code, package lifecycle scripts or arbitrary workflow inputs. `workflow_dispatch` chooses a run; it does not replace the owner's release authorization or a protected GitHub Environment. Configure required reviewers and deployment branch restrictions through a separately authorized settings task.

Use the repository's approved pinned actions and lockfile workflow. Complete dependency restoration, tests and build before exposing the Cloudflare token. Repository scripts and generated output still need review because the deploy step can execute configuration and hooks. A token environment variable is readable by code running in that step.

Use different tokens and protected environments for staging and production. Avoid a user-input string that can dynamically select production, a configuration path, a shell command or an arbitrary Worker name. The [complete workflow example](../references/github-actions-example.md) fixes a staging secret update explicitly and documents its prerequisites. Adapt it to the existing workflow only when that operational task is requested.

## Logs and artifacts

GitHub masks configured secrets, but transformations and structured data can defeat redaction. Prevent output rather than treating masking as a guarantee. Avoid `set -x`, `env`, `printenv`, HTTP authorization debug logs, bundle substitution of credentials and cache/artifact capture of secret files. Newly obtained sensitive values need masking before any logging; do not add a new fetch solely to demonstrate masking. See [GitHub's masking limits](https://docs.github.com/en/actions/concepts/security/secrets).

## Build environment selection

For the existing Cloudflare Vite plugin, select `CLOUDFLARE_ENV=staging` during the build. Inspect the generated deployment configuration's Worker name and resource names before promotion. Setting that variable only on `wrangler deploy` cannot retarget the compiled configuration. For a plain Wrangler service, use its explicit source configuration and `--env staging`. Do not combine these conventions blindly.

## Review result

Record the workflow revision, trusted trigger, required environment, token scope, exact destination and which step receives credentials. Report source-only review if no GitHub job ran. A successful build is not a deployment; a deployment is not proof of email delivery, data access or correct external-key permissions.
