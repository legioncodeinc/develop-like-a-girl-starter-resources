# Inspect what a structural check actually proves

Use this method when the authorized task supplies component source, templates, validator code, packaging output or check receipts. Build Lead reads the supplied evidence with Read, Grep, Glob and Skill and returns located findings in chat. It does not import or execute a script, run fixtures, install parsers, create a component, produce an archive, select a package or alter configuration.

Read [component authoring](claude-code-component-authoring.md) for selected Claude Code fields and placement, [task availability](selected-task-availability.md) for actual owner/prerequisite evidence, and [candidate claims](candidate-runtime-claims.md) for current review binding. A validator name or exit success does not prove every field, source file or native behavior was checked.

## 1. Identify the actual check and its input

Record the exact source/handler hash, supplied command and arguments, actual executor and candidate, target scope and expected output. Distinguish source inspection, static parsing, actual fixture execution, package construction and native host behavior. A proposed command stays NOT_RUN. A script that exists but was never invoked is not a passing check.

Read the check body as data. List the predicates it actually tests and the files it actually reads. An example helper checking only existence and nonempty bytes establishes only those two properties. It does not validate naming, metadata, links, schema, authority, security, semantic fidelity, complete resource retention or native availability. A placeholder implementation is incomplete even when its stub returns success.

## 2. Inspect parser coverage before trusting parsed fields

Identify the parser and any fallback actually used in the supplied run. A full YAML parser and a small flat key/value parser are different check surfaces. A fallback accepting flat scalars, inline lists and indented list items may ignore nested maps, multiline scalars, malformed indentation or unsupported syntax. Returning an empty mapping or partially parsed metadata after an error cannot establish that the original document was valid.

Check expected mapping/string/list/boolean types explicitly. A truthy object, number or list is not a valid string name simply because it is nonempty. Duplicate keys, unsupported keys, unfinished frontmatter and invalid JSON need actual error or unsupported-coverage evidence. If the supplied check does not test them, record that gap; do not claim they were exercised. No parser package is installed to improve the evidence during this read-only review.

Use the selected package's actual field policy. Keep baseline name, description, license, compatibility, metadata and allowed-tool declarations distinct from optional native fields. Preserve explicit stable identity, containing-folder agreement, precise triggers, the selected Claude Code target and actual tool limits. A historical upload cap, reserved-word rule or boolean coercion in another carrier is not automatically this package's current requirement.

## 3. Inspect templates without activating their examples

Classify each supplied file as a real selected component, private reference, constructed example, inert template or unfinished stub. A template containing placeholders, unimplemented helper functions, example names or a nonfunctional server command cannot be announced as a working method. A nested entry named like a real skill or manifest can also be accidentally discovered if the builder blindly includes it.

Compare the actual emitted public entry list and declared component paths with intended selection. An illustrative agent, command, skill or plugin skeleton remains private documentation unless expressly approved and registered. Do not count it as another public capability, preserve a fictional role to satisfy a pair rule or add an executable stub to make a scaffold look complete.

Only the selected manifest belongs in its manifest directory; selected components and local resources follow their actual carrier layout. Inspect unexpected nested manifests, unresolved placeholders and generated versus canonical identity. Consumer links resolve from the containing file and stay within their selected distribution. Do not use another repository, archive, cache sibling or symlink escape to satisfy missing resources.

## 4. Inspect package boundaries and retention from supplied evidence

If the task includes actual packaging evidence, record exact source root, output destination, member list, actual bytes and candidate identity. A source scan and an emitted archive can differ; check both within the supplied scope. Preserve applicable licenses/notices, complete selected guides/templates/examples and qualified helper resources. Do not read private files or construct an archive to fill missing proof.

Review whether the supplied method rejects parent traversal, absolute or nonportable member names, control characters, symlink escapes and unsupported file kinds. Source intake and output destination need independent confinement. Placing archive output inside its own source can cause self-inclusion or repeated growth; an explicit outside-source target avoids that class of defect only when the actual operation enforces it.

Check regular-file, size/count and total-byte limits where the real method promises them. A filename or successful `stat` does not by itself prove a stable, bounded, single-link file was safely read. Input bytes, collected in-memory bytes, archive size and final member count are different bounds. Static source review does not prove race resistance, runtime timeout or native acceptance. Preserve gaps rather than importing limits from an unrelated packager.

Keep package source, marketplace/index source, selected installed artifact and native runtime observations distinct. A pin on one layer does not identify all other layers. This inspection neither creates a marketplace nor fetches, publishes, updates or enables anything.

## 5. Interpret result status and reduced coverage honestly

Read both machine-readable status and actual exit behavior. A useful deterministic check should make its exact predicate, result and usage/environment errors explicit. The inspected source may use different conventions; state its real contract instead of assuming one. A disagreement between JSON status and exit code is a finding, not a choice of whichever looks green.

Warnings, skipped formats, informational unsupported-host results and unavailable parsers remain reduced coverage. A forced packaging option can produce an archive while errors remain; archive existence is not a clean validation result. Never recommend forcing or suppressing errors to manufacture a pass. If a required check was skipped, the dependent claim stays incomplete.

Preserve safe failure classes and exact located evidence. Do not copy raw secret values, private payloads or unnecessary filesystem content from diagnostic output. A validator that invokes code, follows imports, writes results, uses providers or expands its source scope needs its own actual execution authority; reading its method does not authorize those effects.

## 6. Return a bounded inspection result

Record the actual predicate coverage, parser/mode, inspected scope, skipped or absent checks, template/public-entry classification, resource and package boundary evidence, exact result and current candidate. Use explicit NOT_RUN for all unperformed execution. State the smallest affected conclusion and the existing owner responsible for a correction.

An actual implementation change still closes through Security, required fixes and affected rechecks, independent Quality and the coordinator's direct GitHub Workflow repository-health review. A parser pass, source hash, nonempty stub, forced archive or source template cannot establish semantic fidelity, native execution, permission, user acceptance or release readiness.
