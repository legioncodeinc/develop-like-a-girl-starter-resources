-- COMPLETE INERT SCHEMA SPECIMEN. No migration has been executed.
-- Application-owned tables only. Supabase Auth owns auth.users.
-- These NEW names must be checked against existing schema/migration history.
-- A separately approved migration adapts exact names, grants and ownership policy.
-- Personal CRUD policy examples live in ../examples/owned-notes.sql.
-- This specimen denies application API access until reviewed policies/grants exist.

BEGIN;
CREATE TYPE public.order_status AS ENUM
  ('pending', 'paid', 'shipped', 'delivered', 'refunded');

CREATE FUNCTION public.set_profile_content_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = pg_catalog AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE RESTRICT,
  contact_email text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  metadata jsonb,
  CONSTRAINT profiles_contact_email_not_empty CHECK (length(contact_email) > 0)
);
-- This is contact data, not a replacement authentication credential store.
-- Deliberately chosen ACTIVE uniqueness. A global UNIQUE would have different
-- soft-delete behavior. Case-sensitive uniqueness and lower-case lookup are
-- also different: choose a normalized uniqueness rule if the product needs it.
CREATE UNIQUE INDEX profiles_contact_email_active_unique
  ON public.profiles (contact_email) WHERE deleted_at IS NULL;
CREATE INDEX profiles_contact_email_lower_idx
  ON public.profiles (lower(contact_email));
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_profile_content_updated_at();
COMMENT ON COLUMN public.profiles.contact_email IS 'Personal contact data; review access and retention';

CREATE TABLE public.posts (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  owner_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  title text NOT NULL,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT posts_title_not_empty CHECK (length(title) > 0)
);
CREATE INDEX posts_owner_id_idx ON public.posts (owner_id);
CREATE TRIGGER posts_updated_at BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.set_profile_content_updated_at();

CREATE TABLE public.orders (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  owner_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  status public.order_status NOT NULL DEFAULT 'pending',
  total_cents numeric(12, 0) NOT NULL,
  currency text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT orders_total_non_negative CHECK (total_cents >= 0),
  CONSTRAINT orders_currency_format CHECK (currency ~ '^[A-Z]{3}$')
);
CREATE INDEX orders_owner_id_idx ON public.orders (owner_id);
CREATE INDEX orders_pending_created_idx
  ON public.orders (created_at) WHERE status = 'pending';
-- Currency format is structural only. Minor-unit scale and valid currency codes
-- are accepted product/provider facts. A paid enum value does not prove payment.
-- Browser/user writes must not grant authority to mark a payment paid/refunded.

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.profiles, public.posts, public.orders FROM PUBLIC, anon, authenticated;
COMMIT;

-- Before API access: define per-operation actor/ownership rules, grants and
-- USING/WITH CHECK policies, including owner reassignment and soft-delete scope.
-- Test with ordinary actors; owner/service-role success is not denial proof.
-- Identity bigint values can exceed JavaScript's exact integer range. Define
-- API serialization explicitly; do not blindly cast them to Number.
-- No Drizzle/Prisma client, datasource, generator or pooler is required by this SQL.
