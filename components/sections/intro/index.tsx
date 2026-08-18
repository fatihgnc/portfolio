"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { useSiteState } from "@/components/providers/site-state";
import TerminalCard from "@/components/ui/terminal-card";

/** Açılış: ortalanmış hero değil, aşağı hizalı kişisel bir giriş. */
export default function Intro() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useSiteState();
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const subY = useTransform(scrollYProgress, [0, 1], [0, 44]);
  const termY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section
      ref={ref}
      className="relative z-[1] flex min-h-[100svh] flex-col justify-end px-gut pb-[clamp(20px,4vh,40px)] pt-[120px]"
    >
      {/* durum penceresi üst kenarı tutar, isim alt kenarı */}
      <motion.div
        style={reduced ? undefined : { y: termY }}
        className="mb-auto flex justify-end"
      >
        <TerminalCard />
      </motion.div>

      {/* Türkçe özel ad: sayfa dili en olsa da "Fatih" → "FATİH" olsun */}
      <motion.h1
        lang="tr"
        style={reduced ? undefined : { y: titleY }}
        className="mt-[clamp(14px,3vh,34px)] max-w-full pb-[0.16em] font-display text-hero font-extrabold uppercase"
      >
        <span className="block">{t.heroL1}</span>
        <span className="block text-transparent transition-colors duration-300 [-webkit-text-stroke:2px_var(--fg)] hover:text-accent hover:[-webkit-text-stroke-color:var(--ac)]">
          {t.heroL2}
        </span>
      </motion.h1>

      <motion.div style={reduced ? undefined : { y: subY }}>
        <p className="m-0 mt-[clamp(10px,1.5vh,18px)] font-mono text-[13px] uppercase tracking-[0.22em] text-accent">
          {t.alias}
        </p>

        <div className="mt-[clamp(20px,4vh,44px)] flex flex-wrap items-end justify-between gap-x-12 gap-y-6 border-t border-line pt-[22px]">
          <p className="m-0 max-w-[46ch] flex-[1_1_320px] text-hero-sub [text-wrap:pretty]">
            {t.heroSub}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
