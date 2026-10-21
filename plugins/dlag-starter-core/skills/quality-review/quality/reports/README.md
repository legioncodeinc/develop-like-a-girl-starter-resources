> **DEPRECATED**, per-method `reports/` folders have been retired. QA reports now live in the host repo's `library/` tree:
>
> - **Feature-tied:** `library/requirements/<lifecycle>/prd-<###>-<title>/qa/<date>-qa-report.md`
> - **Issue-tied:** `library/issues/<lifecycle>/ird-<###>-<title>/qa/<date>-qa-report.md`
> - **Standalone owner-scope reviews:** `library/requirements/reports/quality-audits/<date>-<plan-name>-qa-report.md`
>
> Use the receiving repository's documented legacy report location when applicable; see [report placement](../guides/06-report-writing.md). Do not move old evidence during QA.
>
> The canonical QA report template lives at [`../templates/qa-report.md`](../templates/qa-report.md). The teaching set (happy-path, blocker-heavy, ordering-violation) lives in `../examples/` (target-project reference to resolve: `../examples`). This is a local navigation reference, never an instruction to delete installed files.
