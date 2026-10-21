---
name: project-notebook
description: "Draft or review project context, decisions, tasks and evidence from supplied local sources. Use to establish a Project Notebook or identify documentation drift. Project documentation only."
license: AGPL-3.0-or-later
compatibility: Claude Code
---

# Project Notebook Playbook

Keep project facts readable and traceable. Produce a draft in chat, review existing documentation or save the scoped project documents the user expressly requests.

1. Read [the notebook procedure](guides/review-and-draft.md), [location rules](references/locations.md), and the selected [edition boundaries](../../references/edition-boundaries.md).
2. Use the existing project documentation as the starting point. Read the supplied brief, accepted decisions and only the implementation needed for the requested question. Separate source text, owner decisions, inference and missing evidence.
3. Fill the relevant parts of [the notebook template](templates/project-notebook.md), [decision record](templates/decision-record.md) or [review template](templates/notebook-review.md). A decision proposal stays Draft until its actual owner accepts it.
4. Link facts to real paths, symbols or supplied text locations. Distinguish desired behavior from observed code and executed checks. Never manufacture a test result or mark tasks complete from a document's promise.
5. Review readability: outcome first, terms explained, one reader goal per document, useful source links and concrete corrections. Return the draft or review plus exact proposed destination paths.

The [paired Specialist](../../agents/project-notebook.md) may use Write/Edit only for expressly requested local project documentation, after checking for existing files. It cannot move files. This is the user-facing name for project documentation; it does not rename an existing library directory. Formal QA reports and shared contract terms are outside this capability. Flag the missing review or contract work without claiming another Specialist ran.

Delegation is optional. When the user has already requested scoped local documentation and the current agent has Write/Edit tools, follow this Playbook directly, save the requested documents, read them back and report direct use. Do not request the same approval again or leave the save unperformed merely because no Specialist was dispatched. Return an unsaved draft only when required tools or the authorized destination are unavailable; preserve all existing scope and permission limits.

Before detailed authoring, read [method selection and limits](references/role-method-boundaries.md). For an expressly requested component/reference comparison, use [the drift method](guides/09-component-reference-drift.md).

## Full document workflows

For initialization, issue ingestion, forward/backwards requirements, knowledge organization, schema drift or observed-workflow templates, read [the complete resource map](README.md) and [Project Notebook boundaries](references/library-boundaries.md), then the matching full guide. Retain the same Project Notebook ownership and Markdown-only tools.

For a consequential accepted decision, record replacement or ADR-log review, use [the decision-record methods](adr/README.md). Preserve the actual owner acceptance, permanent number and reciprocal history; do not install tooling to write Markdown.

For a source-grounded system explanation, complete schema/reference, beginner journey, meeting handoff or behavior diagram, use [the narrative documentation methods](knowledge/README.md). Follow only the requested source scope and keep evidence, authority and execution separate.

For prose review or a requested new guide, use [the writing method](writing/README.md), supplied house style and actual source evidence. A writing score does not establish technical correctness or application execution.
