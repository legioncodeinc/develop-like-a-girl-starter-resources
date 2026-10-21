# Backend security resources

Start with [the backend procedure](playbook.md). All catalogs, code pairs and contracts are local. The role returns a read-only review in chat; optional helpers belong to a separately authorized caller.

- [Scope and evidence contract](references/review-contract.md), [scope procedure](guides/00-scoping-and-ecosystem-detection.md), [manifest classification](references/cross-cutting/manifest-to-stack.md).
- [Workers and backend routes](guides/01-node-server.md), [17 checks and source/sink tables](references/ecosystems/node-server.md), [selected-stack pairs](references/workers-boundaries.md).
- [Secret patterns/history triage](references/cross-cutting/secrets-patterns.md), [dependency reachability](references/cross-cutting/dependency-triage.md), [static-analysis triage](references/cross-cutting/static-analysis-rulesets.md).
- [CI, containers and IaC](references/cross-cutting/ci-cd-infra.md), [14 generated-code patterns](references/cross-cutting/ai-failure-patterns.md).
- [Full finding/metric fields and severity tables](references/cross-cutting/contract-output-rules.md), [report procedure](guides/14-writing-findings.md), [optional helper use](references/cross-cutting/tool-commands.md).
- Conditional existing-language catalogs and their procedures are linked individually in the [playbook](playbook.md).

The helper tests create temporary synthetic files. They test parsing, privacy, redaction, bounds and output refusal only. They do not execute a supplied application or establish current advisory, deployed infrastructure or provider behavior.
