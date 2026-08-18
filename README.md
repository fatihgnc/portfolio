# portfolio

Fatih Genç — kişisel portfolyo. Tek sayfa, iki dil (TR/EN), koyu/açık tema.
Claude Design'daki onaylanmış tasarımın (`Portfolyo-Gunluk.dc.html`) Next.js
implementasyonu.

## Stack

| Katman | Teknoloji |
|---|---|
| Framework | Next.js 15 (App Router, SSG) |
| Dil | TypeScript |
| Styling | Tailwind CSS + CSS custom property token'ları |
| Animasyon | Framer Motion (scroll reveal + parallax) |
| Scroll | Lenis |
| İçerik | next-mdx-remote (RSC) + gray-matter |
| Analytics | Vercel Analytics |
| Font | Syne / Instrument Sans / JetBrains Mono (next/font) |

Backend yok — statik site.

## Komutlar

```bash
npm run dev        # geliştirme sunucusu
npm run build      # prod build (statik export edilir)
npm start          # prod sunucu
npm run typecheck  # tsc --noEmit
```

## Yapı

```
app/
  layout.tsx            → fontlar, metadata, tema önyükleme scripti, provider
  page.tsx              → tek sayfa akışı; MDX gövdeleri sunucuda render edilir
  globals.css           → tema token'ları, grain, MDX tipografisi
content/
  site.ts               → arayüz metinleri, linkler, araçlar (tr/en)
  projects/
    secret-map.{tr,en}.mdx
    mamamix.{tr,en}.mdx
    secretmap-dev.{tr,en}.mdx
components/
  providers/site-state/ → dil + tema durumu (localStorage)
  sections/
    intro/              → açılış (parallax başlık, İstanbul saati, durum listesi)
    work/               → işler akışı, ara not araya girer
    experience/         → deneyim listesi (tarih sütunu + iş)
    project-case/       → MDX case study kartı
    interlude/          → "neden indie" ara notu
    about/              → hakkımda + araçlar
    contact/            → davet, linkler, mailto formu, footer
  ui/
    smooth-scroll/      → Lenis sarmalayıcı
    reveal-text/        → scroll reveal
    scroll-progress/    → üstteki ilerleme çizgisi
    pointer-glow/       → imleci takip eden accent parıltı
    marquee/            → eğik kayan şerit
    mdx-body/           → MDX gövdesini sunucuda render eder
    icons/              → paylaşılan SVG ikon seti
    icon-links/         → footer'daki ikon şeridi
    sidebar/            → kimlik, bölüm gezinmesi (1–5), linkler, TR/EN + tema
    lang-switch/        → TR / EN geçişi
    theme-toggle/       → koyu / açık tema anahtarı
    site-header/        → yalnızca dar ekran: isim + çekmece düğmesi
    fx-canvas/          → arka plan noktaları + tel kafes gövde (three.js)
lib/
  mdx.ts                → MDX okuma/frontmatter yardımcıları
```

Her bileşen kendi klasöründe `index.tsx` olarak durur; import'lar klasör adıyla
yapılır (`@/components/sections/intro`).

## İçerik nasıl güncellenir

- **Case study'ler:** `content/projects/*.mdx`. Frontmatter alanları
  (`order`, `title`, `meta`, `one`, `stack`, `link`, `href`, `shot`) karta;
  gövde metni kartın küçük puntolu paragrafına gider. Her projenin `.tr` ve
  `.en` dosyası birlikte tutulur, dil değişimi anlıktır.
- **Sıralama:** `lib/mdx.ts` içindeki `PROJECT_SLUGS`.
- **Deneyim:** `content/site.ts` içindeki `jobs` dizisi (tr/en ayrı).
- **Profil fotoğrafı:** `public/profile.jpg` (sidebar'da 38×38, yuvarlak).
- **CV:** `public/fatih-genc-cv.pdf`. Link `content/site.ts` → `links`
  içinde; `download` alanı dolu olan link indirme olarak davranır.
- **Linkler:** iki liste var. `links` footer'daki ikon şeridini,
  `social` sidebar'daki listeyi besler. İkon adları
  `components/ui/icons` içindeki setten gelir; erişilebilirlik metinleri her
  dilde `iconLabels` içinde.
- **Diğer tüm metinler:** `content/site.ts`.
- **Renkler:** `app/globals.css` içindeki `:root` / `:root[data-theme="light"]`
  token'ları. Accent tek yerde: `--ac`.

## Yapılacaklar

- Proje kartlarındaki gri alanlara gerçek ekran görüntüleri.
- App Store ve cal.com linkleri (`content/site.ts` ve MDX'te `href: "#"`).
- Vercel'e deploy + Analytics'i panelden aktive et.
