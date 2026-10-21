# Y-Statement Template

A Y-statement compresses the Nygard four-question framework into a single, grammatically constrained sentence. All five clauses are required.

## Template

```
In the context of <situation>,
facing <concern / challenge>,
we decided <option chosen>,
to achieve <quality / outcome>,
accepting <downside / trade-off>.
```

## Usage

- As the **opening sentence** of a Nygard or MADR "Decision" section (summary before the full record).
- As a **one-line entry** in an ADR log index (`adr-log.md`).
- Do NOT use as the sole format for a consequential decision, Y-statements omit Alternatives Considered.

## Example

```
In the context of private customer files stored in R2 with ownership recorded in Supabase, facing access changes after a browser page opens, we decided to authorize downloads through the Worker, to achieve current owner checks for each request, accepting added Worker traffic and streaming-limit verification.
```

## Anti-pattern (missing "accepting")

```
In the context of the TypeScript monorepo, we decided to ship as an ESM-only npm package, to achieve a modern module layout.
```

The "accepting" clause is missing. This is a marketing pitch, not an engineering record.
