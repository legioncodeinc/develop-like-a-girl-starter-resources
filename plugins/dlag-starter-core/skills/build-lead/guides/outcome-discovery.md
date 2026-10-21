# Find the owner of an outcome

Capture the desired result in the user's words, then read [the outcome index](../references/outcome-index.json) and [routing references](../references/routing-index.md). Reuse supplied platform, experience and product decisions. Ask only missing facts that change the route.

1. Find a shortlist by outcome, domain and expected artifact. The optional [lexical helper](../scripts/outcome-route.py) ranks overlapping words with aliases. Build Lead cannot execute it; an authorized caller with Python may use it. Reading the JSON needs no Python.
2. Treat every row as a scope decision. `REQUIRES_SCOPE_REVIEW` identifies a possible selected owner, not complete outcome coverage. `UNAVAILABLE` identifies work without a qualified selected method. Neither state means dispatched, implemented, independently reviewed, learned by a human or ready in a provider account.
3. Check the candidate's triggers, negative routing, required inputs and expected outputs. A shared noun does not establish ownership. Check the actual generated roster and registered namespaced Playbook. Never load an original source tree or guessed installation path as an installed substitute.
4. Return one narrow proposed route, accepted inputs, expected artifact, dependencies, actual tools and evidence limits. Continue only within the existing authorization. Use the [dispatch brief](../templates/dispatch-brief.md) and [scope rules](scope-and-tools.md).
5. If the needed capability is unavailable, record the gap and owner decision. Do not register a role, install a pack or invent a command while discovering an outcome.

For example, explaining a supplied technical post can route to Technical Explainer. Teaching an entire app-development curriculum requires a separate scope decision; an explanation does not establish that curriculum. A native desktop request can be recognized in the index while remaining unavailable in Starter. Preserve that requested outcome and the missing prerequisite.

The helper's score is lexical overlap, not quality, value, availability, capacity or completion. It cannot dispatch a workflow, create an artifact or change a capability's evidence state. Unmatched searches return an empty shortlist. Validate query and limit inputs; report malformed data or unavailable Python as a helper gap, never as a product result.
