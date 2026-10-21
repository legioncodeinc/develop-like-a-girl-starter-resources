# Provisioning and version activation

This guide prepares an operator handoff. Every command below that contacts Cloudflare needs the separately authorized target and an appropriately scoped operator. The Playbook itself has no shell or provider tools.

## Check the target and change mechanism

Record the account, existing Worker name, source configuration, environment, binding names, intended activation time and current deployed version. Distinguish a plain Wrangler project from a Vite build that generates a flattened deployment configuration. For a secret-only change, use the source configuration and explicit environment; do not rely on a stale generated build or current-directory inference.

| Operation | What it changes |
| --- | --- |
| `secret list` | Reads names and types, not secret values |
| `secret put NAME` | Creates a version and deploys it immediately |
| `secret delete NAME` | Creates a version without that binding and deploys immediately |
| `versions secret put NAME` | Creates a version; separate activation remains necessary |
| `versions secret delete NAME` | Creates a version without that binding; separate activation remains necessary |
| `versions secret bulk` | Stages a coordinated set of secret updates in a version |
| `versions deploy` | Changes which version or versions serve traffic |

The [secret command reference](https://developers.cloudflare.com/workers/wrangler/commands/workers/#secret) defines input formats and effects. Verify flags against the locked Wrangler before the operator uses them.

## Single-name operator example

Assumptions: `wrangler.jsonc` has a named `staging` environment, its Worker already exists, and the local Wrangler dependency and authenticated operator are available. The value is entered at the secure prompt, never as a command-line literal or in chat.

```sh
# Remote read: names/types only.
./node_modules/.bin/wrangler secret list --config wrangler.jsonc --env staging

# Remote write: creates a version; does not activate it.
./node_modules/.bin/wrangler versions secret put RESEND_API_KEY --config wrangler.jsonc --env staging

# Separate remote activation, only after the recorded version is approved.
# Follow the prompt to select that exact version and traffic percentage.
./node_modules/.bin/wrangler versions deploy --config wrangler.jsonc --env staging
```

Do not substitute `secret put` for the second command during a staged rollout. It activates immediately. Staging a value is still a remote write, and a secret-change version also contains Worker code and configuration. Inspect the candidate version's code and bindings before activation; a secret update must not accidentally promote unrelated pending code. The [version model](https://developers.cloudflare.com/workers/versions-and-deployments/) explains what a version contains.

## Several names and removal

For coupled credentials, prepare one operator-controlled bulk input containing only the approved names. Keep it out of the repository, artifacts and logs. Use `versions secret bulk` when the change needs a staged activation. Do not carry all account credentials through CI merely because bulk input is convenient. No bulk reader or uploader is executed by this Playbook.

Current bulk JSON supports `null` as a deletion. An omitted name is preserved, not removed. Review the name set and any null operations before authorizing the write; a placeholder generator that emits null can otherwise delete a live binding. See the [bulk secret change semantics](https://developers.cloudflare.com/workers/wrangler/commands/workers/#secret-bulk), and verify the actual installed command before use.

## Diagnose without destructive shortcuts

- Missing required name: compare the source config, environment and operator's name-only inventory.
- Same name in plain `vars` and secret configuration: decide the intended type and inspect the affected consumer. Do not delete either remote entry as an automatic repair.
- Candidate exists but behavior is unchanged: inspect deployed version and traffic allocation. Upload is not deployment.
- Local works, hosted fails: compare target resources, name sets and selected environment. Never copy production values into a local file for debugging.
- Permission failure: report the target and required operation; do not broaden a token or switch to a Global API key.
- Invalid provider credential: treat issuer state and Worker configuration as separate systems; follow the rotation guide instead of blind repeated uploads.

Close with the version identifier, environment, changed names, activation result and bounded functional check if one was authorized. Rollback cannot reactivate a provider credential that has been revoked.
