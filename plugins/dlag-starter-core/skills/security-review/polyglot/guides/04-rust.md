# 04 Rust (Axum, Actix)

> **Read-only method.** Security Review uses Read, Grep, Glob and Skill only. Commands below are inert reference for a separately authorized caller with the required tools. Do not execute, save files, install, browse, read credentials, contact providers, or alter Git from this role. Return findings in chat. Use the local [review contract](../references/review-contract.md) for scope, data and output restrictions.

> **Conditional evidence only.** This language/framework is outside Starter launch support. Read this catalog only when the owner supplied existing code in that ecosystem; do not scaffold, install, choose or deploy it. Version-sensitive defaults require confirmation for the supplied runtime. Otherwise mark this catalog N/A and retain transferable controls in the Workers backend review.


For every path under stack id `rust`. Loads [../references/ecosystems/rust.md](../references/ecosystems/rust.md) and [../references/cross-cutting/tool-commands.md](../references/cross-cutting/tool-commands.md).

## Steps

1. **Identify the framework and data layer** from `detect.json.details.rust[].frameworks` (axum, actix-web, rocket, sqlx, diesel, sea-orm).
2. **Do not build the project** unless the run allows it: `cargo build`, `cargo check`, and osv-scanner Rust call analysis compile code and run build scripts. If you do, only in the copy [primary reference](https://github.com/rustsec/rustsec/tree/main/cargo-audit) [primary reference](https://google.github.io/osv-scanner/usage/).
3. **Map routes and layers.** Axum: `Router::new().route(...)`, `.layer(...)`, `.route_layer(...)`, `middleware::from_fn`; extractors that require a user (custom `FromRequestParts`). Actix: `App::new().service(...)`, `.wrap(...)`, `web::scope`. Record which routes sit behind an auth layer or an auth extractor. Framework defaults for CSRF, body limits, and extractors are a thin spot: report what the code registers [version-sensitive research notes](../references/research/distilled-polyglot-security.md).
4. **Run the checklist R1 to R13** with the reference's `rg` blocks and read each production hit.
5. **SQL.** `query!` macros are checked and bound; `sqlx::query(&format!(...))`, `sql_query(format!(...))`, and `QueryBuilder::push` with user values are the targets (R1, R2) [primary reference](https://docs.rs/sqlx/latest/sqlx/macro.query.html).
6. **Paths.** `Path::join` with a user value replaces the base when the value is absolute, and `..` escapes it; check for canonicalize plus `starts_with` (R4).
7. **Commands and SSRF.** `Command::new("sh").arg("-c")` with user data (R3); `reqwest` with user URLs (R5) [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html) [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html).
8. **Panics and unsafe.** `unwrap` / `expect` on request-derived values let a client crash a worker or spam errors (R9, `low` to `medium`); `unsafe` in request paths needs a manual review note (R8).
9. **Dependencies.** osv-scanner on Cargo.lock, or `cargo audit --file` from outside the project (guide 10) [primary reference](https://github.com/rustsec/rustsec/tree/main/cargo-audit).
10. **Write findings** per guide 14 with `tags: ["rust", "<framework>", "<class>"]`.

## Done when

Every route has an auth verdict, every checklist item has a result in notes, every production hit was read, and any compile step that ran is recorded in notes.

## Sources

[primary reference](https://docs.rs/sqlx/latest/sqlx/macro.query.html), [primary reference](https://github.com/rustsec/rustsec/tree/main/cargo-audit), [primary reference](https://google.github.io/osv-scanner/usage/), [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html), [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html)
