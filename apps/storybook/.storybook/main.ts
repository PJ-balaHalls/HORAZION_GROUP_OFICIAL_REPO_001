// apps/storybook/.storybook/main.ts
import type { StorybookConfig } from "@storybook/react-vite";
import { join, dirname } from "path";

/**
 * Função utilitária para resolver caminhos absolutos dentro do monorepo
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../../../packages/ui/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-a11y"), // Auditoria Axe-core obrigatória
    getAbsolutePath("@storybook/addon-themes"), // Suporte nativo à Theme Engine
    getAbsolutePath("storybook-addon-performance") // Benchmark de renderização
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};

export default config;