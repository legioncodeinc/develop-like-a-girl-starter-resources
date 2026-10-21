# Rendering and browser check catalog

## R1. Raw HTML sinks

Find dangerouslySetInnerHTML, innerHTML/outerHTML, insertAdjacentHTML, document.write and createContextualFragment. Trace the exact value back to URL/user/CMS/API/AI/markdown input and identify who can write it. A sanitizer must run on that same final value in the actual environment. Prefer JSX text or textContent when formatting is unnecessary. Build-time trusted repository content and known safe static icon strings are ruled-out cases only after checking the trust boundary. No browser execution is implied by a sink search.

## R2. Markdown and executable content

A markdown parser does not necessarily sanitize HTML. Follow parse, raw HTML plugins, sanitization and final sink in order. Sanitizing before a later unsafe HTML transform is insufficient. Runtime compilation of untrusted component/MDX source can execute code and is not a safe content renderer. Starter repository-authored content is trusted build input; user-uploaded rich text is a separate boundary. Workers do not provide a Node DOM by default, so do not paste jsdom-based server snippets as copy-ready Workers code. Use an already selected compatible sanitizer/pipeline and record package/version/runtime tests pending. No new dependency installation is authorized by a recommendation.

## R3. Attribute, tag and URL trust

Do not spread user-controlled objects into element attributes or allow arbitrary tag names. Select known props, validate URL schemes/origin and map style/variant names to controlled values. React escaping of text does not establish safe href/src/srcDoc/style/contenteditable or raw HTML. A known fixed props object is a ruled-out case. Framework-specific compiler escape advisories are not automatically React findings; investigate actual React/version/data-path behavior before claiming one.

## R4. CSP enforcement and nonce propagation

Read actual Worker/React Router response headers, renderer, script emitters, errors, redirects and platform rules. Enforcing versus Report-Only is explicit. Verify per-response unpredictable nonce, actual tag propagation, cache non-reuse and production-only restrictions. Hashes require exact matching bytes. unsafe-inline/unsafe-eval/host wildcards need contextual interpretation, not keyword severity. Header configuration from a different platform or a meta tag is not proof that every deployed HTML response has the intended framing policy. Use the full local [CSP method](../../passive/guides/03-csp-strategy-nonce-vs-hash.md).

## R5. Cookie controls by architecture

Classify each cookie purpose, origin, writer, Domain/Path, lifetime and flags. A server-managed session should normally be Secure/HttpOnly with an appropriate SameSite setting. Supabase browser-managed token storage can have different JavaScript access requirements; do not falsely claim an HttpOnly flag can be added without an architecture change. Browser preferences are lower-stakes. SameSite=None needs Secure and justified cross-site use; parent-domain scope expands trust. HTTP-only hosting advice and localhost exceptions never justify weakening production defaults. Do not use absence of a public Set-Cookie as auth-flow proof.

## R6. Browser token storage

Find localStorage/sessionStorage and store writes of access/refresh/session/API tokens. Scripts on the origin can read them, including trusted third-party scripts or XSS. Distinguish the selected Supabase auth architecture from accidentally storing privileged API credentials. Moving to a server-managed cookie is a substantive auth design change requiring implementation review, CSRF defenses and session refresh handling, not a one-line universal fix. Non-sensitive UI state is ruled out. Combine confirmed XSS with storage exposure only when the same data/path is reachable.

## R7. UI checks and mixed-generation code

Client effects, hidden buttons, route links and SSR toggles do not authorize server data. Mixed syntax, unusual old APIs, disabled type checks or copied examples can prioritize review but are not vulnerability statistics or findings by themselves. Confirm the missing guard/data path, or record a note. Keep any research/vendor statistics out of actual findings unless relevant and independently supported; app evidence determines severity.
