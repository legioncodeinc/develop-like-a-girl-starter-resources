# Guide 00 - Initialize Command

> Capability boundary: Read the Project Notebook entrypoint and `../references/library-boundaries.md` first. The procedure describes document semantics. Use available Read/Grep/Glob/Skill and authorized Markdown Write/Edit only; moves, shell commands, provider effects and unavailable services remain proposals.

Scaffolds or migrates a repository's `library/` folder to schema v2.

## Trigger phrases

- "initialize library"
- "set up docs"
- "scaffold documentation"
- "set up project-notebook"

## How to scaffold

No scaffold script is bundled. Create the v2 tree manually using the folder README seeds in `templates/`. Each `../templates/*-README.md` is the canonical seed for the matching folder - copy it in, do not invent new frontmatter.

No scaffold script is shipped by this capability. Read each seed and use authorized Markdown Write for missing files, preserving collisions. If a future deployment supplies a script, an authorized implementation caller must inspect it and its execution capability first; this Playbook cannot execute it.

## What to create (v2 target tree)

```
library/
  README.md
  knowledge/
    README.md
    public/
      README.md
      overview/
      guides/
      faqs/
    private/
      README.md
      architecture/                 (ADRs go here)
      contracts/
        README.md                   (from templates/contracts-README.md)
      standards/
        documentation-framework.md
  requirements/
    README.md
    in-work/   README.md
    backlog/   README.md
    completed/ README.md
    reports/   README.md
  issues/
    README.md
    in-work/   README.md
    backlog/   README.md
    completed/ README.md
  notes/                             human-managed; never create or inspect
```

Every supported documentation folder gets a seeded `README.md` with YAML frontmatter (`ai_description`, `human_description`) explaining the folder's invariants. The seeds live in this skill's `templates/` folder.

## v1 -> v2 migration map

| v1 path | v2 path |
|---|---|
| `library/knowledge-base/<domain>/` | `library/knowledge/private/<domain>/` |
| `library/knowledge-base/overview/` | `library/knowledge/public/overview/` |
| `library/architecture/ADR-*.md` | `library/knowledge/private/architecture/ADR-*.md` |
| `library/requirements/features/feature-NNN-slug/` | `library/requirements/backlog/prd-NNN-slug/` |
| `library/requirements/features/.../prd-feature-NNN-slug.md` | `library/requirements/backlog/prd-NNN-slug/prd-NNN-slug-index.md` |
| `library/requirements/features/.../reports/` | `library/requirements/backlog/prd-NNN-slug/qa/` |
| `library/requirements/issues/issue-NNN-slug/` | `library/issues/backlog/ird-NNN-slug/` |
| `library/qa/` | `library/requirements/reports/` |

## Post-flight

After scaffolding:

1. Confirm every folder in the target tree exists and has its seeded `README.md`.
2. Confirm no operation read, created or modified `notes/`; ask the human to maintain it if desired.
3. Tell the user: what was created/migrated, that `notes/` is human-only, and the next steps for creating content.

## Error handling

- **Conflict on migration**: if a v2 destination already exists with different content, do NOT overwrite. Report the collision to the user for manual resolution.
- **Partial v1 tree**: migrate only the paths that exist; do not fabricate empty v1 folders to "complete" the map.
- **Not actually a repo root**: confirm you are at the repository root (where `library/` should live) before creating anything.

## Exact seed map

| Packaged template | Target below library/ |
| --- | --- |
| library-README.md | README.md |
| knowledge-README.md | knowledge/README.md |
| knowledge-public-README.md | knowledge/public/README.md |
| knowledge-private-README.md | knowledge/private/README.md |
| contracts-README.md | knowledge/private/contracts/README.md |
| documentation-framework.md | knowledge/private/standards/documentation-framework.md |
| requirements-README.md | requirements/README.md |
| requirements-backlog-README.md | requirements/backlog/README.md |
| requirements-in-work-README.md | requirements/in-work/README.md |
| requirements-completed-README.md | requirements/completed/README.md |
| requirements-reports-README.md | requirements/reports/README.md |
| issues-README.md | issues/README.md |
| issues-backlog-README.md | issues/backlog/README.md |
| issues-in-work-README.md | issues/in-work/README.md |
| issues-completed-README.md | issues/completed/README.md |

Templates are in `../templates/` relative to this guide. Compatibility names knowledge-base-README.md, features-README.md and qa-README.md map to Knowledge, Requirements and Reports respectively, never retired v1 paths. No exact seed exists for every empty optional domain: create only needed domains and write any requested domain README with the framework header; report it as newly authored. Add `requirements/plans/` only when an actual plan packet is requested. No template or directory is needed merely to satisfy an empty taxonomy.
