# Rebase Cheat-sheet

> Read-only proposal boundary: use supplied local evidence with Read/Grep/Glob/Skill. Every command below is illustrative for a separately authorized caller with the actual tools and exact repository/path/ref scope. This Specialist does not run Git, write files, stage, commit, switch, reset, rewrite, create/remove worktrees, install/configure hooks, access remotes or publish. Before any destructive/history action preserve approved byte/history backups, current full SHAs and rollback steps, confirm active ownership and obtain existing-or-new task-specific authorization. External effects, shared refs, settings, installs and another worker's files have their own explicit scope gates. Never treat the examples as a copy-and-run script.

Quick-reference card for `git rebase -i` commands and common rebase workflows.

---

## Establish the escape path first

Before a separately authorized mutation, inspect supplied full-SHA/reflog and byte-backup evidence. A caller with approved read tools can obtain `git log -1 --format=%H` and `git reflog`; preserve the pre-operation ref and dirty/ignored/untracked bytes at the approved locations. During an in-progress rebase, the rollback proposal is `git rebase --abort`. A later `git reset --hard ORIG_HEAD` is itself destructive, can lose current bytes and depends on the actual retained ORIG_HEAD; it requires its own exact backup/authorization check. Recreating a branch at a verified retained SHA can preserve found commits without replacing the current branch. These are proposed escape paths, not commands this Specialist executes.

## rebase -i command reference

| Command | Short | Effect |
|---|---|---|
| `pick` | `p` | Keep commit as-is |
| `reword` | `r` | Keep commit, edit message |
| `edit` | `e` | Keep commit, pause to amend |
| `squash` | `s` | Meld into previous, combine messages |
| `fixup` | `f` | Meld into previous, discard message |
| `drop` | `d` | Delete commit entirely |
| `exec` | `x` | Run shell command |
| `break` | `b` | Pause here |

---

## Common one-liners

```bash
# Interactive rebase for last N commits:
git rebase -i HEAD~N

# Rebase with autosquash (auto-reorders fixup! commits):
git rebase -i --autosquash HEAD~N

# Rebase onto another branch's tip:
git rebase -i main

# Abort a rebase in progress:
git rebase --abort

# Continue after resolving conflicts:
git rebase --continue

# Skip a commit during rebase (dangerous):
git rebase --skip
```

---

## Autosquash workflow

```bash
# Create a fixup commit for commit abc1234:
git commit --fixup abc1234

# Or by message match:
git commit -m "fixup! feat: add user profile"

# Rebase with autosquash (auto-marks fixup! commits):
git rebase -i --autosquash HEAD~5
```

Enable permanently:
```bash
git config --global rebase.autoSquash true
```

---

## Escape hatches

```bash
# Before rebase - save sha:
git log -1 --format=%H

# After rebase - undo:
git reset --hard ORIG_HEAD

# Find pre-rebase sha in reflog:
git reflog | grep "rebase"
```

---

## Force-push after rebase

```bash
# Safe (aborts if remote was updated):
git push --force-with-lease origin <branch>

# Never:
git push --force
```

---

## Conflict resolution during rebase

```bash
# Resolve conflict:
git status                   # find conflicted files
# edit files ...
git add <file>
git rebase --continue        # NOT git commit

# Accept all from current branch:
git checkout --ours <file>   # then: git add <file>

# Accept all from incoming:
git checkout --theirs <file> # then: git add <file>
```

During a rebase, ours is the already-rebased series beginning at upstream, while theirs is the commit being replayed. Inspect the actual conflict stages before choosing a whole-file side. Do not interpret merge-oriented branch labels as rebase labels. See [the official rebase manual](https://git-scm.com/docs/git-rebase).
