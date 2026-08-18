"use client";

import { useSiteState } from "@/components/providers/site-state";
import { LANGS, type Lang } from "@/content/site";

function LangLink({ code }: { code: Lang }) {
  const { lang, setLang } = useSiteState();
  const active = lang === code;

  return (
    <button
      type="button"
      onClick={() => setLang(code)}
      aria-pressed={active}
      className={`cursor-pointer bg-transparent p-0 uppercase transition-colors ${
        active ? "text-accent" : "text-mut hover:text-fg"
      }`}
    >
      {code}
    </button>
  );
}

/** TR / EN geçişi. */
export default function LangSwitch() {
  return (
    <span className="flex items-baseline gap-2 font-mono text-[11px] tracking-[0.12em]">
      {LANGS.map((code, index) => (
        <span key={code} className="flex items-baseline gap-2">
          {index > 0 ? <span className="text-mut opacity-50">/</span> : null}
          <LangLink code={code} />
        </span>
      ))}
    </span>
  );
}
