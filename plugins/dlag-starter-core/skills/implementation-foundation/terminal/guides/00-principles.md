# Interpreter and review principles

Determine the script's actual interpreter before changing syntax. Read its shebang, the package/task runner that invokes it and the supplied OS/runtime evidence. A file can be launched explicitly with sh despite a Bash shebang. Missing runtime evidence stays UNKNOWN. Ask when portability changes the solution; do not silently choose a new Bash installation.

## Portability tiers

| Context | Review constraints |
| --- | --- |
| POSIX sh | Use portable test/case/getopts, quoted expansion and POSIX arithmetic expansion. Arrays, [[ and Bash local are not portable. Qualify optional shell features against the actual target rather than assume pipefail exists. |
| Bash | Confirm the actual version. Arrays, [[ and local are Bash features; newer features need their own version check. A macOS installation may have an older Bash; preserve supported syntax or report an interpreter gap instead of installing/replacing it. |
| Zsh | Interactive startup behavior and script compatibility differ from Bash; do not assume a Bash script is portable merely because the interactive shell is Zsh. |
| Fish | Its syntax is not POSIX shell syntax. Diagnose a supplied invocation boundary, but do not migrate or customize interactive Fish configuration here. |

Both arithmetic expansion and set -u belong to POSIX shell; portable error handling still requires deliberate status checks. Version labels are not a substitute for the actual interpreter.

## Failures require explicit reasoning

For an intentionally Bash script, set -euo pipefail is a useful starting policy, not a proof that every failure aborts. Errexit has conditional/list/function contexts where behavior differs; review if/while, !, &&/||, subshells and command substitution deliberately. Nounset catches unset expansions but optional arguments need safe defaults after explicit validation. Pipefail reports a failing pipeline component; early-closing consumers can also produce nonzero statuses. Handle an expected nonzero result narrowly rather than append a blanket || true.

For portable sh, use supported options and explicit checked commands. Do not add a Bash-only option to an unknown shell. Do not describe set -e alone as complete error handling or claim all scripts need identical flags. [The script method](03-shell-scripting.md) supplies concrete patterns.

## Lint and evidence

A capable authorized operator can run an already installed shell linter against the explicit authorized script and correct dialect. Implementation Foundation cannot execute it. A successful syntax parse or ShellCheck pass is source-analysis evidence, not runtime, harmlessness, secret safety, CI compatibility or successful deployment. Missing tool/approved caller means NOT_RUN. Do not install a linter or add a floating-action workflow from a review.

Record every suppression with its exact diagnostic and narrow justification; do not invent SC identifiers from a prose concern. Shell injection across two interpreters is not repaired merely by quoting the local argument. Prefer structured argument boundaries and avoid eval; never execute an untrusted snippet to see what it does.

## Repeated effects and ownership

For an existing project script, review what repeated execution does: duplicate output, overwritten files, remote actions or cleanup. Only task-owned temporary artifacts may be cleaned up. A symlink operation or directory creation can replace/change existing work; do not import a workstation bootstrap under the word idempotent. No dotfile/PATH/default-shell edits follow from a project-command review.

When an existing tool is relevant, explain its actual scope/format/ignore behavior using [the CLI guide](02-existing-cli-tools.md). Do not bypass excludes to make a search appear complete. Before claiming success, report the exact inspected source, proposed change, actual checks and unresolved execution evidence.
