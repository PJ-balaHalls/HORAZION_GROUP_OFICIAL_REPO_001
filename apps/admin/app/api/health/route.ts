import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Logger } from '@/lib/logger';

export async function GET() {
  const startTime = performance.now();
  
  const status = {
    env: 'offline',
    supabase: 'offline',
    backend: 'online', // Se o Next.js responde, o backend está ativo
    details: { env: '', supabase: '' }
  };
  
  // 1. Validação Granular de Variáveis de Ambiente
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const missingEnvs = [];
  
  if (!supabaseUrl) missingEnvs.push('NEXT_PUBLIC_SUPABASE_URL');
  if (!supabaseKey) missingEnvs.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');

  if (missingEnvs.length === 0) {
    status.env = 'online';
    status.details.env = 'Todas as variáveis críticas de ambiente estão injetadas e ativas.';
    Logger.info('HealthCheck', '✅ Variáveis de ambiente (ENV) carregadas com sucesso.');
  } else {
    status.details.env = `Ausência de chaves obrigatórias: ${missingEnvs.join(', ')}`;
    Logger.error('HealthCheck', `❌ FALHA DE ENV: O sistema não encontrou as variáveis: ${missingEnvs.join(', ')}`);
  }

  // 2. Validação Profunda de Integração com Supabase
  if (status.env === 'online') {
    try {
      const supabase = createClient(supabaseUrl as string, supabaseKey as string);
      
      // Valida não apenas a URL, mas se a chave tem permissão real para consultar
      const { error } = await supabase.from('organizations').select('id').limit(1);
      
      if (error) {
        status.details.supabase = `Erro retornado pelo banco: ${error.message} (Código: ${error.code})`;
        Logger.error('HealthCheck', `❌ FALHA NO SUPABASE: Conexão estabelecida, mas a consulta falhou. Detalhe técnico: ${error.message} | Código: ${error.code}`);
      } else {
        status.supabase = 'online';
        status.details.supabase = 'Conexão estabelecida e permissões de consulta validadas com sucesso.';
        Logger.info('HealthCheck', '✅ Integração com banco de dados Supabase (Core) funcionando perfeitamente.');
      }
    } catch (err: any) {
      status.details.supabase = `Erro de rede ou cliente: ${err.message}`;
      Logger.error('HealthCheck', `❌ FALHA CRÍTICA DE COMUNICAÇÃO: Não foi possível alcançar o Supabase. Erro: ${err.message}`, err);
    }
  } else {
    status.details.supabase = 'Verificação ignorada devido à falha nas variáveis de ambiente.';
  }

  const latency = Math.round(performance.now() - startTime);

  return NextResponse.json({
    env: status.env,
    supabase: status.supabase,
    backend: status.backend,
    details: status.details,
    latency: `${latency}ms`
  }, {
    status: status.env === 'online' && status.supabase === 'online' ? 200 : 503, // 503 indica falha sistêmica
    headers: {
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}