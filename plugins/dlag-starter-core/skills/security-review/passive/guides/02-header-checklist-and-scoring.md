# Header and cookie interpretation

## Complementary header controls

Use both HTTP header hygiene and browser isolation guidance. CSP, framing, MIME sniffing and HSTS overlap; isolation controls, cache policy, content type and deprecated headers have distinct purposes. A common-name checklist does not make all headers mandatory on every resource. Keep route purpose, response type and client support visible.

## Presence, effectiveness and optional scoring

Use PRESENT, ABSENT, INAPPROPRIATE, NOT_OBSERVED or NOT_APPLICABLE for each checkpoint, with evidence and explanation. If an owner explicitly selects a 6/1 boolean worksheet, acceptable presence/value is 6 and failure is 1. Do not invent intermediate credit for a boolean. An implementation-strength judgment is a separate item. A 1 is a rubric result, not proof of Critical severity. Omitted optional headers and deprecated-header presence require contextual risk analysis.

## Inverted checks

X-XSS-Protection should be absent or disabled with 0; an enabled legacy filter can interfere with safe content. Expect-CT is deprecated. Record the supplied exact value and deployment reason if known. Do not turn either observation automatically into a Critical finding or grade cap.

## Cookie purpose and per-cookie handling

Evaluate each Set-Cookie instance independently. Preserve attribute tokens without values. Substring search is unsafe: a cookie named secure_hint or a value containing HttpOnly says nothing about flags. Parse semicolon-delimited attribute names. Secure restricts HTTPS transport; HttpOnly denies script access to a cookie when the architecture supports it; SameSite controls cross-site sending but is not complete CSRF protection.

Identify the cookie's purpose before recommending attributes. A server-managed session cookie usually needs Secure, HttpOnly and an appropriate SameSite policy. A browser SDK token cookie may intentionally need JavaScript access; that needs an explicit auth architecture review rather than a false blanket HttpOnly failure. SameSite=None requires Secure and a justified cross-site flow. Domain/Path/expiry and session rotation still need review. No Set-Cookie in one public response proves nothing about cookies issued during authentication. Never authenticate to close this gap.

## Route differences

Public HTML, static assets, account data and hosted checkout can have different caches and framing needs. Compare the same routes and status classes actually captured. Sensitive data requires no-store rather than merely any Cache-Control string; private prevents shared caching but permits private caching. no-cache permits storage with revalidation. Report absent sensitivity evidence as unknown.

See the full checklist and the CSP method. Header scans cannot establish CSP enforcement in a browser, cache isolation across users, session revocation, or TLS hardening.
