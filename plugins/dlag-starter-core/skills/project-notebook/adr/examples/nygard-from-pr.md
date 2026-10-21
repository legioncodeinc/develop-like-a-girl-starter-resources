# Example: derive a Nygard ADR from a supplied PR

Synthetic documentation specimen, NOT_RUN. The PR number, change and all project paths below are illustrative. The specimen records a draft, not a claim of accepted architecture or implemented security.

## Input: supplied PR description

> PR #247 proposes a single Worker service that authorizes private-file downloads before reading R2. The application already uses Supabase Auth and PostgreSQL file metadata. The current browser page can remain open after record ownership changes. The proposed service checks verified identity, current owner and file release state for each request, and proxies the file when immediate revocation is required. It rejects missing or cross-owner access before exposing file bytes. Alternatives considered were longer-lived presigned links and public objects with opaque keys.

The supplied PR description is a source claim. It does not prove the permission checks exist, the code runs, the choice was accepted or an owner approved a rollout.

## Step 1: determine ADR eligibility

This is consequential, non-obvious and affects the file-access boundary and delivery cost. A Nygard record is appropriate because the alternatives are manageable. First obtain actual decision evidence. In this specimen that evidence is missing, so the output remains Proposed. Do not turn a feature proposal or PR description into Accepted status.

## Step 2: assign the next number

Inspect the existing project's ADR filenames and complete number inventory using available read tools. In this constructed inventory the highest existing identifier is ADR-030, so the next is ADR-031. Do not fill an older gap or assume that 031 is available in the real project. Use the project's actual directory/width; a new Project Notebook defaults to `library/knowledge/private/architecture/ADR-031-private-download-authorization.md`.

## Step 3: draft the record

```markdown
# ADR-031. Authorize private downloads in a Worker service

Date: [actual draft date]

## Status

Proposed. Decision owner and acceptance evidence: UNKNOWN.

## Context

Private file metadata lives in Supabase PostgreSQL while bytes live in R2. An already-open
browser page may hold an old owner selection. RLS governs database rows, not the R2 object,
and a reusable presigned URL remains a bearer capability until its expiry. The project
requires immediate access revocation after ownership changes. Existing code and runtime
checks must still be inspected; the supplied PR is a proposal, not observed behavior.

## Decision

Candidate choice: use a single request-scoped Worker service to verify Supabase identity,
current owner and release state before returning private bytes. For the stated immediate
revocation policy, proxy R2 delivery rather than issue a reusable bearer URL. If the actual
owner accepts this choice, update this section to the actual past-tense decision and record
its evidence. Do not invent that acceptance.

## Consequences

Positive: one explicit access boundary can be checked for missing, revoked and cross-owner
identity. Public-bucket access is not needed for private files.
Negative: Worker proxying adds traffic and availability dependence; streaming and file-size
limits require actual Workers/R2 qualification. A failure must not expose a partial file.
Neutral: existing Supabase and R2 service ownership remains. No credential, bucket setting,
provider operation or implementation test is performed by writing this record.

## Alternatives Considered

### Alternative: longer-lived presigned links

Direct delivery reduces Worker traffic but an issued bearer URL remains usable until expiry.
It cannot satisfy immediate revocation without a different delivery boundary.

### Alternative: public objects with opaque keys

Simple delivery, but possession of an object key would bypass private-file authorization.
Obscurity cannot replace a current owner check.
```

## Step 4: file and read back

For an expressly requested local document save, check the destination first and use available Markdown Write/Edit. Preserve collisions and unrelated text. Read the saved record back, check the number, status, full format, actual evidence locators and any real relative links. Do not run a CLI or create an empty document taxonomy merely to author one decision.

## Step 5: propose the PR reference

Prepare a PR-description fragment only if useful: `ADR-031: Private download authorization, Proposed; acceptance pending.` Resolve its actual project-relative link after the record exists. Updating the remote PR is a separate external action, never implied by this draft.

## Step 6: preserve implementation traceability

A future authorized implementation change can cite ADR-031 in its local change description and eventual commit message. No commit is created here. Keep source review, owner acceptance, implemented checks, runtime evidence and release state distinct. Record the exact subject revision and actual denied-access cases when later tested.

## Result and limits

The source PR, local record and proposed implementation references have a traceable relationship. The decision remains Proposed until actual acceptance exists. The specimen neither dispatches a security reviewer nor proves a working file boundary; those require actual evidence and the applicable independent review.
