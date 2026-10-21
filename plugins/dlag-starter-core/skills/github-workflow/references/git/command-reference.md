# Git command reference

These tables explain proposed operations only. Read the [principles](../../guides/git/00-principles.md) first. A rollback plan and exact authorized path/ref scope precede every destructive proposal; the read-only Specialist does not execute commands.

## Compatibility checks

| Feature | Required evidence before a proposed use |
| --- | --- |
| Worktrees | Actual installed Git support and active branch/path ownership |
| Partial clone and sparse checkout | Installed feature support, server support and permitted network scope |
| Rebase merges, autosquash and fixup variants | Installed Git help/behavior for the exact flags |
| Switch and restore | The optional practice runner requires Git 2.23+; missing tools stop the exercise |
| Bundles and filtered bundles | Actual supported options and verified history/byte backup coverage |
| History filtering | Existing selected tool/version and exact rewrite/credential-response authorization |

A separately authorized caller can obtain `git --version` and command help. This read-only role uses supplied evidence and reports compatibility unknown rather than running commands or installing tools. Historical feature floors are not installed proof.

---

## Quick reference: recovery operations

| Scenario | Command |
|---|---|
| Undo last commit (keep changes staged) | `git reset --soft HEAD~1` |
| Undo last commit (keep changes unstaged) | `git reset HEAD~1` |
| Undo last commit (discard changes) | `git reset --hard HEAD~1` + verify with reflog first |
| Recover deleted branch | `git checkout -b <branch> <sha>` (sha from `git reflog`) |
| Recover dropped stash | `git stash apply <sha>` (sha from `git fsck --lost-found`) |
| Undo a merge | `git reset --hard ORIG_HEAD` |
| Undo a rebase | `git reset --hard ORIG_HEAD` or find pre-rebase sha in reflog |
| Recover file deleted in past commit | `git checkout <sha>^ -- <path>` |

---

## Quick reference: interactive rebase commands

| Command | Effect |
|---|---|
| `pick` | Keep commit as-is |
| `reword` | Keep commit, edit message |
| `edit` | Keep commit, pause to amend |
| `squash` | Meld into previous commit, combine messages |
| `fixup` | Meld into previous commit, discard message |
| `drop` | Delete commit entirely |
| `exec` | Run shell command between commits |
| `break` | Pause rebase at this point |

---

Commit-signing setup is not supplied as a complete procedure. Record the selected signing policy and missing reviewer/tool/key-owner evidence; do not configure credentials or claim signature verification ran.
