"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** kaç piksel aşağıdan gelsin */
  distance?: number;
};

/** Scroll ile bir kez tetiklenen açılış animasyonu. */
export default function Reveal({
  children,
  className,
  delay = 0,
  distance = 28,
}: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      data-reveal
      className={className}
      initial={reduced ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.75, delay, ease: [0.2, 0.7, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
