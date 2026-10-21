# Advisory report shape

Return findings in chat. A separate authorized writer may save a requested Markdown report after destination/conflict checks. No automatic archive, session memory, recurring audit or write permission follows from this shape.

# Reports - repository health

This folder collects past audit report outputs. Each run that writes a report to disk lands here as `YYYY-MM-DD-{repo-slug}-audit.md`.

Use the local audit-report template in the same resource group.

## Naming convention

```
YYYY-MM-DD-{owner}-{repo}-audit.md
YYYY-MM-DD-{owner}-{repo}-branch-protection-audit.md  (scoped run)
```

## Report retention

Apply the owner's accepted retention/privacy policy and preserve actual audit evidence; never silently delete or alter a past run - they form the audit trail showing hygiene improvement over time.

## Index

*(populated as reports are generated)*

| Date | Repo | Score | Scope | Top finding |
|---|---|---|---|---|
| (no reports yet) | | | | |
