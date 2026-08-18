"use client";

import { useSiteState } from "@/components/providers/site-state";
import Reveal from "@/components/ui/reveal-text";
import { site } from "@/content/site";

/** Kısa, samimi hakkımda — stack ayrı bir grid değil, metnin devamı. */
export default function About() {
  const { lang, t } = useSiteState();
  const tools = site.tools[lang];

  return (
    <section
      id="about"
      className="relative z-[1] border-t border-line px-gut py-band"
    >
      <Reveal>
        <p className="mb-[clamp(20px,4vh,40px)] mt-0 font-mono text-label uppercase text-accent">
          {t.aboutLabel}
        </p>

        <div className="grid grid-cols-1 gap-[clamp(26px,5vw,80px)] min-[900px]:grid-cols-[1fr_1.15fr]">
          <h2 className="m-0 font-display text-[clamp(30px,4.2vw,58px)] font-bold leading-[1.02] tracking-[-0.03em] [text-wrap:pretty]">
            {t.aboutTitle}
          </h2>

          <div className="min-w-0">
            <div className="grid max-w-[58ch] gap-4">
              {t.aboutParas.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="m-0 text-[clamp(15px,1.15vw,17px)] leading-[1.7] text-mut [text-wrap:pretty]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-[clamp(28px,5vh,46px)] grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-x-8 gap-y-5 border-t border-line pt-5">
              {tools.map((group) => (
                <div key={group.label} className="min-w-0">
                  <p className="mb-[6px] mt-0 font-mono text-label-sm uppercase text-accent">
                    {group.label}
                  </p>
                  <p className="m-0 font-mono text-[12.5px] leading-[1.85]">
                    {group.items}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
