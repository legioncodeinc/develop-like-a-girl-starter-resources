# Guide 06 - Sync Audit / Maintenance

> Capability boundary: Read the Project Notebook entrypoint and `../references/library-boundaries.md` first. The procedure describes document semantics. Use available Read/Grep/Glob/Skill and authorized Markdown Write/Edit only; moves, shell commands, provider effects and unavailable services remain proposals.

Covers detecting and fixing drift between the library structure and schema v2.

## Trigger phrases

- "run a sync audit"
- "check for drift"
- "is everything in the right folder?"
- "audit the library"

## Drift types to check

### 1. v1 path remnants

These should not exist in any repo. Flag every one found:

| Stale path | Fix |
|---|---|
| `library/knowledge-base/` | Migrate to `library/knowledge/private/` per the map in `guides/00-initialize.md` |
| `library/architecture/` | Migrate to `library/knowledge/private/architecture/` |
| `library/requirements/features/` | Migrate to `library/requirements/backlog/` |
| `library/requirements/issues/` | Migrate to `library/issues/backlog/` |
| `library/qa/` | Migrate to `library/requirements/reports/` |

### 2. PRD/IRD naming violations

Check that all folders under `requirements/backlog/`, `requirements/in-work/`, `requirements/completed/`, `issues/backlog/`, `issues/in-work/`, `issues/completed/` follow the naming rules:

- PRD folders: `prd-<###>-<slug>/`
- IRD folders: `ird-<###>-<slug>/`
- Old naming like `feature-007-...` or `issue-042-...` should not exist.

### 3. Missing index files

Every PRD folder must contain `prd-<###>-<slug>-index.md`. Every IRD folder must contain `ird-<###>-<slug>-index.md`. Flag folders missing their index.

### 4. Missing qa/ subfolders

Every PRD and IRD folder should have a `qa/` subfolder (even if empty). Create missing ones.

### 5. Missing README.md files

Every v2 folder should have a seeded `README.md` with the correct YAML headmatter. Seed any missing ones from this skill's `templates/` folder.

### 6. Stale wiki pages

An existing project may derive pages from source entities. Flag pages whose cited path no longer exists, identify the actual responsible maintainer and request regeneration when that project already has the relevant tool. Starter does not provide that tool. Preserve the page until its author resolves the gap; see `07-wiki-sync.md`.

### 7. Shared contract drift

For new or changed PRDs, compare their shared boundaries with accepted `CTR` records. Flag missing contract links, nonexistent revision pins, active PRDs still pinned to superseded agreements, broken relative links after lifecycle moves, and accepted terms contradicted by native schemas or implementation. Completed historical PRDs retain their original accepted pin. Manually inspect relative links and exact pinned revisions; automated contract validation is unavailable. Route semantic differences to the actual designated contract owner. Project Notebook repairs authorized PRD links; the actual designated contract owner owns the record.

## Audit procedure

1. Walk the `library/` tree and compare it against the v2 target in `guides/00-initialize.md`. An unexplained legacy folder or a required missing README is drift; preserve deliberate documented project conventions and supported domain folders.
2. Grep for old naming patterns:
   Use the available Grep tool for `knowledge-base`, retired nested features/issues paths, and `feature-[0-9]{3}|issue-[0-9]{3}`. Scope each search to authorized library paths and exclude human notes before reading results.
3. Check PRD and IRD folder names, indexes, and `qa/` directories against sections 2 through 4.
4. For changed PRDs, inspect `## Contract dependencies` and manually compare accepted CTR structure and known links; report external validator execution as unavailable.
5. Report every semantic contract mismatch with the exact record, revision, PRD, and source path. Route record changes to the actual designated contract owner and PRD link repairs to `project-notebook`.
