"use client";

import { useSiteState } from "@/components/providers/site-state";
import Reveal from "@/components/ui/reveal-text";

/** İki proje arasında nefes alma noktası — neden indie? */
export default function Interlude() {
  const { t } = useSiteState();

  return (
    <Reveal>
      <div className="grid grid-cols-1 gap-[clamp(18px,4vw,64px)] border-b border-line py-[clamp(38px,7vh,84px)] min-[900px]:grid-cols-[1.05fr_1fr]">
        <p className="m-0 font-mono text-label uppercase text-accent">
          {t.interludeLabel}
        </p>
        <div className="min-w-0">
          <p className="m-0 max-w-[34ch] font-display text-[clamp(24px,3.2vw,42px)] font-bold leading-[1.1] tracking-[-0.02em] [text-wrap:pretty]">
            {t.interlude}
          </p>
          <p className="mt-4 max-w-[48ch] text-[15px] leading-[1.7] text-mut [text-wrap:pretty]">
            {t.interludeSub}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
