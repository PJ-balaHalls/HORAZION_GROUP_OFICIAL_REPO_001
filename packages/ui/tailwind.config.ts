// packages/ui/tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
    "../../apps/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        hrz: {
          background: "rgb(var(--hrz-background) / <alpha-value>)",
          surface: "rgb(var(--hrz-surface) / <alpha-value>)",
          "text-primary": "rgb(var(--hrz-text-primary) / <alpha-value>)",
          "text-secondary": "rgb(var(--hrz-text-secondary) / <alpha-value>)",
          border: "rgb(var(--hrz-border) / <alpha-value>)",
          "brand-red": "rgb(var(--hrz-brand-red) / <alpha-value>)",
          "brand-purple": "rgb(var(--hrz-brand-purple) / <alpha-value>)",
          "brand-blue": "rgb(var(--hrz-brand-blue) / <alpha-value>)",
          success: "rgb(var(--hrz-success) / <alpha-value>)",
          warning: "rgb(var(--hrz-warning) / <alpha-value>)",
          danger: "rgb(var(--hrz-danger) / <alpha-value>)",
          info: "rgb(var(--hrz-info) / <alpha-value>)",
          "focus-ring": "rgb(var(--hrz-focus-ring) / <alpha-value>)",
        },
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
      },
      borderRadius: {
        sm: "var(--hrz-radius-sm)",
        md: "var(--hrz-radius-md)",
        lg: "var(--hrz-radius-lg)",
      },
      backgroundImage: {
        "gradient-official": "linear-gradient(90deg, #B6192E 0%, #2A0039 50%, #0A2540 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;