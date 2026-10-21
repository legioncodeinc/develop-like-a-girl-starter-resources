# Prepare Google OAuth verification

Confirm the live scope classifications and current Google verification requirements before scheduling release. Sign-in-only, internal organization access, external testing and external production have different requirements. A testing exception is not an assurance decision or permission to bypass launch verification.

[Google's production readiness guidance](https://developers.google.com/identity/protocols/oauth2/production-readiness/policy-compliance) and [restricted-scope requirements](https://developers.google.com/identity/protocols/oauth2/production-readiness/restricted-scope-verification) are authoritative. Do not promise a fixed review duration, assessment cost or universal annual requirement without the applicable current rule and assessor quote.

## Submission material

1. Verify every listed domain and maintain an accessible application homepage, privacy policy and terms. The policy must explain the actual Google data used, retention, deletion, recipients and user controls.
2. Align app name, logo, support contact and the visible product. Check Google's current asset requirements rather than preserving a stale dimension or transparency rule.
3. Record each exact scope with current sensitivity, active feature, code location, retention and narrower alternatives in [scope justification](../templates/scope-justification-template.md).
4. Prepare a demonstration showing the consent screen and each requested data use end-to-end. Keep the app's domain visible, use safe test data, and include cancellation/revocation behavior. Obtain authorization before uploading or sending the demonstration.
5. Determine whether restricted data storage or transmission triggers a security assessment and which exceptions apply. Record the actual requirement, owner, budget approval and evidence.
6. Submit only the accepted scope list. Assign a monitored contact and respond to verification questions. Adding a scope can trigger fresh review; requesting hypothetical future scopes to avoid that review violates least privilege.

## Common rework

| Failure | Corrective action |
|---|---|
| Requested scope absent from demonstration | Show the accepted feature using that scope or remove the request |
| Privacy policy describes generic analytics only | Describe the actual Google data lifecycle |
| Domain ownership or callback mismatch | Verify the exact domain and both provider/application redirects |
| Branding differs from running app | Align the actual assets and public information |
| Source inventory and consent screen disagree | Compare declared scopes with code and actual requested consent |
| App changes after approval | Reassess whether scope, data use, ownership or function triggers review |

## Ongoing ownership

Keep the current approved scopes, demonstration reference, policy version, verification status and applicable assessment renewal in the project record. Periodically remove unused permissions, verify the client is still required, monitor inactive-client notices and recheck contact ownership. Use the bounded [scope helper](../scripts/README.md) as an input to human review; it cannot prove runtime use or consent-screen state.

Complete [the consent checklist](../templates/google-oauth-consent-screen-checklist.md). A completed worksheet records decisions and evidence; it does not itself submit verification, authorize account changes or prove that Google approved the app.
