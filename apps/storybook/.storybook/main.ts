// apps/storybook/.storybook/main.ts
import type { StorybookConfig } from "@storybook/react-vite";
import { join, dirname, resolve } from "path";

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
  stories: [
    "../../../packages/ui/**/*.mdx",
    "../../../packages/ui/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-themes"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  docs: {
    autodocs: "tag",
    defaultName: "Documentação",
  },
  core: {
    disableTelemetry: true,
  },
  // Configuração crítica para monorepos
  viteFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@horazion/utils": resolve(__dirname, "../../../packages/utils/src"),
        "@horazion/ui": resolve(__dirname, "../../../packages/ui/src"),
        "@horazion/tokens": resolve(__dirname, "../../../packages/tokens/src"),
        "@horazion/theme": resolve(__dirname, "../../../packages/theme/src"),
      };
    }
    return config;
  },
};

export default config;