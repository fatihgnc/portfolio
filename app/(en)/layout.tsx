import type { Metadata, Viewport } from "next";

import RootShell from "@/components/root-shell";
import { identity, messages, SITE_URL } from "@/content/site";

import "../globals.css";

/**
 * The English tree is one of two root layouts, one per locale, so that `lang`
 * is part of the statically rendered HTML.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: messages.en.meta.title,
    template: `%s — ${identity.name}`,
  },
  description: messages.en.meta.description,
  applicationName: identity.name,
  authors: [{ name: identity.name, url: SITE_URL }],
  creator: identity.name,
  publisher: identity.name,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f141a" },
    { media: "(prefers-color-scheme: light)", color: "#f9f9f8" },
  ],
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
