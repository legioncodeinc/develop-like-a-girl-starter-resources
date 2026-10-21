# PR review decision notes

Audit the description before rewriting it. Preserve motivation, context, changed scope, deliberate exclusions, actual validation evidence and reviewer hints. Keep the team's accepted house template where it expresses those needs; do not add empty headings for ceremony. The three action tiers are blocker, suggestion and nit. Question and praise describe intent and are not extra severity tiers.

Use 400 changed lines as a configurable size-review trigger, not a gate or claimed empirical defect-detection percentage. Inspect authored versus generated changes, logical concerns, dependency order and atomic migrations. Preserve dependencies when proposing splits by concern, service, flag or layer. A flag activation is not automatically low risk because its diff is one line.

Async windows, response SLAs and review-captain roles need actual team agreement. Small teams can share triage instead of inventing a role. A 30-PR sample is a bounded culture observation, not a population verdict; disclose filtering, completeness, timing and false positives. Supplied evidence alone does not allow GitHub API calls or sending coached comments.

## Known gaps

No primary evidence establishes the source's precise DORA/AI-review-time, defect-detection or turnaround percentages, so those claims are not current guidance. Culture-audit collection queries are an operational proposal requiring explicit tool and data-access scope. No code correctness, security remediation, PR approval, publication, settings enforcement or perpetual report retention is performed by this communication method.
