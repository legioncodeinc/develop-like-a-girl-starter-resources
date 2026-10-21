# Review an ADR log

For a requested review, inspect actual supplied decision records and return a focused report in chat. Save only an expressly requested local Markdown report at its authorized project destination. A packaged resource directory is not a runtime report store and must not be mutated.

## Report types

- ADR log review: consequential decisions, complete format, evidence of owner acceptance, alternatives, honest consequences, permanent identifiers and reciprocal supersession.
- Onboarding review: readable chronological/topic navigation, current source references, meaningful status and known coverage gaps. A public HTML site is optional.
- Format-change review: compare existing and proposed formats without silently replacing accepted historical content. Preserve all decision substance and reciprocal links.

## Naming and evidence

Use the existing project convention. A proposed standalone filename is `YYYY-MM-DD-[project]-adr-review.md`, only at an authorized project path. Record the subject revision/hash, scope, actual checks, findings with locations and proposed correction, and unrun or unavailable checks. Do not call this an independent implementation Security/Quality review. Those remain separate methods in the required order.

## Current contents

This is a method reference, not evidence that a review ran. A template checkbox, recent date, renderer build or record count cannot establish a complete decision log.
