# Review shared-boundary inputs before parallel work

Use this method when independently owned plans or workstreams rely on the same observable API, event, data shape, permission or state transition. Build Lead inspects supplied records and returns a bounded readiness finding with Read, Grep, Glob and Skill. It does not author normative contract terms, accept an agreement, edit a PRD, run a validator, launch workers or gain tools from a record. Full contract authoring is not an installed Starter capability. Obtain missing terms from the actual designated owner.

Use the [review worksheet](../templates/shared-boundary-review.md) and [worked readiness case](../examples/shared-boundary-readiness.md). Project Notebook owns expressly authorized requirements and link maintenance. [Worker coordination](worker-coordination.md) owns actual capacity, leases and handoffs; a complete agreement alone does not prove those conditions.

## 1. Establish the boundary and inspection scope

Read the actual accepted task, feature brief, existing PRD index and relevant sub-PRDs, supplied agreements, native schemas, applicable ADRs and relevant source interfaces. Inspect only authorized technical documents. Exclude credentials, customer records and human notes before reading. Record unavailable inputs as gaps.

A separate shared agreement is useful when at least two independently owned workstreams rely on one observable behavior. An internal detail confined to one PRD may stay there. Inventory each real shared boundary, provider or producer, every known consumer, owning PRDs, supporting source, open question and affected completion claim. Include external service handoffs when actually selected; do not add a job, messaging, storage or newsletter provider because an example mentions one.

Record the supplied agreement identity, exact revision and actual status: accepted, draft, missing or superseded. Those are evidence observations, not approval actions. If an ADR, schema, code or another accepted agreement contradicts it, preserve both sources and block the affected decision. Do not silently choose a convenient source. Independent sections can proceed while their unsettled shared dependency remains explicitly incomplete.

## 2. Verify acceptance rather than trusting a status string

An accepted-looking heading, author name, timestamp, validator PASS or worker assertion does not establish acceptance. Inspect the actual user's acceptance or a verified scoped delegation and the exact revision it covers. A decision about another revision or unrelated task does not transfer. Preserve the decision reference and unknowns; do not copy sensitive private discussion into the record.

Under the package's existing CTR convention, accepted normative terms stay immutable. The contract owner handles Draft revisions and accepted successors; Build Lead does not allocate identifiers or edit their content. Existing repositories may use another format, so inspect the actual stable identity and acceptance policy. A document counter is distinct from a native API/schema version and a deployed SemVer release.

Acceptance must cover every material normative choice and identify the provider and all known consumers. An unresolved type, requiredness, authorization, error, ordering or compatibility rule keeps that boundary draft or disputed. Report the exact blocked PRDs or criteria and the smallest missing decision. Do not turn independent contributor agreement into user acceptance.

## 3. Inspect the complete observable surface

Use the supplied terms and native schema as evidence. Record proposed or absent fields as unknown, never fill them with a new design decision. A payload example is not the whole schema. When JSON Schema, OpenAPI, an event schema or another machine-readable description exists, record its actual dialect/version and identity; no parsing or current-spec compatibility is inferred here.

| Boundary | Inspect in the supplied agreement |
| --- | --- |
| HTTP | Method, path, parameters, request body, response statuses and shape, identity/authentication, authorization, version and error representation. Keep safe public errors separate from internal diagnostics. |
| Events | Producer, consumers, channel/topic, message identity, correlation/key, headers, payload schema, ordering, retry, duplicate handling, delivery and failure behavior. A background provider must be an actual selected fact. |
| Shared data/types | Owner, schema location, field names/types, requiredness, nullability, identifiers, defaults, access boundaries and migration rules. Database ownership and file/download permission are separate where applicable. |
| Permission or state | Verified actor, record/tenant ownership, allowed actions/transitions, initial/terminal states, timing, replay, failure and visibility to each caller. A hidden UI control is not server authorization. |
| Every boundary | One purpose and explicit exclusions; provider and every consumer; sources supporting each rule; a valid synthetic example and an error/edge case; native version; compatibility/rollback; separate checks on both sides; exact PRD pins and acceptance evidence. |

For a supplied protocol-specific rule, preserve the actual constraints. For example, a project using Protocol Buffers needs its real tag and reserved-field policy inspected; that does not select Protocol Buffers for Starter. Keep the complete accepted native schema available rather than deriving a new schema from a few specimen fields.

## 4. Inspect structure and dependency pins within the real convention

The following are manual inspection questions, not a shipped automatic contract validator:

1. Does each referenced record exist within the authorized technical scope, with a unique stable identity and exact revision? If the project uses CTR filenames, check that convention and duplicate IDs; do not impose it on another format.
2. Are boundary/scope, parties, sources, agreed behavior, examples, compatibility/rollout, verification, PRD dependencies, open decisions and history present and substantive? A heading with no terms is incomplete.
3. Does an accepted record have actual acceptance evidence for its current terms, no unresolved normative decision and no unfilled template field? A textual `None` does not resolve a contradictory schema or another open field.
4. Does every dependent PRD or sub-PRD pin the same accepted revision under its actual contract-dependency section, with a valid local link? Check both the PRD-to-agreement and agreement-to-PRD relationships where the convention promises them.
5. Do predecessor/successor identifiers, revisions and reciprocal references agree? Retain the old normative body and its evidence. A status/link update is distinct from rewriting history.
6. Did a PRD lifecycle move leave a stale relative link or pin? Project Notebook may repair expressly authorized documentation links; Build Lead returns the exact source/target issue and the current owner.

A missing folder or zero supplied records means the relevant scope was not established. It is not a successful whole-repository agreement audit. Parsing and link checks cannot prove agreement correctness, actual user approval, consumer behavior or provider implementation.

## 5. Carry the accepted boundary into a bounded handoff

For each dependent PRD, record the exact accepted identity/revision, provider and consumer owners, terms that constrain its acceptance criteria and planned verification. Use separate file ownership and preserve accepted shared pins across independent authors. Requirements can finish independently only where all their shared normative decisions are settled. An unavailable designated owner is a named gap; do not invent a registered Specialist.

At execution time, inspect the pins again. An old plan may reference a superseded agreement. Use the actual approved wave plan and Definition of Done when supplied; propose a changed order rather than silently replacing it. The coordination helper's structural PASS does not prove approval, capacity or those actual interface terms.

For each acceptance criterion, preserve its original text, identity, owner, dependencies, evidence location and state. Keep these meanings distinct:

| State | Evidence meaning |
| --- | --- |
| OPEN | Ready to assign, not started. |
| BLOCKED | A specific decision or dependency prevents the affected criterion. |
| IN PROGRESS | Bounded work has an actual owner. |
| DONE | Its author reports implementation and its own applicable checks complete. |
| VERIFIED | Fresh independent evidence supports the criterion against the actual candidate and pin. |

A stub, production-path mock, TODO, prepared test or a green unrelated run cannot advance a criterion. Record the evidence that changed its state. Build Lead returns the record in chat; an authorized document owner saves it when requested.

## 6. Require both provider and consumer evidence

Name a concrete provider check and a concrete consumer check, their owners, expected assertions, evidence locations and states. Check valid behavior, errors, missing input, unauthorized/wrong-owner access, unsupported states and the relevant old/new revision cases. Preserve the actual code and run identity when results exist. A proposed test stays planned or NOT_RUN.

Provider-only success does not prove that a consumer handles the interface. Consumer mocks do not prove the real provider implements it. A static schema and an executable interaction test answer different questions; a handful of passing interactions does not establish the complete static surface either. Verify each affected party against the same accepted terms and actual candidate before marking a shared criterion VERIFIED.

Do not claim live Supabase authorization, Workers routing, R2 access, email or payment behavior from document inspection. Server identity, record ownership, object permissions and entitlements retain their separate implementation and Security verification obligations.

## 7. Review change, mixed versions and history

Compare a proposed behavior change with the accepted terms, native schema, source code and every dependent PRD. Identify the exact normative change and every affected provider, consumer, schema, criterion and check. Removal, requiredness/type change and changed meaning are presumptively breaking until the affected parties prove compatibility. An optional addition can still break a strict older consumer.

Inspect staggered deploy and rollback behavior, not only the final intended state. Keep document revision, native schema/API version and deployed release separate. The contract owner supplies and obtains acceptance of a successor when accepted normative behavior changes; do not repin active PRDs while the proposal remains unsettled. Keep completed historical PRD pins at the revision their evidence actually addressed.

Report dangling links, active pins to superseded terms, incompatible mixed versions, code/schema contradictions and new unagreed shared boundaries. Independent unaffected work can continue. An accepted successor, authorized link maintenance and both parties' applicable evidence are distinct steps.

## 8. Close the right claim

Return the scoped inventory, actual acceptance evidence, exact pins, structural issues, compatibility risks, provider/consumer proof and blocked versus independent criteria. Ready for parallel PRD completion requires every relevant shared normative decision settled and owned; implementation verification additionally needs actual evidence on both sides.

For implementation acceptance, require Security, resolved findings and affected rechecks, independent Quality, then the coordinator's direct GitHub Workflow repository-health review on the combined candidate. Missing tools or a reviewer leave an unfinished gate, never a waived requirement. Pure document preparation can return its sourced findings while stating those implementation gates did not run. No author or helper supplies commit, push, provider, deployment or publication authority.
