# 04 - CODEOWNERS Audit

> Evidence-only audit: this role uses supplied local files and dated owner-provided settings/API/run exports. It does not execute Git/gh/shell, authenticate, request tokens, contact GitHub, run workflows, inspect credentials, write reports/settings or apply fixes. Commands and API shapes below are proposals for a separate authorized collection owner. Missing evidence is unknown/N/A, never proof of an absent or perfect control. Examples are illustrative, not actual repository findings.


## What to check

1. **Presence:** Does `CODEOWNERS` exist at `.github/CODEOWNERS`, root `CODEOWNERS`, or `docs/CODEOWNERS`? GitHub uses the first existing file in that order on the PR base branch.
2. **Syntax validity:** Any malformed patterns or non-existent team/user references?
3. **Coverage:** What percentage of source paths have a matching owner?
4. **Ownership type:** Team ownership (`@org/team`) vs. individual (`@username`) - teams are more resilient.
5. **Security-sensitive path coverage:** `.github/workflows/`, `config/`, `.env.example`, `package.json` - do they have restricted owners?
6. **Monorepo patterns:** Do all sub-packages have explicit owners?

## Data collection

```bash
# Check file locations
ls CODEOWNERS .github/CODEOWNERS docs/CODEOWNERS 2>/dev/null

# List all owners referenced
grep -v '^#' CODEOWNERS | awk '{for (i=2; i<=NF; i++) print $i}' | sort -u

# Check owner validity (requires gh CLI)
# Teams:
gh api /orgs/{org}/teams --jq '.[].slug'
# Individuals: manually verify @username exists on GitHub
```

## Coverage gap detection

Walk the repo directory tree and for each path, find the last matching CODEOWNERS pattern (bottom-wins). Paths with no match are "unowned."

For a monorepo:
```bash
# Quick coverage report script
python3 - <<'EOF'
import subprocess, pathlib, re

codeowners_path = pathlib.Path('.github/CODEOWNERS')
rules = []
for line in codeowners_path.read_text().splitlines():
    line = line.split('#')[0].strip()
    if line:
        parts = line.split()
        rules.append((parts[0], parts[1:]))

# This is an incomplete illustration, not a coverage calculator.
# No companion matcher is supplied. Do not run it or report a coverage percentage from it.
EOF
```

## Scoring rubric

See the supplied dated source evidence for full rubric. Summary:

| Condition | Score |
|---|---|
| Exists, no errors, full coverage, team ownership | 10 |
| Exists, minor gaps, team ownership | 8 |
| Exists, individual ownership only | 6 |
| Exists, errors or > 30% unowned | 4 |
| Not present | 0 |

## Report section template

```markdown
### CODEOWNERS (Score: X/10)

**Location:** `.github/CODEOWNERS`
**Syntax errors:** None / {list errors}
**Coverage:** 85% of source paths have an owner (unowned: `scripts/`, `docs/adr/`)
**Ownership type:** Mixed (team + individual)

**Security-sensitive paths:**
| Path | Owner | Appropriate? |
|---|---|---|
| `.github/workflows/` | @org/release-team | ✅ |
| `config/` | @username | ⚠️ Individual, not team |
| `package.json` | Not covered | ❌ |

**Findings:**
- RECOMMEND: Add `package.json` to CODEOWNERS assigned to @org/platform-team @org/release-team (effort: 5 minutes).
- RECOMMEND: Change `config/` ownership from @username to @org/platform-team (team resilience).
- RECOMMEND: Propose a reviewed catch-all for otherwise unowned paths; keep sensitive-path rules later because last matching pattern wins.

```

## Syntax, owners and enforcement limits

Use the actual GitHub CODEOWNERS syntax, not a generic glob or gitignore parser. Negation, character ranges and escaped leading-comment patterns are unsupported. Multiple owners for a pattern belong on the same line; later matches take precedence. Owner existence, visible team membership/write permission and required-owner review are separate facts needing supplied evidence. A local percentage can be reported only after an actual correct path/rule mapping with a defined source-path denominator; the abbreviated snippet above does not provide one. Never invent coverage from file presence. See [GitHub code-owner documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners).
