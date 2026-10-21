# 10. Return and place the complete report

> Read-only role: inspect supplied local evidence and return a report in chat. All commands, changes, scans and runtime exercises in this reference are proposals for a separately authorized caller. No dependency, provider, account, setting or credential is operated by this Playbook.

Use [the full report skeleton](../references/audit-output-format.md). Keep every surface section, even with no findings. Write “None detected in inspected scope” only for a surface actually reviewed; use NOT REVIEWED with the precise missing evidence for the rest. Record coverage and exact candidate separately from finding counts.

## Destination follows the task

The Security Specialist returns its result in chat. A caller with existing authorization and actual Write/Edit tools may save it in the receiving project's accepted report location. Do not create a project library or rename its current conventions merely to satisfy a template. When the project uses the packaged Project Notebook library conventions, suggested homes are:

- Standalone: `library/requirements/reports/<YYYY-MM-DD>-security-audit.md`.
- Feature-linked: `library/requirements/<lifecycle>/prd-<id>-<slug>/qa/<YYYY-MM-DD>-security-audit.md`.
- Issue-linked: `library/issues/<lifecycle>/ird-<id>-<slug>/qa/<YYYY-MM-DD>-security-audit.md`.

Use the actual established lifecycle and requirement/issue identity. Project-specific report README files are evidence to inspect when supplied, not files this plugin pretends to bundle. Ask only when two plausible authorized destinations change the work; an existing explicit save destination needs no repeated approval. Without write tools, return the completed unsaved report and its proposed destination honestly.

## Required content

Scope, date, source/artifact identity, environment and trust/authorization assumptions come first. Report every applicable category and unreviewed part. Every finding carries location, redacted excerpt, actor/input/precondition, harmful effect, severity reasoning, confidence, minimal proposed correction, owner, expected proof and actual remediation status. Do not count a hypothetical threat as a confirmed exploit. Keep source analysis, synthetic exercises and target runtime/provider evidence distinct.

The remediation table cannot label a proposal fixed. Record the changed candidate and actual post-fix review/evidence, or “N/A, no applicable remediation supplied.” All unresolved Medium-or-higher issues block Quality Review; a report, a synthetic fixture or a package check cannot clear missing implementation or source-coverage evidence. A human risk decision names its scope and author; do not invent acceptance or silently relabel a finding Low.

## Closing and gate sequence

End with clear scope-specific progression status, remaining blockers and precise owner questions. Preserve Security Review -> Quality Review -> orchestrator repository-health ordering. User review of concrete results precedes separately authorized commit/push/publish; this role performs none of those. A content author does not independently clear their own new method or implementation. An application claim requires the actual application evidence, not this report's existence.
