# Write and review technical documentation

Use writing review to decide how well the document serves its reader. Use ghostwriting when asked to draft a document. Keep the supplied house style and the user's actual scope. This method changes authorized local Markdown only; no platform change, folder move, configuration edit, dependency installation, remote PR comment, external send or publication follows.

Read [Diataxis](guides/00-diataxis.md) before prose review. Use [Project Notebook permissions](../references/library-boundaries.md). Formatting and writing findings are distinct from independent implementation Security/Quality reviews and technical correctness evidence.

## The review workflow (8 steps)

When reviewing a document:

1. **Classify the Diataxis mode.** See `guides/00-diataxis.md`. Every document must have one primary mode. Flag mode-mixing before reviewing prose.
2. **Audit the opening sentence.** Inverted pyramid: most important fact first. See `guides/01-inverted-pyramid.md`.
3. **Review headings for scanability.** Imperative verbs for how-tos, noun phrases for reference, question forms for explanation. See `guides/01-inverted-pyramid.md`.
4. **Evaluate every code example.** Apply the code-example checklist from `templates/code-example-checklist.md`. See `guides/02-code-example-discipline.md`.
5. **Check voice and tone.** Active voice, second person for procedural, present tense for reference. See `guides/03-voice-and-tone.md`. If a house style is supplied, enforce that instead.
6. **Apply the reader lens.** Prerequisites stated? Jargon defined on first use? Concepts introduced before used? See `guides/04-reader-lens.md`.
7. **Complete the scorecard.** Fill in `templates/scorecard.md`. Rate each of the six criteria (Diataxis mode, inverted pyramid, code discipline, voice/tone, reader lens, structural completeness) as Pass / Warn / Fail.
8. **Produce findings report.** Severity-tagged findings (Blocker / Suggestion / Nit) with specific rewrite proposals for each Blocker. See `templates/review-report.md` for the output format.

---

## The ghostwriting workflow (3 steps)

When asked to write rather than review:

1. **Clarify mode, reader, and voice.** Confirm the Diataxis mode and the target reader's knowledge level. If a style guide is provided, read it. See `guides/05-ghostwriting.md`.
2. **Draft in the correct mode.** Tutorials follow a learning-narrative arc. How-tos are imperative, goal-oriented, and step-sequential. Reference is complete and neutral. Explanation is discursive and understanding-oriented. Do not mix.
3. **Self-review before delivering.** Apply the full 8-step review workflow to your own draft. Surface any Blocker findings and fix them. Deliver a clean draft, not a draft with inline review comments.

---


## Full method map

| Review concern | Guide |
| --- | --- |
| Four modes and mode mixing | [Diataxis](guides/00-diataxis.md) |
| Opening and headings | [Inverted pyramid](guides/01-inverted-pyramid.md) |
| Complete, safe examples | [Code discipline](guides/02-code-example-discipline.md) |
| House style, voice and register | [Voice and tone](guides/03-voice-and-tone.md) |
| Reader prerequisites and jargon | [Reader lens](guides/04-reader-lens.md) |
| Drafting and voice matching | [Ghostwriting](guides/05-ghostwriting.md) |
| Changed-document review | [Docs as code](guides/06-docs-as-code-review.md) |
| Ratings and actionable findings | [Scorecard](guides/07-scorecard.md) |

Apply [the prose punctuation rule](guides/08-prose-punctuation.md) to authored prose, preserving its quotation and literal-data exceptions.

Use the complete [scorecard](templates/scorecard.md), [code checklist](templates/code-example-checklist.md), [review report](templates/review-report.md) and [ghostwrite brief](templates/ghostwrite-brief.md). [Mode-mixing](examples/01-mode-mixing-diagnosis.md) and [code before/after](examples/02-code-example-before-after.md) provide full worked reviews. [Review records](reports/README.md) explains report scope; [craft reference](research/research-summary.md) preserves the framework and qualification details.

## Scope and evidence

For structure, requirements, decisions or deep system explanations, use the corresponding existing Project Notebook guides. Unselected platform tooling, MCP reference generators, artifact exporters and independent reviewer dispatch are not invented. An available `dlag-starter-core:technical-explainer` may help with a separately selected bounded explanation; otherwise write directly. Never claim a Specialist ran without actual dispatch evidence.

Every Blocker names an exact location, practical reader failure and concrete rewrite. A score is a writing judgment, not a technical/security clearance, current API verification, successful application execution or comprehension test. Report unexecuted code and reader understanding explicitly. Use only the source and output paths the user authorized.
