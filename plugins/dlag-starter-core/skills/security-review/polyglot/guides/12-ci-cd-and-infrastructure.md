# 12 CI/CD and infrastructure

> **Read-only method.** Security Review uses Read, Grep, Glob and Skill only. Commands below are inert reference for a separately authorized caller with the required tools. Do not execute, save files, install, browse, read credentials, contact providers, or alter Git from this role. Return findings in chat. Use the local [review contract](../references/review-contract.md) for scope, data and output restrictions.


Loads [../references/cross-cutting/ci-cd-infra.md](../references/cross-cutting/ci-cd-infra.md) and [../references/cross-cutting/tool-commands.md](../references/cross-cutting/tool-commands.md). Run when this review owns the infra files (guide 00 step 7).

## Steps

1. **List the files** from `detect.json.infra`: GitHub workflows, GitLab CI, Dockerfiles, compose files, Terraform folders, Helm charts, Kubernetes-looking manifests, committed env files.
2. **GitHub Actions.**
   1. Run zizmor 1.30.1 offline: `zizmor --offline --format json .github/workflows` (already installed and separately authorized only) [primary reference](https://docs.zizmor.sh/audits/).
   2. Run the `rg` block in ci-cd-infra.md section 1 regardless.
   3. For each workflow, write a one-line summary in notes: triggers, top-level `permissions`, secrets used, jobs that deploy or publish.
   4. Apply checklist GH1 to GH10. The highest-impact shapes are untrusted `${{ github.event.* }}` inside `run:` (script injection) and `pull_request_target` or `workflow_run` with a checkout of the PR head followed by build steps (pwn request) [primary reference](https://docs.github.com/en/actions/reference/security/secure-use) [primary reference](https://securitylab.github.com/resources/github-actions-preventing-pwn-requests/).
   5. For unpinned actions, list each third-party `uses:` not pinned to a reviewed full commit. A dated tag or unfamiliar action alone does not prove compromise; compare actual primary security notices, exact commit integrity and the run window when a capable caller supplies them. Group common pinning hygiene by workflow while preserving any independent advisory facts.
3. **GitLab CI or other CI.** Apply the same classes by reading the file: untrusted variables in scripts, secrets printed, unpinned remote includes and images. Say in notes that no dedicated tool was run.
4. **Dockerfiles.** Run the Dockerfile `rg` block and apply DK1 to DK7. Check `.dockerignore` against what `COPY . .` would bring in, especially `.env` files listed in `detect.json.infra.env_files` [primary reference](https://docs.docker.com/build/building/best-practices/).
5. **Compose.** Apply DC1 to DC3. Inline credentials under `environment:` are the common finding; the fix is top-level `secrets:` mounted at `/run/secrets/<name>` [primary reference](https://docs.docker.com/compose/how-tos/use-secrets/).
6. **Terraform and other IaC.** Evaluate authorized existing-tool `trivy config` evidence with already reviewed checks/version, or approved local Terraform rules, then apply TF1 to TF6 by reading the files [primary reference](https://trivy.dev/latest/docs/scanner/misconfiguration/). Report only what the code states; cloud defaults are a thin spot.
7. **Write findings** per guide 14 with `tags: ["ci", "github-actions"]`, `["docker"]`, `["compose"]`, or `["terraform"]`. Locations point at the workflow or file line.
8. **Record measures**: `ci_workflows`, `ci_unpinned_actions`, `ci_injection_sinks`, `ci_dangerous_triggers`, `docker_root_images`, `iac_public_exposures`.

## Done when

Every workflow has a summary line and a checklist result, every Dockerfile, compose file, and Terraform folder was read, tool runs or caps are recorded, and measures are written.

## Sources

[primary reference](https://docs.github.com/en/actions/reference/security/secure-use), [primary reference](https://securitylab.github.com/resources/github-actions-preventing-pwn-requests/), [primary reference](https://docs.zizmor.sh/audits/), [primary reference](https://github.com/aquasecurity/trivy/security/advisories), [primary reference](https://docs.github.com/en/actions/reference/security/secure-use), [primary reference](https://docs.docker.com/build/building/best-practices/), [primary reference](https://docs.docker.com/compose/how-tos/use-secrets/), [primary reference](https://trivy.dev/latest/docs/scanner/misconfiguration/)
