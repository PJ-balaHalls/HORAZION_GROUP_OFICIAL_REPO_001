import { SystemBar } from '@/components/system-bar';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--background)]">
      {/* SystemBar isolada com seu efeito Liquid Glass */}
      <SystemBar />

      {/* Container principal totalmente limpo e centrado */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
}