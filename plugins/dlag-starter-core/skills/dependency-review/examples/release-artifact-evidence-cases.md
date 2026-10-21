# Rendered artifact-binding cases

These are synthetic local evidence exercises, not generated SBOMs or actual release attestations. Use the [qualification worksheet](../templates/example-qualification.md); every result starts NOT_RUN for this copy.

## Same filename, changed artifact

In the exercise, fixture artifact bytes A would be hashed independently of a JSON inventory. A synthetic unsigned statement names artifact A and its SHA-256. Expected: digest comparison succeeds. Replacing the bytes with B while keeping the filename must cause comparison to fail. Until executed, this is only an expected-result case; execution can prove only that bounded byte comparison. Signature, trusted signer, schema and release upload remain pending.

## SBOM signed as its own subject

A statement whose subject hash equals the inventory file rather than the tarball can match that inventory perfectly while saying nothing about tarball A. Expected decision: reject release binding. Preserve both digests and target paths; never relabel an SBOM-file signature as an artifact-bound attestation.

## Nonzero inventory with missing bundled code

A synthetic manifest declares client-lib and a bundle contains a vendored helper without recoverable metadata. A one-component inventory parses and has a nonzero count. Expected decision: coverage unresolved, helper version/license unknown. Schema validation, malicious-code checks and provenance are separate. A documented exclusion needs policy review, not automatic dismissal.
