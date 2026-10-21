# Checks: supply chain, React version behavior, and AI-generated code patterns (SC, AI)

> Scope: read supplied local evidence with Read/Grep/Glob/Skill and return guidance in chat. The Python helpers, commands, writes, builds, probes and tests below are optional source for a separately authorized caller. If helper output is unavailable, trace the listed checks manually and mark the execution gap. No installation, credential access, provider operation or new assistant/stack is authorized.

> Version qualification: numeric advisory/version/maintenance data is a dated 2026-09-30 offline snapshot, not a current vulnerability database or a safe-version recommendation. Confirm actual installed features, deployment and current primary advisories before promoting a snapshot candidate. Framework SSR does not imply RSC; no RSC runtime, alternate router, MDX engine, sanitizer or telemetry dependency is selected here.

> Code-pair qualification: vulnerable/fixed fragments are target-review excerpts, not a complete application. Names such as User, db, requireUser, validators and sanitizer imports require the actual project types, verified implementations and already-selected installed package/runtime. Do not install a dependency or call an invented API to make an excerpt work. All code pairs remain uncompiled/unexecuted here.

Load when: running guide 06, and while running any other guide on an app that looks AI-generated (Lovable, Bolt, v0, Replit, Cursor, or Claude Code scaffolds; `README` or commit messages that say so; many TODOs where security code should be).

---

## SC-01 Vulnerable React-ecosystem library versions

- **Detect:** `scripts/react_version_check.py` covers react-router, react-router-dom, @react-router/node, @react-router/express, waku, next-mdx-remote, marked, dompurify, serialize-javascript (and the RSC packages in RC-01).
- **Confirm:** the script states the feature precondition for each advisory and whether its source scan found it. Read the code to confirm unmet preconditions before raising confidence (for example, find the `redirect()` in a loader that uses user input for CVE-2026-22029).
- **False positive:** the vulnerable code path is not used (Declarative Mode only for most React Router advisories).
- **Severity:** the script's value, capped at `medium` while confidence is `possible`.
- **Vulnerable:** `react-router@7.9.0` in Framework Mode.
- **Fixed:** `react-router@7.18.0` or later (7.18.2 when unstable RSC APIs are used).
- **Refs:** CWE-1395, OWASP A03:2025, [advisory-table.md](advisory-table.md), [react router advisories.md.](https://github.com/remix-run/react-router/security/advisories)

## SC-02 Unmaintained or deprecated React packages

- **Detect:** script reports react-scripts (Create React App), react-html-parser, draft-js. Also read `package.json` for other packages whose last release is years old and that touch HTML, auth, or crypto.
- **Severity:** `low` (CWE-1104). Raise only if the package is also an active sink (react-html-parser on untrusted input is RX-07).
- **Vulnerable:** `"react-scripts": "5.0.1"`
- **Fixed:** migrate to Vite or a framework (the React team's recommended paths).
- **Refs:** CWE-1104, OWASP A03:2025, [cra env and sunset](https://react.dev/blog/2025/02/14/sunsetting-create-react-app), [html react parser readme.md.](https://github.com/remarkablemark/html-react-parser#is-this-xss-safe)

## SC-03 React 18 or older (behavior that changes ratings)

- **Detect:** script `info` finding when `react` resolves below 19.
- **Use:** apply RX-02 at full severity. Nothing else changes in ratings. Record the version as a metrics measure.
- **Refs:** [react dom url sanitization source.md.](https://github.com/facebook/react/blob/main/packages/react-dom-bindings/src/shared/sanitizeURL.js)

## SC-04 React 19 behavior changes that matter for security

| Change | Version | Effect on the audit | Source |
| --- | --- | --- | --- |
| `javascript:` URLs replaced with a throwing URL in href, src, action, formAction, xlinkHref, object data | 19.0.0 | RX-02 drops to low for these attributes when only React renders the URL | [React DOM URL sanitizer implementation](https://github.com/facebook/react/blob/main/packages/react-dom-bindings/src/shared/sanitizeURL.js) |
| Server Functions, Actions, `useActionState`, form `action` functions | 19.0.0 | New POST endpoints; RC-02, RC-03, RC-07 apply | [React Server Function arguments and authorization](https://react.dev/reference/rsc/use-server) |
| RSC runtime advisories in every 19.0, 19.1, 19.2 line | 2025-12 to 2026-07 | RC-01 | [React primary security advisories](https://github.com/facebook/react/security/advisories) |
| Trusted Types objects passed through unchanged | 19.3.0 | RX-09: passthrough policies are no longer needed for React to work | [React release history, qualify installed behavior](https://github.com/facebook/react/releases) |
| Server Function `toString` and Promise cycle patches | 19.3.0 | Part of the RSC hardening line | same |

## SC-05 Experimental, canary, or unpinned RSC runtime

- **Detect:** `react@experimental`, `0.0.0-experimental-*`, `19.x.y-canary-*` in the lockfile; caret or tilde ranges on `react-server-dom-*` in a hand-rolled RSC setup.
- **Confirm:** React says experimental builds are not for production, and that the bundler APIs behind Server Functions do not follow semver, so frameworks should pin.
- **Severity:** `low`.
- **Fixed:** pin `react`, `react-dom`, and `react-server-dom-*` to the same patched stable version.
- **Refs:** CWE-1104, [react docs taint apis](https://react.dev/reference/react/experimental_taintObjectReference), [react docs use server and server functions.md.](https://react.dev/reference/rsc/use-server)

---

## AI-generated React code: failure patterns and detection heuristics

Generated-code pattern priority does not establish authorship or target risk. Unsupported historical prevalence percentages and sample totals are not repeated here; the ten concrete mechanisms and their source-to-sink confirmation rules remain below.

| Id | Pattern | Detect | Confirm, then file under | Typical severity |
| --- | --- | --- | --- | --- |
| AI-01 | Placeholder security: `// TODO: add auth`, `// FIXME validate` next to real handlers | sink_scan AI-01 | The handler is reachable and the TODO is where the check should be. File under RC-02 or AR-01 | high when it guards writes |
| AI-02 | Authorization helper that always allows (`isAdmin() { return true }`, `verifyToken = () => true`) | sink_scan AI-02 | Helper is called on a real path. File under RC-02 or AR-01 | critical or high |
| AI-03 | Provider keys in the client: `VITE_OPENAI_API_KEY`, `dangerouslyAllowBrowser: true`, Stripe secret in a component | sink_scan SD-01, SD-02, SD-08 | Key class (SD-01). File under SD-01, SD-02, SD-08 | critical |
| AI-04 | Security theater: a `sanitize()` helper that returns its input, a regex sanitizer, a DOMPurify import that is never called, or calls to APIs that do not exist in the installed package | read every helper named sanitize, escape, validate, auth; check the import resolves to a real export | File under RX-08 or RC-03 | high when on an untrusted path |
| AI-05 | Client-only gating copied from tutorials (`ProtectedRoute` with no server check) | sink_scan AR-01 | Backend handler lacks its own check. File under AR-01 | high |
| AI-06 | Whole-row fetches and `select *` passed to the UI or to Client Components | read loaders, API routes, Server Components | Fields beyond need. File under SD-05 or RC-06 | medium or high |
| AI-07 | Module-level `'use server'` files full of helpers, because the generator put all server code in one file | sink_scan RC-02, then list exports | File under RC-04 | high |
| AI-08 | Tokens in localStorage because the tutorial did it | sink_scan SD-04 | File under SD-04 | medium |
| AI-09 | `dangerouslySetInnerHTML` to render model output or markdown | sink_scan RX-01, RX-05 | Model output can carry user-injected HTML. File under RX-01 or RX-05 | high when other users see it |
| AI-10 | Source maps on in production builds | sink_scan SD-06 | File under SD-06 | low |

Rules for AI patterns:

1. The pattern is never the finding. The confirmed weakness under its own check id is the finding; tag it `ai-pattern` so the brief can count them.
2. Never call code "AI-generated" in a finding title. Describe what the code does. Authorship is not evidence.
3. Removed protections: AI edits sometimes delete a check that existed before. When `git log -p` (read-only, in the throwaway copy) shows a check removed in a recent commit, cite that commit in `evidence`.

Primary technical reference locations: [source index](official-sources.md). Recheck the actual installed version and trust path.
