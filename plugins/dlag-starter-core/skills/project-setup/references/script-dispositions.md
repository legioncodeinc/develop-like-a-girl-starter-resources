# Operational setup safety

Use these safeguards when evaluating a separately authorized home-instruction or completion-marker task. This Playbook performs neither operation. Home installation changes global settings and rules; repository markers assert machine-readable setup state. Neither belongs to this existing Markdown-only role. Home settings and completion markers require their own authorized task; this reference supplies their safeguards without installing anything.

## Global instruction installer

An instruction installer takes explicit user and organization values plus optional home/template paths. It accepts only trimmed 1-120 character values without controls or braces. It searches the source plugin's bundled template locations and fails if either required global template is missing or lacks both personalization placeholders. Machine-account names are not consent or personalization evidence.

It first resolves an existing home and checks the private installation marker. Symlinked markers and non-file marker paths are refused. An existing valid marker returns already-installed with no changes. That return alone does not prove the installed instructions remain current.

For each target it refuses symlinked or out-of-home paths and non-file destinations. It reads existing content, replaces exactly one ordered managed start/end block or appends a new block, and rejects missing, duplicate or reversed markers. Reject malformed managed sections rather than guessing which text to replace. Unmanaged text stays intact. An empty file receives just the managed block. Unsupported assistant target enumeration is excluded from Starter; Claude Code is the only launch assistant.

Before replacement it validates backup directories against symlinks and non-directory paths, creates a timestamp/PID-specific backup tree and copies original files with metadata. It preserves existing permission modes (new files use mode 0644). Each replacement writes a temporary sibling and uses atomic rename; temporary files are cleaned in a finally path. Global operations require a separate explicitly authorized task, not this Playbook.

Only after all target writes succeed does it create the private marker exclusively with mode 0600, recording schema, supplied names, date, template SHA-256 values, target list and backup directory. Its JSON result reports installed/already-installed, changed paths, marker and backups; OSError/ValueError yield an explicit failure. Per-file atomic rename does not make the whole multi-file operation transactional. A later failure can leave earlier changes applied; never claim automatic rollback. Preserve real backup and partial-result evidence for a separately authorized recovery task.

Global instruction templates define personalized operating/memory preferences and the adjacent Claude Code import. Their full operational installation is excluded. This package already supplies the owner-neutral Work Session Protocol through its existing component. No persistent memory is configured or written by Project Setup.

## Repository completion writer

A repository completion writer requires an existing resolved repository root with `.git`. It refuses a symlinked or non-file completion marker and returns already-initialized when a valid marker exists. It requires knowledge, requirements, issues and human-notes directories before marking setup. Those source schema requirements do not mandate creating those directories for Starter's smaller Notebook workflow.

Existing code detection first checks manifests for several languages, then walks source suffixes while pruning build, dependency, documentation and vendor directories. `.git` alone is not code. The code-status argument must say completed when code exists, and completed or not-needed when code does not exist. Missing folders, invalid status or existing-code-without-review produces a refusal, not a success marker.

The marker is created exclusively with mode 0644, recording schema, current timestamp, originating procedure, whether code exists and the supplied review status. The CLI reports JSON success or an explicit OSError/ValueError failure. It accepts a status assertion; it does not independently inspect a review report, verify acceptance criteria or prove application readiness. Thus neither marker absence nor presence replaces current evidence. Retain this refusal logic in the documentation report rather than creating a marker through this role.

## Evidence limits

The local historical research synthesis supplies background, not current product verification. Check current installed behavior and supplied account evidence before any operational decision. Do not infer configured hooks, completed reviews or working provider integrations from file presence.
