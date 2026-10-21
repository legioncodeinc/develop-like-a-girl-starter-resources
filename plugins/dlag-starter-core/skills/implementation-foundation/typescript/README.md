# TypeScript Foundation

This private implementation resource covers React/Vite application types, React Router framework SSR boundaries, Workers runtime distinctions, Supabase data contracts, bounded async work, testing and artifact evidence. The implementation role retains its local read/write scope. Optional scripts are for a separately authorized capable caller.

## Reading map

| Need | Local resource |
|---|---|
| First review, severity and authority | [Context](guides/00-context-and-review.md) |
| Runtime classification and compiler | [Modules](guides/01-modules-and-compiler.md) |
| Unknown inputs, validated DTOs, safe errors | [Boundaries](guides/02-boundaries-and-dtos.md) |
| Loader/action and request isolation | [Requests](guides/03-request-lifecycle.md) |
| Generated database types and schema review | [Data](guides/04-data-access-and-schema.md) |
| Batch, concurrency, retry and cancellation | [Async](guides/05-async-and-retries.md) |
| Meaningful fixtures and test evidence | [Tests](guides/06-testing-and-fixtures.md) |
| Build entry, version and delivered bytes | [Artifact proof](guides/07-build-and-artifact-proof.md) |
| Existing manager, lint and required checks | [Gates](guides/08-tooling-decisions-and-gates.md) |
| Optional capability and helper input rules | [Helper boundaries](guides/09-optional-capabilities-and-cli.md) |
| Common failures | [Review table](guides/10-failure-review.md) |
| Worked request, batched read, fixture, migration, entry and concurrency cases | [Examples](examples/README.md) |
| Compiler/schema fragments and review worksheets | [Templates](templates/README.md) |
| Six heuristic helpers and limits | [Scripts](scripts/README.md) |
| Current sources and conditional tool decisions | [References](references/tooling-tradeoffs.md) |

The examples implement their stated small contract. They do not supply an authentication adapter, a database schema, a deployment configuration, a new job service, or provider approval. Copying a type contract cannot establish any of those behaviors. Report exact remaining prerequisites before adapting a recipe into application code.
