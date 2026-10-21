# Approved edition boundaries

These are the approved project defaults. Starter now packages local platform/design implementation guidance alongside its shared Core methods. Read [the package prerequisites](required-packs.md). Core has twenty-six capabilities; Website Builder and App Builder are separate plugins requiring Core. App Builder includes six application methods and optional hosted Stripe. Marketing and Business Tools remain unavailable; Advanced still packages only its eleven shared Core methods. Do not replace the selected edition's framework or providers because an imported example uses another stack. Services are used only when the accepted project requirements need them.

| Area | Starter | Advanced |
| --- | --- | --- |
| Assistant at launch | Claude Code only | Claude Code only |
| Repository | GitHub | GitHub |
| Framework | React, Vite, React Router framework mode with SSR | Svelte and SvelteKit |
| Styling/components | Tailwind and shadcn/ui for React | Tailwind and shadcn-svelte |
| Database | Supabase | Neon; selected source uses Drizzle |
| Customer authentication | Supabase Auth | WorkOS |
| App hosting and custom backend | Cloudflare Workers | SvelteKit functions on Vercel |
| Server secrets | Cloudflare secrets | Doppler |
| Uploaded files/media | Cloudflare R2 | Cloudflare R2, including Payload media |
| Transactional email | Resend | Resend |
| Website/blog content | AI edits repository content | Separate Payload CMS host |
| CMS editor login | No CMS dashboard initially | Payload built-in editor accounts |
| Payments if needed | Optional Stripe hosted checkout | Optional Stripe custom checkout |

## Ownership rules

Starter's Worker owns custom application endpoints, authorization, webhooks, upload/download permission checks and application email orchestration. Supabase supplies database and authentication; Supabase Edge Functions are not the default custom backend. Supabase auth email uses the selected Resend SMTP path. Customer identity still needs a separate permission check before accessing a record or file.

Advanced's SvelteKit server functions on Vercel own custom application operations and WorkOS customer sessions. Payload owns CMS operations and media/editor permissions on a separate Next.js-based CMS host; Payload's built-in editor login remains separate from WorkOS app login. Payload's Next.js runtime does not change the customer application's SvelteKit framework. Review their actual database access boundaries separately.

R2 stores file bytes. Supabase stores Starter application file records and ownership; Neon stores Advanced application records, while Payload owns its CMS media records. Private uploads need server authorization before access or issuing a link. Deliberately public media stays separated from private material. A bucket URL or authenticated session alone is not permission to read every file. Starter uses Worker R2 bindings for server operations and the S3 path when signing URLs; Advanced uses R2's S3-compatible API and Payload's selected S3 storage adapter. These are implementation boundaries; package presence does not establish configured or working live integrations.

Resend is transactional only. Do not add newsletters, broadcasts, marketing sends, audience automation or sales outreach to this provider boundary. Advanced app mail belongs to SvelteKit; WorkOS authentication mail follows its selected Resend integration and Payload uses its selected email adapter for CMS mail. Newsletter delivery and a background-job runner remain undecided; do not invent providers. A proposed outbox is design guidance, not an installed queue.

Optional Stripe does not imply payments are required in every project. Starter begins with hosted checkout; Advanced may use custom checkout. Webhook checks and server-side ownership remain required in the accepted implementation scope.

The Starter platform Playbooks provide local implementation recipes. Exact installed versions, live security settings, successful builds and deployments still require project-specific evidence. This document establishes neither execution nor release permission.
