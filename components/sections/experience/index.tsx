"use client";

import { useSiteState } from "@/components/providers/site-state";
import Reveal from "@/components/ui/reveal-text";

/** Deneyim: dört masa, tek meslek — tarih sütunu solda, iş sağda. */
export default function Experience() {
  const { t } = useSiteState();

  return (
    <section
      id="experience"
      className="relative z-[1] border-t border-line px-gut py-band"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4 border-b border-line pb-5">
        <div className="min-w-0">
          <p className="mb-[14px] mt-0 font-mono text-label uppercase text-accent">
            {t.expLabel}
          </p>
          <h2 className="m-0 max-w-[22ch] font-display text-section-title font-bold [text-wrap:pretty]">
            {t.expTitle}
          </h2>
        </div>
        <span className="font-mono text-label uppercase text-mut">
          {t.expNote}
        </span>
      </div>

      <Reveal>
        {t.jobs.map((job) => (
          <div
            key={`${job.co}-${job.when}`}
            className="grid grid-cols-1 gap-x-[clamp(24px,5vw,72px)] gap-y-[10px] border-b border-line py-[clamp(26px,4.5vh,44px)] min-[900px]:grid-cols-[minmax(180px,240px)_1fr]"
          >
            <div className="flex min-w-0 flex-col gap-[6px]">
              <span className="font-mono text-[11.5px] tracking-[0.12em] text-accent">
                {job.when}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-mut">
                {job.role}
              </span>
            </div>

            <div className="min-w-0">
              <h3 className="m-0 font-display text-job-title font-bold [overflow-wrap:break-word]">
                {job.co}
              </h3>
              <p className="mt-3 max-w-[46ch] text-[clamp(15px,1.3vw,19px)] leading-[1.5] [text-wrap:pretty]">
                {job.one}
              </p>
              <p className="mt-2 max-w-[52ch] text-[14.5px] leading-[1.6] text-mut [text-wrap:pretty]">
                {job.note}
              </p>
              <div className="mt-4 flex flex-wrap gap-[7px]">
                {job.stack.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-line px-[11px] py-1 font-mono text-[11px] text-mut"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
