import { BadgeEmBreve } from "@horazion/ui/components/badge/embreve/badgeembreve";

export default function Page() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-title1 font-bold text-black">sancoes-pep</h1>
        <BadgeEmBreve />
      </div>
      <p className="text-highlight text-secondary leading-relaxed mb-10">
        Visualizar o status de risco e de Pessoa Exposta Politicamente de qualquer entidade. (Requer Sirius Omega).
      </p>
      <div className="border border-border bg-surface rounded-xl p-20 flex items-center justify-center text-secondary border-dashed">
        Módulo Administrativo em Desenvolvimento
      </div>
    </div>
  );
}
