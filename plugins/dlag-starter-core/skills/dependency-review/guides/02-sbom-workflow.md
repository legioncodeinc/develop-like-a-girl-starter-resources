# SBOM generation and qualification workflow

An SBOM records identified components and relationships within a stated scope. Starter releases can contain Worker/server bundles and client assets. Identify what actually ships rather than assuming the source tree or npm tarball is the deployed subject. npm publishing applies only when the owner separately publishes a package. See [artifact binding](07-bind-sbom-to-release-artifact.md) for the full reconciliation method.

## Select format and generator

Choose CycloneDX or SPDX with a version the receiving system accepts; record the actual emitted version. No format choice or example establishes legal/procurement compliance. Record the requested coverage policy, generator/version, input bytes and flags. Use existing tools; absent tooling leaves a pending step without installing or fetching executables.

| Artifact/evidence | Possible existing generator | Coverage limit |
|---|---|---|
| Final directory/archive with package metadata | Syft | Metadata discovery may miss bundled/minified or vendored code |
| npm dependency graph | npm sbom or ecosystem CycloneDX tool | Graph evidence does not prove packaged bytes or runtime loading |
| Worker/server and client bundles | Existing build graph plus artifact inventory | Reconcile embedded code, external runtime packages and source maps |
| Native/platform additions | Existing compatible cataloger plus build evidence | One platform build cannot clear unobserved targets |

A source-tree inventory can include development packages that do not ship, while an artifact-only scan can miss dependencies embedded without metadata. Preserve both and reconcile; neither is automatically complete. Avoid universally declaring one generator the widest or best.

## Five-step workflow for an authorized release caller

1. **Build final bytes.** Record source/lock/toolchain/platform and accepted build command. Inspect lifecycle/prepack scripts first. Produce the exact intended release object in a fresh private task-created workspace. For an npm release, `npm pack` can run scripts and is not a read-only inventory command. For a Worker/site, use the actual output manifest and bind each independently distributed artifact.
2. **Generate inventory.** Use the selected existing generator against the recorded final object or explicitly stated graph. Preserve input digest/path, generator/version/flags, output/stdout/stderr/exit and time. Do not relabel graph-only output as a byte scan. Avoid extracting untrusted archives; if extraction is needed, a separately reviewed extractor must refuse traversal, absolute paths, links, device entries, oversized expansion and collisions.
3. **Qualify inventory.** Parse JSON, validate exact schema using existing tooling, inspect component identities/versions/hashes/edges/licenses and reconcile source/lock/build/final inventories. A positive count is only a sanity check. Unknown bundled components and external downloads remain explicit gaps.
4. **Bind and attest.** The final artifact name/digest is the subject; the SBOM is the predicate with its own preserved digest. Select current official attestation tooling and immutable action revision; use least-privilege identity only when the owner authorizes signing/API persistence. A signature does not establish inventory completeness or benign code.
5. **Retain and independently verify.** Preserve artifact, SBOM, statement/bundle, checksums, expected signer policy and verifier output in the approved system. A workflow artifact upload is not necessarily a release asset or proof consumers downloaded the same bytes. Retention is owner-defined, with no implied universal legal period.

The [CI specimen](../templates/github-actions-sbom-workflow.yml) deliberately contains unfilled action/tool/target decisions and a fail-closed qualification gate. It preserves the five-stage shape without installing services or claiming production readiness.

## Consumer verification

A capable authorized caller verifies the exact downloaded artifact and intended predicate, rather than verifying only the SBOM file:

```bash
# Illustrative proposal, never run by the read-only Specialist.
# Set actual artifact, expected repository and emitted SBOM predicate type.
gh attestation verify ./ACTUAL_ARTIFACT --repo EXPECTED_OWNER/EXPECTED_REPO --predicate-type ACTUAL_SBOM_PREDICATE
```

Check supported flags/version first and record output. Default build-provenance verification and explicit SBOM verification are different checks. A matching digest without trusted signature/identity policy is a byte association only.

## Trigger and acceptance

One qualified inventory per final release artifact. A tag or published-release trigger can support a separately authorized existing flow; choose one event to avoid duplicate work. PR inventories can help review but do not substitute for final artifact binding. Repacking/signing/changing bytes invalidates the subject digest and affected evidence.

Report parsed, schema-valid, coverage-reviewed, digest-matched, signature-valid, identity-policy-satisfied and downloaded/uploaded-byte-matched independently as proved/failed/pending. Use the [release worksheet](../templates/release-artifact-evidence.md). Inventory does not clear advisory exposure, runtime safety, legal acceptance or the ordered Security/Quality gates.
