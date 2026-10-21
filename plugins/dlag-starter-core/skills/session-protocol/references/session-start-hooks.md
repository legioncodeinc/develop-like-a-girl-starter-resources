# Optional Claude Code session-start context

This reference preserves the source family's Claude Code context-injection mechanics. Starter does not configure or activate a hook. The supported path is direct loading of the [canonical instructions](agent-instructions.md); changing Claude Code settings requires a separate task-specific authorization and actual configuration inspection.

## Context resource and wrapper

The [context text](session-start-context.md) is a condensed reminder with a relative pointer to the full instructions. It is ordinary Markdown, shipped under references rather than an executable hook directory. Its canonical path must resolve in the receiving package before any separately authorized use. Do not assume a home-directory installation path.

The original Claude Code example uses `hooks.SessionStart` in `~/.claude/settings.json` and wraps the source text in this JSON shape. This is a schema illustration, not a configured hook or output from this repair:

```json
{"hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":"[Full context text read from the packaged resource]"}}
```

The original wrapper expression is `jq -Rs '{hookSpecificOutput:{hookEventName:"SessionStart",additionalContext:.}}'` with the context file supplied as standard input. That expression depends on an existing `jq` tool and the actual resource path. It is reference material, not a command to run or permission to install `jq` or edit settings. A future authorized implementation must inspect the installed Claude Code hook contract and preserve unrelated settings before applying anything.

## Evidence and failure boundaries

The original source records JSON validity and direct wrapper execution on the original author's machine, dated 2026-09-08. It explicitly did not observe a live SessionStart event in the session that wrote the settings. Those are historical source claims; they do not verify this package, the reader's settings, a current product version or hook delivery.

For a separately authorized hook task, keep configuration parsing, exact wrapper output, native new-session delivery and receiving-model compliance as separate checks. A valid JSON object does not prove injection. Injection does not make the receiving model follow the protocol. A silent failure can leave the model with no cadence context and no visible error. A new-session event or reload must be observed in the actual host to establish delivery; none was performed for this repair.

## Excluded source wrappers

The source also describes Devin CLI reuse of Claude Code's settings, a Cursor Node wrapper with flat `additional_context`, Cursor rule scope, and observations of those installations. These host-specific procedures are excluded from active Starter instructions because Claude Code is the sole supported assistant. Their exact source identity and section-level disposition remain in provenance. No cross-host compatibility claim is carried into Starter.
