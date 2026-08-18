import type { Config } from "tailwindcss";

/**
 * Sidebar açıkken tipografi viewport'a değil, içerik genişliğine göre ölçeklenir
 * (100vw - sidebar). Aksi hâlde büyük başlıklar içeriği taşırıyor.
 */
const CW = (factor: number, min: number, max: number) =>
  `clamp(${min}px, calc((100vw - var(--sb)) * ${factor}), ${max}px)`;

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        mut: "var(--mut)",
        card: "var(--card)",
        soft: "var(--soft)",
        veil: "var(--veil)",
        accent: "var(--ac)",
        ink: "#0c0c0e",
      },
      borderColor: {
        DEFAULT: "var(--line)",
        line: "var(--line)",
      },
      fontFamily: {
        display: ["var(--font-syne)", "Helvetica Neue", "sans-serif"],
        sans: ["var(--font-instrument)", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // tipografi ölçeği — tasarımdaki clamp() değerleri
        hero: [CW(0.152, 48, 250), { lineHeight: "0.84", letterSpacing: "-0.035em" }],
        "section-title": [CW(0.044, 26, 62), { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "project-title": [CW(0.054, 30, 82), { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "contact-title": [CW(0.08, 40, 118), { lineHeight: "0.92", letterSpacing: "-0.045em" }],
        "about-title": [CW(0.042, 28, 58), { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "job-title": [CW(0.032, 22, 46), { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        lead: ["clamp(17px, 1.7vw, 24px)", { lineHeight: "1.4" }],
        "hero-sub": ["clamp(16px, 1.5vw, 21px)", { lineHeight: "1.5" }],
        label: ["11px", { lineHeight: "1.4", letterSpacing: "0.2em" }],
        "label-sm": ["10.5px", { lineHeight: "1.4", letterSpacing: "0.18em" }],
      },
      spacing: {
        gut: "clamp(16px, 4vw, 44px)",
        band: "clamp(60px, 12vh, 130px)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        blink: {
          "0%,55%": { opacity: "1" },
          "56%,100%": { opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 34s linear infinite",
        blink: "blink 1.6s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
