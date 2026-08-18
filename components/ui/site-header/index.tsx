"use client";

import { useSiteState } from "@/components/providers/site-state";
import { site } from "@/content/site";

/**
 * Yalnızca dar ekranda görünen üst şerit: isim + çekmece düğmesi.
 * Geniş ekranda kimlik, gezinme ve kontroller sidebar'da.
 */
export default function SiteHeader() {
  const { t, setNavOpen } = useSiteState();

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 border-b border-line bg-veil px-4 py-3 font-mono text-label uppercase text-fg backdrop-blur-[14px] min-[900px]:hidden">
      <span className="whitespace-nowrap font-medium">{site.name}</span>

      <button
        type="button"
        onClick={() => setNavOpen(true)}
        aria-label={t.menuLabel}
        title={t.menuLabel}
        className="flex cursor-pointer flex-col gap-1 rounded-lg border border-line bg-transparent px-[10px] py-[9px]"
      >
        <span aria-hidden className="block h-[1.5px] w-4 bg-fg" />
        <span aria-hidden className="block h-[1.5px] w-4 bg-fg" />
      </button>
    </header>
  );
}
