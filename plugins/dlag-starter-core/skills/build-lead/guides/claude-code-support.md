# Qualify the Claude Code capability surface

Build Studio Starter supports Claude Code. A support table describes possible carriers; only the current session and selected installed package establish that a capability can run. Use this reference with the [component authoring method](claude-code-component-authoring.md), [registration procedure](capability-registration.md) and [capability evidence record](../templates/capability-evidence-record.md). Build Lead remains limited to Read, Grep, Glob and Skill. It returns inspections and handoffs; an authorized caller with suitable tools performs execution or changes.

## Choose the carrier before choosing a directory

| Need | Carrier | Qualification |
| --- | --- | --- |
| A short repository convention that should apply whenever its scope is loaded | Repository guidance or a scoped rule | Confirm the project guidance actually loaded and the intended paths match. A long specialist procedure belongs in a Playbook. |
| A bounded reusable method, selected by relevance or explicit request | Playbook, packaged as a skill | Confirm the exact installed namespace and its entry file. Loading a description alone is insufficient to apply the full method. |
| A short explicitly invoked workflow | Existing command or Playbook invocation | Confirm the registered command. Its arguments are task data, never extra authority. |
| Separate scoped work under a dedicated role | Registered Specialist paired with its Playbook | Requires actual dispatch tools, authorization, available role, known supervision/stop surface and capacity. A Markdown agent file alone proves none of these. |
| Distribution of selected methods and roles | Plugin | A parsed manifest proves structure. Native enabled discovery and invocation need their own observations. |

Do not introduce hooks, an MCP server or a native extension merely to carry instructions. A lifecycle automation or external tool need is a separate capability decision with its own contract, permission and review. Existing server tool availability does not transfer those tools to Build Lead.

## Recognize the five component locations

| Component | Project or user carrier | Plugin carrier | Important boundary |
| --- | --- | --- | --- |
| Repository guidance and rules | Project `CLAUDE.md` or `.claude/CLAUDE.md`, optional `CLAUDE.local.md`, `.claude/rules/*.md`; user `~/.claude/CLAUDE.md` | No assumption that a plugin changes project guidance | Inspect only authorized locations. Managed policy can constrain the session. Do not write user or managed settings during a component change. |
| Playbook | `.claude/skills/<name>/SKILL.md` or personal skill directory | `skills/<name>/SKILL.md` at selected plugin root | Keep a stable explicit name and folder. Nested project skills can be qualified by directory; use the name the running host actually exposes. |
| Command | Existing `.claude/commands/<name>.md` | `commands/<name>.md` at plugin root | Skills are the selected form for new reusable methods. A same-named skill can shadow a legacy command. |
| Specialist | `.claude/agents/<name>.md` or personal agent directory | `agents/<name>.md` at plugin root | Project/user/managed definitions can shadow plugin roles. Inspect the effective definition without removing anything. |
| Plugin | Selected installed package | `.claude-plugin/plugin.json`, with component directories beside `.claude-plugin/` | Only the manifest belongs inside `.claude-plugin/`; a misplaced component directory can parse yet remain undiscovered. |

Do not use a hardcoded cache or version directory to resolve another package. The Core roster and separate Website Builder/App Builder registrations establish selected availability. A folder listing, broader source catalog, prior installation or plugin manager screenshot does not prove a particular role loaded in this session.

## Qualify guidance and precedence without changing it

Repository guidance can accumulate along the path to the current working directory. A nested file adds context; do not assume it erases the root instructions. Scoped rules without a path filter can load unconditionally. A malformed or overly broad filter can leave a convention unused or apply it to unrelated work. Record the observed guidance and any unresolved conflict before dependent action.

If an existing project uses `AGENTS.md`, a project-approved `CLAUDE.md` import can carry the same local rules into Claude Code. An import is explicit; do not claim that every file named `AGENTS.md` was automatically loaded. Inspect relative imports against the containing file, bound recursion and avoid pulling in private directories. Changing the bridge or global guidance requires the user's applicable authorization.

Prefer the exact registered namespaced Playbook over a same-named standalone copy. For a Specialist name collision, inspect the effective role and tools. Do not delete the shadowing copy as a discovery fix. Report its path, scope and effect to the authorized maintainer.

## Record capability evidence by level

1. **Authored:** the source file and local supporting resources exist. Record candidate identity, owner and file hashes.
2. **Packaged:** the selected edition build contains the intended file, valid metadata and complete local link/dependency closure. Record the actual output identity and results.
3. **Discovered:** the running host exposes the exact package namespace and entry point. Record host/version when available and the observation. Unknown version stays unknown.
4. **Loaded:** the intended full Playbook or role prompt was read successfully, with the right local resources. A cached sibling is not a fallback selection.
5. **Executed:** the actual authorized executor returned a receipt or observed result under its effective tool boundary. A prepared brief is not execution.
6. **Reviewed:** Security, fixes and affected rechecks precede independent Quality; the coordinator directly performs repository health on the combined candidate. A source change can invalidate earlier candidate bindings.

Never advance a level from the previous level's evidence alone. A helper's structural PASS does not prove a native invocation, live capacity, permission, provider connection, deployment or independent review.

## Handle unsupported or unknown capability

Classify the affected method as preserved, translated, degraded or unavailable. Preserve means the same complete behavior can run with observed tools. Translate means a locally documented equivalent changes the carrier while retaining the contract. Degrade means a stated subset remains useful with named missing evidence. Unavailable means dependent execution stops. Record inputs, lost behavior, output limits and the smallest authorized next action.

For example, if a reviewer Playbook loads but no dispatch tool exists, a capable caller may perform direct review within its own tools. Label the executor and the lack of independent Specialist execution. Build Lead can prepare the exact brief; it cannot gain shell or editing tools by reading another role. Unknown parallel capacity means serial preparation, with no fabricated numeric limit.

## Failure examples and recovery

- **Manifest valid, method absent:** check selected edition and plugin, component location, declared namespace and discovery observation. Do not install or edit a cache as a shortcut. Keep packaged and discovered results separate.
- **Wrong Specialist selected:** compare the effective role's description, negative routes, ownership and tools. Preserve the collision evidence; request the authorized maintainer's correction before affected execution.
- **Method loads but helper cannot run:** keep the complete review method available for direct inspection. Provide a command only to a capable authorized caller and record NOT_RUN until actual output exists.
- **Dynamic variables stay literal:** stop any dependent path or command. Resolve the containing document's approved local path explicitly; never run an unresolved placeholder or infer a secret value.
- **Worker starts without its paired method:** stop it with the actual stop surface, inspect acknowledgment, preserve any partial files and return a correctly armed brief. Do not overlap a replacement writer with a worker whose stop is uncertain.
