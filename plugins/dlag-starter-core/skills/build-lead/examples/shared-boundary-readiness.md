# Constructed case: supplied file metadata agreement

This is a teaching input for review, not an accepted decision, running endpoint, real test result or proposal to install contract authoring. All names and records are synthetic. The purpose is to inspect a supplied agreement and its proof without creating new normative terms for a project.

## Supplied hypothetical terms

Two PRDs share a file metadata read. Their designated owner supplies `CTR-004-file-metadata` revision 1 and a hypothetical acceptance reference covering those exact terms. A real review must verify the real decision; the strings in this example are not approval.

The stated provider is a Workers endpoint, with a React Router UI as consumer. The supplied native schema identifies `GET /files/{id}` and a 200 object containing `fileId`, `mediaType`, nonnegative `byteLength` and nullable `downloadPath`. Its identity/record policy separately controls metadata visibility. Object download permission is a second check; visible metadata does not itself authorize an R2 read. When download is not permitted, the supplied terms require a null path. The stated errors are 401 for no verified session,404 for a missing or invisible record and 400 for malformed input. These are illustrative supplied terms, not universal status recommendations or an implementation.

Valid synthetic specimen:

```json
{"fileId":"file-demo","mediaType":"image/png","byteLength":250,"downloadPath":null}
```

The schema, source, decision and complete surrounding constraints are required inputs. This specimen alone does not define the whole interface, prove authentication/RLS or select a new background provider. There is no asynchronous-job assumption in this case.

## Inspect readiness before parallel completion

1. Compare the actual acceptance evidence with the exact identity/revision and check for unresolved decisions. If only a Draft or an author assertion is supplied, both PRDs remain blocked on that boundary. Independent sections can still be drafted.
2. Confirm both PRDs pin the same accepted revision with valid links. Record the provider and consumer owners and their disjoint files. Do not finalize one side against a different revision merely because it is easier to implement.
3. Check requiredness, nullability, access separation, success and all three errors in the supplied complete schema. An unverified token, submitted actor ID or hidden download button cannot satisfy server identity or object permission.
4. Record a provider check covering unauthenticated, wrong-owner/invisible, malformed and valid metadata, including visible-metadata/no-download cases. Record a consumer check for the declared success/error/null states and actual permission rendering. Both check states remain Planned/NOT_RUN in this example.
5. Apply the actual approved wave plan and Definition of Done if present. Do not infer worker availability, free slots or accepted interface terms from a structurally valid handoff JSON.

## A new field is not automatically compatible

Suppose a proposed successor adds optional `checksum`. An older consumer might reject unknown fields. Inspect its real schema policy and old/new interactions before labeling the change compatible. Keep the current accepted terms and pins intact while the owner settles the proposal and rollout/rollback behavior. A local document revision does not itself bump a deployed API version.

After a real accepted successor exists, the authorized requirements owner can repair active pins under the project's policy. Historical completed PRDs keep the pin their evidence addressed. The provider and every affected consumer need their own actual checks against the successor and combined candidate; the hypothetical example supplies none.

## Honest result

| Situation | Result |
| --- | --- |
| Only supplied status text says Accepted | Acceptance unverified; dependent finalization remains blocked. |
| Exact real acceptance and matching pins observed, checks only planned | Planning readiness may be established within inspected scope; implementation is unverified. |
| Only provider test passes | Consumer behavior and full shared criterion remain unverified. |
| Consumer tests use mocks only | Real provider conformance and permission enforcement remain unverified. |
| New field proposed while compatibility is unknown | Affected boundary waits for the owner's accepted terms and rollout evidence. |
| No records or source access supplied | Scope unavailable; zero input is not a passing audit. |

Return located observations and the smallest missing decision. Build Lead cannot save or approve the agreement. Security, independent Quality and coordinator-direct GitHub Workflow health remain required for actual implementation acceptance. No command, provider, credential or release action runs here.
