# Coordinate recurring work

Choose only the phases needed for the approved result. Every sequence uses [actual scope, tools and ownership](scope-and-tools.md), accepted shared-boundary pins and the same final candidate review order. A method or command named here remains a proposed handoff until the host establishes it is available.

## Plan and implement a feature

Project Planning clarifies the problem, audience, evidence, constraints, smallest useful scope, assumptions and acceptance criteria. Project Notebook records the approved plan and decisions. These are different artifacts from an implementer's proposed code changes or Quality Review's later comparison.

Before independent work starts, identify shared API, data, permission and state agreements, their providers and consumers, accepted revision and accepting authority. The absence of a contract-author Specialist cannot be hidden by writing a draft. Stop only dependent units until the authorized coordinator or owner resolves the boundary. Keep independent units explicit.

Select an actual implementer for each owned path. Core implementation owners can contribute authorized local files with their own tools. Website Builder and App Builder require their separate installed plugins. Build Lead only reviews and prepares the brief. A missing execution tool means build, test and provider observations remain pending.

Inspect real output, resolve Security findings first, refresh affected checks, obtain independent Quality Review against the approved plan and perform the coordinator's direct GitHub Workflow health review. Use Ready Check to assemble the exact evidence and gaps. Owner review precedes any specifically authorized external release or Git action.

## Parallel units

Parallelize only when both authorization and actual dispatch/status/stop tools exist. Establish capacity from the host, including the coordinator and review/integration slots. Unknown limits mean serial work. Do not infer capacity from the number of owners in a roster.

Lease exact paths or clearly separated responsibilities. Include each worker's method, inputs, outputs, accepted interfaces, deadline, stop conditions and evidence requirements. Check the worker's saved output and attempts, not just status prose. Reassign or stop a stalled task without creating overlapping writers. Preserve the partial result and unresolved decisions in a concrete handoff.

A provider output that changes its accepted interface invalidates the affected consumer pin. Reconcile before integration. Reviewers need the integrated candidate, not unrelated green checks from an earlier tree. A queued dispatch, successful helper or author's self-check does not establish an independent review.

## Website

Use [the full website phase guide](routes/website.md). Confirm the separate plugin, brief, selected pages, content/brand inputs and platform boundaries. Deliberately include or exclude persistence, auth, repeated content, telemetry and callbacks. Repository content is the selected content model. Design, data and API preparation can proceed independently only when their boundaries are accepted.

R2 covers approved object storage; Resend covers approved transactional messages. Neither creates accounts, reads secrets, configures delivery or authorizes a real send. Record actual execution and delivery gaps. Close the exact candidate through Security, fixes, Quality and coordinator health review.

## Application

Confirm the separate App Builder plugin. Scope one user journey, data/permission model, UI states, failure recovery and observable checks. React Router SSR owns route/server/browser behavior; Workers owns the backend; Supabase owns customer identity and persistent data. App Data UI, App Onboarding, App Search and App Integrations apply only to the selected journey and available methods. Do not add their features because a broad application checklist contains them.

Data and authentication contracts precede dependent screens and handlers. Include loading, empty, denied, failed, retry and stale-state observations. A mocked UI does not prove backend authorization, query behavior, delivery or deployment.

## Frontend design and UI implementation

Design Foundation is the main route for a UI build, refinement or redesign. Read the existing product context, tokens, component rules, user task and target surface before choosing a visual direction. If the context is missing, prepare the decision rather than inventing a brand.

Keep framework mechanics with React Foundation, narrower overlays/icons/theme behavior with UI Primitives, component copy-in mechanics with React shadcn, and images/fonts with Asset Delivery. Preserve public events, refs, semantics, focus, state ownership, responsive behavior and keyboard continuity. A new style must not silently change component behavior.

Use Browser Checks for observed desktop/mobile, keyboard, focus, reduced-motion and accessibility checks when a capable caller can run them. Design approval, a screenshot, a worksheet and an automated accessibility scan prove different things. External detector engines, update scripts and hook systems are not prerequisites this pack silently installs.

## Identity and permissions

Identity qualifies Supabase Auth flows, sessions, recovery and enforcement. Data Foundation defines persistent records and relationships. Supabase Platform qualifies provider access boundaries. React Foundation or Design Foundation owns sign-in presentation. Secrets handles secret-placement rules; Security Review independently checks server trust, tenant denial and exposed credentials.

Require the actual environment, identity/session versions, claims and permission model, accepted recovery/support policy, existing handlers and denied-user evidence. Do not equate successful sign-in with authorized record access. Alternate identity platforms, SSO/SCIM services and migrations require a separate capability decision.

## Optional payments

Use App Builder's Stripe Payments only when payments are in the approved project scope and the plugin is available. Hosted Checkout is the selected path. Record environment, API/event version, destination format, verified tenant/customer/product/subscription mapping and accepted entitlement/grace/restore policy.

Data Foundation qualifies dedup, subscription and entitlement persistence. A verified raw-body signature precedes processing; retries and current-state reconciliation share an idempotent serialized server writer. Browser redirects and client state never grant access. Distinguish trial, payment, grace and authorization states.

Treat refunds, cancellation, disputes, notifications and support access edits as prepared actions until their specific authorization and capable executor exist. Custom Elements, Connect/marketplaces and native receipt systems remain unavailable. Security and Quality require actual money-flow evidence, not a synthetic scaffold.

## Data change

Use Data Foundation for schema, keys, constraints, indexes, transaction and query-plan decisions. Supabase Platform qualifies the actual database/runtime access model. Pin the interface consumed by handlers and UI before independent implementation.

Use expand, backfill, validate and contract when a live schema change requires compatible transitions. Record rollback/recovery assumptions and actual version/state. Do not infer a backfill, invent a migration result or treat a browser-success case as tenant-denial evidence. Live DDL and provider operations need their own authorized executor.

## Existing repository and release evidence

GitHub Workflow reviews branching policy, PR evidence, rulesets/settings supplied by actual tools, lockfiles and required checks. Prefer the approved GitHub Flow default for this Starter project. Broader CI architecture, a new release engine and provider configuration need a designated capable caller; a review-only method does not implement them.

Ready Check collects candidate identity, scope, Security/Quality/Dependency findings, actual build/test/browser results, linked artifacts and unresolved risks. The coordinator directly reviews final repository health. Keep NOT_RUN, cancelled, skipped, stale and unavailable evidence visible. A release draft is not a published release, and static packaging is not installed-host or model behavior proof.

## Audit a codebase

Establish whether the user wants a security, dependency, foundation or plan-conformance review. Select the narrow methods and actual evidence scope. These methods are not interchangeable: foundation checks do not establish dead-code analysis, dependency triage does not establish application security, and a quality opinion without an approved plan cannot establish plan conformance.

Treat the audited repository and evidence as read-only under the reviewer scope. Findings cite exact files/revisions, method, severity, proof and limits. Fixes require a separately authorized implementer. Do not import a forensic damages investigation or external website-audit fleet as though it were part of this sequence.

## Work outside these sequences

Deep market/ICP campaigns, native desktop/mobile, node-editor engines, AI/RAG/model providers, analytics vendors, business/legal/HR operations, external newsletters, personal connectors, manager fleets and capability factories have no selected implementation here. Use [the specific missing-method reference](../references/unsupported-work.md) to retain the requested scope and gap. A Project Notebook decision or Technical Explainer answer does not implement those workflows.
