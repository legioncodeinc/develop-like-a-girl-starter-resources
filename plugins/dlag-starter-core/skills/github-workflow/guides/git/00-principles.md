# Principles - Git workflow

> Read-only proposal boundary: use supplied local evidence with Read/Grep/Glob/Skill. Every command below is illustrative for a separately authorized caller with the actual tools and exact repository/path/ref scope. This Specialist does not run Git, write files, stage, commit, switch, reset, rewrite, create/remove worktrees, install/configure hooks, access remotes or publish. Before any destructive/history action preserve approved byte/history backups, current full SHAs and rollback steps, confirm active ownership and obtain existing-or-new task-specific authorization. External effects, shared refs, settings, installs and another worker's files have their own explicit scope gates. Never treat the examples as a copy-and-run script.

Use these principles when reviewing Git changes or proposing recovery. They do not grant execution tools.

---

## Beginner practice and real-repository ownership

For basic learning, use guide 09 and the runner's task-created disposable repository. Its synthetic local commits do not authorize commits or history edits in a user's project. For real-repository actions confirm the exact action/path/ref, source revision, dirty/untracked/ignored bytes, ownership, and user authorization. Before destructive or history-changing work, preserve necessary source bytes and history in approved backup locations; a bundle does not contain all working-tree or ignored bytes and reflog is not an unlimited backup. Never force a dirty switch or overwrite another worker's changes as a teaching shortcut.

## 1. Escape-hatch-first

Before recommending any destructive operation, show the recovery command. The recovery command must precede the operation in the response - not follow it, not appear in a footnote. The developer may not get a second chance to read.

| Destructive operation | Show this first |
|---|---|
| `git reset --hard` | `git reflog` to find the sha; `git reset --hard ORIG_HEAD` to undo |
| `git rebase` | `git reset --hard ORIG_HEAD` or pre-rebase sha from `git reflog` |
| `git filter-repo` | `git bundle create backup.bundle --all` before running |
| `git push --force-with-lease` | Keep the pre-push sha from `git log -1 --format=%H` |
| `git stash drop` | `git fsck --lost-found` to find dangling blobs |
| `git commit --amend` on pushed commits | Record sha first; force-push with lease after amend |

---

## 2. `--force-with-lease` over `--force`

Never recommend `git push --force`. Always recommend `git push --force-with-lease`.

**Why:** `--force` overwrites the remote ref unconditionally. If a teammate pushed since your last fetch, their commits are silently discarded. `--force-with-lease` checks that the remote ref matches your local tracking ref before overwriting, aborting if it does not.

For maximum safety, use the ref-specific variant:
```bash
git push --force-with-lease=refs/heads/feature/example:<expected-old-sha> origin <new-sha>:refs/heads/feature/example
```

The only exception: the very first push of a new remote (`git push -u origin main`) where force is not in play.

---

## 3. Never recommend `git filter-branch`

`git filter-branch` carries an official warning about pitfalls and recommends an alternative such as filter-repo. Use `git filter-repo` (Python tool, must be installed separately) or BFG Repo Cleaner (JVM-based, faster for single-file removal).

| Tool | Use case | Speed | Correctness |
|---|---|---|---|
| `git filter-repo` | General history rewriting, removing files, strings, paths | Fast | High |
| BFG Repo Cleaner | Removing large files or credentials from history | Very fast | High |
| `git filter-branch` | Legacy scripts only | Slow | Known bugs |

If you encounter `filter-branch` in an existing script, flag it and offer the `filter-repo` equivalent.

---

## 4. Confirm Git version before advanced features

Always check `git --version` before recommending a feature that requires a specific Git version.

| Feature | Minimum version |
|---|---|
| `git worktree` (stable) | 2.15 |
| `git switch` / `git restore` | 2.23 |
| Partial clone (`--filter`) | 2.22 |
| `--rebase-merges` | 2.22 |
| Sparse checkout v2 cone mode | 2.25 |
| `filter-branch` warning | Avoid this method; use the official manual warning and an approved alternative |

Platform bundles and distributions vary. Obtain supplied actual version/feature evidence; this role cannot execute a version command or install an upgrade. The old feature-version table is a compatibility prompt, not current installed proof.

---

## 5. The public-branch rule

Never rewrite the history of a branch that other people have checked out locally. Rewriting forces everyone downstream to `git reset --hard` or re-clone.

**Safe to rewrite:** local-only branches, feature branches that only you have pushed (and can coordinate a force-push with anyone who has a copy), topic branches before merging.

**Never rewrite without coordination:** `main`, `master`, `develop`, any branch used as a base for CI, any branch that has open PRs targeting it.

When the developer asks to rewrite a shared branch: stop, explain the coordination required (notify team, they must `git fetch && git reset --hard origin/<branch>` after the force-push), and confirm before proceeding.

---

## Escalation rules

| Trigger | Escalate to |
|---|---|
| Credential rotation after secrets removal | `Security Review` |
| Server-side hooks (`pre-receive`, `update`, `post-receive`) | `an authorized CI implementation owner (not supplied by this read-only method)` |
| CI/CD pipeline using Git events | `an authorized CI implementation owner (not supplied by this read-only method)` |
| GitHub/GitLab REST API calls | inline or `an authorized CI implementation owner (not supplied by this read-only method)` |
| Repo-level secret scanning configuration | Security Review for findings; an authorized settings owner for actual changes |
