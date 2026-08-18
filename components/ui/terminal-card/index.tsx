"use client";

import { useSiteState } from "@/components/providers/site-state";

/**
 * Durum listesini terminal penceresi gibi gösterir. İçerik gerçek:
 * satırlar content/site.ts içindeki status dizisinden gelir.
 */
export default function TerminalCard({ className }: { className?: string }) {
  const { t } = useSiteState();

  return (
    <div
      className={`w-[min(420px,100%)] overflow-hidden rounded-lg border border-line bg-card/80 font-mono text-[12.5px] backdrop-blur-[6px] ${
        className ?? ""
      }`}
    >
      <div className="flex items-center gap-[7px] border-b border-line px-3 py-[9px]">
        <span aria-hidden className="h-[9px] w-[9px] rounded-full bg-accent" />
        <span
          aria-hidden
          className="h-[9px] w-[9px] rounded-full border border-line"
        />
        <span
          aria-hidden
          className="h-[9px] w-[9px] rounded-full border border-line"
        />
        <span className="ml-1 text-[10px] uppercase tracking-[0.18em] text-mut">
          status
        </span>
      </div>

      <div className="grid gap-[6px] px-3 py-3">
        <p className="m-0 text-mut">
          <span className="text-accent">$</span> status
        </p>

        {t.status.map((row) => (
          <p key={row.k} className="m-0 flex justify-between gap-5">
            <span>{row.k}</span>
            <span className="text-mut">{row.v}</span>
          </p>
        ))}

        <p className="m-0 text-mut">
          <span className="text-accent">$</span>{" "}
          <span className="animate-blink text-accent">_</span>
        </p>
      </div>
    </div>
  );
}
