# 00 ,  Continuous Discovery Principles

Role boundary: prepare requested local Markdown and analyze supplied evidence. The interview/test/recruiting steps below describe a plan for an authorized operator. They do not authorize contact, recording, incentives, automation, publication, credentials, provider setup, application edits or execution. Actual observed results require supplied source evidence; missing tools or approvals stay unrun.

Core philosophy that governs how the Project Planning discovery method operates. Read this before any domain guide.

**Research source:** Teresa Torres, My 2026 Roadmap (historical January 2026 context), Continuous Discovery Habits Operationalized, GetPerspective (April 2026 secondary synthesis)

---

## The three tenets

1. **Weekly customer touchpoints.** Talk to at least one customer every week, in a structured 20-30 min interview. Not "when you have time." Weekly. The historical secondary synthesis reported fewer than 1 in 5 product trios hit this benchmark in practice; the teams that do make consistently better build decisions. (Source: Continuous Discovery Habits Operationalized, GetPerspective (April 2026 secondary synthesis))

2. **Opportunity Solution Tree as the working map.** All customer insights live in a structured OST anchored to a single desired outcome. The OST is a living document, updated every week after interviews, not a quarterly deliverable.

3. **Small experiments before code.** Every solution idea requires at least one assumption test before engineering starts. The test must have a pre-stated success criterion and must target the highest-risk assumption, not the easiest one to test.

---

## The "build less, learn more" manifesto

The default mode for most teams is: gather some requirements, build a feature, ship it, measure adoption. Continuous discovery inverts this: gather evidence from customers weekly, build the smallest possible experiment to validate the riskiest assumption, then build the feature only when the evidence clears a confidence threshold.

**Why it matters in 2026:** Torres' 2026 AI-assisted OST guidance (via the Vistaly partnership) notes a critical risk ,  AI tools can generate plausible-looking OSTs from market descriptions and competitive analysis alone. Those trees look coherent but are not grounded in actual customer conversations. The "build less, learn more" loop's value is exactly that it forces real interview data into the process before assumptions calcify into requirements. (Source: Teresa Torres/Vistaly, AI-assisted OST synthesis (historical February 2026 context))

---

## Discovery vs delivery

Discovery is the upstream work of figuring out **what** to build and **why**. Delivery is the downstream work of building it well. The two use different rhythms, different artifacts, and different success criteria:

| | Discovery | Delivery |
|---|---|---|
| Question | What should we build? | How do we build it well? |
| Cadence | Weekly interviews, monthly OST snapshots | Sprints, PRs, code reviews |
| Output | Validated opportunity + winning solution | Shipped, tested feature |
| Risk | Building the wrong thing | Building the right thing badly |
| Owner | the Project Planning discovery method | Authorized implementation callers |

A common anti-pattern is treating sprint planning as discovery. Sprint planning is delivery logistics. Discovery is what tells you whether the sprint's items are worth building.

---

## Critical directives (with rationale)

- **Anchor to a desired outcome first.** Without a stated outcome, the OST has no root and every customer problem looks equally important. (Source: Opportunity Solution Tree guide, Qualz (April 2026 secondary synthesis))
- **Keep opportunities and solutions in separate OST layers.** Mixing them is the most common OST failure mode and makes the tree unnavigable within weeks. (Source: Opportunity Solution Tree guide, Qualz (April 2026 secondary synthesis))
- **Never generate an OST from market analysis alone.** AI tools make this tempting; resist it. A market-description OST looks plausible and is almost always wrong in the leaf nodes where the actual build decisions live. (Source: Teresa Torres/Vistaly, AI-assisted OST synthesis (historical February 2026 context))
- **Test the highest-risk assumption, not the easiest.** Teams systematically avoid testing assumptions that would kill their idea. The discipline is to explicitly score assumptions by importance × uncertainty and test the top-right quadrant. (Source: DVFU Assumption Mapping, Qualz (April 2026 secondary synthesis))
- **Do not write a PRD until the winning opportunity and solution are validated.** The handoff to `dlag-starter-core:project-notebook` happens at validated-solution, not at "the team has a hypothesis."

---

## Scope boundary

| IN scope | OUT of scope |
|---|---|
| Pre-build discovery: what to build | Shipped-feature usability testing (`dlag-starter-core:quality-review`) |
| OST construction and maintenance | PRD authorship (`dlag-starter-core:project-notebook`) |
| JTBD interview scripts | Visual/design decisions (`dlag-starter-core:design-foundation`) |
| Assumption mapping and pre-build evidence synthesis (guides 07-08) | Shipped analytics, statistical significance, causal inference |
| Prototype experiment planning | Implementation planning |
| Weekly discovery summaries for stakeholders | |
