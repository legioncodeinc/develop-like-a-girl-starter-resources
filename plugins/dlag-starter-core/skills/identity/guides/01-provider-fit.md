# Confirm Supabase fits the identity requirement

Starter uses Supabase Auth alongside Supabase Postgres, React Router framework SSR and Cloudflare Workers. Begin with that approved choice. A requirement that the selected provider cannot meet is an explicit scope decision, not permission to add another auth stack.

## Inspect these dimensions

| Dimension | Record | Consequence |
|---|---|---|
| Audience | Consumer, organization or internal accounts | Social sign-in, organization membership and join rules differ |
| Hosting | Hosted Supabase and permitted region | Check residency, availability and operational responsibility |
| UI | Existing React forms and design primitives | Identity supplies protocol/errors; React Foundation supplies accessible UI |
| Identity methods | Password, Google, email OTP, SSO, MFA | Enable only requested and supported methods |
| Assurance | Sensitive operations, required factors, recovery evidence | Determines step-up, session checks and recovery design |
| Tenant boundary | Stable user UUID, membership table and roles | Authentication does not grant membership |
| Operations | Expected users, provider plan, support owner | Verify current limits and costs before making commitments |

Supabase reduces integration work because verified subjects can be enforced by Postgres RLS. It does not supply your application-specific organization, invitation, billing or permission policy. Design those deliberately with Data Foundation.

## When the fit needs a decision

Enterprise SSO, customer-specific identity providers, automated provisioning, mandatory hardware-bound credentials or a self-host-only requirement can change the project. Confirm the exact required feature, SDK and provider plan. The [enterprise example](../examples/enterprise-access.md) preserves the organization and deprovisioning questions. Do not claim that SAML login supplies SCIM provisioning or that an email domain proves tenant membership.

If hosted auth is prohibited, Starter's approved stack does not meet that constraint. Record the mismatch and obtain a scope decision. Likewise, a request for an unselected provider's prebuilt UI or framework integration is not a reason to install it implicitly.

## Cost and portability questions

Separate recurring active-user charges, enterprise connections, messaging, support and operational effort. Current provider pricing is a dated input, not a permanent number in this kit. Prefer one explained recommendation over a catalogue of popularity claims.

Use immutable provider subject IDs and a stable application user ID. Email and display name are mutable profile attributes. Keep account linking, tenant grants and provider export assumptions separate. For a move from an existing provider, use [migration assessment](02-provider-migration.md). Password hashes, social identities, MFA enrollments and active sessions have different portability constraints.

Fill [the fit worksheet](../templates/provider-fit.md) with accepted requirements, evidence and unresolved choices. Account creation, configuration, account import and billing changes need their own authorization.
