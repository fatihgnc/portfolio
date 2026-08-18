"use client";

import { useCallback, useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import Image from "next/image";

import { useSiteState } from "@/components/providers/site-state";
import Reveal from "@/components/ui/reveal-text";
import type { ProjectMeta } from "@/lib/mdx";

/** Sunucuda hazırlanan case study verisi: meta + render edilmiş MDX gövdesi. */
export type ProjectCaseData = {
  slug: string;
  meta: ProjectMeta;
  body: ReactNode;
};

type ProjectCaseProps = {
  data: ProjectCaseData;
  index: number;
  /** son kartın altında çizgi yok */
  last?: boolean;
};

const TILT = ["-1.4deg", "1.4deg", "-1deg"];

/** MDX içeriğini tasarımdaki case study düzeninde render eder. */
export default function ProjectCase({
  data,
  index,
  last = false,
}: ProjectCaseProps) {
  const { t } = useSiteState();
  const content = data.meta;
  const flipped = index % 2 === 1;
  const tilt = TILT[index % TILT.length];
  const shotRef = useRef<HTMLDivElement>(null);

  // imleci takip eden 3B eğim — dar ekranda ve reduced motion'da kapalı
  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const el = shotRef.current;
      if (!el) return;
      if (
        window.innerWidth < 900 ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const r = el.getBoundingClientRect();
      const px = (event.clientX - r.left) / r.width - 0.5;
      const py = (event.clientY - r.top) / r.height - 0.5;

      el.style.transition = "transform .12s linear, border-color .4s ease";
      el.style.transform =
        `perspective(900px) rotate(${tilt}) rotateY(${(px * 11).toFixed(2)}deg)` +
        ` rotateX(${(-py * 8).toFixed(2)}deg) translateZ(14px)`;
    },
    [tilt],
  );

  const onPointerLeave = useCallback(() => {
    const el = shotRef.current;
    if (!el) return;
    el.style.transition =
      "transform .55s cubic-bezier(.2,.7,.3,1), border-color .4s ease";
    el.style.transform = "";
  }, []);

  return (
    <Reveal>
      <article
        className={`grid grid-cols-1 items-center gap-[clamp(22px,4vw,64px)] py-[clamp(38px,7vh,84px)] min-[900px]:grid-cols-[1.05fr_1fr] ${
          last ? "" : "border-b border-line"
        }`}
      >
        <div className={`min-w-0 ${flipped ? "min-[900px]:order-2" : ""}`}>
          <div className="flex items-baseline gap-4 font-mono text-label-sm uppercase text-mut">
            <span className="text-accent">{content.order}</span>
            <span>{content.meta}</span>
          </div>

          <h3 className="mt-[10px] font-display text-project-title font-extrabold [overflow-wrap:break-word]">
            {content.title}
          </h3>

          <p className="mt-4 max-w-[30ch] text-lead [text-wrap:pretty]">
            {content.one}
          </p>

          <div className="mt-3">{data.body}</div>

          <div className="mt-5 flex flex-wrap gap-[7px]">
            {content.stack.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-line px-[11px] py-1 font-mono text-[11px] text-mut"
              >
                {tool}
              </span>
            ))}
          </div>

          <a
            href={content.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-[10px] rounded-full border border-accent px-5 py-[11px] font-mono text-xs uppercase tracking-[0.1em] transition-[background-color,color,gap] duration-[250ms] hover:gap-5 hover:bg-accent hover:text-ink"
          >
            {content.link} <span aria-hidden>↗</span>
          </a>
        </div>

        <div
          ref={shotRef}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          className={`relative flex aspect-[4/3] min-w-0 items-end overflow-hidden rounded-md border border-line bg-card p-4 [transform-style:preserve-3d] transition-[transform,border-color] duration-[400ms] ease-[cubic-bezier(.2,.7,.3,1)] [transform:rotate(var(--tilt))] hover:border-accent ${
            flipped ? "min-[900px]:order-1" : ""
          }`}
          style={
            {
              "--tilt": tilt,
              backgroundImage:
                "repeating-linear-gradient(118deg, var(--soft) 0 1px, transparent 1px 11px)",
            } as CSSProperties
          }
        >
          {content.image ? (
            <Image
              src={content.image}
              alt={`${content.title} — ${content.shot}`}
              fill
              sizes="(min-width: 900px) 45vw, 92vw"
              className="object-cover"
            />
          ) : (
            <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-mut">
              {content.shot} — {t.shotHint}
            </span>
          )}
        </div>
      </article>
    </Reveal>
  );
}
