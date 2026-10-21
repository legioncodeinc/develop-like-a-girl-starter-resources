# Guide 07 - Entity pages and authored knowledge

Read [capability boundaries](../references/library-boundaries.md). The repository's library is its documentation source of truth. Entity-derived Markdown and narrative explanations may coexist in it; an exported mirror is derived and is never edited directly.

## Page identity and responsibility

Project Notebook maintains requested document organization, PRDs, IRDs and narrative Markdown. Some existing projects also generate one page per significant module, exported function or type. Automatic entity extraction is not packaged in Starter. Do not advertise a callable extraction Specialist or claim its parser ran.

For each existing page, identify its author, backing code paths/symbols and whether it is curated source or regenerated output. Keep one library per repository. Separate workers can own distinct files; sharing the directory does not permit overwriting one another. Never delete, rename or rewrite another worker's active page without the user's explicit authorization and a resolved ownership handoff.

## Drift and coexistence

A page whose backing entity or path was deleted is stale. Record both page and missing path in the [drift review](06-maintenance.md), describe the consequence and propose an update. Preserve the old source identity until the responsible author resolves it. Do not silently remove the page or hand-edit a generated mirror. For a requested narrative explanation, trace the real source and write the authorized Markdown directly; an unavailable generator is not a reason to omit supported narrative work.

Illustration, NOT_RUN: `app/services/profile.server.ts` may be explained by `library/knowledge/private/data/profile-service.md`, cross-linked from the architecture overview. Those project-relative paths are illustrative, not packaged files. To prove them in a real repository, inspect the actual paths, source behavior, permission checks and independent evidence.
