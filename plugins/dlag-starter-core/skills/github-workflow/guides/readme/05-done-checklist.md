# Done Checklist: README Validation

> Draft/review only: read the supplied README and safe project evidence, then return a draft or findings in chat. Do not write files, run install/quickstart commands, check badges over the network, read credentials, configure CI or publish through this role. Mark unavailable runtime/network proof unexecuted. Project examples and placeholders are illustrative and must be resolved from actual receiving-project evidence before a runnable/current claim.

Run this checklist at the end of every `GitHub Workflow` session before declaring the README complete. Return pass/warn/N/A with exact gaps; unavailable runtime/network proof remains unexecuted. A draft may be delivered with limits, while a verified/copy-ready claim requires actual relevant checks.

---

## The 12-point checklist

| # | Check | Pass criteria | Fail action |
|---|---|---|---|
| 1 | **Title is present** | `# project-name` is the first line of the file (or after YAML frontmatter) | Add it |
| 2 | **One-liner tagline is present** | One sentence below the title describing the value proposition; no jargon | Write it |
| 3 | **Badges are applicable and supported** | No minimum; include only applicable supported status badges, typically at most 3–5, with no vanity claims | Add/remove badges per `guides/02-badges.md` |
| 4 | **All badges are live** | Each badge URL returns a 200 with current data; branch is pinned | Fix stale badges |
| 5 | **Quickstart exists and is copy-paste runnable** | 5 commands or fewer; no assumed env vars; expected output shown | Rewrite the quickstart |
| 6 | **Install section is complete** | Prerequisites listed; package manager command shown; works on fresh machine | Add missing prerequisites |
| 7 | **At least one usage example with code block** | Fenced code block with language hint; runnable on its own | Add code block |
| 8 | **Section order matches the canonical order** | Follows `guides/01-structure-checklist.md` order (or has a documented reason to deviate) | Reorder sections |
| 9 | **No section exceeds 30 lines without a code example** | Scan every prose section; if it exceeds 30 lines and has no code block, flag for extraction | Extract to linked doc or add code example |
| 10 | **README is under 1,500 words** | Word count check; if 1,500-2,000, warn; if >2,000, flag for `Project Notebook or the accepted documentation owner` handoff | Trim or extract |
| 11 | **Contributing section or link is present** | Inline or link to `CONTRIBUTING.md` | Add it |
| 12 | **License line is present** | "Licensed under the `<LICENSE>` License." (one line; not the full license text) | Add it |

---

## Emitting the checklist

At the end of every session, emit the checklist as a table with Status and Notes columns:

```markdown
| # | Check | Status | Notes |
|---|---|---|---|
| 1 | Title | ✅ pass | |
| 2 | One-liner | ✅ pass | |
| 3 | Badge count | ⚠️ warn | 7 badges; review redundant or unsupported claims |
| 4 | Badges live | ❌ fail | CI badge points to deleted branch |
| 5 | Quickstart | ✅ pass | |
| 6 | Install | ✅ pass | |
| 7 | Usage example | ✅ pass | |
| 8 | Section order | ✅ pass | |
| 9 | No 30-line prose | ⚠️ warn | "Architecture" section is 45 lines |
| 10 | Under 1,500 words | ✅ pass | 1,140 words |
| 11 | Contributing | ✅ pass | |
| 12 | License | ✅ pass | |
```

Resolve supported corrections within scope and report remaining warnings, failures or unavailable evidence explicitly. Do not manufacture passing checks, runtime results or repeated approval questions merely to fill the checklist.

---

## Fast-path for "good enough"

If the user says "it's good enough for now," document the remaining gaps as a `<!-- TODO: -->` comment in the README immediately above the failing section, so the next author knows what to fix:

```markdown
<!-- TODO: GitHub Workflow: badge for CI is pointing to deleted branch; update to main -->
```

This is acceptable for drafts. It is NOT acceptable before a public OSS release.
