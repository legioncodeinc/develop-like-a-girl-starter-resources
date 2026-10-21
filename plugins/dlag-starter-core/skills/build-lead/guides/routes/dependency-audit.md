# Dependency Audit routing

Use **Dependency Review** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain
Dependency Review inspects the open-source supply-chain surface and prepares recommendations for scanner selection/configuration (Dependabot, Renovate, Snyk, socket.dev, OWASP Dependency-Check), vulnerability triage with CVSS scoring and exploitability context, supplied or proposed SBOM generation (Syft, CycloneDX, SPDX plus Sigstore attestation), lockfile discipline (`npm ci` enforcement, `minimumReleaseAge`, `lockFileMaintenance`), and provenance verification (npm `--provenance`, PyPI PEP 740). It treats `npm audit` as a CVE compliance tool, not a supply-chain security tool, and pushes teams toward behavioral scanning for the account-hijack class of attack.


## Trigger phrases
- "audit our dependencies"
- "set up Renovate"
- "Renovate vs Dependabot"
- "generate an SBOM"
- "npm audit is noisy"
- "lockfile hygiene"
- "npm provenance"
- "Snyk CI gate"
- "Explain package.json and lockfiles to me"
- "Which dependencies are direct or indirect?"

## Do NOT route when
- The CVE requires application-code changes: Security Review analyzes risk, while an authorized implementation owner supplies fixes.
- The task is Docker image scanning pipeline architecture: that's GitHub Workflow for review of existing CI evidence; broader CI implementation needs a designated capable caller.
- The task is license compatibility legal advice: route to legal counsel, outside Specialist scope entirely.
- The task is application-code vulnerability remediation more broadly: Security Review reports those vulnerabilities; a qualified implementer owns fixes. This review focuses on the supply chain.

## Inputs the Specialist needs
- The project's language/package manager (npm, pnpm, pip, uv, poetry, cargo)
- The CI platform (GitHub Actions, GitLab, other)
- Existing scanner configs (`.snyk`, `renovate.json`, `.github/dependabot.yml`)
- Whether the scenario is new setup, existing-scanner audit, CVE triage, SBOM build, or provenance check

For a beginner reading, use the current owner's local Playbook. Identify the actual ecosystem first. Preserve declared versus recorded versus observed evidence; do not install or change dependencies as an explanation step.

## Outputs
- A proposed scanner/CI configuration with rationale; no settings write or installation
- A CVE triage table with CVSS context, exploitability, and recommended resolution
- An SBOM generation proposal or a report bound to actual supplied artifact hashes; generation remains unrun without receipts

## Commonly sequenced with
- Security Review: takes over once a CVE needs an application-code fix rather than a dependency bump
- GitHub Workflow for review of existing CI evidence; broader CI implementation needs a designated capable caller: owns the Docker scanning pipeline and broader CI/CD architecture this Specialist's scanning step slots into
- GitHub Workflow: overlaps on repo hygiene checks but this Specialist owns the dependency-specific depth

For the requested outcome, use the current owner's local Playbook and preserve manifest/lock/install/final-artifact scope, exact hashes, schema/coverage checks and expected attestation identity separately. For the requested outcome, use the current owner's local Playbook: exact old/new versions, consumed API/vendor contracts, bounded canary and data-compatible rollback. No scanner installation, publish or real upgrade is implicit in preparation.
