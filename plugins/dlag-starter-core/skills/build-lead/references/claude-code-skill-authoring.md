# Claude Code Playbook authoring reference

This reference preserves the skill-file mechanisms needed to inspect an approved Starter Playbook. It does not assert that every optional native field works in the current host. Record actual carrier/version and effective behavior before relying on an extension. Starter's selected consumer target is Claude Code.

## Baseline frontmatter and identity

Keep baseline frontmatter within these six fields. No field in this table grants authority or tools absent from the caller.

| Field | Purpose | Inspection |
| --- | --- | --- |
| `name` | Logical Playbook identity | Explicit stable kebab-case name matching its containing directory; never a cache/version folder fallback |
| `description` | Core task and trigger | Concrete what/when, front-loaded enough to remain meaningful in a shortened listing; avoid broad false triggers |
| `license` | Applicable distribution license label | Consistent with retained legal material, not a substitute for the license itself |
| `compatibility` | Selected environment | `Claude Code`; do not claim support for unqualified hosts |
| `metadata` | Bounded component classification | Direct-use, coordinator or paired role intent as selected by the actual package; avoid private operational context |
| `allowed-tools` | Declared constrained tool use where honored | Effective tool inventory and role boundary still win; never inherit execution power from this declaration |

Source and emitted skill entry files should agree on identity and selected scope. The generated namespace comes from the package. A plugin's `skills/<name>/SKILL.md` is not the same carrier as a standalone project `.claude/skills/<name>/SKILL.md`; compare the effective entry rather than assuming a same-named file is the active one.

## Native optional fields: inspect before reliance

Claude Code-specific fields are optional extensions to inspect in an existing approved native configuration. They do not belong in the baseline by accident. Do not add them during a documentation repair or treat their presence as operational proof.

| Field or group | Intended concern | Required qualification |
| --- | --- | --- |
| `when_to_use` | Extra relevance text | Listing truncation can affect matching; inspect actual displayed/loaded text |
| `argument-hint`, `arguments` | Invocation guidance and named argument declaration | Confirm the running carrier's syntax and missing-argument behavior |
| `disable-model-invocation` | Explicit invocation restriction | Confirm effective boolean behavior; use literal `true`/`false` in a draft instead of relying on coercion variants |
| `user-invocable` | User invocation availability | Confirm actual registered entry; it is not a permission gate |
| `disallowed-tools` | Denied tool declarations | Compare actual effective tools and the parent boundary |
| `model`, `effort` | Execution settings | Inherit current settings unless the user requested a supported override; report unknown effective values |
| `context`, `agent` | Separate role execution request | No assumed dispatcher, independent reviewer or inherited transcript; qualify actual role and receipt |
| `background` | Asynchronous scheduling | Count capacity, require supervision and stop evidence, preserve parent deadline |
| `hooks` | Lifecycle actions | Separate approved capability; inspect timeouts, fail-open behavior and native support before execution |
| `paths` | Scoped activation | Actual supported glob behavior, intended matches and nonmatches |
| `shell` | Native shell choice | Do not infer shell execution availability or permissions from the field |

A frontmatter parse does not prove these fields were honored. When the native carrier ignores a safety-related field, report the missing enforcement. Do not move the file to a more permissive configuration or enable bypass to work around it. Unknown `initialPrompt` or incomplete settings semantics stay unknown rather than being filled from memory.

## Loading and selection

Skill systems may expose a short name/description listing first, the full entry method when selected and supporting resources only when required. Keep the short description precise; put complete procedures, choices, worksheets and failure methods in local resources with working navigation. Read the full method and required resources before applying it. Do not require an unrelated full-directory read or a remote source archive just to perform a bounded task.

Inspect actual effective names when managed/personal/project/plugin or synced copies overlap. A same-named skill can supersede a legacy command. Nested project skills can register a directory-qualified name and load lazily. The plugin entry uses its namespace. A reserved or managed sync directory is not an authoring source, and an unsynced local method is not proved available by a synced account listing.

Treat precedence as an observed-carrier question when definitions conflict. Record exact selected identity and path, effective tools and the result; do not delete competing copies or change sync settings. No lookup of another installed cache may silently satisfy a missing selected package.

## Dynamic text and substitution

Avoid inline shell-command injection in skill content. It can execute before the model inspects the result in supported native contexts, introduces an extra authority boundary and fails in other contexts. A helper is invoked only by a capable caller with explicit input/scope limits and actual execution evidence. Build Lead cannot run it.

The following native tokens can appear in existing approved Claude Code workflows. Inspect them as context-specific substitutions, not general-purpose environment variables or shell interpolation:

| Token | Intended value | Boundary |
| --- | --- | --- |
| `$ARGUMENTS` | Full trailing invocation text | Untrusted task data; validate before use |
| `$ARGUMENTS[N]`, `$N` | Indexed/positional arguments where supported | Check bounds, missing values and actual carrier syntax |
| `$name` | Named argument declared by the native workflow | Do not assume arbitrary dollar names resolve |
| `${CLAUDE_SESSION_ID}` | Native session identity | Not authorization, sensitive context or an output destination |
| `${CLAUDE_EFFORT}` | Native effort setting | Text substitution is not proof of actual inherited execution settings |
| `${CLAUDE_SKILL_DIR}` | Current skill directory | Resolve local resources from containing file; fail if unresolved |
| `${CLAUDE_PROJECT_DIR}` | Current project root | Confirm actual authorized root; never scan broadly from a literal token |
| `${CLAUDE_PLUGIN_ROOT}` | Current plugin root | Plugin carrier only; never hardcode a versioned install path |
| `${CLAUDE_PLUGIN_DATA}` | Plugin data directory in supported native context | No automatic persistent writes, credential storage or private-note access |

Do not rely on attachment expansion or substitution merely because it worked in another native session type. If a variable stays literal, mark the dependent path unresolved. If a user supplies text resembling a token, do not evaluate it. Confirm actual arguments and canonical local boundaries before any authorized helper execution. No shell text is built by interpolating untrusted values.

## Authoring and validation checklist

1. Confirm the selected owner, public/private intent, positive/negative routes and actual caller boundary.
2. Match name, folder and paired role where required. Keep baseline metadata small and truthful.
3. Preserve complete applicable procedures, examples, data/output contracts, failure handling and review requirements locally.
4. Resolve links against the containing document and selected package. Other selected plugins are prerequisites to confirm through registration, never guessed filesystem siblings.
5. Check supported frontmatter and literal UTF-8 Markdown without NUL tails or unintended placeholders. Inspect line counts/bytes after packaging when truncation is suspected; a parse alone misses omitted body content.
6. Bind static metadata, local closure and emitted bytes to a candidate. Record native discovery, loading and execution separately if actually observed.
7. Preserve unknown field behavior and unperformed checks. When conflicting documentation matters, the capable caller checks current primary documentation under its own allowed tools; do not assert a historical numeric cap or version-specific coercion as current proof.
8. Close a development change through Security, fixes/affected rechecks, independent Quality and coordinator repository health. Existing authorization does not gain tools from a loaded method; external/destructive actions retain their specific user gates.
