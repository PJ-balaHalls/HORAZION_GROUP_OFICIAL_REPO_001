// BD-HZ-002 | Clientes Supabase do Admin
// Apontam para o BD HORAZION (mesmo do apps/web)
// O BD ADMIN (xuhtxsbpztccweqqjcvd) é usado apenas para logs/auditoria
import { createBrowserClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

// ─── CLIENTE BROWSER (autenticação no client-side) ────────────────────────
export const getSupabaseBrowserClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );

// ─── CLIENTE ADMIN (server-only, service_role) ────────────────────────────
export const getSupabaseAdminClient = () => {
  if (typeof window !== 'undefined') {
    throw new Error('[SEC-HZ-ADMIN] Violação: Cliente Admin instanciado no Frontend.');
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('[CORE-HZ-ADMIN] Variáveis de ambiente ausentes.');
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
};
