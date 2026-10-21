# Review the rendered explanation exercises

These illustrative comparisons teach source-versus-explanation review. Local fixture passages and hashes are available; current automated execution, independent review and reader understanding are NOT_RUN/Pending. Expected wording is not an execution receipt.

## Draft PRD: preserve the permission and sending sequence

Source: [invoice-note PRD](../fixtures/prd/PRD-001-invoice-notes.md). Reader manuscript: [plain PRD explanation](../../../../examples/plain-invoice-prd.md).

The source gives owners exclusive approval authority in their own workspace, orders review before approval before an explicit send request, and explicitly separates approval from sending. The rendered second paragraph retains all of those requirements. The third paragraph keeps members' narrower read-only authority. The opening retains Draft status; the fourth paragraph leaves automated reminders in future work and retention unresolved. Expected source comparison: preserved meaning; current independent review remains pending. Human understanding: Pending.

Rejected candidate wording: “Team members approve notes, and the system sends them automatically.” This loses the owner restriction, invents automatic sending and reverses the source's explicit separation. Specific rewrite: “Only an owner may approve a note for an invoice in that owner's workspace. Approval alone does not send it; the owner must separately request sending.” The local teaching manuscript retains that correction.

## Repository fixture: do not infer the missing permission implementation

Source: [handler](../fixtures/repo/src/routes/invoices.ts), [data stub](../fixtures/repo/src/data/invoices.ts), [Accepted contract](../fixtures/repo/contracts/invoice-read.md). Reader manuscript: [invoice repository tour](../../../../examples/beginner-invoice-tour.md).

The handler exposes identity, delegated permission and data branches in that order. The permission implementation is absent, so the rendered tour says the exact access policy cannot be established. The data function throws, and the tour says no database read succeeds in the supplied fixture. The Accepted contract is described as required behavior rather than evidence of implementation. Expected source comparison: preserved meaning; current independent review remains pending. Human understanding and application execution: Pending/Unproven.

Rejected candidate wording: “The permissions function guarantees that signed-in members only read their workspace's invoices.” No supplied implementation supports that guarantee. Specific rewrite: “The handler asks for a permission decision before reading data. The permission function's implementation is missing, so this source cannot establish which callers it permits.”

## Source writers do not prove native execution

A source-backed explanation of an actual build must trace real arguments, dependency choices, output safety, writes and errors. The [local source-versus-execution lesson](../../../../examples/actual-build-journey.md) keeps those categories separate but supplies no builder implementation. Its worksheet must be filled from the actual requested target. Do not claim generated output was discovered by Claude Code or that a Specialist ran without observed evidence.

Rejected wording: "Once an artifact writer exists, the host executes the result." Correct wording: "The source defines a writer; actual writing, validation, native discovery and execution need separate observed evidence."

## Learning-method boundary

The glossary and analogy follow the existing Technical Explainer ownership. The analogy in each rendered document includes its stopping point, and the factual account remains visible. Each document asks a concrete teach-back question and records no reader response yet. No grade score, numerical learning lift, comprehension pass, Word/PDF page review or app/runtime qualification is claimed.


Local fixture locators resolve relative to this knowledge resource root. Their current static traceability must be checked independently from execution or reader comprehension.
