# Interactive Rebase - Git workflow

> Read-only proposal boundary: use supplied local evidence with Read/Grep/Glob/Skill. Every command below is illustrative for a separately authorized caller with the actual tools and exact repository/path/ref scope. This Specialist does not run Git, write files, stage, commit, switch, reset, rewrite, create/remove worktrees, install/configure hooks, access remotes or publish. Before any destructive/history action preserve approved byte/history backups, current full SHAs and rollback steps, confirm active ownership and obtain existing-or-new task-specific authorization. External effects, shared refs, settings, installs and another worker's files have their own explicit scope gates. Never treat the examples as a copy-and-run script.

Squash, fixup, reword, drop, reorder, and exec - the full `git rebase -i` playbook.

---

## Establish the escape path first

Before a separately authorized mutation, inspect supplied full-SHA/reflog and byte-backup evidence. A caller with approved read tools can obtain `git log -1 --format=%H` and `git reflog`; preserve the pre-operation ref and dirty/ignored/untracked bytes at the approved locations. During an in-progress rebase, the rollback proposal is `git rebase --abort`. A later `git reset --hard ORIG_HEAD` is itself destructive, can lose current bytes and depends on the actual retained ORIG_HEAD; it requires its own exact backup/authorization check. Recreating a branch at a verified retained SHA can preserve found commits without replacing the current branch. These are proposed escape paths, not commands this Specialist executes.

## Starting an interactive rebase

```bash
# Rebase the last N commits
git rebase -i HEAD~N

# Rebase from (but not including) a specific commit
git rebase -i <sha>

# Rebase onto another branch's tip
git rebase -i main
```

Always run `git log --oneline -10` first to identify the commits and count N.

**Escape hatch before starting:**
```bash
# Save the current HEAD
git log -1 --format=%H
# After rebase, if anything goes wrong:
git rebase --abort          # while rebase is paused
git reset --hard ORIG_HEAD  # after rebase completed but you want to undo
```

---

## The rebase -i command reference

When the editor opens, each line is `<command> <sha> <message>`. Edit the command word:

| Command | Short | Effect |
|---|---|---|
| `pick` | `p` | Keep commit as-is |
| `reword` | `r` | Keep commit, edit commit message |
| `edit` | `e` | Keep commit, pause to amend (add files, split commit) |
| `squash` | `s` | Meld into previous commit, combine both messages |
| `fixup` | `f` | Meld into previous commit, discard this message |
| `drop` | `d` | Delete commit entirely |
| `exec` | `x` | Run shell command at this point in the rebase |
| `break` | `b` | Pause here (useful for inspection) |
| `label` | `l` | Label current HEAD (for rebase-merges) |
| `reset` | `t` | Reset HEAD to a label |
| `merge` | `m` | Create a merge commit (requires `--rebase-merges`) |

---

## Common workflows

### Squash the last 3 commits into one

```bash
git rebase -i HEAD~3
```

Change the bottom 2 commits from `pick` to `squash` (or `s`):
```text
pick abc1234 Initial feature scaffolding
squash def5678 Add validation
squash ghi9012 Fix typo
```

An editor opens for the combined commit message. Keep what you want, delete the rest.

### Clean up with fixup (discard WIP messages)

```bash
git rebase -i HEAD~4
```

Change WIP commits to `fixup` (or `f`):
```text
pick abc1234 feat: add user profile page
fixup def5678 wip
fixup ghi9012 fix lint
fixup jkl3456 forgot to save
```

The fixup commits are merged in silently; their messages are discarded.

### Autosquash: pre-mark commits for fixup

Create commits that auto-mark themselves for fixup during rebase:

```bash
# Create a fixup commit targeting "feat: add user profile page"
git commit --fixup abc1234

# Or by message prefix:
git commit -m "fixup! feat: add user profile page"

# Then rebase with --autosquash:
git rebase -i --autosquash HEAD~5
```

Git automatically reorders the `fixup!` commits after their target and marks them as `fixup`. Set as the default:
```bash
git config --global rebase.autoSquash true
```

### Reword a commit message mid-history

```bash
git rebase -i HEAD~4
```

Change the target commit's command to `reword` (or `r`):
```text
pick abc1234 My typo in commit message
reword def5678 Old message I want to change
pick ghi9012 Later commit
```

An editor opens for the commit you marked `reword`. Edit and save.

### Split a commit into two

Mark the commit as `edit`:
```text
pick abc1234 Previous commit
edit def5678 Commit to split
pick ghi9012 Later commit
```

When rebase pauses at that commit:
```bash
git reset HEAD~   # mixed reset: move HEAD/index, keep working-tree bytes
git add -p        # stage first logical chunk
git commit -m "First part"
git add -p        # stage second logical chunk
git commit -m "Second part"
git rebase --continue
```

---

## Resolving conflicts during rebase

Unlike a merge, a rebase replays each commit one at a time. Conflicts appear per-commit.

```bash
# When a conflict appears:
git status          # shows conflicted files
# Edit files to resolve conflicts
git add <file>      # mark as resolved
git rebase --continue   # continue to next commit

# To skip this commit entirely (dangerous):
git rebase --skip

# To abort and return to pre-rebase state:
git rebase --abort
```

After resolving, never use `git commit` during rebase - always use `git rebase --continue`.

---

## `--rebase-merges`: preserve merge commits

By default, `rebase -i` linearizes history (drops merge commits). To preserve merge structure:

```bash
git rebase -i --rebase-merges HEAD~10
```

Requires installed support for the exact rebase flags. The editor shows `label`, `reset`, and `merge` commands alongside the usual commands.

---

## Setting the default editor for rebase

```bash
git config --global core.editor "code --wait"   # VS Code
git config --global core.editor "vim"
git config --global sequence.editor "interactive-rebase-tool"  # GUI tool
```

---

## After rebase: updating the remote

If the approved branch was already published and its history changed, an authorized update may require a coordinated non-fast-forward push. A local-only rebase does not require a push. Prepare rollback and an explicit expected-old-SHA lease for each approved ref before proposing any remote update:

```bash
# Safe force-push (aborts if remote was updated since your last fetch):
git push --force-with-lease origin <branch>

# Never:
git push --force  # overwrites without checking remote state
```

