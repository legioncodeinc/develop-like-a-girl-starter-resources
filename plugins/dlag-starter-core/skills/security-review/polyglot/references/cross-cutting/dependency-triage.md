# Dependency vulnerability triage

> **Read-only method.** Security Review uses Read, Grep, Glob and Skill only. Commands below are inert reference for a separately authorized caller with the required tools. Do not execute, save files, install, browse, read credentials, contact providers, or alter Git from this role. Return findings in chat. Use the local [review contract](../review-contract.md) for scope, data and output restrictions.


Loaded by [guides/10-dependency-vulnerabilities.md](../../guides/10-dependency-vulnerabilities.md). The goal is a short list a founder can act on, not a dump of every advisory.

## 1. Coverage map: what each tool can see

| Ecosystem | osv-scanner reads | Fallback | Blind spot to record as a cap |
| --- | --- | --- | --- |
| node-server | package-lock.json, pnpm-lock.yaml, yarn.lock, bun.lock | `npm audit --omit=dev --json` | no lockfile at all |
| python | uv.lock, poetry.lock, pdm.lock, Pipfile.lock, pylock.toml, requirements.txt (best effort) | `pip-audit --no-deps -r ...` or `--locked .` | unpinned requirements lines have no version |
| go | go.mod (with call analysis) | `govulncheck ./...` | none when go is installed |
| rust | Cargo.lock | `cargo audit --file Cargo.lock` | library crates without a committed Cargo.lock |
| ruby | Gemfile.lock, gems.locked | `bundle-audit check --update` | none with a lockfile |
| php | composer.lock | `composer audit --locked` | plain PHP without composer |
| java-kotlin | pom.xml (transitive through deps.dev, off offline), gradle.lockfile, verification-metadata.xml | none without running the build | Gradle without dependency locking; offline Maven transitive deps |
| dotnet | packages.lock.json, packages.config, deps.json | `dotnet package list --vulnerable --include-transitive` | PackageReference-only projects when the SDK is absent |

[primary reference](https://google.github.io/osv-scanner/supported-languages-and-lockfiles/) [primary reference](https://docs.npmjs.com/cli/commands/npm-audit) [primary reference](https://github.com/pypa/pip-audit) [primary reference](https://pkg.go.dev/golang.org/x/vuln/cmd/govulncheck) [primary reference](https://github.com/rustsec/rustsec/tree/main/cargo-audit) [primary reference](https://github.com/rubysec/bundler-audit) [primary reference](https://getcomposer.org/doc/03-cli.md#audit) [primary reference](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-package-list)

## 2. Triage steps (apply to every advisory)

1. **Scope.** Drop advisories in packages that live only under paths outside this review's stack paths (another reviewer owns them) and say so in notes.
2. **Production or dev.** Mark dev-only (`devDependencies`, `require-dev`, `[dev-dependencies]`, test scopes). Do not automatically cap dev-only advisories: build tools, development servers, previews and CI can be reachable or hold privileged credentials. Set severity from actual execution/exposure; a truly unreachable package can be low with an evidenced reason.
3. **Reachability.**
   - Go: osv-scanner and govulncheck mark called vs not called. Called: keep severity, `confidence: confirmed` for reachability. Not called: `low`, note it [primary reference](https://pkg.go.dev/golang.org/x/vuln/cmd/govulncheck).
   - Rust: experimental call analysis only when cargo ran it.
   - Others: search the code for the vulnerable function or feature named in the advisory (`$RG` for the import and the function). Found and fed by request data: keep severity, `likely`. Imported but the vulnerable function is not used: drop to `low`, `likely`. Could not tell: keep the advisory severity but cap at `medium` with `possible`.
4. **Fix available.** Record the first fixed version from the tool output. No fix: say so and suggest the mitigation the advisory gives, or replacing the package.
5. **Group.** One proposed correction can group a package upgrade only when every advisory identity, affected range, reachable feature and evidence remains explicit. Different advisories must not disappear under a shared generic CWE or a single fixed-version label.
6. **Map severity.** Start from the advisory's own severity (CVSS or GHSA level), then apply steps 2 and 3. Never raise above the advisory unless you confirmed exploitation in this code.
7. **Never invent ids.** Every CVE, GHSA, RUSTSEC, PYSEC, or GO id in `refs` must appear in the tool output file you cite in `evidence`.

## 3. Noise controls

- Group duplicates across lockfiles of one monorepo into one finding with several `locations`.
- Ignore advisories already suppressed in a committed ignore file only after reading the reason (`.osv-scanner.toml`, `audit.toml`, `.bundler-audit.yml`); an unexplained suppression is itself an `info` or `low` note.
- Outdated but not vulnerable is not a security finding (bloat or quality may care).
- Confirmed malicious packages in an actual deployed production path can be Critical; establish installation/deployment and impact rather than treating a name or manifest entry as proof. Tool malware identifiers remain leads until validated [primary reference](https://getcomposer.org/doc/03-cli.md#audit).

## 4. Supply-chain hygiene checks (no tool needed)

| Check | Severity when failing |
| --- | --- |
| Lockfile committed for every deployable package | `low` (`medium` if CI installs without a lock) |
| CI and Dockerfiles use `npm ci` / `pnpm install --frozen-lockfile` / `pip install --require-hashes` / `bundle install --frozen` style installs | `low` |
| Unknown or very new packages that the code imports but no one seems to use elsewhere (possible hallucinated or slopsquatted name): check registry existence, publish date, publisher | `high` if the package exists and is not the intended project, `medium` if unverified [primary reference](https://www.usenix.org/conference/usenixsecurity25/presentation/spracklen) |
| Gem sources over `http://` or `git://` | `medium` [primary reference](https://github.com/rubysec/bundler-audit) |
| `npm config` or `.npmrc` disabling `ignore-scripts` is not a finding; enabling install scripts is the default. Recommend `--ignore-scripts` only as hardening (`low`) [primary reference](https://nodejs.org/en/learn/getting-started/security-best-practices) |

## 5. Finding text example

```json
{"id": "SEC-POLY-014", "dimension": "security", "source": "backend-security",
 "title": "The API server uses a version of a web library with a known flaw that lets attackers crash it",
 "severity": "high", "confidence": "likely",
 "locations": [{"path": "services/api/package-lock.json", "line_start": 1, "line_end": 1}],
 "evidence": "osv-scanner 2.6.0 (raw/backend/osv.json): <package>@<version> <advisory id> severity HIGH, fixed in <version>. rg shows services/api/src/server.js:14 imports it and calls the affected parser on req.body.",
 "why_it_matters": "Anyone on the internet can send one request that stops the API, taking the product offline.",
 "remediation": "Recommend an owner-authorized upgrade to <fixed version> in services/api/package.json, reviewed lockfile regeneration and appropriate tests/release; do not perform the operation from this role.",
 "effort": "S", "refs": ["CWE-1395", "<advisory id from osv.json>", "OWASP A03:2025", "security-review/polyglot/guides/10-dependency-vulnerabilities.md"],
 "verified_by": "Matched the advisory's affected function to the call site in server.js and confirmed request data reaches it."}
```

Angle-bracket placeholders above are for illustration only; a real finding uses the exact package, version, and id from the tool output.

Sources: listed inline.
