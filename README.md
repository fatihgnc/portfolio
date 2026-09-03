# portfolio

Fatih Genç's personal portfolio: a home page plus one page per project, in
English and Turkish, with a left sidebar and dark and light themes. A Next.js
implementation of the Claude Design layout (`Portfolio.dc.html`).

Every page is statically prerendered in one language. English lives at the root
(`/`, `/projects/<slug>`) and Turkish under `/tr` (`/tr`, `/tr/projeler/<slug>`),
so `lang`, the copy and the metadata are all correct in the served HTML.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, static) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui (base-nova style, Base UI) + design tokens in `app/globals.css` |
| Icons | Tabler Icons |
| Analytics | Vercel Analytics |
| Font | Bricolage Grotesque via next/font (opsz / wdth / wght axes) |

No backend; the site is fully static.

## Scripts

```bash
npm run dev        # development server
npm run build      # production build
npm start          # production server
npm run typecheck  # tsc --noEmit
```

## Structure

Two root layouts, one per locale, each rendering the same shell with its own
`lang`. Only the sidebar, the gallery and the copy button are client components;
everything else renders on the server.

```
app/
  (en)/layout.tsx              -> <html lang="en">, English metadata defaults
  (en)/page.tsx                -> /
  (en)/projects/[slug]/        -> /projects/<slug> (+ opengraph-image)
  (en)/opengraph-image.tsx     -> the home OG card
  (tr)/layout.tsx              -> <html lang="tr">, Turkish metadata defaults
  (tr)/tr/page.tsx             -> /tr
  (tr)/tr/projeler/[slug]/     -> /tr/projeler/<slug> (+ opengraph-image)
  robots.ts, sitemap.ts        -> /robots.txt, /sitemap.xml
  globals.css                  -> tokens and all styles
content/
  site.ts               -> all copy (en/tr), projects, experience, identity,
                           the URL shape (`paths`) and SITE_URL
lib/
  seo.ts                -> canonical + hreflang, page metadata, JSON-LD graphs
  og.tsx                -> the shared open-graph card
components/
  root-shell.tsx        -> <html>/<body>, font, theme boot script, provider
  json-ld.tsx           -> renders a JSON-LD graph into the page
  pages/                -> the home and project page bodies (server)
  sections/             -> hero, projects, experience, contact (server)
  providers/theme/      -> theme state (localStorage); the locale is the URL
  ui/sidebar/           -> profile, section menu (1-4 shortcuts), social links,
                           TR | EN links and theme switch (client)
  ui/project-gallery/   -> project screenshots: thumbnail strip + Dialog lightbox
  ui/copy-email/        -> copy-to-clipboard button for the e-mail address
  ui/*.tsx              -> shadcn/ui primitives (button, switch, sheet, dialog,
                           avatar, badge, separator, tooltip)
public/
  shots/<project>/N.webp -> project screenshots (1600px WebP)
  fatih-genc-cv.pdf     -> CV, opened in a new tab from the sidebar
  profile.jpg           -> sidebar avatar
```

## SEO

- **Origin:** `SITE_URL` in `content/site.ts` (`https://fatihgenc.dev`). Every
  canonical, hreflang, sitemap and OG URL is derived from it.
- **Canonical + hreflang:** built by `pageMetadata()` in `lib/seo.ts`; each page
  points at its counterpart in the other locale, with English as `x-default`.
- **Structured data:** `homeJsonLd()` emits `WebSite` + `Person` + `ProfilePage`
  + `ItemList`; `projectJsonLd()` emits the project as a
  `MobileApplication` / `WebApplication` / `WebSite` plus `BreadcrumbList`. The
  per-project schema type lives in the `SCHEMA` map in `lib/seo.ts`.
- **Open graph images:** generated at build time from `lib/og.tsx`, one per page
  per locale, 1200x630.
- **robots.txt** disallows the CV PDF so it does not compete with the site in
  search results; the sidebar link to it is `nofollow` for the same reason.
- **Deploy:** point the apex domain at the app and redirect `www` to it, so the
  canonical origin is the only one serving content.

## Updating content

- **Copy:** `content/site.ts` -> `messages.en` / `messages.tr`.
- **Projects:** `content/site.ts` -> `projects`. `slug` is the URL segment of the
  project page, `tagline` its one-line summary (the meta description and the OG
  card subtitle); both, like `description`, are bilingual. The `shots` array
  holds the screenshots (`src`, `width`, `height`, `portrait`, bilingual `alt`,
  which is the real image `alt` and matters for image search). To add one, drop a
  WebP under `public/shots/<project>/` and append it to `shots`. A new project
  also needs an entry in the `SCHEMA` map in `lib/seo.ts`; changing a `slug`
  changes a live URL, so leave a redirect behind if the page has been indexed.
- **Experience:** `content/site.ts` -> `experience.en` / `experience.tr`. Leave
  `end` empty for an ongoing entry ("Present" / "Halen").
- **Links, e-mail, phone:** `content/site.ts` -> `identity`.
- **CV:** `public/fatih-genc-cv.pdf`.
- **Colours:** the `:root` / `:root[data-theme="light"]` tokens in
  `app/globals.css`, named after shadcn (`--background`, `--primary`,
  `--muted-foreground`, ...).
- **New shadcn component:** `npx shadcn@latest add <name>`.
