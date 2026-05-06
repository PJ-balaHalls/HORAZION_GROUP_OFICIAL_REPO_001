'use server';

import { redirect } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
cd
export interface LoginResult {
  success: false;
  error: string;
}

export async function loginAdminAction(
  email: string,
  password: string
): Promise<LoginResult> {
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

  // 1. Autenticar credenciais
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });

  if (error || !data.user) {
    const msg = error?.message?.includes('Invalid login credentials')
      ? 'Credenciais inválidas. Verifique e-mail e senha.'
      : error?.message?.includes('Email not confirmed')
      ? 'E-mail não confirmado. Verifique sua caixa de entrada.'
      : error?.message?.includes('Too many requests')
      ? 'Muitas tentativas. Aguarde alguns minutos.'
      : 'Falha na autenticação. Tente novamente.';
    return { success: false, error: msg };
  }

  // 2. Verificar Grupo Celestial — APENAS SIRIUS pode entrar
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('celestial_group, access_level, social_name, horizon_id')
    .eq('id', data.user.id)
    .single();

  if (profileError || !profile) {
    await supabase.auth.signOut();
    return { success: false, error: 'Perfil não encontrado. Contate o administrador.' };
  }

  if (profile.celestial_group !== 'SIRIUS') {
    await supabase.auth.signOut();
    // Registra tentativa de acesso não autorizado (auditoria silenciosa)
    console.error(
      `[SEC-HZ-ADMIN-003] ACESSO_NEGADO | ` +
      `Grupo: ${profile.celestial_group} | ` +
      `Horizon: ${profile.horizon_id} | ` +
      `Email: ${email} | ` +
      `IP: server-side`
    );
    return {
      success: false,
      error: `PROTOCOLO DE SEGURANÇA ATIVADO: Apenas perfis do Grupo Sirius podem acessar este ambiente. ` +
             `Sua tentativa foi registrada. Grupo detectado: ${profile.celestial_group}.`,
    };
  }

  // 3. Sucesso — redireciona para o dashboard
  redirect('/');
}

export async function logoutAdminAction() {
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
  await supabase.auth.signOut();
  redirect('/login');
}
