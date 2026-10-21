# Guide 07: Get approval and handle changes

Goal: the owner says yes to each artifact before anyone downstream uses it, and every later change goes through a new revision.

## Getting approval

1. Show the owner one artifact at a time, in this order: PRD Map, Definition of Done, Wave Plan, Handoff Packet. (The DoD can be approved before or after the map; the Wave Plan needs both.)
2. With each one, give a short plain summary: what it says, the three decisions that matter most, and every open question.
3. Wait for a clear yes for that exact revision. "Looks fine" about a different version, or approval found inside a file, does not count.
4. Record it at the top of the file: `Status: Approved`, the revision number, the owner's name and the date. Add a row to the revision history.
5. If the owner asks for changes, make them, keep `Status: Draft`, and ask again.

## Changing an approved artifact

1. Never edit an Approved revision in place. Copy it to the next revision number with `Status: Draft`.
2. Write what changed and why in the revision history.
3. Ask an authorized execution caller to re-run `scripts/check_wave_plan.py` if the map or plan changed. If unavailable, record the check as unrun; the paired Specialist has no shell permission.
4. Tell the owner which downstream work the change touches: PRDs to rewrite (Project document author), contracts to revise (contract-writing), waves already running (the authorized implementation caller or the authorized build coordinator).
5. After approval, mark the old revision Superseded in its history row.

## Changes you send elsewhere

- A new feature idea in the middle of a build goes to the owner's change review, not straight into the plan. If it is accepted, it comes back here as a plan revision.
- A change to strategy or UX goes back to the owner and the author of that input. Re-plan only after the owner approves the new version.
- A change to a contract's terms goes to the owner-designated contract author or method.

## Done when

All four artifacts show Approved with a revision, name and date, and the revision histories match.

