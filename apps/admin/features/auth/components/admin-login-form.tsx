// apps/admin/features/auth/components/admin-login-form.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowRight } from 'lucide-react';
// IMPORTAÇÃO CORRIGIDA: Utilizando o alias oficial do monorepo Horazion
import { Button } from '@horizion/ui/components/button/button';

export function AdminLoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorCode(null);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email');
      const password = formData.get('password');

      if (!email || !password) {
        throw new Error('AUTH_EMPTY_FIELDS');
      }

      // Delay para simulação visual de handshake criptográfico
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push('/dashboard');
      
    } catch (error: any) {
      setErrorCode(error.message || 'AUTH_UNAUTHORIZED');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full font-sans">
      
      {errorCode && (
        <div className="p-3 border border-[var(--color-hrz-red)] bg-[#B6192E]/5 rounded-md text-[var(--color-hrz-red)] text-[12px] font-bold tracking-tight">
          CÓDIGO: {errorCode} — Acesso negado.
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">
          Credencial de Operador
        </label>
        <input 
          id="email"
          name="email"
          type="email" 
          placeholder="admin@horazion.com"
          required
          className="w-full px-3 py-2.5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-md text-[14px] text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:border-[var(--color-text-primary)] focus:ring-1 focus:ring-[var(--color-text-primary)] transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">
          Chave de Segurança
        </label>
        <input 
          id="password"
          name="password"
          type="password" 
          placeholder="••••••••••••"
          required
          className="w-full px-3 py-2.5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-md text-[14px] text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:border-[var(--color-text-primary)] focus:ring-1 focus:ring-[var(--color-text-primary)] transition-all"
        />
      </div>

      {/* Button consumido do pacote unificado */}
      <Button 
        type="submit" 
        disabled={isLoading}
        className="mt-2 w-full flex items-center justify-center gap-2 bg-[var(--color-text-primary)] text-[var(--color-background)] hover:bg-[var(--color-text-secondary)] transition-colors py-3 rounded-md font-medium"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>Autenticar Sessão <ArrowRight className="w-4 h-4" /></>
        )}
      </Button>
    </form>
  );
}