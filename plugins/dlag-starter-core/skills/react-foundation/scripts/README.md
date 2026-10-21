# Optional review helpers

These are inert source resources. React Foundation's role has no shell tools. An explicitly authorized caller with an existing compatible local runtime may run them; no installation, app script execution or provider operation is implied.

## Anti-pattern scanner

scan-anti-patterns.ts requires an already installed compatible ts-morph and an explicit authorized source root. No target tsconfig.json is read. Invoke with that project's existing TS runner and an explicit source directory. The helper reads only bounded regular single-link source files, then constructs an in-memory Project with no config, import dependency or standard-library resolution. It implements heuristic expression-body setState effects, aggregator barrels with more than three exports, and simple index-key spellings. It does not implement the eight header proposals, prove stale-state bugs, inspect server auth, or supply a full AST security audit. It excludes the old RSC directive detector because Starter uses framework SSR. Exit0 means completed, with REVIEW_REQUIRED; confirm severity manually. A flagged effect can have a valid external lifecycle.

## Bundle measurement

Use a Node runtime supporting native TypeScript stripping or an existing TS runner:

```text
node <skill>/scripts/bundle-budget-check.ts BUILD_DIR MANIFEST ENTRY [BUDGET_KIB]
```

The supported mode counts the explicit Vite entry's deduplicated static JavaScript imports, raw bytes and gzip level9 bytes. Dynamic entries are listed separately. Optional positive budget is KiB gzip. Exit0 without a budget means MEASURED_NO_BUDGET; exit1 means measured OVER_BUDGET; exit2 means UNVERIFIED input. Filename-only usage is rejected. This is not a URL-route, SSR/server-bundle, browser transfer/timing, CSS/media or dynamic-total measurement. See guide23.

The contained bundle Python unittest file runs twelve synthetic graph/budget/error cases against the actual helper with temporary local bytes. Run only after inspecting both scripts with an existing Python/Node runtime. It does not build Vite or mount React.

## Version audit

react-version-audit.ts reads a bounded regular single-link package.json from the caller's current directory and emits minimized declarations. Package names and arbitrary Git/URL/file/workspace refs are never printed. Canonical numeric semver is recognized, including valid prerelease/build forms, but suffix contents are omitted to avoid exposing arbitrary metadata. Use native TS stripping or the existing TS runner. Only recognized numeric React-major constraints enable its version guidance; aliases/workspaces/ranges need lockfile review. Package presence does not prove installed versions, Compiler activation, route mode or compatibility. Missing optional libraries are not defects and do not authorize additions. No file writes or subprocesses occur in this helper.

## Evidence limits

Run actual app checks only under their existing authorization and budget. Record helper bytes, caller runtime, target identity, invocation, stdout/stderr and exact exit. No helper output clears Security or Quality, SSR/hydration, browser accessibility or live identity/storage/payment behavior.

## Shared input boundary and tests

All three helpers import safe-input.mjs. Reads refuse symlinks (including parents inside the selected root), hardlinks, nonregular files/FIFOs, known private paths and oversized input. File descriptors use O_NOFOLLOW and O_NONBLOCK, verify inode/link/type identity and read bounded chunks. Unsupported platform flags fail closed with UNVERIFIED. A selected root is explicit caller scope, not permission to read arbitrary home or credential paths.

Package limit: 256KiB. Manifest: 2MiB, contained within explicit BUILD_DIR. Assets: 8MiB each, 64MiB total, at most 256 static graph entries and 4096 manifest entries. Only the measured static JS graph is reported; rejection exits2 and supplies no zero-byte/pass result. Source scan: 256 files, 1MiB each, 32MiB total, depth12 and 4096 visited entries; hidden/private/dependency paths are excluded, symlinks refused. Existing algorithms still operate on accepted inputs.

The additional test_input_boundaries.py exercises synthetic local intake, FIFO/path/symlink/hardlink/private/size/count refusal and manifest output redaction through existing Node. It does not import ts-morph or execute project modules. In-memory Project/skipFileDependencyResolution/createSourceFile options were checked against [official setup](https://ts-morph.com/setup/), [source inputs](https://ts-morph.com/setup/adding-source-files) and [memory filesystem](https://ts-morph.com/setup/file-system); actual installed ts-morph execution remains pending.

Roots must be canonical and every root component must be a non-symlink directory. Known credential/environment/assistant-store paths and library/notes, journals, personal and memories branches are refused; technical src/private and library/knowledge/private remain permitted. Use an explicitly authorized canonical technical root. Node path APIs cannot atomically pin every ancestor directory: the caller must own the selected root and ancestors and exclude concurrent hostile ancestor renames. File descriptor checks still guard type/inode/link identity and changed-file metadata; this is not an adversarial filesystem sandbox guarantee.
