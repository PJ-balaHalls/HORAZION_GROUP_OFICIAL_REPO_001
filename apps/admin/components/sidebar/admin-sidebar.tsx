import { 
  LayoutDashboard, ShieldAlert, UserCog, 
  Globe, LayoutTemplate, BarChart, History 
} from "lucide-react";
// Assumindo a existência do componente Sidebar base no pacote UI

const menuStructure = [
  {
    label: "Dashboard Principal",
    icon: LayoutDashboard,
    items: [
      { title: "Métricas em Tempo Real", url: "/dashboard/metricas-tempo-real" },
      { title: "Mapa de Calor", url: "/dashboard/mapa-calor" },
      { title: "Termômetro de Prestígio", url: "/dashboard/termometro-prestigio" },
    ]
  },
  {
    label: "Gestão de Entidades Legais",
    icon: ShieldAlert,
    items: [
      { title: "Busca CPF/CNPJ", url: "/usuarios/entidades/busca-cpf-cnpj" },
      { title: "Validação de Documentos", url: "/usuarios/entidades/validacao-documentos" },
      { title: "Lista de Sanções e PEP", url: "/usuarios/entidades/sancoes-pep" },
    ]
  },
  {
    label: "Usuários e Profiles",
    icon: UserCog,
    items: [
      { title: "Busca ID/E-mail", url: "/usuarios/profiles/busca-id-email" },
      { title: "Perfil Completo", url: "/usuarios/profiles/perfil-completo" },
    ]
  },
  {
    label: "Presença Digital",
    icon: Globe,
    items: [
      { title: "SEO e Metadados", url: "/presenca-digital/seo-metadados" },
      { title: "Indexação e Sitemap", url: "/presenca-digital/indexacao-sitemap" },
    ]
  },
  {
    label: "Leads e Marketing",
    icon: LayoutTemplate,
    items: [
      { title: "Configuração Formulários", url: "/leads/configuracao-formularios" },
      { title: "Pipeline de Leads", url: "/leads/pipeline-leads" },
    ]
  },
  {
    label: "Analytics",
    icon: BarChart,
    items: [
      { title: "Painel de Métricas", url: "/analytics/painel-metricas" },
      { title: "Consentimento LGPD", url: "/analytics/consentimento-lgpd" },
    ]
  },
  {
    label: "Auditoria",
    icon: History,
    items: [
      { title: "Logs de Alteração", url: "/auditoria/logs-alteracao" },
      { title: "Histórico de Versões", url: "/auditoria/historico-versoes" },
    ]
  }
];

export function AdminSidebar() {
  return (
    <nav className="w-64 border-r border-border h-full bg-white flex flex-col p-4">
      {menuStructure.map((group) => (
        <div key={group.label} className="mb-6">
          <h3 className="text-micro font-bold text-secondary uppercase tracking-widest px-2 mb-2">
            {group.label}
          </h3>
          <ul className="space-y-1">
            {group.items.map((item) => (
              <li key={item.title}>
                <a href={item.url} className="flex items-center justify-between px-2 py-2 text-label text-primary hover:bg-surface rounded-lg transition-colors">
                  {item.title}
                  <span className="text-[10px] bg-brand/10 text-brand px-1.5 py-0.5 rounded font-bold">SOON</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}