import type { Preview } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import '@horizon/ui/globals.css';

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: true }] } }
  },
  decorators: [
    withThemeByDataAttribute({
      themes: { light: 'light', dark: 'dark', brandA: 'tenant-a', eventCopa: 'event-copa' },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ]
};
export default preview;
