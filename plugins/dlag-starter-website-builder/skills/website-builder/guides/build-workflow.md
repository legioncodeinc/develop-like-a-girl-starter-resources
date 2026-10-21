# Build in small slices

Read the supplied brand and content first. Capture audience, primary action, required pages, domain and available assets in the brief. Unknown business claims, prices, legal text and testimonials remain explicit placeholders. Use neutral styling only when the owner has not provided a brand; record that choice. Do not ask for a full questionnaire if the brief already answers it.

Start with homepage, navigation and footer. Add services/about/contact only as requested, then a blog index and article route if selected. A useful small-business fixture has homepage, services, contact, blog index and one article. A working article deep link must render on its first server response. Unknown slugs return an actual 404.

Inspect the scaffold's installed framework APIs before editing. Merge settings and route entries rather than replacing populated files. Keep framework SSR enabled with its Cloudflare Vite integration. The React Foundation and React Router SSR Core Playbooks own React boundaries and request-context conventions. Do not convert to a client-only SPA or add another backend. A file tree or ssr flag alone does not establish SSR.

Use `dlag-starter-core:shadcn-react` for component mechanics, `dlag-starter-core:design-foundation` for tokens/layout, `dlag-starter-core:ui-primitives` for interactive semantics and `dlag-starter-core:asset-delivery` for fonts/images. Use `dlag-starter-core:r2-storage` only when the brief needs stored media. Public marketing images can use selected public delivery; private files require server authorization on every access. Do not add uploads to a brochure site by default.

Use `dlag-starter-core:data-foundation` and `dlag-starter-core:supabase-platform` for data schemas and local migration drafts. A public contact form normally does not require visitor login. Draft narrowly scoped server-side lead persistence, no public lead listing and no arbitrary browser write access to a privileged outbox. Keep credentials and service-role values server-only. Auth is optional and uses `dlag-starter-core:identity` when selected.

Do not install a new dependency, configure an account or apply a migration during ordinary local authoring. Record any missing prerequisite and continue independent local slices. If no shell or browser tools are available, Write/Edit can still produce requested code and readback evidence. Report unexecuted checks plainly; do not ask permission to repeat a local edit the owner already requested.
