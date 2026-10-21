# Choose the documentation method and keep its limits

Project Notebook consolidates local requirements, narrative explanations, decision records and writing review. Select one actual requested outcome before drafting, read its full guide, preserve existing documents and save only the authorized Markdown. A named role in a source document does not grant tools, acceptance or permission.

## Requirements and library maintenance

Use [the library map](../README.md), [schema](library-schema-and-workflows.md) and [boundaries](library-boundaries.md). For initialization, read Guide 00 and its exact seed map. For narrative, issue ingestion, forward requirements, backwards requirements, schema maintenance or observed-template reuse, read Guides 01, 02, 03, 05, 06 or 08 respectively. Read the corresponding full template/example before writing. Number requirements across all lifecycle folders; issue numbers must match supplied evidence of an existing issue in this repository. Preserve complete folder lifecycle and history; a frontmatter change does not move work.

Library structure is repository-local. A monorepo can have an independent library per child repository and a parent library for cross-cutting concerns. An aggregated vault is derived output: inspect its actual synchronization owner and do not edit that mirror. Do not conflate separate repositories' number sequences. Never inspect, write, seed or move human notes. Keep missing tools, collision resolution, lifecycle moves and shared-contract acceptance as explicit gaps under the existing boundaries.

Before independent PRD work, inventory shared operations, events, data shapes, permissions and state. Pin the same actual accepted contract revision for each consumer/provider. Draft or disputed terms leave dependent work incomplete. Requirements authoring cannot create accepted contract terms. Link independent Security Review, Quality Review and repository-review results only when those reviews actually occurred. An authoring checklist does not replace them.

## Architecture decision records

Read [the ADR methods](../adr/README.md) first. Determine the project's existing directory, format, number width and index before drafting. Use Nygard for a new simple record unless the actual team chooses another format; MADR and the complete five-clause Y-statement method remain available. Ask once when a material format or decision-authority ambiguity remains. An in-flight design or meeting summary needs a proposal or narrative rather than fabricated acceptance.

Allocate max plus one across actual ADRs, never reuse numbers or fill historical gaps. Include context, the concrete decision, positive/negative/neutral consequences and substantive rejected alternatives. For an accepted replacement, follow [the complete supersession method](../adr/guides/04-supersession-workflow.md), preserve the old body, and inspect both reciprocal links and the index before claiming completion. Report number, title, status, format, actual edits, source acceptance and unresolved implementation/security issues.

Auth, secrets, PII or data-residency decisions require Security Review of their posture after documentation, followed by the applicable independent review. Recording a choice does not approve its security. Documentation-site integration, CI wiring or tool installation is a separate requested implementation task. No unavailable owner is silently dispatched. Plain Markdown remains sufficient; [optional tooling](../adr/guides/05-tooling-integration.md) is reference material for a separately authorized capable caller.

## Narrative knowledge

Read [the narrative map](../knowledge/README.md), taxonomy, format and analysis workflow before deep documentation. Read relevant accepted ADRs for why, PRDs for intended behavior, actual source for implementation and the real roadmap when it exists. Transform requirements into explanations; never rewrite an unimplemented MUST as an observed DOES. Cite actual paths, symbols and revisions.

For a full requested corpus, write the overview, system overview and request lifecycle first; then only real supported domains. For one beginner journey, supplied meeting source or behavior diagram, use its bounded method without scaffolding a fictitious full corpus. Use real PostgreSQL definitions and actual Supabase/Worker/R2 boundaries; an unselected cache, vector database, assistant or provider is not a default. Complete schema references include all inspected tables, policies, grants, constraints and indexes, with omissions disclosed.

Apply the documented category/version/date/status header, related-source links, narrative progressive disclosure and diagram rules. Deep references target the existing guide's useful length ranges; explain a justified long document and split coherent topics. Do not invent links or pad a bounded tour to meet a quota. Use camelCase Mermaid IDs, no color styling or click handlers. Check overview navigation, source paths, related links, full DDL, trust-boundary diagrams and concrete standards examples where those subjects exist.

Decision records, requirements, independent findings and accepted contracts retain their respective methods and authority. Audience Word/PDF packets, automatic entity extraction, live meeting retrieval and standing task ledgers are unavailable here. Report the needed capability; preserve source evidence and do not substitute invented exports, captures or commitments. Narrative Markdown remains directly supported.

## Technical writing review and ghostwriting

Read [the writing method](../writing/README.md), classify Diataxis before prose and use its full eight-step workflow. Resolve mode mixing before polishing sentences. Review every code block with the complete checklist, then voice, reader prerequisites, six scorecard criteria and actionable severity-ranked findings. Every Blocker includes a concrete rewrite. Changed-document review stays scoped to the supplied diff except directly related context.

For ghostwriting, complete the existing brief from known mode, audience, scope and voice; ask only about material unknowns. Draft in the chosen mode, apply all eight review steps to the draft, fix Blockers and disclose remaining Suggestions. Respect the supplied house style before defaults. Missing or unreadable referenced house style is a stop condition for dependent review; request it rather than inventing its rules. If intended mode or scope remains ambiguous after one clarification, preserve the ambiguity and stop that dependent drafting.

This craft method is English-first. Identify a non-English limitation before claiming a qualified language review and seek the appropriate language reviewer. If a code example appears wrong and cannot be verified within available tools/authorization, label the concern Blocker (unverified), explain the suspected reader failure and request author execution; do not claim a runtime pass. Platform choices, API spec generation, SEO metadata and repository configuration need the actual separately selected capability. A writing score proves neither technical correctness nor reader comprehension.

## Closing evidence

Report the actual documents and paths, method used, what was saved/read back, links checked, decisions still Draft, missing evidence and checks not run. Scope source-grounded teaching examples as illustrations. Keep actor authority, source inspection, application execution and reader understanding separate.
