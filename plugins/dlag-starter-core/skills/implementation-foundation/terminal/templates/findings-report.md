# Project-command findings report

Date: [actual observation date]
Subject: [supplied project file, revision/dirty-byte identity]
Scope: [one command/script or existing recipe; excluded paths/effects]
Reported OS/interpreter/version and actual invoker: [evidence or UNKNOWN]
Requested result and actual observed failure: [safe redacted source or source-only review]
Authoring and execution authority: [specific actual task/tool limits]

## Summary

[One to three sentences: what was inspected, practical finding and one priority correction.]

| Severity | Count | Evidence scope |
| --- | --- | --- |
| High | [n] | [source-only/actual result] |
| Medium | [n] | |
| Low | [n] | |
| Informational | [n] | |

These are author-level script findings, not independent Security/Quality clearance. A severity reflects the actual threat/input/effect context. Do not invent an executed ShellCheck code or diagnostic.

## Findings, highest impact first

### [ID and precise title]

File/line: [actual safe path/location]
Pattern and input trust: [exact relevant source; no credentials/private payload]
Problem/impact: [specific consequence]
Evidence: [source comparison or actual redacted output/status, with revision]
Proposed correction: [exact complete authorized local patch, or a proposal]
Reason the correction preserves the required behavior: [including denial/failure]
Expected verification: [scope and actual existing capable operator/tool]
Actual verification: [NOT_RUN or observed result]
Residual limit/escalation: [explicit]

Use this same structure for High and Medium findings. Low/Informational findings still name source, consequence and concrete fix. Do not label unresolved injection safe because the local argument was quoted.

## Proposed patch or inert specimen

```text
[Complete exact proposed text, or state that no patch is authorized.]
```

A supplied original may be truncated or syntactically incomplete. Record the exact end/omission and do not claim absent bytes were inspected. Distinguish repaired document/template closure from a repaired application script.

## Checks and result boundaries

| Check | Subject/version | Actual output/status or NOT_RUN | What it establishes | What it does not establish |
| --- | --- | --- | --- | --- |
| Source/argument/portability review | | | | |
| Syntax parse, if authorized caller exists | | | | Runtime safety |
| Existing lint, if available/authorized | | | | Complete security |
| Local behavior, if authorized | | | | CI/provider/release |
| CI/container evidence | | | | Unobserved environments |
| Native tool/role discovery | | | | Execution from existence |

## Priority actions and handoff

1. [One highest-priority scoped correction and actual accountable owner or UNKNOWN.]
2. [Next dependency only if necessary.]

CI/container and publishing scripts: actual GitHub Workflow/designated execution owner.
Python build/test pipelines: separately qualified Python owner.
Production infrastructure security: Security Review and actual operator.
Dotfiles/default shell/prompts/multiplexers/install/bootstrap: outside this method.
Remote/deployment/release: separately authorized capable task, not a fixed-SSH snippet.

## Closing status

State saved/proposed paths, exact checks performed, unfinished verification, material questions and out-of-scope observations. Missing tools/authority means NOT_RUN. No silent installation, broad cleanup, source execution, provider/configuration change, credentials, spend, send, commit, push or publication follows from this report.
