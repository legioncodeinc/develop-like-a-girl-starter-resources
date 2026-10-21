# Inspect supplied automation evidence without activating it

Use this reference only to interpret automation configuration, handler source or receipts already supplied within the authorized task. Build Lead uses Read, Grep, Glob and Skill. It does not design a new hook/MCP installation, execute a handler, collect native events, run fixtures, inspect credentials, alter trust/settings or activate anything. Starter does not gain an automation integration capability from this reference.

For repository CI and permission hygiene, use the existing GitHub Workflow method and its authorized evidence owner. This reference adds the narrower distinction between a declared advisory, its recognized input/handler behavior and actual native execution. Use [the runtime evidence matrix](../templates/runtime-claim-matrix.md).

## Establish purpose and carrier before interpreting a result

Record whether the supplied mechanism is an observational advisory or an intentional authorization/integrity gate. Record actual candidate/handler hash, host/version/carrier when known, selected owner/version, registration source, event/matcher, root/interpreter/cwd assumptions, trust and permission. Source settings prove a declaration; they do not prove the active configuration loaded or the event fired.

Preserve intended failure semantics. An observational error should not unexpectedly block its caller. An authorization or integrity gate must not become permissive simply because an advisory elsewhere fails open. Do not apply a universal fail-open policy or infer a current event set from a historical table.

## Trace the supplied contract as data

1. **Input:** identify actual event-specific payload nesting, types, path semantics, working directory and transport. Redacted examples must exclude transcript bodies, tokens, personal/customer material and unrelated private paths. A response shape is not client attestation.
2. **Recognition:** inspect precisely which inputs and target kinds the parser recognizes, which malformed/unsupported inputs it rejects and whether it actually attempted validation. A successful process or empty JSON cannot certify a recognized check with zero invocations.
3. **Invocation:** inspect target deduplication, ownership/root confinement, explicit argument arrays, called validator identity, subprocess effects and error handling. Do not evaluate interpolated shell text or run source while reviewing it. Unknown owner or missing validator stays unverified.
4. **Output:** compare response schema, exit behavior, advisory/denial semantics, privacy redaction, unexpected stderr and incomplete-result handling. Raw validator output can expose private data; the receipt should retain the safe failure class and required next check.
5. **Bounds:** identify independent limits for input bytes, accepted target count, output bytes, subprocess time and actual host deadline. A byte cap does not time out stalled stdin. A subprocess budget does not prove host termination, native scheduling or the absence of a child still running. Record unknown enforcement.
6. **Native observation:** inspect the supplied registration/trust/event/request/result receipts for the exact carrier and version. Offline fixtures qualify the tested handler inputs only. They do not prove native event delivery, accepted response, effective permission, active registration or a task watchdog.

When tests or native execution are unavailable, record NOT_RUN/UNEXECUTED and the affected conclusion. Do not activate an event just to make evidence easier to collect. A missing transport or unsupported payload is a gap, not a successful degraded validation.

## Preserve failure coverage when reviewing supplied tests

Inspect whether the supplied offline fixtures cover malformed/nonobject/oversized input, wrong metadata types, duplicate targets, unknown owner, outside-root/private paths, missing validator, target overflow, subprocess failure, noisy/unexpected output, timeout and unfinished work. Record what was actually exercised and what was source-inspected only. Hardcoded limits in one historical implementation are not the selected method's current contract.

A payload containing a path at one nesting level may be rejected when the parser recognizes another level. State that exact shape rather than assuming every path-looking field is equivalent. An emitted context/advisory key is only output inference until the actual native client accepts it. A source file cannot create an event missing from the active selected carrier.

## Handle mechanism and timing losses

Classify each applicable behavior as preserved, translated, degraded or unavailable. For timing evidence, distinguish native observed, approximated with a concrete delay/scope loss, hard limit, and warning/unknown enforcement. Do not invent an approximation or attach exact event-count guarantees to another installation.

Record whether work is critical-path dependent or observational. A long synchronous operation can violate the host deadline; an asynchronous declaration is not proof that it was scheduled or completed. If actual helper work is supplied as a result, qualify the observed scope and effects only. Idempotent design can use stable keys/marker replacement rather than duplicate entries, but a read-only review does not write configuration or prove a rerun converges.

## Keep boundaries and claims explicit

A declared server or transport also does not establish connection, negotiated feature, endpoint reachability, account access or permission. Inspect supplied actual tool contracts and connection/capability receipts separately; no server registration or provider fallback is supplied by this method. Local runtime and cloud execution locations have different reachability, so an endpoint name is not network proof.

Compare every selected exposure of the same actual method: names, inputs, outputs, errors and effects must retain the accepted contract. An intentional difference needs a documented loss and consumer consequence. This rule applies to already selected command/Playbook carriers and shared task interfaces; it does not add other-host adapters or memory tools.

Return source declarations, offline observations, native observations and unknowns in separate columns. Bind the receipt to the final candidate and preserve safe failure evidence. Security/fixes precede independent Quality and coordinator repository health for actual development changes. No empty result, source fixture or advisory proves independent review, implementation success, user authority, provider delivery or release.
