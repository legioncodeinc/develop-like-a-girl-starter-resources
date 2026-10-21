# Before/After: Internal Tool README

> Draft/review only: read the supplied README and safe project evidence, then return a draft or findings in chat. Do not write files, run install/quickstart commands, check badges over the network, read credentials, configure CI or publish through this role. Mark unavailable runtime/network proof unexecuted. Project examples and placeholders are illustrative and must be resolved from actual receiving-project evidence before a runnable/current claim.

> Demonstrates: `guides/03-oss-vs-internal.md`, `guides/01-structure-checklist.md`

A worked before/after example showing how `GitHub Workflow` applies the internal register to a team tool README.

---

## BEFORE (submitted by user)

````markdown
# record-export-worker

This is a data synchronization worker service. It was built to sync data between our
approved Supabase records and the downstream search index. It runs on the
example-production-worker cluster.

## Getting Started

Clone the repo:

```bash
git clone git@github.com:org/record-export-worker.git
cd record-export-worker
npm install
```

Copy the env file:

```bash
cp .env.example .env
```

You'll need to fill in the dataset and index credentials. Ask your manager for the values.

## Running

```bash
npm start
```

## Contact

Talk to the platform team if something breaks.
````

---

## Audit table (Step 2 output)

| Section | Status | Notes |
|---|---|---|
| What problem this solves | ⚠️ warn | Buried in first paragraph; not its own section |
| Who maintains this | ❌ fail | "Talk to the platform team", no name, no Slack channel |
| Where it runs | ⚠️ warn | "example-production-worker cluster" but no environment breakdown |
| Setup / install | ⚠️ warn | Credentials: "ask your manager", where exactly? Which approved server-secret reference? |
| Usage | ❌ fail | `npm start` is not enough; what does it do? How do I know it's working? |
| Architecture notes |, | Absent; unusual design choices not documented |

**Overall:** Reader cannot get to "running" without human help. The credential setup is a blocker.

---

## AFTER (GitHub Workflow output)

````markdown
# record-export-worker

Syncs the approved Supabase records to the downstream search index through an explicitly approved on-demand Worker operation; no background-job provider is selected. Runs in
the `example-worker` namespace across all three environments (dev / staging / prod).

**Owner:** Platform team, `#platform-eng` on Slack  
**On-call escalation:** PagerDuty → "Platform On-Call" rotation

---

## Where it runs

| Environment | Cluster | Namespace | Dashboard |
|---|---|---|---|
| dev | example-development-worker | data-sync | [Grafana (dev)](https://grafana.internal/d/datasync-dev) |
| staging | example-preview-worker | data-sync | [Grafana (staging)](https://grafana.internal/d/datasync-staging) |
| prod | example-production-worker | data-sync | [Grafana (prod)](https://grafana.internal/d/datasync-prod) |

---

## Setup

**Prerequisites:** Node.js 20+, access to `the approved Cloudflare secrets reference, held by the authorized custodian`

```bash
git clone git@github.com:org/record-export-worker.git
cd record-export-worker
npm install
cp .env.example .env
```

Record the needed server-secret names and ask the authorized custodian to provision the approved environment; never copy values into this document. Original fictional setup reference: the `record-export-worker` item in **the approved Cloudflare secrets scope** vault.  
Required keys: `DATASET_PATH`, `DATASET_TOKEN`, `SEARCH_INDEX_URL`, `SEARCH_INDEX_KEY`.

---

## Running locally

```bash
npm start
# Connects to the dev dataset and dev search index by default (.env defaults point to dev)
# Logs: "Sync complete: 1,234 rows synced in 2.3s" on success
```

To run a one-off sync against a specific table:

```bash
TABLE=users npm run sync:once
# => Syncing table: users... Done (45 rows)
```

---

## Known failure modes

| Symptom | Likely cause | Fix |
|---|---|---|
| `DATASET_AUTH_ERROR` on startup | Token expired | Re-run `npm run auth:refresh` |
| Sync stalls at > 5 min | Dataset read lag | Check `#db-alerts` for dataset warnings |
| "0 rows synced" | Watermark stuck | Run `npm run reset:watermark -- --table=<tablename>` |

---

## Architecture

The worker uses a watermark-based incremental sync: for each table, it reads the `updated_at` value of the last synced row and fetches only rows updated after that timestamp. The watermark is stored in a small local state file at the accepted Supabase ownership-scoped state record (implementation not supplied by this example).

This means: full re-syncs are rare and expensive, do not run `npm run sync:full` in production without alerting `#platform-eng` first.

---

## Contributing

Changes go through PR → review by 1 platform team member → merge. Run `npm test` before opening a PR. Integration tests require `INTEGRATION=true` in `.env`.
````

---

## What changed

| Change | Principle |
|---|---|
| Renamed intro to "what it does + who owns it" | Internal register: context first, not pitch |
| Added owner + on-call escalation prominently | The most critical missing piece, "talk to the platform team" is not actionable |
| Added environments table with dashboard links | Teammates need operational context, not marketing |
| Specified credential location (approved server-secret reference) | Broke the "ask your manager" blocker |
| Added expected log output for `npm start` | "How do I know it's working?" is the #1 internal tool question |
| Added known failure modes table | Operational knowledge that lives nowhere else |
| Added architecture note about watermark | Documents the unusual design decision that trips up new contributors |

These before/after documents illustrate writing choices only. The fictional package/API, dashboard, scripts and worker implementation are not supplied or executed. Expected outputs are teaching shapes, not test receipts; no package install, provider secret provisioning, scheduled job or recovery action is authorized. Resolve all fields from an actual target before making runnable/current claims.
