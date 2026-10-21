# Transactional Email worksheet

Status: Draft. Expected outcomes below are not executed results.

## Transactional event and purpose

[Fill from project evidence.]

## Server-validated recipient/template/sender

[Fill from project evidence.]

## Business-event uniqueness and transaction boundary

[Fill from project evidence.]

## Durable intent store and atomic send claim

[Fill from project evidence.]

## Immutable payload and stable idempotency key

[Fill from project evidence.]

## Execution trigger and failure recovery

[Use a bounded synchronous attempt after the durable save when suitable; otherwise name the selected processor. Record who may retry, how an uncertain result is reconciled, and what happens if the request ends before sending. Do not assume a queue or schedule exists.]

## Unknown-response reconciliation and retention window

[Fill from project evidence.]

## Supabase SMTP versus Worker app sends

[Fill from project evidence.]

## Observed checks and missing delivery proof

[Fill from project evidence.]
