import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { SiteStateProvider } from "@/components/providers/site-state";
import { identity } from "@/content/site";

import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  axes: ["opsz", "wdth"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${identity.name} — Frontend Developer`,
  description:
    "Frontend developer building production frontends with React, Next.js and TypeScript. Four live products: secretmap.dev, acikeczanevarmi.com, kesintimivar.com, mevzuatkibris.com.",
  metadataBase: new URL("https://fatihgnc.dev"),
  openGraph: {
    title: `${identity.name} — Frontend Developer`,
    description:
      "Frontend developer building production frontends with React, Next.js and TypeScript. Four live products.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f141a" },
    { media: "(prefers-color-scheme: light)", color: "#f9f9f8" },
  ],
};

/** Applies the stored theme and locale before first paint to avoid a flash. */
const bootScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem("pf-theme");if(t==="light"||t==="dark"){d.dataset.theme=t;d.style.colorScheme=t;}var l=localStorage.getItem("pf-locale");if(l==="en"||l==="tr"){d.lang=l;}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={bricolage.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <SiteStateProvider>{children}</SiteStateProvider>
        <Analytics />
      </body>
    </html>
  );
}
