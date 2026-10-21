# LFS and Large Files - Git workflow

> Read-only proposal boundary: use supplied local evidence with Read/Grep/Glob/Skill. Every command below is illustrative for a separately authorized caller with the actual tools and exact repository/path/ref scope. This Specialist does not run Git, write files, stage, commit, switch, reset, rewrite, create/remove worktrees, install/configure hooks, access remotes or publish. Before any destructive/history action preserve approved byte/history backups, current full SHAs and rollback steps, confirm active ownership and obtain existing-or-new task-specific authorization. External effects, shared refs, settings, installs and another worker's files have their own explicit scope gates. Never treat the examples as a copy-and-run script.

Git LFS, partial clone, and sparse checkout for managing large files and repositories.

---

## Why large files hurt Git

Git stores every version of every file in its object store. A 100 MB binary file committed 10 times = 1 GB in `.git/objects/`. This makes `clone`, `fetch`, and `checkout` slow even if you only need the latest version.

Three solutions, each for a different problem:

| Problem | Solution |
|---|---|
| Large binary files (media, datasets, models) | Git LFS |
| Huge history you rarely need | Partial clone (`--filter=blob:none`) |
| Monorepo where you only work in a subdirectory | Sparse checkout |

---

## Git LFS

Git LFS replaces large files with small pointer files in the Git object store, storing the actual file content on an LFS server.

### Installation

```bash
# macOS:
brew install git-lfs

# Ubuntu/Debian:
sudo apt-get install git-lfs

# Windows:
winget install Git.LFS

# Enable for the current user:
git lfs install
```

### Tracking file patterns

```bash
# Track all PNG files:
git lfs track "*.png"

# Track all files in a directory:
git lfs track "assets/**"

# Track files over a size threshold (manual - LFS tracks by pattern, not size):
git lfs track "*.psd"
git lfs track "*.mp4"
git lfs track "*.zip"
```

This adds entries to `.gitattributes`:
```text
*.png filter=lfs diff=lfs merge=lfs -text
*.mp4 filter=lfs diff=lfs merge=lfs -text
```

**Commit `.gitattributes` to the repo** - this is how other developers know which files use LFS.

### Adding LFS files

```bash
# After tracking the pattern, add and commit normally:
git add design-mockup.psd
git commit -m "add design mockup"
git push origin main  # LFS content is pushed separately
```

### Verifying LFS is working

```bash
# Check tracked patterns:
git lfs track

# Check status of LFS objects:
git lfs status

# List all LFS objects in the repo:
git lfs ls-files

# Verify pointer files (no large content in Git objects):
git lfs pointer --file=design-mockup.psd
```

### Migrating existing history to LFS

```bash
# Migrate all files matching a pattern across all history:
git lfs migrate import --include="*.psd,*.mp4" --everything

# After migration, force-push all branches and tags:
git push --force-with-lease=refs/heads/feature/example:<expected-old-sha> origin <new-sha>:refs/heads/feature/example
git push --force-with-lease=refs/tags/example:<expected-old-tag-sha> origin <new-tag-sha>:refs/tags/example
```

### CI/CD patterns

In CI, skip LFS download if not needed:
```bash
# Disable LFS for CI jobs that don't use large files:
GIT_LFS_SKIP_SMUDGE=1 git clone <repo>

# Or configure in your CI YAML:
# GitHub Actions:
# - uses: actions/checkout@REPLACE_WITH_VERIFIED_FULL_COMMIT_SHA
#   with:
#     lfs: false
```

For CI jobs that do need LFS files:
```yaml
- uses: actions/checkout@REPLACE_WITH_VERIFIED_FULL_COMMIT_SHA
  with:
    lfs: true
```

### Platform LFS storage and bandwidth limits

For the selected GitHub repository, record current account/organization LFS storage, bandwidth units, billing scope, usage and dated official plan evidence. No historical free quota is a current guarantee. Unknown amounts remain unknown; purchases need explicit approval. Git LFS concerns versioned repository assets. Customer application uploads belong to the approved R2/ownership design and are not automatically added to source control.

---

## Partial clone

Partial clone lets you clone a repository without downloading all file contents (blobs) or even all trees. You get a functional repo; Git fetches missing objects on demand.

```bash
# Blobless clone (history without file contents - most common):
git clone --filter=blob:none https://github.com/org/repo.git

# Treeless clone (even lighter - no tree objects):
git clone --filter=tree:0 https://github.com/org/repo.git

# After cloning, working with files fetches missing blobs automatically.
# A repeated blob:none fetch still filters blobs; it does not fetch every missing blob.
# Plan explicit required-path materialization or another supported unfiltered copy separately.
```

Partial clone requires actual installed feature and selected GitHub server support. Check the exact options and network authorization; do not infer support from a platform name.

**Use partial clone when:**
- The repo has a large history with many large files you do not need for your current task
- You need to quickly `git log`, `git blame`, or search history without downloading file contents

---

## Sparse checkout

Sparse checkout lets you check out only a subset of the working tree - essential for monorepos where you only work in one package.

```bash
# Enable sparse checkout after cloning:
git clone --sparse https://github.com/org/monorepo.git
cd monorepo

# Or enable on an existing clone:
git sparse-checkout init --cone

# Specify which directories to check out:
git sparse-checkout set packages/my-app packages/shared-lib

# Add more directories:
git sparse-checkout add packages/design-system

# Return to full checkout:
git sparse-checkout disable
```

**Cone mode** (confirm actual installed feature support) is optimized for directory-level patterns - fast and predictable.

```bash
# See what's included:
git sparse-checkout list
```

Combine with partial clone for maximum speed in large monorepos:
```bash
git clone --filter=blob:none --sparse https://github.com/org/monorepo.git
cd monorepo
git sparse-checkout set packages/my-app
```

---

## Cleaning up large files already in history

If large files were accidentally committed (without LFS), they must be removed from history using `git filter-repo`. See `guides/02-history-rewriting.md` for the procedure.

Quick check for large objects in history:
```bash
# Find the 10 largest objects in the Git object store:
git rev-list --all --objects | \
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \
  grep '^blob' | \
  sort -k3nr | \
  head -10
```

