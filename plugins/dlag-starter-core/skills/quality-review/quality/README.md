# Trace an implementation to its accepted plan

Read [review boundaries](boundaries.md) before the complete method. Quality Review reports evidence-backed findings; it neither fixes the implementation nor supplies release authority. This is the method for an actual requested review, not evidence that a review ran while these resources were authored.

| Step | Complete guide |
| --- | --- |
| Establish the actual accepted plan | [Locate the plan](guides/01-locate-plan.md) |
| Account for the full candidate | [Inventory changes](guides/02-inventory-changes.md) |
| Trace every requirement and non-goal | [Cross-reference](guides/03-cross-reference-audit.md) |
| Evaluate all five axes | [Five-axis evaluation](guides/04-five-axis-evaluation.md) |
| Calibrate findings | [Severity](guides/05-severity-classification.md) |
| Prepare the complete report | [Report writing](guides/06-report-writing.md) |

[Principles](guides/00-principles.md) govern evidence, plan ambiguity, severity, complete reporting, repair separation and Security-before-Quality. Use the full [common-gaps catalog](guides/07-common-gaps.md) and [exact-candidate evidence method](guides/08-verification-artifacts.md).

Use the complete [report](templates/qa-report.md), [traceability](templates/traceability-table.md) and [verification packet](templates/verification-artifacts.md) templates. [Clean-source](examples/01-happy-path-clean-audit.md), [blocker-heavy](examples/02-blocker-heavy-audit.md), [ordering](examples/03-ordering-violation-escalation.md) and [verification cases](examples/04-verification-artifact-cases.md) are constructed teaching specimens with explicit limits. They are not current review receipts.

The [plan-item helper](scripts/extract-plan-items.py) is an optional local extraction utility for an authorized caller, not a tool this read-only Specialist can execute. It outputs blank traceability fields; extraction cannot mark implementation done. The [resource map](resource-map.md) and [report-location reference](reports/README.md) preserve navigation and placement semantics.
