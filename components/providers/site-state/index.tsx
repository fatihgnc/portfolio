"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { copy, type Copy, type Lang, type Theme } from "@/content/site";

export const LANG_KEY = "pf-lang";
export const THEME_KEY = "pf-theme";

type SiteState = {
  lang: Lang;
  theme: Theme;
  t: Copy;
  /** ilk render'dan sonra true — hydration'a bağlı değerler için */
  ready: boolean;
  /** dar ekranda sidebar çekmecesi açık mı */
  navOpen: boolean;
  setLang: (lang: Lang) => void;
  toggleTheme: () => void;
  setNavOpen: (open: boolean) => void;
};

const SiteStateContext = createContext<SiteState | null>(null);

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

export function SiteStateProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("tr");
  const [theme, setTheme] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    try {
      const storedLang = localStorage.getItem(LANG_KEY);
      if (storedLang === "tr" || storedLang === "en") setLangState(storedLang);

      const storedTheme = localStorage.getItem(THEME_KEY);
      if (storedTheme === "dark" || storedTheme === "light") {
        setTheme(storedTheme);
        applyTheme(storedTheme);
      }
    } catch {
      /* private mode — varsayılanlarla devam */
    }
    setReady(true);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    document.documentElement.lang = next;
    try {
      localStorage.setItem(LANG_KEY, next);
    } catch {
      /* yoksay */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        /* yoksay */
      }
      return next;
    });
  }, []);

  // çekmece açıkken arka plan kaymasın
  useEffect(() => {
    if (!navOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [navOpen]);

  const value = useMemo<SiteState>(
    () => ({
      lang,
      theme,
      t: copy[lang],
      ready,
      navOpen,
      setLang,
      toggleTheme,
      setNavOpen,
    }),
    [lang, theme, ready, navOpen, setLang, toggleTheme],
  );

  return (
    <SiteStateContext.Provider value={value}>
      {children}
    </SiteStateContext.Provider>
  );
}

export function useSiteState(): SiteState {
  const ctx = useContext(SiteStateContext);
  if (!ctx) {
    throw new Error("useSiteState, SiteStateProvider içinde kullanılmalı");
  }
  return ctx;
}
