# Review request, rendering and platform boundaries

Use these methods for React Router framework SSR on Workers with Supabase Auth/PostgreSQL, Cloudflare secrets and R2. Read-only Security Review returns findings in chat with Read/Grep/Glob/Skill. Helpers and examples do not grant shell, writes, network calls or provider operations. No new agent or external audit workspace is required.

Read in order:

1. [Scope, evidence and dependency conditions](guides/01-scope-and-version-evidence.md).
2. [Identity and authorization checks](references/authorization-checks.md).
3. [Public endpoints and request limits](references/endpoint-checks.md).
4. [Serialization, secrets and caches](references/data-and-cache-checks.md).
5. [Rendering and browser controls](references/rendering-checks.md).
6. [Platform, proxies, uploads and deployment settings](references/platform-checks.md).
7. [Finding, metrics and verification contracts](guides/02-findings-and-coverage.md).
8. [Concrete vulnerable/fixed examples](examples/request-and-response-cases.md) when reviewing a matching code path.

[Detection patterns](references/detection-patterns.md) are candidate locators only. [Pure advisory tools](scripts/advisory_tools.py) preserve reusable parsing mechanisms for an authorized caller; they read strings, make no claims about a repository and do not contact a registry. [Helper contract](references/helper-contract.md) defines their limits.

Every check requires the path from untrusted input through verified identity/authorization to query, mutation and returned data. Follow imports before calling a guard missing. A parent UI redirect, a hidden component, a type annotation, a successful schema parse or an opaque record id cannot substitute for that path. Keep source review, static parser output, test execution and deployed behavior distinct.
