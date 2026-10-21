# Review an existing task recipe

Status: Draft source review
Subject path/revision: [actual supplied file and inspected bytes/revision]
Requested command and desired result: [exact safe invocation; no secrets]
Actual cwd, OS, runner, interpreter/version evidence: [or UNKNOWN]
Existing package manager/lockfile: [actual source, not a proposed replacement]

## Recipe contract

| Field | Observed source | Meaning and uncertainty | Proposed correction, if requested |
| --- | --- | --- | --- |
| Actual task file/default target | | | |
| Shell, flags and per-line execution | | | |
| Working-directory selection | | | |
| Parameters/defaults/argument validation | | | |
| Interpolation and shell parsing boundaries | | | |
| Recipe dependencies/order | | | |
| Actual file/timestamp prerequisites | | | |
| Environment/secret requirements, names only | | | |
| Commands invoked and actual installed availability | | | |
| Files read, limits and sensitive exclusions | | | |
| Outputs/collisions/repeated-run effects | | | |
| Cleanup, installs, remote/release effects | | | |

A recipe named build/check/test/watch/ci is not proof of its behavior. Inspect its actual body and dependencies. A just recipe is a command recipe; a make target can carry file-freshness semantics. Keep the existing runner unless a separate task authorizes a migration. Source/raw parameter interpolation requires an explicit parser review; no arbitrary user value becomes trusted shell text.

## Project task inventory

| Existing label | Actual body/target source | Local/remote effects | Prerequisites | Required owner/authority | Result or NOT_RUN |
| --- | --- | --- | --- | --- | --- |
| default/list | | | | | |
| build | | | | | |
| test/watch | | | | | |
| check | | | | | |
| install/setup, if present | | | | | |
| clean, if present | | | | | |
| sync/deploy/release, if present | | | | | |
| composite/dependencies | | | | | |

Do not add these recipes merely to fill a table. Mark absent as absent. Install/clean/release entries identify boundaries, not recommended operator commands. No automatic dotenv-load, unpinned package execution, dependency install or deletion recipe is supplied.

## Evidence and proposed fix

Observed failure/status, supplied by whom: [or source-only concern]
Exact safe source location: [path/line]
Impact and severity: [bounded to actual use]
Before/after patch: [complete authorized local change or proposal]
Expected operator check and scope: [actual existing tool/script, or unavailable]
Actual check result: [NOT_RUN unless observed output exists]
What the result cannot establish: [runtime/CI/provider/security/release limits]

Return one concrete next action, unresolved input and the actual CI/Python/security/implementation owner when needed. A dry-run/list/choose operation may evaluate configuration, substitutions or helpers. The Foundation role does not execute it. Source structure, runner documentation and actual task execution are separate evidence.
