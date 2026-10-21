# Scanner and update-tool decision matrix

Read [target audit](05-target-repository-audit.md) first. This is a review method for the actual Node package graph, not a directive to install a new service. Use the project's package manager and CI. Match the tool's current official documentation and installed version before proposing flags or configuration; [tool evidence](../references/tool-evidence.md) lists the reference points.

## Layer 1: Update proposals

An update service proposes changed manifest/lock resolutions. It does not prove application compatibility, package trust or authorization to merge. Assess these dimensions together:

| Required behavior | Evidence to collect |
|---|---|
| Ecosystem/workspace coverage | Actual supported manifests, workspaces, lock refresh and peer behavior |
| Grouping | Observed configuration and what patches/minors/native/major families it combines |
| Release-age delay | Timestamp source, missing timestamps, normal/security-update exceptions and actual merge semantics |
| Merge automation | Required checks, protected branches, who approves and ability to disable/roll back |
| Hosting/access | App installation permissions or owned runner, cost/tier, secret handling and maintenance owner |
| Noise control | Schedule/timezone, concurrent limits, labels, maintenance PRs and measured target volume |

Dependabot supports configurable groups and cooldown for documented ecosystems; do not reject it on the old claim those are absent. Renovate supplies configurable grouping, lock maintenance and `minimumReleaseAge`. Match exact semantics and existing policy. If the project needs those Renovate controls, the [proposal](../templates/renovate-base-config.json) uses a seven-day minimum, a longer manual native-package group, major-update review, weekly lock maintenance, labels and PR limits. Delays buy observation time; they do not identify malicious code and may interact differently with urgent security alerts. An explicitly reviewed urgent exception needs package/version, reason, owner and follow-up.

Automerge is disabled in the supplied proposal. Development tools run builds and install scripts and are not inherently safe. Enabling patch/minor automerge is a distinct owner decision requiring protected-branch checks, actual grouped-change behavior and native exclusions. App installation, onboarding PRs and changes to merge settings require a capable authorized caller.

## Layer 2: Published-advisory baseline

For an observed npm target, supplied `npm audit --audit-level=high` output can support a high/critical blocking policy. It is a networked advisory query; this Specialist does not run it. Record CLI/version, command, graph/lock identity, data source/time, severity scope and exit code. A clean result applies only to the data and graph examined. Known vulnerabilities can lack CVE identifiers; advisory findings are not restricted to CVEs and a match is not itself an exploit proof.

Low/moderate findings remain visible and owned even when they do not block by default. The owner may define stricter context-specific thresholds. Snyk is an optional existing-tool alternative when its actual tier and capabilities fit the target; do not select paid service or request credentials by default. `--severity-threshold=high --fail-on=upgradable` is an illustrative policy: it can leave severe findings without an upgrade nonblocking. Preserve and escalate those results instead of interpreting success as clearance. See [triage](01-vulnerability-triage.md) and the inert [Snyk step proposal](../templates/snyk-ci-gate.yml).

## Layer 3: Behavior and install-time risk

A known-advisory lookup cannot reliably identify new malicious code before reporting databases catch up. Review package origins, suspicious name changes, publisher changes when evidence exists, new lifecycle scripts, obfuscation, shell/process execution, network/file access and downloaded/native artifacts. Behavioral tools such as an existing Socket integration can add signals; they cannot guarantee detection of account takeover or all zero-days.

Keep malware, script, network and obfuscation signals visible. Do not disable a native-script warning merely because compilation is expected. Confirm the observed script/source/ABI/platform matches the accepted build contract. New or unexpected behavior is a security triage event. Service registration and PR comments are external effects, not part of read-only assessment.

## Layer 4: Inventory and build origin

An SBOM records identified components within its stated scope. Syft or an existing ecosystem generator can supply inventory evidence; they do not automatically establish completeness or vulnerability safety. Match the final Worker/client artifact and recoverable component metadata, then reconcile manifest/lock/build evidence. Select CycloneDX or SPDX format/version required by the receiver. See [SBOM workflow](02-sbom-workflow.md) and [artifact binding](07-bind-sbom-to-release-artifact.md).

Provenance and signatures associate bytes with a build/source identity under a chosen trust policy. Compromised source can produce a valid signed build. Review contents and execution risks separately using [release guards](04-provenance-verification.md).

## Decision record

Record the existing four layers, gaps, one justified recommendation and unperformed changes. Retain current service if it meets requirements. A proposed stack can include update proposals, advisory checks, behavioral review and final-artifact inventory without requiring four new products. Use the [setup example](../examples/happy-path-node-scanner-setup.md) and [triage report](../templates/dependency-triage-report.md). No source-specific helper, native package or publishing registry becomes a Starter dependency.
