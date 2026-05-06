// apps/admin/app/layout.tsx
import './globals.css';

// Mitigação Arquitetural: O uso de next/font/google está sofrendo bloqueio de HTTP2 
// no motor Turbopack local. Adotamos o padrão System Fonts para painéis 
// administrativos, garantindo 0 bytes de latência no carregamento.
export const metadata = {
  title: 'Horazion Admin - Governança',
  description: 'Controle central da infraestrutura Horazion.',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="font-sans bg-[var(--color-background)] text-[var(--color-text-primary)] antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}