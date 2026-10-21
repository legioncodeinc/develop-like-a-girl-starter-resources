# React Foundation resource map

Owns React component and feature architecture, five state layers, route/data boundaries, forms, failure UI, TypeScript contracts, testing and measured performance. It does not own visual direction, provider operations or an independent security acceptance.

## Work and outputs

1. Inspect versions and actual framework mode; never infer SSR/RSC or an available tool from a package name.
2. Classify architecture review, decision, diff, refactor, testing, performance or implementation. Read guide00 and the relevant complete topic guides.
3. Inspect actual code and applicable acceptance scope. Preserve inputs, output contracts, state/reset lifetime, keys, DOM/ref behavior and server controls.
4. Apply React18/19 distinctions. Initial data is a loader concern; route actions are server HTTP handlers. Browser React19 form Actions remain browser functions unless they explicitly call a server endpoint.
5. Use scanners as limited review aids. Manually confirm context and severity. Do not treat a heuristic match or missing optional package as a proven defect.
6. Produce file:line findings, the supplied ADR or phased proposal, or requested scoped files. Use measured traces for performance. Include checks that did not run.
7. Surface authentication, ownership, CSRF/CORS, storage or entitlement concerns to Security Review; Quality Review follows Security. A large refactor can be recorded through Project Notebook. Loading a Playbook does not dispatch another owner.

Review outputs belong in the user's existing project documentation, following its conventions. If it uses the packaged Notebook layout, standalone reviews use library/requirements/reports/react/, feature/issue reviews use the relevant document's reports/ folder and ADRs use library/knowledge/private/architecture/. Never write user reports into the installed skill.

## Full guide, example, template and helper index

- [examples/adr-example-server-components-boundary.md](examples/adr-example-server-components-boundary.md)
- [examples/code-review-example-before-after.md](examples/code-review-example-before-after.md)
- [examples/outcome-exercise.mjs](examples/outcome-exercise.mjs)
- [examples/outcome-modernization.md](examples/outcome-modernization.md)
- [examples/refactor-proposal-example.md](examples/refactor-proposal-example.md)
- [guides/00-principles.md](guides/00-principles.md)
- [guides/01-project-structure.md](guides/01-project-structure.md)
- [guides/02-components-and-composition.md](guides/02-components-and-composition.md)
- [guides/03-state-management.md](guides/03-state-management.md)
- [guides/04-data-layer.md](guides/04-data-layer.md)
- [guides/05-error-handling.md](guides/05-error-handling.md)
- [guides/06-forms.md](guides/06-forms.md)
- [guides/07-performance.md](guides/07-performance.md)
- [guides/08-testing.md](guides/08-testing.md)
- [guides/09-typescript-patterns.md](guides/09-typescript-patterns.md)
- [guides/10-react-19-idioms.md](guides/10-react-19-idioms.md)
- [guides/11-server-components.md](guides/11-server-components.md)
- [guides/12-anti-patterns.md](guides/12-anti-patterns.md)
- [guides/13-ecosystem-catalog.md](guides/13-ecosystem-catalog.md)
- [guides/14-forms-and-validation.md](guides/14-forms-and-validation.md)
- [guides/15-rich-text-editors.md](guides/15-rich-text-editors.md)
- [guides/16-data-grids-and-tables.md](guides/16-data-grids-and-tables.md)
- [guides/17-charts-and-viz.md](guides/17-charts-and-viz.md)
- [guides/18-dnd-and-animation.md](guides/18-dnd-and-animation.md)
- [guides/19-notifications-and-toasts.md](guides/19-notifications-and-toasts.md)
- [guides/20-file-uploads-and-trees.md](guides/20-file-uploads-and-trees.md)
- [guides/21-react-vite-separate-backend.md](guides/21-react-vite-separate-backend.md)
- [guides/22-split-a-component-preserve-behavior.md](guides/22-split-a-component-preserve-behavior.md)
- [guides/23-measure-bundle-weight.md](guides/23-measure-bundle-weight.md)
- [guides/24-simplify-state-without-races.md](guides/24-simplify-state-without-races.md)
- [guides/build-react.md](guides/build-react.md)
- [references/official-sources.md](references/official-sources.md)
- [scripts/bundle-budget-check.ts](scripts/bundle-budget-check.ts)
- [scripts/react-version-audit.ts](scripts/react-version-audit.ts)
- [scripts/scan-anti-patterns.ts](scripts/scan-anti-patterns.ts)
- [scripts/test_bundle_measurement.py](scripts/test_bundle_measurement.py)
- [templates/ADR.md](templates/ADR.md)
- [templates/error-boundary.tsx](templates/error-boundary.tsx)
- [templates/eslint.config.js](templates/eslint.config.js)
- [templates/outcome-boundary-record.md](templates/outcome-boundary-record.md)
- [templates/outcome-comparison-record.md](templates/outcome-comparison-record.md)
- [templates/profile-form.tsx](templates/profile-form.tsx)
- [templates/project-file-map.md](templates/project-file-map.md)
- [templates/project-structure.md](templates/project-structure.md)
- [templates/provider-stack.tsx](templates/provider-stack.tsx)
- [templates/review-output-template.md](templates/review-output-template.md)
- [templates/test-setup.ts](templates/test-setup.ts)

- [Helper runbook](scripts/README.md)

- [Shared bounded input reader](scripts/safe-input.mjs)
- [Synthetic intake and output tests](scripts/test_input_boundaries.py)
