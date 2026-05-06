/**
 * Biblioteca de Erros - Horizon Codex
 * Garante que todo erro possua: Código único, Mensagem amigável e Orientação de solução.
 */
export class HorazionError extends Error {
  public readonly code: string;
  public readonly userMessage: string;
  public readonly action: string;

  constructor(code: string, userMessage: string, action: string, technicalMessage?: string) {
    super(technicalMessage || userMessage);
    this.name = 'HorazionError';
    this.code = code;
    this.userMessage = userMessage;
    this.action = action;
    
    // Log automático da anomalia no momento da criação
    console.error(`[HorazionError] ${this.code}: ${this.message}`);
  }
}

export const ERROR_DICTIONARY = {
  AUTH_001: {
    code: 'AUTH_001',
    message: 'Credenciais inválidas ou não encontradas.',
    action: 'Verifique seu e-mail e senha e tente novamente.'
  },
  AUTH_002: {
    code: 'AUTH_002',
    message: 'Conta sem permissão administrativa.',
    action: 'Solicite acesso ao gestor de infraestrutura (Horazion Core).'
  },
  SYS_001: {
    code: 'SYS_001',
    message: 'Falha de comunicação com o serviço central.',
    action: 'Aguarde alguns instantes ou verifique a SystemBar para status de conectividade.'
  }
};

export function throwHorazionError(errorKey: keyof typeof ERROR_DICTIONARY): never {
  const err = ERROR_DICTIONARY[errorKey];
  throw new HorazionError(err.code, err.message, err.action);
}