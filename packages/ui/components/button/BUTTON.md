# Componente: Button

## Descrição e Propósito
O `Button` do Horazion Design System é o elemento primário de interação. Ele segue o princípio de **Minimalismo funcional**, comunicando ações claras sem distrações visuais (sem sombras, sem gradientes de fundo primário).

## API (Props)

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `variant` | `'default' \| 'secondary' \| 'tertiary' \| 'destructive'` | `'default'` | Define a prioridade visual da ação. |
| `size` | `'default' \| 'sm' \| 'lg' \| 'icon'` | `'default'` | Ajusta a altura e o padding baseados no grid de 4px. |
| `asChild` | `boolean` | `false` | Se `true`, repassa as classes e ref para o elemento filho imediato (ex: `Link` do Next.js). |
| `isLoading` | `boolean` | `false` | Exibe um spinner nativo, desabilita o clique e adiciona `aria-busy="true"`. |

## Estados e Variações
- **Primário (`default`)**: Fundo HRZ-RED (`#B6192E`), texto branco. Apenas 1 por contexto.
- **Secundário (`secondary`)**: Fundo transparente, borda discreta HRZ-BORDER. Ações de suporte.
- **Terciário (`tertiary`)**: Texto puro sem fundo ou borda, com sublinhado no hover.
- **Disabled**: Opacidade reduzida para 38% (`opacity-[0.38]`), pointer events desabilitados.

## Acessibilidade
- **WCAG 2.2 AA**: Contraste superior a 4.5:1 em todos os temas.
- **Foco visível**: Implementado via `focus-visible:ring-hrz-focus-ring` (evita outlines indesejados ao clicar com mouse, aparecendo apenas no teclado).
- **Semântica**: Suporta nativamente `aria-disabled`, `aria-busy` e `aria-expanded` quando estendido.

## Exemplos de Uso (Integração na App Web/Admin)
```tsx
import { Button } from '@horazion/ui/components/button';
import Link from 'next/link';

export function ActionBar() {
  return (
    <div className="flex gap-space-4 items-center">
      <Button variant="secondary" asChild>
        <Link href="/dashboard">Voltar</Link>
      </Button>
      <Button variant="default" onClick="{()"> console.log('Salvo!')}>
        Salvar Alterações
      </Button>
    </div>
  );
}