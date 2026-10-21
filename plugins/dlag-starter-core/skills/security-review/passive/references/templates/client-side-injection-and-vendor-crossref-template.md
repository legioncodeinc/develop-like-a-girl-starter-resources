# Script and content-change worksheet

Inventory identity/time: PENDING. Supplied route coverage: PENDING. Runtime execution evidence: PENDING. Review uses supplied evidence only.

## Loader and CSP relationship

| Inventory row | Script/iframe origin | Actual loader evidence | CSP evidence | Trust/allowlist change risk | Confirmed fact versus inference |
|---|---|---|---|---|---|
| POINTER | ORIGIN | tag manager/direct/unknown | header pointer | specific reason | label both separately |

A tag manager can change loaded scripts without application deployment. strict-dynamic may delegate trust from a nonce/hash script. Record actual governance evidence and policy, not a generic claim that either establishes safety or vulnerability. dataLayer or a vendor name alone does not prove enabled features or permissions.

## Content and metadata changes

| Tool and evidence | Vendor-self-reported capability | Observed project behavior/settings | Approval/rollback/audit evidence | Risk inference and remaining gap |
|---|---|---|---|---|
| POINTER | CLAIM or unknown | CONFIRMED/UNKNOWN | CONFIRMED/UNKNOWN | specific bounded interpretation |

A trusted script may be intentionally allowed to change content. CSP cannot establish the owner's approval workflow. Do not claim an advertised default is actually active or treat absent approval evidence as confirmed unauthorized writes. Do not judge vendors generally or run a new census.

## Payment-adjacent scripts

Record supplied payment SDK/widget origins and observed loading context. Missing runtime capture, account settings, inventory freshness or independent tamper evidence stay gaps. No checkout interaction, payment instrument or order is used.
