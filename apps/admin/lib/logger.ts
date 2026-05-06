/**
 * Biblioteca de Logging Padronizada (Horazion Group)
 * Foco: Rastreabilidade, estruturação no terminal e fácil parseamento futuro por ferramentas como Datadog/Sentry.
 */
export const Logger = {
  info: (context: string, message: string, meta?: any) => {
    console.log(`[INFO] [${new Date().toISOString()}] [${context}] ${message}`, meta ? JSON.stringify(meta) : '');
  },
  warn: (context: string, message: string, meta?: any) => {
    console.warn(`\x1b[33m[WARN] [${new Date().toISOString()}] [${context}] ${message}\x1b[0m`, meta ? JSON.stringify(meta) : '');
  },
  error: (context: string, message: string, error?: any) => {
    console.error(`\x1b[31m[ERROR] [${new Date().toISOString()}] [${context}] ${message}\x1b[0m`, error || '');
  },
  audit: (userId: string, action: string, details: string) => {
    // Evolução futura: Salvar no banco BD-ADMIN (audit_logs)
    console.log(`[AUDIT] [${new Date().toISOString()}] USER:${userId} | ACTION:${action} | ${details}`);
  }
};