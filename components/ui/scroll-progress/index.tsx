"use client";

import { motion, useScroll } from "framer-motion";

/** Sayfanın üstündeki ince ilerleme çizgisi. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden
      className="fixed left-[var(--sb)] right-0 top-0 z-[60] h-[2px] w-auto origin-left bg-accent"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
