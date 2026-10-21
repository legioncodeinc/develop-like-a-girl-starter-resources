# Official implementation references

Checked 2026-10-21. Confirm command and configuration support against the project's locked tools before applying an example. These public references support the platform mechanics described in the packaged guides.

| Topic | Primary reference |
| --- | --- |
| Runtime secret bindings and local file loading | [Worker secrets](https://developers.cloudflare.com/workers/configuration/secrets/) |
| Explicit environments and non-inherited bindings | [Wrangler environments](https://developers.cloudflare.com/workers/wrangler/environments/) |
| Required secret names, generated types and deploy validation | [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/#secrets) |
| Environment selection for the existing Vite plugin | [Cloudflare Vite environments](https://developers.cloudflare.com/workers/vite-plugin/reference/cloudflare-environments/) |
| Local runtime inputs | [Development variables](https://developers.cloudflare.com/workers/local-development/environment-variables/) and [Vite secrets](https://developers.cloudflare.com/workers/vite-plugin/reference/secrets/) |
| Secret put/list/delete/bulk and version commands | [Wrangler Worker commands](https://developers.cloudflare.com/workers/wrangler/commands/workers/) |
| Version contents versus traffic activation | [Versions and deployments](https://developers.cloudflare.com/workers/versions-and-deployments/) |
| Selected-Worker permissions and creation limits | [Workers roles](https://developers.cloudflare.com/workers/authorization/workers/) |
| CI token/account input | [Cloudflare GitHub Actions](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/) |
| Token expiry and restrictions | [Token creation and restrictions](https://developers.cloudflare.com/fundamentals/api/how-to/create-via-api/) |
| Management audit events and view filters | [Audit Logs v2](https://developers.cloudflare.com/fundamentals/account/account-security/audit-logs/) |
| CI masking and protected environment access | [GitHub Actions secrets](https://docs.github.com/en/actions/concepts/security/secrets) |
| Secret metadata versus value retrieval | [GitHub Actions secret API](https://docs.github.com/en/rest/actions/secrets) |
| Browser exposure from environment substitution | [Vite environment variables](https://vite.dev/guide/env-and-mode#env-variables) |
| Publishable versus privileged keys | [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys) |

## Practical limits

- The guides do not establish a direct GitHub OIDC exchange for the selected Cloudflare token flow.
- Per-Worker secrets do not configure cross-Worker synchronization, account-wide secret sharing, leased credentials or issuer-side automatic rotation.
- Account audit activity does not establish a log of every secret read inside a Worker request.
- The worked examples use invented names and placeholders. Native CLI loading, generated types, GitHub execution and provider behavior remain project-specific checks.
- Security testing of application imports, logs, cookies, bundles and authorization is separate from identifying where a binding is configured.
