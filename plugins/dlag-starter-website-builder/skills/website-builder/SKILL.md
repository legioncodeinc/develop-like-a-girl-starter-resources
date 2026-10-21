---
name: website-builder
description: "Build a Starter marketing website or blog with React Router SSR, repository-managed content and Cloudflare Workers. Include accessible pages, search metadata and bounded lead capture."
license: AGPL-3.0-or-later
compatibility: Claude Code
---

# Website Builder Playbook

Build one useful site slice at a time. Starter uses React/Vite and React Router framework SSR on Cloudflare Workers, Tailwind and shadcn/ui, AI-edited repository content, Supabase for approved data/auth, R2 for files and Resend for transactional mail. Follow [edition boundaries](../../references/edition-boundaries.md).

1. Inspect existing files, package versions, brief and Project Notebook. Read [workflow](guides/build-workflow.md) and [intake](templates/site-brief.md). Ask only unresolved questions that change the work; already requested local code edits need no second approval. Preserve existing pages and unrelated changes.
2. Save a small site brief, route/content manifest and [build report](templates/build-report.md) in the user's project when authorized. Reuse existing planning documents. Mark each feature requested, saved, executed or pending with evidence. Do not turn a draft into a claim of a working site.
3. Use `dlag-starter-core:project-planning`, `dlag-starter-core:design-foundation`, `dlag-starter-core:react-router-ssr` and `dlag-starter-core:cloudflare-platform` for their implementation boundaries. These are explicit Skill handoffs to the required Core plugin. They are not relative filesystem paths. If Core is missing, report the missing dependency before building; do not guess its contents.
4. Build the shell and one page using [content and search](guides/content-and-search.md) and [route recipe](templates/site-route.md). Use approved content, semantic landmarks, useful headings, responsive layout, clear navigation and truthful calls to action. AI edits structured content in the repository. Do not introduce a CMS, login, analytics provider or payments unless the brief calls for it.
5. Add further pages/blog entries from the same manifest. Add lead capture only when requested, following [lead boundary](guides/lead-capture.md) and [action recipe](templates/lead-action.md). Delegate data/RLS, R2 and Resend details to the named Core Playbooks. Use mocks until real provider use is authorized.
6. Read all changed files back, check the affected route/content/form cases and use `dlag-starter-core:browser-checks` for the requested local desktop/mobile journey when browser tools exist. Use [acceptance checks](guides/acceptance.md). Reuse passing checks while their inputs remain unchanged. Leave unavailable compilation, browser and live provider checks pending.
7. Update the saved report and hand off to `dlag-starter-core:ready-check` with exact files and observed evidence. Ready Check cannot invent missing runtime proof. Do not commit, push, configure accounts, install packages, send mail or deploy without the user's authorization for that action.

Use the [Specialist](../../agents/website-builder.md), or follow this procedure directly with available tools when dispatch is unavailable. [Official references](references/official-sources.md) and [provenance](../../PROVENANCE.md) explain the scope. This Playbook authors local site code; its recipes require application integration and do not establish a compiled or deployed site.
