# Git operating notes

Use these topic notes alongside the detailed local guides. They describe behavior and proposal choices, not installed tooling or permission to mutate a repository. Source-popularity and platform/version anecdotes are not current availability evidence.

## Key Findings by Topic Area

### Interactive Rebase

- All dated source notes agree on the `fixup` vs `squash` distinction (fixup = silent discard, squash = combine messages)
- `git config --global rebase.autosquash true` is an optional configuration proposal, subject to owner approval - eliminates need to pass `--autosquash` manually
- `git config --global rebase.autoStash true` can stash changes automatically; it is not permission to hide dirty work or ignore backup/ownership checks
- Git 2.32+ adds `fixup -C` / `fixup -c` variants for keeping the fixup commit's message
- `--update-refs` flag (Git 2.38+) needed for stacked branch / stacked PR workflows
- Golden rule consensus: never rebase commits already pulled by others

### Reflog Recovery

- Reflog entries expire after 90 days (normal) / 30 days (unreachable) - act fast
- `ORIG_HEAD` is the fastest recovery for "I just ran X and it went wrong" - but it's overwritten by the next dangerous operation
- `git fsck --lost-found --no-reflogs` is the fallback when reflog has expired or lacks detail
- `git reset --hard` destroys uncommitted work permanently - reflog cannot recover uncommitted changes
- Three reset modes must be clearly explained; `--soft` and `--mixed` are far less dangerous than `--hard`

### Worktrees

- Worktrees share the entire `.git` object store - commits are instantly visible across all worktrees
- One branch can only be checked out in ONE worktree at a time (Git enforces this)
- `git stash` is global across all worktrees - name stashes clearly
- `node_modules` / build artifacts are per-worktree (each needs a fresh `npm install` / etc.)
- Bare clone pattern (`git clone --bare`) is increasingly preferred for power users and CI
- 2026 trend: worktrees for AI agent isolation (Claude Code running in parallel)
- Available since Git 2.5 (2015) but still underused - position this as a well-proven, stable feature

### Git LFS

- Install git-lfs + `git lfs install` is a one-time per-machine operation
- `.gitattributes` must be committed to the repo FIRST before adding large files
- `lockable` attribute prevents concurrent edits to unmergeable binary formats (PSD, video, etc.)
- LFS pointer validation is a critical CI pattern: a pointer file is ~130 bytes; actual binary > 1KB
- `git lfs migrate import` for retroactive migration requires force-push + full team re-clone
- Partial clone (`--filter=blob:none`) and sparse checkout are Git-native alternatives when LFS isn't appropriate
- CI: `GIT_LFS_SKIP_SMUDGE=1` speeds up pipelines that don't need actual file content

### git filter-repo / Secrets Removal

- `git filter-branch` is officially deprecated - never recommend it in 2026
- Credential rotation must happen BEFORE/during history cleanup, not after - treat exposed secrets as compromised immediately
- `git filter-repo` removes the `origin` remote automatically as a safety measure - re-add it before force-pushing
- The `--sensitive-data-removal` flag provides more comprehensive cleanup than basic `--invert-paths`
- GitHub/GitLab retain cached data (PR diffs, search indexes) even after force-push - contact support for full cleanup
- BFG Repo-Cleaner is still valid for simple cases (delete file, replace string) but `filter-repo` is the official recommendation
- An approved rewrite-response plan must preserve collaborators' unique work and prevent old secret-bearing history from being reintroduced; simple pull/reset commands do not prove that outcome

---


## Known limits

Signing setup and a deeper bisect workflow are not complete procedures in this method. Do not claim they were implemented or tested. Branching-policy, PR-culture and formal repository-health coverage belongs to their own accepted methods; this Git contributor does not establish their full coverage.

Keep raw research archives and current official requirement verification separate from command execution and real recovery evidence. No original-source repository is required to use the local guides.
