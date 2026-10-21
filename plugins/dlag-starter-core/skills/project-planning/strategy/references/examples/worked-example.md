---
title: "Product Strategy: Tallyline (made-up example)"
status: draft
owner: "Example Owner"
last-reviewed: "2026-10-12"
next-review: "2027-04-12"
source: project-planning-strategy
---

<!--
MADE-UP EXAMPLE. Tallyline, its customers, and every number here are invented to show
the shape of a finished strategy. Nothing here is research or a recommendation.
Run: python3 scripts/check-strategy.py references/examples/worked-example.md
-->

# Product Strategy: Tallyline

**In one sentence:** For solo bookkeepers who chase clients for receipts every month, Tallyline collects authenticated browser uploads and matches receipts to bank CSV lines, so month-end closes in hours instead of days, which email and shared folders cannot do because clients ignore them.

## 1. The problem

Dana keeps the books for 22 small shops. Every month she emails each client for missing receipts. Half do not answer. She spends the last four days of each month chasing, and twice this year she filed late and paid the penalty for a client.

- **How we know:** the owner did this job for six years, and 5 bookkeepers in an online group described the same chase. Demand from people who are not the owner is still owner belief, not yet tested (A1).

## 2. Who it is for

- **Best-fit customer:** solo bookkeepers with 10 to 40 small-business clients who mostly pay with cards.
- **Who decides and who pays:** the bookkeeper uses it and pays. Their clients open a transactional receipt-request email and sign in to upload.
- **Not for (yet):** accounting firms with staff, and businesses doing their own books.
- **Deeper ICP work:** not needed yet. The owner was this customer. Revisit after 20 paying users.

## 3. The job to be done

When the month is ending, they want every client receipt matched to its bank line, so they can close on time without chasing anyone.

- **Pains today:** clients ignore email; matching by hand is slow; late filing penalties.
- **Gains they want:** close in one day; look professional to clients.

## 4. Positioning and how we are different

| Part | Our answer |
|---|---|
| What they use today instead (competitive alternatives, including "do nothing") | Email reminders, shared folders, the receipt feature in their accounting software, or doing nothing and estimating |
| What we have that those do not (unique attributes) | Clients upload a receipt photo in a browser after signing in; amount/date entry supports matching to the bank CSV |
| Why that matters to them (value) | Clients actually answer; month-end shrinks from days to hours |
| Who cares the most about that value (best-fit customers) | Solo bookkeepers with many small clients |
| The market we say we are in (category) | Receipt collection for bookkeepers (a niche of receipt capture) |

- **Competitive research:** not done yet.
- **Positioning check-in:** 2027-04-12 [D-002]

## 5. Our big bets (2 to 4)

| # | Bet | Why we believe it | What would prove us wrong | Moves which input |
|---|---|---|---|---|
| B1 | A direct receipt-upload request beats chasing in shared folders | Fictional owner saw clients complete direct upload requests the same day | Fewer than half of requested receipts come back within 3 days | I1 |
| B2 | Win solo bookkeepers before firms | Owner knows this group; fast buying decision | Solo users churn within 2 months | I3 |
| B3 | Amount/date matching is good enough with an explicit customer confirmation | Clients enter receipt amount and date with the photo | More than 1 in 5 proposed matches need fixing | I2 |

Not betting on: a mobile app for clients, or full bookkeeping features.

## 6. How we will know it is working

- **The game we are playing:** productivity. Bookkeepers want month-end work done faster.
- **North-star metric:** **Months closed on time**: count of client-months where every receipt was matched by the 3rd of the next month.
- **Why this one:** it is the value the bookkeeper pays for, and on-time closes should lead renewals.

| Input | Definition | Bet that moves it |
|---|---|---|
| I1 Reply rate | Share of receipt requests answered within 3 days | B1 |
| I2 Suggested-match acceptance rate | Share of suggested matches accepted without correction | B3 |
| I3 Clients connected | Average clients per bookkeeper set up in their first 2 weeks | B2 |

- **Not our north star:** revenue, sign-ups, and receipt-request emails sent. We watch them but do not steer by them.

## 7. Version 1

- **Appetite:** 6 weeks of one builder.
- **In v1:** add clients by email address; send a transactional receipt request; let the invited client sign in and upload a photo with amount/date; suggest a match to an uploaded bank CSV for confirmation; show a month-end checklist.
- **NOT in v1:** bank feed connections (CSV upload is enough to test the bets); accounting software sync (wait for 20 paying users to ask); installed client app (browser uploads only); team accounts (solo bookkeepers first).
- **Rabbit holes to avoid:** reading handwritten receipts. v1 matches only on client-entered amount and date, followed by confirmation.

## 8. Risks and the riskiest assumption

| # | Assumption (must be true) | Type | Importance | Evidence today | Risk |
|---|---|---|---|---|---|
| A1 | Solo bookkeepers other than the owner lose 2 or more days a month chasing receipts | desirability | high | some | med |
| A2 | Clients will follow a receipt request and upload a photo within 3 days | desirability | high | none | high |
| A3 | Bookkeepers will pay 30 dollars a month for this | viability | high | none | high |
| A4 | Amount and date are enough to match most card receipts | feasibility | med | some | med |

**Riskiest assumption:** A2: clients will follow a receipt request and upload a photo within 3 days.

**Test it first:**

- **Smallest test:** proposed only: after separate authorization, the owner asks 30 consenting clients of 3 friendly bookkeepers to complete one receipt-upload task using an existing authorized form. No product build, provider choice, contact or upload is performed by this example.
- **Pass looks like:** 60 percent or more complete the authorized task with a usable photo within 3 days.
- **Fail looks like:** under 40 percent.
- **If it fails:** revisit the form steps and test the revised task before building the product.
- **Owner and date:** Example Owner, by 2026-11-05.
- **Detailed test plan:** not started.

---

## Pricing hypothesis

Bookkeeper pays a flat 30 dollars a month (hypothesis, tests A3). Owner for real pricing work: an owner-designated pricing method, unavailable as a Starter specialist. [D-003]

## Starter implementation assumptions, unbuilt

The example proposes React/Vite/React Router framework mode with SSR, Tailwind and React shadcn/ui. Cloudflare Workers validates application operations; Supabase Auth identifies users and Supabase PostgreSQL owns receipt/client records. R2 stores file bytes. An upload or download must check the authenticated user against the invited client and record owner before granting access; no public bucket or client-supplied owner ID grants access. Cloudflare secrets holds server credentials. Resend sends transactional receipt requests only. No SMS, newsletter, OCR/model provider or background-job provider is selected. Optional payments are deferred; a future hosted Stripe Checkout success redirect would not grant an entitlement without verified server evidence. These are planning boundaries, not implemented controls.

## Open questions

- OPEN: Which existing authorized form and consenting participants can the owner use for A2? Keep the proposed test unrun until those choices and external contact are authorized.

## Decision log

| ID | Date | Decision | Note |
|---|---|---|---|
| D-001 | 2026-10-12 | Solo bookkeepers first | decisions/D-001-solo-bookkeepers-first.md |
| D-002 | 2026-10-12 | Positioning check-in every 6 months | decisions/D-002-positioning-check-in.md |
| D-003 | 2026-10-12 | Flat monthly price hypothesis | decisions/D-003-flat-price-hypothesis.md |

## Hand-off

- **Next:** the owner-approved UX method reads sections 2, 3, 4 and 7. the Project Planning build-order method reads sections 5, 6, 7 and 8, and schedules the A2 test first.
- **Not covered here:** PRDs (dlag-starter-core:project-notebook), OKRs (an owner-designated goals method (unavailable as a Starter specialist)).
