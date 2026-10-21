# Build origin verification and release-content guards

Build provenance binds an artifact digest to claims about source/build identity. Package signatures and registry integrity records have their own scope. They do not establish that source is trustworthy, all inputs were benign, a workflow was hermetic or the deployed application's authorization is correct. Inspect the actual signed statement, verifier/trust policy and exact bytes.

## Published npm packages, when actually applicable

Starter applications deploy through Workers; npm publication is not a default application release step. When the owner separately publishes an npm package, record repository metadata, CI identity, package visibility, npm version and actual publishing method. Supported CI provenance/trusted-publishing behavior changes over time, so verify the matching official manual before proposing flags or permissions.

An illustrative explicit provenance publishing command is:

```bash
# An authorized publishing caller only; never an audit action.
npm publish --provenance --access public
```

It is not a command to run in this pack. OIDC-backed workflows need their documented identity/permission conditions; trusted publishing can use a different supported path. Do not add tokens, request credentials, enable permissions or publish merely to complete a worksheet.

For supplied consumer verification evidence, record actual command/version, resolved tree, registry, output and failures. Illustrative CLI forms to check against the installed version are:

```bash
npm audit signatures
npm audit signatures --json --include-attestations
```

These queries can use the network and are not executed by the read-only Specialist. Missing support or missing attestations is a precise gap, not automatically proof of tampering. An authentic attestation from a compromised expected repository can still describe malicious content. Do not call provenance a blanket transport/content guarantee.

## Release-content defenses

### 1. Explicit inclusion policy

Read package `files`/ignore rules and actual tarball member inventory for a package release. npm has automatically included files and packing rules; an allowlist alone cannot prove secret absence. For Workers/client artifacts inspect generated deploy manifests, sourcemap policy, assets and included bindings/config references. Broad new inclusions require review. Never put credential values in logs or evidence output.

### 2. Existing package/artifact check

Find the actual implemented content-check script and inspect it before accepting a green script name. It should compare the intended final file set, refuse unexpected/secret/private material and bind output to those bytes. Do not invent a missing `pack-check` helper or claim it exists. If absent, propose a bounded check and leave release readiness pending. The Specialist does not execute package scripts or unpack untrusted artifacts.

### 3. Distribution-specific checks

Preserve actual consumer/plugin/platform checks when the target has them; no obsolete assistant's bundle checker becomes a Starter requirement. For the chosen stack inspect Worker runtime compatibility, client/server secret separation, private R2 access, Supabase auth/ownership enforcement and optional Stripe webhook entitlements through the available implementation/Security owners. A distribution check passing covers only its stated contract and exact artifact.

### 4. Source/static checks

Existing CodeQL or equivalent application SAST complements dependency/advisory review, but it is a distinct evidence category. Inspect supported language/config/paths and exact candidate result. Dependency scanners, source scanning, build/typing, runtime and browser checks do not clear one another.

## Pre-release evidence checklist

| Layer | Evidence required | Pending when absent |
|---|---|---|
| Resolution | Manifest/lock/config identity and authorized frozen-install output | Actual install remains unknown |
| Known advisories | Dated exact-graph scan/triage and expiring exceptions | Current vulnerability status unknown |
| Behavior | Script/origin/native changes reviewed with target evidence | New install behavior unresolved |
| Contents | Final object hash and actual inclusion/secret-check result | File set unqualified |
| Source/runtime | Candidate-specific source and consumer checks | SDK/application/native behavior unproven |
| Inventory binding | Schema/coverage/subject digest and explicit SBOM predicate | SBOM qualification incomplete |
| Identity | Signature, expected repo/workflow and trust policy | Build-origin claim unverified |
| Delivery | Consumer/downloaded bytes match qualified bytes | Upload/deployment match unproved |

Use [artifact qualification](07-bind-sbom-to-release-artifact.md) and the [report](../templates/dependency-triage-report.md). Preserve observed failures exactly, redacting secrets. Changed bytes, dependency graph or workflow invalidate related earlier checks. Independent Security Review then Quality Review apply to implementation; the owner controls external release actions.
