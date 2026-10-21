---
name: browser-checks
description: "Check Starter website behavior, mobile layout, keyboard use and accessibility evidence with explicit browser and tool limits."
license: AGPL-3.0-or-later
compatibility: Claude Code
---

# Browser and Accessibility Checks Playbook

Use this after a Starter route or flow changes. Keep the test focused on that change.

1. Read [the procedure](guides/check-a-flow.md), [the report template](templates/browser-report.md) and [edition boundaries](../../references/edition-boundaries.md).
2. Inspect the target, expected behavior and any existing browser artifacts. This Specialist has Read, Grep, Glob and Skill only. These tools can review evidence, not launch a browser. If an authorized host has browser execution tools, it may follow this procedure directly. Otherwise record browser execution as pending and state the concrete checks needed.
3. Cover the successful path and relevant invalid, empty and failed states. Check desktop and mobile, keyboard navigation and response semantics using the procedure. Use fictional data and an isolated browser context. Do not submit live lead forms or send mail without explicit authorization.
4. Use actual screenshots, responses and console evidence for findings. Label untested cases pending. A screenshot alone does not prove hydration, keyboard usability, delivery, ownership or accessibility compliance.
5. Hand evidence to `dlag-starter-core:quality-review` and `dlag-starter-core:ready-check` without inventing a pass. Use [the Specialist](../../agents/browser-checks.md), or follow directly with available host tools.

No browser installation, shell access, credentials, provider writes, production forms, external model calls or publishing are granted by this Playbook. [Provenance](../../PROVENANCE.md) records the imported methods and Starter adaptation.
