<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../../assets/brand/dlag-signature-on-dark-1200.png">
  <img src="../../assets/brand/dlag-signature-on-light-1200.png" alt="Develop Like a Girl" width="210">
</picture>

**THE BUILD STUDIO · STARTER KIT**

# What is included

The Starter Kit contains three independently installable plugins. Core is required by either builder. Each listed Playbook has a paired Specialist and supporting resources in this repository.

| Plugin | Playbooks | Specialists | Public commands |
| --- | --- | --- | --- |
| Core | 26 | 26 | 10 |
| Website Builder | 1 | 1 | 1 |
| App Builder | 6 | 6 | 3 |
| **Total** | **33** | **33** | **14** |

## Core

| Playbook | What it covers |
| --- | --- |
| [Asset Delivery](../../plugins/dlag-starter-core/skills/asset-delivery/SKILL.md) | Improve responsive images, fonts, and visual stability. |
| [Browser Checks](../../plugins/dlag-starter-core/skills/browser-checks/SKILL.md) | Check browser behavior, mobile layouts, and accessibility. |
| [Build Lead](../../plugins/dlag-starter-core/skills/build-lead/SKILL.md) | Scope work and hand it to an available owner. |
| [Cloudflare Platform](../../plugins/dlag-starter-core/skills/cloudflare-platform/SKILL.md) | Prepare Workers entry points, bindings, and server hosting. |
| [Data Foundation](../../plugins/dlag-starter-core/skills/data-foundation/SKILL.md) | Design records, indexes, ownership, and local migration drafts. |
| [Dependency Review](../../plugins/dlag-starter-core/skills/dependency-review/SKILL.md) | Review manifests, lockfiles, and supplied vulnerability evidence. |
| [Design Foundation](../../plugins/dlag-starter-core/skills/design-foundation/SKILL.md) | Apply a focused visual direction and reusable design tokens. |
| [Github Workflow](../../plugins/dlag-starter-core/skills/github-workflow/SKILL.md) | Understand repository changes and safe Git workflows. |
| [Identity](../../plugins/dlag-starter-core/skills/identity/SKILL.md) | Implement app sessions, authentication, and server authorization. |
| [Implementation Foundation](../../plugins/dlag-starter-core/skills/implementation-foundation/SKILL.md) | Apply TypeScript, input validation, and server request boundaries. |
| [Project Notebook](../../plugins/dlag-starter-core/skills/project-notebook/SKILL.md) | Keep context, decisions, and documentation grounded in the project. |
| [Project Planning](../../plugins/dlag-starter-core/skills/project-planning/SKILL.md) | Define scope, acceptance checks, dependencies, and a useful first version. |
| [Project Setup](../../plugins/dlag-starter-core/skills/project-setup/SKILL.md) | Inspect an existing or empty project and propose its next step. |
| [Quality Review](../../plugins/dlag-starter-core/skills/quality-review/SKILL.md) | Compare the implementation and check results with the accepted brief. |
| [R2 Storage](../../plugins/dlag-starter-core/skills/r2-storage/SKILL.md) | Authorize private file uploads and downloads. |
| [React Foundation](../../plugins/dlag-starter-core/skills/react-foundation/SKILL.md) | Structure React components, state, forms, and data boundaries. |
| [React Router Ssr](../../plugins/dlag-starter-core/skills/react-router-ssr/SKILL.md) | Build server-rendered routes, loaders, actions, and sessions. |
| [Ready Check](../../plugins/dlag-starter-core/skills/ready-check/SKILL.md) | Combine reviews and evidence into a scoped readiness assessment. |
| [Resend Transactional](../../plugins/dlag-starter-core/skills/resend-transactional/SKILL.md) | Prepare transactional messages and reliable delivery boundaries. |
| [Secrets](../../plugins/dlag-starter-core/skills/secrets/SKILL.md) | Keep private values and environment boundaries out of client code. |
| [Security Review](../../plugins/dlag-starter-core/skills/security-review/SKILL.md) | Review authorization, secrets, injection, uploads, and other relevant risks. |
| [Session Protocol](../../plugins/dlag-starter-core/skills/session-protocol/SKILL.md) | Carry goals, decisions, and evidence across work sessions. |
| [Shadcn React](../../plugins/dlag-starter-core/skills/shadcn-react/SKILL.md) | Adapt project-owned shadcn/ui components. |
| [Supabase Platform](../../plugins/dlag-starter-core/skills/supabase-platform/SKILL.md) | Connect database and authentication through scoped server clients. |
| [Technical Explainer](../../plugins/dlag-starter-core/skills/technical-explainer/SKILL.md) | Explain code, errors, and unfamiliar technical material. |
| [Ui Primitives](../../plugins/dlag-starter-core/skills/ui-primitives/SKILL.md) | Build accessible controls, dialogs, feedback, and theme behavior. |

## Website Builder

| Playbook | What it covers |
| --- | --- |
| [Website Builder](../../plugins/dlag-starter-website-builder/skills/website-builder/SKILL.md) | Build public pages, content, lead capture, and their states. |

## App Builder

| Playbook | What it covers |
| --- | --- |
| [App Builder](../../plugins/dlag-starter-app-builder/skills/app-builder/SKILL.md) | Build one signed-in product flow with owned records. |
| [App Data Ui](../../plugins/dlag-starter-app-builder/skills/app-data-ui/SKILL.md) | Build data screens, tables, and import/export boundaries. |
| [App Integrations](../../plugins/dlag-starter-app-builder/skills/app-integrations/SKILL.md) | Define and implement one provider operation safely. |
| [App Onboarding](../../plugins/dlag-starter-app-builder/skills/app-onboarding/SKILL.md) | Build onboarding and meaningful activation steps. |
| [App Search](../../plugins/dlag-starter-app-builder/skills/app-search/SKILL.md) | Implement search over an agreed source with access controls. |
| [Stripe Payments](../../plugins/dlag-starter-app-builder/skills/stripe-payments/SKILL.md) | Prepare optional Stripe-hosted Checkout payment flows. |

## How the files fit together

Each plugin keeps Playbooks in `skills/`, Specialist roles in `agents/`, public entry points in `commands/`, and shared context in `references/`. The human guides you are reading live in `learn/`. Open a Playbook to reach its procedures, templates, examples, and deeper resources.

The current release targets Claude Code. Marketing and Business Tools are not included. Providers, account setup, hosting, and usage are separate from installing the kit. The [technology stack](technology-stack.md) lists the intended service responsibilities.

Package versions are recorded in each plugin’s `.claude-plugin/plugin.json`. The marketplace’s catalog is `.claude-plugin/marketplace.json`.

---

[Learning hub](../README.md) · [Kit overview](../../README.md)
