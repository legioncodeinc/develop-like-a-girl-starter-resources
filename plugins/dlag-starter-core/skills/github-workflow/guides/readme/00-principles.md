# Principles: README as Landing Page

> Draft/review only: read the supplied README and safe project evidence, then return a draft or findings in chat. Do not write files, run install/quickstart commands, check badges over the network, read credentials, configure CI or publish through this role. Mark unavailable runtime/network proof unexecuted. Project examples and placeholders are illustrative and must be resolved from actual receiving-project evidence before a runnable/current claim.


---

## The 30-second visitor window

A visitor lands on your repository. Assume a short first scan; thirty seconds is a design heuristic, not a measured universal deadline. In that window they decide: "Is this worth my time?" If the answer is not immediately yes, they bounce and you never get them back.

This is the foundational constraint that drives every decision in this Playbook:
- Section order (most important content first)
- Length limits (readers skim, not read)
- Badge count (signal, not noise)
- Quickstart placement (hero section, not buried in page 3)

The README is not documentation. Documentation explains how things work. The README converts a skeptical visitor into a motivated user.

---

## The five rules

### Rule 1, Every section earns its place

Before adding any section, ask: "Does this convert a visitor or retain a contributor?" If neither, cut it.

A table of contents with 12 items does not convert visitors. A quickstart block that runs in one copy-paste does.

### Rule 2, The quickstart is the hero section

The single highest-leverage line in any README is the install command. Everything that appears before it is setup. Everything that appears after it is expansion.

The quickstart must be:
- Copy-paste runnable on a fresh machine (no assumed env vars, no assumed local state)
- 5 commands or fewer
- The first thing a reader can act on

See the local `guides/readme/01-structure-checklist.md` for placement.

### Rule 3, Write for your audience register

Two registers. Two READMEs.

**OSS register:** The reader is a skeptical developer evaluating alternatives. They may be comparing other options. Your README competes with its neighbors. Lead with value. Make the install command visible without scrolling.

**Internal register:** The reader is a trusting teammate. They know the problem exists. They need context, not sales. Lead with "what this solves and why it lives here." Tell them who maintains it.

Never mix registers. A README written for both audiences serves neither.

See the local `guides/readme/03-oss-vs-internal.md` for the full split.

### Rule 4, Prose is the last resort

Use headers, code fences, and bulleted lists before writing a paragraph. When a section exceeds 30 lines without a code example, it belongs in a separate docs file.

Effective length: 300-1,500 words.
Extraction threshold: 2,000 words, flag for docs-site extraction route to `Project Notebook or the accepted documentation owner`.

### Rule 5, Status badges are signals, not decorations

A small set of relevant status badges can help readers locate evidence; no count proves maintenance or production quality. 9 badges with four "made with ❤️" signals an unmaintained hobby project trying to look professional.

Approved badge types: CI/CD status, coverage, version, downloads, license. Vanity badges: cut them all.

See the local `guides/readme/02-badges.md`.

---

## When README-driven development applies

If the user is starting a new project with no existing code, apply the RDD lens from `guides/04-rdd.md`. Write the README first. The README becomes the API spec that the implementation validates against.

Key RDD rule: write in present tense as if the product already exists. No "will support", no "coming soon". If you wouldn't write it in the README today, you don't need to build it today.

---

## Handoff triggers

These conditions require escalating outside this Playbook:

| Condition | Action |
|---|---|
| README exceeds 2,000 words | Flag extraction; hand off to `Project Notebook or the accepted documentation owner` |
| User wants a full docs site | Hand off to `Project Notebook or the accepted documentation owner` |
| CI badge pipeline needs setup | Hand off to `the authorized CI implementation owner` |
| TypeScript/Node package publishing flow needs documenting | Hand off to `the authorized implementation owner` |

---

*Cite this file in audit reports as `guides/00-principles.md`. All other guides derive from this foundational constraint.*
