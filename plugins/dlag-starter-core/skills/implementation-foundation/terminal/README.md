# Review an existing project command safely

This private Implementation Foundation method diagnoses one supplied project-local command, shell script or existing task recipe. Read the actual [Foundation Playbook](../SKILL.md), [procedure](../guides/procedure.md) and [edition boundaries](../../../references/edition-boundaries.md). The registered role has Read/Grep/Glob/Skill/Write/Edit and no Bash. A resource containing commands does not grant execution, installation or settings access.

## Select the actual problem

| Requested result | Complete method | Supporting artifact |
| --- | --- | --- |
| Understand a failing or missing project command | [Command diagnosis](guides/01-command-diagnosis.md) | [Findings report](templates/findings-report.md) |
| Qualify interpreter and failure semantics | [Principles](guides/00-principles.md) | [Complete script review](examples/script-review.md) |
| Review arguments, quoting, errors and cleanup | [Shell-script method](guides/03-shell-scripting.md) | [Bash proposal specimen](templates/bash-script-template.md) |
| Explain an already used search/display tool | [Existing CLI behavior](guides/02-existing-cli-tools.md) | Scope and privacy checks in that guide |
| Diagnose an existing just/make/package recipe | [Task automation](guides/05-task-automation.md) | [Recipe worksheet](templates/task-recipe-review.md) |
| Retain requested review evidence | [Report rules](reports/README.md) | Actual result versus NOT_RUN |

Read the complete selected guide and supplied script before proposing a fix. Ask only for missing OS/interpreter/version, actual invocation/cwd, desired behavior and portability that change the answer. A login-shell variable does not prove the interpreter that launched a script. Preserve the project's package manager, lockfile, current task runner and selected React Router SSR/Workers/Supabase/R2 stack. Do not replace the terminal setup to solve a local project issue.

A review may propose expressly requested safe local file changes through available authoring tools, checking collisions/active ownership and reading changes back. Separate source diagnosis, saved proposal, syntax/lint, local execution, CI and provider evidence. Give the operator exact existing commands only after inspecting their bodies; script execution can have hidden filesystem/network effects. If a needed execution caller or tool is absent, report NOT_RUN rather than install it or claim a pass.

## Boundaries

Global dotfiles, shell defaults, prompts, tool adoption/installations, tmux/Zellij configuration/plugins/sessions, workstation bootstrap and OS administration are outside this method. No home-directory search, sourcing, environment dump or history read is required. New task-runner adoption/migration, new dependencies, remote SSH/release scripts, package publication and deployment need a separate capable authorized task. Existing CI/container evidence routes to GitHub Workflow; broader CI implementation needs a designated caller. Python build pipelines need qualified Python ownership. Production hardening needs Security Review. Names alone do not establish a dispatch.

The [method reference](research/research-summary.md) records the technical topics, historical context and limits of this review. Every required procedure/template/example is local. No new public role, command, shell tool, provider or configuration is introduced.
