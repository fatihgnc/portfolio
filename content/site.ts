/**
 * Site-wide content. The design (Portfolio.dc.html) carries two locales and
 * two themes; all copy lives here and the UI only picks by `locale`.
 */

export type Theme = "dark" | "light";
export type Locale = "en" | "tr";

export const LOCALES: Locale[] = ["en", "tr"];

export const identity = {
  name: "Fatih Genç",
  email: "fathgnc.dev@gmail.com",
  phone: "+90 555 892 77 66",
  phoneHref: "tel:+905558927766",
  github: "https://github.com/fatihgnc",
  githubLabel: "github.com/fatihgnc",
  linkedin: "https://www.linkedin.com/in/fatihgeencc/",
  linkedinLabel: "linkedin.com/in/fatihgeencc",
  cv: "/fatih-genc-cv.pdf",
  cvFile: "fatih-genc-cv.pdf",
} as const;

export type Messages = {
  skip: string;
  navLabel: string;
  nav: { home: string; projects: string; experience: string; contact: string };
  online: string;
  menu: string;
  closeMenu: string;
  localeLabel: string;
  themeLabel: string;
  links: { github: string; linkedin: string; email: string; cv: string };
  external: string;
  hero: { role: string; location: string; positioning: string };
  about: {
    employedLabel: string;
    employed: string;
    indieLabel: string;
    indie: string;
    now: string;
    ai: string;
    stackLead: string;
    stack: string;
  };
  projects: { h: string; intro: string; live: string; platform: { web: string; ios: string } };
  gallery: { label: string; open: string; prev: string; next: string; hint: string };
  experience: { h: string; present: string };
  contact: {
    h: string;
    intro: string;
    email: string;
    phone: string;
    location: string;
    copy: string;
    copied: string;
  };
  footer: string;
};

export const messages: Record<Locale, Messages> = {
  en: {
    skip: "Skip to content",
    navLabel: "Site",
    nav: { home: "Home", projects: "Projects", experience: "Experience", contact: "Contact" },
    online: "Online",
    menu: "Open menu",
    closeMenu: "Close menu",
    localeLabel: "Language",
    themeLabel: "Dark theme",
    links: { github: "GitHub", linkedin: "LinkedIn", email: "Email", cv: "CV" },
    external: "(opens in a new tab)",
    hero: {
      role: "Frontend Developer",
      location: "Manisa, Turkey",
      positioning:
        "I build production frontends with React, Next.js and TypeScript, and since early 2026 I have been shipping my own products end to end.",
    },
    about: {
      employedLabel: "2022 – 2025 · Employed",
      employed:
        "Three and a half years building production frontends with React, Next.js and TypeScript in SaaS and enterprise teams. Most of that work was taking products from zero to shipped: standing up the codebase, choosing the state and data layers, and carrying features through to release.",
      indieLabel: "2026 – · Independent",
      indie:
        "Since early 2026 I have been building my own products end to end: design, frontend, data pipelines, deployment. Five of them are live so far: four websites and one iOS app. All of them are free, and all of them answer a real daily question. Alongside them I built one website as freelance work for a client.",
      now: "Right now I am working on new ideas alongside them.",
      ai: "AI is a daily part of my workflow, not an occasional experiment. I use Claude Code and Cursor constantly and keep up with what is new: scaffolding, refactors, reading unfamiliar APIs, writing tests and reviewing my own code all go through them. I treat it the way I treat any tool, to move faster on the parts that are known so there is more time for the parts that are not; architecture and review stay with me, and code I have not read does not ship.",
      stackLead: "Working with",
      stack:
        "React, React Native, Next.js, TypeScript, Tailwind CSS, Zustand, Redux, RTK Query, React Query, socket.io, chart.js, Node.js, Express, MongoDB, Supabase, Stripe, Resend, New Relic, GitHub Actions, Claude Code, Cursor.",
    },
    projects: {
      h: "Projects",
      intro: "Four websites and one iOS app, all live, all free, designed, built and shipped solo since early 2026.",
      live: "Live",
      platform: { web: "Web", ios: "iOS" },
    },
    gallery: {
      label: "screenshots",
      open: "Open screenshot",
      prev: "Previous screenshot",
      next: "Next screenshot",
      hint: "Use the arrow keys to move between screenshots, Escape to close.",
    },
    experience: { h: "Experience", present: "Present" },
    contact: {
      h: "Contact",
      intro: "Open to frontend roles, remote or in Turkey, and to freelance work. The fastest way to reach me is email.",
      email: "Email",
      phone: "Phone",
      location: "Location",
      copy: "Copy",
      copied: "Copied",
    },
    footer: "Fatih Genç, 2026",
  },
  tr: {
    skip: "İçeriğe geç",
    navLabel: "Site",
    nav: { home: "Ana sayfa", projects: "Projeler", experience: "Deneyim", contact: "İletişim" },
    online: "Çevrimiçi",
    menu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
    localeLabel: "Dil",
    themeLabel: "Koyu tema",
    links: { github: "GitHub", linkedin: "LinkedIn", email: "E-posta", cv: "CV" },
    external: "(yeni sekmede açılır)",
    hero: {
      role: "Frontend Developer",
      location: "Manisa, Türkiye",
      positioning:
        "React, Next.js ve TypeScript ile production frontend'ler geliştiriyorum; 2026 başından beri kendi ürünlerimi uçtan uca tasarlayıp yayına alıyorum.",
    },
    about: {
      employedLabel: "2022 – 2025 · Maaşlı",
      employed:
        "Üç buçuk yıl boyunca SaaS ve kurumsal ekiplerde React, Next.js ve TypeScript ile production frontend'ler geliştirdim. Bu işin büyük kısmı ürünleri sıfırdan yayına taşımaktı: kod tabanını kurmak, state ve veri katmanlarını seçmek, özellikleri release'e kadar götürmek.",
      indieLabel: "2026 – · Bağımsız",
      indie:
        "2026 başından beri kendi ürünlerimi uçtan uca geliştiriyorum: tasarım, frontend, data pipeline'ları, deploy. Şimdiye kadar beşi yayında: dört web sitesi ve bir iOS uygulaması. Hepsi ücretsiz ve hepsi gerçek bir günlük soruya cevap veriyor. Bunların yanında bir müşteri için freelance olarak bir web sitesi yaptım.",
      now: "Şu anda bunların yanında yeni fikirler üzerinde çalışıyorum.",
      ai: "AI, workflow'umun günlük bir parçası; ara sıra denediğim bir şey değil. Claude Code ve Cursor'ı sürekli kullanıyor, yeni çıkanları yakından takip ediyorum: scaffolding, refactor, tanımadığım bir API'yi hızlı okumak, test yazmak ve kendi kodumu review etmek hep bunlardan geçiyor. Her araç gibi kullanıyorum, bilinen kısımlarda hızlanıp bilinmeyen kısımlara daha çok zaman ayırmak için; mimari ve review bende kalıyor, okumadığım kod yayına çıkmıyor.",
      stackLead: "Kullandığım araçlar",
      stack:
        "React, React Native, Next.js, TypeScript, Tailwind CSS, Zustand, Redux, RTK Query, React Query, socket.io, chart.js, Node.js, Express, MongoDB, Supabase, Stripe, Resend, New Relic, GitHub Actions, Claude Code, Cursor.",
    },
    projects: {
      h: "Projeler",
      intro: "Dört web sitesi ve bir iOS uygulaması; hepsi yayında, hepsi ücretsiz, 2026 başından beri tek başıma tasarlanıp geliştirildi ve yayına alındı.",
      live: "Yayında",
      platform: { web: "Web", ios: "iOS" },
    },
    gallery: {
      label: "ekran görüntüleri",
      open: "Ekran görüntüsünü aç",
      prev: "Önceki ekran görüntüsü",
      next: "Sonraki ekran görüntüsü",
      hint: "Ok tuşlarıyla ekran görüntüleri arasında geçin, Escape ile kapatın.",
    },
    experience: { h: "Deneyim", present: "Halen" },
    contact: {
      h: "İletişim",
      intro: "Uzaktan veya Türkiye içi frontend rollerine ve freelance işlere açığım. En hızlı yol e-posta.",
      email: "E-posta",
      phone: "Telefon",
      location: "Konum",
      copy: "Kopyala",
      copied: "Kopyalandı",
    },
    footer: "Fatih Genç, 2026",
  },
};

export type Shot = {
  /** path under public/ */
  src: string;
  width: number;
  height: number;
  /** portrait (phone) image */
  portrait?: boolean;
  alt: Record<Locale, string>;
};

export type Project = {
  id: string;
  name: string;
  /** link label */
  url: string;
  /** full address when `url` is not a domain */
  href?: string;
  platform: "web" | "ios";
  stack: string;
  description: Record<Locale, string>;
  shots: Shot[];
};

export const projects: Project[] = [
  {
    id: "p-secretmap-ios",
    name: "SecretMap",
    url: "App Store",
    href: "https://apps.apple.com/us/app/secretmap-share-anonymously/id6799620743",
    platform: "ios",
    stack: "React Native, TypeScript, Supabase",
    description: {
      en: "An iOS app where you write a secret, drop it on the world map and walk away. No profile, no followers, no notifications, no ads, no trackers; Sign in with Apple is the only door. Coordinates are rounded on the phone before anything is sent, so the map only ever knows \"somewhere near Lisbon\". The only reply anyone can give is \"same\".",
      tr: "Bir sır yazıp dünya haritasına bırakıp uzaklaştığınız bir iOS uygulaması. Profil, takipçi, bildirim, reklam ve tracker yok; tek giriş kapısı Sign in with Apple. Koordinatlar telefondan çıkmadan yuvarlanır, harita yalnızca \"Lizbon yakınlarında bir yer\" bilir. Verilebilecek tek yanıt \"bende de\".",
    },
    shots: [
      {
        src: "/shots/secret-map-ios/2.webp",
        width: 736,
        height: 1600,
        portrait: true,
        alt: {
          en: "World map with orange clusters showing how many secrets were dropped near each place; no exact locations.",
          tr: "Her bölgeye bırakılan sır sayısını turuncu kümelerle gösteren dünya haritası; tam konum yok.",
        },
      },
      {
        src: "/shots/secret-map-ios/1.webp",
        width: 736,
        height: 1600,
        portrait: true,
        alt: {
          en: "A single secret opened from the map, with the only possible reply: Same.",
          tr: "Haritadan açılmış tek bir sır ve verilebilecek tek yanıt: Bende de.",
        },
      },
    ],
  },
  {
    id: "p-secretmap-web",
    name: "secretmap.dev",
    url: "secretmap.dev",
    platform: "web",
    stack: "Next.js, TypeScript",
    description: {
      en: "The landing page for the SecretMap app. One screen that says what the app is, what it never collects and how the three steps work, with an FAQ and an App Store button.",
      tr: "SecretMap uygulamasının açılış sayfası. Uygulamanın ne olduğunu, neyi asla toplamadığını ve üç adımın nasıl işlediğini anlatan tek ekran; FAQ ve App Store butonu ile.",
    },
    shots: [
      {
        src: "/shots/secret-map-landing/1.webp",
        width: 1600,
        height: 722,
        alt: {
          en: "Landing page hero: black ground, orange accent and a single App Store button.",
          tr: "Açılış sayfası: siyah zemin, turuncu vurgu ve tek bir App Store butonu.",
        },
      },
      {
        src: "/shots/secret-map-landing/2.webp",
        width: 1600,
        height: 802,
        alt: {
          en: "Terms of use page with a numbered section index in the app's own typography.",
          tr: "Uygulamanın kendi tipografisiyle numaralı bölüm dizinli kullanım koşulları sayfası.",
        },
      },
    ],
  },
  {
    id: "p-eczane",
    platform: "web",
    name: "Açık Eczane Var mı",
    url: "acikeczanevarmi.com",
    stack: "Next.js, TypeScript, Tailwind CSS, Supabase, GitHub Actions, PWA",
    description: {
      en: "Which pharmacy is on duty tonight in Northern Cyprus. Nearest first, on a map, with one-tap call and directions. It also embeds into any news site as an iframe widget with a chosen accent colour, so local outlets show the roster without maintaining it themselves.",
      tr: "Bu gece Kuzey Kıbrıs'ta hangi eczane nöbetçi. Harita üzerinde en yakından başlayarak, tek dokunuşla arama ve yol tarifi. İstenen accent rengiyle iframe widget olarak her haber sitesine gömülebiliyor; yerel yayınlar listeyi kendileri güncellemeden gösterebiliyor.",
    },
    shots: [
      {
        src: "/shots/nobetci-eczane/1.webp",
        width: 1600,
        height: 799,
        alt: {
          en: "Tonight's duty pharmacies on a map, nearest first, with call and directions buttons.",
          tr: "Bu gecenin nöbetçi eczaneleri haritada, en yakından başlayarak, ara ve yol tarifi butonlarıyla.",
        },
      },
      {
        src: "/shots/nobetci-eczane/3.webp",
        width: 1600,
        height: 801,
        alt: {
          en: "Embed page: pick a region, language and accent colour and copy the iframe widget code.",
          tr: "Gömme sayfası: bölge, dil ve accent rengi seçip iframe widget kodunu kopyala.",
        },
      },
      {
        src: "/shots/nobetci-eczane/2.webp",
        width: 1600,
        height: 796,
        alt: {
          en: "Directory of all 432 registered pharmacies grouped by district.",
          tr: "Kayıtlı 432 eczanenin ilçeye göre gruplanmış dizini.",
        },
      },
    ],
  },
  {
    id: "p-kesinti",
    platform: "web",
    name: "Kesinti mi Var",
    url: "kesintimivar.com",
    stack: "Next.js, TypeScript, Tailwind CSS, Supabase, GitHub Actions",
    description: {
      en: "Is the power out in my area, and when does it come back? A live outage map of Northern Cyprus with every settlement as a dot. The utility publishes nothing usable, so the site reads five local news outlets instead and turns their announcements into one structured record per outage, with an RSS feed and a subscribable calendar for every district.",
      tr: "Bölgemde elektrik kesik mi, ne zaman gelir? Kuzey Kıbrıs'ın canlı kesinti haritası; her yerleşim bir nokta. Kurum işe yarar bir şey yayımlamadığı için site beş yerel haber kaynağını okur ve duyuruları her kesinti için tek bir structured kayda çevirir; her ilçe için RSS feed'i ve subscribe edilebilir takvim sunar.",
    },
    shots: [
      {
        src: "/shots/kesinti-mi-var/1.webp",
        width: 1600,
        height: 799,
        alt: {
          en: "Live outage map: every settlement a glowing dot, the one without power marked red.",
          tr: "Canlı kesinti haritası: her yerleşim parlayan bir nokta, elektriği kesik olan kırmızı.",
        },
      },
      {
        src: "/shots/kesinti-mi-var/2.webp",
        width: 1600,
        height: 801,
        alt: {
          en: "Archive of past outages filtered by district and month, each card linking to its news source.",
          tr: "İlçe ve aya göre filtrelenen geçmiş kesintiler arşivi; her kart haber kaynağına bağlanıyor.",
        },
      },
    ],
  },
  {
    id: "p-mevzuat",
    platform: "web",
    name: "Mevzuat Kıbrıs",
    url: "mevzuatkibris.com",
    stack: "Next.js, TypeScript, Tailwind CSS, Supabase, Resend, GitHub Actions",
    description: {
      en: "The KKTC Official Gazette is published only as PDF. This crawls every issue since 2020, splits it into individual records and makes 24,000 of them full-text searchable in Turkish. Anyone can follow a topic, institution or company by e-mail or RSS and get notified the moment a new record matches.",
      tr: "KKTC Resmî Gazete yalnızca PDF olarak yayımlanıyor. Bu site 2020'den bu yana her sayıyı tarar, tek tek kayıtlara böler ve 24.000 kaydı Türkçe full-text aranabilir hâle getirir. Herkes bir konuyu, kurumu veya şirketi e-posta ya da RSS ile takip edip yeni bir kayıt eşleştiği anda haber alabilir.",
    },
    shots: [
      {
        src: "/shots/mevzuat-kibris/1.webp",
        width: 1600,
        height: 802,
        alt: {
          en: "Search across the Official Gazette, today's new records and topic counts, with an e-mail follow box.",
          tr: "Resmî Gazete'de arama, bugün eklenen kayıtlar ve konu sayıları; yanında e-posta takip kutusu.",
        },
      },
      {
        src: "/shots/mevzuat-kibris/2.webp",
        width: 1600,
        height: 804,
        alt: {
          en: "A single record page with the original gazette title, issue, institution and a link to the official PDF.",
          tr: "Tek bir kayıt sayfası: gazetedeki orijinal başlık, sayı, kurum ve resmî PDF bağlantısı.",
        },
      },
    ],
  },
];

export type ExperienceEntry = {
  /** ISO year-month */
  start: string;
  /** empty means ongoing */
  end: string;
  title: string;
  org: string;
  place?: string;
  bullets: string[];
};

export const experience: Record<Locale, ExperienceEntry[]> = {
  en: [
    {
      start: "2026-03",
      end: "",
      title: "Independent work",
      org: "Manisa",
      bullets: [
        "Shipped five products solo since early 2026: four public websites (duty pharmacies, power outages, the Official Gazette) and one iOS app, all free and all live.",
        "Own every layer: design, frontend, data pipelines on GitHub Actions, Supabase backends, deployment and monitoring.",
        "Built one website as freelance work for a client.",
        "Currently exploring new ideas while keeping the live products running.",
      ],
    },
    {
      start: "2026-01",
      end: "2026-02",
      title: "Frontend Developer",
      org: "MLPCARE",
      place: "Istanbul, remote",
      bullets: [
        "Built a purchase-request management application for hospital staff from scratch in Next.js and TypeScript.",
        "Zustand for state, React Query over REST, inside the company's internal component library.",
        "Agile delivery with Azure DevOps and GitHub Actions.",
      ],
    },
    {
      start: "2024-01",
      end: "2025-07",
      title: "Frontend Developer",
      org: "Adsby",
      place: "Istanbul, remote",
      bullets: [
        "Led frontend on a paid advertising platform positioned as an alternative to Google Ads, built from scratch in React and TypeScript.",
        "Redux and Zustand across projects; RTK Query and React Query for data; role-based authorization and Stripe subscriptions.",
        "chart.js dashboards, Sentry and New Relic monitoring, Next.js landing pages.",
      ],
    },
    {
      start: "2022-06",
      end: "2024-01",
      title: "Frontend Developer",
      org: "Codeventure Bilişim",
      place: "Istanbul, remote",
      bullets: [
        "Built a real-time social platform in React and TypeScript over 1.5 years: socket.io group and direct messaging, a news feed with posting and commenting, and a permission system.",
        "Also built backend services in Node.js, Express and MongoDB.",
      ],
    },
    {
      start: "2022-01",
      end: "2022-06",
      title: "Backend Developer Intern",
      org: "Codeventure Bilişim",
      place: "Istanbul, remote",
      bullets: ["Node.js, Express and MongoDB; built an accounting application to spec."],
    },
    {
      start: "2018-09",
      end: "2022-06",
      title: "BSc Software Engineering",
      org: "Manisa Celal Bayar University",
      bullets: ["Graduated 2022, GPA 3.48."],
    },
  ],
  tr: [
    {
      start: "2026-03",
      end: "",
      title: "Bağımsız çalışma",
      org: "Manisa",
      bullets: [
        "2026 başından beri tek başıma beş ürün yayına aldım: dört public web sitesi (nöbetçi eczaneler, elektrik kesintileri, Resmî Gazete) ve bir iOS uygulaması; hepsi ücretsiz, hepsi yayında.",
        "Her katman bende: tasarım, frontend, GitHub Actions üzerinde data pipeline'ları, Supabase backend'leri, deploy ve monitoring.",
        "Bir müşteri için freelance olarak bir web sitesi yaptım.",
        "Şu anda yayındaki ürünleri ayakta tutarken yeni fikirler üzerinde çalışıyorum.",
      ],
    },
    {
      start: "2026-01",
      end: "2026-02",
      title: "Frontend Developer",
      org: "MLPCARE",
      place: "İstanbul, uzaktan",
      bullets: [
        "Hastane personeli için satın alma talebi yönetim uygulamasını Next.js ve TypeScript ile sıfırdan geliştirdim.",
        "State için Zustand, REST üzerinde React Query; şirketin dahili component kütüphanesi içinde çalıştım.",
        "Azure DevOps ve GitHub Actions ile Agile süreç.",
      ],
    },
    {
      start: "2024-01",
      end: "2025-07",
      title: "Frontend Developer",
      org: "Adsby",
      place: "İstanbul, uzaktan",
      bullets: [
        "Google Ads alternatifi olarak konumlanan ücretli reklam platformunun frontend'ini React ve TypeScript ile sıfırdan kurup yönettim.",
        "Projeler arasında Redux ve Zustand; veri için RTK Query ve React Query; rol bazlı yetkilendirme ve Stripe abonelikleri.",
        "chart.js dashboard'ları, Sentry ve New Relic izleme, Next.js landing sayfaları.",
      ],
    },
    {
      start: "2022-06",
      end: "2024-01",
      title: "Frontend Developer",
      org: "Codeventure Bilişim",
      place: "İstanbul, uzaktan",
      bullets: [
        "1,5 yıl boyunca React ve TypeScript ile gerçek zamanlı bir sosyal platform geliştirdim: socket.io ile grup ve birebir mesajlaşma, paylaşım ve yorum destekli akış, yetki sistemi.",
        "Node.js, Express ve MongoDB ile backend servisleri de yazdım.",
      ],
    },
    {
      start: "2022-01",
      end: "2022-06",
      title: "Backend Developer Stajyeri",
      org: "Codeventure Bilişim",
      place: "İstanbul, uzaktan",
      bullets: ["Node.js, Express ve MongoDB; şartnameye göre bir muhasebe uygulaması geliştirdim."],
    },
    {
      start: "2018-09",
      end: "2022-06",
      title: "Yazılım Mühendisliği Lisans",
      org: "Manisa Celal Bayar Üniversitesi",
      bullets: ["2022 mezunu, not ortalaması 3,48."],
    },
  ],
};

const MONTHS: Record<Locale, string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  tr: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
};

/** "2024-01" -> "Jan 2024" / "Oca 2024"; null for empty input. */
export function formatMonth(iso: string, locale: Locale): string | null {
  if (!iso) return null;
  const [y, m] = iso.split("-");
  return `${MONTHS[locale][Number(m) - 1]} ${y}`;
}
