# 05 - Ghostwriting


Ghostwriting mode activates when the user asks the reviewer to *write* a document rather than *review* one. The rules are different: in review mode, the reviewer is an editor. In ghostwriting mode, the reviewer is the author -- and must apply its own rubric to its own output before delivering.

---

## Step 1: Clarify mode, reader, and voice

Resolve these points from the actual request, existing sources and supplied style. Ask only when an unresolved answer changes the work; do not repeat settled questions:

1. **Diataxis mode.** Which of the four modes is this? If the user is unclear, propose a mode and explain why. Example: "This sounds like a how-to guide -- you want to give practitioners a recipe for configuring X. A tutorial would be more appropriate for guided learning by doing; explanation handles why X exists. Which is right for your audience?"

2. **Target reader.** Who is reading this, and what do they already know? Beginner / intermediate / expert. What goal are they trying to achieve?

3. **Voice and tone.** Is there a house style guide? If yes: read it before writing. If no: apply the default style (`guides/03-voice-and-tone.md`).

4. **Scope.** What does the document cover, and what explicitly does it NOT cover? Scope creep during writing is the primary cause of mode-mixed output.

Do not invent unresolved audience, authority or scope. Continue independent drafting only where the request supplies enough information. A wrong mode is not fixable by rewriting individual paragraphs.

---

## Step 2: Draft in the correct mode

### Drafting a tutorial

The tutorial structure (source: the relevant official style reference):

```
1. Introduction: what the reader will build/achieve (one paragraph).
2. Prerequisites: what they need before starting.
3. Steps: numbered, imperative, each ending with a concrete observable outcome.
4. Summary: what was accomplished, links to next tutorials and related how-tos.
```

Rules:
- Do NOT explain why things work the way they do. Link to explanation pages.
- Do NOT offer alternatives. The tutorial is opinionated.
- Qualify the stated environment and observable step results. Record unrun steps and failures; do not guarantee a tutorial that was not exercised.
- Use "you" and imperative verbs throughout.

### Drafting a how-to guide

The how-to structure:

```
1. Title: "How to X" or "Configure X for Y".
2. Goal statement: one sentence ("This guide shows you how to configure rate limiting in production.").
3. Prerequisites: listed concisely.
4. Steps: numbered, imperative, each with code and expected output.
5. (Optional) Troubleshooting: common failure modes and fixes.
```

Rules:
- Start every step with a verb.
- Do NOT explain the underlying technology. Link to explanation.
- Do NOT provide every option. Focus on the goal.

### Drafting reference

The reference structure:

```
1. Title: noun phrase ("Rate limit parameters").
2. Overview: one sentence describing what the reference covers.
3. Tables or lists: consistent structure, every item documented.
4. No recommendations, no "we suggest", no opinions.
```

Rules:
- Present tense, third person.
- Completeness is the primary virtue: do not omit options even if they are rarely used.
- No instructional content ("to configure X, do Y"). Link to the how-to.

### Drafting explanation

The explanation structure:

```
1. Title: question or gerund ("Understanding the rate-limit model").
2. Opening: position the reader ("This page explains why rate limiting works the way it does and the design trade-offs behind the default settings.").
3. Body: discursive prose, can include diagrams, comparisons, context.
4. Links: to related how-tos, reference, tutorials.
```

Rules:
- Can admit opinion and recommendation ("The preferred approach is...").
- Do NOT give step-by-step instructions. Link to how-tos.
- Do NOT provide exhaustive reference tables. Link to reference.

---

## Step 3: Self-review before delivering

Apply the full 8-step review workflow from [the writing method](../README.md) to your own draft before delivering. Fix every Blocker finding before delivery. Surface Suggestion-level findings explicitly so the user can decide.

**Common self-review findings in AI-generated drafts:**
- Mode-mixing: an explanation paragraph sneaks into a how-to.
- Passive voice where active voice was intended.
- Vague pronoun references ("it", "this", "that" without clear antecedents).
- Jargon used before definition.
- Code blocks without introductory sentences.
- Steps that describe the outcome but don't give the command.

Deliver a clean draft with a brief one-paragraph note: "I've drafted this as a [mode] for [target reader]. I found one Suggestion during self-review: [brief description]. Let me know if you'd like me to address it."

---

## Voice matching (when ghostwriting for a specific author)

When ghostwriting to match an existing author's voice:

1. Read 500-1000 words of the author's existing writing.
2. Extract: sentence length pattern (short/medium/long), pronoun choices, formality level, use of hedges vs confident assertions, technical vocabulary level.
3. Match those patterns. Do not average them toward the default style.
4. Flag in your delivery note: "I matched your voice based on [cited source pages]. Here's what I noticed: [2-3 observations]. Let me know if any patterns need adjusting."

Voice matching is a best-effort skill. Flag it as such, and invite the author to correct any mismatches.
