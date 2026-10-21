# 07 - .gitignore Coverage Audit

> Evidence-only audit: this role uses supplied local files and dated owner-provided settings/API/run exports. It does not execute Git/gh/shell, authenticate, request tokens, contact GitHub, run workflows, inspect credentials, write reports/settings or apply fixes. Commands and API shapes below are proposals for a separate authorized collection owner. Missing evidence is unknown/N/A, never proof of an absent or perfect control. Examples are illustrative, not actual repository findings.


## What to check

1. **Presence:** Does a `.gitignore` exist at the repo root?
2. **Language/framework coverage:** Does it match the detected tech stack?
3. **Secret/credential exposure:** Are common secret files or patterns NOT covered?
4. **Build artifact tracking:** Are build output directories accidentally tracked?
5. **IDE and OS junk:** Are `.DS_Store`, `Thumbs.db`, `.idea/`, `.vscode/` covered (or intentionally left for developer discretion)?

## Language detection (quick heuristic)

```bash
# Detect primary languages
ls package.json pyproject.toml Gemfile go.mod Cargo.toml pom.xml 2>/dev/null
# Or use GitHub linguist via the API:
gh api /repos/{owner}/{repo}/languages
```

## Critical secret patterns (must be in .gitignore)

```gitignore
# Environment files
.env
.env.*
!.env.example
!.env.*.example

# Credentials
*.pem
*.key
credentials.json
serviceAccount*.json

# Secret manager outputs
.aws/credentials
.gcp/
```

## Common build artifact patterns (by stack)

| Stack | Should be ignored |
|---|---|
| Starter React Router/Vite/Workers | `node_modules/`, `dist/`, `build/`, `coverage/`, `*.tsbuildinfo`, `.cache/` |
| Python | `__pycache__/`, `*.pyc`, `.venv/`, `dist/`, `*.egg-info/` |
| Go | vendor/ (optional), binary outputs |
| Java | `target/`, `*.class`, `*.jar` |
| Ruby | `.bundle/`, `vendor/bundle/` |

## Scoring rubric

| Condition | Score |
|---|---|
| All stack patterns covered, secret patterns covered, no build artifacts tracked | 10 |
| Stack and secret patterns covered, minor IDE patterns missing | 8 |
| Main stack covered, some build artifacts missing | 6 |
| Generic .gitignore not matching detected stack | 4 |
| .gitignore present but severely incomplete | 2 |
| No .gitignore | 0 |

## Quick check for accidentally tracked files

```bash
# Files that should be ignored but are tracked
git ls-files | grep -E '(\.env$|node_modules|\.DS_Store|\.idea|dist/|build/|coverage/|\.tsbuildinfo)'
```

## Report section template

```markdown
### .gitignore Coverage (Score: X/10)

**Detected stack:** React Router/Vite/Workers with the actual TypeScript build declaration
**Secret patterns:** ✅ `.env`, `.env.*` covered; `!.env.example` correctly excluded
**Build artifacts:** ✅ `node_modules/`, `dist/` covered; `coverage/` and `*.tsbuildinfo` ⚠️ missing
**Accidentally tracked files:** None found

**Findings:**
- RECOMMEND: Add `coverage/`, `*.tsbuildinfo`, and `.vitest/` to `.gitignore` - the build and Vitest runs emit these locally.
```

## Handoff

Secret-in-history findings go to Security Review with safe paths/revisions and no credential values; account/rotation actions require separate authorization.

For Starter, inspect `.react-router/`, `.wrangler/`, `.dev.vars` variants, Vite/build/test outputs and existing project conventions. Server secrets belong to Cloudflare secrets. Ignore patterns do not remove already tracked files or establish credential rotation; never open secret files to score this dimension.
