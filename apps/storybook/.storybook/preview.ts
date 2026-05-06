// apps/storybook/.storybook/preview.ts
import type { Preview } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "../../../packages/ui/globals.css"; // Importa os tokens CSS injetados
import "./storybook-fonts.css"; // Configuração da fonte Inter

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true, // Habilita Table of Contents nativo (Nível Enterprise)
    },
    options: {
      storySort: {
        order: ['Fundação', ['Princípios', 'Cores', 'Tipografia', 'Design Tokens'], 'Componentes'],
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
        ],
      },
    },
    backgrounds: {
      disable: true, // Desabilitado para focar no background gerado pelo tema
    },
  },
  decorators: [
    // Injeção de Tema e Motion no nível raiz do Storybook
    withThemeByDataAttribute({
      themes: {
        claro: "light",
        escuro: "dark",
        "alto-contraste": "high-contrast",
        "tenant-acme": "tenant-acme",
      },
      defaultTheme: "claro",
      attributeName: "data-theme",
    }),
    (Story) => (
      // Container base que garante que os estilos globais sejam aplicados
      // e respeita a preferência de acessibilidade do sistema do usuário
      `<div className="horazion-root antialiased font-sans text-hrz-text-primary bg-hrz-background min-h-screen">
        <Story />
      </div>`
    ),
  ],
};

export default preview;