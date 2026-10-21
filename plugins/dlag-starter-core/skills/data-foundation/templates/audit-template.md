# DB Audit: [project-name]

**Date:** [YYYY-MM-DD]
**Reviewer:** Data Foundation Specialist
**Scope:** [schema review / migration plan / indexing audit / performance audit / platform choice]
**Postgres version:** [actual server version from supplied evidence]
**ORM / Platform:** [existing client and exact version; Supabase Postgres]

---

## Executive summary

[2-4 sentence synthesis. Lead with the headline finding. Mention severity counts.]

## Review areas

Ratings: Solid / Drifting / Needs work / Unassessed. Use only when supplied evidence supports the judgment; do not invent an overall score.

| Area | Rating | Headline finding |
|---|---|---|
| Schema design (`guides/01`) | | |
| Indexing (`guides/02`) | | |
| Migrations (`guides/03`) | | |
| Partitioning (`guides/04`) | | |
| Performance & pooling (`guides/05`) | | |
| Special-purpose (`guides/06`) (if applicable) | | |
| ORM choice (`guides/07`) | | |
| Platform fit (`guides/08`) | | |

## Findings

### Must-fix ([count])

1. **`[file:line]`**: [one-line summary]
   - Reason: [citation: guide section, packaged guide or official PostgreSQL URL]
   - Fix: [how, with DDL or migration phase]

2. ...

### Should-refactor ([count])

1. **`[file:line]`**: ...

### Style ([count])

1. **`[file:line]`**: ...

## Metrics captured

| Metric | Value | Target | Delta |
|---|---|---|---|
| Largest table size | [rows / GB] | | |
| FK index coverage gaps | [confirmed or candidate; exceptions recorded] | [workload requirement] | |
| Overlapping index candidates | [definitions and evidence] | [reviewed retention/removal decision] | |
| Dead-tuple/size pressure (not physical bloat) | [observed estimates and window] | [workload budget] | |
| Queries exceeding accepted work/latency budget | [evidence] | [budget] | |
| Migration lock acquisition/hold | [observed or unknown] | [accepted invocation budget] | |
| Pool size vs workload | [N] / [capacity] | | |

## Specialist handoffs

- [ ] `Project Planning Specialist`: [if any schema-PRD updates needed]
- [ ] `React Foundation Specialist`: [if any N+1 risks at the data-layer edge]
- [ ] `Security Review Specialist`: [if any PII / RLS / encryption-at-rest findings]
- [ ] `Search Foundation Specialist`: [if any pgvector / embedding-storage decisions]
- [ ] `Quality Review Specialist`: [post-migration verification queries]

## Recommended next steps

1. [highest-leverage fix]
2. [next]
3. [next]

## References

- `guides/...` ([list the guides actually cited in findings])
- [external URLs - postgresql.org preferred]

---

*Use the Data Foundation Playbook for methodology and scope.*
