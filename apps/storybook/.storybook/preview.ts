// apps/storybook/.storybook/preview.ts
import type { Preview } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";

// Importação do CSS global consolidado (Tokens DTCG gerados + base)
// Ajuste o caminho de acordo com o build de estilo final do seu monorepo
import '../../../packages/ui/globals.css'; 

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        // Força a página "Introdução" a ser a página aberta por padrão
        order: ['Introdução', 'Fundamentos', ['Cores', 'Tipografia', 'Espaçamento'], 'Componentes'],
      },
    },
  },
  decorators: [
    // Engine Avançada de Temas: injeta os atributos na tag <html> ou <body> do iframe
    withThemeByDataAttribute({
      themes: {
        default: 'default',
        'tenant-acme': 'tenant-acme',
        'event-copa': 'event-copa',
        dark: 'dark',
        'high-contrast': 'high-contrast',
      },
      defaultTheme: 'default',
      attributeName: 'data-theme',
    }),
    (Story, context) => {
      // Decorator base para envolver todos os componentes
      // Útil caso o @horizon/theme possua um <ThemeProvider> genérico
      return Story();
    }
  ],
};

export default preview;