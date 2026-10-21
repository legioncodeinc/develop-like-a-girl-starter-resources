# Security Review resource map

Use the complete procedures for the supplied question. This method reviews local evidence and returns a report in chat; it neither executes the examples nor grants remediation, provider, configuration or scanner permissions.

| Need | Full procedure | Supporting resources |
| --- | --- | --- |
| Run the first security gate | [01. Audit procedure](guides/01-audit-procedure.md) | [Checklist](references/audit-checklist.md), [search patterns](references/grep-patterns.md) |
| Review SSR/request/browser paths | [02. React Router attack surface](guides/02-react-router-attack-surface.md) | [Code contracts](references/secure-by-default-snippets.md) |
| Review owner/tenant/data/file permission | [03. Authorization and tenancy](guides/03-authorization-and-tenancy.md) | [Response boundary worksheet](templates/security-design/response-boundaries.md) |
| Inspect SQL and secret exposure | [04. Secrets and environment](guides/04-secrets-and-env.md) | [Exposure worksheet](templates/security-design/exposure-scope.md) |
| Inspect hosted Stripe and selected intake | [05. Intake and effects](guides/05-webhooks-and-third-party-intake.md) | [Webhook worksheet](templates/security-design/webhook-trust.md) |
| Review dependencies and CI trust | [06. Supply chain](guides/06-dependencies-and-supply-chain.md) | [Parsed origin contract](references/secure-by-default-snippets.md) |
| Review headers, caches and abuse | [07. Headers and transport](guides/07-headers-and-transport.md) | Actual supplied response/config evidence |
| Challenge generated-code assumptions | [08. Generated-code patterns](guides/08-ai-generated-code-patterns.md) | [Severity rubric](references/severity-rubric.md) |
| Propose a minimal correction | [09. Remediation playbooks](guides/09-remediation-playbooks.md) | [Code contracts](references/secure-by-default-snippets.md) |
| Return/place the complete report | [10. Report format](guides/10-report-format.md) | [Report skeleton](references/audit-output-format.md) |
| Model threats before features | [11. Threat model](guides/11-threat-model-before-features.md) | [Threat worksheet](templates/security-design/threat-model.md) |
| Trace serialized and derived data | [12. Response boundaries](guides/12-response-and-tenant-boundaries.md) | [Boundary worksheet](templates/security-design/response-boundaries.md) |
| Qualify durable delivery/recovery | [13. Forgery, replay and recovery](guides/13-webhook-forgery-replay-and-recovery.md) | [Trust worksheet](templates/security-design/webhook-trust.md) |
| Bound built/log/context exposure | [14. Exposure scope](guides/14-browser-log-and-context-secrets.md) | [Exposure worksheet](templates/security-design/exposure-scope.md) |
| Select proof from actual risk | [15. Risk verification](guides/15-verify-actual-risk.md) | [Risk worksheet](templates/security-design/risk-verification.md) |

The [security reference](references/research/distilled-security.md) explains the control catalog and evidence limits. The [official source index](references/official-sources.md) supplies primary documentation references; inspect installed versions and actual target configuration before asserting a default/API or current advisory. All procedures, templates and examples needed to use this method are packaged locally.

[Worked security-design cases](examples/security-design/source-cases.md) cover an exported invoice after revocation, a leaking serializer despite a scoped query, lost work after a valid signature, build/log/context exposure and green unit tests that leave actual tenant/payment risk untested. They are synthetic reasoning cases, not application or model-runtime proof.

## Available neighboring methods

Use Core `data-foundation` and `identity` for the actual selected schema/auth design, `r2-storage` for storage implementation, `dependency-review` for exact supplied dependency/advisory evidence and `project-notebook` for accepted requirements and contract context. Consult `dlag-starter-app-builder:stripe-payments` only when the App Builder plugin is installed and optional hosted payments are selected. A failed namespaced Skill call is an unavailable prerequisite, not dispatch evidence. No sibling plugin cache path is assumed. Quality Review follows Security Review; the orchestrator owns the final repository-health review.

## React-specific depth

The complete [React security method](react/playbook.md) and [guide map](react/README.md) retain detailed XSS/SSR, client trust, data exposure, conditional Server Function boundaries, per-check code pairs, lockfile parsing and bounded candidate scanning. Advisory data is an offline snapshot and helpers do not run from this read-only role.

## Additional complete review methods

- [Backend, dependencies, source secrets and delivery controls](polyglot/playbook.md), including concrete Workers boundaries and conditional ecosystem check/code references. The source-only helpers do not run from this role.
- [Passive supplied-response review](passive/playbook.md): headers, cookies, coarse transport observations, exposure and payment-path observations. Optional public collection is an explicitly authorized caller operation, not an audit result or a default network action.
- [Request and rendering boundary catalogs](framework-boundaries/playbook.md): verified actor/owner, independent endpoints, serialization/validation echoes, caches, streams, uploads and exception boundaries, with twelve concrete vulnerable/fixed cases. Other framework-specific APIs, configuration and advisory datasets are not Starter defaults.

Each method returns actual scope, evidence and missing proof. A parameterized parser or manual checklist does not establish framework discovery, a current advisory verdict, a running target, effective policies, or native/model behavior.
