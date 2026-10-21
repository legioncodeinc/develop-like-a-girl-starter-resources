# 06. Dependencies and supply-chain trust

> Read-only role: inspect supplied local evidence and return a report in chat. All commands, changes, scans and runtime exercises in this reference are proposals for a separately authorized caller. No dependency, provider, account, setting or credential is operated by this Playbook.

## Lockfile installation is a security boundary

For an npm project with a committed compatible lockfile, CI should use `npm ci` rather than an unconstrained `npm install`. `npm ci` rejects manifest/lock inconsistency and does not update the lockfile. Use the receiving project's actual package manager and frozen-lockfile equivalent; do not replace its approved workflow from a generic example. Record the installed runtime/package-manager versions and the actual install scripts. An install command executes dependency lifecycle code unless its real configuration says otherwise; a scanner's package list is not an execution sandbox.

A dependency review needs the direct manifests, full lockfile and changed resolution/integrity fields. Review the source and trust of every newly introduced package name; a plausible generated name is not registry evidence. Registry lookup is external read work that this Specialist cannot do, so request supplied current authoritative evidence or hand that specific question to an authorized caller. Do not install a package merely to check that it exists. An existing package can be malicious, compromised or abandoned despite having a familiar name.

## The paired-field lockfile attack

An attacker who can alter a transitive dependency's `resolved` URL and its `integrity` hash together can point installation at their own tarball with a matching hash. The installer can accept that hash while installing exactly the attacker's bytes. A package.json-only scanner may never see this transitive resolution change. A version that stays constant while its URL/integrity changes is a review lead, not automatically a vulnerability without context.

Require explicit expected artifact origins and versions. Parse URLs and compare their actual scheme/hostname and authority, not substring inclusion: `registry.npmjs.org.attacker.invalid` is not the npm registry. Git dependencies, local workspace links, private registries and tarball exceptions need an exact approved source/revision and reviewer reason. Reject unapproved insecure protocols or embedded URL credentials. The [example parser](../references/secure-by-default-snippets.md) illustrates hostname checks for a standard public-npm lockfile; adapt accepted exceptions deliberately rather than broadening the allowlist until it passes.

## Registry compromise is a different failure

A correctly pinned lockfile and valid registry signature can still refer to malicious publisher-approved content. Signature/attestation verification can establish a stated origin and detect some tampering; it does not certify benign behavior or prevent every compromised-maintainer release. Inspect changed lifecycle scripts, binaries, network/credential access and unexpected transitive additions, with the actual advisory and publisher evidence. Build caches and privileged CI tokens are separate supply-chain paths: untrusted fork content must not cross into a privileged publish job through an unchecked checkout, downloaded artifact or shared cache. Pin actions and review job token/OIDC scope with GitHub Workflow. Do not claim one package scan proves the workflow safe.

## Review and proposed checks

1. Inspect the actual frozen install path and matching lockfile. Confirm generated lockfile drift is not silently cached or committed.
2. Review full `resolved`/`integrity` changes, origin allowlist, versions and provenance/attestation evidence. Do not assert a registry check ran if only a proposed command is present.
3. Refer current vulnerability/advisory matching to Dependency Review with exact installed version and reachable use. A supplied `npm audit --audit-level=high` result has its own timestamp, database and dependency-tree scope; a clean result cannot rule out unknown compromise.
4. Where the actual registry/package-manager support it, propose `npm audit signatures` after a separately authorized install and retain complete output. It establishes only the verification that tool actually performs, not a generic trust verdict.
5. Inspect every new `hasInstallScript` entry and its real package source before approving lifecycle execution. A package's published metadata alone does not show all runtime behavior.
6. Review high-value package changes and unexplained lockfile diffs explicitly in the PR. Pin exact reviewed artifact identity where the project requires it and keep a documented update path. Hash pins are not a substitute for origin and behavior review.

## Diff leads requiring investigation

- URL or integrity changed with no package version change.
- New transitive package without an explained parent dependency path.
- A lockfile diff hidden in a UI-only or documentation-only PR.
- New install scripts, native executable downloads, arbitrary postinstall fetches or changed publish credentials.
- A generated package name that has no verified expected publisher/source.
- Cache/artifact or workflow changes allowing untrusted code to access a privileged environment.

Each is a lead: read the surrounding manifest, graph, workflow and actual package evidence before assigning severity. A permitted internal registry change can be legitimate; an unexpected write to a production token can be severe even if there is no CVE.

## Automation limits

Dependency bots have actual repository configuration, grouping/cooldown rules and permissions. Inspect those facts before claiming coverage or a schedule. Do not add a scanner, bot, signing service or new tool from this method. Report absent current registry/advisory, source or CI evidence as a precise gap and preserve unaffected known checks. Sources: [npm, GitHub and OWASP reference index](../references/official-sources.md).
