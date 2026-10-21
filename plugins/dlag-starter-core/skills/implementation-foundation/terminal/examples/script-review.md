# Worked review of arguments and two shell parsers

Synthetic source-only exercise, NOT_RUN. The actual Foundation Specialist has no Bash. This example demonstrates argument, quoting and error diagnosis, including why a remote release sketch needs a separate parser review.

## Supplied local script

```bash
#!/bin/bash
LABEL=$1
MODE=$2
printf "$LABEL\n"
if [ $MODE = check ]; then
  echo $LABEL
fi
```

The caller has supplied no interpreter version or argument contract. The file path is scripts/project-note.sh in this fictional exercise. Nothing here proves the actual project has that file.

## Findings from source

| Concern | Severity/rationale | Precise proposed correction |
| --- | --- | --- |
| Positional parameters used before checking count | Medium: missing values alter execution/error behavior | Validate exact arguments before expansion. |
| Data becomes printf format | High when untrusted data is accepted: format directives gain meaning | Use a fixed format with quoted data. |
| Ordinary test argument and echo argument unquoted | Medium: splitting/globbing can alter test and output | Quote data and prefer fixed-format printf. |
| Missing handling for unknown mode | Medium: silently succeeds without the stated job | Whitelist supported modes and refuse others. |
| Interpreter requirement unknown | Informational pending evidence | Inspect actual invoker/version; /bin/bash is not automatically an error. |

These severities depend on the stated input trust and actual use; they are not independent Security Review clearance. No SC diagnostic number is invented for an unexecuted linter.

## Complete bounded correction

```bash
#!/usr/bin/env bash
set -euo pipefail
usage() { printf '%s\n' 'Usage: project-note LABEL check'; }
if [[ $# -ne 2 ]]; then usage >&2; exit 2; fi
label=$1
mode=$2
if [[ "$mode" != check ]]; then
  printf '%s\n' 'unsupported mode' >&2
  exit 2
fi
printf '%s\n' "$label"
```

This specimen only formats a supplied label to stdout after validating its mode. It reads no file, changes no project/settings and performs no network/deployment operation. It is not a remote-release implementation. The Bash version/interpreter must still match the project's real requirement before an authorized operator uses it. Do not use sensitive labels in logs.

## Expected checks, not results

An authorized operator would qualify missing/extra arguments, unknown mode, spaces, glob-like input, leading hyphens and percent-format text, then obtain actual syntax/lint output for the selected interpreter. Every such check is NOT_RUN here. A before/after source comparison establishes only the proposed correction's intent.

## Why a remote command needs another parser review

A local ssh "$server" argument can be quoted while the remote command string still embeds a branch value inside another shell program. If that string places branch inside single-quoted remote text, a branch containing a single quote can break out of the intended quoting. A comment claiming a quoted heredoc does not make a double-quoted command string into a quoted heredoc. A proposed repair must handle that second parser and cite only actual observed linter diagnostics.

Safe project diagnosis preserves that finding and requires the actual remote runner's argument/validation design plus independent security and release ownership. It supplies no ssh/git-pull/install/build/test command or credentials, and no claim that remote injection was repaired. Existing CI/container integration evidence goes to GitHub Workflow; actual remote execution/deployment is a separate authorized task. Report that boundary, rather than replacing the remote workflow with a guessed release script.
