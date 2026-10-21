# Enterprise access without confusing sign-in and membership

A worked requirement review for an organization application using the approved Supabase stack. The customer asks for enterprise sign-in, tenant roles and deprovisioning. SSO is conditional on accepted provider capability and configuration; this example does not provision an identity connection.

## Establish the contract

Record each customer tenant, verified provider connection identifier, allowed sign-in methods, local role model and deprovisioning requirement. A user's typed email domain is a routing hint, not proof that the user belongs to that tenant. The authenticated provider identity must map to a stable application UUID and authorized membership.

Supabase's [signInWithSSO](https://supabase.com/docs/reference/javascript/auth-signinwithsso) supports a configured domain or provider ID. Pin current SDK and provider support. Handle returned errors and redirect URLs using the same trusted configuration, callback and cookie discipline as other login methods. Do not paste another provider's callback code into this app.

## Membership and policy

A minimal model contains users, tenants and tenant memberships with roles. Data Foundation owns schema, uniqueness, membership administration and RLS. Sample permissions can include tenant management, member invitation, content read/write and billing changes. Use [the policy worksheet](../templates/rbac-policy-table.md) to name both the route guard and the data policy for every permission.

For each tenant request: verify the subject, resolve current membership, enforce the required role/assurance, then query through the user-context client. A selected organization ID must never become an unconditional grant. Explicitly test two users in different organizations and one user with different roles in two organizations.

## Provisioning and removal

SAML sign-in does not establish SCIM directory synchronization. If automatic provisioning is required, record the selected system and evidence as an unresolved integration until approved. Do not introduce a directory vendor or a job service implicitly.

A separately accepted event integration must authenticate its event source, verify the exact signed body, reject replay as required, make retries idempotent and tolerate reordering. A removal event must disable application membership, prevent new privileged actions and handle active sessions within the accepted revocation limit. Email changes must not create a second account or transfer membership accidentally.

Monitor delivery failures and reconciliation gaps. A failed sync cannot be treated as proof that the user is still employed. Decide the fail-closed behavior for sensitive actions and who can repair a mapping. Never log webhook secrets, tokens or unnecessary personal data.

## Factors and sessions

An upstream IdP's MFA is not automatically equivalent to a Supabase `aal2` session or the application's required assurance. Confirm the actual claims and policy before satisfying a step-up requirement. Non-SSO accounts must meet their own accepted factor policy. Document local/global logout and residual access-token behavior.

## Test and handoff

Required cases: unknown connection, wrong tenant hint, denied SSO, successful member, authenticated nonmember, removed member, demoted administrator, stale token, duplicate/removal-before-create event, failed sync, cross-tenant direct API/RLS and role changes during an active session. Keep the SSO and provisioning results pending until run on the exact authorized environment.

If the project requires a capability the approved stack cannot provide, record the exact gap for an owner decision. Security Review checks account mapping and deprovisioning; Quality Review follows after the accepted design and security corrections.
