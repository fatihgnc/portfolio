import type { Metadata } from "next";

import {
  identity,
  messages,
  paths,
  projectHref,
  projects,
  SITE_URL,
  stackList,
  type Locale,
  type Project,
} from "@/content/site";

export const OG_LOCALE: Record<Locale, string> = { en: "en_US", tr: "tr_TR" };
const ALT_LOCALE: Record<Locale, Locale> = { en: "tr", tr: "en" };

export function otherLocale(locale: Locale): Locale {
  return ALT_LOCALE[locale];
}

/** Relative path -> absolute URL on the canonical origin. */
export function abs(path: string): string {
  return new URL(path, SITE_URL).toString();
}

/** A page that exists in both locales: its canonical plus the hreflang set. */
function alternates(locale: Locale, path: (l: Locale) => string): Metadata["alternates"] {
  return {
    canonical: abs(path(locale)),
    languages: {
      en: abs(path("en")),
      tr: abs(path("tr")),
      "x-default": abs(path("en")),
    },
  };
}

type PageMetaArgs = {
  locale: Locale;
  path: (l: Locale) => string;
  /** may be a template-relative string; the layout appends the site name */
  title: Metadata["title"];
  /** the full title, for og:title and twitter:title */
  ogTitle: string;
  description: string;
  ogDescription?: string;
  type?: "profile" | "article" | "website";
};

export function pageMetadata({
  locale,
  path,
  title,
  ogTitle,
  description,
  ogDescription,
  type = "website",
}: PageMetaArgs): Metadata {
  const url = abs(path(locale));
  return {
    title,
    description,
    alternates: alternates(locale, path),
    openGraph: {
      type,
      url,
      siteName: identity.name,
      title: ogTitle,
      description: ogDescription ?? description,
      locale: OG_LOCALE[locale],
      alternateLocale: OG_LOCALE[otherLocale(locale)],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription ?? description,
    },
  };
}

/* ---------------------------------------------------------------- JSON-LD */

const PERSON_ID = `${SITE_URL}/#person`;
const SITE_ID = `${SITE_URL}/#website`;

/** How each project should be typed for search engines. */
const SCHEMA: Record<string, { type: string; category?: string; os?: string }> = {
  "secretmap-ios": {
    type: "MobileApplication",
    category: "SocialNetworkingApplication",
    os: "iOS",
  },
  secretmap: { type: "WebSite" },
  "acik-eczane-var-mi": {
    type: "WebApplication",
    category: "HealthApplication",
    os: "Web browser",
  },
  "kesinti-mi-var": {
    type: "WebApplication",
    category: "UtilitiesApplication",
    os: "Web browser",
  },
  "mevzuat-kibris": {
    type: "WebApplication",
    category: "ReferenceApplication",
    os: "Web browser",
  },
};

function person(locale: Locale) {
  const t = messages[locale];
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: identity.name,
    givenName: identity.givenName,
    familyName: identity.familyName,
    jobTitle: t.hero.role,
    description: t.hero.positioning,
    url: abs(paths.home(locale)),
    image: abs(identity.photo),
    email: `mailto:${identity.email}`,
    telephone: identity.phoneE164,
    address: {
      "@type": "PostalAddress",
      addressLocality: identity.locality,
      addressCountry: identity.country,
    },
    alumniOf: { "@type": "CollegeOrUniversity", name: identity.university },
    knowsAbout: stackList(t.about.stack),
    knowsLanguage: ["tr", "en"],
    sameAs: [identity.github, identity.linkedin, ...projects.map(projectHref)],
  };
}

function website(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE_URL,
    name: messages[locale].meta.title,
    description: messages[locale].meta.description,
    inLanguage: locale,
    publisher: { "@id": PERSON_ID },
  };
}

export function homeJsonLd(locale: Locale) {
  const t = messages[locale];
  const url = abs(paths.home(locale));
  return {
    "@context": "https://schema.org",
    "@graph": [
      website(locale),
      person(locale),
      {
        "@type": "ProfilePage",
        "@id": `${url}#page`,
        url,
        name: t.meta.title,
        description: t.meta.description,
        inLanguage: locale,
        isPartOf: { "@id": SITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": PERSON_ID },
        primaryImageOfPage: abs(identity.photo),
      },
      {
        "@type": "ItemList",
        "@id": `${url}#projects`,
        name: t.projects.h,
        numberOfItems: projects.length,
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.name,
          description: p.tagline[locale],
          url: abs(paths.project(locale, p.slug)),
        })),
      },
    ],
  };
}

export function projectJsonLd(p: Project, locale: Locale) {
  const t = messages[locale];
  const url = abs(paths.project(locale, p.slug));
  const schema = SCHEMA[p.slug] ?? { type: "WebSite" };

  const work: Record<string, unknown> = {
    "@type": schema.type,
    "@id": `${url}#project`,
    name: p.name,
    headline: p.name,
    abstract: p.tagline[locale],
    description: p.description[locale],
    url: projectHref(p),
    inLanguage: locale,
    author: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
    keywords: stackList(p.stack).join(", "),
    screenshot: p.shots.map((s) => abs(s.src)),
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
  if (schema.category) work.applicationCategory = schema.category;
  if (schema.os) work.operatingSystem = schema.os;

  return {
    "@context": "https://schema.org",
    "@graph": [
      website(locale),
      person(locale),
      work,
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: `${p.name} — ${t.meta.projectTitleTail}`,
        description: p.tagline[locale],
        inLanguage: locale,
        isPartOf: { "@id": SITE_ID },
        about: { "@id": `${url}#project` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: t.project.home,
            item: abs(paths.home(locale)),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: t.projects.h,
            item: abs(paths.section(locale, "projects")),
          },
          { "@type": "ListItem", position: 3, name: p.name, item: url },
        ],
      },
    ],
  };
}
