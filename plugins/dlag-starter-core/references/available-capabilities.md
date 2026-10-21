# Available Starter capabilities

This roster is generated from the exact packaged allowlist. A name here proves package availability, not model behavior, a successful application build or provider operation.

| Playbook and Specialist | Scope | Public command |
| --- | --- | --- |
| [dlag-starter-core:project-setup](../skills/project-setup/SKILL.md) | Authorized local project documents | `/dlag-starter-core:get-started` |
| [dlag-starter-core:project-notebook](../skills/project-notebook/SKILL.md) | Authorized local project documents | `/dlag-starter-core:review-project` |
| [dlag-starter-core:project-planning](../skills/project-planning/SKILL.md) | Authorized local project documents | `/dlag-starter-core:plan-project` |
| [dlag-starter-core:github-workflow](../skills/github-workflow/SKILL.md) | Read-only review or coordination | `/dlag-starter-core:manage-repository` |
| [dlag-starter-core:technical-explainer](../skills/technical-explainer/SKILL.md) | Read-only review or coordination | `/dlag-starter-core:explain-this` |
| [dlag-starter-core:session-protocol](../skills/session-protocol/SKILL.md) | Read-only review or coordination | Load the namespaced Playbook |
| [dlag-starter-core:security-review](../skills/security-review/SKILL.md) | Read-only review or coordination | Load the namespaced Playbook |
| [dlag-starter-core:quality-review](../skills/quality-review/SKILL.md) | Read-only review or coordination | Load the namespaced Playbook |
| [dlag-starter-core:dependency-review](../skills/dependency-review/SKILL.md) | Read-only review or coordination | `/dlag-starter-core:check-dependencies` |
| [dlag-starter-core:build-lead](../skills/build-lead/SKILL.md) | Read-only review or coordination | `/dlag-starter-core:build-task` |
| [dlag-starter-core:ready-check](../skills/ready-check/SKILL.md) | Read-only review or coordination | `/dlag-starter-core:ready-check` |
| [dlag-starter-core:react-foundation](../skills/react-foundation/SKILL.md) | Authorized local application/document edits | Load the namespaced Playbook |
| [dlag-starter-core:react-router-ssr](../skills/react-router-ssr/SKILL.md) | Authorized local application/document edits | Load the namespaced Playbook |
| [dlag-starter-core:cloudflare-platform](../skills/cloudflare-platform/SKILL.md) | Authorized local application/document edits | Load the namespaced Playbook |
| [dlag-starter-core:supabase-platform](../skills/supabase-platform/SKILL.md) | Authorized local application/document edits | Load the namespaced Playbook |
| [dlag-starter-core:data-foundation](../skills/data-foundation/SKILL.md) | Authorized local application/document edits | `/dlag-starter-core:design-data` |
| [dlag-starter-core:identity](../skills/identity/SKILL.md) | Authorized local application/document edits | Load the namespaced Playbook |
| [dlag-starter-core:secrets](../skills/secrets/SKILL.md) | Authorized local application/document edits | Load the namespaced Playbook |
| [dlag-starter-core:r2-storage](../skills/r2-storage/SKILL.md) | Authorized local application/document edits | Load the namespaced Playbook |
| [dlag-starter-core:resend-transactional](../skills/resend-transactional/SKILL.md) | Authorized local application/document edits | Load the namespaced Playbook |
| [dlag-starter-core:design-foundation](../skills/design-foundation/SKILL.md) | Authorized local application/document edits | `/dlag-starter-core:design-interface` |
| [dlag-starter-core:ui-primitives](../skills/ui-primitives/SKILL.md) | Authorized local application/document edits | Load the namespaced Playbook |
| [dlag-starter-core:shadcn-react](../skills/shadcn-react/SKILL.md) | Authorized local application/document edits | Load the namespaced Playbook |
| [dlag-starter-core:asset-delivery](../skills/asset-delivery/SKILL.md) | Authorized local application/document edits | Load the namespaced Playbook |
| [dlag-starter-core:browser-checks](../skills/browser-checks/SKILL.md) | Read-only review or coordination | Load the namespaced Playbook |
| [dlag-starter-core:implementation-foundation](../skills/implementation-foundation/SKILL.md) | Authorized local application/document edits | Load the namespaced Playbook |

Build Lead remains read-only. When delegation is unavailable, load the selected Playbook in the caller only when its own tools and the owner's task permit the required edits. No dispatch is implied. Other installed packs are separate namespaces. Check required-packs.md before handing off to Website Builder or App Builder. App Builder supplies optional hosted Stripe guidance and app workflows in its separate namespace. Marketing, Business Tools and Advanced-only services remain unavailable.
