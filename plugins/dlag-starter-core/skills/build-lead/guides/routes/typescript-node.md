# Route TypeScript and runtime work

Use Implementation Foundation for selected React/Vite, React Router and Workers TypeScript. Read [scope and tools](../scope-and-tools.md) before work. Build Lead returns a review or handoff; an implementation caller needs its own tools and authorization.

## Domain

Qualify the actual TypeScript/module/runtime versions, ESM boundary, strictness, package manager and build/test configuration. Keep schema validation at untrusted boundaries, errors explicit, async ownership bounded and outbound HTTP timeouts/retries justified. Inspect tsconfig module resolution and package exports against the actual target. A generic Node example does not prove a Workers or browser API is available.

## Trigger phrases

- Review TypeScript configuration or a typed boundary.
- Explain an ESM, package-export or build/runtime mismatch.
- Propose focused tests and a typed load/action or API contract.
- Qualify a bundle or duplicate-code failure from actual supplied evidence.

## Do not route when

- React component/state architecture belongs to React Foundation; visual choices belong to Design Foundation.
- Data schema, migrations and indexing belong to Data Foundation; selected provider constraints belong to Supabase Platform.
- Security Review independently audits untrusted inputs, secrets and authorization.
- GitHub Workflow reviews existing CI/release evidence; a new pipeline requires a designated capable caller.
- Deep Lake SQL clients, vector healing, embedding/recall engines, MCP authoring, multi-harness publication and package publishing are not selected implementations. Do not transfer their private architecture, concurrency constants or dependency pins into this project.

## Inputs

Require package/lock files, tsconfig, runtime target/version, current module errors, relevant source, current boundary schema, accepted interface revision, actual tests/build receipts and the approved paths. Unknown versions stay unknown. Preserve existing conventions unless the task authorizes a change.

## Outputs

Return cited findings or a bounded typed change proposal, exact validation rules and affected runtime behavior. Record module/export compatibility, schema parse failures, retry/cancellation limits, tests required and actual executor. Treat an illustrative fixture, typecheck and production runtime as separate proof. Do not publish, install or execute from this router.

## Sequence

Pin data/API ownership before implementation. Coordinate React Foundation, Data Foundation or the selected platform only for their affected boundary. After authorized changes, obtain Security Review, affected fixes/checks, independent Quality Review and the coordinator's final repository-health review.
