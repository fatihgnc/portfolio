"use client";

import { useSiteState } from "@/components/providers/site-state";

/** Koyu / açık tema anahtarı. */
export default function ThemeToggle() {
  const { t, theme, toggleTheme } = useSiteState();
  const dark = theme === "dark";
  const label = dark ? t.themeToLight : t.themeToDark;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={label}
      aria-label={label}
      className="relative flex h-7 w-[58px] flex-none cursor-pointer items-center rounded-full border border-line bg-soft p-0 transition-colors hover:border-accent"
    >
      <span
        className="absolute left-[2px] top-[2px] h-[22px] w-[22px] rounded-full bg-accent transition-transform duration-[340ms] ease-[cubic-bezier(.3,1.5,.5,1)]"
        style={{ transform: `translateX(${dark ? 30 : 0}px)` }}
      />
      <span
        className={`relative z-[2] flex w-7 items-center justify-center transition-colors ${
          dark ? "text-mut" : "text-ink"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="h-[13px] w-[13px] fill-none stroke-current [stroke-linecap:round] [stroke-width:2]"
        >
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 1.6v2.2M12 20.2v2.2M4.4 4.4l1.6 1.6M18 18l1.6 1.6M1.6 12h2.2M20.2 12h2.2M4.4 19.6l1.6-1.6M18 6l1.6-1.6" />
        </svg>
      </span>
      <span
        className={`relative z-[2] flex w-7 items-center justify-center transition-colors ${
          dark ? "text-ink" : "text-mut"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="h-[13px] w-[13px] fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2]"
        >
          <path d="M20.8 13.4A8.6 8.6 0 1 1 10.6 3.2a6.7 6.7 0 0 0 10.2 10.2z" />
        </svg>
      </span>
    </button>
  );
}
