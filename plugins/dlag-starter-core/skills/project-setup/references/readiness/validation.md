# Readiness validation rules

Validate the table structure without changing account states or promoting readiness claims. Project Setup performs a local documentation review only. The [optional Python helper](../../scripts/check-readiness-ledger.py) is preserved developer source for a separately authorized caller with a shell and an already installed Python 3 runtime; this role does not execute it, install Python or save CSV files. Use the equivalent Markdown fields within expressly requested documentation.

## Structural checks

- Require the complete 26-field [ledger contract](ledger-contract.md), unique asset IDs and nonempty asset ID, purpose, product scope, environment, accountable owner, access boundary, selected reason, requirement source, observation date and next action.
- Accept only unknown, reported, blocked, observed-ready, deferred or not-applicable status; blocking is yes/no relative to this milestone.
- An observed-ready claim requires authorized-observation evidence, an evidence reference and a reviewer. A reported claim requires owner-report evidence and its reference. Merely filling these fields does not establish their truth.
- Cost is unknown or a finite nonnegative numeric amount with currency, unit, source and date. Unknown is never zero. Lead time is unknown or a finite nonnegative duration with a sourced or explicitly estimated basis.
- Nonempty known source/observation/cost dates use ISO calendar dates. Prerequisite IDs are semicolon-separated existing row IDs. Reject missing dependencies, duplicate IDs and cycles.
- Reject missing price units, invented readiness and cyclic prerequisites in illustrative failure exercises. Do not treat a fictional ledger's reference IDs as real evidence.

## Helper limitations

The helper reads a named CSV and reports errors or structural success. With no path it checks the packaged eight-row fictional example and the three refusal cases. Its validation procedure is not an API call, account audit, reviewer approval or release test. It cannot determine account existence, plan eligibility, credential provisioning, private policy correctness or customer-facing readiness.

The helper does not validate research-archive integrity, Markdown resource closure or current source freshness. Those require separate evidence; CSV structural success does not establish them.
