# 08. Generated-code failure patterns

> Read-only role: inspect supplied local evidence and return a report in chat. All commands, changes, scans and runtime exercises in this reference are proposals for a separately authorized caller. No dependency, provider, account, setting or credential is operated by this Playbook.

## Review authorization as a whole operation

Generated code often looks locally plausible while missing a permission decision between identity and effect. Trace an actual actor and object through the verifier, membership/role lookup, query, serializer, cache, download and side effect. A parameterized query can still disclose another owner's data. A login component does not protect a directly requested resource route. A schema's owner_id column does not enable RLS, and enabled RLS does not protect a bypass role or an R2 object URL. Inspect the actual policy and refusal path rather than relying on a generated comment that says secure.

This method prioritizes ownership and business invariants alongside injection, not instead of it. A threat such as duplicate paid entitlement or an unauthorized export needs reasoning across state transitions and effects. Require explicit review intent on identity, private records, money, administration, uploads, recovery and external calls. A generic model statement that tests pass is not a result.

## Insecure defaults and missing controls

Inspect whether the implementation actually enabled private-table policies, supplied INSERT/UPDATE checks, restricted privileged keys and required permission before work. Do not infer those controls from use of an auth/database provider. Verify anonymous, cross-owner and revoked cases as well as a valid allowed case. A fixture that returns zero rows for everyone proves neither correct functionality nor a proper denial boundary. If the database, credentials or target are unavailable, label the relevant path source-only.

## Placeholder and hardcoded secrets

Look for common placeholder/default secret names and values, including changeme, test-secret and password123, without printing the matching value to chat. A placeholder in a template is not a live credential; a default signing/password fallback used in production may be a real vulnerability. Trace how the application treats it and distinguish issued credentials from public identifiers. Check client exports, loader data, URLs, logs and built artifacts in addition to source. A literal removal does not revoke a leaked issued credential.

## Invented packages and APIs

A generated import can name a nonexistent package or a real package with an unexpected publisher. An attacker can register a predictable invented name. Require the project's actual lockfile, expected source/publisher and current authoritative documentation before trusting a new dependency. Do not install it to establish trust. Likewise, a method named verify or authorize proves nothing unless its implementation and installed API behavior are inspected. A copied API from a different runtime can fail open through an improvised fallback; missing verification should stop the operation, not select an administrator client.

## Miscalibrated confidence and iterative regression

Treat generated changes as unverified until independent source and relevant execution evidence exists. Read the actual denial/effect code rather than accepting a polished explanation. A later UI/cleanup change can silently remove a guard, serializer field restriction or transaction condition. For each relevant change, re-evaluate the whole affected security invariant and its immediate neighbors, preserve exact final candidate identity and distinguish old passing results from current evidence. Periodic broader scope review can find an earlier guard lost under unrelated edits; it still needs an authorized scope, not an automatic audit of everything.

## Evidence, statistics and review independence

Historical studies, incident examples or vulnerability percentages describe their sampled methods and dates. They do not establish that this particular target is vulnerable or that a newer model/tool is safe. Do not reproduce an unverified incident count, fixed-version claim or vendor default as current fact. Use [current primary references](../references/official-sources.md) and supplied advisory/version evidence for an actual finding. Preserve the underlying testable risk: missing control, reachable input, harmful effect and concrete correction.

Security Review precedes Quality Review; a new content author or implementation author does not independently approve their own work. A mandatory report records reviewed and unreviewed surfaces, not a substitute for checking them. A green unit test cannot waive a missing tenant/file/payment integration proof. Use [risk verification](15-verify-actual-risk.md) to name each remaining gap.
