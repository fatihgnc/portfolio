import type { Metadata } from "next";

import HomePage from "@/components/pages/home";
import { messages, paths } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "tr",
  path: paths.home,
  title: { absolute: messages.tr.meta.title },
  ogTitle: messages.tr.meta.title,
  description: messages.tr.meta.description,
  ogDescription: messages.tr.meta.ogDescription,
  type: "profile",
});

export default function Page() {
  return <HomePage locale="tr" />;
}
