# 02. React Server Components and Server Functions

> Scope: read supplied local evidence with Read/Grep/Glob/Skill and return guidance in chat. The Python helpers, commands, writes, builds, probes and tests below are optional source for a separately authorized caller. If helper output is unavailable, trace the listed checks manually and mark the execution gap. No installation, credential access, provider operation or new assistant/stack is authorized.

> Version qualification: numeric advisory/version/maintenance data is a dated 2026-09-30 offline snapshot, not a current vulnerability database or a safe-version recommendation. Confirm actual installed features, deployment and current primary advisories before promoting a snapshot candidate. Framework SSR does not imply RSC; no RSC runtime, alternate router, MDX engine, sanitizer or telemetry dependency is selected here.

Run when guide 00 found an RSC runtime or any `'use server'` outside Next.js. Two questions: is the RSC runtime itself patched, and does every Server Function behave like a public endpoint should?

References: [checks-rsc.md](../references/checks-rsc.md) (RC-01 to RC-10), [advisory-table.md](../references/advisory-table.md), [detection-patterns.md](../references/detection-patterns.md), [finding-rules.md](../references/finding-rules.md).

## Background the reviewer must keep straight

- CVE-2025-55182 ("React2Shell") was unauthenticated RCE in react-server-dom-webpack, -parcel, and -turbopack 19.0.0, 19.1.0, 19.1.1, 19.2.0. Apps that support RSC were exposed even with no Server Functions. Six DoS advisories and one source-exposure advisory followed through 2026-07; the snapshot floor recorded at 2026-09-30, not a current safety guarantee is 19.0.8, 19.1.9, 19.2.8, or 19.3.x.
- @vitejs/plugin-rsc vendors its own react-server-dom-webpack. Check the plugin version (floor 0.5.29), not only the lockfile entry for react-server-dom-webpack.
- Do not describe exploit mechanics in findings. The advisories do not publish them; neither do we.

## Procedure

1. **Runtime (RC-01).** Take the RSC version findings from guide 00. For each, prove the server runs: find the server entry that imports `react-server-dom-*/server`, the `rsc()` plugin in `vite.config.*`, or the framework (Waku, rwsdk, React Router RSC, `@parcel/rsc`), and the start script or Dockerfile that serves it. Traced to the deployed process: `confirmed`. Installed and imported but deployment unknown: keep `likely`.
2. **Inventory Server Functions.** From `sink-candidates.json` (RC-02), list every file with a module-level `'use server'` and every inline `'use server'` function. For each, record name, file, line, exported or inline, and what it does (read, write, external call). Count them for metrics.
3. **Read each function's first statements** (RC-02). Is there a server-side session lookup and an ownership or role check before any read or write? Follow wrappers (`authedAction`, `withUser`) to their definition and confirm they read the session on the server. A check in the component that renders the form does not count.
4. **Read argument handling** (RC-03): is every argument validated (type, length, allowed keys) before use? Look for `Object.fromEntries(formData)` or object spreads into writes, ids used without ownership checks, and arguments reaching SQL, file paths, shell, `fetch` URLs, or `eval`. Hand the sink itself to the generic or polyglot pass when it is not React-specific, but keep the entry-point finding here.
5. **Module-level exports** (RC-04): in each `'use server'` file, list exports that are not intended as actions (getters, internal helpers). Each is an endpoint.
6. **Secrets and closures** (RC-05): look for hardcoded secrets inside Server Function bodies (on vulnerable runtimes they were readable through CVE-2025-55183) and for inline Server Functions that capture outer variables. Read `vite.config.*` for `enableActionEncryption: false` or a hardcoded `defineEncryptionKey`. In hand-rolled react-server-dom servers, assume no closure encryption.
7. **Server-to-client props** (RC-06): for each Client Component rendered by a Server Component, read the props. Flag whole records, secrets, and `process.env` values. Note `server-only` imports and taint calls as positive signals, not as proof of safety.
8. **Request handling** (RC-07): in custom servers, read the RSC POST handler for an Origin or `Sec-Fetch-Site` check and the session cookie's `SameSite`. Check Waku and React Router versions against their CSRF advisories.
9. **Errors and returns** (RC-08), **taint and experimental builds** (RC-09), **dev server exposure** (RC-10): quick reads of catch blocks, return values, lockfile versions, start scripts.
10. **Rate and write** with the check's severity lines and finding-rules.md. Tag each finding with its check id and `rsc`.
11. **Record measures:** RSC runtime version and open advisories, Server Functions total, Server Functions without a server-side auth check, Server Functions without argument validation.

## Done when

Every Server Function in scope is classified (checked, finding, or not reachable with the reason), the runtime finding has a deployment trace or a stated gap, and measures are recorded.

Primary technical reference locations: [source index](../references/official-sources.md). Recheck the actual installed version and trust path.
