---
name: secrets
description: "Design and wire Cloudflare Workers secrets, isolated environments, local development, CI credentials and rotation handoffs without exposing private values. Starter React Router SSR and Workers only."
license: AGPL-3.0-or-later
compatibility: Claude Code
---

# Secrets Playbook

Keep runtime credentials on the server and make their destination, owner and update procedure explicit. Starter uses per-Worker secret bindings, GitHub for repository work, and the project's existing React Router SSR request context. R2 remains a resource binding. The application does not need a secret-management SDK to read a Worker binding.

## Choose the relevant procedure

| Task | Read |
| --- | --- |
| First setup or unclear environment ownership | [Environment model](guides/01-environment-model.md) and [worked naming map](references/environment-naming-example.md) |
| Local development or a missing binding | [Local workflow](guides/02-local-development.md), [worked local example](references/local-development-example.md) and [server boundary](examples/bindings.server.ts) |
| Hosted binding change or inconsistent destinations | [Provisioning and versions](guides/03-provisioning-and-versions.md) |
| Human access, deployment credentials or revocation | [Access control](guides/04-access-control.md) |
| GitHub Actions or build/runtime confusion | [CI guide](guides/05-github-actions.md) and [complete workflow example](references/github-actions-example.md) |
| Rotation, rollback or an audit question | [Rotation and audit](guides/06-rotation-and-audit.md) and [rotation worksheet](templates/rotation-record.md) |
| A requirement that exceeds the selected storage model | [Capability and tradeoff reference](references/capabilities-and-tradeoffs.md) |

Read the [working procedure](guides/cloudflare-secrets.md), complete the [binding map](templates/binding-map.md), and use the [official references](references/official-sources.md) for current command behavior. Keep missing project choices explicit. The command examples describe effects for an authorized operator; this Playbook's presence does not execute or authorize them.

## Work boundary

Read only named project files, binding names and placeholder configuration. Never inspect actual `.env`, `.dev.vars`, credentials, tokens, cookies or password stores. Ask for a missing name, destination or owner, never a value. Requested local app edits and placeholder drafts may use Write/Edit after inspecting their destinations. Preserve unrelated work. Do not ask again for local edits already requested.

This Specialist has no Bash or provider access. Creating tokens, changing remote secrets, granting roles, installing tools, running migrations, sending messages, deployment, commit and push require their own explicit authorized task and appropriate tools. Keep their commands inert in this deliverable. Follow the [edition boundaries](../../references/edition-boundaries.md).

## Completion

Deliver the exact local changes, per-environment binding map, browser-public allowlist, missing-binding refusal and checks actually performed. Distinguish source review, synthetic boundary checks, a real browser build, and authorized deployed verification. Save no secret values in the result.

Hand suspected exposure or masking failures to [Security Review](../security-review/SKILL.md); data credential semantics to [Data Foundation](../data-foundation/SKILL.md); auth-key semantics to [Identity](../identity/SKILL.md). A rotation involving deployment must identify its deployment owner. Follow Security, Quality and repository-health review before any separately approved commit or push.

If delegation is unavailable, use this Playbook directly and report direct use. The [paired Specialist](../../agents/secrets.md) has the same limits.
