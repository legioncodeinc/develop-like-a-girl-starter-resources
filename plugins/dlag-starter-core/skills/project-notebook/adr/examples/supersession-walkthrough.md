# Example: complete reciprocal supersession

Synthetic documentation specimen, NOT_RUN. Accepted labels describe only the constructed scenario; they do not approve a reader's project, implementation or provider operation. Illustrative project directory: `library/knowledge/private/architecture/`. The complete imaginary inventory ends at ADR-024, making ADR-025 next; no historical gap is being filled.

## Scenario

ADR-012 permitted reusable presigned links for private R2 downloads under an accepted project TTL policy. The requirements now call for immediate revocation when file ownership changes. An issued bearer URL remains valid until expiry despite later database/RLS changes. The constructed owner accepts a replacement that serves private downloads through a Worker proxy with current identity/ownership checks.

## Before: ADR-012

```markdown
# ADR-012. Use expiring private download links
Date: [actual historical date]

## Status
Accepted, with [actual decision-owner evidence].

## Context
Private downloads need an explicit access boundary. Immediate revocation was not required
by the recorded policy at the time.

## Decision
We decided to issue presigned R2 links only after identity and ownership checks.

## Consequences
Lower Worker traffic, with the accepted limitation that an issued bearer URL remains usable
until expiry. Database permission changes do not revoke that URL.

## Alternatives Considered
A Worker proxy would recheck access but add traffic and availability dependence.
```

## Step 1: create the replacement record

Confirm the actual full inventory and acceptance evidence, then use authorized Markdown writes to draft ADR-025. In a real task keep it Proposed if that evidence is missing. Do not run a CLI or change the older record merely because a replacement was suggested.

## Step 2: fill ADR-025

```markdown
# ADR-025. Proxy private downloads for immediate revocation
Date: [actual accepted decision date]

## Status
Accepted, with [actual replacement-owner evidence].
Supersedes: ADR-012.

## Context
ADR-012 accepted reusable presigned links. The project now requires immediate revocation
when ownership changes, which an already-issued bearer link cannot provide. The new
requirement and owner acceptance are recorded separately from implementation evidence.

## Decision
We decided that the Worker verifies current Supabase identity, owner and release state for
every private download and proxies R2 delivery. The implementation must use a qualified
Workers-compatible streaming path; this record does not choose an unverified API recipe.

## Consequences
Positive: current ownership determines access even for an old browser page.
Negative: Worker traffic, runtime limits and service availability become part of the file
boundary; large-object and interrupted-download behavior need meaningful tests.
Neutral: Supabase remains metadata/auth authority and R2 remains byte storage. No provider
setting or object-retention change follows automatically from the decision.

## Alternatives Considered
### Alternative: shorter presigned TTL
Reduces exposure but retains a bearer interval after permission changes. Rejected for this
immediate-revocation requirement; it can fit a different accepted policy.
### Alternative: public bucket plus unpredictable keys
Does not enforce current ownership. Rejected as incompatible with private-file access.

## Implementation handoff
Owner: [actual implementation owner]. Status: NOT_RUN.
Affected components: actual request, identity, metadata and object-delivery paths to inspect.
Required proof: anonymous/cross-owner/revoked access denial, streaming limits, interruption
handling and unchanged public/private bucket separation. Deadline: UNKNOWN unless supplied.
```

## Step 3: update only ADR-012's status and pointer

After the replacement is actually accepted and the specific edit is authorized, change only the historical Status section:

```markdown
## Status
Superseded by ADR-025.
```

Keep its original context, choice, consequences and alternatives intact. If another worker owns the file, resolve ownership before editing it.

## Step 4: verify both directions

Read both files back. ADR-025 must say `Supersedes: ADR-012`; ADR-012 must say `Superseded by ADR-025`. Resolve actual relative Markdown links from each file where the project uses them. If one write fails, report the incomplete pair and do not claim success or proceed as if the old choice has safely changed.

## Step 5: update the existing index

Record both statuses and pointers in the actual index, with links resolved from that index's location. Keep permanent identifiers and the old historical entry. No index generator or HTML build is required; an existing optional tool needs its own actual capability/authorization. An index update does not migrate the application.

## Step 6: retain the implementation references

Prepare an implementation handoff referencing ADR-025 and ADR-012. A future authorized change or commit may include those references; this task performs no commit, remote PR edit or publication. Track decision acceptance, implementation, verification and release separately.

## Result

The constructed old and new decisions form a navigable history, including the policy that changed and the trade-offs accepted. In actual work the pair is complete only after both files, acceptance evidence and reciprocal links are checked. The implementation handoff remains pending until real code and execution evidence exist.
