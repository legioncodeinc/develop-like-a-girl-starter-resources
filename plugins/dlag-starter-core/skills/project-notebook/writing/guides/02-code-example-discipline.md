# 02 - Code Example Discipline


Code examples are often the best documentation: developers prefer working code over text explanations. The cardinal rule is that code examples must be **correct for its stated purpose and maintained with the same care as production code** -- never prioritize brevity over correctness.

---

## The four core properties (Google)

Every code example must be:

| Property | What it means | Fail indicator |
|---|---|---|
| **Correct** | Builds without errors, performs the claimed task, follows language conventions, free of security vulnerabilities | Copy-paste produces an error |
| **Concise** | No unnecessary lines, no over-engineering, no "while we're here" additions | More than ~30 lines for an illustrative snippet |
| **Understandable** | Descriptive variable names, no confusing tricks, no deep nesting | Reader must infer what a variable means |
| **Commented** | Non-obvious lines annotated; overall purpose explained in an introductory sentence | Reader cannot tell what the code does without reading the surrounding prose |

"Correct" is non-negotiable. A wrong example is worse than no example: it trains the reader to fail.

---

## The code-example checklist (apply per code block)

Use `templates/code-example-checklist.md` for the full Yes/No form. The checklist items:

1. **Runnable without modification when advertised as complete?** If prerequisites, omitted code or a provider context are missing, label it a fragment or NOT_RUN and record the exact gap; never call it copy-ready.
2. **Produces the claimed output?** If the doc says "outputs `200 OK`", the code actually does.
3. **Language-tagged in the code fence?** ` ```python ` not ` ``` `.
4. **Preceded by an introductory sentence?** The sentence ends with a colon if it immediately precedes the block, a period if other content follows.
5. **Omissions marked with language comments?** Use `# ... rest of implementation` not `...` or `...`.
6. **Non-obvious lines annotated?** Either inline comments for simple cases or GitHub-style annotation for complex ones.
7. **Named parameters used where clarity matters?** `create_user(name="Alice", role="admin")` not `create_user("Alice", "admin")`.
8. **Tested against the current library version?** Not stale from a 2-year-old API.
9. **Output or result shown where relevant?** For outputs that are non-obvious or difficult to run.
10. **Free of security anti-patterns?** No hardcoded secrets, no SQL injection, no unsafe eval.

---

## Introductory sentence rule

Every code block must be preceded by an introductory sentence or paragraph. The Python client calls below illustrate prose/fence formatting only; their undefined client is not an installed API or a runnable provider recipe.

- If the sentence immediately precedes the block: **end with a colon**.
- If other content follows between the sentence and the block: **end with a period**.
- Never end with a colon and then place other content before the code block.

**Examples:**

Good (immediate, colon):
> "Create a new user with the admin role:"
> ```python
> user = client.create_user(name="Alice", role="admin")
> ```

Good (separated, period):
> "The following example creates a user and assigns the admin role. Note that the role field is case-sensitive."
> ```python
> user = client.create_user(name="Alice", role="admin")
> ```

Bad (no introduction):
> ```python
> user = client.create_user(name="Alice", role="admin")
> ```

---

## Omission discipline

When an example omits code for brevity, mark the omission explicitly using a language-appropriate comment:

```javascript
// Teaching fragment only: omitted code is not a complete implementation.
function describeMessage(message) {
  // ... inspect the actual validated input contract before filling this fragment ...
  return message.text;
}
```

Never use `...` (ellipsis characters) for omissions -- they are ambiguous (are they Python's `...` literal? A prose abbreviation?). A fragment with omissions must not be presented as a complete copy-ready workflow. Mark its exact scope and missing behavior, especially authorization or signature verification.

---

## Naming discipline

Prefer descriptive, named parameters over positional arguments where clarity matters. The following Python calls are illustrative fragments, not a real selected provider API; supply the actual supported contract in a real how-to:

```python
# Good: named parameters, intention is clear
result = create_webhook(
    url="https://example.com/hooks",
    events=["payment.succeeded", "payment.failed"],
    secret=webhook_secret,
)

# Avoid: positional, reader must check the signature
result = create_webhook("https://example.com/hooks", ["payment.succeeded"], webhook_secret)
```

Use clearly artificial values such as `example.com` and `user@example.com`; never show a real credential or encourage a placeholder secret in a supposedly secure complete recipe -- not `foo`, `bar`, `baz`.

---

## Stripe's "working code on every page" philosophy

A useful documentation aspiration is fast, observable success. In this method, the goal is a complete, qualified implementation where the reader needs one; a prose or reference page does not automatically need an executable program. The Quickstart structure (zero theory, install / run / see result) means a developer can reach their first success without reading any other page.

Apply this as an aspiration: when reviewing a feature page that has no code example, file it as a **Suggestion** finding. When a page's example requires reading three other pages to understand, file the context gap as a **Suggestion**.

---

## Snippets-only warning

"Avoid snippets-only documentation, as teams tend not to test snippets as rigorously as full programs." (Google)

A snippet is a code fragment that cannot run in isolation. Snippets have their place (showing a single configuration option, for example), but if an entire page consists of snippets without a runnable example, flag it as a Suggestion finding: "Consider adding a complete, runnable example that demonstrates the end-to-end workflow."

See `examples/02-code-example-before-after.md` for a worked before/after.

A generic signature/HMAC sketch is not a provider webhook verifier. Optional hosted Stripe requires the installed supported SDK, exact raw body and actual environment/secret verification; no hand-rolled signature example is approved by a writing review. Python is only illustrative language in the snippets above, not a selected backend.
