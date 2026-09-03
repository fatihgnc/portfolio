import type { Metadata } from "next";

import HomePage from "@/components/pages/home";
import { messages, paths } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: paths.home,
  title: { absolute: messages.en.meta.title },
  ogTitle: messages.en.meta.title,
  description: messages.en.meta.description,
  ogDescription: messages.en.meta.ogDescription,
  type: "profile",
});

export default function Page() {
  return <HomePage locale="en" />;
}
