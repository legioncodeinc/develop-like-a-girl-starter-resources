# Local development without value disclosure

Local secret files are operator-managed inputs. This Playbook edits placeholder documentation and requested application code, and does not open or create a real credential file. The [worked local example](../references/local-development-example.md) includes the exact filename rules and inert commands.

## Determine the existing runner

Read `package.json`, the lockfile, source Wrangler configuration and Vite configuration before choosing a command. Keep the installed toolchain and existing scripts. Do not add an install step, a wrapper, a new secret client or a package-manager switch to solve a missing binding.

For an app using the Cloudflare Vite plugin, `CLOUDFLARE_ENV` selects the Cloudflare environment when the dev server or build starts. A deployment cannot change an already flattened build's environment by setting that variable afterward. Ordinary Wrangler-based development uses its explicit `--env` selector. These are separate invocation paths; follow the one the app already uses. See [Cloudflare Vite environments](https://developers.cloudflare.com/workers/vite-plugin/reference/cloudflare-environments/).

## Choose one local loader

The documented local inputs are `.dev.vars` or `.env`, beside the Wrangler configuration. Prefer `.dev.vars` for a new Starter wiring task because its whole-file environment selection is easier to inspect. Preserve a deliberate existing `.env` choice when there is no requested migration. Do not leave two competing loaders or delete existing files as an incidental fix.

An environment-specific `.dev.vars.staging` replaces `.dev.vars` for that environment; it is not a partial override. The `.env` path instead merges matching files, with priority from `.env.staging.local`, then `.env.local`, then `.env.staging`, then `.env`. A present `.dev.vars` suppresses the `.env` path. These are loading rules, not authorization to inspect any value. See [local secret loading](https://developers.cloudflare.com/workers/configuration/secrets/#local-development-with-secrets).

Keep `.dev.vars*` and `.env*` ignored, with a deliberate exception only for a reviewed placeholder example if the repository keeps one. Check existing tracked-file names and ignore rules without printing file contents. Ignoring an already tracked secret does not remove it from history; send that exposure to Security Review.

## Keep server and browser configuration separate

Use the explicit Worker `env` parameter and existing SSR context. A runtime binding can still leak if application code serializes it, logs it or passes it to a browser component. Runtime injection alone does not make a build safe. Avoid `VITE_` for anything private, and do not add `define` substitutions for credentials. Read [Vite's exposure rule](https://vite.dev/guide/env-and-mode#env-variables) when reviewing the client boundary.

For public values, select the exact Supabase URL and publishable key in a small public function. For private operations, require only their necessary names at the server boundary. A type declaration is not runtime validation, and a generated optional field still needs an explicit missing-value branch.

## Troubleshooting order

1. Confirm the actual script and configuration path.
2. Confirm its selected environment and expected local filename, using names only.
3. Compare the documented required-name list with the code's required names.
4. Check whether the operation imports its server module through a browser module.
5. Ask the operator to correct missing local values through the approved secure channel and restart the existing process if required by its runner.
6. Repeat the smallest failed check. Record exactly what ran; do not claim automatic file refresh or offline remote-secret retrieval.

Local execution may be offline only to the extent the application's other dependencies are local. An ignored file does not supply a hosted Supabase service, send email or authorize an external call. Keep provider-dependent tests explicit and unrun until authorized.
