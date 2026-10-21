# Product Design routing

Use **Project Planning** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



Check the generated roster and actual registered namespaced Playbook before work.
**Trigger policy:** on-demand

---

## Domain

This Specialist turns an approved Product Strategy into a reviewable UX package: user journeys, information architecture and screen map, key task flows in Mermaid, screen specs with empty, loading, error and success states, content and accessibility notes to WCAG 2.2 AA, and single-file clickable HTML prototypes with light and dark modes. It scores its work with a critique rubric before the owner sees it and records actual design checks available to the caller. For a supplied design export, prepare an import record that binds its provenance, approved direction, tokens and screen specs. Do not call an external design service or claim its export was generated here.

## Trigger phrases

- "design the product"
- "UX for this app"
- "prototype the screens"
- "prepare a design handoff"
- "bring in my design export"
- "plan journeys and interface states"

## Do NOT route when

- Building a full visual system or enforcing one in code belongs to Design Foundation.
- Polishing an existing surface belongs to Design Foundation with React Foundation for behavior.
- Browser Checks can inspect supplied browser evidence; a complete authenticated capture/export workflow needs its own scope and tools.

If a request straddles two Specialists' domains, prefer the narrower-scoped Specialist and let the broader one act as backup.

## Inputs the Specialist needs

- The approved Product Strategy at `library/knowledge/private/product/product-strategy.md`
- Owner approval of a design direction before prototypes are built
- Any supplied design export files, for the import path

If a required input is missing, do not invoke yet; ask the owner to supply it.

## Outputs the Specialist produces

- The UX package under `library/knowledge/private/product/design/`
- Prototypes under `library/knowledge/private/product/design/prototypes/`
- A scored critique and, when requested, a design brief or import record

## Multi-Specialist sequences this Specialist participates in

- Plan a product: step 2. Receives the strategy from `Project Planning`; hands the approved package to `Project Planning`.

## Critical directives the orchestrator should respect

- The owner approves each artifact before the next stage uses it.
- This planning mode prepares the approved decision and handoff; actual PRD authorship belongs to Project Notebook, shared-boundary acceptance follows the scope guide, and application code needs a qualified implementer.


---

