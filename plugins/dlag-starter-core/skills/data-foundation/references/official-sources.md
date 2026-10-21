# Official technical references

Checked 2026-10-21 through read-only documentation retrieval. PostgreSQL's current documentation resolved to version 18 at this check. This is not a claim that the project's Supabase database runs version 18. Inspect actual server/client versions and use the matching documentation before adapting SQL. No database, provider, credential or application operation was performed.

## Schema and query behavior

- [PostgreSQL constraints](https://www.postgresql.org/docs/current/ddl-constraints.html): NOT NULL, CHECK, unique, foreign-key and exclusion semantics.
- [JSON types and indexing](https://www.postgresql.org/docs/current/datatype-json.html): JSON operator-class capabilities and limitations.
- [Index-only scans](https://www.postgresql.org/docs/current/indexes-index-only-scans.html): included values and MVCC visibility requirements.
- [Index catalog](https://www.postgresql.org/docs/current/catalog-pg-index.html): key versus included columns, predicates and validity flags.
- [Full-text search](https://www.postgresql.org/docs/current/textsearch.html): search configurations, documents, queries and indexing.
- [pgvector project documentation](https://github.com/pgvector/pgvector): optional extension capabilities, types, distance operators and index trade-offs; no model or extension is selected by this link.

## Migrations and execution

- [ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html): operation-specific locks, validation and scan/rewrite behavior.
- [Explicit locking](https://www.postgresql.org/docs/current/explicit-locking.html): lock modes and conflicts.
- [CREATE INDEX](https://www.postgresql.org/docs/current/sql-createindex.html): concurrent-build constraints and failure behavior.
- [Partitioning](https://www.postgresql.org/docs/current/ddl-partitioning.html): pruning, lifecycle, attachment locks and constraints.
- [Transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html): concurrency and statement visibility.
- [EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html): estimated/actual plans and ANALYZE execution effects.
- [Routine vacuuming](https://www.postgresql.org/docs/current/routine-vacuuming.html): row-version cleanup and maintenance choices.
- [Statistics](https://www.postgresql.org/docs/current/monitoring-stats.html): estimated tuple counts and statistics scope.
- [Logical replication restrictions](https://www.postgresql.org/docs/current/logical-replication-restrictions.html): DDL and sequence-state limitations.

## Access and connections

- [PostgreSQL row security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) and [CREATE POLICY](https://www.postgresql.org/docs/current/sql-createpolicy.html): enforcement scope, effective roles and policy composition.
- [SET](https://www.postgresql.org/docs/current/sql-set.html): transaction-local and session configuration lifetimes.
- [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security): grants, ordinary identity and USING/WITH CHECK design.
- [Supabase connections](https://supabase.com/docs/guides/database/connecting-to-postgres): Data API/direct/session/transaction choices and current prepared-statement/pipelining limits.
- [PgBouncer features](https://www.pgbouncer.org/features.html): mode and protocol feature distinctions when reviewing an existing installation; not a selected Starter service.
- [Supabase backup coverage](https://supabase.com/docs/guides/platform/backups): database recovery scope; separate R2 object recovery remains necessary.

Conditional ORM API work must use the exact installed package's official documentation before editing that API. No ORM API implementation or compatibility claim is supplied by the SQL-only starter specimens.

The guidance distinguishes documented server behavior from project decisions, hypothetical examples and unexecuted SQL. The references do not substitute for native lock, concurrency, permission, query-plan or recovery evidence.
