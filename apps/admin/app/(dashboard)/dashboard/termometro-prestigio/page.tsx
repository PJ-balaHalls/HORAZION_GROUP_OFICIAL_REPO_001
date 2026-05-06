import { BadgeEmBreve } from "@horazion/ui/components/badge/embreve/badgeembreve";

export default function Page() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-title1 font-bold text-black">termometro-prestigio</h1>
        <BadgeEmBreve />
      </div>
      <p className="text-highlight text-secondary leading-relaxed mb-10">
        Acompanhamento da distribuição de Prestige Score e progressão de níveis. (Requer Sirius Sigma+).
      </p>
      <div className="border border-border bg-surface rounded-xl p-20 flex items-center justify-center text-secondary border-dashed">
        Módulo Administrativo em Desenvolvimento
      </div>
    </div>
  );
}
