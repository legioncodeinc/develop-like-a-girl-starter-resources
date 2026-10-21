# Transport and payment evidence limits

## Coarse TLS observation

What was supplied: host/time/collector/trust store and evidence pointer, or NOT_OBSERVED. Handshake result: PENDING. Certificate stated expiry: PENDING. This records one client connection only.

Not checked: supported TLS versions, cipher strength, independent chain/intermediate behavior, revocation, renewal monitoring and downgrade resistance. State each pending item. A trust-store success is not a full TLS pass. Do not disable certificate verification to manufacture a success.

## Payment observations

Feature existence: CONFIRMED/NOT_APPLICABLE_WITH_EVIDENCE/UNKNOWN. Supplied HTTPS checkout destination evidence: PENDING. Hosted Stripe destination evidence: PENDING. Payment-adjacent scripts and inventory pointer: PENDING.

No real payment instrument, checkout creation, order, authentication or provider call was performed under this method. Missing observations are unknown, not pass or N/A.

Not established: checkout script inventory/tamper monitoring, payment injection resistance, PCI compliance, signature/replay verification, fulfillment or entitlements. Hosted Checkout alone proves none of these. Server-side webhook verification and entitlement decisions need source/runtime evidence through the existing Security Review. A success redirect never establishes payment entitlement.

Required follow-up: exact missing evidence/method/authorized owner. Keep this disclosure alongside, not silently inside, the scored or completed checklist.
