# Distilled research: React 18 and 19 application security

> Scope: read supplied local evidence with Read/Grep/Glob/Skill and return guidance in chat. The Python helpers, commands, writes, builds, probes and tests below are optional source for a separately authorized caller. If helper output is unavailable, trace the listed checks manually and mark the execution gap. No installation, credential access, provider operation or new assistant/stack is authorized.

> Version qualification: numeric advisory/version/maintenance data is a dated 2026-09-30 offline snapshot, not a current vulnerability database or a safe-version recommendation. Confirm actual installed features, deployment and current primary advisories before promoting a snapshot candidate. Framework SSR does not imply RSC; no RSC runtime, alternate router, MDX engine, sanitizer or telemetry dependency is selected here.

Historical offline analysis context: 2026-03-30 through 2026-09-30. These dates describe the dated reference material, not a claim that this migration fetched those pages or verified current advisory ranges. The present author checked selected official React security/API documentation; every current-version/maintenance claim still needs actual primary evidence.

## 1. React Server Components runtime advisories

| Fact | Source |
| --- | --- |
| CVE-2025-55182 ("React2Shell") is unauthenticated RCE from a crafted request to any Server Function endpoint, CVSS 10.0, CWE-502 | [react blog cve 2025 55182](https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components), [github react security advisories](https://github.com/facebook/react/security/advisories) |
| Apps that support RSC are exposed even with no Server Functions defined | [react blog cve 2025 55182](https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components) |
| Affected packages: react-server-dom-webpack, -parcel, -turbopack; not `react` or `react-dom` themselves | [react blog cve 2025 55182](https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components) |
| Apps with no server, or no RSC-capable framework or bundler, are not affected | [react blog cve 2025 55182](https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components) |
| The 2025-12 patches 19.0.3, 19.1.4, 19.2.3 were declared incomplete | [react blog dos and source exposure](https://github.com/facebook/react/security/advisories) |
| CVE-2025-67779 affects only 19.0.2, 19.1.3, 19.2.2 (regression in the first DoS fix) | [github react security advisories](https://github.com/facebook/react/security/advisories) |
| CVE-2025-55183 leaks Server Function source, so hardcoded secrets leak; `process.env` values do not | [react blog dos and source exposure](https://github.com/facebook/react/security/advisories) |
| npm deprecation flags lag: 19.0.6 to 19.2.7 carry none yet are affected by CVE-2026-44907 | [npm registry react server dom versions](https://github.com/facebook/react) |
| react-server-dom-parcel has no 19.0.x line | [npm registry react server dom versions](https://github.com/facebook/react) |
| @vitejs/plugin-rsc vendors react-server-dom-webpack; floor 0.5.29; two extra dev-server advisories (RCE CVE-2025-67489, file read CVE-2025-68155) | [vite plugin rsc advisories](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-rsc) |
| Frameworks named as affected: next, react-router, waku, @parcel/rsc, @vitejs/plugin-rsc, rwsdk | [react blog cve 2025 55182](https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components) |

Thin spot: no advisory text explains the internals of the RCE beyond "deserialization", so the reviewer must not describe exploit mechanics in findings.

## 2. Server Functions as endpoints

| Fact | Source |
| --- | --- |
| Every `'use server'` export is callable from the client by id; module-level directive exports all functions | [react docs use server and server functions](https://react.dev/reference/rsc/use-server) |
| React: "Always treat arguments to Server Functions as untrusted input and authorize any mutations" | [react docs use server and server functions](https://react.dev/reference/rsc/use-server) |
| Arguments accept FormData, plain objects, Maps, Sets, typed arrays, Promises | [react docs use server and server functions](https://react.dev/reference/rsc/use-server) |
| Closure-captured values travel as bound arguments; @vitejs/plugin-rsc encrypts them by default and allows `enableActionEncryption: false` | [vite plugin rsc readme closure encryption](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-rsc) |
| React's own docs promise no closure encryption; hand-rolled setups must not assume it | [react docs use server and server functions](https://react.dev/reference/rsc/use-server) (absence), [vite plugin rsc readme closure encryption](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-rsc) |
| CSRF on action dispatch was a real gap: Waku before 1.0.0-beta.1, React Router before 7.12.0 (Framework and RSC modes) and RSC mode before 7.18.2 | [waku advisories](https://github.com/wakujs/waku/security/advisories), [react router advisories](https://github.com/remix-run/react-router/security/advisories) |
| Taint APIs are experimental only, only in RSC, and are bypassed by cloning or deriving values | [react docs taint apis](https://react.dev/reference/react/experimental_taintObjectReference) |
| Passing `process.env.X` as a prop to a Client Component leaks it | [react docs taint apis](https://react.dev/reference/react/experimental_taintObjectReference) |

## 3. XSS sinks and React version behavior

| Fact | Source |
| --- | --- |
| React 19 rewrites `javascript:` URLs in `href`, `src`, `action`, `formAction`, `xlinkHref`, and `<object data>` to a throwing URL | [react dom url sanitization source](https://github.com/facebook/react/blob/main/packages/react-dom-bindings/src/shared/sanitizeURL.js), [react release notes 19 2 x and 19 3](https://github.com/facebook/react/releases) |
| React 18 stable renders `javascript:` URLs; only a development warning | [react dom url sanitization source](https://github.com/facebook/react/blob/main/packages/react-dom-bindings/src/shared/sanitizeURL.js) |
| The examined source behavior does not supply a blanket policy for `data:` URLs or `srcDoc`; verify the actual installed renderer and sink | [react dom url sanitization source](https://github.com/facebook/react/blob/main/packages/react-dom-bindings/src/shared/sanitizeURL.js) |
| OWASP names both React gaps: unsanitized `dangerouslySetInnerHTML`, and `javascript:` or `data:` URLs | [cheatsheet xss dom xss redirects](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) |
| `dangerouslySetInnerHTML` with untrusted markup is "trivial" XSS per React docs | [react docs dangerouslysetinnerhtml](https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html) |
| React 19.3.0 passes Trusted Types objects through to sinks; earlier versions stringified them | [react release notes 19 2 x and 19 3](https://github.com/facebook/react/releases), [mdn trusted types](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API) |
| Trusted Types are enforced only with CSP `require-trusted-types-for 'script'` | [mdn trusted types](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API) |
| DOM sinks: `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write`; code sinks `eval`, `new Function`, string `setTimeout` | [cheatsheet xss dom xss redirects](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html), [mdn trusted types](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API) |
| react-markdown is safe by default; `rehype-raw` is for trusted markdown only; unsafe `urlTransform` or plugins reintroduce XSS; fix with `rehype-sanitize` | [react markdown readme security](https://github.com/remarkjs/react-markdown#security) |
| marked does not sanitize output | [marked readme and advisories](https://github.com/markedjs/marked/security/advisories) |
| html-react-parser "is not XSS safe" | [html react parser readme](https://github.com/remarkablemark/html-react-parser#is-this-xss-safe) |
| MDX compiles to code; next-mdx-remote 4.3.0 to below 6.0.0 allowed RCE from untrusted MDX (CVE-2026-0969) | [mdx next mdx remote cve 2026 0969](https://github.com/hashicorp/next-mdx-remote/security/advisories) |
| Modifying HTML after DOMPurify can void sanitization; server use needs current jsdom, not happy-dom | [dompurify readme and advisories](https://github.com/cure53/DOMPurify) |
| ESLint `react/no-danger` and `react/jsx-no-script-url` only match literals | [eslint plugin react security rules](https://github.com/jsx-eslint/eslint-plugin-react) |

## 4. SSR and hydration injection

| Fact | Source |
| --- | --- |
| `JSON.stringify` state inside a `<script>` is injectable; escape `<` as the literal `\u003c` sequence or use serialize-javascript | [redux server rendering security](https://redux.js.org/usage/server-rendering#security-considerations) |
| React escapes `<script` and `</script` in `bootstrapScriptContent`, but says untrusted content must still be made safe first | [react dom server stream options and escaping](https://react.dev/reference/react-dom/server/renderToReadableStream) |
| `<script dangerouslySetInnerHTML>` gets no escaping | [react dom server stream options and escaping](https://react.dev/reference/react-dom/server/renderToReadableStream), [react docs dangerouslysetinnerhtml](https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html) |
| Create the store per request on the server | [redux server rendering security](https://redux.js.org/usage/server-rendering#security-considerations) |
| serialize-javascript below 7.0.5 has open high and medium advisories | [serialize javascript advisories](https://github.com/yahoo/serialize-javascript/security/advisories) |
| `nonce` option exists for CSP on streamed scripts | [react dom server stream options and escaping](https://react.dev/reference/react-dom/server/renderToReadableStream) |

## 5. Secrets and data exposure

| Fact | Source |
| --- | --- |
| `VITE_*` values are bundled into client code; do not put secrets there | [vite env and envprefix](https://vite.dev/guide/env-and-mode) |
| Vite public prefixes and broad define replacement can expose values; actual installed validation behavior and client bundle must be inspected | [vite env and envprefix](https://vite.dev/guide/env-and-mode) |
| `REACT_APP_*` values are embedded in the CRA build; CRA is deprecated with no active maintainers | [cra env and sunset](https://react.dev/blog/2025/02/14/sunsetting-create-react-app) |
| `dangerouslyAllowBrowser: true` in the OpenAI or Anthropic SDK exposes the secret key | [ai sdk dangerously allow browser](https://github.com/openai/openai-node#requirements) |
| Key patterns for Stripe, Anthropic, OpenAI, Google, GitHub, AWS, Slack, private keys, JWTs | [gitleaks default rules](https://github.com/gitleaks/gitleaks/blob/master/config/gitleaks.toml) |
| Do not keep session identifiers in localStorage; one XSS reads all of it | [cheatsheet html5 security](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html) |

## 6. Auth, routing, and client trust

| Fact | Source |
| --- | --- |
| Client-side enforcement of server-side security is CWE-602 (A06:2025) | [top10 2025 and cwe mapping](https://top10.owasp.org/2025/) |
| postMessage receivers must check `origin` exactly and validate `data`; senders must not use `*` | [mdn postmessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#security_concerns), [cheatsheet html5 security](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html) |
| Substring origin checks such as `indexOf(".owasp.org")` are bypassable | [cheatsheet html5 security](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html) |
| CSRF defenses: Fetch Metadata with Origin fallback, SameSite, custom headers, tokens not only in cookies | [cheatsheet csrf](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) |
| Open redirects enable phishing and access-control bypass; allow-list targets | [cheatsheet xss dom xss redirects](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) |
| The offline snapshot records mode-specific React Router advisory candidates; installed versions and current primary ranges must be checked | [react router advisories](https://github.com/remix-run/react-router/security/advisories) |

## 7. Supply chain and AI-generated code

| Fact | Source |
| --- | --- |
| A03:2025 Software Supply Chain Failures maps CWE-1104 and CWE-1395 | [top10 2025 and cwe mapping](https://top10.owasp.org/2025/) |
| react-html-parser last release 2017; draft-js archived; react-helmet last release 2020 | [html react parser readme](https://github.com/remarkablemark/html-react-parser#is-this-xss-safe) |
| Recurring AI patterns: placeholder logic, unfiltered input, secret exposure; calls to nonexistent security APIs | [vibe coded apps security studies](https://react.dev/learn) |
| Iterative AI edits sometimes remove existing protections; static analysis misses most design and authorization flaws (thesis) | [vibe coded apps security studies](https://react.dev/learn) |
| React says frameworks implementing Server Functions should pin a React version (bundler APIs do not follow semver) | [react docs use server and server functions](https://react.dev/reference/rsc/use-server) |

## 8. Lockfile parsing

| Fact | Source |
| --- | --- |
| package-lock v2 and v3 use a `packages` map keyed by `node_modules/<name>`; v1 nests `dependencies` | [npm pnpm yarn formats](https://docs.npmjs.com/cli/configuring-npm/package-lock-json) |
| pnpm v9 keys `<name>@<version>`, snapshots add peer suffixes; v6 uses `/name@ver`, v5 `/name/ver` | [npm pnpm yarn formats](https://docs.npmjs.com/cli/configuring-npm/package-lock-json) |
| yarn classic: `name@range:` then `version "x"`; Berry: `"name@npm:range":` then `version: x` | [npm pnpm yarn formats](https://docs.npmjs.com/cli/configuring-npm/package-lock-json) |
| bun lockfiles not covered | [npm pnpm yarn formats](https://docs.npmjs.com/cli/configuring-npm/package-lock-json) |

## Conflicts and thin spots

- OWASP 2025 maps no category to CWE-400 or CWE-770; DoS findings cite the CWE plus A03 via CWE-1395 for the outdated dependency [React DOM URL sanitizer implementation](https://github.com/facebook/react/blob/main/packages/react-dom-bindings/src/shared/sanitizeURL.js).
- Some advisories in the GitHub pull carry no CWE (plugin-rsc dev-server file read, React Router Host header, marked recursion). The CWE values the script uses for those rows are assigned by this method and marked in `references/advisory-table.md`.
- `data:` URL handling in browsers is not covered by the archive; such cases stay `needs-manual-review` and never exceed `possible` without a working reproduction [Vite public environment rules](https://vite.dev/guide/env-and-mode).
- The `define: { 'process.env': process.env }` leak is an inference from Vite's documented `define` and `envPrefix` behavior, not a quoted rule [Generated-code patterns, not target or prevalence evidence](../../../guides/08-ai-generated-code-patterns.md).
- AI-code prevalence numbers come from a preprint and from community and vendor reports; use them for prioritizing checks, never as evidence in a finding [serialize-javascript primary advisories](https://github.com/yahoo/serialize-javascript/security/advisories).
- serialize-javascript's GHSA-5c6j shows an old CVE id; cite the GHSA id [Primary reference index](../official-sources.md).

Primary technical reference locations: [source index](../official-sources.md). Recheck the actual installed version and trust path.

## Exact script-state encoding mechanism

The HTML parser must not see a literal closing script tag inside serialized user state. Use an actual encoded replacement after JSON serialization, not a visual substitution of less-than with itself:

```js
const json = JSON.stringify(state).replace(/</g, '\\u003c');
const markup = `<script>window.__INITIAL_STATE__ = ${json}</script>`;
```

This partial server-shell example requires the actual trusted HTML template and CSP/response context. It is not a complete renderer. Prefer the framework's supported serialization path; it does not permit secrets in the selected state. The React/source examples here are not runtime-tested by this migration.
