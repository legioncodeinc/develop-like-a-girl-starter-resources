# Query-plan capture specimen for an authorized operator

This is complete teaching code, not an executable Playbook tool. The Data Foundation role does not run it, read connection files, enter credentials or open a database connection. A database operator may adapt it only for a separately approved capture on the named environment.

## Preconditions and behavior

- Use an already installed `psql`; installation is a separate action.
- The operator chooses a non-secret `PGSERVICE` name whose credentials and TLS policy are configured privately outside this Playbook. There is no default localhost connection and no connection URI on the command line. Do not paste credential files or values into a report.
- Read the complete trusted SQL file first. It must contain exactly the intended single statement. This specimen is not a SQL parser or sandbox: a second statement, psql meta-command, mutating function or external effect is not made safe by the EXPLAIN prefix.
- `estimate` obtains planner output. `analyze` executes the statement. Analyze can write data, invoke triggers/functions, acquire locks and cause effects that rollback cannot undo. Record this distinction in the specific execution approval.
- Supply measured connection, statement and lock timeout budgets. A per-statement timeout is not a complete overall wall-clock watchdog, and cancellation or connection loss does not prove that remote effects were rolled back.
- Plans can reveal schema names, literals and sensitive values. Keep raw output in the operator's authorized location; provide a sanitized plan for review. The code deliberately does not echo the query or connection settings.

## Complete Bash specimen

Save/adapt only if an operator separately requests it. This code is not run by the repair or the Playbook.

```bash
#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 2 ]]; then
  printf '%s\n' 'Usage: capture-plan.sh estimate|analyze trusted-query.sql' >&2
  exit 2
fi
mode=$1
query_file=$2
case "$mode" in
  estimate) explain_options='FORMAT TEXT' ;;
  analyze) explain_options='ANALYZE, BUFFERS, FORMAT TEXT' ;;
  *) printf '%s\n' 'Mode must be estimate or analyze.' >&2; exit 2 ;;
esac

: "${PGSERVICE:?Operator must choose an existing authorized connection service}"
: "${PLAN_CONNECT_SECONDS:?Operator must supply the connection timeout}"
: "${PLAN_STATEMENT_MS:?Operator must supply the statement timeout}"
: "${PLAN_LOCK_MS:?Operator must supply the lock timeout}"
for value in "$PLAN_CONNECT_SECONDS" "$PLAN_STATEMENT_MS" "$PLAN_LOCK_MS"; do
  [[ "$value" =~ ^[1-9][0-9]*$ ]] || {
    printf '%s\n' 'Timeout budgets must be positive integer values.' >&2
    exit 2
  }
done

[[ -f "$query_file" && ! -L "$query_file" && -r "$query_file" ]] || {
  printf '%s\n' 'Supply an explicitly reviewed readable regular SQL file.' >&2
  exit 2
}
# The operator owns this file and must prevent replacement during capture.
query=$(cat -- "$query_file")
[[ -n "$query" ]] || { printf '%s\n' 'The SQL file is empty.' >&2; exit 2; }

# PGSERVICE is inherited by libpq. Do not print connection values.
# -X ignores psql startup commands. This does not validate the SQL or credential service.
PGCONNECT_TIMEOUT="$PLAN_CONNECT_SECONDS" \
PGOPTIONS="-c statement_timeout=$PLAN_STATEMENT_MS -c lock_timeout=$PLAN_LOCK_MS" \
  psql -X --no-password --set=ON_ERROR_STOP=1 \
  --command="EXPLAIN ($explain_options) $query"

cat <<'CHECKLIST'
Review headline and leaf nodes; estimated versus actual rows; loops and units;
buffer hits/reads and temporary I/O; sort/hash memory; expected index predicates;
visibility-map heap fetches; correctness and tenant scope; comparable capture conditions.
An estimated plan is not timing evidence. A completed ANALYZE capture is not a safety verdict.
CHECKLIST
```

This preserves the capture-then-checklist workflow. Automatic database execution, stdin query collection, default local connections and query echo are intentionally absent. It does not claim to enforce authorization or make SQL read-only. Use [the supplied-plan procedure](../guides/review-query-plan.md) for the actual Playbook review.
