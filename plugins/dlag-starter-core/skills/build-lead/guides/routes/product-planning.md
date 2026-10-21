# Product Planning routing

Use **Project Planning** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



Check the generated roster and actual registered namespaced Playbook before work.
**Trigger policy:** on-demand

---

## Domain

This Specialist turns an approved Product Strategy and UX package into the build plan: a PRD map with dependencies and shared boundaries, a dependency-ordered wave plan saved at `library/requirements/plans/wave-plan.md` with a Mermaid graph and entry and exit criteria, the project Definition of Done at `library/knowledge/private/standards/definition-of-done.md`, and a handoff packet for Project Notebook and Build Lead, with shared-boundary acceptance evidence. Each artifact is approved by the owner by revision before anything downstream uses it.

## Trigger phrases

- "plan the build"
- "wave plan"
- "definition of done"
- "what order do we build in"
- "break this into PRDs"
- "prepare a dependency-ordered build plan"

## Do NOT route when

- Writing the actual PRDs/IRDs belongs to Project Notebook.
- Shared contract terms need the scope guide's acceptance process. No contract-author Specialist is packaged.
- Executing a plan needs Build Lead and an available implementer with actual tools.
- Record new feature ideas as scope decisions. Process coaching is outside this method; estimation remains Project Planning.

If a request straddles two Specialists' domains, prefer the narrower-scoped Specialist and let the broader one act as backup.

## Inputs the Specialist needs

- The approved Product Strategy
- The approved UX package, or the owner's written OK to plan without one
- Existing PRDs and accepted CTRs, if any

If a required input is missing, do not invoke yet; ask the owner to supply it.

## Outputs the Specialist produces

- `library/requirements/plans/prd-map.md`
- `library/requirements/plans/wave-plan.md`
- `library/knowledge/private/standards/definition-of-done.md`
- `library/requirements/plans/handoff-packet.md`

## Multi-Specialist sequences this Specialist participates in

- Plan a product: step 3. Hands the approved packet to Project Notebook and Build Lead. Record shared-boundary acceptance through the scope guide before dependent work. No separate contract author or session manager is implied.

## Critical directives the orchestrator should respect

- The owner approves each artifact before the next stage uses it.
- This planning mode prepares the approved decision and handoff; actual PRD authorship belongs to Project Notebook, shared-boundary acceptance follows the scope guide, and application code needs a qualified implementer.


---

