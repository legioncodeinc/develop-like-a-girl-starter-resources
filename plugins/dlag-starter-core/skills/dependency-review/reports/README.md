# Dependency report records

Return the result in chat. A capable authorized caller may save a dated report in the target's approved report location. Do not write into an installed skill's own directory or create a report merely to fill a folder.

Use the [triage report](../templates/dependency-triage-report.md). Preserve:

1. Actual target/revision, manager/runtime declarations and observed versions, manifest/lock/config/artifact identities.
2. All severity counts or unknown values, blocking policy and supplied dated scanner outputs.
3. Per finding direct/transitive paths, affected/patched versions, CVSS context, execution phase/reachability, narrow remediation and exception with owner/issue/expiry.
4. Actual native/optional/script risks, source/ABI behavior, pin alignment and manual review policy.
5. Lock/install, artifact inclusion/secret checks, source checks and provenance/inventory gates as separate results.
6. Unknown ecosystems/platforms and unperformed checks, open decisions, action owners/due dates, independent Security then Quality status.

Do not silently overwrite an old report or relabel previous passing output as a new candidate check. A changed graph/artifact requires affected checks again. Records may contain private project details; preserve approved access and redact secret values. A report filename, JSON parse, fixture pass or signed inventory does not prove completion.
