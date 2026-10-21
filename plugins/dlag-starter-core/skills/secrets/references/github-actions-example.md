# Example: stage one approved secret update

This complete workflow is an adaptation template for a repository that already uses npm and has Wrangler pinned in its lockfile. It changes a hosted secret version if activated. Keep it as documentation until the owner requests this particular operational workflow and its settings are reviewed.

The sample fixes the protected branch to `main`, the GitHub Environment to `staging`, the source configuration to `wrangler.jsonc`, the Worker to `example-web-staging`, and the secret name to `RESEND_API_KEY`. Substitute the project's actual reviewed constants. Do not turn them into unconstrained dispatch inputs.

Prerequisites:

- The Worker exists and the source configuration declares `staging` with that exact name.
- The protected GitHub Environment has approved branch restrictions and required reviewers, with `CLOUDFLARE_API_TOKEN` and `RESEND_API_KEY_NEXT` stored as environment secrets. Its account ID is an environment variable `CLOUDFLARE_ACCOUNT_ID`.
- The token has only the intended Worker's required management permissions. The replacement application key is already authorized and has the right issuer scope.
- The repository has an accurate `.node-version`, package lock and local Wrangler dependency. Existing dependency scripts have been reviewed; no credentials are available during installation.
- The two action commits below were resolved from the publishers' v6 references on 2026-10-21. Their action runtime is Node 24; the project Node version still comes from its own version file. Confirm runner compatibility and the project's approved action pins before activation.

```yaml
name: Stage approved staging secret
on:
  workflow_dispatch:
permissions:
  contents: read
concurrency:
  group: staging-secret-update
  cancel-in-progress: false
jobs:
  stage-secret:
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    timeout-minutes: 10
    environment: staging
    steps:
      - name: Check out reviewed revision
        uses: actions/checkout@d23441a48e516b6c34aea4fa41551a30e30af803
        with:
          persist-credentials: false
      - name: Use project Node version
        uses: actions/setup-node@249970729cb0ef3589644e2896645e5dc5ba9c38
        with:
          node-version-file: .node-version
          package-manager-cache: false
      - name: Restore locked dependencies without credentials
        run: npm ci
      - name: Require existing config and installed Wrangler
        shell: bash
        run: |
          set -euo pipefail
          test -f wrangler.jsonc
          test -x ./node_modules/.bin/wrangler
      - name: Stage the approved replacement without activation
        shell: bash
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ vars.CLOUDFLARE_ACCOUNT_ID }}
          ROTATION_VALUE: ${{ secrets.RESEND_API_KEY_NEXT }}
        run: |
          set -euo pipefail
          if [ -z "${CLOUDFLARE_API_TOKEN:-}" ] || [ -z "${CLOUDFLARE_ACCOUNT_ID:-}" ] || [ -z "${ROTATION_VALUE:-}" ]; then
            printf '%s\n' 'Required staging configuration is missing.' >&2
            exit 1
          fi
          printf '%s' "$ROTATION_VALUE" | ./node_modules/.bin/wrangler versions secret put RESEND_API_KEY --config wrangler.jsonc --env staging --name example-web-staging
```

The pipe carries the value to Wrangler's input rather than printing it into a log or putting it in an argument. Do not enable shell tracing. GitHub masking is additional protection, not proof that arbitrary diagnostic output is safe. This workflow intentionally does not activate the version, send email, revoke the old key or change production. Its recorded version must be inspected and separately promoted through the actual release process.

Avoid running this for every code change. Normal code deployment should reuse already provisioned runtime bindings. Its CI token still belongs only in the deployment step; the app's runtime keys should not be injected into install, test or build jobs. If an actual test needs a provider credential, use a separately authorized restricted test credential and report its scope.

If the project uses a different package manager, Node setup or monorepo directory, adapt the full existing job coherently. Do not bolt on this standalone example as a second deployment system. If OIDC is requested, verify a real provider exchange before replacing the token; this example makes no federation claim.

Sources: [Cloudflare CI authentication](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/), [version secret command](https://developers.cloudflare.com/workers/wrangler/commands/workers/#versions-secret-put), [GitHub secret protection](https://docs.github.com/en/actions/concepts/security/secrets), [checkout example commit](https://github.com/actions/checkout/commit/d23441a48e516b6c34aea4fa41551a30e30af803), [Node setup example commit](https://github.com/actions/setup-node/commit/249970729cb0ef3589644e2896645e5dc5ba9c38).
