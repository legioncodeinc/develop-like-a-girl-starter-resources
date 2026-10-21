# What the selected secret model covers

Use Workers secret bindings for a Starter app whose private runtime values belong to its Workers. The recommendation is an application design judgment: it keeps the selected hosting boundary direct and avoids an additional management service. Revisit a specific unmet requirement rather than adding a platform speculatively.

| Requirement | Selected mechanism | Remaining responsibility |
| --- | --- | --- |
| Server receives a private value | Per-Worker secret binding through `env` | Keep server code from logging or serializing it |
| Staging and production use different credentials | Separate named Worker environments and explicit provisioning | Verify actual resource targets and issuer scopes |
| Local development | Operator-managed ignored local file | Plaintext protection, development-only values and team onboarding |
| Missing required names | Name map, runtime checks and supported Wrangler `secrets.required` | Provider validity and feature-specific requirements |
| CI deploys an existing Worker | Restricted API token available only to the authorized job step | Reviewed code, protected environment and effective token permissions |
| Change without immediate traffic activation | Stage a version, then deliberately deploy it | Confirm candidate code, desired version and rollback window |
| Credential rotation | Issuer replacement plus every consumer's update and verification | Provider-specific overlap, revocation and recovery |
| Management audit | Account audit events and deployment records | Relevant event coverage and operator access |
| Every application read of a secret is audited | No such evidence is established by this pack | Record the unmet requirement; do not equate API audit events with runtime reads |
| One update automatically changes all service credentials | No cross-Worker propagation is configured | Inventory every consumer or request a separately reviewed design |
| Dynamic leased credentials or scheduled issuer rotation | No such service is configured | Verify issuer support and request an explicit architecture decision |

## Decision worksheet

Record the app's actual needs:

1. Which running processes consume private values, and are they all existing Workers?
2. Which environments and providers are involved? Which values can be separated by consumer?
3. Does the team need central fan-out, a per-value access audit or issuer-side automatic rotation? Identify the requirement and owner, not an imagined future scale.
4. Can the operator keep the complete consumer list and rotation window correct with the current small setup?
5. Is there an actual gap that prevents the requested feature from operating safely? State that gap precisely and stop the dependent implementation until a design is selected.

A handful of server-only keys for one Worker can fit this model well. Multiple independently deployed consumers sharing a credential require disciplined coordinated updates. A formal per-secret-read audit requirement may require a different design. Do not silently treat a separate account-level store as the selected mechanism, and do not claim features that have not been configured and checked.

## Questions to keep separate

- Secret storage encryption does not establish browser bundle safety.
- Secret-name presence does not establish that a key is active or scoped correctly.
- A provider key rotation does not update a Worker by itself.
- A Worker version rollback does not undo a provider revocation.
- A deployment token's name does not constrain its permissions.
- A management audit event does not prove a particular runtime operation accessed a value.

Use the [official sources](official-sources.md) for platform mechanics. Requirements, chosen scope and verification status belong in the [binding map](../templates/binding-map.md), [access map](../templates/access-and-ci-map.md) and [rotation record](../templates/rotation-record.md).
