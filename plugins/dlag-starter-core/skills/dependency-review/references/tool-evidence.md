# Tool evidence and decision limits

Use primary documentation matching the target's observed versions. This pack includes reference links, not a claim that current vendor behavior was fetched or verified during a local review. Record retrieval date and exact passages when a new tool/flag/tier decision depends on them. Do not turn a version in a teaching fixture into a recommendation to upgrade.

| Topic | Primary reference | What must be checked for the actual target |
|---|---|---|
| npm frozen installation | [npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci) | CLI/config/flags, lock mismatch, node_modules replacement, lifecycle/network effects |
| npm advisory/signature query | [npm audit](https://docs.npmjs.com/cli/v11/commands/npm-audit) | Source/time, graph, severity/exit semantics, available signature/attestation flags |
| npm graph inventory | [npm sbom](https://docs.npmjs.com/cli/v11/commands/npm-sbom) | Format/version/scope; project graph is not packed-byte inventory |
| npm publication origin | [npm provenance](https://docs.npmjs.com/generating-provenance-statements) | Supported CI/identity/package conditions, trusted-publishing path, claim limits |
| Renovate configuration | [Renovate options](https://docs.renovatebot.com/configuration-options/) | minimumReleaseAge/timestamps/security exceptions, maintenance, grouping, automerge and schema |
| GitHub dependency updates | [Dependabot options](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference) | Groups, cooldown, ecosystems, security-update and merge behavior |
| Behavioral signals | [Socket documentation](https://docs.socket.dev/) | Actual ecosystem/policy/alerts and limits; no guarantee every attack is caught |
| Optional existing Snyk scan | [Snyk test](https://docs.snyk.io/cli-ide-and-ci-cd-integrations/snyk-cli/commands/test) | Supported flags, tier, exit behavior, unfixable findings and results privacy |
| Artifact cataloging | [Syft](https://github.com/anchore/syft) | Input scheme, supported artifact/metadata, emitted schema and coverage gaps |
| SBOM schemas | [CycloneDX specification](https://cyclonedx.org/specification/overview/), [SPDX](https://spdx.dev/) | Exact receiver-selected schema and existing validator |
| GitHub artifact attestations | [Artifact attestations](https://docs.github.com/en/actions/security-for-github-actions/using-artifact-attestations) | Supported current action, immutable revision, identity/predicate/trust-policy and permissions |
| Consumer verifier | [gh attestation verify](https://cli.github.com/manual/gh_attestation_verify) | Exact artifact, expected repository/workflow and intended SBOM predicate |

Do not inherit unsourced dates, incident timelines, detection times, PR-volume reduction percentages, prices/free-tier promises or universal legal retention rules. General control rationale survives without asserting those claims. An advisory database may lag malicious-package behavior; behavioral analysis also has misses. Delay, identity verification, static checks, graph review and runtime tests each supply bounded evidence.

For Python/Java/Rust/Go artifacts outside this Starter application stack, record the unexamined ecosystem and ask Build Lead for an explicitly scoped owner rather than inventing installed tools. The Node method does not convert a Cargo/Go lock or PyPI attestation into npm evidence.
