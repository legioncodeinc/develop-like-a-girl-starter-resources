# Access and CI map

Status: Draft. Record scopes and identifiers, never credentials.

## Required operation

- Repository, trusted branch/revision and workflow path:
- App directory and source/generated configuration selection:
- Worker account, name and environment:
- Exact operation: inspect metadata / upload version / activate / change secret:
- Existing deployment or new Worker creation:
- Person responsible for approving the operational action:

## Actors and authority

| Actor or token identifier | Human / CI / application / rotation operator | Allowed resources | Minimum actions | Effective actual role/scope | Expiry and owner |
| --- | --- | --- | --- | --- | --- |
| [identifier] | [kind] | [specific target] | [operation] | [verified or unverified] | [time/role] |

- Separate staging and production credentials:
- Product-wide or account-wide grants that expand the stated scope:
- Does the actor's ability to deploy code expose existing runtime secrets?
- Additional zone permission actually needed, if any:
- Required denied targets and whether denial was verified:
- Renewal/revocation procedure and who owns it:

## CI delivery

- Trigger and allowed branch/revision:
- Protected GitHub Environment and restrictions confirmed:
- Approved pinned actions and lockfile restoration:
- Steps before credentials become available:
- Only step receiving `CLOUDFLARE_API_TOKEN`:
- Application runtime secrets kept out of build/test, or explicit scoped exception:
- Build-time Cloudflare environment selection:
- Generated target/configuration verification:
- Name-only action summary, with no value output:
- Logs, caches and artifacts reviewed for accidental capture:
- Token exchange support verified if federation is separately requested:

## Results

- Local source review performed:
- GitHub workflow executed or unrun reason:
- Provider scope/denial checked or unrun reason:
- Findings and required owner action:
- Security review handoff if a leak or overbroad grant was found:

A stored secret name or environment label is not proof of effective provider scope.
