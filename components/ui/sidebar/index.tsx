"use client";

import { useCallback, useEffect, useState } from "react";

import { useSiteState } from "@/components/providers/site-state";
import { nav, site, social } from "@/content/site";
import { scrollToSection } from "@/lib/scroll";

/** Sabit başlık yüksekliği kadar pay — bölüm başlıkları altında kalmasın. */
const OFFSET_WIDE = -12;
const OFFSET_NARROW = -64;

function useActiveSection() {
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    const read = () => {
      const line = window.innerHeight * 0.32;
      let current = "top";

      for (const item of nav) {
        if (item.id === "top") continue;
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = item.id;
      }

      setActive(current);
    };

    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read, { passive: true });
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, []);

  return active;
}

export default function Sidebar() {
  const { lang, t, navOpen, setNavOpen } = useSiteState();
  const active = useActiveSection();

  const go = useCallback(
    (id: string) => {
      setNavOpen(false);
      const wide = window.matchMedia("(min-width: 900px)").matches;
      scrollToSection(id, wide ? OFFSET_WIDE : OFFSET_NARROW);
    },
    [setNavOpen],
  );

  // 1–5 ile bölümler, Escape ile çekmece
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (event.key === "Escape") {
        setNavOpen(false);
        return;
      }

      const hit = nav.find((item) => item.key === event.key);
      if (!hit) return;
      event.preventDefault();
      go(hit.id);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, setNavOpen]);

  return (
    <>
      <div
        aria-hidden
        onClick={() => setNavOpen(false)}
        className={`fixed inset-0 z-[54] bg-black/55 transition-opacity duration-300 min-[900px]:hidden ${
          navOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        aria-label={t.navLabel}
        className={`fixed inset-y-0 left-0 z-[56] flex w-[272px] max-w-[84vw] flex-col overflow-y-auto border-r border-line bg-[var(--sbbg)] px-[18px] pb-[18px] pt-[22px] transition-transform duration-[380ms] ease-[cubic-bezier(.2,.7,.3,1)] min-[900px]:translate-x-0 ${
          navOpen ? "translate-x-0" : "-translate-x-[300px]"
        }`}
      >
        <div className="flex items-center gap-[11px] px-1 pb-5">
          <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-full border border-accent font-display text-[13px] font-bold tracking-[-0.02em] text-accent">
            FG
          </span>
          <span className="flex min-w-0 flex-col gap-[2px]">
            <span className="font-display text-[15px] font-bold tracking-[-0.01em]">
              {site.name}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-mut">
              {t.sidebarRole}
            </span>
          </span>
        </div>

        <nav className="flex flex-col gap-[2px]">
          {nav.map((item) => {
            const on = active === item.id;

            return (
              <a
                key={item.id}
                href={item.id === "top" ? "#" : `#${item.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  go(item.id);
                }}
                aria-current={on ? "true" : undefined}
                className={`flex items-center justify-between gap-3 rounded-[9px] px-3 py-[9px] text-[13.5px] font-medium transition-colors duration-200 ${
                  on ? "bg-accent text-ink" : "text-fg hover:bg-soft"
                }`}
              >
                <span>{item.label[lang]}</span>
                <span
                  className={`min-w-5 flex-none rounded-[5px] border px-[5px] py-[2px] text-center font-mono text-[10px] ${
                    on ? "border-black/30 text-ink" : "border-line text-mut"
                  }`}
                >
                  {item.key}
                </span>
              </a>
            );
          })}
        </nav>

        <div className="mx-1 mb-4 mt-5 h-px bg-[var(--line)]" />

        <p className="mb-2 ml-3 mt-0 font-mono text-[10px] uppercase tracking-[0.2em] text-mut">
          {t.onlineLabel}
        </p>

        <div className="flex flex-col gap-px pb-2">
          {social.map((item) => (
            <a
              key={item.label}
              href={item.href}
              download={item.download}
              target="_blank"
              rel="noopener noreferrer"
              title={item.value[lang]}
              className="flex items-center gap-[10px] rounded-[9px] px-3 py-2 text-[13px] text-fg transition-colors duration-200 hover:bg-soft"
            >
              <span className="flex h-[22px] w-[22px] flex-none items-center justify-center rounded-md border border-line font-mono text-[9px] text-mut">
                {item.mono}
              </span>
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
              <span aria-hidden className="flex-none text-xs text-mut">
                ↗
              </span>
            </a>
          ))}
        </div>
      </aside>
    </>
  );
}
