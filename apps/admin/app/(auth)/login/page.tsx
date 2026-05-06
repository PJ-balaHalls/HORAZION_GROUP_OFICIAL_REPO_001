'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Mail, Lock, ChevronRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setStatusText('Iniciando comunicação segura...');
    await new Promise(r => setTimeout(r, 800));
    setStatusText('Consultando matriz de permissões...');
    await new Promise(r => setTimeout(r, 1000));
    
    router.push('/2fa');
  };

  return (
    <div className="w-full max-w-[420px] animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Painel Central - Flat Design, Sem sombras artificiais pesadas */}
      <div className="bg-[var(--surface)] rounded-[24px] overflow-hidden border border-[var(--border)] shadow-sm">
        
        {/* Header - Logo Institucional */}
        <div className="pt-12 pb-6 px-10 flex flex-col items-center justify-center relative">
          <Image 
            src="/images/HORAZION/ISOLOGO-RED.svg" 
            alt="Horazion Group Logo" 
            width={120} 
            height={28} 
            priority
            className="mb-5 object-contain h-7 w-auto"
          />
          <p className="text-[var(--text-secondary)] text-[9px] tracking-[0.3em] uppercase font-bold text-center">
            Portal de Governança
          </p>
        </div>

        {/* Subsistemas Controlados (Departamentos) */}
        <div className="flex justify-center items-center gap-5 pb-8 border-b border-[var(--border)] px-10">
          <Image 
            src="/images/HORAZION/LOGO-DEPARTAMENT-conteudoeeducacao.svg" 
            alt="Conteúdo e Educação" 
            width={20} 
            height={20} 
            className="opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" 
          />
          <Image 
            src="/images/HORAZION/LOGO-DEPARTAMENT-segurançaelgpd.svg" 
            alt="Segurança e LGPD" 
            width={20} 
            height={20} 
            className="opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" 
          />
          <Image 
            src="/images/HORAZION/LOGO-DEPARTAMENT-uiux.svg" 
            alt="UI/UX" 
            width={20} 
            height={20} 
            className="opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" 
          />
        </div>

        {/* Formulário de Autenticação */}
        <div className="p-10 pt-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest ml-1">
                Horizon ID
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] group-focus-within:text-[var(--brand)] transition-colors">
                  <Mail size={16} />
                </div>
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@horazion.com"
                  className="w-full pl-12 pr-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--text-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--brand)] focus:border-[var(--brand)] transition-all placeholder:opacity-30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest ml-1">
                Chave de Acesso
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] group-focus-within:text-[var(--brand)] transition-colors">
                  <Lock size={16} />
                </div>
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--text-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--brand)] focus:border-[var(--brand)] transition-all placeholder:opacity-30"
                />
              </div>
            </div>

            {/* Botão Primário */}
            <button 
              type="submit"
              disabled={isProcessing}
              className="mt-6 w-full h-12 bg-[var(--brand)] hover:opacity-90 text-white rounded-xl font-bold text-xs tracking-wide flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={16} className="animate-spin text-white" />
                  <span className="italic font-normal">{statusText}</span>
                </>
              ) : (
                <>
                  ACESSAR GOVERNANÇA
                  <ChevronRight size={16} className="text-white" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer com contraste correto para fundo branco */}
      <p className="mt-6 text-center text-[9px] text-[var(--text-secondary)] font-medium tracking-widest uppercase">
        &copy; 2026 HORAZION GROUP &bull; ACESSO RESTRITO E AUDITADO
      </p>
    </div>
  );
}