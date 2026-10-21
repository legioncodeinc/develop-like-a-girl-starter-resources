# .gitattributes Starter Template

> Read-only proposal boundary: use supplied local evidence with Read/Grep/Glob/Skill. Every command below is illustrative for a separately authorized caller with the actual tools and exact repository/path/ref scope. This Specialist does not run Git, write files, stage, commit, switch, reset, rewrite, create/remove worktrees, install/configure hooks, access remotes or publish. Before any destructive/history action preserve approved byte/history backups, current full SHAs and rollback steps, confirm active ownership and obtain existing-or-new task-specific authorization. External effects, shared refs, settings, installs and another worker's files have their own explicit scope gates. Never treat the examples as a copy-and-run script.

A documented `.gitattributes` file for projects using Git LFS, line-ending normalization, and language-aware diffs.

---

## Template

```gitattributes
# =============================================================================
# Line endings
# =============================================================================
# Normalize selected text to LF in repository and working tree; review existing attributes
* text=auto eol=lf

# Explicitly mark shell scripts as LF (critical: CRLF breaks bash)
*.sh text eol=lf
*.bash text eol=lf

# Mark binary files as binary (prevents diff/merge/line-ending conversion)
*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.ico binary
*.webp binary
*.woff binary
*.woff2 binary
*.ttf binary
*.eot binary
*.pdf binary
*.zip binary
*.tar.gz binary
*.tar.bz2 binary

# =============================================================================
# Git LFS - large file storage
# Add patterns for files that should be stored in LFS
# =============================================================================
*.psd filter=lfs diff=lfs merge=lfs -text
*.ai filter=lfs diff=lfs merge=lfs -text
*.sketch filter=lfs diff=lfs merge=lfs -text
*.fig filter=lfs diff=lfs merge=lfs -text
*.mp4 filter=lfs diff=lfs merge=lfs -text
*.mov filter=lfs diff=lfs merge=lfs -text
*.avi filter=lfs diff=lfs merge=lfs -text
*.mp3 filter=lfs diff=lfs merge=lfs -text
*.wav filter=lfs diff=lfs merge=lfs -text

# Large data files (adjust threshold based on project needs):
*.csv filter=lfs diff=lfs merge=lfs -text
*.parquet filter=lfs diff=lfs merge=lfs -text
*.h5 filter=lfs diff=lfs merge=lfs -text
*.npz filter=lfs diff=lfs merge=lfs -text

# =============================================================================
# Language-aware diffs
# These tell Git which "word" function to use for hunk headers
# =============================================================================
*.py diff=python
*.rb diff=ruby
*.ts linguist-language=TypeScript
*.tsx linguist-language=TypeScript

# =============================================================================
# Linguist overrides (GitHub language statistics)
# =============================================================================
# Exclude generated files from language stats:
dist/** linguist-generated=true
build/** linguist-generated=true
*.min.js linguist-generated=true
*.min.css linguist-generated=true

# Mark documentation and data files:
docs/** linguist-documentation=true
*.json linguist-detectable=false

# =============================================================================
# Merge strategy overrides
# =============================================================================
# Custom merge drivers require explicit configuration and review; do not silently discard lockfile changes:
# (Uncomment if lock file conflicts are common in your team)
# package-lock.json merge=ours
# yarn.lock merge=ours
```

---

## Usage notes

1. Commit `.gitattributes` at the root of the repository.
2. After adding LFS patterns, run `git lfs migrate import --include="*.psd"` to retroactively move existing large files to LFS (see `guides/07-lfs-and-large-files.md`).
3. `eol=lf` controls checked-out line endings for those text paths; it does not require a blanket global core.autocrlf change or WSL. Preserve existing settings and inspect normalization effects in a separate authorized task.
4. Line-ending normalization only applies to new commits after `.gitattributes` is committed. To normalize existing files: `git add --renormalize .`

LFS patterns are optional examples, not mandatory defaults. Select only actual versioned assets with accepted storage/bandwidth requirements. Review all normalization and merge-driver changes before any configuration write.
