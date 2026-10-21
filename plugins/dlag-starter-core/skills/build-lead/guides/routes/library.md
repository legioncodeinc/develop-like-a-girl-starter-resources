# Library routing

Use **Project Notebook** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain
This Specialist owns the full documentation lifecycle under library/ for this repo, generic and repo-agnostic: scaffolding the v2 library/ folder on first run, ingesting GitHub issues into IRDs, generating feature PRDs from requirements, reverse-engineering existing code into backwards-PRDs, and enforcing the folder/naming invariants (3-digit repo-local PRD numbers, IRD numbers matching the GitHub issue, lifecycle-equals-location, notes/ as sacred and untouched). It routes user intent through a fixed command table rather than freelancing.


## Trigger phrases
- "initialize library"
- "set up docs for this repo"
- "ingest new GitHub issues"
- "write a PRD for X"
- "backwards-PRD this module"
- "run a sync audit for drift"

## Do NOT route when
- The ask is to write QA report content; that authorship belongs to Quality Review, even though this Specialist owns the qa/ subfolder location.
- The ask is for a deep narrative knowledge doc (system overview with Mermaid, architecture diagrams, schema references) rather than a PRD/IRD; Project Notebook owns that content and never touches PRDs.
- The ask is to author or revise the terms of a shared `CTR` agreement; the shared-boundary acceptance process in the scope guide; no contract-author role is packaged owns those records. Project Notebook owns their PRD links.
- The target path is library/notes/; that folder is human-only and this Specialist never creates, edits, renames, or deletes anything there.
- The target path is a legacy v1 location (knowledge-base/, architecture/, requirements/features/, requirements/issues/); flag it for migration instead of writing new content there.

## Inputs the Specialist needs
- The user's intent mapped to exactly one row in the router table (initialize, knowledge-base doc, issue ingest, feature PRD, backwards-PRD, sync audit).
- For IRDs: the corresponding GitHub issue number (never invented).
- For PRDs: the full list of existing prd-* folders across backlog/, in-work/, and completed/ to compute the next sequential number.
- For parallel PRDs: a shared-boundary inventory and accepted `CTR` revision pins, or an explicit list of blocked decisions.

## Outputs
- A v2 library/ scaffold, or a PRD/IRD index file at the correct schema-v2 path.
- A drift report with proposed fixes from a sync audit.
- Cross-links updating related PRDs, IRDs, and knowledge-base docs.
- Contract dependency links in affected PRDs, pinned to accepted `CTR` revisions.

## Commonly sequenced with
- Quality Review: authors QA content inside the qa/ subfolders this Specialist owns structurally.
- Project Notebook: takes over once a PRD graduates into narrative knowledge documentation.
- the shared-boundary acceptance process in the scope guide; no contract-author role is packaged: identifies and settles shared interface terms before independent PRD authors finalize their work; Project Notebook links the accepted record.

## Reusable workflow templates

Route "create reusable templates from real workflows" to Project Notebook's local Playbook. Inputs are an actual scoped source workflow, reader outcome and existing template. Outputs preserve source revision, adaptation assumptions, evidence status and authority boundaries. A written procedure is SOURCE_OBSERVED until execution evidence exists; constructed examples remain NOT_RUN. Project Notebook owns narrative prose, Quality Review owns independent verification, and the scope guide governs shared-boundary acceptance; no contract-author role is implied.
