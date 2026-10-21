---
name: github-workflow
description: "Review supplied repository evidence and explain Git operations, recovery, worktrees and hooks with explicit ownership, backup and authorization boundaries. Read-only guidance."
license: AGPL-3.0-or-later
compatibility: Claude Code
---

# GitHub Workflow Playbook

Review supplied local repository evidence and prepare one safe, scoped Git or GitHub workflow proposal. Remote settings, CI state, clean-tree status and successful recovery remain unknown without actual matching evidence.

## Start with scope and recovery safety

Read [the repository review procedure](guides/procedure.md), [Git principles](guides/git/00-principles.md), and [edition boundaries](../../references/edition-boundaries.md). Establish the exact repository, revision, path/ref, active ownership, dirty/ignored/untracked state, accepted merge policy and available evidence. A bundle preserves referenced history; it does not replace needed working-byte backups. Reflog is local, expiring and unable to recover every unsaved or collected object.

Show the rollback/escape path before each destructive proposal. Require task-specific authorization and approved byte/history backup coverage before another caller changes refs, files, history, worktrees, hooks or settings. Shared/public history, external pushes, branch deletion and other workers' paths need their own exact scope and coordination. An old approval is reused only within its actual task/action scope.

## Load the relevant full method

Use [the guide map](README.md) and [command reference](references/git/command-reference.md) for interactive rebase, history filtering, conflicts, reset/reflog, worktrees, hooks, LFS/partial clone/sparse checkout, and submodule/subtree decisions. Detailed examples and fillable worksheets remain local. For beginner teaching use [the disposable-practice lesson](guides/git/09-beginner-disposable-practice.md), keeping its temporary-repository commits separate from permission to touch a real project.

The optional Python practice source and boundary tests are supporting resources for a separately authorized execution task. This read-only role does not run them. No synthetic exercise was executed merely because the source is packaged; a fixture can show bounded state transitions, not learner comprehension or real recovery success.

Use [the repository result](templates/result.md) or [Git session shape](templates/git/session-report.md). Distinguish commands proposed, supplied output, static source review, synthetic execution, actual repository changes and remote verification. Do not promote one category into another.

## Review branch policy and pull requests

For the approved Starter web stack, preserve an existing accepted policy or propose short-lived reviewed GitHub Flow branches. Read [branching principles](guides/branching/00-principles.md), [model selection](guides/branching/01-model-selection.md), [release/hotfix discipline](guides/branching/02-release-and-hotfix.md), [merge choices](guides/branching/03-merge-vs-rebase.md), [flag trade-offs](guides/branching/04-feature-flag-vs-branch.md), [migration proposals](guides/branching/05-migration-playbook.md) and [merge queues](guides/branching/06-merge-queue.md) only as the question needs. Return a [draft policy](templates/branching/branching-policy.md); do not change settings or refs.

For PR communication, score the six description elements before rewriting using [the authoring/audit guide](guides/review/01-pr-description.md) and [template](templates/review/pr-description.md). Generate the full [context-specific checklist](guides/review/02-review-checklist.md), inspect [size and split options](guides/review/03-small-prs.md), and use [async norms](guides/review/04-async-review.md), [culture diagnosis](guides/review/05-rubber-stamp-detection.md) and [comment coaching](guides/review/06-comment-coaching.md) where relevant. Findings stay advisory: never approve or block a real merge from this role, invent test evidence, soften a security finding away or post a comment without a separate authorized sender. Use three action tiers plus optional question/praise labels and preserve the reviewer's actual intent.

## Audit repository health and README usefulness

Use [health scoring and coverage](references/health/scoring.md), the [full health principles](guides/health/00-principles.md) and [audit template](templates/health/audit-report.md) for all eight dimensions. Inspect supplied local files and dated settings/API/run exports only; state exact gaps and use N/A for unavailable facts. Preserve the [automation trust/proof review](guides/health/10-review-automation-permissions.md), its [worksheet](templates/health/automation-permission-review.md) and [synthetic interpretation cases](examples/health/automation-permission-cases.md). Platform green/skip or old-candidate evidence does not prove the current task candidate passed. This scoped metadata audit does not execute workflows or perform an exploit assessment.

For README work, [classify the reader](guides/readme/03-oss-vs-internal.md), read the existing document fully, then emit the [structure audit](guides/readme/01-structure-checklist.md) before a rewrite. Apply [principles](guides/readme/00-principles.md), [badge checks](guides/readme/02-badges.md), the full [twelve-point completion checklist](guides/readme/05-done-checklist.md), and [public/library](templates/readme/oss-library-readme.md) or [internal](templates/readme/internal-tool-readme.md) draft shape. [Draft-first design](guides/readme/04-rdd.md) must clearly mark unimplemented behavior. Preserve actual supported commands, prerequisites, output, owners, failure modes, disclosure rules and license facts; leave unknown runtime/network proof unexecuted. No direct README write or publication is authorized by this read-only role.

## Keep the role read-only

The [paired GitHub Workflow Specialist](../../agents/github-workflow.md) uses only Read, Grep, Glob and Skill within supplied local scope. Do not execute Git or shell commands, write files, access credentials, install tools, configure settings, stage, commit, push, merge, delete branches/worktrees, run practice or contact providers. A proposal does not acquire implementation powers from its command examples. The caller saves chat output only when that separate action is authorized and actual write tools exist.

Use [Security Review](../security-review/SKILL.md) for exposed-secret findings and response ownership. Credential revocation/rotation, log access and provider changes require their separately authorized custodian. CI/server hooks and admin settings require an actual authorized implementation owner; no unavailable specialist is invented. Preparation does not authorize publication, emergency hook bypasses or history updates.

Follow the receiving project's declared scripts and selected Starter stack; do not add tool dependencies or alternative application services from examples. Return the missing evidence or capability when a dependent step cannot be established. Direct review is not a separately dispatched Specialist.
