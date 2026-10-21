# Example: Worktree Parallel Features Workflow

> Read-only proposal boundary: use supplied local evidence with Read/Grep/Glob/Skill. Every command below is illustrative for a separately authorized caller with the actual tools and exact repository/path/ref scope. This Specialist does not run Git, write files, stage, commit, switch, reset, rewrite, create/remove worktrees, install/configure hooks, access remotes or publish. Before any destructive/history action preserve approved byte/history backups, current full SHAs and rollback steps, confirm active ownership and obtain existing-or-new task-specific authorization. External effects, shared refs, settings, installs and another worker's files have their own explicit scope gates. Never treat the examples as a copy-and-run script.

Two features in progress simultaneously without stash context-switch overhead.

---

## Situation

A developer is working on `feature/recall-filter` and receives a high-priority request to also prototype `feature/component-preview`. Both branches need to be active and ready to demo at any time. Stashing and switching branches every few hours is creating friction.

---

## Setup: add a second worktree

```bash
# Current state: in the main repo directory, on feature/recall-filter
ls .git/  # the repo's .git is here

# Add a second worktree for the harness feature:
git worktree add -b feature/component-preview ../project-harness main

# List worktrees:
git worktree list
# /home/dev/project          abc1234 [feature/recall-filter]
# /home/dev/project-harness  def5678 [feature/component-preview]
```

---

## Day-to-day workflow

```bash
# Work on the recall filter in the original directory:
cd ~/project
# ... edit files, test, commit as normal ...
git add -p
git commit -m "feat(retrieval): add recency filter to recall"

# Switch to the harness feature by changing directory (no stash needed):
cd ~/project-harness
# The harness feature branch is exactly as you left it
# ... edit files, test, commit ...
git add app/components/
git commit -m "feat(harness): add component preview"

# Push both branches:
git push origin feature/recall-filter    # from ~/project
git push origin feature/component-preview   # from ~/project-harness
```

---

## Fetching remote updates in both worktrees

Both worktrees share the same object store. Fetching in one updates objects for both:

```bash
# Fetch from either worktree:
cd ~/project
git fetch origin

# Now in the other worktree, the new objects are available:
cd ~/project-harness
git rebase origin/main   # rebases onto the newly fetched main
```

---

## Running test watchers in parallel

Each worktree can run its own Vitest watcher so both features stay green:

```bash
# Terminal 1 - recall filter feature:
cd ~/project
npx vitest --watch

# Terminal 2 - harness feature:
cd ~/project-harness
npx vitest --watch
```

Both watchers run simultaneously. Switching between them is a tab switch, not a stash + branch switch + rebuild cycle.

---

## Demo preparation

Before a demo, ensure each feature is at its best state without cross-contamination:

```bash
# Recall filter demo:
cd ~/project
git status  # confirm clean
npm run build

# Harness demo:
cd ~/project-harness
git status  # confirm clean
npm run build
```

---

## Cleanup when a feature is merged

```bash
# After feature/component-preview is merged via PR:
cd ~/project
git fetch origin
# Confirm no active worker owns the path and preserve unique bytes/history first.
git worktree remove ../project-harness
# Branch deletion is a separate authorized action after worktree removal.
git branch -d feature/component-preview

# Confirm:
git worktree list
# /home/dev/project  abc1234 [feature/recall-filter]
```

---

## What this avoids

- `git stash` / `git stash pop` cycles (stash is error-prone; conflicts can occur on pop)
- Waiting for `npm install` after branch switches (if `node_modules` differs between branches)
- Accidentally committing to the wrong branch after context-switching
- Losing unsaved work because you forgot to stash
