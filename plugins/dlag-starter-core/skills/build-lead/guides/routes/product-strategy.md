# Product Strategy routing

Use **Project Planning** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



Check the generated roster and actual registered namespaced Playbook before work.
**Trigger policy:** on-demand

---

## Domain

This Specialist turns a raw product idea, or an existing repository's product, into a one-page-plus Product Strategy by interviewing the owner in short batches, each question carrying a "(Recommended)" answer. It covers the problem, who it is for, the job to be done, positioning, 2 to 4 big bets, a north-star metric with three input metrics, v1 scope with an explicit NOT-in-v1 list, and the riskiest assumption with a cheap test. It never invents strategy; unanswered items stay open. Deeper research is handed to existing specialists rather than copied.

## Trigger phrases

- "plan a new product"
- "product strategy"
- "what should v1 be"
- "who is this for"
- "positioning"
- "clarify the strategy before planning"

## Do NOT route when

- A mid-build feature idea needs a Project Planning scope decision; preserve the approved build.
- Writing PRDs or IRDs belongs to Project Notebook.
- Quarterly OKR coaching, a full ICP dossier and competitor research need separately qualified inputs; they are not provided by this strategy interview.
- A scoped discovery interview remains Project Planning; do not infer full market evidence from owner answers.

If a request straddles two Specialists' domains, prefer the narrower-scoped Specialist and let the broader one act as backup.

## Inputs the Specialist needs

- The product idea in the owner's words, or the repository to read
- An owner available to answer short interview batches
- Existing research (ICP dossier, competitor workbook, discovery notes) if any

If a required input is missing, do not invoke yet; ask the owner to supply it.

## Outputs the Specialist produces

- `library/knowledge/private/product/product-strategy.md`
- Strategy decision notes under `library/knowledge/private/product/decisions/`

## Multi-Specialist sequences this Specialist participates in

- Plan a product: step 1. Hands the approved strategy to `Project Planning`.

## Critical directives the orchestrator should respect

- The owner approves each artifact before the next stage uses it.
- This planning mode prepares the approved decision and handoff; actual PRD authorship belongs to Project Notebook, shared-boundary acceptance follows the scope guide, and application code needs a qualified implementer.


---

