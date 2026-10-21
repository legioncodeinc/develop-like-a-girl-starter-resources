# Full-text search, vector storage and data lifecycle

Use the existing Supabase PostgreSQL database and actual supported extensions. A schema proposal does not enable an extension or select an embedding model, external search engine, time-series service or replication destination. Inspect the project's accepted scope and database version before drafting an optional feature.

## Vector storage decisions

When vector storage is explicitly in scope, record the embedding model/revision, output dimension, numeric representation, distance function and source-text revision. The stored vector and query vector must agree on these properties. A number such as 1536 is an example dimension, not a provider/model default for Starter.

```sql
-- Optional inert sketch only after the vector extension and model are selected.
-- Enabling an extension is a separate approved database change.
ALTER TABLE public.documents ADD COLUMN embedding vector(1536);
CREATE INDEX documents_embedding_hnsw
  ON public.documents USING hnsw (embedding vector_cosine_ops);
```

Compare exact search, HNSW and IVFFlat using the actual extension version, dataset, filter distribution and quality target. HNSW trades memory/build cost for search behavior; IVFFlat requires training/data and list/probe choices. Neither a universal row threshold nor a current year chooses the right index. Check vector-type/dimension limits of the selected index. See [pgvector documentation](https://github.com/pgvector/pgvector).

| Distance | Operator | Matching vector operator class |
|---|---|---|
| Euclidean | `<->` | `vector_l2_ops` |
| Negative inner product | `<#>` | `vector_ip_ops` |
| Cosine | `<=>` | `vector_cosine_ops` |

The index and ORDER BY distance expression must match. Filters, including tenant access, can affect approximate recall; test authorized candidate generation and result quality. Do not retrieve all tenants and filter only in rendered output.

Data Foundation owns column, dimension, constraints and storage-index reasoning. Search Foundation owns chunking, top-k, hybrid combination, reranking and evaluation when selected. No vector column establishes a complete retrieval product. Provider calls and re-embedding are separate operations.

## PostgreSQL full-text search

Choose a text-search configuration from actual languages and the query intent. Keep tokenization, query construction and ranking consistent. A generated column can retain weighted title/body tokens; an index accelerates matching while ranking/result fetches still require work.

```sql
-- Existing public.articles(id, title, body) is assumed for this isolated sketch.
ALTER TABLE public.articles
  ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(body, '')), 'B')
  ) STORED;
CREATE INDEX articles_search_idx ON public.articles USING gin (search_vector);

-- Parameterize :search_text through the accepted client. Placeholder is not
-- literal executable SQL. Keep the actual ownership/RLS boundary in this path.
WITH query AS (
  SELECT plainto_tsquery('english', :search_text) AS terms
)
SELECT a.id, a.title, ts_rank(a.search_vector, q.terms) AS rank
FROM public.articles a CROSS JOIN query q
WHERE a.search_vector @@ q.terms
ORDER BY rank DESC, a.id
LIMIT 20;
```

The configuration must match product language; English stemming is not suitable for every dataset. Test stop words, empty terms, punctuation, accents, ranking and pagination stability. Input is data, never raw concatenated tsquery/SQL. Use the accepted driver or Data API parameter boundary.

FTS is useful when its parsing and ranking satisfy the product. Typos, substring matching and rich language/facet requirements need explicit evaluation. An already-supported `pg_trgm` index can address some similarity/substring cases, but does not automatically replace a full search design. Do not select another search service as a side effect of schema work. See [PostgreSQL text search](https://www.postgresql.org/docs/current/textsearch.html).

## Logical replication and change capture

Read an existing replication design when it affects migration or recovery. A source publication identifies tables; a subscriber consumes their changes. Subscription creation opens a connection and changes provider state, so no executable connection-bearing command is supplied as an automatic Starter step.

Preserve these design checks:

- Identify the authoritative source, subscriber, principal and table selection.
- Record initial snapshot behavior, row identity and update/delete requirements.
- Coordinate schema changes separately; ordinary logical replication does not replicate DDL or sequence state automatically.
- A stalled slot can retain WAL and consume storage. Record owner, lag budgets and recovery, including the effect of large transactions.
- Check permissions, sensitive data, tenant filtering and replay/retry semantics.
- Treat cross-region reporting, warehouse CDC and version-upgrade paths as separate accepted integrations, not a reason to create a service here.

See [logical replication restrictions](https://www.postgresql.org/docs/current/logical-replication-restrictions.html). Database schema review does not prove downstream delivery or continuity.

## Time-series requirements

Keep time-series decisions workload-based: append rate, corrections/late arrivals, time filters, storage age, rollup grains, retention and restore needs. PostgreSQL range partitioning can provide pruning and lifecycle boundaries; ordinary materialized summaries can provide rollups when a refresh mechanism is already selected. Neither should be added solely because data has a timestamp.

Specialist time-series systems often offer automatic chunks, continuous aggregates, compression and retention policies. Those are distinct capabilities to evaluate if separately requested. Their extension APIs and managed-provider commands are not a Starter default and are intentionally not copied into a Supabase SQL draft. Retention deletes data, compression changes storage behavior, and continuous refresh needs an owned execution mechanism.

Use [partitioning](04-partitioning.md), [workload fit](09-workload-platform-fit.md) and [recovery](10-recovery-and-exit-fit.md) to record whether the existing selected stack meets the actual requirement. Report an unsupported requirement rather than silently changing the database platform.
