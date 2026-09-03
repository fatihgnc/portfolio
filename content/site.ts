/**
 * Site-wide content. The design (Portfolio.dc.html) carries two locales and
 * two themes; all copy lives here and the UI only picks by `locale`.
 */

export type Theme = 'dark' | 'light';
export type Locale = 'en' | 'tr';

export const LOCALES: Locale[] = ['en', 'tr'];
export const DEFAULT_LOCALE: Locale = 'en';

/** Canonical origin. No trailing slash. */
export const SITE_URL = 'https://fatihgenc.dev';

export const identity = {
  name: 'Fatih Genç',
  givenName: 'Fatih',
  familyName: 'Genç',
  jobTitle: 'Frontend Developer',
  email: 'fathgnc.dev@gmail.com',
  phone: '+90 555 892 77 66',
  phoneHref: 'tel:+905558927766',
  phoneE164: '+905558927766',
  github: 'https://github.com/fatihgnc',
  githubLabel: 'github.com/fatihgnc',
  linkedin: 'https://www.linkedin.com/in/fatihgeencc/',
  linkedinLabel: 'linkedin.com/in/fatihgeencc',
  cv: '/fatih-genc-cv.pdf',
  cvFile: 'fatih-genc-cv.pdf',
  photo: '/profile.jpg',
  locality: 'Manisa',
  country: 'TR',
  university: 'Manisa Celal Bayar University',
} as const;

/**
 * URL shape per locale. English is the default locale and lives at the root;
 * Turkish is prefixed and uses a translated segment for the project pages.
 */
export const paths = {
  home: (locale: Locale) => (locale === 'en' ? '/' : '/tr'),
  /** a section of the home page, linked from anywhere */
  section: (locale: Locale, id: string) =>
    locale === 'en' ? `/#${id}` : `/tr#${id}`,
  project: (locale: Locale, slug: string) =>
    locale === 'en' ? `/projects/${slug}` : `/tr/projeler/${slug}`,
};

export type Messages = {
  /** copy that only ever reaches <head> */
  meta: {
    title: string;
    description: string;
    ogDescription: string;
    /** used as "<project> — <tail>" on project pages */
    projectTitleTail: string;
  };
  /** the per-project page */
  project: {
    kicker: string;
    home: string;
    back: string;
    visitWeb: string;
    visitIos: string;
    overview: string;
    stack: string;
    screenshots: string;
    other: string;
  };
  skip: string;
  navLabel: string;
  nav: { home: string; projects: string; experience: string; contact: string };
  /** heading above the GitHub / LinkedIn / e-mail / CV list */
  linksLabel: string;
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
  projects: {
    h: string;
    intro: string;
    live: string;
    /** link from a home card to the project page */
    more: string;
    platform: { web: string; ios: string };
  };
  gallery: {
    label: string;
    open: string;
    prev: string;
    next: string;
    hint: string;
  };
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
    meta: {
      title: 'Fatih Genç — Frontend Developer',
      description:
        'Frontend developer in Manisa, Turkey. I build interfaces with React, Next.js and TypeScript, AI in the workflow. Five products live: an iOS app, four websites.',
      ogDescription:
        'React, Next.js and TypeScript. Five products shipped solo since mid-2026 — an iOS app and four websites, all live and free.',
      projectTitleTail: 'Fatih Genç',
    },
    project: {
      kicker: 'Project',
      home: 'Home',
      back: 'All projects',
      visitWeb: 'Visit the site',
      visitIos: 'View on the App Store',
      overview: 'About the project',
      stack: 'Built with',
      screenshots: 'Screenshots',
      other: 'Other projects',
    },
    skip: 'Skip to content',
    navLabel: 'Site',
    nav: {
      home: 'Home',
      projects: 'Projects',
      experience: 'Experience',
      contact: 'Contact',
    },
    linksLabel: 'Links',
    menu: 'Open menu',
    closeMenu: 'Close menu',
    localeLabel: 'Language',
    themeLabel: 'Dark theme',
    links: { github: 'GitHub', linkedin: 'LinkedIn', email: 'Email', cv: 'CV' },
    external: '(opens in a new tab)',
    hero: {
      role: 'Frontend Developer',
      location: 'Manisa, Turkey',
      positioning:
        'I build interfaces with React, Next.js and TypeScript, with AI in the workflow, and since mid-2026 I have been designing and shipping my own products.',
    },
    about: {
      employedLabel: '2022 – 2025 · Full-time',
      employed:
        'Three and a half years building interfaces with React, Next.js and TypeScript at startups and enterprise companies, mostly on SaaS products. Mostly I was taking products from zero to shipped: standing up the codebase, choosing the state and data layers, and carrying features through to release.',
      indieLabel: '2026 – · Independent',
      indie:
        'Since mid-2026 I have been building my own products: design, frontend, data pipelines, deployment. I have shipped five of them so far: four websites and one iOS app. All of them are free. Alongside them I built one website as freelance work for a client.',
      now: 'Right now I am working on new ideas on top of these.',
      ai: 'AI is a daily part of my workflow, not an occasional experiment. There is no getting away from it now, so I brought it into how I work. That means Claude Code and Cursor constantly, and keeping up with what is new: scaffolding, refactors, reading an API I do not know, writing tests and reviewing code all go through them. I use it like every other tool I reach for, to move faster on the parts that are known so there is more time for the parts that are not; architecture and review stay with me, and code I have not read never goes live.',
      stackLead: 'Technologies I work with',
      stack:
        'React, React Native, Next.js, TypeScript, Tailwind CSS, Zustand, Redux, RTK Query, React Query, socket.io, chart.js, Node.js, Express, MongoDB, Supabase, Stripe, Resend, New Relic, GitHub Actions, Claude Code, Cursor.',
    },
    projects: {
      h: 'Projects',
      intro:
        'Four websites and one iOS app, all live, all free; I designed, built and shipped every one of them solo since mid-2026.',
      live: 'Live',
      more: 'Project page',
      platform: { web: 'Web', ios: 'iOS' },
    },
    gallery: {
      label: 'screenshots',
      open: 'Open screenshot',
      prev: 'Previous screenshot',
      next: 'Next screenshot',
      hint: 'Use the arrow keys to move between screenshots, Escape to close.',
    },
    experience: { h: 'Experience', present: 'Present' },
    contact: {
      h: 'Contact',
      intro:
        'Open to frontend roles, remote or in Turkey, and to freelance work. You can reach me through the details below.',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      copy: 'Copy',
      copied: 'Copied',
    },
    footer: 'Fatih Genç, 2026',
  },
  tr: {
    meta: {
      title: 'Fatih Genç — Frontend Developer',
      description:
        "Manisa'da frontend developer. React, Next.js ve TypeScript ile AI entegre arayüzler geliştiriyorum. Beş projem yayında: bir iOS uygulaması, dört web sitesi.",
      ogDescription:
        "React, Next.js ve TypeScript. 2026'nın ortalarından beri tek başıma yayına aldığım beş proje: bir iOS uygulaması ve dört web sitesi, hepsi ücretsiz.",
      projectTitleTail: 'Fatih Genç',
    },
    project: {
      kicker: 'Proje',
      home: 'Ana sayfa',
      back: 'Tüm projeler',
      visitWeb: 'Siteyi ziyaret et',
      visitIos: "App Store'da gör",
      overview: 'Proje hakkında',
      stack: 'Kullanılan teknolojiler',
      screenshots: 'Ekran görüntüleri',
      other: 'Diğer projeler',
    },
    skip: 'İçeriğe geç',
    navLabel: 'Site',
    nav: {
      home: 'Ana sayfa',
      projects: 'Projeler',
      experience: 'Deneyim',
      contact: 'İletişim',
    },
    linksLabel: 'Bağlantılar',
    menu: 'Menüyü aç',
    closeMenu: 'Menüyü kapat',
    localeLabel: 'Dil',
    themeLabel: 'Koyu tema',
    links: {
      github: 'GitHub',
      linkedin: 'LinkedIn',
      email: 'E-posta',
      cv: 'CV',
    },
    external: '(yeni sekmede açılır)',
    hero: {
      role: 'Frontend Developer',
      location: 'Manisa, Türkiye',
      positioning:
        "React, Next.js ve TypeScript ile AI entegre bir şekilde arayüzler geliştiriyorum; 2026'nın ortalarından beri kendi projelerimi tasarlayıp yayına alıyorum.",
    },
    about: {
      employedLabel: '2022 – 2025 · Tam zamanlı',
      employed:
        "Üç buçuk yıl boyunca startup ve kurumsal firmalarda React, Next.js ve TypeScript ile çoğu SaaS olmak üzere arayüzler geliştirdim. Çoğunlukla projeleri sıfırdan yayına çıkarmakla uğraştım: codebase'i oluşturmak, state ve veri katmanlarını seçmek, özellikleri release'e kadar götürmek.",
      indieLabel: '2026 – · Bağımsız',
      indie:
        "2026'nın ortalarından beri kendi projelerimi geliştiriyorum: tasarım, arayüz, data pipeline'ları, deploy. Şimdiye kadar beş projeyi yayına aldım: dört web sitesi ve bir iOS uygulaması. Hepsi ücretsiz. Bunların yanında bir müşteri için freelance olarak bir web sitesi yaptım.",
      now: 'Şu anda bunlara ek olarak yeni fikirler üzerinde çalışıyorum.',
      ai: "AI, workflow'umun günlük bir parçası; ara sıra denediğim bir şey değil. Günümüzde AI'dan kaçış mümkün değil dolayısıyla ben de çalışma hayatıma entegre ettim ve Claude Code ve Cursor'ı bu yüzden sürekli kullanıyor, yeni çıkanları yakından takip ediyorum: scaffolding, refactor, bilmediğim bir API'yi hızlı okumak, test yazmak ve kodu review etmek hep bunlardan geçiyor. Kullandığım her tool gibi kullanıyorum, bilinen kısımlarda hızlanıp bilinmeyen kısımlara daha çok zaman ayırabilmek adına; mimari ve review bende kalıyor, okumadığım kod asla yayında olmuyor.",
      stackLead: 'Kullandığım teknolojiler',
      stack:
        'React, React Native, Next.js, TypeScript, Tailwind CSS, Zustand, Redux, RTK Query, React Query, socket.io, chart.js, Node.js, Express, MongoDB, Supabase, Stripe, Resend, New Relic, GitHub Actions, Claude Code, Cursor.',
    },
    projects: {
      h: 'Projeler',
      intro:
        "Dört web sitesi ve bir iOS uygulaması; hepsi yayında, hepsi ücretsiz, 2026'nın ortalarından beri tek başıma tasarlayıp geliştirdim ve yayına aldım.",
      live: 'Yayında',
      more: 'Proje sayfası',
      platform: { web: 'Web', ios: 'iOS' },
    },
    gallery: {
      label: 'ekran görüntüleri',
      open: 'Ekran görüntüsünü aç',
      prev: 'Önceki ekran görüntüsü',
      next: 'Sonraki ekran görüntüsü',
      hint: 'Ok tuşlarıyla ekran görüntüleri arasında geçin, Escape ile kapatın.',
    },
    experience: { h: 'Deneyim', present: 'Halen' },
    contact: {
      h: 'İletişim',
      intro:
        'Uzaktan veya Türkiye içi frontend rollerine ve freelance işlere açığım. Aşağıdaki iletişim bilgileri üzerinden iletişime geçebilirsiniz.',
      email: 'E-posta',
      phone: 'Telefon',
      location: 'Konum',
      copy: 'Kopyala',
      copied: 'Kopyalandı',
    },
    footer: 'Fatih Genç, 2026',
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
  /** anchor id on the home page */
  id: string;
  /** URL segment of the project page */
  slug: string;
  name: string;
  /** link label */
  url: string;
  /** full address when `url` is not a domain */
  href?: string;
  platform: 'web' | 'ios';
  stack: string;
  /** one line; the meta description and OG subtitle of the project page */
  tagline: Record<Locale, string>;
  description: Record<Locale, string>;
  shots: Shot[];
};

export const projects: Project[] = [
  {
    id: 'p-secretmap-ios',
    slug: 'secretmap-ios',
    name: 'SecretMap',
    url: 'App Store',
    href: 'https://apps.apple.com/us/app/secretmap-share-anonymously/id6799620743',
    platform: 'ios',
    stack: 'React Native, TypeScript, Supabase',
    tagline: {
      en: 'An iOS app for dropping an anonymous secret on the world map. No profile, no followers, no trackers.',
      tr: 'Dünya haritasına anonim bir sır bırakmak için iOS uygulaması. Profil yok, takipçi yok, tracker yok.',
    },
    description: {
      en: 'An iOS app where you write a secret, drop it on the world map and walk away. No profile, no followers, no notifications, no ads, no trackers; Sign in with Apple is the only door. Coordinates are rounded on the phone before anything is sent, so the map only ever knows "somewhere near Lisbon". The only reply anyone can give is "same".',
      tr: 'Bir sır yazıp dünya haritasına bırakıp uzaklaştığınız bir iOS uygulaması. Profil, takipçi, bildirim, reklam ve tracker yok; tek giriş kapısı Sign in with Apple. Koordinatlar telefondan çıkmadan yuvarlanır, harita yalnızca "Lizbon yakınlarında bir yer" bilir. Verilebilecek tek yanıt "bende de".',
    },
    shots: [
      {
        src: '/shots/secret-map-ios/2.webp',
        width: 736,
        height: 1600,
        portrait: true,
        alt: {
          en: 'World map with orange clusters showing how many secrets were dropped near each place; no exact locations.',
          tr: 'Her bölgeye bırakılan sır sayısını turuncu kümelerle gösteren dünya haritası; tam konum yok.',
        },
      },
      {
        src: '/shots/secret-map-ios/1.webp',
        width: 736,
        height: 1600,
        portrait: true,
        alt: {
          en: 'A single secret opened from the map, with the only possible reply: Same.',
          tr: 'Haritadan açılmış tek bir sır ve verilebilecek tek yanıt: Bende de.',
        },
      },
    ],
  },
  {
    id: 'p-secretmap-web',
    slug: 'secretmap',
    name: 'secretmap.dev',
    url: 'secretmap.dev',
    platform: 'web',
    stack: 'Next.js, TypeScript',
    tagline: {
      en: 'The landing page for SecretMap: one screen, an FAQ and an App Store button, built with Next.js.',
      tr: "SecretMap'in açılış sayfası: tek ekran, FAQ ve App Store butonu; Next.js ile geliştirildi.",
    },
    description: {
      en: 'The landing page for the SecretMap app. One screen that says what the app is, what it never collects and how the three steps work, with an FAQ and an App Store button.',
      tr: 'SecretMap uygulamasının açılış sayfası. Uygulamanın ne olduğunu, neyi asla toplamadığını ve üç adımın nasıl işlediğini anlatan tek ekran; FAQ ve App Store butonu ile.',
    },
    shots: [
      {
        src: '/shots/secret-map-landing/1.webp',
        width: 1600,
        height: 722,
        alt: {
          en: 'Landing page hero: black ground, orange accent and a single App Store button.',
          tr: 'Açılış sayfası: siyah zemin, turuncu vurgu ve tek bir App Store butonu.',
        },
      },
      {
        src: '/shots/secret-map-landing/2.webp',
        width: 1600,
        height: 802,
        alt: {
          en: "Terms of use page with a numbered section index in the app's own typography.",
          tr: 'Uygulamanın kendi tipografisiyle numaralı bölüm dizinli kullanım koşulları sayfası.',
        },
      },
    ],
  },
  {
    id: 'p-eczane',
    slug: 'acik-eczane-var-mi',
    platform: 'web',
    name: 'Açık Eczane Var mı',
    url: 'acikeczanevarmi.com',
    stack: 'Next.js, TypeScript, Tailwind CSS, Supabase, GitHub Actions, PWA',
    tagline: {
      en: 'Which pharmacy is on duty tonight in Northern Cyprus — nearest first, on a map, embeddable as a widget.',
      tr: "Kuzey Kıbrıs'ta bu gece hangi eczane nöbetçi — haritada en yakından, widget olarak gömülebilir.",
    },
    description: {
      en: 'Which pharmacy is on duty tonight in Northern Cyprus. Nearest first, on a map, with one-tap call and directions. It also embeds into any news site as an iframe widget with a chosen accent colour, so local outlets show the roster without maintaining it themselves.',
      tr: "Bu gece Kuzey Kıbrıs'ta hangi eczane nöbetçi. Harita üzerinde en yakından başlayarak, tek dokunuşla arama ve yol tarifi. İstenen accent rengiyle iframe widget olarak her haber sitesine gömülebiliyor; yerel yayınlar listeyi kendileri güncellemeden gösterebiliyor.",
    },
    shots: [
      {
        src: '/shots/nobetci-eczane/1.webp',
        width: 1600,
        height: 799,
        alt: {
          en: "Tonight's duty pharmacies on a map, nearest first, with call and directions buttons.",
          tr: 'Bu gecenin nöbetçi eczaneleri haritada, en yakından başlayarak, ara ve yol tarifi butonlarıyla.',
        },
      },
      {
        src: '/shots/nobetci-eczane/3.webp',
        width: 1600,
        height: 801,
        alt: {
          en: 'Embed page: pick a region, language and accent colour and copy the iframe widget code.',
          tr: 'Gömme sayfası: bölge, dil ve accent rengi seçip iframe widget kodunu kopyala.',
        },
      },
      {
        src: '/shots/nobetci-eczane/2.webp',
        width: 1600,
        height: 796,
        alt: {
          en: 'Directory of all 432 registered pharmacies grouped by district.',
          tr: 'Kayıtlı 432 eczanenin ilçeye göre gruplanmış dizini.',
        },
      },
    ],
  },
  {
    id: 'p-kesinti',
    slug: 'kesinti-mi-var',
    platform: 'web',
    name: 'Kesinti mi Var',
    url: 'kesintimivar.com',
    stack: 'Next.js, TypeScript, Tailwind CSS, Supabase, GitHub Actions',
    tagline: {
      en: 'A live power outage map of Northern Cyprus, built from five local news sources, with RSS and calendar feeds.',
      tr: "Kuzey Kıbrıs'ın canlı elektrik kesintisi haritası; beş yerel haber kaynağından, RSS ve takvim akışlarıyla.",
    },
    description: {
      en: 'Is the power out in my area, and when does it come back? A live outage map of Northern Cyprus with every settlement as a dot. The utility publishes nothing usable, so the site reads five local news outlets instead and turns their announcements into one structured record per outage, with an RSS feed and a subscribable calendar for every district.',
      tr: "Bölgemde elektrik kesik mi, ne zaman gelir? Kuzey Kıbrıs'ın canlı kesinti haritası; her yerleşim bir nokta. Kurum işe yarar bir şey yayımlamadığı için site beş yerel haber kaynağını okur ve duyuruları her kesinti için tek bir structured kayda çevirir; her ilçe için RSS feed'i ve subscribe edilebilir takvim sunar.",
    },
    shots: [
      {
        src: '/shots/kesinti-mi-var/1.webp',
        width: 1600,
        height: 799,
        alt: {
          en: 'Live outage map: every settlement a glowing dot, the one without power marked red.',
          tr: 'Canlı kesinti haritası: her yerleşim parlayan bir nokta, elektriği kesik olan kırmızı.',
        },
      },
      {
        src: '/shots/kesinti-mi-var/2.webp',
        width: 1600,
        height: 801,
        alt: {
          en: 'Archive of past outages filtered by district and month, each card linking to its news source.',
          tr: 'İlçe ve aya göre filtrelenen geçmiş kesintiler arşivi; her kart haber kaynağına bağlanıyor.',
        },
      },
    ],
  },
  {
    id: 'p-mevzuat',
    slug: 'mevzuat-kibris',
    platform: 'web',
    name: 'Mevzuat Kıbrıs',
    url: 'mevzuatkibris.com',
    stack:
      'Next.js, TypeScript, Tailwind CSS, Supabase, Resend, GitHub Actions',
    tagline: {
      en: '24,000 KKTC Official Gazette records, split out of PDFs and made full-text searchable in Turkish.',
      tr: "KKTC Resmî Gazete'den ayrıştırılmış 24.000 kayıt, Türkçe full-text aranabilir hâlde.",
    },
    description: {
      en: 'The KKTC Official Gazette is published only as PDF. This crawls every issue since 2020, splits it into individual records and makes 24,000 of them full-text searchable in Turkish. Anyone can follow a topic, institution or company by e-mail or RSS and get notified the moment a new record matches.',
      tr: "KKTC Resmî Gazete yalnızca PDF olarak yayımlanıyor. Bu site 2020'den bu yana her sayıyı tarar, tek tek kayıtlara böler ve 24.000 kaydı Türkçe full-text aranabilir hâle getirir. Herkes bir konuyu, kurumu veya şirketi e-posta ya da RSS ile takip edip yeni bir kayıt eşleştiği anda haber alabilir.",
    },
    shots: [
      {
        src: '/shots/mevzuat-kibris/1.webp',
        width: 1600,
        height: 802,
        alt: {
          en: "Search across the Official Gazette, today's new records and topic counts, with an e-mail follow box.",
          tr: "Resmî Gazete'de arama, bugün eklenen kayıtlar ve konu sayıları; yanında e-posta takip kutusu.",
        },
      },
      {
        src: '/shots/mevzuat-kibris/2.webp',
        width: 1600,
        height: 804,
        alt: {
          en: 'A single record page with the original gazette title, issue, institution and a link to the official PDF.',
          tr: 'Tek bir kayıt sayfası: gazetedeki orijinal başlık, sayı, kurum ve resmî PDF bağlantısı.',
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
      start: '2026-06',
      end: '',
      title: 'Independent work',
      org: 'Manisa',
      bullets: [
        'Shipped five products solo since mid-2026: four public websites (duty pharmacies, power outages, the Official Gazette) and one iOS app, all free and all live.',
        'Own every layer: design, frontend, data pipelines on GitHub Actions, Supabase backends, deployment and monitoring.',
        'Built one website as freelance work for a client.',
        'Currently exploring new ideas while keeping the live products running.',
      ],
    },
    {
      start: '2026-01',
      end: '2026-02',
      title: 'Frontend Developer',
      org: 'MLPCARE',
      place: 'Istanbul, remote',
      bullets: [
        'Built a purchase-request management application for hospital staff from scratch in Next.js and TypeScript.',
        "Zustand for state, React Query over REST, inside the company's internal component library.",
        'Agile delivery with Azure DevOps and GitHub Actions.',
      ],
    },
    {
      start: '2024-01',
      end: '2025-07',
      title: 'Frontend Developer',
      org: 'Adsby',
      place: 'Istanbul, remote',
      bullets: [
        'Led frontend on a paid advertising platform positioned as an alternative to Google Ads, built from scratch in React and TypeScript.',
        'Redux and Zustand across projects; RTK Query and React Query for data; role-based authorization and Stripe subscriptions.',
        'chart.js dashboards, Sentry and New Relic monitoring, Next.js landing pages.',
      ],
    },
    {
      start: '2022-06',
      end: '2024-01',
      title: 'Frontend Developer',
      org: 'Codeventure Bilişim',
      place: 'Istanbul, remote',
      bullets: [
        'Built a real-time social platform in React and TypeScript over 1.5 years: socket.io group and direct messaging, a news feed with posting and commenting, and a permission system.',
        'Also built backend services in Node.js, Express and MongoDB.',
      ],
    },
    {
      start: '2022-01',
      end: '2022-06',
      title: 'Backend Developer Intern',
      org: 'Codeventure Bilişim',
      place: 'Istanbul, remote',
      bullets: [
        'Node.js, Express and MongoDB; built an accounting application to spec.',
      ],
    },
    {
      start: '2018-09',
      end: '2022-06',
      title: 'BSc Software Engineering',
      org: 'Manisa Celal Bayar University',
      bullets: ['Graduated 2022, GPA 3.48.'],
    },
  ],
  tr: [
    {
      start: '2026-06',
      end: '',
      title: 'Bağımsız çalışma',
      org: 'Manisa',
      bullets: [
        "2026'nın ortalarından beri tek başıma beş proje yayına aldım: dört public web sitesi (nöbetçi eczaneler, elektrik kesintileri, Resmî Gazete) ve bir iOS uygulaması; hepsi ücretsiz, hepsi yayında.",
        "Her katman bende: tasarım, arayüz, GitHub Actions üzerinde data pipeline'ları, Supabase backend'leri, deploy ve monitoring.",
        'Bir müşteri için freelance olarak bir web sitesi yaptım.',
        'Şu anda yayındaki projeleri ayakta tutarken yeni fikirler üzerinde çalışıyorum.',
      ],
    },
    {
      start: '2026-01',
      end: '2026-02',
      title: 'Frontend Developer',
      org: 'MLPCARE',
      place: 'İstanbul, uzaktan',
      bullets: [
        'Hastane personeli için satın alma talebi yönetim uygulamasını Next.js ve TypeScript ile sıfırdan geliştirdim.',
        'State için Zustand, REST üzerinde React Query; şirketin dahili component kütüphanesi içinde çalıştım.',
        'Azure DevOps ve GitHub Actions ile Agile süreç.',
      ],
    },
    {
      start: '2024-01',
      end: '2025-07',
      title: 'Frontend Developer',
      org: 'Adsby',
      place: 'İstanbul, uzaktan',
      bullets: [
        "Google Ads alternatifi olarak konumlanan ücretli reklam platformunun arayüzünü React ve TypeScript ile sıfırdan kurup yönettim.",
        'Projeler arasında Redux ve Zustand; veri için RTK Query ve React Query; rol bazlı yetkilendirme ve Stripe abonelikleri.',
        "chart.js dashboard'ları, Sentry ve New Relic izleme, Next.js landing sayfaları.",
      ],
    },
    {
      start: '2022-06',
      end: '2024-01',
      title: 'Frontend Developer',
      org: 'Codeventure Bilişim',
      place: 'İstanbul, uzaktan',
      bullets: [
        '1,5 yıl boyunca React ve TypeScript ile gerçek zamanlı bir sosyal platform geliştirdim: socket.io ile grup ve birebir mesajlaşma, paylaşım ve yorum destekli akış, yetki sistemi.',
        'Node.js, Express ve MongoDB ile backend servisleri de yazdım.',
      ],
    },
    {
      start: '2022-01',
      end: '2022-06',
      title: 'Backend Developer Stajyeri',
      org: 'Codeventure Bilişim',
      place: 'İstanbul, uzaktan',
      bullets: [
        'Node.js, Express ve MongoDB; şartnameye göre bir muhasebe uygulaması geliştirdim.',
      ],
    },
    {
      start: '2018-09',
      end: '2022-06',
      title: 'Yazılım Mühendisliği Lisans',
      org: 'Manisa Celal Bayar Üniversitesi',
      bullets: ['2022 mezunu, not ortalaması 3,48.'],
    },
  ],
};

const MONTHS: Record<Locale, string[]> = {
  en: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  tr: [
    'Oca',
    'Şub',
    'Mar',
    'Nis',
    'May',
    'Haz',
    'Tem',
    'Ağu',
    'Eyl',
    'Eki',
    'Kas',
    'Ara',
  ],
};

/** "2024-01" -> "Jan 2024" / "Oca 2024"; null for empty input. */
export function formatMonth(iso: string, locale: Locale): string | null {
  if (!iso) return null;
  const [y, m] = iso.split('-');
  return `${MONTHS[locale][Number(m) - 1]} ${y}`;
}

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** The address the project actually lives at. */
export function projectHref(p: Project): string {
  return p.href ?? `https://${p.url}`;
}

/** "A, B, C." -> ["A", "B", "C"] */
export function stackList(stack: string): string[] {
  return stack
    .replace(/\.$/, '')
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
}

/** The slice of copy the (client) sidebar needs; keeps the rest off the wire. */
export type SidebarCopy = Pick<
  Messages,
  | 'navLabel'
  | 'nav'
  | 'linksLabel'
  | 'menu'
  | 'links'
  | 'external'
  | 'localeLabel'
  | 'themeLabel'
> & { role: string };

export function sidebarCopy(locale: Locale): SidebarCopy {
  const t = messages[locale];
  return {
    navLabel: t.navLabel,
    nav: t.nav,
    linksLabel: t.linksLabel,
    menu: t.menu,
    links: t.links,
    external: t.external,
    localeLabel: t.localeLabel,
    themeLabel: t.themeLabel,
    role: t.hero.role,
  };
}
