'use client';

import React from 'react';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="border-b border-zinc-100 pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Governança Central</h1>
          <p className="text-sm text-zinc-500 mt-2">Gestão de Identidade, Dados e Auditoria do Ecossistema Horazion.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center font-bold text-zinc-800">
            AD
          </div>
        </div>
      </header>

      {/* Grid simulando a arquitetura de "Blocos Vivos" */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BlockCard title="Horizion IDs (Contas)" value="14.205" status="Saudável" />
        <BlockCard title="Integrações Supabase" value="4 Ativas" status="Sincronizado" />
        <BlockCard title="Logs de Auditoria" value="230 hoje" status="Verificar Avisos" />
      </div>
    </div>
  );
}

function BlockCard({ title, value, status }: { title: string, value: string, status: string }) {
  return (
    <div className="p-6 bg-zinc-50 border border-zinc-100 rounded-2xl hover:border-zinc-300 transition-colors duration-300 cursor-pointer group">
      <h3 className="text-sm font-semibold text-zinc-500 mb-4">{title}</h3>
      <p className="text-3xl font-bold text-zinc-900 mb-2 group-hover:text-[#E50000] transition-colors">{value}</p>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${status.includes('Verificar') ? 'bg-yellow-500' : 'bg-green-500'}`} />
        <span className="text-xs font-medium text-zinc-600">{status}</span>
      </div>
    </div>
  );
}