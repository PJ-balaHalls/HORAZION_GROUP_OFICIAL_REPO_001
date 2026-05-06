import React from 'react';
// Importação rigorosa do pacote compartilhado (Monorepo)
import { AccessibilityTrigger } from '@horazion/ui/components/accessibility/accessibility-trigger';
import { AccessibilityDrawer } from '@horazion/ui/components/accessibility/accessibility-drawer';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#E50000] selection:text-white">
      {/* Injeção global de acessibilidade sem poluir o layout */}
      <AccessibilityTrigger />
      <AccessibilityDrawer />
      
      {/* Layout Clean, sem navbar superior tradicional, focado em Blocos Vivos */}
      <main className="w-full h-screen p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}