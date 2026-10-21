# Write, check, save, and hand off

Turns the interview answers into `library/knowledge/private/product/product-strategy.md` and passes it on.

## Write

1. Copy the [strategy template](../references/templates/product-strategy.md). Keep sections 1 to 8 on the first page; supporting parts go below the line.
2. Fill each section only from the owner's answers, repo evidence the owner confirmed, or linked research. Mark anything else "OPEN: {question}".
3. Use the owner's words where you can. Plain language, short sentences, 8th-grade reading level. No em dashes or en dashes.
4. Add the pricing hypothesis in one or two lines, labeled "hypothesis", with a pointer to the owner-designated pricing method. Do not design pricing here.
5. Add a rough bottom-up opportunity size only if the owner wants one. Show the math and label every guess. Top-down market numbers are framing, not forecasts (Product Notebook, Market Sizing (2025)).

## Check

An execution caller with appropriate tools may run the read-only checker on an authorized local draft path and fix every reported error. The paired Specialist has no shell tool; it must walk the checklist manually and report the script unrun. Do not install Python or grant a new execution tool. From this strategy resource folder, an execution caller uses:

```bash
project_root=/absolute/path/to/project
python3 scripts/check-strategy.py "$project_root/library/knowledge/private/product/product-strategy.md"
```

It checks that all eight sections exist, there are 2 to 4 bets, exactly 3 inputs, a NOT-in-v1 list, a named riskiest assumption, a pricing hypothesis line, no leftover `{placeholders}`, and no em or en dashes. If the host has no shell, walk the same list by hand and say so. See the [made-up worked example](../references/examples/worked-example.md) for a passing file. It does not judge whether the strategy is good. That is the owner's call.

Then read it back to the owner: "Anything here that does not sound like you?" Record approval only for the confirmed revision. An expressly requested saved draft may be written with Draft status; saving it does not approve its strategic choices.

## Save

- Save only requested local Markdown, using accepted project homes or the proposed product/decisions paths. Check each destination and preserve differing existing material unless editing it was requested. Existing authorization to save a draft needs no repeated question. Read back saved files and report their actual paths. Use `dlag-starter-core:project-setup` when a complete scaffold is requested.
- If a strategy already exists, this is an update (see below). Never overwrite a file another session is editing.
- A strategy request does not authorize committing or pushing. Future implementation review runs Security before Quality and repository-health review; this document makes no claim those reviews ran.

## Update mode

1. Read the current strategy and every decision note.
2. Ask what changed: new evidence, a failed test, a new segment, a positioning check-in.
3. Change only the affected sections. Write a superseding decision note for each changed choice.
4. Update `last-reviewed` and `next-review`. Positioning should get a structured look about every six months (Mind the Product, Dunford Positioning (2026)), and the north star should change when the strategy does (Amplitude, Good and Bad North Stars (date conflict)).

## Hand off

Tell the owner, in plain words, what comes next:

- the owner-approved UX method uses sections 2, 3, 4 and 7.
- the Project Planning build-order method uses sections 5, 6, 7 and 8, and should plan the riskiest assumption test first.
- PRDs go to dlag-starter-core:project-notebook. OKRs go to an owner-designated goals method (unavailable as a Starter specialist).

List every OPEN item so the next owner knows what is still a guess. See [handoffs](../references/handoffs.md) for the full contract.
