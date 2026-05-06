// CORE-HZ-015 | Verificação de Perfil Sirius para o Admin
// Implementa a lógica completa de:
//   1. Verificação de sessão Supabase
//   2. Validação do Grupo Celestial (SIRIUS)
//   3. Verificação de Nível de Acesso (ALFA/BETA/SIGMA/OMEGA)
//   4. Verificação de Constelação (quando exigida)
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// ─── Tipos ────────────────────────────────────────────────────────────────
export type AccessLevel = 'ALFA' | 'BETA' | 'SIGMA' | 'OMEGA';

export interface AdminProfile {
  id: string;
  horizon_id: string;
  social_name: string;
  legal_name: string;
  celestial_group: string;
  access_level: AccessLevel;
  constellation_code?: string | null;
  avatar_url?: string | null;
  prestige_score: number;
  email: string;
}

// ─── Hierarquia de Níveis ─────────────────────────────────────────────────
const LEVEL_RANK: Record<AccessLevel, number> = {
  ALFA: 1,
  BETA: 2,
  SIGMA: 3,
  OMEGA: 4,
};

// ─── getAdminProfile ──────────────────────────────────────────────────────
// Retorna o perfil do admin logado ou null se não autorizado.
// Garante que APENAS perfis SIRIUS acessem o admin.
export async function getAdminProfile(): Promise<AdminProfile | null> {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );

  // 1. Verificar sessão ativa
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return null;

  // 2. Buscar perfil com campos necessários
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select(`
      id,
      horizon_id,
      social_name,
      legal_name,
      celestial_group,
      access_level,
      constellation_code,
      avatar_url,
      prestige_score
    `)
    .eq('id', user.id)
    .single();

  if (profileError || !profile) return null;

  // 3. GATE PRINCIPAL: Apenas SIRIUS pode acessar o admin.
  //    Qualquer outro grupo é recusado, sem exceções.
  if (profile.celestial_group !== 'SIRIUS') {
    console.warn(
      `[SEC-HZ-ADMIN-001] Tentativa de acesso negada. ` +
      `Grupo: ${profile.celestial_group} | ID: ${user.id} | ` +
      `Horizon: ${profile.horizon_id}`
    );
    return null;
  }

  return {
    ...profile,
    access_level: (profile.access_level as AccessLevel) ?? 'ALFA',
    email: user.email!,
  };
}

// ─── canAccess ────────────────────────────────────────────────────────────
// Verifica se um perfil atende o nível mínimo e, opcionalmente, a constelação.
// Uso: canAccess(profile, 'OMEGA') ou canAccess(profile, 'SIGMA', 'LINCE_EDU')
export function canAccess(
  profile: AdminProfile,
  requiredLevel: AccessLevel,
  requiredConstellation?: string
): boolean {
  const userRank = LEVEL_RANK[profile.access_level] ?? 0;
  const requiredRank = LEVEL_RANK[requiredLevel] ?? 3;

  const hasLevel = userRank >= requiredRank;

  if (!requiredConstellation) return hasLevel;

  // Verificação de constelação: o campo constellation_code do perfil
  // deve conter ou corresponder à constelação exigida.
  const hasConstellation =
    profile.constellation_code === requiredConstellation ||
    profile.constellation_code?.includes(requiredConstellation);

  return hasLevel && !!hasConstellation;
}

// ─── getLevelLabel ────────────────────────────────────────────────────────
export function getLevelLabel(level: AccessLevel): string {
  const labels: Record<AccessLevel, string> = {
    ALFA: 'Alfa — Leitura',
    BETA: 'Beta — Teste',
    SIGMA: 'Sigma — Escrita',
    OMEGA: 'Ômega — Administração',
  };
  return labels[level] ?? level;
}

// ─── getLevelColor ────────────────────────────────────────────────────────
export function getLevelColor(level: AccessLevel): string {
  const colors: Record<AccessLevel, string> = {
    ALFA: '#8C8C8C',
    BETA: '#0A2540',
    SIGMA: '#B6192E',
    OMEGA: '#2A0039',
  };
  return colors[level] ?? '#8C8C8C';
}
