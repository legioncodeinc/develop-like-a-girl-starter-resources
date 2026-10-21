# Adr Writing routing

Use **Project Notebook** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain
Owns the Architecture Decision Record corpus: drafting new ADRs in Nygard format by default (Context, Decision, Consequences, Alternatives Considered), switching to MADR or Y-statements when the team's conventions call for it, assigning sequential numbers, and superseding stale decisions with bidirectional links. Enforces the "decisions, not docs" test so the ADR log stays a scannable, trustworthy onboarding artifact instead of a dumping ground for design proposals.


## Trigger phrases
- "write an ADR for this decision"
- "record this decision before we forget why"
- "supersede ADR-0032"
- "set up our ADR log"
- "which ADR format should we use, Nygard or MADR"
- "document this architecture choice"
- "how do new engineers read our ADR log"
- "audit our ADR directory for completeness"

## Do NOT route when
- The request is general knowledge-base authorship, not a closed decision record; that is Project Notebook.
- The request is extracting code entities into a wiki; that is Project Notebook for narrative documentation; automated entity extraction needs a separately qualified tool.
- The request is a security review of the decision's posture (auth, secrets, PII, data residency); that is Security Review, though this Specialist still records the decision first and then escalates.
- The user is describing an in-flight proposal or a design discussion, not a closed decision; redirect to an RFC or PRD instead of drafting an ADR.
- The ADR log needs CI/CD or documentation-site integration; that is GitHub Workflow for review of existing CI evidence; broader CI implementation needs a designated capable caller.

## Inputs the Specialist needs
- The decision itself, stated as closed and consequential (not a brainstorm).
- Path to the existing ADR directory, or confirmation none exists yet.
- For supersession requests, the ADR number being replaced.

## Outputs
- A numbered ADR file (`NNNN-<kebab-title>.md`) in the project's ADR directory.
- An updated ADR log index (`adr-log.md` or Log4brains build).
- For supersession, both records updated with bidirectional status links.

## Commonly sequenced with
- Security Review: reviews the decision's security posture after this Specialist records it, when auth/secrets/PII are touched.
- Project Notebook: takes design proposals or in-flight discussions that fail the "decisions, not docs" test.
- GitHub Workflow for review of existing CI evidence; broader CI implementation needs a designated capable caller: wires the finished ADR log into CI/CD or a docs site.
