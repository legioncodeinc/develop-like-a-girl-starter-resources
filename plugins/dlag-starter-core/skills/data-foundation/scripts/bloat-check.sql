-- INERT REVIEW SPECIMEN. No connection, maintenance or extension install occurs.
-- Operator execution requires separate authorization, environment and budgets.
-- n_live_tup/n_dead_tup are estimates. dead_pct is NOT physical table bloat.
-- Index size/scans are NOT index-bloat measurement.

-- 1. Dead-tuple pressure and recent maintenance, largest 50 candidate tables.
SELECT schemaname AS schema_name, relname AS table_name,
       pg_catalog.pg_size_pretty(pg_catalog.pg_relation_size(relid)) AS table_size,
       n_live_tup, n_dead_tup,
       CASE WHEN n_live_tup + n_dead_tup = 0 THEN 0
            ELSE round(100 * n_dead_tup::numeric / (n_live_tup + n_dead_tup), 2)
       END AS estimated_dead_tuple_pct,
       last_vacuum, last_autovacuum, last_analyze, last_autoanalyze
FROM pg_catalog.pg_stat_user_tables
WHERE n_live_tup + n_dead_tup > 1000
ORDER BY CASE WHEN n_live_tup + n_dead_tup = 0 THEN 0
              ELSE n_dead_tup::numeric / (n_live_tup + n_dead_tup) END DESC,
         pg_catalog.pg_relation_size(relid) DESC
LIMIT 50;

-- 2. Identify whether a physical-inspection extension is already installed.
-- This query neither installs it nor invokes it; availability is not permission.
SELECT extname, extversion FROM pg_catalog.pg_extension
WHERE extname = 'pgstattuple';

-- 3. Index-size listing. The presence of pgstattuple does not turn this query
-- into a physical-bloat check. Further inspection requires its own load review.
SELECT s.schemaname AS schema_name, s.relname AS table_name,
       s.indexrelname AS index_name,
       pg_catalog.pg_size_pretty(pg_catalog.pg_relation_size(s.indexrelid)) AS size,
       s.idx_scan, i.indisvalid, i.indisready
FROM pg_catalog.pg_stat_user_indexes s
JOIN pg_catalog.pg_index i ON i.indexrelid = s.indexrelid
ORDER BY pg_catalog.pg_relation_size(s.indexrelid) DESC
LIMIT 50;

SELECT datname, stats_reset FROM pg_catalog.pg_stat_database
WHERE datname = current_database();

-- Review write rate, long transactions, vacuum capacity, actual statistics window,
-- storage pressure and query impact. No percentage here triggers automatic repair.
-- Vacuum tuning, REINDEX, VACUUM FULL or online rewrite each needs a separately
-- reviewed operation, exact lock/resource impact, rollback/recovery and approval.
