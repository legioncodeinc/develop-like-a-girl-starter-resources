---
name: session-protocol
description: "Keep the owner's task, deadline, attempts, file ownership and evidence continuous across a bounded work session, handoff or context compaction."
license: AGPL-3.0-or-later
compatibility: Claude Code
---

# Work Session Protocol Playbook

Carry the assigned task to a concrete result while keeping its scope, elapsed time, questions and evidence visible. This protocol is self-enforced. It does not install timers, hooks or memory.

## Load the complete method

Read [the canonical operating instructions](references/agent-instructions.md) in full before task work. Use [the procedure](guides/procedure.md) to select the applicable supporting resource. The canonical instructions contain the rules; a summary or template does not replace them.

If loaded after an opening, adopt the remaining cadence and report the truthful start state. Do not invent an earlier opening or timestamp. Preserve the original work-unit start, deadline, failed attempts, checked artifact identity, worker ownership and pending questions across messages and compaction.

## Recover and report

Use [the recovery worksheet](references/recover-after-compaction.md) before the next dependent action after compaction. Use [the result template](templates/result.md) at every end, checkpoint or stop. Read [the origin and examples](references/origin-and-examples.md) for short-task, deadline and retry decisions and their evidence limits.

Scale checks to the actual task. A lookup needs its relevant lookup check; it does not need an application fixture, audit or worker. Package checks do not establish model compliance.

## Stay within Starter tools

When invoked as this Core capability, use only Read, Grep, Glob and Skill on supplied local evidence and return guidance in chat. Do not execute commands, write files, use network or provider tools, access credentials, install dependencies, change settings, commit, push, publish or send messages. The paired [Work Session Protocol Specialist](../../agents/session-protocol.md) has the same read-only boundary. These tools cannot execute a clock command, stop a process, edit files or dispatch workers. Use an already available trusted timestamp or the documented action-count fallback, and report missing execution capability instead of inventing results. The task's authorized implementation agent applies the cadence using its own actual tools and permissions.

Read [edition boundaries](../../references/edition-boundaries.md). Starter supports Claude Code only. Loading this Playbook grants no permission to install, configure providers, access credentials, publish or change another agent's files. Existing task-specific authorization remains valid within its scope.

[Optional session-start context](references/session-start-hooks.md) documents Claude Code injection mechanics as reference only. No hook is installed or activated by this package. [The guide map](README.md) links the full method and supporting resources.
