# ADR-[NUMBER]: [TITLE]

**Status:** [Proposed | Accepted | Superseded by ADR-XXX | Deprecated]
**Date:** [YYYY-MM-DD]
**Author:** [name / role]
**Stakeholders:** [eng leads, DBA if applicable, security lead if data is sensitive]

---

## Context

[What is the situation that forces a decision?
Include:
- Postgres major version, ORM, platform.
- Workload shape: read/write ratio, expected row counts, latency targets, geographic distribution.
- Constraints: team SQL fluency, runtime (edge / serverless / long-running), budget, RPO/RTO.
- Why the status quo cannot continue.
]

## Decision

[What will we do? Be specific. One paragraph + DDL or schema snippet if helpful.]

## Consequences

**Positive:**
- [expected gain, measured or predicted]

**Negative:**
- [cost, risk, or trade-off]

**Neutral:**
- [a change that's neither a win nor a loss but worth documenting]

## Alternatives considered

- **[Alt 1]**: [why rejected]
- **[Alt 2]**: [why rejected]

## References

- `guides/XX-...md §section`
- [external URL: postgresql.org docs preferred]

## Verification

[How do we prove this ADR works? What metric, query plan, or migration outcome must pass before we mark it "Accepted" / "Implemented"?
For query-performance decisions: a separately authorized representative actual plan, plus correctness and access evidence. ANALYZE executes the statement; estimated plans cannot establish timings.
For migration decisions: lock duration measurements from a staging dry-run.
For platform choice: cost / latency benchmarks at expected workload.
]

---

