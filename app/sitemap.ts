import type { MetadataRoute } from "next";

import { LOCALES, paths, projects, type Locale } from "@/content/site";
import { abs } from "@/lib/seo";

type Path = (locale: Locale) => string;

/** One entry per locale, each pointing at the other through `alternates`. */
function entries(path: Path, priority: number, lastModified: Date) {
  return LOCALES.map((locale) => ({
    url: abs(path(locale)),
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
    alternates: {
      languages: {
        en: abs(path("en")),
        tr: abs(path("tr")),
      },
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...entries(paths.home, 1, lastModified),
    ...projects.flatMap((p) =>
      entries((locale) => paths.project(locale, p.slug), 0.8, lastModified),
    ),
  ];
}
