# Pure version and lockfile helper contract

`../scripts/advisory_tools.py` has no CLI filesystem traversal, file writes, imports of audited code, provider calls, registry queries or package installation. A capable authorized caller may import it and pass explicit nonsecret strings. It never loads framework advisory datasets or asserts which packages are installed.

`parse_version`, `compare`, `matches_comparators` preserve prerelease and comparator reasoning. Unknown/malformed ranges return None, not a false pass. A published range is not a full npm semver expression; unsupported shorthand/wildcards/hyphen/caret/tilde must remain unresolved. Inclusive introduced and exclusive fixed bounds can be expressed as comparator pairs. No guessed patch version.

`npm_versions`, `pnpm_versions`, `yarn_versions`, `bun_versions` take explicit strings and a selected package name. npm and pnpm can optionally select a workspace importer; Yarn/Bun return all candidate versions and require caller importer resolution. Binary Bun locks are unsupported. pnpm/Yarn are bounded pattern parsers, not complete YAML parsers. Aliases, unusual quoting/resolution layouts or unknown versions require manual inspection. A parsed version candidate is not an advisory finding or deployed-version proof.

The original runtime-specific automatic inventories and findings are not shipped as React Router scanners. Their flags/APIs/advisory tables cannot establish behavior for this stack. Generic safe-intake requirements are retained in the passive helper and scope method; no original scanner/test execution is claimed.
