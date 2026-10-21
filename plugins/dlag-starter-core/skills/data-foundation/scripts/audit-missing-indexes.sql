-- INERT REVIEW SPECIMEN. The Playbook does not execute SQL or connect.
-- A separately authorized operator must inspect the complete file, select the
-- environment, set invocation-specific timeouts and use least-privilege access.
-- Results are review candidates, not automatic CREATE/DROP instructions.
-- PostgreSQL catalog semantics: see ../references/official-sources.md.

-- 1. Referencing foreign keys without an obvious valid, nonpartial B-tree
-- leading-key match. INCLUDED columns do not count as searchable key columns.
-- Leading FK-column order may differ when all are equality constrained.
-- Operator classes/collation, partitions and workload still need manual review.
WITH foreign_keys AS (
  SELECT c.oid, c.conname, c.conrelid, c.conkey,
         n.nspname AS schema_name, t.relname AS table_name,
         t.relkind, pg_catalog.pg_get_constraintdef(c.oid) AS definition
  FROM pg_catalog.pg_constraint c
  JOIN pg_catalog.pg_class t ON t.oid = c.conrelid
  JOIN pg_catalog.pg_namespace n ON n.oid = t.relnamespace
  WHERE c.contype = 'f'
    AND n.nspname NOT IN ('pg_catalog', 'information_schema')
    AND n.nspname NOT LIKE 'pg_toast%'
)
SELECT f.schema_name, f.table_name, f.conname, f.relkind,
       f.definition,
       ARRAY(SELECT a.attname
             FROM unnest(f.conkey) WITH ORDINALITY AS k(attnum, ordinal)
             JOIN pg_catalog.pg_attribute a
               ON a.attrelid = f.conrelid AND a.attnum = k.attnum
             ORDER BY k.ordinal) AS fk_columns
FROM foreign_keys f
WHERE NOT EXISTS (
  SELECT 1
  FROM pg_catalog.pg_index i
  JOIN pg_catalog.pg_class idx ON idx.oid = i.indexrelid
  JOIN pg_catalog.pg_am am ON am.oid = idx.relam
  WHERE i.indrelid = f.conrelid
    AND am.amname = 'btree'
    AND i.indisvalid AND i.indisready AND i.indislive
    AND i.indpred IS NULL AND i.indexprs IS NULL
    AND i.indnkeyatts >= cardinality(f.conkey)
    AND ARRAY(SELECT k.attnum
              FROM unnest(i.indkey) WITH ORDINALITY AS k(attnum, ordinal)
              WHERE k.ordinal <= cardinality(f.conkey)
              ORDER BY k.ordinal) @> f.conkey
)
ORDER BY f.schema_name, f.table_name, f.conname;

-- 2. Overlapping leading-key candidates. Return full definitions and properties.
-- A prefix match does NOT establish redundancy: unique/constraint purpose,
-- partial predicates, expressions, collations, operator classes, order, INCLUDE
-- columns and smaller-index cost must all be checked before any removal.
WITH indexes AS (
  SELECT i.*, n.nspname AS schema_name, t.relname AS table_name,
         x.relname AS index_name, am.amname,
         pg_catalog.pg_get_indexdef(i.indexrelid) AS definition,
         ARRAY(SELECT k.attnum
               FROM unnest(i.indkey) WITH ORDINALITY AS k(attnum, ordinal)
               WHERE k.ordinal <= i.indnkeyatts
               ORDER BY k.ordinal) AS keys
  FROM pg_catalog.pg_index i
  JOIN pg_catalog.pg_class x ON x.oid = i.indexrelid
  JOIN pg_catalog.pg_class t ON t.oid = i.indrelid
  JOIN pg_catalog.pg_namespace n ON n.oid = t.relnamespace
  JOIN pg_catalog.pg_am am ON am.oid = x.relam
  WHERE n.nspname NOT IN ('pg_catalog', 'information_schema')
)
SELECT a.schema_name, a.table_name,
       a.index_name AS shorter_index, b.index_name AS longer_index,
       a.definition AS shorter_definition, b.definition AS longer_definition,
       a.indisunique AS shorter_unique, a.indisprimary AS shorter_primary,
       a.indisvalid AS shorter_valid, b.indisvalid AS longer_valid,
       a.amname AS shorter_method, b.amname AS longer_method
FROM indexes a
JOIN indexes b ON b.indrelid = a.indrelid
  AND a.indnkeyatts < b.indnkeyatts
  AND a.keys = b.keys[1:a.indnkeyatts]
ORDER BY a.schema_name, a.table_name, a.index_name, b.index_name;

-- 3. Zero observed scans, excluding obvious constraint indexes.
-- Stats can reset at database or object scope. Observe a representative period,
-- rare jobs, replica usage and dependencies. No universal quarter proves disuse.
SELECT s.schemaname AS schema_name, s.relname AS table_name,
       s.indexrelname AS index_name, s.idx_scan,
       pg_catalog.pg_size_pretty(pg_catalog.pg_relation_size(s.indexrelid)) AS size,
       pg_catalog.pg_get_indexdef(s.indexrelid) AS definition,
       i.indisvalid, i.indisready
FROM pg_catalog.pg_stat_user_indexes s
JOIN pg_catalog.pg_index i ON i.indexrelid = s.indexrelid
WHERE s.idx_scan = 0 AND NOT i.indisunique AND NOT i.indisprimary
  AND NOT EXISTS (SELECT 1 FROM pg_catalog.pg_constraint c
                  WHERE c.conindid = s.indexrelid)
ORDER BY pg_catalog.pg_relation_size(s.indexrelid) DESC;

SELECT datname, stats_reset
FROM pg_catalog.pg_stat_database WHERE datname = current_database();
-- This database reset timestamp does not prove no individual-object reset occurred.
