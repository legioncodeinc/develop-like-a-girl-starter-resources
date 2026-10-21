# React Security guide map

This is the React-specific method inside [Security Review](../SKILL.md). Start with [the playbook](playbook.md). It does not create a second public skill, claim another reviewer ran or grant execution tools.

- [00. Scope and version detection](guides/00-scoping-and-version-detection.md): actual candidate/path/renderer/router/lockfile map and limits.
- [01. XSS and SSR injection](guides/01-xss-and-injection-sinks.md): all eleven RX and three RS source/sanitizer/sink confirmation/code-pair checks.
- [02. Conditional RSC and Server Functions](guides/02-rsc-and-server-functions.md): all ten RC controls for an actually present surface, not a Starter default.
- [03. Secrets and data](guides/03-secrets-and-data-exposure.md): all nine SD client exposure/request-state/storage/log checks.
- [04. Auth, routing and client trust](guides/04-auth-routing-client-trust.md): all six AR server-backed authority/redirect/message/CSRF/token checks.
- [05. Findings, metrics and notes](guides/05-writing-findings.md): evidence, confidence, counts, caps, duplicate roots and owner handoff.
- [06. Supply chain and generated-code patterns](guides/06-supply-chain-and-ai-patterns.md): all SC checks, ten AI mechanisms and version-behavior qualifications.

[The reference index](references/REFERENCE.md) links the full check catalog, search patterns, advisory snapshot and helper interfaces. [Primary references](references/official-sources.md) support version/API qualification. All local procedures and fixture resources are included; no old repository or fetch archive is needed.

The two Python helpers parse scoped source/lockfiles and emit candidates; the test runner exercises all packaged synthetic fixtures using task-created temporary copies. No helper executes application fixture code, installs a package, calls a registry/provider or proves the source examples secure. The read-only Specialist does not run them. A separately authorized execution caller may use an existing Python runtime and fresh caller-owned output paths outside the inspected repository. The scanner refuses environment-file contents, fully redacts sensitive candidate excerpts and never follows symlink targets. These protections still require scope/ownership and sanitized output review.
