---
name: react-foundation
description: "Build and review React architecture, component composition, state, forms, data boundaries, tests and performance in Starter React Router framework SSR."
license: AGPL-3.0-or-later
compatibility: Claude Code
---

# React Foundation Playbook

Read package.json, lockfile, route configuration and existing scripts first. Capture installed React/ReactDOM, React Router, Vite, state/data/form/test/lint packages and actual framework mode. SSR is not React Server Components. Keep the existing scaffold.

Choose architecture review, ADR, diff review, refactor, testing audit, performance investigation or requested implementation. Read [principles](guides/00-principles.md), then the [full resource map](README.md) and relevant guides before changing code or writing findings.

Preserve component identity and state lifetime, request identity, validation and server ownership. Initial route reads use loaders; mutations use route actions. Colocate transient state, keep shareable filters in the URL and avoid duplicating loader data in a global store. Optional caches, form packages and Compiler adoption need demonstrated reasons and installed compatible dependencies.

Report findings as must-fix, should-refactor or style with project file:line, supporting guide/official reference, observed behavior and a concrete fix. Use the full ADR/review/comparison templates. Report actual measurements and untested cases separately. Source review, scanner output, pure fixtures, compilation, SSR, browser behavior and provider execution establish different evidence.

The [Specialist](../../agents/react-foundation.md) has Read/Grep/Glob/Skill/Write/Edit for requested local source work. It has no shell or provider tools. Helpers remain inert unless an authorized caller with existing execution tools runs them. Direct use by the host is valid; never claim another Specialist ran. No automatic installs, credentials, configuration changes, provider operations, deployments or sends.

Use [React Router SSR](../react-router-ssr/SKILL.md) for route/runtime integration, [Security Review](../security-review/SKILL.md) before [Quality Review](../quality-review/SKILL.md), and [Project Notebook](../project-notebook/SKILL.md) for a requested larger refactor record. For visual direction use [Design Foundation](../design-foundation/SKILL.md). Keep [edition boundaries](../../references/edition-boundaries.md).
