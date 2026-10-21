# ADR Log as an Onboarding Tool

The ADR log is the engineering team's institutional memory in its most navigable form. For a new engineer, reading the ADR log chronologically answers the question "how did this codebase get to be the way it is?" in a way that code and wikis cannot.

---

## The three value categories for onboarding

### 1. Decision archaeology

New engineers inevitably ask: "Why do we use X instead of Y?" Without an ADR log, the answer is "because that's how it was when I joined", or a painful historical reconstruction from git blame and Slack search.

With an ADR log, the answer is: "See ADR-0012, we considered Y but rejected it because of Z."

The Alternatives Considered section is especially valuable here. It prevents experienced engineers from relitigating decisions and gives new engineers the evidence they need to propose a reversal only when circumstances have genuinely changed.

### 2. Change attribution

ADRs are linked from commit messages and PR descriptions:

```
feat(files): authorize private downloads in the Worker (ADR-031)
```

When a new engineer reads a commit that changed the private-file access path, the ADR reference takes them directly to the decision record with full context, rationale, and trade-offs.

### 3. Architecture overview

The ADR log, sorted by topic area, gives a new engineer a map of the major architectural choices. It is not a complete architecture document, but it covers the decisions that deviated from defaults and therefore require explanation.

---

## Linking ADRs from code

### Code comments

```typescript
// Using optimistic locking here per ADR-0019 (concurrent update safety)
// See the actual project-relative ADR path; for a new Project Notebook: library/knowledge/private/architecture/ADR-019-concurrent-updates.md
```

### Commit messages

```
refactor(db): adopt expand-contract migration pattern (ADR-0024)
```

### PR description template

For an explicitly requested local Markdown template edit, prepare this fragment for the existing `.github/pull_request_template.md`; do not change repository settings or any remote PR:

```markdown
## Related ADRs
<!-- List any ADRs this PR implements, supersedes, or relates to -->
- ADR-NNNN: <title>
```

---

## Structuring the ADR log for readability

### Sequential numbering is required but topic grouping helps

Log4brains allows filtering and categorization. For manual browsing, add an `adr-log.md` index grouped by topic:

```markdown
# ADR Log

## Data and file access
- ADR-012: Reusable private download links, Superseded by ADR-025
- ADR-025: Current ownership checks through a Worker proxy, Accepted, Supersedes ADR-012

## Application boundaries
- ADR-018: Request-scoped server services, Accepted

## Release
- ADR-024: Reviewed schema migration procedure, Accepted
```

---

## Onboarding reading order

In the onboarding guide, point new engineers to the ADR log with this framing:

> "Read the ADR log in chronological order for the first 30 minutes. Pay special attention to ADRs marked `Superseded`, they show you where we changed direction and why. After that, use the topic index to find decisions related to the area you'll be working in first."

For teams using Log4brains, the HTML interface provides filtering by status, date, and package, direct new engineers to the rendered site.

---

## What makes an ADR log a good onboarding artifact

| Quality | Indicator |
|---|---|
| Complete | Major architectural choices are recorded; the log doesn't have mysterious gaps |
| Honest | Consequences sections include negatives; Alternatives Considered sections are substantive |
| Current | Recent decisions are recorded; recent accepted decisions are covered |
| Linked | Key ADRs are cited in commit messages and PR descriptions |
| Indexed | A topic-grouped index or an already selected renderer makes it navigable |

## Actual onboarding and gap evidence

An index or rendered site is optional; accurate records and readable links are sufficient. In a requested log review, sample actual consequential changes from supplied code/PR evidence and compare them with the log. Report missing decisions, vague consequences, absent alternatives, unresolved acceptance, broken supersession pairs and stale source references with concrete locations. Do not infer completeness from record count or a recent date. Never create missing historical acceptance from a commit message alone.

Topic grouping does not replace permanent numbering. Preserve the original directory and immutable historical text, and keep index links relative to the actual index location. The index rows above are a constructed layout, not claims that those files or accepted choices exist. Remote PR edits, commits and publishing stay outside this document workflow.
