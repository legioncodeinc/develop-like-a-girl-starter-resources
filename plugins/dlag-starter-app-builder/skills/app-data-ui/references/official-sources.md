# Official sources

Reviewed 2026-10-20. Inspect the project's pinned major version before adapting an API. These sources support the stated boundaries; they do not prove this project's behavior.

- [React Router server loaders](https://reactrouter.com/start/framework/data-loading): server loaders return data to route components; do not return secrets.
- [Supabase row-level security](https://supabase.com/docs/guides/database/postgres/row-level-security): authorization at the database boundary.
- [Supabase full-text search](https://supabase.com/docs/guides/database/full-text-search): indexed database text search and bound query inputs.
- [HTTP Semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html): section 9 methods and section 15 response status semantics.
- [AbortSignal timeout](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static): bounded request duration; verify Worker runtime support.

Imported source contributions and exact hashes are recorded in the generated plugin's PROVENANCE.md. Spreadsheet and tour adaptations are intentionally narrower than their imported source entrypoints; no source pricing or unverified library-version claims are carried over.
