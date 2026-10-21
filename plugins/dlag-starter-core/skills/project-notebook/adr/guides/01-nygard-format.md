# Nygard ADR Format

The Nygard format is the canonical ADR template, introduced by Michael Nygard in 2011. It answers four questions every engineer will eventually ask about a past architectural choice: What was the situation? What was decided? What were the trade-offs accepted? What alternatives were rejected?

---

## Template anatomy

```markdown
# NNNN. <Title>

Date: YYYY-MM-DD

## Status

<Proposed | Accepted | Superseded by ADR-NNNN | Deprecated | Rejected>

## Context

<The forces at play: technical constraints, team size, time pressure, adjacent systems, 
regulatory requirements. Write this as "here is the situation we were in", not as 
justification for the decision. A reader who disagrees with the decision should still 
recognize this as an accurate description of the context.>

## Decision

<The concrete choice made. Active voice, past tense. "We decided to authorize private downloads in the Worker 
when the project requires current access checks." Not "A Worker should authorize private downloads." Not "we plan to use." 
The decision is closed.>

## Consequences

<The trade-offs accepted, positive, negative, and neutral. Be honest about the negatives; 
they are the most valuable part of this section. A future engineer considering a change 
needs to know what was given up, not just what was gained.>

## Alternatives Considered

<Each alternative that was seriously evaluated, with a brief explanation of why it was 
rejected. This section prevents "why didn't we just use X?" conversations six months later.>

### Alternative: <Name>

<Two to four sentences on what it offers and why it was not chosen.>
```

---

## Worked example: authorize private-file downloads through the Worker

Synthetic documentation specimen, NOT_RUN. Accepted below means acceptance by the constructed example owner only, never approval for the reader's project.

```markdown
# ADR-012. Authorize private downloads through the Worker

Date: [actual decision date]

## Status

Accepted, by [constructed example owner], evidence [illustrative decision record].

## Context

The application stores customer file metadata in Supabase PostgreSQL and private bytes in R2.
A browser can hold an old page after ownership changes. Database RLS governs rows, while
an issued R2 presigned URL remains a bearer capability until expiry. The project requires
access to follow current ownership rather than a stale browser selection.

## Decision

We decided that a Worker checks current Supabase identity, file ownership and release
state before serving a private download. For immediate revocation the Worker proxies
object delivery instead of issuing a reusable presigned URL. The implementation must
choose an approved Workers-compatible streaming path and verify its actual limits.

## Consequences

Positive: current permission checks apply even to an already-open browser page; private
file bytes never require a public bucket.
Negative: downloads add Worker traffic and availability dependence, and streaming limits
must be measured for the intended file sizes.
Neutral: Supabase remains the metadata authority and R2 remains byte storage. This
record does not configure a bucket, choose credentials or claim the route is implemented.

## Alternatives Considered

### Alternative: longer-lived presigned links

Simpler direct delivery with less Worker traffic, but ownership changes cannot revoke an
already issued bearer URL immediately. Rejected for this example's revocation requirement.

### Alternative: public objects with opaque keys

Simple delivery, but knowing a key would bypass private-file authorization. Rejected;
object-key obscurity is not a permission check.
```

---

## Filing conventions

- **Filename:** `ADR-<next-number>-<kebab-case-title>.md`, use the existing project width; for a new Project Notebook use ADR- plus three-digit padding through 999.
  - Example: `ADR-012-private-download-authorization.md`
- **Directory:** `library/knowledge/private/architecture/` for a new Project Notebook; preserve an existing project convention.
- **Numbering:** scan the directory, take `max(existing numbers) + 1`. Never gap-fill.

---

## Common mistakes

| Mistake | Correction |
|---|---|
| Decision written in future tense ("we will use...") | Write past tense; the decision is closed |
| Missing Alternatives Considered | Always include; future engineers will rediscover the same options |
| Consequences section lists only positives | Include the negatives honestly; this is where ADRs earn their keep |
| Generic title ("Retrieval decision") | Specific title ("Authorize private downloads through the Worker") |
| Status left blank | Always set one of the five statuses |

The five-section Nygard core is Title, Status, Context, Decision and Consequences. This kit's extended Nygard template also requires Alternatives Considered, preserving the evaluated/rejected choices. Do not describe that extension as an original Nygard requirement. Keep the owner's acceptance evidence and implementation evidence distinct.
