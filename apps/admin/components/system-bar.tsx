'use client';

import React, { useEffect, useState } from 'react';
import { Info, CheckCircle2, AlertCircle } from 'lucide-react';

type StatusDetail = {
  label: string;
  state: 'online' | 'offline' | 'checking';
  detailMsg: string;
};

export function SystemBar() {
  const [status, setStatus] = useState<Record<string, StatusDetail>>({
    env: { label: 'Environment (ENV)', state: 'checking', detailMsg: 'Aguardando verificação...' },
    supabase: { label: 'Integração Supabase', state: 'checking', detailMsg: 'Aguardando verificação...' },
    backend: { label: 'Admin API', state: 'checking', detailMsg: 'Aguardando verificação...' }
  });

  const [activeInfo, setActiveInfo] = useState<string | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch('/api/health');
        const data = await res.json();
        
        setStatus({
          env: { label: 'Environment (ENV)', state: data.env, detailMsg: data.details.env },
          supabase: { label: 'Integração Supabase', state: data.supabase, detailMsg: data.details.supabase },
          backend: { label: 'Admin API', state: data.backend, detailMsg: 'Módulo Next.js respondendo corretamente.' }
        });
      } catch (error) {
        const fallbackMsg = 'Servidor de diagnóstico inacessível.';
        setStatus(prev => ({
          env: { ...prev.env, state: 'offline', detailMsg: fallbackMsg },
          supabase: { ...prev.supabase, state: 'offline', detailMsg: fallbackMsg },
          backend: { ...prev.backend, state: 'offline', detailMsg: fallbackMsg }
        }));
      }
    };
    
    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (state: string) => {
    if (state === 'online') return <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />;
    if (state === 'offline') return <div className="w-2 h-2 rounded-full bg-[#E50000]" />;
    return <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />;
  };

  return (
    <div className="fixed top-0 left-0 w-full h-10 bg-white/60 backdrop-blur-xl border-b border-[var(--border)] text-[10px] flex items-center justify-between px-6 z-[100] font-mono tracking-tighter text-[var(--text-primary)]">
      <div className="flex items-center gap-8">
        {Object.entries(status).map(([key, value]) => (
          <div key={key} className="flex items-center gap-3 relative group">
            <div className="flex items-center gap-2">
              {getStatusIcon(value.state)}
              <span className="uppercase font-semibold tracking-wider">{value.label}</span>
            </div>
            
            {/* Botão Clicável de Diagnóstico */}
            <button 
              onClick={() => setActiveInfo(activeInfo === key ? null : key)}
              className="hover:text-[var(--brand)] transition-colors p-1"
              aria-label="Diagnóstico Detalhado"
            >
              <Info size={12} className={activeInfo === key ? "text-[var(--brand)]" : "text-[var(--text-secondary)]"} />
            </button>

            {/* Popover com erro EXATO da API */}
            {activeInfo === key && (
              <div className="absolute top-10 left-0 w-80 bg-[var(--surface)] border border-[var(--border)] p-4 rounded-xl shadow-xl animate-in fade-in zoom-in-95 duration-200 z-[110]">
                <h4 className="font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                  {value.state === 'online' ? <CheckCircle2 size={16} className="text-green-500" /> : <AlertCircle size={16} className="text-[#E50000]" />}
                  DIAGNÓSTICO: {value.label}
                </h4>
                <div className="p-3 bg-[var(--background)] rounded-lg border border-[var(--border)] mb-2">
                  <p className="text-[var(--text-secondary)] font-mono text-[10px] leading-relaxed break-words">
                    {value.detailMsg}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 opacity-70">
        <div className="h-1 w-12 bg-[var(--border)] rounded-full overflow-hidden">
          <div className="h-full bg-[var(--brand)] w-full animate-pulse opacity-80" />
        </div>
        <span className="font-semibold text-[var(--text-secondary)]">HORAZION CORE SECURE NODE</span>
      </div>
      
      {activeInfo && <div className="fixed inset-0 z-[-1]" onClick={() => setActiveInfo(null)} />}
    </div>
  );
}