# Credential rotation record

Status: Draft. Do not include old or replacement values.

## Issuer and operation

- Provider and exact credential type:
- Old credential identifier and scope:
- Replacement credential identifier and intended scope:
- Reason: routine / expiry / suspected exposure / confirmed exposure:
- Issuer operator and application deployment owner:
- Authorized actions and environments:
- Replacement model: issue new / update existing / separately approved lease:
- Overlap supported by this credential type and evidence:
- Expected disruption if overlap is unavailable:

## All consumers

| Consumer | Environment | Binding name | Current version | Replacement version | Activation result | Functional evidence | Owner |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [Worker/service] | [stage] | [name] | [identifier] | [identifier] | [unrun/result] | [safe reference] | [role] |

- Local or scheduled consumers that actually exist:
- Shared credential copies or independent credentials:
- Slowest update cadence and in-flight work:
- Agreed observation/rollback window:
- Earliest permitted old-key revocation time:

## Ordered execution record

| Stage | Planned action and exact target | Actual time/result | Safe evidence |
| --- | --- | --- | --- |
| Before change | Capture name-only inventory and active versions | [unrun] | [reference] |
| Issuance | Authorized issuer creates replacement | [unrun] | [identifier] |
| Staging | Upload secret version for each consumer | [unrun] | [version IDs] |
| Candidate review | Verify code/configuration and intended key names | [unrun] | [revision/version] |
| Activation | Promote the exact approved version/traffic allocation | [unrun] | [deployment ID] |
| Function | Perform bounded authorized provider check | [unrun] | [result ID] |
| Observation | All consumers use the new credential | [unrun] | [evidence by consumer] |
| Revocation | Issuer revokes old credential after window | [unrun] | [issuer result] |
| Cleanup | Remove unused binding names only if authorized | [unrun] | [version/deployment] |

## Recovery

- Failure before activation:
- Failure after activation while old key remains valid:
- Recovery after old-key revocation:
- Exact safe rollback version and issuer-validity precondition:
- Compromise containment that overrides the ordinary overlap window:
- Retry limit and escalation owner:

## Audit and closeout

- Relevant management audit events with actor/resource/time:
- Deployment evidence distinct from secret upload evidence:
- Issuer usage/revocation evidence:
- Runtime secret-read evidence, or explicit absence of that capability:
- Retention/access requirements checked for the actual account:
- Remaining consumers or unperformed actions:
- Final status: staged / active / verified / old key revoked / incomplete:

Do not declare rotation complete while the old credential is still active unless the agreed task explicitly ends at that stage. Do not infer old-key revocation from a new Worker version.
