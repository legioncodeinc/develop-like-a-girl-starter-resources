# Hooks Collection Template

> Read-only proposal boundary: use supplied local evidence with Read/Grep/Glob/Skill. Every command below is illustrative for a separately authorized caller with the actual tools and exact repository/path/ref scope. This Specialist does not run Git, write files, stage, commit, switch, reset, rewrite, create/remove worktrees, install/configure hooks, access remotes or publish. Before any destructive/history action preserve approved byte/history backups, current full SHAs and rollback steps, confirm active ownership and obtain existing-or-new task-specific authorization. External effects, shared refs, settings, installs and another worker's files have their own explicit scope gates. Never treat the examples as a copy-and-run script.

Illustrative Git hook scripts requiring project-specific review and installed tools for pre-commit, commit-msg, and pre-push.

---

## How to use

Place in `.githooks/` and configure:
```bash
git config core.hooksPath .githooks
chmod +x .githooks/*
```

Or use with Husky (`.husky/<hook-name>`) or lefthook (`lefthook.yml`).

---

## pre-commit: type-check + duplication + fast tests

Use the receiving project's existing declared scripts and installed hook manager. Typecheck, duplication and test commands below are illustrative; no formatter/linter or hook dependency is installed by this method. Keep full-project TypeScript checking separate from staged-file filtering.

```bash
#!/usr/bin/env bash
set -euo pipefail

# Staged TypeScript files only
STAGED=()
while IFS= read -r -d '' staged_path; do
  if [[ "$staged_path" =~ \.(ts|tsx|mts|cts)$ ]]; then
    STAGED+=("$staged_path")
  fi
done < <(git diff --cached --name-only --diff-filter=ACMR -z)

if [ "${#STAGED[@]}" -gt 0 ]; then
  echo "TypeScript type-check..."
  npm run typecheck   # tsc --noEmit

  echo "Duplication check..."
  npx --no-install jscpd "${STAGED[@]}"
fi

echo "Unit tests..."
npx vitest run --silent
```

---

## commit-msg: enforce conventional commits

```bash
#!/usr/bin/env bash
set -euo pipefail

MSG=$(cat "$1")
PATTERN="^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\(.+\))?(!)?: .{1,100}"

if echo "$MSG" | grep -qE "^(Merge|Revert|fixup!|squash!)"; then
  exit 0  # Allow merge commits, reverts, autosquash markers
fi

if ! echo "$MSG" | grep -qE "$PATTERN"; then
  echo "ERROR: commit message must follow Conventional Commits."
  echo "Pattern: type(scope): description (max 100 chars)"
  echo "Types: feat fix docs style refactor perf test build ci chore revert"
  echo "Example: feat(search): add record filter"
  exit 1
fi
```

---

## pre-push: block force-push to protected branches

```bash
#!/usr/bin/env bash
set -euo pipefail

PROTECTED="main master develop"

while read local_ref local_sha remote_ref remote_sha; do
  BRANCH="${remote_ref##refs/heads/}"

  for PROTECTED_BRANCH in $PROTECTED; do
    if [ "$BRANCH" = "$PROTECTED_BRANCH" ]; then
      # Detect force-push (remote sha is not an ancestor of local sha)
      if [ "$remote_sha" != "0000000000000000000000000000000000000000" ]; then
        if ! git merge-base --is-ancestor "$remote_sha" "$local_sha" 2>/dev/null; then
          echo "ERROR: Force-push to $PROTECTED_BRANCH is blocked."
          echo "Use a feature branch and open a PR."
          exit 1
        fi
      fi
    fi
  done
done

exit 0
```

---

## lefthook.yml configuration

```yaml
pre-commit:
  parallel: true
  commands:
    typecheck:
      run: npm run typecheck   # tsc --noEmit
    duplication:
      glob: "*.{ts,tsx,mts,cts}"
      run: npx jscpd {staged_files}
    test:
      run: npx vitest run --silent

commit-msg:
  commands:
    conventional:
      run: npx commitlint --edit {1}

pre-push:
  commands:
    tests:
      run: npx vitest run --silent
```

Use existing declared project scripts and already installed tools. A package runner can install missing tools; do not permit that implicitly. Resolve dependency/tool gaps and the exact shell/version before treating any hook as executable. Whole-project TypeScript checking must not be narrowed to individual staged files.
