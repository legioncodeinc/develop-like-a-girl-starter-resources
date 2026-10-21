# Plan the product UX

Turn an approved strategy into journeys, information architecture, task flows, complete screen states, content, accessibility requirements, critique and a build-order handoff. Use the full [guide map](README.md). This local resource belongs to Project Planning; it does not add a new Specialist or tool permission.

## Preserve the complete design method

1. [Read strategy and existing design authority](guides/01-read-strategy-and-set-direction.md). Missing strategy routes to the [local strategy method](../strategy/playbook.md). Existing coherent UI, PRODUCT.md, DESIGN.md and accepted design-system rules take precedence over a new direction.
2. Draft 2 or 3 distinct direction options. Gate A records the owner's selected direction before high-fidelity prototype work. Markdown descriptions and supplied screenshots are valid planning material; HTML creation requires an authorized implementation caller.
3. [Map journeys and IA](guides/02-map-journeys-and-ia.md): one actor per journey, evidence labels, content/function inventory and controlled vocabulary before navigation, stable screen IDs.
4. [Write complete task flows](guides/03-write-task-flows.md): ideal path, validation, request, permission and empty branches; accessible Mermaid title/description; stable flow IDs.
5. [Specify every screen and state](guides/04-spec-screens-and-states.md): one job/action, reading order, empty/loading/error/success behavior and precise copy.
6. [Define content and accessibility](guides/05-write-content-and-accessibility.md). The baseline is a design-time target, not proof of conformance.
7. Preserve the [prototype method](guides/06-build-prototypes.md) and full [HTML starter](references/templates/prototype-starter.html) for an authorized implementation caller. Project Planning writes Markdown specs only; actual HTML/React changes route to `dlag-starter-core:design-foundation` and its [local Playbook](../../design-foundation/SKILL.md) when authorized. No prototype or browser execution is implied by a saved spec.
8. [Critique and Gate B](guides/07-critique-and-gate.md): seven evidence-backed dimensions, accessibility blockers, at most two bounded fix rounds and recorded owner acceptance. An unavailable checker/detector/browser stays unrun; never invent scores or install tools.
9. [Prepare an optional external design-tool brief](guides/08-hand-off-to-claude-design.md) only when requested. Claude Design is an optional owner-operated route, not a Starter prerequisite. Do not access an account, sync a repository or upload/send anything from this workflow.
10. [Review an optional owner-supplied export](guides/09-import-claude-design-export.md): inventory without execution, reject unsafe archive members, distinguish exact/inferred/approximate values, keep proposals separate and never overwrite accepted DESIGN.md. Non-Markdown copying, JSON writes, archive extraction and execution require an appropriately authorized caller.
11. [Hand off to planning and implementation](guides/10-hand-off-to-owners.md). Preserve screen/flow IDs and acceptance records; use actual packaged Project Notebook and Design Foundation methods within their task/tool boundaries.

## Use the supporting depth locally

[Package layout and IDs](references/package-layout.md) define outputs and approval states. The [README](README.md) links all thirteen templates and the complete research explanation. The [Python checker](scripts/check-design-package.py) has package and inventory modes, uses only the standard library, and requires Python 3.9+ plus a suitably authorized execution caller. It validates structural markers and archive hazards, not browser behavior, conformance, safe HTML execution or owner approval.

The paired Project Planning Specialist retains Read/Grep/Glob/Skill/Write/Edit for expressly requested local Markdown only. Check destinations, preserve differing existing documents unless editing was requested, read back saved results and report actual paths. No application code, HTML prototype creation, configuration, credentials, installs, provider/account actions, sends, deployment, commit or push is part of the planning role. Existing authorization to save a draft needs no repeated confirmation.

Starter stays React/Vite/React Router framework mode with SSR, Tailwind and React shadcn/ui, Workers hosting/backend, Supabase PostgreSQL/Auth, Cloudflare secrets, R2 and transactional-only Resend. Content stays in the repository. Optional Stripe uses hosted Checkout; a success redirect alone grants no entitlement. No Figma, newsletter, queue/background service or extra design provider is required. Keep user identity, record ownership and file access visible in flows and refusal states.
