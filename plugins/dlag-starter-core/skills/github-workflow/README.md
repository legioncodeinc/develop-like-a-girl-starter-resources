# GitHub Workflow guide map

Use [the Playbook](SKILL.md) and [repository review procedure](guides/procedure.md) first. These complete local resources explain operations; the current Specialist remains read-only. All command examples require a separately authorized caller and actual installed tooling.

## Detailed guides

- [Principles - Git workflow](guides/git/00-principles.md).
- [Interactive Rebase - Git workflow](guides/git/01-interactive-rebase.md).
- [History Rewriting - Git workflow](guides/git/02-history-rewriting.md).
- [Conflict Resolution - Git workflow](guides/git/03-conflict-resolution.md).
- [Reflog Recovery - Git workflow](guides/git/04-reflog-recovery.md).
- [Worktrees - Git workflow](guides/git/05-worktrees.md).
- [Hooks - Git workflow](guides/git/06-hooks.md).
- [LFS and Large Files - Git workflow](guides/git/07-lfs-and-large-files.md).
- [Submodules vs Subtrees - Git workflow](guides/git/08-submodules-vs-subtrees.md).
- [Learn Git with a disposable practice repository](guides/git/09-beginner-disposable-practice.md).

## Examples

- [Practice output interpretation](examples/git/beginner-git-practice.md).
- [Example: Secrets Removal from Git History](examples/git/secrets-removal.md).
- [Example: Worktree Parallel Features Workflow](examples/git/worktree-parallel-features.md).

## Templates and references

- [Beginner Git worksheet](templates/git/beginner-git-worksheet.md).
- [.gitattributes Starter Template](templates/git/gitattributes-starter.md).
- [Hooks Collection Template](templates/git/hooks-collection.md).
- [Rebase Cheat-sheet](templates/git/rebase-cheatsheet.md).
- [Reports](templates/git/session-report.md).
- [Command compatibility and recovery tables](references/git/command-reference.md).
- [Operating notes and known limits](references/git/operating-notes.md).
- [Optional practice source](scripts/practice-git.py) and [boundary-test source](scripts/test-practice-git.py): not executed by this role.

No model behavior, native Git mutation, recovery, hook installation or remote update is implied by this guide map.

## Branch and release policy

- [Principles: The Non-Negotiables](guides/branching/00-principles.md).
- [Model Selection: Decision Tree and Migration Paths](guides/branching/01-model-selection.md).
- [Release and Hotfix Patterns](guides/branching/02-release-and-hotfix.md).
- [Merge vs Rebase: When Each Applies](guides/branching/03-merge-vs-rebase.md).
- [Feature Flag vs Feature Branch: The Decision Framework](guides/branching/04-feature-flag-vs-branch.md).
- [Migration Playbook: Moving Between Branching Models](guides/branching/05-migration-playbook.md).
- [GitHub Merge Queue: Setup, Modes, and Real-World Adoption](guides/branching/06-merge-queue.md).
- [Example: Mobile SDK Team Where GitFlow Is Justified](examples/branching/edge-case-gitflow-justified.md).
- [Example: TypeScript Library Team Migrating from Ad-hoc to GitHub Flow](examples/branching/happy-path-github-flow.md).
- [Branching Policy - [PROJECT NAME]](templates/branching/branching-policy.md).
- [Draft advisory report](templates/branching/session-report.md).
- [Branching policy decision notes](references/branching/operating-notes.md).

## PR communication and review

- [00 - Principles: Code Review as Culture](guides/review/00-principles.md).
- [01 - PR Description: Authoring and Auditing](guides/review/01-pr-description.md).
- [02 - Review Checklist: Context-Specific Generation](guides/review/02-review-checklist.md).
- [03 - Small PR Discipline](guides/review/03-small-prs.md).
- [04 - Async-First Review Norms](guides/review/04-async-review.md).
- [05 - Rubber-Stamp Detection](guides/review/05-rubber-stamp-detection.md).
- [06 - Comment Coaching](guides/review/06-comment-coaching.md).
- [Example: Happy Path PR Review](examples/review/happy-path-pr-review.md).
- [Example: Large PR Split](examples/review/large-pr-split.md).
- [Review culture scorecard](templates/review/culture-scorecard.md).
- [PR Description Template](templates/review/pr-description.md).
- [Review Checklist Template](templates/review/review-checklist.md).
- [Draft advisory report](templates/review/session-report.md).
- [PR review decision notes](references/review/operating-notes.md).

## Repository-health audits

- [00 - Principles and Boundaries](guides/health/00-principles.md).
- [01 - Branching Strategy Audit](guides/health/01-branching-strategy.md).
- [02 - Branch Protection and Rulesets Audit](guides/health/02-branch-protection.md).
- [03 - Commit History Quality Audit](guides/health/03-commit-quality.md).
- [04 - CODEOWNERS Audit](guides/health/04-codeowners.md).
- [05 - CI Workflow Density Audit](guides/health/05-ci-workflows.md).
- [06 - Docs Presence Audit](guides/health/06-docs-presence.md).
- [07 - .gitignore Coverage Audit](guides/health/07-gitignore.md).
- [08 - Issue and PR Templates Audit](guides/health/08-templates.md).
- [09 - Repository Settings Audit](guides/health/09-repo-settings.md).
- [Review automation and permission hygiene](guides/health/10-review-automation-permissions.md).
- [Synthetic automation review cases](examples/health/automation-permission-cases.md).
- [Example: Full Audit - TypeScript/Node Library Repo (Happy Path)](examples/health/happy-path-full-audit.md).
- [Example: Scoped Audit - Branch Protection Only](examples/health/scoped-audit-branch-protection-only.md).
- [CODEOWNERS.example](templates/health/CODEOWNERS.example).
- [GitHub Repo Health Audit Report](templates/health/audit-report.md).
- [Automation and permission review worksheet](templates/health/automation-permission-review.md).
- [Advisory report shape](templates/health/session-report.md).
- [Repository-health evidence notes](references/health/operating-notes.md).
- [Repository-health scoring and coverage](references/health/scoring.md).

## README reader guidance

- [Principles: README as Landing Page](guides/readme/00-principles.md).
- [Structure Checklist: Canonical Section Order](guides/readme/01-structure-checklist.md).
- [Badge Discipline](guides/readme/02-badges.md).
- [OSS vs Internal README](guides/readme/03-oss-vs-internal.md).
- [README-Driven Development (RDD)](guides/readme/04-rdd.md).
- [Done Checklist: README Validation](guides/readme/05-done-checklist.md).
- [Before/After: Internal Tool README](examples/readme/before-after-internal.md).
- [Before/After: OSS Library README](examples/readme/before-after-oss.md).
- [<!-- Fill from this repository's verified source and ownership records. Remove unused sections and unknown service examples; do not invent owners, credentials, environments, or capabilities. -->](templates/readme/internal-tool-readme.md).
- [<!-- Project template context: Relative links target files in the receiving repository after this template is filled. They are not required files beside this source template. -->](templates/readme/oss-library-readme.md).
- [Advisory report shape](templates/readme/session-report.md).
- [README audience and evidence notes](references/readme/operating-notes.md).
