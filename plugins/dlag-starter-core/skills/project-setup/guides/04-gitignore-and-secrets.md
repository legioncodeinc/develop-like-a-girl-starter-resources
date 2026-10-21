# 04. .gitignore and secrets

> Starter boundary: this is detailed proposal/reference material. Use Read/Grep/Glob/Skill and Write/Edit only for expressly requested Markdown project documents. Do not run commands, copy configuration, install hooks/dependencies, change settings, contact GitHub, commit or publish. Commands and templates below are unexecuted examples requiring actual installed versions, authorized caller tools and a separate task. Source research is a dated snapshot; account eligibility and product defaults are not verified here.

The two-layer defense against committed secrets: `.gitignore` at the file level, GitHub push protection at the platform level. This skill can only ship the first layer as a file; the second is a human decision documented here and in the verification pass.

## `.gitignore`

`templates/repository/.gitignore` is built from GitHub's own `Node.gitignore` template plus the TypeScript-specific additions the wider ecosystem layers on top: `*.tsbuildinfo` (machine-specific incremental-build cache) and compiled output directories (`dist/`, `build/`, `out/`), which are fully reproducible from source and should never be committed. It also covers coverage output, editor/IDE cruft, OS cruft (`.DS_Store`, `Thumbs.db`), and the approved Starter framework artifacts: React Router type generation, Vite caches and Workers local state. Foreign framework-specific ignores are not seeded as Starter defaults.

The critical line is:
```text
.env
.env.*
!.env.example
```
This ignores every `.env` variant (`.env.local`, `.env.production.local`, etc.) while explicitly un-ignoring `.env.example`, which is meant to be committed as documentation. Get the order right: the negation (`!`) must come after the broader ignore pattern, or Git never reaches it.

Copying rule: if a `.gitignore` already exists, do not overwrite it (guide `01`'s idempotency rule). Instead, diff the template against the existing file and report which sections are missing (e.g. "existing .gitignore has no `.env.*` exclusion: flagged as a gap") so the user can merge by hand or ask for the missing lines explicitly. Never silently append to an existing file either: that's still an uncommunicated change to something the user already owns.

## `.env.example`

`templates/repository/.env.example` documents every environment variable a project reads with an obviously fake placeholder value (`replace-me`, `https://example.invalid`) rather than a plausible-looking one: a fake value that looks real is more dangerous than one that fails loudly if someone forgets to replace it. Cross-reference this file's keys against the README's Configuration table (guide `03`) so the two never drift.

## Push protection (human decision, not a file)

Push protection blocks a commit containing a detected secret *before* it reaches the repository: the platform-level backstop for the case where `.gitignore` didn't catch something (a secret hardcoded outside an `.env` file, for instance). It has two independent forms:

- **Push protection for users**: on by default, GitHub-account-wide, public repos only. Nothing to configure.
- **Push protection for repositories**: off by default, requires GitHub Secret Protection enabled first, then Push Protection enabled in the same Settings > Advanced Security panel. Needs repo admin, org owner, security manager, or enterprise owner permission.

This skill cannot flip either setting: it has no API access and no admin session. Report it as an explicit action item in the verification pass: "Enable Secret Protection and Push Protection under Settings > Advanced Security (requires admin access)." If the user already has it enabled, the verification pass should note that and move on rather than re-suggesting it.
