# Public evidence and repository evidence

Public response review observes headers, cookie attributes, supplied scripts and coarse transport evidence. Source Security Review examines code paths, validated identity, ownership, SQL policies, secrets, webhooks and release controls. Keep separate evidence pointers and confidence for the two. A public response cannot prove the code location or fix, and a code snippet cannot prove a deployed policy is enforced.

Use local [headers and transport](../../guides/07-headers-and-transport.md), [authorization](../../guides/03-authorization-and-tenancy.md), [webhook intake](../../guides/05-webhooks-and-third-party-intake.md) and [security snippets](../../references/secure-by-default-snippets.md) when an implementation question needs depth. Cite the specific section actually used, rather than copying the whole repository vulnerability catalog into the public report.

External report preparation does not itself change application code. A subsequent code fix must go through Security, Quality and the Build Lead's repository review for that changed candidate. A public report is not a Ship Gate clearance. This method does not grant remediation, write or deployment authority.

Missing source is a stated limitation, not a reason to infer internal architecture from a Server/X-Powered-By banner. If platform/version exposure is observed, record the banner and time, distinguish claimed from installed version, and avoid declaring a vulnerability without a matched affected version/reachability/advisory review. Mask unnecessary identifying values. Do not query hidden endpoints or probe for files to confirm a guess.
