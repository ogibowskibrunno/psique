-- ═══════════════════════════════════════════════════════════════
-- A Psique · Conta — esquema do banco (rode no SQL Editor do Supabase)
-- Um registro por pessoa. Dono = a conta (auth.uid()).
-- Row Level Security garante que cada conta só enxerga as próprias pessoas.
-- Convites por link são gravados pela função submit_invite (no fim deste
-- arquivo) — sem terminal, é só rodar tudo aqui no SQL Editor.
-- ═══════════════════════════════════════════════════════════════

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references auth.users(id) on delete cascade,
  name               text not null,
  relationship       text,                    -- ex.: 'pessoa'
  notes              text,                    -- anotações do dono da conta
  config             jsonb,                   -- {attitude, slots, development}
  answers            jsonb,                   -- respostas do questionário
  instrument_version text,
  invite_token       text unique,             -- token do link de convite (quando enviado por link)
  status             text default 'ready',    -- 'ready' | 'pending' (aguardando preenchimento)
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index if not exists profiles_user_id_idx on public.profiles(user_id);
create index if not exists profiles_invite_token_idx on public.profiles(invite_token);

-- updated_at automático
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists profiles_touch on public.profiles;
create trigger profiles_touch before update on public.profiles
  for each row execute function public.touch_updated_at();

-- ── Row Level Security ──────────────────────────────────────────
alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = user_id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = user_id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "profiles_delete_own" on public.profiles;
create policy "profiles_delete_own" on public.profiles
  for delete using (auth.uid() = user_id);

-- ═══════════════════════════════════════════════════════════════
-- Convite por link: função que grava o resultado na conta do DONO do
-- convite, sem a pessoa precisar estar logada. SECURITY DEFINER roda
-- com privilégio elevado, mas só toca a linha cujo invite_token bate —
-- o token é o segredo que autoriza aquela gravação. Substitui a Edge
-- Function (não precisa de terminal/CLI; roda aqui no SQL Editor).
-- ═══════════════════════════════════════════════════════════════
create or replace function public.submit_invite(
  p_token   text,
  p_config  jsonb,
  p_answers jsonb default null,
  p_version text default null
) returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles
     set config = p_config,
         answers = coalesce(p_answers, answers),
         instrument_version = coalesce(p_version, instrument_version),
         status = 'ready',
         updated_at = now()
   where invite_token = p_token;
  if not found then
    raise exception 'invite token inválido';
  end if;
end;
$$;

-- deixa o convidado anônimo chamar a função (só ela; não a tabela)
grant execute on function public.submit_invite(text, jsonb, jsonb, text) to anon;
