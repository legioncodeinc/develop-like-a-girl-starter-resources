# Inspect the existing task runner

Preserve the project's current package scripts, make targets or just recipes. Inspect them as source before recommending any operator command. The Foundation role cannot run a task, install just/make, initialize a runner, load secrets or migrate configuration. The selected app still uses its accepted React Router/Workers/Supabase stack; a task-runner example does not replace its build system.

## Decide from existing semantics

| Actual need or existing evidence | Review conclusion |
| --- | --- |
| Files/timestamps and dependency graph control incremental builds | make semantics matter; do not translate targets to a command runner mechanically. |
| Existing named developer recipes with documented parameters | Review the existing just/package runner and keep its contract. |
| Existing team Makefile is sufficient | Preserve it; a thin wrapper is a separately requested change, not an automatic improvement. |
| Windows/Unix support required | Qualify installed runner, selected shell and every recipe command; runner portability alone does not make Bash tools available. |
| A CI image lacks the project's runner | Report actual tool/image gap to the CI owner; never assume make or a package manager is universal. |

Adopting just, installing tools or removing Makefile rules is not a Starter default.

## Read the complete recipe contract

Record default target, selected shell and version, working directory, explicit file/path selection, parameters/defaults, dependency recipes, environment reads, subprocesses, output/collision policy, and local/remote effects. A task runner can find a parent-level file; confirm the actual file and cwd rather than assume the nearest project declaration was used. Default targets can themselves execute work.

A just recipe can specify a Bash shell with safety flags, use recipe dependencies and document itself through comments. A make target can represent file freshness and may require .PHONY for a pure command. These are distinct semantics. Recipe-local shells and state persistence must be checked against actual runner/version; a cd on one line may not affect the next.

Parameters and interpolation are parsing boundaries. Raw {{args}} insertion into shell text is not a safe channel for arbitrary user input. Review trusted literals, argument validation, environment passing and shell quoting together. A recipe parameter called target does not authorize SSH, release or synchronization.

## What common recipes actually do

| Recipe label | Inspect before operator use |
| --- | --- |
| install/setup | May fetch packages, execute lifecycle scripts, change a lockfile or credentials; outside this repair method's execution authority. |
| build | Inspect the actual package script and output writes; do not assume tsc/esbuild because a source example used them. |
| test/watch | Inspect existing test command and its provider/fixture dependencies; do not use a package runner that fetches a missing test tool. |
| check | Identify exact existing type/lint/duplication/shell checks and their limits; a passing aggregate does not prove every component ran. |
| clean | May delete dependency/generated/user files; do not supply or execute a broad rm -rf recipe from a review. |
| sync/deploy/release | External mutation and credentials; separate capable authorized release task. |
| composite | Trace order, every dependency and failure propagation; a name such as ci is not proof of CI parity. |

Automatic dotenv loading reads potentially sensitive files and changes runtime inputs. Do not enable it here. Report actual named input requirements without opening secrets or echoing full environment content.

## Inspect safely; do not trust a dry-run label

An authorized operator may inspect an already installed runner's documented listing/dry-run behavior, explicit task file and cwd. A dry-run can still evaluate configuration, functions or substitutions before recipes; it is not a universal no-effects sandbox. Interactive choose/preview modes may spawn helpers. The no-Bash Specialist reports proposed commands and NOT_RUN rather than launching them.

## Migration knowledge stays conditional

If a separate task asks to evaluate a migration, compare each .PHONY target, actual file dependency, variable expansion, shell boundary, ordering, parameters and failure behavior before choosing a runner. Do not erase make's graph, replace all variable syntax blindly or claim a successful migration from a rewritten text file. Actual installation/configuration changes and execution remain outside this packet.

Use [the full recipe worksheet](../templates/task-recipe-review.md) and [findings report](../templates/findings-report.md). Proposed corrections should be exact and limited to the user's authorized project file; acceptance needs the actual existing checks through a capable operator, not a new runner or universal install recipe.
