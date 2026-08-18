import type { Config } from "tailwindcss";

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
        hero: ["clamp(58px, 15.5vw, 250px)", { lineHeight: "0.84", letterSpacing: "-0.035em" }],
        "section-title": ["clamp(28px, 4.4vw, 62px)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "project-title": ["clamp(34px, 5.4vw, 82px)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "contact-title": ["clamp(44px, 8vw, 118px)", { lineHeight: "0.92", letterSpacing: "-0.045em" }],
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
