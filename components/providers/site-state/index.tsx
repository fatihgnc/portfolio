"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { messages, type Locale, type Messages, type Theme } from "@/content/site";

export const THEME_KEY = "pf-theme";
export const LOCALE_KEY = "pf-locale";

type SiteState = {
  theme: Theme;
  locale: Locale;
  /** copy for the active locale */
  t: Messages;
  toggleTheme: () => void;
  toggleLocale: () => void;
  setLocale: (l: Locale) => void;
};

const Ctx = createContext<SiteState | null>(null);

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* private mode etc. */
  }
}

export function SiteStateProvider({ children }: { children: React.ReactNode }) {
  // The server always renders dark + English; the stored preference is applied
  // after hydration. For the theme, the boot script in layout prevents a flash.
  const [theme, setTheme] = useState<Theme>("dark");
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const t = read(THEME_KEY);
    if (t === "light" || t === "dark") setTheme(t);
    const l = read(LOCALE_KEY);
    if (l === "en" || l === "tr") setLocaleState(l);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      write(THEME_KEY, next);
      return next;
    });
  }, []);

  const setLocale = useCallback((next: Locale) => {
    write(LOCALE_KEY, next);
    setLocaleState(next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "tr" : "en");
  }, [locale, setLocale]);

  const value = useMemo<SiteState>(
    () => ({ theme, locale, t: messages[locale], toggleTheme, toggleLocale, setLocale }),
    [theme, locale, toggleTheme, toggleLocale, setLocale],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSiteState(): SiteState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSiteState must be used within SiteStateProvider");
  return ctx;
}
