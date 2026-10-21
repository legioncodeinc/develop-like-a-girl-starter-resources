# Guide 04: Plan the waves

Goal: a saved Wave Plan at `library/requirements/plans/wave-plan.md` that puts the PRDs into ordered waves, with entry and exit criteria for each wave and a Mermaid dependency graph. Build Lead and the authorized implementation caller read this plan instead of inventing their own.

Template: [../references/templates/wave-plan.md](../references/templates/wave-plan.md). Example: [../references/examples/example-wave-plan.md](../references/examples/example-wave-plan.md).

## Steps

1. **Start from the approved PRD Map.** Do not plan waves from a Draft map.
2. **Find the fewest possible waves.** Put every PRD with no dependencies in wave 1. Remove them. Every PRD whose dependencies are now all placed goes in wave 2. Repeat. This is Kahn's algorithm run in rounds. If you get stuck with PRDs left over, there is a cycle: go back and fix the PRD Map. The checker script prints this for you (step 8).
3. **Adjust for risk.** Within what dependencies allow, move high-risk PRDs earlier so surprises show up early. Move nice-to-haves to the last wave.
4. **Check the first waves make a whole path.** For a new product, the first wave (or the first two) should let a user finish the main journey end to end, even if plainly. This is the walking skeleton. If the strategy says early user feedback matters most, you may instead put a user-facing PRD on a simple back end first; then the swap interface must be a flagged boundary.
5. **Adding waves is allowed; breaking order is not.** You may spread PRDs across more waves than the minimum (for example, to keep a wave small). You may never put a PRD in the same or an earlier wave than something it depends on.
6. **Write entry and exit criteria for every wave.** Each line must be a yes/no check. Keep the standard lines from the template (plan approved, DoD approved, PRDs written in the ID-table format, CTRs accepted and pinned; ACs verified separately, DoD met, security then quality clean). Add wave-specific lines, such as "a user can finish journey J1".
7. **Draw the Mermaid graph.** `flowchart LR`, one `subgraph` per wave, one node per key, one arrow per dependency pointing from the PRD that finishes first to the PRD that waits. Use the `F##` keys as node ids. Never name a node lowercase `end`.
8. **Ask an authorized execution caller to run the checker** from the Playbook folder. The paired Specialist has no shell tool; if no execution caller or Python 3.9+ is available, mark this check unrun and report the blocker. Do not install tools. For an execution caller, set the repository path and run:

   ```bash
   project_root=/absolute/path/to/project
   python3 scripts/check_wave_plan.py "$project_root/library/requirements/plans/wave-plan.md" --prd-map "$project_root/library/requirements/plans/prd-map.md"
   ```

   Fix every ERROR. It checks unknown keys, cycles, order violations, wave gaps, Mermaid edges matching the table, and that the plan and map agree.
9. **Write the "Why this wave" column** in plain words for each row. The owner should understand the order without asking you.

## What the plan does not decide

- Which implementation owner builds each PRD, models, and parallel worker counts: the authorized implementation caller decides at run time.
- Dates and effort forecasts: an owner-approved forecasting process (no dedicated Starter specialist).
- Sprint ceremonies: the owner's team process (no dedicated Starter specialist).

Then follow [Guide 07](07-approve-and-revise.md) to get approval.
