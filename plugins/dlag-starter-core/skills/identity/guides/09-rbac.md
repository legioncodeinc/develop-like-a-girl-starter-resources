# Authorization and tenant isolation

Authentication establishes the subject. Authorization decides whether that subject may perform this operation on this object in this tenant. Use immutable user and tenant IDs, not email addresses or UI selections.

## Choose the smallest adequate policy

- A single-tenant application with a few user types can use named roles and a fixed permission table.
- A multi-tenant application needs `(user_id, tenant_id, role)` membership. The same user can have different roles in different tenants.
- Ownership or region-specific restrictions need attribute checks in addition to roles. Name every required attribute and its authoritative source.
- Customer-defined roles need explicit permission definitions and delegation limits. Do not grant the ability to create a role that exceeds the grantor's own authority.

A role is a named permission bundle; a permission is an operation such as `posts:write`; RLS is database enforcement. Membership records and policy data must themselves resist self-promotion. Do not trust user-editable profile metadata as authorization claims. Custom JWT claims can be useful, but their freshness is bounded by token refresh. [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security).

## Enforce at the route and the data

Each loader, action and resource route authenticates independently. Check the requested operation, current membership, accepted assurance level and resource boundary before returning data or performing side effects. Protecting a layout or hiding a button does not protect another loader, a direct API request or a forged identifier.

Query through the request-scoped user client. Include the selected tenant in the query and rely on RLS as an independent boundary. Missing memberships, unknown permission names, revoked grants and query errors deny access. Avoid a fallback that retries a denied query with a service key.

For non-database resources, obtain an authorized metadata row first. Its persisted key selects the R2 object or other resource. Verify the record's completion state and relevant metadata before returning it. The bucket does not inherit the row policy.

## Policy shape for Data Foundation

The following is a design example for an existing, reviewed schema. It is not an executed migration:

```sql
alter table public.posts enable row level security;

create policy posts_tenant_read on public.posts
for select to authenticated
using (exists (
  select 1 from public.tenant_memberships m
  where m.tenant_id = posts.tenant_id
    and m.user_id = (select auth.uid())
    and m.active = true
));

create policy posts_tenant_insert on public.posts
for insert to authenticated
with check (
  author_id = (select auth.uid()) and exists (
    select 1 from public.tenant_memberships m
    where m.tenant_id = posts.tenant_id
      and m.user_id = (select auth.uid())
      and m.active = true and m.role in ('owner', 'admin', 'editor')
  )
);
```

Data Foundation must review the membership table's own RLS, grants, indexes and recursion behavior. Avoid a SECURITY DEFINER escape hatch without an explicitly constrained, audited design. UPDATE needs both a predicate on the existing row and a check on the resulting row; changing tenant_id or author_id must not transfer authority. DELETE needs its own rule. SELECT policy requirements can also affect UPDATE behavior. Validate all four operations and any RPC or view path.

Permissive policies can combine with OR. Adding a strict-looking policy beside an existing allow-all policy may not restrict anything. Review the complete policy set, database roles, view security and exposed schemas, including anonymous access. A service-role test does not test ordinary-user RLS.

## Revocation and model changes

Record the maximum permitted delay for role demotion, membership removal, session logout and account suspension. A fresh membership lookup can avoid stale role claims, but caches and in-flight requests remain part of the behavior. For an operation requiring immediate session revocation, inspect the verified session ID through a reviewed server/data-layer check; do not expose the auth schema or service key to the browser.

Shared-schema, schema-per-tenant and database-per-tenant models have different operational costs. Escalate a requirement for a stronger isolation model to Data Foundation and the owner. Do not quietly replace the approved database architecture.

## Negative cases

Use two synthetic users in two tenants, plus a removed member and a demoted administrator. Exercise web routes and direct REST/RPC/RLS access. Try another tenant ID, another owner's record, forged body owner IDs, a client-supplied role, unauthorized inserts, moved-tenant updates and stale JWTs. Confirm an empty result or generic denial reveals no protected content. Check that the owner case still succeeds.

Fill [the permission table](../templates/rbac-policy-table.md), including each route check and data policy, and pass the actual changes to Security Review before Quality Review.
