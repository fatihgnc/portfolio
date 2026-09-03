# portfolio

Fatih Genç's personal portfolio. A single page with a left sidebar, English and
Turkish copy, dark and light themes. A Next.js implementation of the Claude
Design layout (`Portfolio.dc.html`).

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

```
app/
  layout.tsx            -> font, metadata, theme/locale boot script, provider
  page.tsx              -> the page: hero + about, projects, experience, contact
  globals.css           -> tokens and all styles
content/
  site.ts               -> all copy (en/tr), projects, experience, identity
components/
  providers/site-state/ -> theme + locale state (localStorage)
  ui/sidebar/           -> profile, section menu (1-4 shortcuts), social links,
                           TR | EN picker and theme switch
  ui/project-gallery/   -> project screenshots: thumbnail strip + Dialog lightbox
  ui/copy-email/        -> copy-to-clipboard button for the e-mail address
  ui/*.tsx              -> shadcn/ui primitives (button, switch, sheet, dialog,
                           avatar, badge, separator, tooltip)
public/
  shots/<project>/N.webp -> project screenshots (1600px WebP)
  fatih-genc-cv.pdf     -> CV, opened in a new tab from the sidebar
  profile.jpg           -> sidebar avatar
```

## Updating content

- **Copy:** `content/site.ts` -> `messages.en` / `messages.tr`.
- **Projects:** `content/site.ts` -> `projects`. Descriptions are bilingual; the
  `shots` array holds the screenshots (`src`, `width`, `height`, `portrait`,
  bilingual `alt`). To add one, drop a WebP under `public/shots/<project>/` and
  append it to `shots`.
- **Experience:** `content/site.ts` -> `experience.en` / `experience.tr`. Leave
  `end` empty for an ongoing entry ("Present" / "Halen").
- **Links, e-mail, phone:** `content/site.ts` -> `identity`.
- **CV:** `public/fatih-genc-cv.pdf`.
- **Colours:** the `:root` / `:root[data-theme="light"]` tokens in
  `app/globals.css`, named after shadcn (`--background`, `--primary`,
  `--muted-foreground`, ...).
- **New shadcn component:** `npx shadcn@latest add <name>`.
