# Rotate a credential and prove the cutover

Workers secret bindings store values; they do not issue replacement credentials at Supabase, Resend, Stripe or another provider. A rotation has two state changes: the issuer's credential state and the consuming Worker's version/deployment state. Assign an owner to both before preparing commands.

## Choose the actual rotation model

- **Create a replacement and revoke the old key:** use this when the provider supports overlapping active credentials and the application can accept the replacement without changing its authorization semantics.
- **Change an existing credential in place:** treat this as a coordinated cutover. If the issuer invalidates the old value immediately, no Worker deployment trick can create an overlap window. Plan the outage or provider-supported alternative explicitly.
- **Leased or dynamically issued credentials:** require a provider-specific mechanism and different lifecycle. This Playbook does not add one.

Do not infer that an arbitrary Supabase key or database password supports the same dual-key behavior as another provider. Verify the exact credential type and issuer procedure. A provider administrator credential belongs to the rotation operator's management process, not the normal application binding.

## Normal overlap sequence

1. Inventory all consumers, environments, current credential identifier and current deployed versions. Record identifiers only, never values.
2. Verify that the old and replacement credentials may coexist and have the intended equivalent scope. Agree on a deadline and a recovery path.
3. The authorized issuer operator creates the replacement through the approved secure channel. Creation alone does not update any Worker.
4. Stage the replacement for every intended consumer using the [version procedure](03-provisioning-and-versions.md). Record the resulting version and inspect its code/configuration before activation.
5. Activate the approved version. If two Worker versions serve traffic during a gradual rollout, keep both credentials valid until the old version no longer receives traffic and any in-flight work has completed.
6. Perform the smallest authorized functional check with the correct environment and test data. Record request/result identifiers without secret values or customer payloads.
7. Check every consumer, not just the first successful Worker. Include local or scheduled consumers only if they actually exist in the project.
8. After the agreed observation and rollback window, the issuer operator revokes the old credential. Record the revocation result. Remove obsolete binding names only when they are unused and that deletion is authorized.

Size the overlap window around the slowest consumer's actual update time, in-flight work and the agreed rollback window. Do not promise a fixed two-interval grace period. Use [rotation-record.md](../templates/rotation-record.md) for the complete handoff.

## Failure and rollback

Before old-key revocation, a rollback may restore a reviewed Worker version using the still-valid old key. After revocation, returning to that version can fail. Confirm issuer validity before any rollback and avoid making an old secret live again solely because it exists in a saved version. Workers versions do not restore external database state or other bound resource contents. See [Workers version scope](https://developers.cloudflare.com/workers/versions-and-deployments/).

If upload fails, leave the working deployment in place and investigate the specific error. If activation fails, retain the replacement only for the agreed recovery window. If the old credential is compromised, security containment may require immediate revocation even when overlap would reduce downtime. The owner must make that explicit tradeoff; the Playbook does not improvise retries or revoke credentials autonomously.

## Answer the right audit question

| Question | Evidence to request |
| --- | --- |
| Who changed a Worker or secret configuration? | Relevant Cloudflare account audit events, actor, resource, action and time |
| Which version actually served traffic? | Deployment record and version identifiers |
| Did a provider accept the new credential? | Bounded provider operation evidence or provider-side key usage records |
| Who read a secret inside application code? | This is not established by a management audit event or ordinary request log |
| Was the old credential revoked? | Issuer-side revocation result |

Cloudflare Audit Logs v2 cover management activity across API and dashboard with actor/action/resource context. The dashboard hides `view` events by default. Confirm event coverage for the actual operation; absence from a filtered view is not proof that nothing happened. Account audit activity is not a per-request log of `env.SECRET_NAME` access. See [Audit Logs v2](https://developers.cloudflare.com/fundamentals/account/account-security/audit-logs/).

Store only the minimum relevant event metadata in the report. Do not forward logs, configure Logpush, enable new telemetry or retrieve credential payloads as part of a document-only review. If a per-secret read audit or automatic issuer rotation is a firm requirement, record the unmet requirement and use the [tradeoff reference](../references/capabilities-and-tradeoffs.md).
