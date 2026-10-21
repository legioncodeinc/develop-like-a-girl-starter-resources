# TLS and payment integrity limits

## Cookies

Cookie flags have a concrete interpretation procedure and per-cookie evidence in guide 02. It does not establish that values rotate, are invalidated, are bound to the right user, or are protected in every auth flow. Those require separately authorized source/runtime evidence.

## TLS: coarse evidence only

An externally supplied successful HTTPS connection using a default verifying trust store says that that client accepted that connection at that time. A supplied certificate notAfter field states expiry. Neither establishes supported protocol versions, cipher strength, intermediate handling in other clients, revocation status, certificate renewal monitoring or resistance to downgrade. HTTP-only captures and unavailable TLS observations remain gaps. Do not treat a network error as proof of an expired certificate.

This method contains no TLS scanner and does not disable verification. A deeper review needs a documented protocol, independently authorized collection, actual outputs and a qualified interpretation. Retain every unavailable depth item in the gap disclosure. A gap is not a pass, a failure, or genuine N/A.

## Hosted payment observations

For supplied checkout evidence, record whether the observed destination uses HTTPS and whether a provider-hosted destination/redirect is actually shown. A Stripe mark, SDK URL or marketing statement cannot prove hosted Checkout. Note payment-adjacent scripts from supplied inventory. Never enter card details, create a Checkout Session, submit an order or authenticate to a payment provider under this method.

The evidence here cannot establish payment script monitoring, tamper detection, PCI compliance, signature verification, event replay protection or payment entitlements. Hosted Checkout reduces some application payment-form surface but the application must still verify webhook signatures and derive entitlements server-side. A success redirect alone does not grant access. Those controls belong to the existing source Security Review when source evidence is available.

## Report honestly

Always include the TLS-depth and payment-integrity sections. If no payment feature exists and that is supported by scope evidence, payment-specific checks can be genuinely not applicable; if its existence or behavior is unknown, say unobserved. Missing research or execution is pending, never N/A solely to improve a score. This method makes no compliance determination.
