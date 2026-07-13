// ═══════════════════════════════════════════════════════════════
// Edge Function: submit-invite
// Recebe o resultado de um preenchimento por link e grava na conta do
// DONO do convite, sem que a pessoa que preencheu precise estar logada.
// Roda com service role (contorna o RLS), mas só age sobre a linha cujo
// invite_token bate — o token é o segredo que autoriza aquela gravação.
//
// Deploy:
//   supabase functions deploy submit-invite --no-verify-jwt
// Segredos (Project Settings → Edge Functions):
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// ═══════════════════════════════════════════════════════════════
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.method !== 'POST') return json({ error: 'method' }, 405);

  let body: any;
  try { body = await req.json(); } catch { return json({ error: 'json' }, 400); }
  const { token, config, answers, instrument_version } = body || {};
  if (!token || !config || !config.slots) return json({ error: 'payload' }, 400);

  const admin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    { auth: { persistSession: false } },
  );

  // encontra a pessoa pendente daquele token e grava o resultado
  const { data: row, error: findErr } = await admin
    .from('profiles').select('id, status').eq('invite_token', token).single();
  if (findErr || !row) return json({ error: 'token' }, 404);

  const { error: updErr } = await admin.from('profiles').update({
    config, answers: answers ?? null, instrument_version: instrument_version ?? null,
    status: 'ready',
    // invite_token: null,   // descomente para invalidar o link após o 1º preenchimento
  }).eq('invite_token', token);
  if (updErr) return json({ error: 'update' }, 500);

  return json({ ok: true });
});

function json(obj: unknown, status = 200) {
  return new Response(JSON.stringify(obj), {
    status, headers: { ...cors, 'Content-Type': 'application/json' },
  });
}
