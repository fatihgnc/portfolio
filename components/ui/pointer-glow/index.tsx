"use client";

import { useEffect } from "react";

/** İmleci takip eden yumuşak accent parıltısı. */
export default function PointerGlow() {
  useEffect(() => {
    const root = document.documentElement;

    const onMove = (event: PointerEvent) => {
      root.style.setProperty(
        "--mx",
        `${((event.clientX / window.innerWidth) * 100).toFixed(2)}%`,
      );
      root.style.setProperty(
        "--my",
        `${((event.clientY / window.innerHeight) * 100).toFixed(2)}%`,
      );
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 blur-[18px] transition-opacity duration-500"
      style={{
        opacity: "var(--glow)",
        background:
          "radial-gradient(520px circle at var(--mx) var(--my), var(--ac), transparent 68%)",
      }}
    />
  );
}
