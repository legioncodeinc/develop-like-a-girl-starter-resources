# Third-party scripts and content changes

## Work from supplied inventory

For each supplied script, iframe, tag or pixel, record route, observed origin, loader, purpose and evidence pointer. Do not detect new vendors or fetch remote content. Missing or stale inventory blocks a complete injection-surface review. A name or HTML marker alone establishes only a candidate vendor identity.

## Tag managers and script policy

A tag manager can introduce scripts through container changes outside an application deployment. Supplied dataLayer, google_tag_manager or googletagmanager.com signatures may establish presence, but do not prove which container permissions or approvals exist. Compare inventory rows with actual script-src restrictions and any nonce/hash/strict-dynamic trust chain. A static allowlist may drift; strict-dynamic delegates trust and still needs governance. Report this connection as reviewer inference, not a quote from header documentation or proof of XSS.

## Autonomous content modification

A tool intentionally authorized to modify live text, metadata or schema creates a different risk from an injection bug. A vendor may advertise automatic changes or an approval setting. Keep that claim vendor-self-reported until actual project evidence confirms settings and behavior. CSP limits which code executes; once trusted, a script can still have wide DOM access. Identify approver, scope, rollback and audit evidence as confirmed, absent or unknown. Do not equate unknown approval mode with confirmed unapproved writes.

## Findings and exclusions

Do not label a vendor good or bad or assign Critical solely from presence. A finding needs a concrete gap and evidence: an observed unauthorized origin, an overly broad trusted loader, a confirmed uncontrolled content-write path or a missing governance control with stated confidence. If the capture lacks runtime scripts, explicitly say dynamic injection was not observed. No browser run or supply-chain assessment is implied by reading the inventory.

Use the vendor worksheet. Keep payment-adjacent third parties visible for follow-up, but do not infer PCI conformity or checkout integrity.
