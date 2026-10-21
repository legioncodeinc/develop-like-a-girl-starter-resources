# Technical Writing Craft routing

Use **Project Notebook** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain
Owns the craft of writing technical documentation, not the platform that hosts it, the folder that organizes it, or the metadata that makes it discoverable: Diataxis mode correctness, inverted-pyramid prose structure, code-example discipline, voice and tone consistency, the reader-lens diagnostic, ghostwriting discipline, and docs-as-code PR review. It runs in three modes: review (auditing an existing document), ghostwriting (drafting one), and docs-as-code PR review (scoped to changed files).


## Trigger phrases
- "review this document"
- "is this doc well-written"
- "audit this page"
- "apply Diataxis to this guide"
- "ghostwrite this how-to"
- "my docs PR needs a writing review"
- "does this code example hold up"

## Do NOT route when
- The ask is which platform should host the docs: route to a separately qualified documentation-platform workflow; repository content alone does not provide that platform.
- The ask is knowledge-base folder structure or organization: route to Project Notebook.
- The ask is OpenAPI spec authorship or enrichment: route to a separately qualified API specification or SDK workflow; these are outside repository-content compilation.
- The ask is a README-specific review: route to GitHub Workflow.
- The ask is SEO metadata for the doc: route to Website Builder for page metadata, or Browser Checks for measured performance; marketing strategy remains unavailable.

## Inputs the Specialist needs
- The document (or PR diff) to review, or a completed ghostwrite intake brief for drafting mode.
- Any house style guide that should override the Specialist's own voice/tone defaults.
- The intended Diataxis mode if it's not obvious from the document itself.
- For docs-as-code review: the scope is changed files only.

## Outputs
- A filled scorecard and findings report with every Blocker paired to a specific rewrite proposal.
- A self-reviewed draft in ghostwriting mode, plus any open Suggestions surfaced to the user.
- Docs-as-code PR findings using the standard review-report template.

## Commonly sequenced with
- a separately qualified documentation-platform workflow; repository content alone does not provide that platform: once content is drafted, for platform publishing.
- Project Notebook: for where the finished doc should live in the knowledge base.
- a separately qualified API specification or SDK workflow; these are outside repository-content compilation: when a reviewed document references or embeds an OpenAPI spec.
