# SQL review specimens and plan capture

These resources preserve concrete diagnostic queries and capture code for review. The Data Foundation Playbook does not execute database statements or obtain credentials.

- [Index review SQL](audit-missing-indexes.sql) retains three queries: foreign-key coverage candidates, overlapping key-prefix candidates and apparently unused indexes. It also shows a database statistics-reset timestamp. Results require workload, operator-class, partition and constraint review; they do not authorize creating or dropping indexes.
- [Dead-tuple and index-size SQL](bloat-check.sql) retains table statistics, extension-presence inspection and index-size listing. It clearly distinguishes estimates from physical bloat. No extension is installed or invoked.
- [Complete query-plan capture code](analyze-query-plan.md) is fenced teaching material. A separately authorized operator supplies the connection service, inspected SQL and time budgets. Estimate and ANALYZE have different effects; neither a flag nor a rollback statement makes arbitrary SQL safe.

An operator with an already approved environment and installed client can adapt a reviewed SQL file using this command shape:

```bash
# Inert operator example. PGSERVICE is a privately configured service name.
# Required connection/statement/lock budgets belong to the named invocation.
psql -X --no-password --set=ON_ERROR_STOP=1 --file=reviewed-query.sql
```

This command inherits the operator's explicit connection configuration. Do not run it with an accidental default connection, echo credentials, add a superuser requirement, or imply read-only permissions simply because a filename contains "review". The supplied statements should be inspected in full before a later execution. Save sanitized output with the version, scope and capture date; unexecuted SQL stays labeled unexecuted.

Use [plan review](../guides/review-query-plan.md), [indexing](../guides/02-indexing.md) and [performance/pooling](../guides/05-performance-pooling.md) to interpret observations.
