# Knowledge routing

Use **Project Notebook** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain
This Specialist authors the narrative, human-readable knowledge documentation under library/knowledge/private/<domain>/: system overviews with Mermaid diagrams, auth architecture docs with sequence diagrams, consolidated SQL schema references, Valkey key catalogs, security trust-boundary diagrams, coding standards, and every other deep technical doc that explains how a system works and why it was built that way. It works from ADRs and PRDs as source material but never copies spec language verbatim, and it never touches PRDs or IRDs itself.


## Trigger phrases
- "document the auth architecture"
- "write the system overview"
- "create knowledge docs for this repo"
- "build out the knowledge base"
- "same quality as the legion-secure wiki"
- "document how our container runtime works internally"

## Do NOT route when
- The ask is a PRD or an IRD; those are authored by Project Notebook, and this Specialist never writes them.
- The ask is a QA report; that belongs to Quality Review.
- The ask is authoring a new ADR (the WHY-decision record itself, not the narrative doc built from it); that belongs to Project Notebook.
- The target file is under library/notes/; that folder is human-only, no agent writes there.

## Inputs the Specialist needs
- Which domain (auth, data, security, frontend, etc.) or "full knowledge base" scope.
- The relevant ADRs to read first for the WHY behind the design.
- The relevant PRDs to extract DDL, API specs, and technical considerations from.
- Source code as ground truth for file paths and actual behavior.

## Outputs
- Knowledge docs with the standard header (Category, Version, Date, Status) and a Related section linking 3-8 sibling docs and ADRs.
- Mermaid diagrams (flowchart, sequenceDiagram, stateDiagram-v2) with no explicit colors and camelCase node IDs.
- Complete SQL DDL and trust-boundary diagrams where the domain calls for them.

## Commonly sequenced with
- Project Notebook: supplies the PRDs this Specialist reads as source material for the WHAT and HOW.
- Project Notebook: supplies the ADRs this Specialist reads as source material for the WHY.
- Quality Review: authors the QA reports that sit alongside, but outside, this Specialist's docs.

## Supplied local meeting decisions and action drafts

Route an explicitly supplied local note or transcript handoff to the current owner's local Playbook. Preserve source revision, participant context, speaker evidence, uncertainty, decision authority, responsible-owner acceptance and next-action conditions. Outputs stay Draft; meeting statements and agent messages do not authorize current actions.

Live Littlebird retrieval belongs to Meeting Scribe only with its actually selected owner and capability gate. A separately authorized standing commitment ledger belongs to Commitment Tracker. ADR artifacts belong to ADR Writing; PRDs and IRDs belong to Project Notebook. No live fetch, external send, ticket creation or Accepted contract follows from this route.

## Source-grounded behavior diagrams

Route "diagram this flow", "show who can do what" and "is this diagram faithful to the code" to Project Notebook using its actual local method. Inputs must identify the journey, actual code/contract and revision or hashes. Outputs preserve caller/gates/returns/errors, queue and transaction/external boundaries with exact locators, intended/current distinctions and missing evidence. Local render success adds no product runtime or authorization proof. ADR decisions, PRD/IRD specs and independent QA retain their owners.
