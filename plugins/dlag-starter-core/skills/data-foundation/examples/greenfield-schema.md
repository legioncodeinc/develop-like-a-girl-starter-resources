# Worked example: a relational project tracker

This hypothetical application has organizations, member profiles, projects, tasks, comments and documents. It demonstrates complete relational shape, constraints, indexes, timestamps, search and tenant-bearing relationships. It is a draft for review, not a ready deployed app or proof of tenant isolation.

## Scenario

- Selected storage/auth: Supabase Postgres and Auth; application backend/SSR on Workers; object bytes remain in R2.
- Inspect the actual server version and existing schema before adapting any statement.
- Declared model: each member profile belongs to one organization. A multi-organization membership product needs its own relationship design, not an accidental reuse of this simplifying assumption.
- Hypothetical growth: 50,000 organizations, 500,000 members, 5 million tasks and 20 million comments. These are example planning inputs, not production measurements or automatic partition thresholds.
- Queries include organization projects, project tasks, a member's open tasks, comment search and organization documents. Ownership/access rules must be reviewed separately before API grants.

## Complete schema draft

```sql
BEGIN;
CREATE TYPE public.org_tier AS ENUM ('free', 'pro', 'enterprise');
CREATE TYPE public.task_status AS ENUM
  ('open', 'in_progress', 'blocked', 'done', 'archived');

CREATE FUNCTION public.set_tracker_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = pg_catalog AS $$
BEGIN NEW.updated_at := now(); RETURN NEW; END;
$$;

CREATE TABLE public.organizations (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL CHECK (length(name) > 0),
  slug text NOT NULL CHECK (slug ~ '^[a-z0-9-]+$'),
  tier public.org_tier NOT NULL DEFAULT 'free',
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);
CREATE UNIQUE INDEX organizations_slug_active_unique
  ON public.organizations (slug) WHERE deleted_at IS NULL;
CREATE TRIGGER organizations_updated_at BEFORE UPDATE ON public.organizations
  FOR EACH ROW EXECUTE FUNCTION public.set_tracker_updated_at();

CREATE TABLE public.members (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE RESTRICT,
  organization_id bigint NOT NULL
    REFERENCES public.organizations(id) ON DELETE RESTRICT,
  display_name text NOT NULL CHECK (length(display_name) > 0),
  contact_email text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  UNIQUE (organization_id, id)
);
-- The composite unique index also supplies organization-leading lookup coverage.
CREATE INDEX members_contact_email_lower_idx ON public.members (lower(contact_email));
CREATE TRIGGER members_updated_at BEFORE UPDATE ON public.members
  FOR EACH ROW EXECUTE FUNCTION public.set_tracker_updated_at();
COMMENT ON COLUMN public.members.display_name IS 'Personal data; review access and retention';
COMMENT ON COLUMN public.members.contact_email IS 'Contact data, not authentication authority';

CREATE TABLE public.projects (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id bigint NOT NULL
    REFERENCES public.organizations(id) ON DELETE CASCADE,
  name text NOT NULL CHECK (length(name) > 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, id)
);
CREATE TRIGGER projects_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.set_tracker_updated_at();

CREATE TABLE public.tasks (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id bigint NOT NULL,
  project_id bigint NOT NULL,
  assignee_id uuid,
  title text NOT NULL CHECK (length(title) > 0),
  description text,
  status public.task_status NOT NULL DEFAULT 'open',
  due_date date,
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, id),
  FOREIGN KEY (organization_id, project_id)
    REFERENCES public.projects(organization_id, id) ON DELETE CASCADE,
  FOREIGN KEY (organization_id, assignee_id)
    REFERENCES public.members(organization_id, id) ON DELETE RESTRICT
);
CREATE INDEX tasks_project_idx ON public.tasks (organization_id, project_id);
CREATE INDEX tasks_assignee_idx ON public.tasks (organization_id, assignee_id);
CREATE INDEX tasks_assignee_open_idx
  ON public.tasks (organization_id, assignee_id, due_date)
  WHERE status IN ('open', 'in_progress', 'blocked');
CREATE INDEX tasks_metadata_gin ON public.tasks USING gin (metadata jsonb_path_ops);
CREATE TRIGGER tasks_updated_at BEFORE UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.set_tracker_updated_at();
-- Null assignee is allowed. Deleting an assigned member is restricted until an
-- explicitly authorized unassignment/reassignment preserves organization scope.

CREATE TABLE public.comments (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id bigint NOT NULL,
  task_id bigint NOT NULL,
  author_id uuid NOT NULL,
  body text NOT NULL CHECK (length(body) > 0),
  search_vector tsvector GENERATED ALWAYS AS
    (to_tsvector('english', coalesce(body, ''))) STORED,
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (organization_id, task_id)
    REFERENCES public.tasks(organization_id, id) ON DELETE CASCADE,
  FOREIGN KEY (organization_id, author_id)
    REFERENCES public.members(organization_id, id) ON DELETE RESTRICT
);
CREATE INDEX comments_task_idx ON public.comments (organization_id, task_id);
CREATE INDEX comments_author_idx ON public.comments (organization_id, author_id);
CREATE INDEX comments_search_idx ON public.comments USING gin (search_vector);

CREATE TABLE public.documents (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id bigint NOT NULL
    REFERENCES public.organizations(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX documents_organization_idx ON public.documents (organization_id);

-- Closed until actual access design and policy review. No public API grants
-- or broad permissive policies are implied by this example.
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.organizations, public.members, public.projects,
  public.tasks, public.comments, public.documents FROM PUBLIC, anon, authenticated;
COMMIT;
```

## Rationale and limits

| Decision | Reason and further review |
|---|---|
| UUID member identity references `auth.users` | Supabase Auth remains authoritative; application tables do not replace its managed schema |
| Identity bigint application keys | Compact relational keys; serialize safely across JavaScript/API boundaries |
| Typed enum/status/date/time columns | Stable product concepts and database constraints; change lifecycle remains explicit |
| `jsonb` metadata | Variable extension fields, not an authentication or tenant-authority source |
| Partial active slug uniqueness | Allows reuse after soft deletion; the product must accept this meaning |
| `lower(contact_email)` expression index | Supports that lookup form; does not enforce normalized uniqueness |
| Composite tenant-bearing FKs | A task/comment cannot reference a differently scoped existing parent merely by its globally valid ID |
| Explicit FK/index review | Valid composite prefixes may cover lookups; avoid redundant single-column indexes |
| Partial open-task index | Matches the declared dashboard workload; confirm selectivity and actual plan |
| Generated FTS + GIN | English is a scenario choice; test real language/ranking requirements |
| Updated-at triggers | Consistent maintenance across writers of mutable entities |
| RLS enabled with grants revoked | Prevents accidental API exposure while policies are still undesigned; it is not a successful policy test |
| Partitioning deferred | Choose from actual query/maintenance evidence, not the hypothetical row count alone |

## Optional search storage

If semantic search is separately accepted, use [special-purpose PostgreSQL](../guides/06-special-purpose.md) to choose the actual supported vector type, dimension, distance and index. The document table does not install extensions or select a model. Search Foundation owns retrieval and evaluation. R2 object bytes need their own ownership and recovery design if documents reference uploads.

## Verification and handoff

- Inspect constraints, implicit/explicit indexes, named trigger attachments and actual server/client versions.
- Test cross-organization relationship inserts and updates, including null assignees and deletion effects.
- Review membership authority and every SELECT/INSERT/UPDATE/DELETE policy before granting API access. Supabase RLS, views/functions and privileged roles need Security Review.
- Check ordinary-user positive and negative paths with synthetic A/B organizations, independent state verification and actual generated queries. Owner/service-role access is not the actor under test.
- Test lookup, dashboard, FTS and pagination behavior with representative data and authorized query-plan captures.
- React Foundation handles loader/component integration; Search Foundation handles retrieval; Quality Review checks the authorized implementation after Security.

Use the [schema specification](../templates/schema-spec.md), [tenant worksheet](../templates/tenant-boundary-proof.md) and [recovery guide](../guides/10-recovery-and-exit-fit.md). No database operation was performed for this example.
