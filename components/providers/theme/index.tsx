"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import type { Theme } from "@/content/site";

export const THEME_KEY = "pf-theme";

type ThemeState = {
  theme: Theme;
  toggleTheme: () => void;
};

const Ctx = createContext<ThemeState | null>(null);

/**
 * Theme is the only preference kept client-side; the locale lives in the URL
 * so that every page renders in one language on the server.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // The server always renders dark; the boot script in the root layout applies
  // the stored value before first paint, and this catches up on hydration.
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === "light" || stored === "dark") setTheme(stored);
    } catch {
      /* private mode etc. */
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        /* private mode etc. */
      }
      return next;
    });
  }, []);

  const value = useMemo<ThemeState>(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTheme(): ThemeState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
