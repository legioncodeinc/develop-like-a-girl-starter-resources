# Example: prepare a Node dependency-review setup

Synthetic case, not an executed setup. A React Router framework SSR project uses npm/package-lock.json and GitHub Actions. Its Worker and client builds have existing scripts. The owner requests a proposal for grouped updates, known-advisory checks and install-time behavior review. No service is registered or configured by this example.

## 1. Inspect and choose from requirements

Read manifest/lock/toolchain/workspace/CI files and existing configuration. Suppose the supplied evidence shows no update service, an npm frozen install, one ABI-sensitive native package and an owner preference for explicit manual review. Use the [matrix](../guides/00-scanner-decision-matrix.md). Grouping alone does not distinguish Renovate from Dependabot; compare documented delay/maintenance semantics, permissions and actual owner requirements.

For the exercise, propose Renovate only because the owner requires its specific maintenance/release-age policy. Preserve the seven-day baseline, longer manual native family window, patch grouping, labels and PR limit in the [config proposal](../templates/renovate-base-config.json). Automerge stays false. Native example package names apply only when present in the actual target. The configuration file is not an installed App or authorization to create PRs.

## 2. Describe authorized onboarding separately

A capable implementation caller would obtain task-specific authorization for App installation/settings, select the actual repository/least privileges, add reviewed configuration, and capture onboarding/service validation output. Do not promise an onboarding PR within 24 hours or claim a generic example enabled it. Service cost/tier and hosting remain the owner's explicit choice. Existing authorization is reused only for its named action.

## 3. Preserve lock discipline

The proposed existing npm CI job uses `npm ci` with the actual manager/version/config. The lock is tracked and paired with the correct workspace manifest. Supplied output, if available, must bind to the candidate. `npm ci` can remove node_modules, perform network access and execute scripts; no installation happens in this teaching example.

Do not add Husky/lint-staged, change managers or refresh the lock to clear an explanation discrepancy. See [five lock rules](../guides/03-lockfile-discipline.md). If manifest changes are authorized, the caller updates the lock with matching manager semantics and then checks consistency with a frozen installation.

## 4. Propose a high/critical advisory gate

The illustrative npm gate is:

```yaml
- name: Known advisory baseline
  run: npm audit --audit-level=high
```

It queries a registry/advisory service and is not run by this Specialist. Capture exact command/CLI/source/time/graph/output and exit when a caller is authorized. Keep lower findings tracked. A clean result is bounded to that query and does not prove zero-day, malware or application safety. Triage the [five questions](../guides/01-vulnerability-triage.md), never a blanket ignore.

## 5. Preserve behavior signals

If an authorized owner selects an existing Socket or equivalent integration, inspect how its actual policy surfaces new lifecycle scripts, unexpected network/shell/file behavior, obfuscation and suspicious identity/origin changes. Installation/registration and PR comments are external effects. A service can supply useful signals without guaranteeing detection of all account takeover/malware. Do not disable script alerts merely because native compilation is normal.

## 6. Evidence required after actual implementation

| Requirement | Actual evidence required | Example result |
|---|---|---|
| Update service installed and grouping/delay honored | Service config/onboarding and real proposal/merge-check evidence | NOT_RUN |
| Lock consistency across supported targets | Exact candidate frozen-install output and target matrix | NOT_RUN |
| Advisory policy | Dated exact-graph result and triage record | NOT_RUN |
| Native guards/manual review | Actual script/source/ABI change review and reviewer | NOT_RUN |
| Behavioral integration | Actual scoped result/policy and limitations | NOT_RUN |
| Release inventory/origin | [Artifact-bound qualification](../guides/07-bind-sbom-to-release-artifact.md) | NOT_RUN |

Expected outcome is a concrete proposal with one reason per choice, no automatic merge and no false runtime/provider proof. Security Review then Quality Review apply to any later implemented candidate. This example is not evidence of a week-one operational setup.
