<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../assets/brand/dlag-signature-on-dark-1200.png">
  <img src="../assets/brand/dlag-signature-on-light-1200.png" alt="Develop Like a Girl" width="210">
</picture>

**THE BUILD STUDIO · STARTER KIT**

# Prompts you can use

Replace the example goal and paths with your own. Commands go inside a Claude Code session opened in your project. Install the matching builder before using its command.

## Understand the project

```text
/dlag-starter-core:get-started Inspect this project. Explain what it does, the stack it
uses, and one sensible first task. Keep the proposal in chat and preserve existing
files.
```

## Plan one outcome

```text
/dlag-starter-core:plan-project Plan one useful outcome: a signed-in person can save and
reopen a private note. Include ownership, invalid-input and denied-access cases. Defer
sharing and billing. Save a draft to docs/first-version.md, preserving existing files.
```

## Improve a screen

```text
/dlag-starter-core:design-interface Improve this screen's readability and keyboard use.
Preserve the current visual direction and data behavior. Limit changes to this screen
and report the changed files and unrun browser checks.
```

## Build a public page

```text
/dlag-starter-website-builder:build-website Implement the accepted first page from
docs/first-version.md. Use our approved assets and content. Include mobile layout and a
clear next action. Report what was saved and what was actually checked.
```

## Build an app slice

```text
/dlag-starter-app-builder:build-app Implement the accepted private-notes flow from
docs/first-version.md. Include empty, invalid, signed-out and denied states. Preserve
unrelated work and report remaining setup and verification.
```

## Add scoped search

```text
/dlag-starter-app-builder:build-app-search Add search to the current user's notes.
Define the query, empty and failed states, and enforce the same ownership rules as the
notes list. Use the existing data source.
```

## Prepare an integration

```text
/dlag-starter-app-builder:build-integration Prepare one local provider integration from
the supplied API contract. Define the operation, request validation, timeout, retries,
and failure response. Use placeholders for credentials and mocks for provider behavior.
Do not make live calls.
```

## Learn without changing files

```text
/dlag-starter-core:explain-this Explain how this form reaches the database. Use the
supplied files, define unfamiliar terms, and identify what cannot be determined. Keep
this read-only.
```

## End a session clearly

```text
Summarize the accepted goal, saved paths, decisions, checks actually run, open
questions, and one next task. Distinguish completed work from proposals and untested
changes.
```

## Review the result

```text
/dlag-starter-core:ready-check Review this exact candidate and the supplied check
results against the accepted brief. Perform security before quality and identify missing
evidence. Return the readiness result for my review.
```

**Next:** [All commands](reference/commands.md), including what each command returns.

---

[Learning hub](README.md) · [Kit overview](../README.md)
