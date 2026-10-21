# Optional tooling: adr-tools and Log4brains

Plain Markdown in the existing Project Notebook directory is the default. These tools are optional reference choices for a separately requested tooling task. This capability cannot run commands, install dependencies, write YAML/configuration, publish a site or update a remote repository. An authorized implementation caller must inspect current official documentation, installed versions, repository conventions and permission scope before any setup. The command/configuration examples below are NOT_RUN reference sketches, not copy-ready current recipes.

## adr-tools

### Installation boundary

A package-manager install, global install or tool download needs its own task-specific authorization. Do not infer one from "write an ADR". Inspect existing tools first; reuse the established directory and number format. No install command is selected or executed by this guide.

### Key command responsibilities

| Existing tool action | Intended result | Required verification |
| --- | --- | --- |
| Initialize the log | Select the existing ADR directory and template | No duplicate directory; existing records unchanged |
| Create a record | Allocate next permanent identifier and open a document | Actual max-plus-one; correct format; no fabricated acceptance |
| Create a superseding record | Link new choice to old | Inspect both new and old reciprocal pointers and history |
| Generate a table of contents | Update a local index | Every entry/status/link resolves to current Markdown |
| List records | Inventory existing identifiers | Include all actual records, not just an assumed latest filename |

A separately authorized caller may inspect `adr init`, `adr new`, `adr new -s [number]` and `adr generate toc` in its installed tool's help. Those names describe the source workflow; their exact flags and supported listing behavior must be confirmed before use. A tool-generated record still needs the owner, acceptance evidence and honest consequences.

### Custom templates

Use the complete packaged Nygard or MADR template as the starting format. The installed tool controls its template location; inspect that actual configuration before changing it. Do not assume that writing a file named template.md makes it active. Keep custom fields, number width and existing log path consistent.

### Limitations

Authoring and HTML rendering are separate needs. Confirm the actual tool's supported supersession, template and multiple-log behavior rather than assuming every CLI updates the old record or supports a monorepo. Always inspect both records manually. Tool output does not establish source or decision completeness.

## Log4brains

### Installation and initialization boundary

Log4brains can render Markdown ADRs for browsing and may provide record authoring. Any package execution or interactive initialization requires an authorized tooling task and a verified current version. Do not run an unpinned npx download from this Playbook. Inspect the existing project's package scripts/configuration before proposing an integration.

### Configuration shape

A proposed configuration needs project identity, authors, package names/slugs/paths and the actual ADR folder. Example values are placeholders for design review, not a valid installed configuration:

```yaml
project:
  name: "[Project ADR log]"
  authors:
    - name: "[Approved author]"
packages:
  - name: "[Package]"
    slug: "[package-slug]"
    path: "[existing package path]"
    adrFolder: "library/knowledge/private/architecture"
```

Validate the exact supported schema for the chosen version. Do not relocate an existing decision corpus to match this illustration.

### Key command responsibilities

Preview, create-record and static-build operations are separate. A future approved caller should verify the installed equivalents of `log4brains preview`, `log4brains adr new` and `log4brains build`, their output path, return code and actual local output. A successful build does not prove the content's truth, reciprocal supersession or browser usability. Creating HTML does not publish it.

### CI/CD integration review

No CI workflow or deployment host is selected here. For a separately requested pipeline, identify its actual trigger branch/path filters, least-privilege read permissions, exact runtime/tool versions, dependency lockfile, local output directory and artifact checks. Keep content checks distinct from build success. External publication needs separate explicit authorization and an approved destination. Do not copy a GitHub Pages or other provider deployment step into the Workers project as a default. Secrets and write tokens are not needed for a read-only document build; any external effect needs a specific reviewed design.

### Maintenance and failure handling

Inspect current releases/support before adopting optional tooling; no historical version/date is a current maintenance claim. Unknown command, schema mismatch, empty index, missing source records, incorrect directory, duplicate numbering or broken reciprocal links are stop conditions. Preserve original Markdown, record exact failure output with secrets redacted, and continue with manual authorized authoring where that meets the task. Never retry unchanged setup indefinitely or rewrite an existing corpus merely to satisfy a tool.

## Tooling decision matrix

| Actual need | Starting method |
| --- | --- |
| Record or supersede a decision | Plain Markdown, packaged format and manual reciprocal checks |
| Existing team CLI workflow | Inspect its installed commands/template and use only authorized actions |
| Searchable local HTML | Evaluate the requested renderer against the actual corpus |
| Multiple package logs | Confirm real package ownership, paths and renderer support |
| Format checks in CI | Define required sections and link checks first; build success alone is insufficient |

Prefer the least tooling needed for the requested outcome. No new dependency, settings change or publication is necessary for a useful ADR log.
