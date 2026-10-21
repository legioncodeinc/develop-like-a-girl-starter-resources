# Review script arguments, status and effects

Read [interpreter principles](00-principles.md) before a change. The examples below are review specimens, NOT_RUN. The Foundation role can author requested safe local files but cannot execute any snippet. Preserve actual project tools and semantics; do not turn a code block into permission.

## Failure handling

An intentionally Bash script may start with a Bash shebang and set -euo pipefail, after confirming its version and expected failure behavior. Conditional/list/function contexts need explicit review; flags do not prove fail-closed behavior. For portable sh use supported flags, case/test/getopts and checked commands. For example, a required directory transition must check cd before any dependent operation. An expected grep no-match status is different from a read error; do not append || true to erase both.

Use explicit status handling where the script's contract requires it:

```bash
if existing_project_check; then
  printf '%s\n' 'check completed'
else
  task_status=$?
  printf '%s\n' 'project check failed' >&2
  exit "$task_status"
fi
```

existing_project_check denotes an inspected existing command supplied by the actual project, not a shipped function. Its real effects and status contract must be known before an operator runs it.

## Quoting and arguments

| Form | Meaning and review action |
| --- | --- |
| "$value" | Preserves one ordinary argument, including whitespace and literal glob characters. |
| $value in an ordinary command argument | Can split/glob; require a specific deliberate reason or quote it. |
| "$(command)" | Preserves substitution output as one argument, but command runs first and its status/effects need review. Prefer this syntax to backticks, never treat it as inert text. |
| "${items[@]}" in Bash | Preserves array elements as separate arguments. Qualify the actual interpreter; not POSIX sh. |
| Arithmetic expansion | Its parsing rules differ from ordinary argument splitting; accept only intended numeric input and validate untrusted text. |
| eval or concatenated shell command | Adds a parser and injection risk; avoid it for untrusted values. A local quote does not protect a later remote parser. |

Use printf with a fixed format and data arguments. A user string must not become the printf format. Validate required argument count before reading $1 under nounset. -- matters when the invoked tool treats a leading hyphen as an option; inspect that tool's actual supported separator.

## Complete getopts shape

```bash
usage() { printf '%s\n' 'Usage: command-review [-v] input_label'; }
verbose=0
while getopts ':hv' option; do
  case "$option" in
    h) usage; exit 0 ;;
    v) verbose=1 ;;
    :) printf '%s\n' 'option requires an argument' >&2; exit 2 ;;
    \?) printf '%s\n' 'unknown option' >&2; usage >&2; exit 2 ;;
  esac
done
shift "$((OPTIND - 1))"
if [ "$#" -ne 1 ]; then usage >&2; exit 2; fi
input_label=$1
```

For an option taking a value, add its colon in the option specification, handle the missing-value branch and validate OPTARG before use. Honor -- to terminate option parsing; getopts does not implement arbitrary long options. The [complete proposal specimen](../templates/bash-script-template.md) includes a value option and refuses unknown/extra input.

## Functions and command availability

In Bash, use local for function-specific variables; declare the variable separately from a command substitution so the command status is not hidden by the declaration builtin. Portable sh needs a different explicit naming/scope design. Do not assume local is POSIX.

```bash
require_existing_command() {
  local command_name=$1
  if ! command -v "$command_name" >/dev/null 2>&1; then
    printf '%s\n' 'required existing project command is unavailable' >&2
    return 127
  fi
}
```

This is source for review, not a command run by the Specialist. Missing command means a recorded dependency/tool gap; do not automatically install it or print a download instruction as a fix.

## Cleanup, temporary files and signals

If the inspected existing workflow creates temporary artifacts, identify precisely who created each file and whether the authorized task permits cleanup. Initialize temporary-path variables before a trap; handle partial initialization and preserve the original failure status. Avoid broad deletion, user-supplied cleanup roots and replacing existing outputs. Permission to inspect a script is not permission to create/delete temporary files.

A Bash cleanup pattern for a separately authorized writer has this shape. It is NOT_RUN and not used by the no-write proposal specimen:

```bash
task_temp=''
cleanup() {
  local task_status=$?
  trap - EXIT
  if [[ -n "$task_temp" ]]; then
    # Only the exact artifact created by this operation may be removed.
    rm -f -- "$task_temp" || task_status=1
  fi
  exit "$task_status"
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM
# A permitted writer would create its own temporary artifact here.
```

Review the actual creation mechanism, ownership, symlink behavior and lifecycle before using this pattern. Do not place a user path in task_temp. SIGINT and SIGTERM have distinct conventional statuses; one blanket 130 trap loses that difference. Cleanup errors are evidence, not silent success.

## Existing output and repeated actions

An output redirect can truncate an existing file before the main command succeeds. Do not import : > "$output" as a placeholder implementation. Specify collision behavior, authorized destination and atomic replacement/recovery requirements before writing. A syntactically valid skeleton with TODO main logic is not a completed project tool.

Review repeated execution for accumulated appends, duplicate PATH entries, overwrites and remote effects. Global XDG layout, symlink bootstraps and home dotfile management are excluded; no mkdir/ln/configuration operation is authorized by this guide. [The worked review](../examples/script-review.md) demonstrates the applicable diagnosis without deployment or a false fixed-remote claim.
