-- NEW-table draft only. Applying a migration requires explicit authorization.
-- Inspect existing schema and migration history before adapting this example.
begin;
create table public.notes (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete restrict,
  body text not null check (char_length(body) between 1 and 10000),
  created_at timestamptz not null default now()
);
create index notes_owner_id_idx on public.notes(owner_id);
alter table public.notes enable row level security;
revoke all on public.notes from anon;
revoke all on public.notes from authenticated;
grant select, insert, update, delete on public.notes to authenticated;
create policy notes_read on public.notes for select to authenticated
  using ((select auth.uid()) = owner_id);
create policy notes_create on public.notes for insert to authenticated
  with check ((select auth.uid()) = owner_id);
create policy notes_change on public.notes for update to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);
create policy notes_remove on public.notes for delete to authenticated
  using ((select auth.uid()) = owner_id);
commit;
-- Expected: owner sees/edits own rows; another user sees none and cannot alter.
-- An ownership transfer must fail without altering stored state.
-- These comments are fixture expectations, not executed SQL evidence.
