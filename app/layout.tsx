import type { Metadata, Viewport } from "next";
import { Instrument_Sans, JetBrains_Mono, Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { SiteStateProvider } from "@/components/providers/site-state";
import { site } from "@/content/site";

import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-instrument",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — frontend / indie developer`,
  description:
    "Four years of frontend, one year of my own products. SecretMap, mamamix and secretmap.dev — Istanbul.",
  metadataBase: new URL("https://fatihgnc.dev"),
  openGraph: {
    title: `${site.name} — frontend / indie developer`,
    description:
      "Four years of frontend, one year of my own products. SecretMap, mamamix and secretmap.dev.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c0c0e",
};

/** İlk boyamadan önce kayıtlı temayı uygular — tema zıplaması olmasın. */
const themeScript = `(function(){try{var t=localStorage.getItem("pf-theme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t;}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${syne.variable} ${instrument.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          {/* JS kapalıysa scroll reveal'lar açık kalsın */}
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className="font-sans">
        <SiteStateProvider>{children}</SiteStateProvider>
        <Analytics />
      </body>
    </html>
  );
}
