# Author and inspect Claude Code components

Use [capability qualification](claude-code-support.md) before authoring. This is a maintainer reference for an already authorized bounded component change. It does not add a public capability factory to Starter or authorize installation, settings changes, plugin selection or publication. Build Lead can read the proposal and return the record; an authorized source owner makes changes.

## 1. Rules and repository guidance

Choose a short always-applicable rule only for a stable repeated convention. Put the longer procedure in its owning Playbook and link to that local method. Do not add a specialist's execution close-out to a manifest or an always-loaded rule merely because other component types use one.

| Element | Shape | Required inspection |
| --- | --- | --- |
| Project guidance | Plain Markdown in the project's selected `CLAUDE.md` location | Existing instructions, directory scope, actual loading and user authority to change it |
| Local guidance | `CLAUDE.local.md` | Private local intent and existing ignore policy; never publish its contents automatically |
| Topic rule | `.claude/rules/<topic>.md` | Actual Markdown discovery and whether the topic should be unconditional |
| Path activation | YAML `paths` list in the topic rule | Supported glob syntax, intended matches, representative nonmatches and bounded expansion |
| File import | `@relative/path.md` in guidance body | Resolve from the containing document; inspect scope and import depth; no external/private material without authorization |

An illustrative path-scoped rule for an authorized project owner:

```markdown
---
paths:
  - "src/server/**/*.ts"
---
# Server input boundaries
Validate untrusted request fields at the server boundary. Apply the project's
accepted permission and tenant contract before reading or changing records.
```

If shared project instructions are already approved in `AGENTS.md`, a draft bridge is:

```markdown
@AGENTS.md

# Claude Code project context
Read the existing plan and accepted interfaces before changing the assigned files.
```

These are documentation examples. They are not installed by this method. Do not replace existing guidance, add symlinks, change managed policy or silently expand scope. Keep instructions short enough to inspect; do not depend on a historic numeric size or pattern budget as proof that the running host loaded them. Bad bracket expressions, broad directory globs and recursive imports need explicit negative checks. A parse success alone does not establish activation.

## 2. Plugin package structure

Inspect the actual selected plugin root and manifest. The structural layout is:

```text
selected-plugin/
  .claude-plugin/
    plugin.json
  skills/
    selected-playbook/
      SKILL.md
      README.md
      guides/
      templates/
  agents/
    selected-specialist.md
  commands/
    existing-workflow.md
```

The optional `commands/` directory is only for approved existing command workflows. A component directory placed under `.claude-plugin/` is a discovery defect. Empty optional directories do not need to ship. Do not add hooks, MCP/LSP declarations, monitors, executable bins or settings stubs to make this example look complete. Each requires an actual approved capability and validation method.

| Manifest field | Role | Validation |
| --- | --- | --- |
| `name` | Package identity and invocation namespace | Stable kebab-case identity, exact selected owner, no collision or invented availability |
| `description` | Human package description | Truthful selected scope and prerequisites |
| `version` | Distribution revision | Change according to the package's release policy; bind checks to the emitted version and bytes |
| `author` | Publisher attribution object | Preserve applicable legal notices; never copy a personal contact as fictional publisher data |
| Other fields already selected by the package | Component paths and supported metadata | Validate against the actual builder/host carrier; unknown fields are not proof of functionality |

A minimal illustrative manifest, not an install instruction:

```json
{
  "name": "review-example",
  "description": "Example package for a bounded local review method",
  "version": "0.1.0"
}
```

A parsed manifest does not prove native discovery. For a namespaced skill, check the actual `package:method` registration. For an agent collision, compare project/user/managed and plugin definitions without deleting a copy. Migration to a plugin is not permission to remove standalone files.

## 3. Command workflow authoring

A legacy command is a flat Markdown file under an approved command directory, not a folder. It can carry `description` and `argument-hint` frontmatter. A bare prompt can be structurally valid but still needs an explicit output contract, scope, missing-argument behavior and stopping conditions. New reusable methods stay in Playbooks unless the approved design requires a command wrapper.

Use the [bounded review command template](../templates/commands/review-bounded-change.md). It loads the actual Build Lead method first, preserves positive and negative routing, names the exact candidate and inputs, limits execution to the caller's real tools, and returns evidence and unperformed checks. The invocation's trailing text can supply `$ARGUMENTS` or positional tokens in a supported native context. Parse them as untrusted task text. Do not interpolate them into shell commands or filenames, infer approval from them or claim they were expanded without observing that behavior.

A skill can take precedence over a same-named legacy command. Verify the effective entry point and namespace. If an expected command is missing, report discovery as unavailable and hand off through an actually loaded Playbook. Do not install a new wrapper or alter permissions to force it to appear.

## 4. Specialist definition

A Specialist is an executable role only after native registration and an authorized dispatch. Its paired Playbook contains the complete method. The source role must name its exact identity, explain its trigger and negative routes, load the paired local method, restrict tools, preserve ownership and produce the required evidence. Do not require a worker to reread unrelated files merely because they share a directory; read the full entry method and every supporting resource required by the selected procedure.

| Role field | Purpose | Starter authoring boundary |
| --- | --- | --- |
| `name` | Exact role identity | Stable lowercase/hyphen name, no manually embedded namespace colon |
| `description` | When delegation is appropriate | Concrete triggers plus the local body's negative routes |
| `tools` | Allowed tool surface | Explicit minimum; omission can inherit broader tools, so inspect it |
| `disallowedTools` | Additional deny list | Inspect effective boundary, not only the text |
| `model` | Execution model | Inherit current settings unless user-authorized supported override exists |
| `maxTurns` | Native turn cap where supported | A cap does not enforce the parent's wall-clock deadline |
| `skills` | Native method preload where supported | Confirm the actual full method loaded; do not treat a name string as proof |
| `permissionMode` | Native permission behavior | Not an authority grant; plugin carrier may ignore it; never enable bypass as a fix |
| `mcpServers` | Native server selection | No new provider/server registration in a Starter role draft |
| `hooks` | Role lifecycle behavior | No new hooks here; ignored or unsupported fields cannot enforce safety |
| `memory` | Persistent-learning location | No automatic memory writes or private-context capture |
| `background` | Background scheduling request | Requires supervision, capacity accounting and stop evidence |
| `effort` | Native reasoning setting | Inherit; a textual field does not prove effective value |
| `isolation` | Native worktree isolation request | Needs actual authorized worktree behavior; it does not settle shared contracts |
| `color` | Presentation | No operational or security meaning |
| `initialPrompt` | Native prompt configuration | Exact effect must be qualified in the running host before reliance |

Some native role fields are carrier-specific. Plugin roles can ignore `permissionMode`, `mcpServers` or `hooks`; moving the definition into project settings to gain those behaviors is a separate configuration change. Treat unsupported enforcement as missing evidence. Never claim prose restrictions are a sandbox.

Illustrative read-only role, not a new Starter public owner:

```markdown
---
name: bounded-review-example
description: Inspect the supplied candidate and return evidence for its accepted scope.
tools: Read, Grep, Glob, Skill
model: inherit
---
Read the selected paired Playbook and its applicable local resources first.
Inspect only the supplied paths and candidate. Return exact findings and limits.
Do not execute commands, edit files, access credentials, use providers or release.
Preserve the parent's deadline and authorization. Missing inputs block only
work that depends on them. Do not claim separate execution without a receipt.
```

The real Build Lead Specialist retains its own Read/Grep/Glob/Skill boundary. Do not copy an implementation role's tools into it. An author cannot certify its own work as independent Security or Quality.

## 5. Playbook definition

Use [the complete skill authoring reference](../references/claude-code-skill-authoring.md). Baseline frontmatter stays within `name`, `description`, `license`, `compatibility`, `metadata` and `allowed-tools`. Choose a stable explicit name matching the containing folder, a precise trigger description, and `compatibility: Claude Code`. Supporting guides, decision tables, worksheets, examples and qualified helpers remain local to the package. Preserve substantive failure and review methods; do not replace a procedure with a topic list or a link to an unavailable original.

A documentation-only inspection example:

```markdown
---
name: bounded-review-example
description: Inspect a supplied change against its accepted plan and return located evidence.
license: AGPL-3.0-or-later
compatibility: Claude Code
---
# Inspect the supplied change
Read the accepted plan, exact candidate and applicable local method before work.
Respect the caller's actual tools and source ownership. Return located findings,
checks observed, checks not run, candidate identity and unresolved decisions.
```

The example has no implicit shell execution, provider access or release action. A loaded Playbook cannot grant tools or waive the user's authority. A license label is not a substitute for preserving the actual required legal material in distribution.

## 6. Validate structure, behavior and availability separately

1. Compare source owner, scope, metadata and name/folder identity against the approved change. Confirm no new public owner was accidentally introduced.
2. Resolve every consumer link from the containing file. Refuse links that escape the selected distribution or depend on another source checkout. Confirm separate-package prerequisites through registered capability rather than sibling cache paths.
3. Inspect frontmatter and JSON with the existing approved validators. Do not install a validator or name a passing command before actual output exists. A capable caller executes only checks within its own authority.
4. Compare route triggers, negative routes, roster entries, sequences and counts in both directions. Every listed owner must exist; every shipped public method must have an intentional route.
5. Check the generated selected edition output and exact saved-tree identity. Static packaging does not prove installed Claude Code invocation.
6. Qualify optional native fields against actual host evidence before relying on them. Record unknown or unsupported behavior and the preserved/translated/degraded/unavailable result.
7. After source changes, bind Security, fixes and affected rechecks, independent Quality and coordinator repository health to the combined candidate. Present reports before any separately authorized commit, push, installation or publication.

If a required field, local resource or accepted dependency is absent, do not announce registration as complete. Keep independent documentation preparation possible and name the blocked dependent behavior.
