# Use simple punctuation in authored prose

Do not use em dashes (Unicode U+2014) or en dashes (Unicode U+2013) in prose written for the user. Apply this rule to chat, documentation, commit-message and PR drafts, and code comments authored on the user's behalf. The regular hyphen (U+002D) is allowed. Drafting any such text does not authorize sending, committing or publishing it.

## Choose punctuation that preserves the meaning

| Relationship | Use | Example |
| --- | --- | --- |
| Brief pause or parenthetical | Comma | The build is ready, with the known limitation recorded. |
| Elaboration or definition | Colon | The record has one purpose: explain the accepted choice. |
| Aside | Parentheses | The old record (retained for history) links to its replacement. |
| Independent thoughts | Period | Inspect the source. Record what actually ran separately. |
| Closely related independent clauses | Semicolon | Approval records the owner's choice; sending needs its own action. |

## Preserve literal evidence

Preserve em/en dashes in a verbatim user quotation. Preserve them inside code, regex, JSON or other literal data being matched or processed. A newly written code comment is authored prose unless it quotes literal evidence. Do not rewrite unrelated pre-existing content merely because this task reads it. Keep an exact source quote exact; use ordinary punctuation in the explanation surrounding it.

## Check before saving or responding

Scan newly authored prose for both code points before delivering or saving. Replace a prose occurrence using the relationship table, then read the sentence to ensure its meaning still holds. If an occurrence is intentionally preserved, identify it as quoted or literal evidence rather than silently claiming a clean prose scan. This rule adds no tool, automated hook or configuration. Use the available editing/read tools and report an unperformed automated scan honestly.
