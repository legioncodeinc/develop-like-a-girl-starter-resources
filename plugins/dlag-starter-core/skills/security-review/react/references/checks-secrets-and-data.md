# Checks: client-side secrets and data exposure (SD)

> Scope: read supplied local evidence with Read/Grep/Glob/Skill and return guidance in chat. The Python helpers, commands, writes, builds, probes and tests below are optional source for a separately authorized caller. If helper output is unavailable, trace the listed checks manually and mark the execution gap. No installation, credential access, provider operation or new assistant/stack is authorized.

> Version qualification: numeric advisory/version/maintenance data is a dated 2026-09-30 offline snapshot, not a current vulnerability database or a safe-version recommendation. Confirm actual installed features, deployment and current primary advisories before promoting a snapshot candidate. Framework SSR does not imply RSC; no RSC runtime, alternate router, MDX engine, sanitizer or telemetry dependency is selected here.

> Code-pair qualification: vulnerable/fixed fragments are target-review excerpts, not a complete application. Names such as User, db, requireUser, validators and sanitizer imports require the actual project types, verified implementations and already-selected installed package/runtime. Do not install a dependency or call an invented API to make an excerpt work. All code pairs remain uncompiled/unexecuted here.

Load when: running guide 03. The core idea: client bundles are public; RSC/API/SSR responses and web storage are readable by their receiving browser and scripts with that origin's authority. Correct authorization must still prevent another visitor receiving private responses. Redact every secret fully as `[REDACTED]`, without revealing any credential prefix.

The root Security Review method owns supplied scoped whole-operation/history exposure review. This reviewer owns the React-specific question: what reaches the browser.

---

## SD-01 Secret values in client-exposed environment variables

- **Detect:** `.env*` files and code references to `import.meta.env.VITE_*`, `process.env.REACT_APP_*`, `EXPO_PUBLIC_*`, `PUBLIC_*` whose names include SECRET, PRIVATE, PASSWORD, SERVICE_ROLE, TOKEN, API_KEY, ACCESS_KEY. If a built bundle exists in the throwaway copy (`dist/`, `build/`), grep it for the same values.
- **Confirm:** decide what the value is. Secret: server keys (Stripe `sk_`/`rk_`, OpenAI, Anthropic, database URLs, Supabase service role, signing secrets). Not secret (method judgment, confirm per vendor): values designed for browsers, such as Stripe `pk_` keys (outside the gitleaks Stripe rule), Firebase web config, a Supabase anon key when row-level security is on, analytics write keys. Read where the variable is used; a client-side `fetch` with `Authorization: Bearer ${import.meta.env.VITE_OPENAI_KEY}` confirms.
- **False positive:** publishable or anon keys whose server-side protections you have checked or explicitly handed off.
- **Severity:** live server secret in the client bundle: `critical` (illustrative ranking; actual impact and selected session design govern). Test-mode or low-privilege secret: `medium`. Secret-like name holding a public value: not a finding (note it).
- **Vulnerable:**
  ```ts
  // .env: VITE_OPENAI_API_KEY=sk-proj-****
  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: { Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}` }, ...
  ```
- **Fixed:** move the call behind your own server route that holds `OPENAI_API_KEY` (no `VITE_` prefix), authenticates the user, and rate limits; rotate the exposed key.
- **Refs:** CWE-798, CWE-200, OWASP A07:2025, [vite env and envprefix](https://vite.dev/guide/env-and-mode), [cra env and sunset.md.](https://react.dev/blog/2025/02/14/sunsetting-create-react-app)

## SD-02 Hardcoded credentials in client code

- **Detect:** key patterns (Stripe `sk_`/`rk_`, `sk-ant-api03-`, `sk-proj-`, `AIza`, `ghp_`, AWS `AKIA`, Slack `xoxb-`, PEM private keys, JWTs) in `src/`, `public/`, `index.html`, and built bundles.
- **Confirm:** the file ships to the browser (imported from client code, in `public/`, or present in the bundle). Classify the key as in SD-01.
- **False positive:** test fixtures never bundled; documented example placeholders; public keys.
- **Severity:** as SD-01.
- **Vulnerable:** `const stripe = new Stripe('sk_live_51H****');` in a component file.
- **Fixed:** delete from code, rotate the key, call Stripe from a server route.
- **Refs:** CWE-798, OWASP A07:2025, [gitleaks default rules.md.](https://github.com/gitleaks/gitleaks/blob/master/config/gitleaks.toml)

## SD-03 Build config that exposes all environment variables

- **Detect:** `envPrefix` set to a broad value or an array including unprefixed patterns; `define: { 'process.env': process.env }` or `define: { 'process.env': JSON.stringify(process.env) }`; webpack `DefinePlugin` with the whole `process.env`.
- **Confirm:** read the config and the deploy environment's variable names; any server secret present at build time ends up in the bundle.
- **Severity:** whole `process.env` defined into the client build: `critical` if the build environment holds server secrets (CI usually does), else `high`. Broad prefix: `medium`.
- **Vulnerable:** `export default defineConfig({ define: { 'process.env': process.env } })`
- **Fixed:** `define: { 'process.env.NODE_ENV': JSON.stringify(mode) }` and expose specific public values with `VITE_` names.
- **Refs:** CWE-200, CWE-526 (A02:2025 maps it), [vite env and envprefix.md.](https://vite.dev/guide/env-and-mode) The `define` leak is an inference from Vite's docs (see the distillation's thin spots).

## SD-04 Auth tokens in web storage

- **Detect:** `localStorage.setItem` or `sessionStorage.setItem` with keys containing token, jwt, auth, session, refresh, access; IndexedDB stores named like tokens; auth libraries configured with `persistSession` to localStorage.
- **Confirm:** a bearer or refresh token is stored where any script on the origin can read it. Raise severity when any XSS finding exists in the same app (they chain).
- **False positive:** non-secret UI state; short-lived tokens with httpOnly cookie refresh where the stored item is not a credential.
- **Severity:** refresh token or long-lived access token in localStorage: `medium`; `high` when the app also has a confirmed XSS (note the chain in both findings).
- **Vulnerable:** `localStorage.setItem('authToken', data.accessToken);`
- **Fixed:** have the server set the session in an `HttpOnly; Secure; SameSite=Lax` cookie and add CSRF protection (AR-05); keep only non-secret state in storage.
- **Refs:** CWE-922, OWASP A01:2025, [cheatsheet html5 security.md.](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html)

## SD-05 Overfetching: the client receives data it should not

- **Detect:** API calls or loaders that return whole records (`select *`, ORM calls with no `select`), list endpoints that return all users, and UI that hides fields with CSS or conditional rendering.
- **Confirm:** open the network shape: read the server handler or loader and list returned fields. Data the current user is not entitled to (other users' emails, password hashes, internal notes, admin flags) is exposed even if never rendered.
- **False positive:** fields are public by design.
- **Severity:** other users' personal data or credentials: `high`. Own user's internal fields: `medium`.
- **Vulnerable:** `export async function loader() { return db.user.findMany(); }` rendered as a name list.
- **Fixed:** `return db.user.findMany({ select: { id: true, displayName: true } });` scoped to what the page needs and to the current tenant.
- **Refs:** CWE-200, CWE-359 (A01:2025 maps it), OWASP A01:2025.

## SD-06 Production source maps published

- **Detect:** `build.sourcemap: true` in `vite.config.*`, `GENERATE_SOURCEMAP=true`, webpack `devtool: 'source-map'`; `.map` files in a built `dist/`.
- **Confirm:** maps are uploaded to the public host (not only to an error tracker). They reveal full source, comments, and any inlined constants.
- **Severity:** `low`; `medium` when the maps contain secrets or internal endpoints.
- **Vulnerable:** `build: { sourcemap: true }` with maps served from the CDN.
- **Fixed:** `sourcemap: 'hidden'` and upload maps to the error tracker only, or disable them.
- **Refs:** CWE-540 (A01:2025 maps it), [vibe coded apps security studies.md.](https://react.dev/learn)

## SD-07 Cross-request state leakage on the SSR server

- **Detect:** module-level `let store`, `const cache = new Map()` holding user data in server entry files; a Redux or Zustand store created at module scope and used during SSR.
- **Confirm:** a value written for one request can be read when rendering another user's page.
- **Severity:** user data shared across requests: `high`.
- **Vulnerable:** `const store = createStore(reducer); app.get('*', (req, res) => { store.dispatch(setUser(req.user)); render(store); });`
- **Fixed:** create the store inside the request handler (Redux docs pattern).
- **Refs:** CWE-200, [redux server rendering security.md.](https://redux.js.org/usage/server-rendering#security-considerations)

## SD-08 AI provider SDK running in the browser

- **Detect:** `dangerouslyAllowBrowser: true` in OpenAI or Anthropic SDK constructors.
- **Confirm:** the constructor runs in client code (component, hook, `'use client'` file, or any SPA source).
- **Severity:** `critical` with a live key (key exposed to every visitor and billable); `high` if the key comes from user input at runtime (users' own keys, still stored or proxied unsafely).
- **Vulnerable:** `const client = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true });`
- **Fixed:** call the provider from a server route with the key in a server-only variable.
- **Refs:** CWE-798, CWE-522, [ai sdk dangerously allow browser.md.](https://github.com/openai/openai-node#requirements)

## SD-09 Secrets in client logs or error screens

- **Detect:** `console.log` of tokens, keys, or full API responses; error boundaries rendering `error.stack` or server error bodies in production.
- **Severity:** `low`.
- **Vulnerable:** `console.log('session', session.accessToken)`
- **Fixed:** remove the log; show generic error text in production.
- **Refs:** CWE-532 (A09:2025), CWE-209 (A10:2025).

Primary technical reference locations: [source index](official-sources.md). Recheck the actual installed version and trust path.
