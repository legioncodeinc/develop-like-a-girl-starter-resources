# Example: review and repair a code example

This constructed writing review demonstrates the complete code checklist, actionable findings and a full corrected program. It teaches Workers-compatible JavaScript input validation with no provider, credential, package or network dependency. It is not a webhook-signature or payment recipe.

## Input: code block with issues

The document claims that this code rejects any quantity that is not a complete integer from 1 to 99. The deliberately poor block has no language tag and no useful introductory context:

```
function parseQuantity(raw) {
  return Number.parseInt(raw, 10);
}
console.log(parseQuantity("3cats"));
```

This program prints 3 even though the input violates the described contract. The code is syntactically valid; the defect is the unsupported behavior claim. Do not invent a nonexistent standard-library API error when the actual fault is incorrect validation or missing inputs.

## Apply the full checklist

| # | Check | Review result and reason |
| --- | --- | --- |
| 1 | Runnable when advertised complete | Yes for the small program; not a complete HTTP action |
| 2 | Produces the claimed result | No: parseInt accepts a prefix rather than validating the entire input |
| 3 | Language-tagged fence | No: the example has a bare fence |
| 4 | Introductory explanation | No useful contract/prerequisite context in the candidate |
| 5 | Introductory punctuation | Needs a real sentence immediately before the block |
| 6 | Omissions explicit | No ellipsis here; any HTTP/auth integration would be an explicit separate gap |
| 7 | Non-obvious behavior explained | No: prefix parsing is unexplained |
| 8 | Named argument clarity | Prefer an object argument to make the raw field explicit |
| 9 | Artificial but realistic inputs | Yes: the malformed value clearly illustrates the boundary |
| 10 | Actual version/runtime qualification | Requires the actual local runtime check; never infer it from review |
| 11 | Claimed output visible | No expected output is given in the candidate |
| 12 | Security/permission scope honest | This is input validation only; it supplies no identity, ownership or signature check |

## Findings

**B1: Incorrect behavior claim.** Location: parseQuantity. Prefix parsing accepts `3cats`; a reader would implement weaker validation than the text promises. Replace it with full-string validation, explicit type/range checks and observable denied cases.

**S1: Missing language/context.** Location: code fence. Tag the block javascript and state the input contract, environment and expected result immediately before it.

**S2: Incomplete qualification.** Location: result claim. Record the actual runtime result for the exact program. If it has not run, keep execution NOT_RUN. Do not label every checklist item Pass from a static rewrite.

**N1: Call clarity.** Location: the parameter. Use `parseQuantity({ raw: ... })` so the reader can see the argument's meaning. JavaScript object properties supply that clarity without an invented named-argument syntax.

## Complete corrected program

This program accepts a string containing a complete decimal integer from 1 through 99 and rejects trailing text, exponent notation, whitespace, zero and values above the bound. Run only in an already available approved JavaScript runtime; no installation is required by this specimen:

```javascript
function parseQuantity({ raw }) {
  if (typeof raw !== "string" || !/^[1-9][0-9]?$/.test(raw)) {
    throw new TypeError("invalid quantity");
  }
  return Number(raw);
}

console.log(parseQuantity({ raw: "3" }));
for (const raw of ["3cats", "1e3", " 3", "0", "100"]) {
  try {
    parseQuantity({ raw });
    throw new Error("invalid input was accepted");
  } catch (error) {
    if (!(error instanceof TypeError)) throw error;
    console.log(`${raw}: invalid quantity`);
  }
}
```

Expected output, subject to the separately recorded runtime check: 3, followed by one `invalid quantity` result for each of the five invalid strings. This is a complete small validation program, not a React Router form action. An actual protected mutation also needs server identity/ownership, actual FormData handling, origin/CSRF checks, safe error responses and its own tests.

## Why the repair is useful

The corrected code preserves the stated contract, shows the non-obvious rejected inputs, names the field and keeps all dependencies visible. If another example contains `...`, remember that it may be a real language value such as Python Ellipsis or invalid syntax, never a safe hidden secret. A fragment must state its omitted parts. Generic HMAC/signature sketches and hardcoded fake secrets cannot qualify a real Stripe or Resend webhook; use the actual supported provider verifier and raw-body contract during an authorized implementation task.
