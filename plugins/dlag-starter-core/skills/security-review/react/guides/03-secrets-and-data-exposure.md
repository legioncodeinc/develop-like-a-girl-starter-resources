# 03. Secrets and data exposure

> Scope: read supplied local evidence with Read/Grep/Glob/Skill and return guidance in chat. The Python helpers, commands, writes, builds, probes and tests below are optional source for a separately authorized caller. If helper output is unavailable, trace the listed checks manually and mark the execution gap. No installation, credential access, provider operation or new assistant/stack is authorized.

> Version qualification: numeric advisory/version/maintenance data is a dated 2026-09-30 offline snapshot, not a current vulnerability database or a safe-version recommendation. Confirm actual installed features, deployment and current primary advisories before promoting a snapshot candidate. Framework SSR does not imply RSC; no RSC runtime, alternate router, MDX engine, sanitizer or telemetry dependency is selected here.

Anything sent to a browser is readable by that recipient and authorized same-origin scripts. Bundles/public variables are public assets; private RSC/API/SSR responses still require actor-specific server authorization. This guide finds secrets and over-shared data on that path.

References: [checks-secrets-and-data.md](../references/checks-secrets-and-data.md) (SD-01 to SD-09), [detection-patterns.md](../references/detection-patterns.md), [finding-rules.md](../references/finding-rules.md).

## Procedure

1. **Know the exposure rule for this build tool** from the stack table: Vite exposes `VITE_*` (or the configured `envPrefix`), Create React App exposes `REACT_APP_*`, Expo exposes `EXPO_PUBLIC_*`. Read `vite.config.*` (or webpack config) for `envPrefix` and `define` (SD-03).
2. **List client-exposed variables** (SD-01): from supplied sanitized environment variable-name evidence (never opening actual `.env*` or `.dev.vars*` files), from `import.meta.env.*` and `process.env.REACT_APP_*` references, and from CI or platform config files in the repo. Classify each as secret or public using the check's rules. Do not print values; keep the `[REDACTED]` without revealing any prefix.
3. **Scan client code for credentials** (SD-02, SD-08): use the fully redacted SD-02 path/line candidates and `dangerouslyAllowBrowser`. For each hit, confirm the file ships to the browser.
4. **Inspect supplied actual build artifacts** if available in the authorized scope. The Specialist does not execute a build or read credential files. A separately authorized caller can use the project's existing build command in its task-created copy with a timeout and sanitized capture. Preserve exact build/candidate/mode evidence. If unavailable, record "bundle not inspected; findings come from source only" and do not substitute source grep for production artifact inspection.
5. **Web storage** (SD-04): list every `setItem` with token-like keys and the auth library's persistence setting. Cross-reference with guide 01 results: any confirmed XSS turns stored tokens into a chain (name it in both findings).
6. **Overfetching** (SD-05): for each data loader, API route in scope, or Server Component, compare returned fields with what the UI renders. Flag fields the user is not entitled to.
7. **Source maps** (SD-06) and **logs** (SD-09): read build config and grep logs.
8. **SSR shared state** (SD-07): open the server entry; look for module-level stores or caches written per request.
9. **Rate and write** per finding-rules.md. Secrets in evidence are always redacted.
10. **Record measures:** client-exposed variables total, of which secret; credentials in client code; token storage location.

## Handoffs

- Secrets in git history or server-only code: the generic the root Security Review method owns repository-wide secret scanning. Mention overlaps in notes rather than duplicating.
- Database row-level security or backend authorization behind exposed anon keys: hand to the owning reviewer (for Supabase apps, a separately scoped actual Supabase policy reviewer when installed) via notes.

Primary technical reference locations: [source index](../references/official-sources.md). Recheck the actual installed version and trust path.
