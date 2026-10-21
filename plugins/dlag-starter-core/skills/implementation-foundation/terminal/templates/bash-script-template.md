# Complete Bash proposal specimen

This is inert teaching source for an authorized project-script proposal, NOT_RUN. It validates arguments and emits a generic review-plan message only. It does not read a file, create/truncate output, create/delete temporary artifacts, invoke project tools, configure a shell or execute any project work. Implementation Foundation has no Bash. The actual project must qualify interpreter/version and command contract before an operator adopts a real script.

```bash
#!/usr/bin/env bash
set -euo pipefail

# This specimen is complete for its stated no-effects planning behavior.
verbose=0
mode=inspect

usage() {
  printf '%s\n' 'Usage: command-plan [-v] [-m inspect|explain] -- LABEL'
  printf '%s\n' 'LABEL: 1-64 ASCII letters, digits, underscore, dot or hyphen.'
  printf '%s\n' 'No files, project commands, settings or network are accessed.'
}
log() { printf '%s\n' "$*" >&2; }
die() { log 'invalid command-plan arguments'; usage >&2; exit 2; }
cleanup() {
  local task_status=$?
  trap - EXIT
  # No temporary artifacts exist in this specimen.
  exit "$task_status"
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM

while getopts ':hvm:' option; do
  case "$option" in
    h) usage; exit 0 ;;
    v) verbose=1 ;;
    m) mode=$OPTARG ;;
    :) die ;;
    \?) die ;;
  esac
done
shift "$((OPTIND - 1))"
[[ $# -eq 1 ]] || die
label=$1
[[ ${#label} -ge 1 && ${#label} -le 64 ]] || die
case "$label" in
  *[!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_.-]*) die ;;
esac
case "$mode" in
  inspect|explain) ;;
  *) die ;;
esac

main() {
  local review_mode=$1
  if [[ $verbose -eq 1 ]]; then
    log 'verbose planning selected; no project command executes'
  fi
  case "$review_mode" in
    inspect) printf '%s\n' 'Plan: inspect the supplied project command as source.' ;;
    explain) printf '%s\n' 'Plan: explain source findings and unrun checks.' ;;
  esac
  printf '%s\n' 'This is a proposal message, not a successful project check.'
}
main "$mode"
```

The label is validated as a bounded argument and deliberately not printed. A real job requiring file reads/output needs its own scope, private-path policy, resource bounds, ownership/collision behavior and meaningful acceptance checks. Do not add placeholder truncation or a broad cleanup action. For an actual existing temporary-file writer use the [script-method review](../guides/03-shell-scripting.md), not this no-write specimen as proof of safety.

Expected operator qualification, all NOT_RUN here: help, default mode, explicit explain mode, missing/extra argument, missing -m value, unknown option/mode, empty/oversized/non-ASCII or disallowed label, syntax/lint for the required Bash version and signal behavior. The optional declaration/command-availability patterns and fixed-format logs are explained in the complete guide; no dependency is installed or probed by this specimen.
