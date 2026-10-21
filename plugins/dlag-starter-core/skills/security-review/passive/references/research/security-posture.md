# Security posture reference

This method covers four separate evidence classes: response controls, cookie attributes, supplied script/injection surface and limited transport/payment observations. Every finding needs an actual supplied evidence pointer. Unknown and not applicable are different outcomes.

## Header purpose and interpretation

CSP constrains resource/script execution; framing controls constrain embedding; nosniff prevents MIME reinterpretation; HSTS governs HTTPS preference; Referrer-Policy limits referrer data; Content-Type and charset control body interpretation; Cache-Control governs storage/revalidation; cookie flags govern distinct transport/browser behaviors. Use the full checklist for value/context rules. Sensitive responses require stronger caching decisions than public assets. X-XSS-Protection is obsolete and can cause harm; Expect-CT is deprecated. COOP/CORP/COEP, CORS and Trusted Types address different browser boundaries and must fit actual requirements rather than a universal add-all list. Reference: [OWASP HTTP headers](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html), reviewed 2026-10-21.

## CSP strategy

A nonce/hash strict policy and a static host allowlist have different trust models. SSR can propagate a fresh per-response nonce; cached HTML can use hashes tied to exact script bytes. strict-dynamic extends trust from authorized scripts to scripts they load. object-src and base-uri restrict additional injection paths. This is defense in depth, not a replacement for preventing unsafe HTML/DOM sinks. Implementation/compatibility and browser enforcement still need verification. Reference: [web.dev strict CSP](https://web.dev/articles/strict-csp), reviewed 2026-10-21. See the complete local CSP guide for operational checks.

## Supplied vendor interpretation

A tag manager may change the script surface independently from code deployments; the relationship to a policy is a review inference from actual inventory plus policy. A vendor's own claim that it can autonomously change metadata/content is marketing evidence, not independent confirmation that a particular site's settings enable it. An intentionally trusted script may modify the DOM even when CSP blocks untrusted scripts. Record governance/approval evidence separately. Presence of a named tool alone is not a vulnerability or proof of compromised content.

## Known limits

These methods do not implement a TLS protocol/cipher/revocation audit, payment integrity monitoring or a PCI compliance assessment. A default-trust-store connection and certificate expiry are only coarse observations. Supplied public captures do not establish auth session behavior, SQL/R2 ownership, webhook signature validation or payment entitlements. The full report templates retain those limits rather than presenting unknowns as pass/N/A.
