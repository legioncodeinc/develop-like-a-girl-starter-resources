# Worktrees - Git workflow

> Read-only proposal boundary: use supplied local evidence with Read/Grep/Glob/Skill. Every command below is illustrative for a separately authorized caller with the actual tools and exact repository/path/ref scope. This Specialist does not run Git, write files, stage, commit, switch, reset, rewrite, create/remove worktrees, install/configure hooks, access remotes or publish. Before any destructive/history action preserve approved byte/history backups, current full SHAs and rollback steps, confirm active ownership and obtain existing-or-new task-specific authorization. External effects, shared refs, settings, installs and another worker's files have their own explicit scope gates. Never treat the examples as a copy-and-run script.

Parallel branch work without stashing, context-switching overhead, or re-cloning.

---

## What is a Git worktree?

A Git worktree is an additional working directory linked to the same repository. Multiple worktrees share the same `.git` directory (object store, refs, config) but each has its own checked-out branch and working tree state. You can have different branches checked out simultaneously in different directories.

**Requires actual installed worktree support.** A separately authorized caller can supply `git --version` and feature evidence; this read-only role does not execute the check.

---

## Basic commands

```bash
# Add a new worktree for an existing branch:
git worktree add ../feature-a feature/new-login

# Add a new worktree and create a new branch:
git worktree add -b feature/payment ../payment-feature main

# List all worktrees:
git worktree list

# Remove a worktree (after branch is merged or no longer needed):
git worktree remove ../feature-a

# Prune stale worktree references (after manually deleting a directory):
git worktree prune
```

---

## Typical parallel-feature workflow

```bash
# You're on main, working on feature-a
# A bug comes in that needs fixing now

# Instead of stashing and context-switching:
git worktree add -b hotfix/critical-bug ../critical-bug main

# Fix the bug in ../critical-bug (separate terminal/IDE window)
cd ../critical-bug
# ... make changes, commit ...
git push origin hotfix/critical-bug

# Continue working on feature-a in the original directory
cd ../my-repo
# feature-a is still exactly as you left it - no stash needed
```

---

## Bare clone pattern for worktree-only repos

A bare clone has no working directory of its own, making it ideal as a "hub" for multiple worktrees:

```bash
# Clone as bare:
git clone --bare https://github.com/org/repo.git repo.git
cd repo.git

# Add worktrees for each branch you need:
git worktree add ../repo-main main
git worktree add ../repo-feature feature/new-login

# Each directory is a fully functional working tree
```

Use this optional layout only when the team has accepted it; a bare clone changes checkout and remote-ref expectations and is not required for an ordinary project.

---

## Worktrees in 2026: AI agent isolation

An authorized coordinator can use `git worktree add` to give each agent its own isolated working tree for a parallel task. This prevents agents from conflicting on the same files while sharing the object store.

```bash
# Each agent gets its own worktree:
git worktree add ../agent-1-worktree -b agent/task-1 main
git worktree add ../agent-2-worktree -b agent/task-2 main

# Agents work in isolation; results are merged or cherry-picked when done
```

---

## Constraints and caveats

- **You cannot check out the same branch in two worktrees simultaneously.** Git prevents this with a lock. To work on the same branch in parallel, create a separate branch for each worktree.
- **IDE project files.** Some IDEs (VS Code, IntelliJ) track the project by directory. Open each worktree as a separate workspace/project window.
- **Git hooks.** Hooks in `.git/hooks/` apply to all worktrees. If your hooks have side-effects (e.g., starting a dev server), they run in every worktree's Git operations.
- **Submodules.** Worktrees do not automatically initialize submodules. Run `git submodule update --init` inside the new worktree if needed.
- **Sparse checkout.** Each worktree can have its own sparse checkout configuration (Git 2.28+).

---

## Worktree vs stash vs branch-switch decision matrix

| Scenario | Best option |
|---|---|
| Quick context switch, clean working tree | `git switch <branch>` |
| Interrupt work, will return soon | `git stash` then `git stash pop` |
| Long-running parallel tasks (hours/days) | `git worktree add` |
| Need different branches in different IDE windows | `git worktree add` |
| AI agent per-task isolation | `git worktree add` |
| Reviewing a PR while keeping current work | `git worktree add ../pr-review origin/pr-branch` |

---

## Removing and pruning

```bash
# Remove a worktree cleanly:
git worktree remove ../feature-a

# If the directory was already deleted manually:
git worktree prune

# List with path and lock status:
git worktree list --porcelain
```

Worktrees can also be locked to prevent accidental pruning (for worktrees on removable drives or network shares):
```bash
git worktree lock ../feature-a --reason "On external drive"
git worktree unlock ../feature-a
```

