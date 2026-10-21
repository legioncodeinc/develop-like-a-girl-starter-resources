# README-Driven Development (RDD)

> Draft/review only: read the supplied README and safe project evidence, then return a draft or findings in chat. Do not write files, run install/quickstart commands, check badges over the network, read credentials, configure CI or publish through this role. Mark unavailable runtime/network proof unexecuted. Project examples and placeholders are illustrative and must be resolved from actual receiving-project evidence before a runnable/current claim.

>
> Note: The primary source for RDD is Tom Preston-Werner's [Readme Driven Development](https://tom.preston-werner.com/2010/08/23/readme-driven-development.html). The technique is a design aid; the draft must still distinguish intended contracts from implemented behavior.

---

## What is RDD?

README-driven development is the practice of writing the README before writing implementation code. The README functions as a design document, an API spec, and a success criterion all in one.

No quantitative onboarding/rewrite benefit is established here. RDD is a design technique: draft the public contract early so its scope, naming, inputs and expected outputs can be reviewed before implementation.

---

## The five RDD principles

### Principle 1, Write the README first

Before implementation, write a clearly labeled Draft design README describing the intended contract. Keep unimplemented examples and expected outputs marked proposed/unexecuted; do not present the design as a working release.

This forces the author to:
- Name the tool clearly
- Articulate the problem it solves in one sentence
- Design the public API (install, usage, options) before it is locked in by implementation decisions
- Identify what is in scope (it exists in the README) vs out of scope (it doesn't)

### Principle 2, Use present tense; no future tense

Inside an explicitly labeled Draft contract, present tense can make the intended interface precise. The surrounding status must still say it is not implemented or verified; current user documentation states actual supported behavior.

If you cannot write it in present tense, you have not decided to build it. RDD makes this explicit rather than letting scope creep hide in vague future-tense aspirations.

### Principle 3, Plan for two review rounds before coding begins

Share the README with one or two stakeholders or teammates before writing any code. The goal is to surface:
- Naming confusion (is the one-liner accurate?)
- Scope questions ("does this do Y or just Z?")
- API design feedback ("I wish the install step didn't require root")

Agree on the needed review rounds and actual availability; no fixed review duration is promised. Discovering a naming confusion after 3 weeks of coding costs significantly more.

### Principle 4, The README is the acceptance criteria

The test suite validates what the README claims. If the README says "install with `npm install foo`", there must be a test that validates that install path works. If the README shows a usage example, there must be a test that validates the output matches.

This creates a self-documenting feedback loop: when tests fail, the README is the first place to check whether the claim is still accurate.

### Principle 5, Update the README before the code

When behavior changes, update the README first, then update the implementation, then update the tests. In that order. This preserves the README as a reviewable design source and prevents the "README says one thing, code does another" desync that is the most common failure mode in documentation.

---

## When to apply RDD

| Situation | Apply RDD? |
|---|---|
| Starting a new library or CLI from scratch | Yes |
| Adding a major new feature to an existing project | Yes (update README first) |
| Internal tool that only you will use | Optional (still useful for future-self documentation) |
| Auditing an existing README | No (RDD is for greenfield; use the checklist in `guides/05-done-checklist.md`) |
| Bug fix or patch | No |

---

## RDD quickstart prompt

When the user says "start a new project" or "write the README first":

1. Ask: "What problem does this solve in one sentence?"
2. Ask: "Who is the user, another developer, an end user, or a teammate?"
3. Ask: "What is the install command?"
4. Ask: "What is the most basic usage example?"
5. Fill `templates/oss-library-readme.md` (or `internal-tool-readme.md`) with the answers.
6. Leave sections that need design decisions as `TODO:` placeholders and call them out explicitly.
7. Tell the user: "Here is the README. Review it before writing any code. The `TODO:` items are design decisions that need answers before implementation begins."

---

*See the local `examples/readme/before-after-oss.md` for a README written in RDD style from a fresh prompt.*
