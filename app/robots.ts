import type { MetadataRoute } from "next";

import { identity, SITE_URL } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The CV is a download, not a page: keeping it out of the index stops
        // it from competing with the site for searches on my name.
        disallow: [`/${identity.cvFile}`],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
