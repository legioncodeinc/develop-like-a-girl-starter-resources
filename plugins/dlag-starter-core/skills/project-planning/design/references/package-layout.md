# UX package layout and file contract

The proposed UX artifact tree is below. Honor accepted project homes. Project Planning may create only requested Markdown in it; prototype HTML, import bytes, inventory JSON and token JSON require an authorized implementation/execution caller. Optional external-tool directories are needed only if that route is requested.

```
library/knowledge/private/product/
  product-strategy.md                 INPUT (owned by the local strategy method; read only)
  design/
    README.md                         package index, status, approvals log, import review index
    direction.md                      2 or 3 direction options and the approved one (Gate A)
    journeys/
      <actor>-<goal>.md               one actor per file (templates/journey-map.md)
    information-architecture.md       inventory, grouping, vocabulary, screen map in Mermaid (templates/ia-screen-map.md)
    flows/
      <task-id>.md                    one key task per file, Mermaid with accTitle and accDescr (templates/task-flow.md)
    screens/
      <screen-id>.md                  one screen per file, all four states (templates/screen-spec.md)
    content-voice.md                  voice principles, terminology, message patterns (templates/content-voice.md)
    accessibility-baseline.md         WCAG 2.2 AA design-time baseline (templates/accessibility-baseline.md)
    prototypes/
      index.html                      links every prototype screen
      <screen-id>.html                single-file, tokens as CSS variables, light and dark (templates/prototype-starter.html)
    critique/
      <YYYY-MM-DD>-round-<n>.md       scored rubric plus detector result (templates/critique-rubric.md)
    claude-design/
      brief.md                        outbound brief (templates/claude-design-brief.md)
      imports/
        <YYYY-MM-DD>-<slug>/
          raw/                        exactly what the owner exported, unmodified
          inventory.json              file list with sizes and SHA-256 (scripts/check-design-package.py inventory)
          import-review.md               where it came from and what was derived (templates/claude-design-import-checklist.md)
          DESIGN.proposed.md          Stitch-format DESIGN.md proposal (never overwrites the repo DESIGN.md)
          tokens.proposed.tokens.json DTCG 2025.10 proposal
    planning-handoff.md               screens, flows and states as IDs for Project Planning
```

## IDs

| Kind | Pattern | Example |
|---|---|---|
| Journey | `J-<nn>` | `J-01` |
| Task flow | `F-<nn>` | `F-03` |
| Screen | `S-<area>-<nn>` | `S-billing-02` |
| Open question | `Q-<nn>` | `Q-07` |

IDs are stable. A renamed screen keeps its ID. `planning-handoff.md` and every spec cross-reference by ID, so Project Planning can map screens to PRDs without reading prose.

## Status values (README.md table)

`draft` -> `critiqued` -> `owner-approved`. A file reaches `owner-approved` only through a recorded approval in the README approvals log.

## What this package is not

- Not a design system. Tokens in prototypes are prototype tokens. A durable system is bootstrapped by `Design Foundation`.
- Not production code. Prototypes support design decisions. Actual React implementation routes to `dlag-starter-core:design-foundation`, within authorized tools.
- Not a conformance claim. The accessibility baseline is a design-time contract, tested later on the built product.
