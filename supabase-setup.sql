-- Bricko accounts: run this once in your Supabase project's SQL Editor.
-- It creates two tables and locks them so each person can only see and change their own rows.

create table if not exists public.builds (
  user_id    uuid   not null default auth.uid() references auth.users(id) on delete cascade,
  id         text   not null,
  name       text   not null check (char_length(name) between 1 and 40),
  blocks     jsonb  not null,
  updated_at bigint not null,
  primary key (user_id, id)
);

create table if not exists public.progress (
  user_id uuid   primary key default auth.uid() references auth.users(id) on delete cascade,
  done    text[] not null default '{}'
);

alter table public.builds   enable row level security;
alter table public.progress enable row level security;

drop policy if exists "own builds"   on public.builds;
drop policy if exists "own progress" on public.progress;

create policy "own builds" on public.builds
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "own progress" on public.progress
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());
