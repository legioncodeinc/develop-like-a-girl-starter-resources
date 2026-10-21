# Worked cases

These local examples preserve boundary checks, batched reads, async fixtures, schema-change review, entry wiring, and artifact proof. They do not install a framework or grant a provider action. [Required context](../guides/00-context-and-review.md) applies throughout.

## 1. A bounded request contract

`public-body.mjs` reads at most 4096 bytes from an application/json request stream, rejects malformed UTF-8 and JSON, rejects arrays/unknown fields/invalid title lengths, and returns stable public codes. Its public handler implements POST validation only. The complete [public request tests](public-body.test.mjs) cover its small contract, including 415 media type, 400 malformed JSON and 413 body limits. It performs no authenticated mutation. Before adapting it to a real action, add the project's actual session verification, CSRF/origin contract, authorization, timeout/abort policy, and database adapter. A declaration or placeholder callback is not that implementation. Test large bodies without trusting Content-Length, read failures, extra fields, invalid encoding, and non-POST requests.

## 2. One batched data read

`read-notes.mjs` receives a small honest adapter interface and an already verified principal. It rejects invalid ID collections, handles empty input without querying, deduplicates IDs, makes one bounded call, validates the returned owner and selected ID set, and projects only id/title. The flag `verified:true` is a contract from a real server adapter, never client JSON. This domain function is not a Supabase authentication implementation. Use generated database types in that adapter, query through parameter/filter APIs, and keep RLS active. No SQL string escaping shim is supplied. A backend response containing another owner or unexpected ID is rejected rather than hidden as empty data.

## 3. A meaningful async fixture

The complete [Node test example](read-notes.test.mjs) exercises the exported readNotes unit using a minimal fake adapter. A capable authorized caller can run this task-local example with the existing Node built-in test runner; it performs no network calls or app imports. The fake is not cast to a complete SDK. It asserts zero calls for empty input, one call for duplicate IDs, exact principal forwarding, safe DTO projection, and rejection of cross-owner rows. A test that merely calls the fake cannot establish these properties. The same principle applies in the existing test runner; preserve returned-promise and rejection assertions and reset mocks/timers between cases.

## 4. Adding a database field

For a tags field, write a reviewed Postgres migration through the database owner's process, decide nullable/default/backfill behavior for existing rows, inspect affected RLS, update generated database types, and change input validation and public DTO deliberately. Test old rows, new inserts, invalid tags, projection, and authorized reads. Do not copy a second column array or issue lazy ALTER from a request. No migration is applied by this example. The migration worksheet records the actual proposed SQL, lock/backfill risks, preview evidence and rollback/roll-forward choice before any apply approval.

## 5. Wiring an application entry

Record the source module, browser/Worker/Node target, build entry, generated output path, transitive imports, required configuration, and consumer. Register it through the existing build scaffold. Add it to the deliverable allowlist if required. Compare the actual output to the record, including dynamic assets and server exports. Test the built entry, a missing output, an unexpected output, and a mismatched version/hash. No additional agent harness, detached worker, npm publish target, or unselected SDK is introduced.

## 6. A bounded concurrent operation

`bounded-map.mjs` runs at most eight operations with at most 100 supplied items and preserves result positions. The synthetic test measures peak in-flight operations and rejection. A rejection does not cancel already running work. It is an example for independent operations within one process/isolate, not a global provider quota or durable job system. For writes, establish transaction/idempotency semantics before parallelizing or retrying.

## Type illustration limits

`request-types.ts` requires an existing compatible React Router framework scaffold and generated route types. It was not compiled against a real app. The independent JavaScript examples were exercised under Node's Web APIs, which does not prove Workers request behavior, SSR, React rendering, Supabase, R2, or provider contracts.

## Illustrative migration and derived shapes

For an application that already owns a `public.notes` table and has approved a tags array with an empty-array default for existing rows, the proposed migration could contain:

```sql
ALTER TABLE public.notes
  ADD COLUMN tags text[] NOT NULL DEFAULT '{}'::text[];
```

This is a review specimen, not an applied migration or a universal safe default. Confirm table ownership, current column state, locks/size, data meaning, policy implications and rollback/roll-forward evidence first. Do not run it in a request handler. If a column already exists, inspect its type/default/constraint instead of catching every DDL failure as success.

Once the actual approved schema's types have been generated into the project-owned database type module, derive the adapter shapes from that single source:

```ts
// Database must be imported from the project's real generated declaration.
// The table and schema keys must exist in that generated source.
type NoteRow = Database['public']['Tables']['notes']['Row'];
type NoteInsert = Database['public']['Tables']['notes']['Insert'];
type NoteUpdate = Database['public']['Tables']['notes']['Update'];
type PublicNote = Pick<NoteRow, 'id' | 'title'>;
```

The snippets require the real schema and generated module and were not compiled. A `Pick` defines the static projection but does not strip runtime object fields; the actual readNotes implementation constructs a new id/title object. Update tags validation and DTOs only where the product intends to expose or accept tags. Test new rows, existing rows, unexpected nulls, invalid array values and authorization after the migration. A schema diff and generated types do not prove live RLS.
