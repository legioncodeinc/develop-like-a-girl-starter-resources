# 11. Threat model before feature implementation

> Security Review uses Read, Grep, Glob and Skill on supplied local evidence and returns its result in chat. Commands, changes, scans, provider calls and test execution below are proposals for a separately authorized caller with the required tools. This Playbook does not perform them.

Use [the worksheet](../templates/security-design/threat-model.md), [synthetic cases](../examples/security-design/source-cases.md) and captured facts. This prepares a security design packet; it does not replace architecture ownership or a later audit.

1. Pin the proposed feature, repository revision, environment and scope. Identify unavailable facts instead of inventing a stack. Inventory assets and their confidentiality/integrity/availability needs: money, tenant documents, sessions, provider tokens, uploaded files and published artifacts.
2. Identify actors and authority separately: anonymous visitor, ordinary tenant member, administrator, service principal, provider webhook sender and operator. Authentication proves identity, not authority over every object. Record membership source, revocation semantics and who may assert tenant context.
3. Draw or tabulate each real flow: browser to route, route to policy/data boundary, datastore to response, provider to webhook, worker to projection, search/cache to browser. Mark every change in trust. Record external inputs, execution context, privileged roles and the action each actor may perform.
4. For each boundary, write an abuse scenario with precondition, action and harmful outcome. Include guessed object IDs, role changes between request and effect, compromised client state, replay and failed durable writes. Identify a control and named implementation owner for each. Prioritize actual likelihood and impact using the existing severity rubric; no universal vulnerability verdict from the diagram.
5. Record assumptions and unresolved questions: role source, provider signature contract, data retention, privileged support and unavailable runtime. Choose a concrete denial or effect invariant for every material scenario and hand it to [guide 15](15-verify-actual-risk.md).
6. Revisit after a data flow, identity, permission or provider changes. Project Notebook records the accepted feature and contract evidence. Consult the packaged Data Foundation and Identity methods within Core, or the optional namespaced App Builder payment method if installed. Check actual availability before handoff; an absent capability is a gap, not authority to invent it.

Sources: [official source index](../references/official-sources.md). Scope, authority and owner handoff are Build Studio review policies.

Starter boundary: Cloudflare Workers owns the custom server/backend. Supabase Auth identifies callers; PostgreSQL policies govern authorized rows. R2 access is a separate server decision. No background-job provider is selected; a proposed durable inbox is a database design, not permission to select or install a queue. Optional Stripe uses hosted Checkout.
