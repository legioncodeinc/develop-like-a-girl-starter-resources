# 01: Schema Design

Postgres-first schema. Use the type system; don't reinvent it in app code.

See [official references](../references/official-sources.md) for PostgreSQL and Supabase behavior.

## Default scaffolding for any new table

```sql
CREATE TABLE example (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,  -- modern; not BIGSERIAL
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- ... real columns
  -- soft delete only when you have a use case
  -- deleted_at TIMESTAMPTZ
);
```

- **Primary key:** Identity bigint and UUID are both useful. Keep existing conventions; use UUID references for Supabase Auth identities. `gen_random_uuid()` generates a UUID v4. Other UUID generators depend on the actual PostgreSQL version/extensions. A non-sequential identifier is not authorization.
- **Timestamps:** `timestamptz` for instants; display uses the session time zone and the original zone label is not retained. Use `timestamp` only when a local civil time without a zone is the actual modeled value.
- **`updated_at`:** maintain consistently with a reviewed `BEFORE UPDATE` trigger when several writers exist. A default alone does not update the value on later changes.
- **Soft delete:** `deleted_at TIMESTAMPTZ` only when the use case demands history. Choose retention and deletion from product requirements. A soft-delete flag is neither an audit trail nor proof of erasure.

## Type selection: the cheat sheet

### Strings
- Use `text` for unconstrained strings. `varchar(n)` or a length CHECK is appropriate when the limit expresses a real requirement; avoid an arbitrary 255-character limit.
- Add a `CHECK (length(col) <= N)` if you need a length constraint.

### Numbers
- `BIGINT` for IDs and counts that could grow. `INT` for fixed-range values.
- `NUMERIC(p, s)` for money and any value where rounding matters. **Never** `DOUBLE PRECISION` for money.

### Booleans
- `BOOLEAN`. Keep nullable only when "unknown" is a valid third state; otherwise `NOT NULL DEFAULT false`.

### Dates and times
- `TIMESTAMPTZ` for points in time. `DATE` for calendar dates. `TSRANGE` / `TSTZRANGE` for intervals (paired with `EXCLUDE` constraints, see below).

### `jsonb` vs columns

Review each field against its use, rather than applying a numerical cutoff:

| Use `jsonb` when | Use columns when |
|---|---|
| Schema varies per row (extension fields per tenant) | Schema is uniform |
| Field is read in full or not at all | Field is filtered, sorted, joined, aggregated |
| Audit payloads, vendor blobs, webhook records | Stable fields with relational invariants or repeated predicates |

GIN index for targeted predicates:
```sql
CREATE INDEX ON events USING gin (payload jsonb_path_ops);
```

Choose the operator class from actual predicates. `jsonb_path_ops` supports containment and supported JSON-path matching (`@>`, `@?`, `@@`); it does not support key-existence operators. Its index is often smaller, but confirm workload behavior. See the official JSON indexing reference.

### Arrays
- Ordered short lists where you read the whole array.
- **Don't** use when you'd join on elements: use a child table.

### Enums
```sql
CREATE TYPE order_status AS ENUM ('pending', 'paid', 'shipped', 'delivered', 'refunded');
ALTER TABLE orders ADD COLUMN status order_status NOT NULL DEFAULT 'pending';
```
- Closed sets that change rarely.
- Adding values uses `ALTER TYPE ... ADD VALUE`; check the actual version and transaction/use constraints before including it in a migration.
- Removing is hard: switch to a lookup table if churn is expected.

### Range types and `EXCLUDE`
The killer feature for non-overlapping intervals:
```sql
CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE TABLE bookings (
  room_id BIGINT NOT NULL,
  during TSTZRANGE NOT NULL,
  EXCLUDE USING gist (room_id WITH =, during WITH &&)
);
```
Check extension availability and schema permissions before adapting this inert SQL. With nonempty ranges and the shown exclusion constraint, two bookings for the same room cannot overlap. Enforced in the database, not in optimistic-locking app code that breaks under concurrency.

### Custom domains
```sql
CREATE DOMAIN email AS text CHECK (VALUE ~* '^[^@]+@[^@]+\.[^@]+$');
ALTER TABLE users ADD COLUMN email email NOT NULL UNIQUE;
```
Centralize a constraint in the type. This regex is only a toy structural example, not full email validation. Supabase Auth remains the identity authority; do not create a competing authentication table.

## Constraints

### `NOT NULL`
Use NOT NULL for required facts. Keep nullable fields for genuinely optional or unknown values, including historical facts never recorded. CHECK expressions that evaluate to NULL pass, so pair them with NOT NULL when required.

### `CHECK`
Express invariants the database can enforce: `CHECK (price >= 0)`, `CHECK (started_at <= ended_at)`. Existing-table validation can scan data and take locks; use the migration procedure.

### `UNIQUE`
Enforces a single-column or multi-column uniqueness constraint. Backed by a unique B-tree index. Partial uniqueness:
```sql
CREATE UNIQUE INDEX users_email_active ON users (email) WHERE deleted_at IS NULL;
```

### Foreign keys
```sql
ALTER TABLE posts
  ADD COLUMN author_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT;
CREATE INDEX ON posts (author_id);  -- review existing usable coverage first
```

`ON DELETE` choice: `NO ACTION` is the default; `RESTRICT` rejects the operation without a deferred check, `CASCADE` deletes dependent rows, and `SET NULL` preserves the child only when null is allowed. Pick deliberately and test the retention consequences.

## Normalization: and where to break it

3NF by default. Break it deliberately for:
- **Denormalized counts** (`comments_count` on `posts`): maintained by a trigger or app code; cite the trade-off in a comment.
- **Materialized views** for expensive read aggregates; refresh on a schedule.
- **`jsonb` snapshots** of related data (denormalized order line items copied into `order_history`), when historical accuracy matters and the source can change.

## Audit columns: when

The minimum: `created_at`, `updated_at`. Add when needed:
- `created_by`, `updated_by`: for compliance / customer-support traceability.
- A separate audit-log design when required. An ordinary table or trigger alone is not tamper-evident; retention, privileges and integrity controls need Security Review.

For deeper audit, hand off to `Security Review Specialist`.

## PII and security flags

Mark columns that hold PII so `Security Review Specialist` can audit RLS, encryption, and retention:

```sql
COMMENT ON COLUMN users.email IS 'PII';
COMMENT ON COLUMN users.phone_number IS 'PII';
COMMENT ON COLUMN payments.last_four IS 'PII (PCI-adjacent)';
```

These comments become discoverable via `pg_description`. Data Foundation Specialist flags PII; Security Review Specialist audits the controls.

## Cross-references

- [Indexing](02-indexing.md): identify a workload-based index plan, including justified no-index decisions.
- [Migrations](03-migrations.md): choose phases from compatibility and lock risk.
- [Client review](07-orm-choice.md): check what the existing client and generated SQL can represent.
