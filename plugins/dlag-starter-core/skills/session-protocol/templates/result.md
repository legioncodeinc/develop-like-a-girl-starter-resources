# Work session result and recovery state

Use the six report fields below at every end, checkpoint or stop. Replace placeholders with observed facts. DONE requires the assigned work and necessary checks to be complete. Use PARTIAL for unfinished work, BLOCKED for a required answer or external condition, and STOPPED when an execution limit or user stop ends work. If several apply, use STOPPED for a fired limit.

Return this template in chat. Save it only if the task authorizes a local handoff document and the caller has a write tool. Never include credentials, customer records or private transcript bodies. See [the recovery worksheet](../references/recover-after-compaction.md) for evidence requirements.

Record the needed work-unit facts in the handoff or internal state before the report:

- Task and authorized scope, plus source of authorization.
- Original start and timestamp source; effective deadline and any explicit extension.
- Last substantive progress and required user update.
- Owned paths; workers actually dispatched, actual status and last reviewed output.
- Exact failures, attempt counts and meaningful changes of approach.
- Passing checks, matching artifact hashes or revisions, result dates and coverage limits.
- Pending questions and dependent actions; unknown facts marked UNKNOWN.

Fill these report fields with actual results:

```text
Status: [DONE | PARTIAL | BLOCKED | STOPPED] - [outcome; limit or none; measured end and elapsed time, or honest unavailable state].
Delivered: [Concrete result and safe artifact paths, or none].
Verified: [Checks actually run, actual results and coverage limits; quote failures with secrets redacted].
Not done: [Unfinished requirements and why, or None].
Questions for the owner: [Numbered unresolved questions with one recommended answer each, or None].
Out of scope, noticed only: [One line per observation, or None].
```

Do not present direct use as a separate Specialist dispatch. Distinguish content adaptation, static validation, behavioral exercises, native Claude Code invocation, compaction behavior, hook delivery and live integrations. One does not establish another.
