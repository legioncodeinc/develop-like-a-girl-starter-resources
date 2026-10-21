# Existing gate record

Read the existing manifest and lockfile before filling commands.

| Stage | Actual existing command | Writes source? | Observed output | Inputs/artifact identity |
|---|---|---|---|---|
| Generated declarations | | | | |
| Type checking | | | | |
| React/accessibility/type-aware lint | | | | |
| Formatting check | | | | |
| Duplication if already selected | | | | |
| Pure/component/integration tests | | | | |
| Built Worker SSR/browser tests | | | | |
| Artifact and secret inspection | | | | |

CI must not quietly fix source. A local pre-commit tool is a convenience and does not substitute for the complete program check. Do not install hooks, lint-staged, a new runner, formatter, package manager, or dependency to fill an empty cell. Missing required evidence remains unproven. Review Security, Quality and repository health in order before any separately authorized commit/push/release.
