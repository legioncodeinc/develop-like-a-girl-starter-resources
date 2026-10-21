# Follow one Starter task from context to review

This reading journey helps a new builder understand the documents, owners and evidence around one bounded task. Project Notebook explains and records the requested local Markdown. It does not execute a build, create a contract-authoring capability, manage a session fleet or release a product.

Read [the documentation boundary](../references/library-boundaries.md), [method selection](../references/role-method-boundaries.md) and [the worked journey](../examples/starter-work-journey.md). Use [the learning handoff](../templates/starter-work-journey.md) when a written explanation or handoff was requested. This guide routes to complete local methods rather than requiring another repository.

## Understand the pieces

A Playbook is the reusable method: inputs, procedure, examples, failure handling and evidence limits. A Specialist is a bounded role that reads its paired method. Build Lead selects an available owner and checks the handoff. A plugin distributes the selected methods. A rule records a standing convention; a hook would be executable lifecycle automation. Starter does not gain a hook or native dispatcher because a guide explains those concepts.

Open the selected Playbook first and follow its local resource map for the actual question. A short description identifies a possible match; it does not prove the complete method loaded, a Specialist ran or the task succeeded. Use the actual registered namespace. Inspect the selected Core roster and separate Website Builder or App Builder registration before dependent work. Never substitute a file from another cache.

For capability selection use [Build Lead's outcome method](../../build-lead/guides/outcome-discovery.md) and [scope method](../../build-lead/guides/scope-and-tools.md). For a missing method, record the exact outcome and prerequisite. No automatic creation, registration, installation or model change follows.

## 1. Start from the real repository

Confirm the supplied root, current branch, requested integration base, existing dirty ownership and project conventions. A folder name or an empty supplied diff does not prove a clean Git repository. Keep repositories in stable separate locations appropriate to the owner's environment; do not move a checkout or impose a particular GUI, folder name or branch prefix.

[Project Setup](../../project-setup/SKILL.md) inspects the actual files and proposes a baseline. Its [first-session method](../../project-setup/guides/08-first-session-onboarding.md) separates repository documentation from personal home configuration. Missing tools, accounts, configuration or CI stay explicit proposals. Identical existing files remain unchanged; differing files receive a collision note. No completion marker substitutes for inspection.

When code already exists, use [the narrative method](../knowledge/playbook.md) for the expressly requested source scope. Begin a full requested corpus with its overview, architecture and request lifecycle; use a bounded tour for one journey. State unread sources and unobserved runtime. Do not infer a live backend, policy or deployment from a function name.

## 2. Choose the right document

The repository's existing Library is durable project context. Preserve its location and conventions. [The schema reference](../references/library-schema-and-workflows.md) gives the intended paths; [library boundaries](../references/library-boundaries.md) control what this role can actually do.

| Question | Document and method | Evidence required |
| --- | --- | --- |
| What should a planned feature do? | [Feature PRD](03-feature-prd.md) | Problem, affected people, scope, numbered observable criteria, failure paths, dependencies and verification plan |
| What defect needs correcting? | [Issue IRD](02-issue.md) | Existing issue in this repository, observed versus expected behavior, bounded correction and regression evidence |
| Why was a consequential choice made? | [Decision record](../adr/README.md) | Actual decision authority, accepted terms and substantive alternatives/consequences; keep an unaccepted proposal Proposed |
| How does the system work today? | [Narrative knowledge](../knowledge/README.md) | Actual source paths, symbols and revisions, with intended behavior and runtime observations distinguished |
| What shared behavior must independent work agree on? | Existing accepted interface record | Exact revision, actual accepting authority, provider/consumers and their checks; missing contract authoring remains unavailable |

PRD numbers come from the complete repository-local lifecycle inventory, highest plus one. IRD numbers match a supplied existing issue; do not invent one. An ADR keeps its permanent number. These identifiers are separate sequences.

PRD and IRD location records lifecycle: backlog, in-work and completed. A whole-folder move must preserve index, sub-PRDs and evidence. Project Notebook cannot perform moves. Return a precise proposed move for its authorized capable owner; never duplicate the folder or change only frontmatter to imply completion. Human notes are excluded from agent reads and writes. Private engineering knowledge is ordinary scoped documentation, not a place for credentials.

## 3. Define one useful outcome

Use [Project Planning](../../project-planning/SKILL.md) for an owner-requested strategy, journeys and bounded plan. Preserve what is already decided and ask only unresolved decisions that change the result. A hypothesis about users stays a hypothesis until evidence supports it.

A useful feature agreement names the current problem, affected user, outcome, non-goals, journey, loading/empty/denied/failure/recovery states, acceptance criteria, constraints, risks, dependencies and validation. An implementation task list alone does not settle these questions. Use [the complete PRD template](../templates/prd-template.md); a defect uses [the IRD template](../templates/ird-template.md).

For each criterion, identify the check that could distinguish success from failure. For example: an owner can read their export status, while another signed-in member receives neither that status nor a download URL. An attractive screen does not prove the denial path. Name unavailable tests and external observations before treating the criterion as verified.

Approve strategy, design and build-plan revisions according to the actual planning method. An approved plan does not itself authorize code changes, paid research, accounts, messages or deployment. Keep later ideas as a separately scoped proposal instead of silently expanding active work.

## 4. Identify shared terms before parallel work

Inventory shared requests, responses, events, schema, permissions, state transitions and errors. For each actual accepted agreement, record its path, exact revision, provider, consumers, accepting authority and required checks. Dependent PRDs and briefs must pin the same revision.

Draft, disputed, stale or missing terms block only their dependent work. Independent preparation can continue when it does not assume those terms are accepted. Starter has no selected Interface Contracts authoring method. Project Notebook can record the gap and supplied acceptance evidence; it cannot invent normative terms, accept them for the owner or present a drafting worksheet as a replacement specialist.

Use [planning boundary inventory](../../project-planning/guides/03-flag-boundaries.md), [the wave method](../../project-planning/guides/04-plan-waves.md) and [the Definition of Done method](../../project-planning/guides/05-set-definition-of-done.md). A wave orders dependencies. Available capacity and exclusive ownership can require smaller waves. The next dependent wave waits for the required evidence, not merely an author's completion sentence.

## 5. Hand off to an actual executor

A learning request ends with an explanation or the requested documentation. Implementation needs the user's actual build scope, a capable executor and the selected implementation method. Build Lead remains read-only and prepares [a dispatch brief](../../build-lead/templates/dispatch-brief.md). A method load does not create a worker.

Where delegation is actually authorized and supported, use [the full worker coordination method](../../build-lead/guides/worker-coordination.md). Count the coordinator, implementers, reviewers and any authorized nested workers against observed capacity. Reserve the needed review and integration space. Give every worker disjoint canonical paths, shared-owner exclusions, accepted revisions, concrete outputs/checks and the parent's deadline. Unknown capacity or absent status/stop tools means serial preparation, with the lost independent-execution evidence stated.

Starter does not provide a general PRD execution manager, persistent session fleet or background watchdog. An available Website Builder or App Builder handles its own specifically authorized journey and boundaries. Do not rename a missing general executor as a documentation step. Record who actually performed each action and retain unexecuted commands as NOT_RUN.

## 6. Know what completion means

Keep these states distinct when explaining progress:

| State | Meaning |
| --- | --- |
| Open | Required outcome has no completed evidence yet |
| Blocked | A specific decision, dependency or capability prevents this outcome |
| In progress | An actual identified owner is working within its scope |
| Done by author | The author reports saved work and its checks; independent acceptance remains pending |
| Independently verified | A separate qualified check matches the accepted criterion on the named candidate |

A documentation table can describe these states without creating an automated execution ledger. A structural helper validates only its stated input contract. A screenshot, mock, source listing, passing test, deployed service and reader teach-back prove different things.

The implementation close-out is Security Review, required fixes and affected rechecks, then independent Quality Review against the accepted plan, followed by the coordinator's direct GitHub Workflow repository-health review. Bind every report to the exact combined candidate. Changes can invalidate earlier evidence. Project Notebook links actual reports; it does not author independent findings or certify its own work.

Owner review precedes any separately authorized commit, push, PR, merge, publish or live operation. Honor authorization already given for the named task without asking the owner to repeat it. A passed gate does not create authority for a new action. A saved draft is neither a deployed feature nor a completed release.

## 7. Recover without losing the boundary

Use [Work Session Protocol](../../session-protocol/SKILL.md) and [compaction recovery](../../session-protocol/references/recover-after-compaction.md). Preserve the original objective, measured start/deadline and explicit continuation, actual ownership, failed approaches, matching check receipts and unresolved questions. A new worker, summary or turn does not reset them.

Review concrete file/check output at the operating cadence. A status message is not progress evidence. Before replacing a writer, obtain actual stop/final-state evidence and preserve its partial work; an uncertain writer keeps its lease. Never claim a timer, heartbeat or CI watcher runs unless it was actually configured and observed within authorized scope.

| Symptom | Bounded recovery |
| --- | --- |
| Playbook or Specialist missing | Inspect the actual selected roster/namespace and effective role. Record the gap; do not install, copy or remove anything as an automatic fix. |
| Same name selects an unexpected role | Compare effective prompt, tools and owner. Preserve shadowing evidence and ask the authorized maintainer for correction before affected delegation. |
| Helper or runtime unavailable | Keep the source review useful, identify the exact executor/tool need and mark execution NOT_RUN. |
| Source and package differ | Preserve both identities and request the authorized selected rebuild; do not hand-edit generated output. |
| Two components disagree | Reopen the accepted interface revision and affected consumer checks; keep unrelated work moving. |
| Same fix fails repeatedly | Preserve exact error and attempt count. Apply retry/stop limits; change the relevant input only with a reason, not merely a model swap. |
| New idea appears | Record a separate proposal and its owner decision, leaving the active accepted scope intact. |
| Secret appears in evidence | Do not repeat its value or copy it into a report. Record a redacted location and route the actual exposure through Security Review and its authorized owner. |

## Choose models only within the task's authority

Inherit the active host's settings unless the user selected a supported override. Dated model lists, prices and marketing benchmarks are not evidence of current availability. No model choice increases permissions.

When the owner requests a comparison, prepare representative cases and pass/fail criteria first, normally a useful set of 20 to 100 varied examples if the problem supports that scale. Compare the same inputs, reasoning/tool configuration and evaluation method. Record success, latency, input/output tokens, tool failures, retries and human correction time. Use task-specific evidence for an upgrade or cheaper route. The evaluation is a proposal until its permitted executor, cost and observed results exist. Do not make paid calls or change production aliases from this guide.

## Leave a usable explanation

Use plain words, define unfamiliar terms once and show one concrete journey. Preserve exact quotations and literal code while applying [the prose punctuation rule](../writing/guides/08-prose-punctuation.md) to authored text. Do not create a hook to enforce writing style.

Read back requested saved Markdown, check its actual source and local links, name Draft decisions and missing evidence, and return the session's six-field report. A reading journey is successful when its explanation is complete and its gaps are explicit. Reader understanding needs an actual observed response; it cannot be inferred from a well-written page.
