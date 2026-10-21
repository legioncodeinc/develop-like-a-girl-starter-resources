# 07. Headers, transport, caching and abuse controls

> Read-only role: inspect supplied local evidence and return a report in chat. All commands, changes, scans and runtime exercises in this reference are proposals for a separately authorized caller. No dependency, provider, account, setting or credential is operated by this Playbook.

## Content Security Policy

Inspect the actual Worker response path and React Router SSR HTML, not just a static header object. A policy can be absent on resource/error/redirect responses or overwritten by an adapter/CDN. Start proposed policy changes in an observed Report-Only rollout when appropriate, with an owner/date and planned enforcement decision. Report-Only observes; it does not block script execution. A permanent unqualified Report-Only claim is not an enforced control.

Prefer specific sources, hashes or a per-response nonce over blanket unsafe-inline/unsafe-eval. Use the installed React Router server renderer's real nonce API and pass it consistently to script-producing components and React streaming output. A nonce generated once at deployment or cached in a public HTML document is not single-use. Prerendered pages need a compatible static-hash or other reviewed design. Inspect UI libraries, inline styles, dynamic styles, embeds and imported HTML before deciding the policy. Do not open broad script origins to silence violations. See [framework review](02-react-router-attack-surface.md).

## HTTPS, HSTS and browser headers

Record the actual custom hostname, redirect chain, Worker/asset response and environment. Verify TLS/HTTPS and HSTS from supplied representative evidence. Do not assume one hosting domain's behavior proves a custom domain or every response. HSTS is meaningful only over HTTPS; includeSubDomains/preload has scope and recovery consequences and must not be added without reviewing every affected subdomain.

Use `X-Content-Type-Options: nosniff` with correct content types. Review clickjacking through CSP frame-ancestors and an appropriate X-Frame-Options policy where applicable. A `frame-ancestors` directive must reach the browser in an actual response header; a generic HTML meta policy cannot substitute for every header directive. Intentional embeds need a narrow documented policy and actual trusted origins. Review Referrer-Policy so identifiers, URLs or presigned capabilities do not escape through navigation. A security header is defense in depth, not object authorization.

## Private responses and public assets

Use private/no-store behavior where required for personalized HTML, data, errors and downloads. Inspect actual Cache-Control and Worker cache API keys, Vary behavior and any edge caching overrides. A CDN cache can disclose a correctly authorized response to another actor if its key omits identity/permission scope. A signed download URL can appear in browser history, logs or referrers; bound its life and sensitivity separately. Keep public repository website content and public R2 assets separate from user files. Deployment should not serve `.env`, `.dev.vars`, `.git`, backup files, private artifacts or source maps contrary to the accepted policy. A path-blocking WAF rule is a backstop; a private file should not be in the public asset set at all.

## Rate limits and denial-of-service

Map abuse controls to actual costly/authentication operations: login/recovery, account lookup, upload initialization/finalization, search/export, hosted Checkout creation, transactional email and webhook intake. Review dimensions and quotas for actor, tenant, IP, resource and time, including distributed/anonymous behavior. Decide how a valid webhook retry remains recoverable when an abuse limit is reached. Body/query/page/count limits, timeouts and safe error paths are separate from frequency limiting.

Cloudflare account plans and deployed Workers/WAF/rate-limit configurations vary. Inspect actual selected protection and evidence; do not assume managed WAF coverage, availability or a configured rule because hosting is Cloudflare. An edge firewall does not remove the need for validated input, parameterized queries, signature verification and row/file permission. The Specialist may review supplied configuration and captures only. Live probes, load tests, creating rules or changing account settings require a separate authorized caller and bounds.

## Evidence and failures

Record status, headers, URL/path, authenticated actor class, environment, candidate hash, observation date and the limits of each supplied capture. Include success, refusal and internal-error responses. Verify a denied request has no data/effect even if a limit/CSRF/CSP check fails. Missing runtime captures remain NOT RUN rather than a secure default assumption. Sources: [Cloudflare, React Router, OWASP and browser security references](../references/official-sources.md).
