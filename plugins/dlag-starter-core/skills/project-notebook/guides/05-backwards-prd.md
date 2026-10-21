# Guide 05 - Backwards-PRD Generation

> Capability boundary: Read the Project Notebook entrypoint and `../references/library-boundaries.md` first. The procedure describes document semantics. Use available Read/Grep/Glob/Skill and authorized Markdown Write/Edit only; moves, shell commands, provider effects and unavailable services remain proposals.

Covers reverse-engineering existing code into a PRD that documents what was built.

## Trigger phrases

- "backwards-PRD this module"
- "document what was built in phase X"
- "retroactively document this feature"

## When to use

When code exists but no PRD was written for it. The backwards-PRD documents current behaviour, acts as a reference for future work, and fills the gap in the requirements record.

## Output path

Same as a forward PRD:

```
library/requirements/backlog/prd-<###>-<kebab-slug>/
  prd-<###>-<kebab-slug>-index.md
  prd-<###><letter>-<kebab-slug>-<feature>.md  (per sub-feature, if warranted)
  qa/
```

The backwards-PRD is placed in `backlog/` on creation. If the code is fully shipped and verified, propose the whole-folder move to `completed/`; this capability cannot perform it.

## Procedure

1. **Scan the code.** Use Grep/Read to understand what the code does. Cite source files and line numbers.
2. **Assign a number.** Same rule as forward PRDs: list all `prd-*` across all lifecycle states, take max+1.
3. **Write the index.** Use the PRD index structure from `guides/03-feature-prd.md` and add a "Retroactive" note. Mark "Shipped" only when actual release and verification evidence exist; otherwise record observed implementation with unresolved release status.
4. **Document what was built.** Include the actual implementation approach (not a plan). Describe APIs, data models, and key decisions that would be lost otherwise.
5. **Cross-link.** Add links to related knowledge docs, ADRs, and any open issues this surfaced.
6. **Lifecycle move.** If fully shipped, propose the whole-folder move with its actual authorization and tool gap.

## Backwards-PRD header variant

Use the Shipped variant below only after release and required verification are actually established. Otherwise use Draft and record the observed implementation separately.

```markdown
# PRD-<###>: <Module Name> *(Retroactive)*

> **Status:** Shipped
> **Priority:** - *(retroactive - work is done)*
> **Written:** <Month YYYY>
> **Retroactive:** Yes - this PRD was written after implementation.

## What was built

<Description of current behavior and why.>
```
