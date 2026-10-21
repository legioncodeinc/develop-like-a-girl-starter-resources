# Research Summary: Build Studio discovery

Historical research summary dated May 20, 2026. This migration does not claim a fresh research run. Some references are secondary syntheses, not primary research. Source-era tool/vendor mentions are context only and select no Starter service.

---

## Historical run metadata, unverified in this migration

| Field | Value |
|---|---|
| Depth tier consumed | normal |
| Time window covered | 2025-11-20 to 2026-05-20 (6 months) |
| Files written | 11 (8 external source notes + 2 internal + this summary + plan + index) |
| Primary search tool | Exa (`web_search_exa`) |
| Queries executed | 5 primary + 3 expansion |
| Sources evaluated | ~50 results across 5 queries |
| Sources filed | 8 external source notes |

---

## The Five Most Influential Sources

### 1. Teresa Torres - My 2026 Roadmap (producttalk.org, Jan 2026)
Teresa Torres, My 2026 Roadmap (historical January 2026 context)

**Why it matters most:** This is Torres' own 2026 strategic framing. It establishes that: (a) Continuous Discovery Habits is now 5 years old with 135,000+ copies sold and remains the canonical framework; (b) Torres is explicitly concerned that AI is re-tilting teams toward delivery over discovery; (c) the Vistaly partnership is a historical example of AI-assisted OST synthesis; (d) the Discovery Habits Toolbox is now the corporate coaching pathway replacing live cohorts. the method maintainer should treat this as the framework's current "north star" document and structure `guides/00-principles.md` around the tensions Torres identifies here.

### 2. Continuous Discovery Habits Operationalized (getperspective.ai, Apr 2026)
Continuous Discovery Habits Operationalized, GetPerspective (April 2026 secondary synthesis)

**Why it matters:** The historical note identified this as a 2026 secondary source providing a concrete, day-by-day weekly schedule for running the Torres cadence at team scale, including exact time budgets per trio member (~100 minutes/week total). It reported the observational claim that fewer than 1 in 5 teams hit the weekly interview benchmark, and the failure mode is recruiting/scheduling friction, not disagreement with the methodology. This evidence base should power `guides/03-interview-cadence.md` - specifically why teams must "recruit while they sleep" using optional authorized recruiting patterns, while manual preparation remains available.

### 3. Assumption Mapping DVFU 2x2 (qualz.ai, Apr 2026)
DVFU Assumption Mapping, Qualz (April 2026 secondary synthesis)

**Why it matters:** The cleanest 2026 synthesis of the assumption mapping technique, directly derived from Torres CDH Chapter 11. Provides the canonical DVFU (Desirability, Viability, Feasibility, Usability) taxonomy, the 2x2 matrix axes (Importance vs Evidence), the "Kill Zone" prioritization logic, and the experiment-type-to-assumption-type mapping. Also contains the four prototype archetypes (fake door, landing page, Wizard of Oz, concierge) with time/cost estimates that match the Command Brief's specifications exactly. Powers both `guides/05-assumption-mapping.md` and `guides/06-experiment-design.md`.

### 4. OST Guide (qualz.ai, Apr 2026) + Torres/Vistaly AI OST (producttalk.org, Feb 2026)
Opportunity Solution Tree guide, Qualz (April 2026 secondary synthesis) + Teresa Torres/Vistaly, AI-assisted OST synthesis (historical February 2026 context)

**Why they matter (paired):** The Qualz.ai guide provides the complete six-step build process and the three canonical failure modes (jumping to solutions, single solution per opportunity, treating tree as one-time artifact). The Torres/Vistaly note establishes the AI-legitimate/illegitimate distinction: AI may synthesize real interview data into a draft OST; AI must not generate an OST from market descriptions. Together these two sources define the complete methodology and the 2026 tooling story for `guides/02-opportunity-solution-tree.md`.

### 5. JTBD Switch Interview - Moesta Method (thehuman2ai.com)
Moesta switch interview method, TheHuman2AI (secondary account)

**Why it matters:** The most complete single-reference for the Moesta switch interview protocol, including the six-stage buying timeline, four forces framework (F1-F4), probing techniques, recruiting criteria (8-12 people, 30-90 days post-switch, equal hirers/firers), and synthesis outputs. This secondary account informed `guides/04-jtbd-interview.md`. The four-force worksheet is preserved in the local interview template; no separate force-diagram file is required.

---

## Historical conceptual questions and method limits

### Q1: Christensen Interview vs Moesta Switch Interview - which is the default?

The research surfaces two distinct JTBD interview methodologies: Christensen's exploratory interview (discovers *what the job is*) and Moesta's switch interview (reconstructs *how a specific purchase decision happened*). The Command Brief does not specify which to use as the default. The practitioner consensus is "Christensen first to find the job, Moesta second to understand purchase dynamics." the method maintainer should define the recommended sequencing in `guides/04-jtbd-interview.md` and decide whether to encode both or just Moesta (which Torres' practice most closely resembles).

### Q2: `library/discovery/` folder - define in discovery method or defer to `Project Notebook`?

The Command Brief explicitly flags this as an open question. The research shows Torres' methodology maps cleanly to a fixed folder structure. Recommendation: The discovery method should define the `library/discovery/` schema with a note that `Project Notebook` governs `library/` overall but `discovery/` is the discovery planning author's namespace. the method maintainer should draft the folder spec in `guides/00-principles.md` and use accepted project homes; no extra scaffold approval is implied by this historical note.

### Q3: How does the planning author handle teams with no existing interview practice?

Torres' cadence assumes the trio is already doing some research. The research notes that fewer than 1 in 5 teams hit the weekly benchmark. The discovery method needs a "Day 1" playbook for teams starting from zero: how to write the first research outline, how to set up an in-app recruiting trigger, how to structure the first 3 interviews without an existing OST. This should probably be `guides/03-interview-cadence.md`'s "Bootstrap" section. the method maintainer should decide whether to include a worked example or reference the `examples/` folder.

### Q4: AI-powered interview moderation - endorse, warn, or ignore?

Torres endorses AI-moderated async interviewing (via Vistaly partnership) as a legitimate way to lower the recruiting/scheduling tax. The getperspective.ai article goes further and recommends it as the operational default for 2026. The discovery method should take a position: (a) endorse AI moderation as an acceleration tool while requiring human trio review of synthesis, (b) warn that AI moderation trades depth for scale (async interviews miss non-verbal cues, follow-up quality depends on AI), or (c) present both options and let the team decide. Torres' own framing ("Do both. Develop your discovery skills. Let AI do some.") suggests option (a).

### Q5: When does the planning author trigger vs. when does it hand off?

The Command Brief defines trigger conditions and handoff points abstractly. The discovery method needs concrete trigger phrases (e.g., "we don't know what to build next", "we need to understand our users", "is this the right opportunity to pursue") and concrete handoff artifacts (desired-outcome.md exists and is agreed, OST has a target opportunity, winning solution has at least one validated assumption). the method maintainer should codify these as the planning author's entry/exit conditions in `guides/00-principles.md`.

---

## Historical reading pointers for deeper context

1. **producttalk.org/2023/12/opportunity-solution-trees** - Torres' own canonical OST explainer (from 2023 but the definitive textual reference; pair with the 2026 Vistaly note for current tooling)
2. **producttalk.org book club posts (Jan-May 2026)** - Monthly reading guides for each CDH chapter with exercises; especially the March 2026 and April 2026 posts which cover OST and JTBD chapters in depth
3. **vistaly.com/product/opportunity-solution-tree/** - Historical Vistaly feature spec for OST tooling (as of 2026 launch); useful for `guides/02-opportunity-solution-tree.md` tooling section
4. **knowledgelib.io JTBD methodology (2026-03-11)** - Contains a detailed decision matrix for which JTBD path to use (Competitor Switch, Own Customer Switch, Churn Analysis, Workaround Analysis) with primary output per path; useful for `guides/04-jtbd-interview.md`

## Current local application of these limits

The actual guides use a single desired outcome, the five-act Moesta switch story, separate observed facts from beliefs and preserve all four switching forces. When the underlying job is unknown, clarify that job before a purchase-switch interview; no second interview methodology is claimed as fully documented here. Historical sample-size/cadence numbers are heuristics, not guarantees or significance calculations. The original run-count field says 11 files while its parenthetical components add to 13; treat that historical accounting as inconsistent, not as a verified coverage total.

For a new team, prepare the outcome, script and first authorized interview before adding an OST opportunity node. No actual interview evidence means no validated tree. Automatic invitation triggers, scheduling services, AI moderation and transcription remain unselected proposals. Source-era maintenance suggestions do not authorize research runs, provider changes or an extra owner-question workflow.
