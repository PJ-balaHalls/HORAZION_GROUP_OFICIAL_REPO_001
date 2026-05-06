// tailwind.config.ts (Na raiz do monorepo ou base exportada de packages/ui)

import type { Config } from "tailwindcss";

const config: Config = {
  // Varre todos os arquivos do monorepo para não perder classes
  content: [
    "./apps/**/*.{js,ts,jsx,tsx,mdx}",
    "./packages/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        // Superfícies
        background: "hsl(var(--background))",
        surface: "hsl(var(--surface))",
        "surface-muted": "hsl(var(--surface-muted))",
        overlay: "hsl(var(--overlay))",

        // Textos
        text: {
          primary: "hsl(var(--text-primary))",
          secondary: "hsl(var(--text-secondary))",
          inverse: "hsl(var(--text-inverse))",
        },

        // Marca
        brand: {
          DEFAULT: "hsl(var(--brand))",
          hover: "hsl(var(--brand-hover))",
          foreground: "hsl(var(--brand-foreground))",
          secondary: "hsl(var(--brand-secondary))",
          support: "hsl(var(--brand-support))",
        },

        // Estrutura
        border: {
          DEFAULT: "hsl(var(--border))",
          light: "hsl(var(--border-light))",
        },
        focus: "hsl(var(--focus))",

        // Feedbacks
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        danger: "hsl(var(--danger))",
        info: "hsl(var(--info))",
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      spacing: {
        // Escala de espaço baseada em 4px (conforme a doc)
        "1": "0.25rem",  // 4px
        "2": "0.5rem",   // 8px
        "3": "0.75rem",  // 12px
        "4": "1rem",     // 16px
        "6": "1.5rem",   // 24px
        "8": "2rem",     // 32px
        "12": "3rem",    // 48px
        "16": "4rem",    // 64px
      },
    },
  },
  plugins: [],
};

export default config;