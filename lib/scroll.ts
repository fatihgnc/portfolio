import type Lenis from "lenis";

let instance: Lenis | null = null;

/** SmoothScroll bileşeni Lenis örneğini buraya bırakır. */
export function setLenis(next: Lenis | null) {
  instance = next;
}

/**
 * Bölüme yumuşak kaydırır. Lenis çalışıyorsa onun üzerinden gider,
 * yoksa (reduced motion, dar ekran) native scroll'a düşer.
 */
export function scrollToSection(id: string, offset = 0) {
  if (id === "top") {
    if (instance) instance.scrollTo(0, { duration: 0.9 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  if (instance) {
    instance.scrollTo(el, { offset, duration: 0.9 });
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: "smooth" });
}
