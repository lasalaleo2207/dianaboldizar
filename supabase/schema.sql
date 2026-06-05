create extension if not exists "pgcrypto";
create schema if not exists private;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  role text not null default 'superadmin' check (role in ('superadmin', 'editor', 'viewer')),
  avatar_url text,
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  client_name text not null,
  description text,
  status text not null default 'No iniciado',
  current_phase text,
  progress int not null default 0 check (progress between 0 and 100),
  created_at timestamptz not null default now()
);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'projects_name_key'
      and conrelid = 'public.projects'::regclass
  ) then
    alter table public.projects add constraint projects_name_key unique (name);
  end if;
end $$;

create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  name text not null,
  slug text not null,
  description text,
  order_index int not null default 0,
  status text not null default 'No iniciado',
  progress int not null default 0 check (progress between 0 and 100),
  unique(project_id, slug)
);

create table if not exists public.submodules (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  name text not null,
  description text,
  order_index int not null default 0,
  status text not null default 'No iniciado',
  progress int not null default 0 check (progress between 0 and 100)
);

create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  module_id uuid references public.modules(id) on delete set null,
  title text not null,
  session_date date,
  start_at timestamptz,
  end_at timestamptz,
  objective text,
  prep_required text,
  location text,
  meeting_url text,
  attendees jsonb not null default '[]'::jsonb,
  status text not null default 'Programada' check (status in ('Programada', 'Realizada', 'Cancelada')),
  notes text,
  insights text,
  decisions_summary text,
  next_steps text,
  created_at timestamptz not null default now()
);

alter table public.sessions add column if not exists start_at timestamptz;
alter table public.sessions add column if not exists end_at timestamptz;
alter table public.sessions add column if not exists prep_required text;
alter table public.sessions add column if not exists location text;
alter table public.sessions add column if not exists meeting_url text;
alter table public.sessions add column if not exists attendees jsonb not null default '[]'::jsonb;
alter table public.sessions add column if not exists status text not null default 'Programada';

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  module_id uuid references public.modules(id) on delete set null,
  title text not null,
  description text,
  assignee_id uuid references public.profiles(id) on delete set null,
  assignee_ids jsonb not null default '[]'::jsonb,
  due_date date,
  status text not null default 'Pendiente',
  priority text not null default 'Media',
  created_at timestamptz not null default now()
);

alter table public.tasks add column if not exists assignee_ids jsonb not null default '[]'::jsonb;

create table if not exists public.decisions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  module_id uuid references public.modules(id) on delete set null,
  title text not null,
  context text,
  rationale text,
  status text not null default 'Provisional',
  decided_at date,
  validated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.deliverables (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  module_id uuid references public.modules(id) on delete set null,
  title text not null,
  description text,
  type text,
  status text not null default 'Borrador',
  file_url text,
  version text,
  created_at timestamptz not null default now()
);

create table if not exists public.diagnostic_answers (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  submodule_id uuid references public.submodules(id) on delete set null,
  question_key text not null,
  question_label text not null,
  answer text,
  answer_type text not null default 'text',
  created_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now(),
  unique(project_id, submodule_id, question_key)
);

create table if not exists public.niche_profiles (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  name text not null,
  description text,
  pain_points jsonb not null default '[]'::jsonb,
  motivations jsonb not null default '[]'::jsonb,
  objections jsonb not null default '[]'::jsonb,
  channels jsonb not null default '[]'::jsonb,
  payment_capacity text,
  urgency text,
  opportunity_score int check (opportunity_score between 0 and 100),
  created_at timestamptz not null default now()
);

create table if not exists public.offers (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  name text not null,
  type text,
  description text,
  target_niche_id uuid references public.niche_profiles(id) on delete set null,
  value_proposition text,
  price_hypothesis text,
  priority_score int check (priority_score between 0 and 100),
  created_at timestamptz not null default now()
);

create table if not exists public.files (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  uploaded_by uuid references public.profiles(id) on delete set null,
  file_name text not null,
  file_path text not null,
  file_type text,
  file_size bigint not null default 0,
  module_id uuid references public.modules(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.files add column if not exists file_size bigint not null default 0;

create table if not exists public.ikigai_clarity (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now(),
  unique(project_id)
);

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.modules enable row level security;
alter table public.submodules enable row level security;
alter table public.sessions enable row level security;
alter table public.tasks enable row level security;
alter table public.decisions enable row level security;
alter table public.deliverables enable row level security;
alter table public.diagnostic_answers enable row level security;
alter table public.niche_profiles enable row level security;
alter table public.offers enable row level security;
alter table public.files enable row level security;
alter table public.ikigai_clarity enable row level security;

grant select, insert, update, delete on all tables in schema public to authenticated;
grant usage, select on all sequences in schema public to authenticated;

create or replace function private.is_superadmin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role = 'superadmin'
      and profiles.status = 'active'
  );
$$;

revoke all on schema private from anon, authenticated;
grant usage on schema private to authenticated;
grant execute on function private.is_superadmin() to authenticated;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, role, status)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    new.email,
    coalesce(new.raw_app_meta_data->>'role', 'superadmin'),
    'active'
  )
  on conflict (id) do update
  set
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    email = excluded.email,
    status = 'active';

  return new;
end;
$$;

grant execute on function private.handle_new_user() to authenticated;

create policy "Profiles can read own profile"
on public.profiles for select
to authenticated
using (id = (select auth.uid()) or private.is_superadmin());

create policy "Superadmins manage profiles"
on public.profiles for all
to authenticated
using (private.is_superadmin())
with check (private.is_superadmin());

create policy "Superadmins manage projects"
on public.projects for all
to authenticated
using (private.is_superadmin())
with check (private.is_superadmin());

create policy "Superadmins manage modules"
on public.modules for all
to authenticated
using (private.is_superadmin())
with check (private.is_superadmin());

create policy "Superadmins manage submodules"
on public.submodules for all
to authenticated
using (private.is_superadmin())
with check (private.is_superadmin());

create policy "Superadmins manage sessions"
on public.sessions for all
to authenticated
using (private.is_superadmin())
with check (private.is_superadmin());

create policy "Superadmins manage tasks"
on public.tasks for all
to authenticated
using (private.is_superadmin())
with check (private.is_superadmin());

create policy "Superadmins manage decisions"
on public.decisions for all
to authenticated
using (private.is_superadmin())
with check (private.is_superadmin());

create policy "Superadmins manage deliverables"
on public.deliverables for all
to authenticated
using (private.is_superadmin())
with check (private.is_superadmin());

create policy "Superadmins manage diagnostic answers"
on public.diagnostic_answers for all
to authenticated
using (private.is_superadmin())
with check (private.is_superadmin());

create policy "Superadmins manage niche profiles"
on public.niche_profiles for all
to authenticated
using (private.is_superadmin())
with check (private.is_superadmin());

create policy "Superadmins manage offers"
on public.offers for all
to authenticated
using (private.is_superadmin())
with check (private.is_superadmin());

create policy "Superadmins manage files"
on public.files for all
to authenticated
using (private.is_superadmin())
with check (private.is_superadmin());

create policy "Authenticated users can read project files"
on storage.objects for select
to authenticated
using (bucket_id = 'project-files');

create policy "Authenticated users can upload project files"
on storage.objects for insert
to authenticated
with check (bucket_id = 'project-files');

create policy "Authenticated users can update project files"
on storage.objects for update
to authenticated
using (bucket_id = 'project-files')
with check (bucket_id = 'project-files');

create policy "Authenticated users can delete project files"
on storage.objects for delete
to authenticated
using (bucket_id = 'project-files');

create policy "Superadmins manage ikigai clarity"
on public.ikigai_clarity for all
to authenticated
using (private.is_superadmin())
with check (private.is_superadmin());
