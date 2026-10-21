# Header and cookie worksheet

For each supplied response, record capture pointer, time, requested/final URL, status, method, response type and sensitivity. Choose PRESENT/ABSENT/INAPPROPRIATE/NOT_OBSERVED/NOT_APPLICABLE, give safe evidence and justification. Optional selected 6/1 scores stay separate from severity.

| Check | Acceptable contextual result | Failure/candidate | Interpretation required |
|---|---|---|---|
| HSTS | HTTPS policy with suitable max-age and scope; an example is max-age=63072000; includeSubDomains; preload | Missing/invalid directive | Do not recommend includeSubDomains/preload before all subdomains and renewal are assessed; long policy plus lapsed certificate can block users |
| Enforcing CSP | Effective nonce/hash strategy with relevant restrictions | Absent, report-only only, or unsuitable policy | Presence alone is not strength; read CSP guide |
| Framing | Suitable CSP frame-ancestors, or valid X-Frame-Options DENY/SAMEORIGIN | Neither or overly broad value | Relevant to interactive HTML; a JSON response or redirect has different impact |
| MIME sniffing | X-Content-Type-Options: nosniff | Absent/other value | Pair with correct Content-Type |
| Referrer | Explicit suitable Referrer-Policy, often strict-origin-when-cross-origin | Missing/overly broad policy | Note modern defaults without claiming all clients covered |
| Content-Type | Correct media type and encoding for actual body | Type mismatch/unsafe interpretation | HTML charset matters; JSON must not be rendered as arbitrary HTML |
| Sensitive caching | no-store for sensitive output; private where appropriate | Public/shared caching or absent policy on sensitive output | no-cache permits storage/revalidation; private permits private caching |
| Legacy XSS filter | X-XSS-Protection absent or 0 | Enabled legacy filter | Contextual hardening candidate, not automatic Critical |
| Deprecated CT | Expect-CT absent | Deprecated control present | Do not infer certificate failure |
| CORP | Resource policy fits intended cross-origin embedding | Unintended broad access or broken embedding | Contextual, not universal absence failure |
| COOP | Window isolation fits login/popup integration | Unsafe opener interaction or broken flow | Validate actual workflows before change |
| Trusted Types | Chosen DOM-sink protection fits browser/app | Unsafe sink policy/bypass if observed | Missing header alone does not prove unsafe DOM behavior |
| CORS | Explicit permitted origins/methods/credentials for actual cross-origin API | Wildcard/credentials mismatch or reflected untrusted origin | No need to enable CORS on a same-origin-only route |
| COEP | Required only for deliberate isolation/capabilities | Incorrect embedding configuration | Review COOP and all embedded resources together |
| Platform exposure | No unnecessary detailed version banner | Server/X-Powered-By/etc claims | Banner is not proof of installed version or vulnerability |

## One row per cookie

| Cookie name | Purpose and evidence | Secure | HttpOnly | SameSite | Domain/Path/expiry | Determination and confidence |
|---|---|---|---|---|---|---|
| NAME_ONLY | known session/browser-token/consent/unknown | observed/absent | observed/absent | Strict/Lax/None/absent | attributes only | justify purpose-specific result |

Never include cookie values. Preserve repeated Set-Cookie instances. A server-managed session and a browser-SDK token have different HttpOnly constraints; unknown purpose is a review gap. SameSite=None requires Secure. One public response with no cookie does not establish the auth flow's flags.
