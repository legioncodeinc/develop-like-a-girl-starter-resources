# Source behavior and execution are separate

> Category: Architecture | Version: 1.0 | Date: [actual date] | Status: Synthetic specimen / NOT_RUN

This bounded lesson uses the local [invoice handler](../references/examples/novice-explanation/fixtures/repo/src/routes/invoices.ts), [data stub](../references/examples/novice-explanation/fixtures/repo/src/data/invoices.ts) and [fixture description](../references/examples/novice-explanation/fixtures/repo/README.md). It shows how to qualify a real source journey without claiming the application or build ran.

## Find the actual entrypoint

The supplied readInvoice function accepts IDs, checks for a supplied user ID and asks a separate permission function before requesting data. A handler function is not proof of a deployed route, a trusted identity verifier or a correctly implemented permission rule. Follow only the actual calls in the authorized source set.

## Preserve validation and failure order

The visible 401 and 403 returns precede data access. The permission implementation is intentionally absent, so its policy cannot be established. The data function always throws; visible 404/200 branches in the handler do not prove a successful database result. Treat those gaps as part of the explanation, not as omitted setup to invent.

## Apply the same discipline to a requested build journey

A build explanation needs that target's actual entrypoint, parsed arguments, output-safety checks, dependency selection, errors and generated-file writes, each with exact source bytes and locators. Unknown selections, dependency cycles, unsafe output paths and write failures must remain visible when the real source implements them. No builder input is supplied by this small fixture, so it supports no claim about a builder's implementation or generated package.

## Generated output is a separate evidence category

A function that writes an artifact does not establish that it ran, that the output validates, that Claude Code discovered it or that a Specialist executed. Preserve those stages separately. A useful packing-list analogy explains declared prerequisites only; it cannot establish acceptance or runtime behavior of a host.

## Check your understanding

The handler contains a permission call and a 200 branch. Which missing source and execution evidence prevents us from saying a cross-owner request is safely denied and an allowed read works?

Reader response: Pending. Understanding: Pending. Application/build/native runtime: NOT_RUN. Use the [journey-ledger worksheet](../references/examples/novice-explanation/evidence/actual-build-ledger.json) only with actual target inputs; its placeholders are not source proof.
