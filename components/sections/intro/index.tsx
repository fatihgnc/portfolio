"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { useSiteState } from "@/components/providers/site-state";

function useIstanbulClock() {
  const [clock, setClock] = useState("");

  useEffect(() => {
    const read = () =>
      setClock(
        new Date().toLocaleTimeString("tr-TR", {
          timeZone: "Europe/Istanbul",
          hour: "2-digit",
          minute: "2-digit",
        }),
      );

    read();
    const id = setInterval(read, 30_000);
    return () => clearInterval(id);
  }, []);

  return clock;
}

/** Açılış: ortalanmış hero değil, aşağı hizalı kişisel bir giriş. */
export default function Intro() {
  const ref = useRef<HTMLElement>(null);
  const clock = useIstanbulClock();
  const { t } = useSiteState();
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const subY = useTransform(scrollYProgress, [0, 1], [0, 44]);

  return (
    <section
      ref={ref}
      className="relative z-[1] flex min-h-[100svh] flex-col justify-end px-gut pb-[clamp(20px,4vh,40px)] pt-[120px]"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
        <p className="m-0 font-mono text-label uppercase text-accent">
          {t.kicker}
        </p>
        <p className="m-0 font-mono text-label uppercase text-mut">
          {clock}
          <span className="animate-blink text-accent">_</span>
        </p>
      </div>

      <motion.h1
        style={reduced ? undefined : { y: titleY }}
        className="mt-[clamp(14px,3vh,34px)] max-w-full pb-[0.16em] font-display text-hero font-extrabold uppercase"
      >
        <span className="block">{t.heroL1}</span>
        <span className="block text-transparent transition-colors duration-300 [-webkit-text-stroke:2px_var(--fg)] hover:text-accent hover:[-webkit-text-stroke-color:var(--ac)]">
          {t.heroL2}
        </span>
      </motion.h1>

      <motion.div
        style={reduced ? undefined : { y: subY }}
        className="mt-[clamp(24px,5vh,52px)] flex flex-wrap items-end justify-between gap-x-12 gap-y-6 border-t border-line pt-[22px]"
      >
        <p className="m-0 max-w-[46ch] flex-[1_1_320px] text-hero-sub [text-wrap:pretty]">
          {t.heroSub}
        </p>
        <ul className="m-0 grid flex-[0_1_340px] list-none gap-[7px] p-0">
          {t.status.map((item) => (
            <li
              key={item.k}
              className="flex justify-between gap-[18px] font-mono text-xs text-mut"
            >
              <span className="text-fg">{item.k}</span>
              <span>{item.v}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
