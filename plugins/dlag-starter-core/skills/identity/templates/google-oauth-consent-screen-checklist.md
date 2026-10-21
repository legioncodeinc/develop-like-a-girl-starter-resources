# Google sign-in configuration and verification checklist

Project / environment / owner / date:
Current official policy references:
Status: Draft. No provider configuration or submission is authorized by this worksheet.

## Branding and audience

- [ ] App name, logo and visible application branding match.
- [ ] Logo satisfies the current Google requirements.
- [ ] Monitored support and developer contacts are assigned.
- [ ] HTTPS homepage, privacy policy and terms are reachable.
- [ ] Privacy policy explains the actual Google data lifecycle.
- [ ] Every listed domain is verified by its authorized owner.
- [ ] Internal or external audience is correctly selected.
- [ ] Testing or production status and its actual user/token limitations are recorded.

## Data access

| Exact scope | Current classification and source | Accepted feature/code location | Data use/retention | Narrower alternative |
|---|---|---|---|---|
| openid | Verify current identity flow | Sign-in | Stable subject mapping | |
| email | Verify current identity flow | Contact/display only | | |
| profile | Verify current identity flow | Name/avatar if required | | |
| | | | | |

- [ ] No speculative or unused access is requested.
- [ ] Consent screen, code request and approved feature agree.
- [ ] Sensitive/restricted classification was checked in the API's own scope table.
- [ ] The complete [scope justification](scope-justification-template.md) is attached when needed.

## Exact URLs and environment separation

| Boundary | Exact accepted URL | Configuration owner | Evidence |
|---|---|---|---|
| Google redirect to Supabase | | | |
| Supabase redirect to app callback | | | |
| Trusted application origin | | | |
| Post-login internal destinations | | | |
| Isolated staging/development equivalents | | | |

- [ ] Production URLs use HTTPS and exact allowlist entries.
- [ ] Localhost exceptions are confined to an accepted development environment.
- [ ] Preview domains do not widen production trust implicitly.
- [ ] Untrusted Host/forwarded headers cannot choose the callback origin.
- [ ] Google client secret resides in the authorized provider configuration, never browser code.

## Verification when required

- [ ] Applicable branding, scope review and security-assessment requirements identified from current rules.
- [ ] Demonstration shows consent and every requested feature using safe test data.
- [ ] Full app domain visible and branding consistent.
- [ ] Privacy and retention statements match actual data use.
- [ ] Assessment exception or requirement documented with source and owner.
- [ ] External upload/submission has explicit authorization.
- [ ] Actual submission/reviewer status is recorded, not inferred from prepared documents.

## Operations and review handoff

- [ ] Client owner, last-used check and monitored inactive-client notices recorded.
- [ ] No unsupported tokeninfo keepalive claim.
- [ ] Verification re-review triggers and applicable assessment renewal recorded.
- [ ] Client retirement or restoration is separately approved.
- [ ] Callback denial, wrong verifier, replay, cache and cookie propagation have actual evidence or explicit pending rows.

Open requirements / Security Review questions / Quality Review after Security:
