import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Bricolage_Grotesque } from "next/font/google";

import { ThemeProvider } from "@/components/providers/theme";
import type { Locale } from "@/content/site";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  axes: ["opsz", "wdth"],
  variable: "--font-bricolage",
  display: "swap",
});

/** Applies the stored theme before first paint to avoid a flash. */
const bootScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem("pf-theme");if(t==="light"||t==="dark"){d.dataset.theme=t;d.style.colorScheme=t;}}catch(e){}})();`;

/**
 * The shared document for both locale trees. `lang` is baked in per tree so it
 * is correct in the served HTML rather than patched after hydration.
 */
export default function RootShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <html
      lang={locale}
      data-theme="light"
      // globals.css sets scroll-behavior: smooth; without this Next 16 would
      // animate the scroll on every route change instead of jumping to the top.
      data-scroll-behavior="smooth"
      className={bricolage.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        {/* Analytics counts visits; Speed Insights reports the Core Web
            Vitals real visitors actually experience. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
