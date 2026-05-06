// packages/ui/providers/horazion-provider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeMode = "light" | "dark" | "high-contrast";

interface HorazionContextProps {
  theme: ThemeMode;
  tenant?: string;
  setTheme: (theme: ThemeMode) => void;
  setTenant: (tenant: string) => void;
}

const HorazionContext = createContext<HorazionContextProps | undefined>(undefined);

export interface HorazionProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
  defaultTenant?: string;
}

/**
 * HorazionProvider
 * Gerencia o engine de temas em camadas via data-attributes, 
 * injetando tokens DTCG diretamente no CSS nativo.
 */
export const HorazionProvider: React.FC<HorazionProviderProps> = ({
  children,
  defaultTheme = "light",
  defaultTenant,
}) => {
  const [theme, setTheme] = useState<ThemeMode>(defaultTheme);
  const [tenant, setTenant] = useState<string | undefined>(defaultTenant);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove temas antigos
    root.removeAttribute("data-theme");
    root.removeAttribute("data-tenant");

    // Aplica as novas diretrizes
    root.setAttribute("data-theme", theme);
    if (tenant) {
      root.setAttribute("data-tenant", tenant);
    }
  }, [theme, tenant]);

  return (
    <HorazionContext.Provider value={{ theme, tenant, setTheme, setTenant }}>
      {children}
    </HorazionContext.Provider>
  );
};

export const useHorazion = () => {
  const context = useContext(HorazionContext);
  if (!context) {
    throw new Error("useHorazion deve ser usado dentro de um HorazionProvider");
  }
  return context;
};