# Optional tools, scope and fallback evidence

## 1. Authority and privacy

Security Review uses Read, Grep, Glob and Skill. It reads supplied evidence and returns a report in chat. Commands in this resource are reference for a separately authorized capable caller, never an instruction to execute from the Specialist. No install, network request, source build, dependency resolution, project import, Git operation or provider verification is an automatic fallback.

A caller uses an explicit scoped source-only input or separately prepared copy. Exclude human `library/notes/` and root-level notes, real `.env*`, `.dev.vars*`, credentials, key material, state and symlinks. No home or credential mounts. A minimal environment and a temporary home reduce exposure but do not make host execution a sandbox. Package/tool config can execute project-controlled code. If execution is authorized, record actual isolation, input, commands, network mode and limits. A safe working-tree read does not authorize history collection.

The bundled Python helpers use only standard-library parsing. They require explicit real input roots, reject unsafe paths, skip private and human documents, bound actual reads to at most 2 MB/file, 20 MB total and 2,000 read files, and stop source walks at 20,000 entries and candidate lists at 5,000 per source/patch. Record limits from actual output. They do not run project code, import its config, collect Git history or contact providers. Existing/hardlinked/symlinked output is refused; select a fresh caller-owned path outside every assessed input. No parent creation or cleanup is automatic.

## 2. Search evidence

Use the actual read-only Grep/Glob tools within owner-supplied code/config paths. The `$RG` blocks in the catalogs are search-pattern references. A capable caller can apply them with equivalent scope restrictions and pass sanitized results. Do not run a broad hidden-file search over the whole checkout, home or private material. Never stream raw secret matches to chat or a transcript; use the redacting helper or a sanitized candidate supplied by the owner.

Ripgrep outcomes are distinct: 0 found matches, 1 no matches, 2 an error. A no-files/no-type condition is a coverage gap, not a passing test or an error to ignore. A candidate becomes a finding only after tracing actual input through guards to the sink. If a search engine or PCRE syntax is unavailable, use the available read tools and record exactly which search coverage is missing.

## 3. Optional local helpers

These examples require a capable caller with authorization to run the bundled helper. `<scope>` is an explicitly supplied sanitized source directory. `<output>` is a separately chosen existing directory outside every input. Commands are illustrative; no directories or files are created by loading this playbook.

```text
python3 scripts/detect_ecosystems.py <scope> --compact
python3 scripts/secrets_fallback.py <scope> --json <output>/fresh-candidates.json
python3 scripts/secrets_fallback.py <scope> --history-patch <evidence>/sanitized.patch --no-tree --json <output>/fresh-history-candidates.json
python3 scripts/validate_findings.py <evidence>/findings.jsonl --metrics <evidence>/metrics.json --repo <scope>
```

The detector emits manifest classification, not current advisory or deployment claims. Absolute root paths and arbitrary manifest version/spec/module values do not enter its output. Framework versions are bounded numeric values or unknown. The secret helper preserves provider-shaped rules and optional generic matching; candidates are redacted before output, but absence of hits is not proof of no secrets. Private credential files, lockfiles, binaries, long-line tails and omitted history stay outside its coverage. The validator checks a supplied sanitized report's fields and coarse verdict only; it cannot confirm the actual exploit, truth of evidence or scope fidelity.

History collection remains separate owner/caller work. The optional helper accepts one bounded sanitized `.patch` containing `COMMIT <hex-id>` and standard `+++ b/<relative-path>` / added lines. It rejects escaping/private paths and never invokes Git. Collection completeness, excluded commits, renamed/binary files and omitted credential files must be recorded. The original whole-history subprocess collector is intentionally absent from this runtime helper.

## 4. Existing-tool ladder

Only use tools already present and separately authorized. Verify version, origin, current security advisories and actual CLI help before executing; do not assume a recorded release remains current or uncompromised. When a rung is unavailable, use manual supplied-source review and state NOT RUN. Tools can send metadata, download rules/advisories, evaluate code or expose secrets even when called scanners.

| Job | Existing capable-caller option | Manual fallback and specific cap |
| --- | --- | --- |
| Ecosystem | bundled detector | Manifest map; version/resolution unknown where unavailable |
| Tree secret candidates | approved gitleaks `dir` with redacted output; then trufflehog only with provider verification disabled and an independently redacting output path; then bundled regex helper | Supplied sanitized source read; regex-only, no entropy/provider validity proof |
| History secret candidates | independently authorized sanitized history collection; bundled patch analysis | History NOT RUN or limited to supplied patch, never silently the entire repository history |
| Multi-ecosystem dependency evidence | approved installed osv-scanner with exact lockfile scope, approved/offline advisory database and project evaluation disabled where supported | Lockfile versions plus supplied primary advisory; database age/transitive/reachability limits explicit |
| Node | approved installed npm audit on supplied lockfile, no `audit fix` | Missing lockfile, no current advisory evidence, untested dependency resolution |
| Python (conditional) | installed pip-audit `--no-deps` on fully pinned requirements, or supported lock mode | Unpinned lines unknown; no resolver/install without separate execution/network approval |
| Go (conditional) | installed govulncheck only with separate code-evaluation permission and `GOTOOLCHAIN=local` | Manifest presence is not call reachability; no automatic toolchain download |
| Rust (conditional) | installed cargo audit against a lockfile from outside the project; call analysis separately authorized | No compile/build scripts by default; Rust call analysis unproven |
| Rails/PHP (conditional) | installed bundle-audit/composer audit with resolution/plugins disabled as supported and verified | No package boot/install; registry or database unavailable |
| JVM/.NET (conditional) | supplied locked dependencies; build/restore/evaluation only separately authorized | Gradle unlocks, offline Maven transitives, absent packages lock or SDK = explicit cap |
| SAST | approved local Semgrep named local rules with telemetry disabled; then Opengrep local rules; conditional installed gosec | Rules/runtimes unavailable; catalog search only. No `--config auto`, login or remote rule fetch by default |
| CI | approved local zizmor offline | Full GH1-GH10 manual source read |
| Container/IaC (conditional) | approved local Trivy config with already available reviewed checks, or approved local static rules | Full DK/DC/TF catalogs; no cloud-provider-default assertions |

Historical example version pins from the research were gitleaks 8.30.1, trufflehog 3.97.9, osv-scanner 2.6.0, pip-audit 2.10.1, govulncheck 1.8.0, Semgrep 1.178.0, Opengrep 1.30.0, gosec 2.29.0, zizmor 1.30.1 and Trivy 0.74.0. They are a dated reference, not a current trust allowlist. No tool download or source build is supplied by this ladder. Review actual upstream security notices, integrity and release identity before any separately approved use.

## 5. Recording actual runs

For each supplied caller receipt record exact tool/version, source identity and scope, command, environment/isolation, network/evaluation permission, exit status, duration, sanitized output path and limitations. Distinguish findings exit codes from operational failures using actual version documentation. Never substitute a familiar exit code or historical receipt for the actual run. If nothing ran, measures say NOT RUN. A completed manual source review is distinct from a scanner, native build, test, browser, provider or deployment result.
