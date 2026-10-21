# 10 Dependency vulnerabilities across ecosystems

> **Read-only method.** Security Review uses Read, Grep, Glob and Skill only. Commands below are inert reference for a separately authorized caller with the required tools. Do not execute, save files, install, browse, read credentials, contact providers, or alter Git from this role. Return findings in chat. Use the local [review contract](../references/review-contract.md) for scope, data and output restrictions.


Loads [../references/cross-cutting/dependency-triage.md](../references/cross-cutting/dependency-triage.md), [../references/cross-cutting/tool-commands.md](../references/cross-cutting/tool-commands.md), and the "Dependency audit" section of each ecosystem reference in scope.

## Steps

1. **List the lockfiles** in scope (from `detect.json.details.*.manifests` and a `--files` search for lockfile names). Note every deployable package with no lockfile; that is both a cap and, for deployable services, a `low` supply-chain finding.
2. **Evaluate approved supplied osv-scanner evidence first** (multi-ecosystem coverage): `osv-scanner scan -r --format json "$COPY/<path>" > "$RAW/osv-<slug>.json"`, one run per stack path or one recursive run at the root filtered later. Exit code 1 means vulnerabilities were found [primary reference](https://google.github.io/osv-scanner/usage/).
   - Verify actual CLI evaluation defaults. Disable project evaluation/call analysis unless separately authorized; Go module loading and Rust compilation are not plain lockfile reads. Mere tool availability does not authorize them.
   - Without authorized network: use only already available reviewed offline data, otherwise use manual supplied evidence and record its date/limits. Do not auto-download a database. Maven transitive resolution may be unavailable offline [primary reference](https://google.github.io/osv-scanner/supported-languages-and-lockfiles/).
3. **Fill evidence gaps only with separately authorized existing tools** for anything osv-scanner cannot read (see the coverage map in dependency-triage.md section 1): `npm audit`, `pip-audit`, `govulncheck`, `cargo audit`, `bundle-audit`, `composer audit`, `dotnet package list --vulnerable`. Use the exact commands in tool-commands.md; `govulncheck` and `dotnet package list` load or evaluate project code, so run them only when separate owner execution authorization is present (tool-commands.md rule 2) [primary reference](https://github.com/pypa/pip-audit) [primary reference](https://github.com/rustsec/rustsec/tree/main/cargo-audit).
4. **Triage every advisory** with dependency-triage.md section 2: scope, production or dev, reachability, fix version, grouping, severity mapping, and no invented ids.
5. **Reachability is the noise filter.** Go: trust govulncheck's called or not called. Others: search for the vulnerable function or feature named in the advisory; read the call site. Unknown reachability caps the finding at `medium` with `possible` [primary reference](https://pkg.go.dev/golang.org/x/vuln/cmd/govulncheck).
6. **Supply-chain hygiene** checks from dependency-triage.md section 4, including suspicious or non-existent package names (see guide 13) [primary reference](https://www.usenix.org/conference/usenixsecurity25/presentation/spracklen).
7. **Write findings**: one per package and fixed version, all advisory ids in `refs`, the tool output line in `evidence` (cite the raw file), and the upgrade command or manifest edit in `remediation`.
8. **Record measures**: `dep_vulns_total` (all advisories after scoping), `dep_vulns_reachable` (production and reachable or unknown), `dep_lockfiles_missing`, with tool versions as `source`. Record every ecosystem that no tool could audit in `coverage.caps`.

## Done when

Every lockfile in scope was scanned by at least one tool or has a cap, every advisory was triaged, and the measures and caps are written.

## Sources

[primary reference](https://google.github.io/osv-scanner/usage/), [primary reference](https://google.github.io/osv-scanner/supported-languages-and-lockfiles/), [primary reference](https://docs.npmjs.com/cli/commands/npm-audit), [primary reference](https://github.com/pypa/pip-audit), [primary reference](https://pkg.go.dev/golang.org/x/vuln/cmd/govulncheck), [primary reference](https://github.com/rustsec/rustsec/tree/main/cargo-audit), [primary reference](https://github.com/rubysec/bundler-audit), [primary reference](https://getcomposer.org/doc/03-cli.md#audit), [primary reference](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-package-list), [primary reference](https://www.usenix.org/conference/usenixsecurity25/presentation/spracklen)
