-- ============================================================
-- M1: profiles, workspaces, workspace_members (+ RLS)
-- Pegar entero en Supabase > SQL Editor > New query > Run
-- ============================================================

-- 1. Tablas ----------------------------------------------------

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists workspaces (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  slug text not null,
  description text,
  icon text,
  color text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, slug)
);

create table if not exists workspace_members (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  role text not null default 'owner',
  created_at timestamptz not null default now(),
  unique (workspace_id, user_id)
);

create index if not exists workspaces_owner_id_idx on workspaces (owner_id);
create index if not exists workspace_members_user_id_idx on workspace_members (user_id);

-- 2. Row Level Security ------------------------------------------
-- La seguridad vive acá, no en el frontend: aunque el código de
-- Next.js tenga un bug, Postgres nunca va a devolver datos de otro usuario.

alter table profiles enable row level security;
alter table workspaces enable row level security;
alter table workspace_members enable row level security;

create policy "users can view their own profile"
on profiles for select
using (auth.uid() = id);

create policy "users can update their own profile"
on profiles for update
using (auth.uid() = id);

create policy "members can view their workspaces"
on workspaces for select
using (
  exists (
    select 1 from workspace_members
    where workspace_members.workspace_id = workspaces.id
    and workspace_members.user_id = auth.uid()
  )
);

create policy "users can create workspaces for themselves"
on workspaces for insert
with check (owner_id = auth.uid());

create policy "owners can update their workspaces"
on workspaces for update
using (owner_id = auth.uid());

create policy "owners can delete their workspaces"
on workspaces for delete
using (owner_id = auth.uid());

create policy "users can view their own memberships"
on workspace_members for select
using (user_id = auth.uid());

-- 3. Automatizaciones ----------------------------------------------

-- Crea el profile apenas alguien se registra en Supabase Auth.
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Agrega automáticamente al dueño como miembro cuando crea un workspace.
-- security definer = corre "como dueño de la tabla", por eso puede escribir
-- en workspace_members aunque el usuario que dispara esto no tenga (todavía)
-- un policy de insert directo sobre esa tabla.
create or replace function handle_new_workspace()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.workspace_members (workspace_id, user_id, role)
  values (new.id, new.owner_id, 'owner');
  return new;
end;
$$;

drop trigger if exists on_workspace_created on workspaces;
create trigger on_workspace_created
  after insert on workspaces
  for each row execute procedure handle_new_workspace();
