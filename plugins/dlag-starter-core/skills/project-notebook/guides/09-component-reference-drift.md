# Review component and reference drift

Compare the selected package's declared documentation and callable components with the safe local filesystem in both directions. This is a read-only documentation review within Project Notebook, not a new command, registrar, scanner or permission to change installed files. Read [document boundaries](../references/library-boundaries.md) and [library maintenance](06-maintenance.md) first.

## Establish the actual scope

1. Read the actual selected package manifest, capability list, resource map and applicable component-directory conventions supplied for this review. Conventional skills/, agents/ and commands/ roots can declare components without explicit manifest component arrays. Record the convention or catalog rule that identifies each component, package identity, subject revision or supplied working-copy identity, authorized paths and known exclusions. Do not infer enablement from an installed cache or an optional package's existence.
2. Separate canonical authoring source, generated output and selected installed copy. Read the source being reviewed; do not patch installed copies to conceal source drift. A historical record or a valid native Claude Code path is not stale merely because another layout exists.
3. Use only available Read, Glob and Grep for safe authorized files. Exclude secrets, credentials, customer data and human notes before reading. If the needed inventory or directory is unavailable, label that check unavailable rather than treating absence of access as absence of a file.

## Compare declarations and files both ways

Make an inventory with component kind, public identifier, owner, declaration source or directory convention, resource path, actual path and selection state. Inspect the selected package's actual convention/catalog map before deciding which files are public components and which are private support. Enumerate each skill, Specialist, command, rule and supporting resource actually in the selected review scope, including components declared through conventional directories. Then enumerate corresponding actual files and reconcile both sets. Directory/schema conformity is source evidence; actual native discovery requires separate observed host evidence.

A declared path with no actual target is missing. Label an actual public component undeclared only when it is absent from every applicable declaration and selected discovery convention. A manifest omitting explicit component arrays is not, by itself, evidence of an undeclared component. Duplicate public identifiers or conflicting owners require evidence from the actual declarations or convention-derived identities. An unselected optional capability is unavailable, not automatically a missing source component. A guide or fixture is private supporting material, not a newly registered public skill, and needs no independent public-component declaration.

For each declared Specialist/Playbook relationship, compare names, ownership, entry links and actual registration. Require the relationship the selected package actually promises. Honor explicitly declared standalone or orchestrator exceptions; do not invent paired roles merely to satisfy a filename pattern. Project Notebook may consolidate multiple private methods under one registered owner. That consolidation is valid when its methods and navigation are complete, not because old filenames match.

## Check routing and dependency closure

Compare every directly advertised request/route with its actual destination and prerequisite. For a genuinely nested workflow, check its own procedure rather than requiring every internal leaf to become another public route. Flag a route to an unavailable owner, contradictory edition assumptions, duplicate routing authority or instructions that bypass the selected owner.

Inspect relative Markdown links and imperative bare resource paths in the reviewed skills, roles, commands and rules. Resolve each link from its containing file. Distinguish packaged targets, target-project paths awaiting instantiation, intentional placeholders, external citations and dated historical text. A target-project specimen is not proof that a target application exists. Record malformed/unresolved active instructions with the exact referring location and required correction. Preserve quoted historical material unless current runtime instructions still depend on it.

## Check prose and actual host readiness

Apply [the punctuation rule](../writing/guides/08-prose-punctuation.md) to newly authored prose. Keep code/literal data, verbatim quotations and unrelated existing content under the stated exceptions. Check the requested Claude Code package metadata and allowed tools using the supplied manifest and actual files. Project Notebook does not execute a schema validator or launch a host.

Cross-host upload validation is outside the selected Claude Code scope. Do not run another host's upload validator, claim compatibility from a source label, or count an unselected host as a Starter failure. If separately requested host qualification lacks an actual tool/evidence, report NOT_RUN with the concrete missing validator and target instead of substituting a source-only pass.

## Produce the review

Use [the existing review template](../templates/notebook-review.md). Record category totals and individual findings with severity, declared/source path, actual target evidence, impact, proposed correction and missing evidence. Do not classify a style issue as a broken component. Prioritize declared-but-missing components and contradictory ownership/pairing first, then route gaps, dead references, stale active instructions, host qualification gaps and style findings.

Update an existing authorized review record when the user requested that exact edit; otherwise return a draft or use the expressly requested document destination. Do not overwrite a runtime manifest, register a role, edit configuration, silently repair findings or create a second competing report because a source example named one. Preserve prior dated evidence and bind any new findings to the inspected subject revision.

A structural check cannot establish semantic completeness, installed host discovery, provider correctness or successful application execution. For implementation acceptance, run Security Review first, resolve findings and recheck the corrected subject, then obtain independent Quality Review, then have the coordinator directly perform the GitHub Workflow repository-health review. A delegated claim does not replace that final direct review. If any required execution capability or reviewer is missing, record NOT_RUN and leave the implementation gate unfinished; availability does not waive a required step. A read-only documentation comparison may return its sourced observations while explicitly stating that these implementation gates did not run. Before a commit/push or other external action, preserve the actual user's task-specific authorization boundary. Report missing checks plainly.
