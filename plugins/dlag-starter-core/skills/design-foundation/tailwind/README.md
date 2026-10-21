# Tailwind framework guide

Use these resources inside Design Foundation to inspect and change the existing React/Tailwind project. Product tokens come from the approved brief; framework mechanics determine how they compile. Read the relevant guide rather than loading every resource for a small change.

| Task | Resource |
| --- | --- |
| Understand the v4 model and browser floor | [Principles](guides/00-principles.md) |
| Extend, override, reset or alias tokens | [Tokens](guides/01-theme-and-tokens.md), [directive reference](references/theme-directive-reference.md) |
| Review an authorized v3 migration | [Migration procedure](guides/02-migrating-v3-to-v4.md), [change table](references/v3-to-v4-migration-cheatsheet.md) |
| Wire existing React/Vite and SSR styles | [Vite procedure](guides/03-vite-plugin-react-setup.md), [integration example](references/react-router-vite-setup.md) |
| Diagnose light, dark and system themes | [Variants](guides/04-dark-mode-and-variants.md) |
| Adapt components to their mount point | [Containers](guides/05-container-queries.md) |
| Configure the existing formatter | [Class ordering](guides/06-class-ordering-and-tooling.md) |
| Review duplication or CSS performance | [Anti-patterns and measurement](guides/07-anti-patterns-and-performance.md) |
| Check component and framework fit | [Fit procedure](guides/08-component-framework-fit.md), [worksheet](references/component-fit-intake.md), [worked cases](references/component-fit-worked-cases.md) |

Inspect source before recommending a change. Preserve existing Vite/Workers plugins and component APIs. Review work produces findings; authorized implementation produces changed source. Run only approved existing checks and distinguish syntax/CSS compilation from application, browser, accessibility and hydration evidence. Return file locations, material decisions, observed checks and remaining gaps.
