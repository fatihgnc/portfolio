/**
 * Site geneli içerik. Case study metinleri MDX'te (content/projects),
 * geri kalan arayüz metinleri burada — iki dil, tek kaynak.
 */

export const LANGS = ["tr", "en"] as const;
export type Lang = (typeof LANGS)[number];

export type Theme = "dark" | "light";

export type LinkIcon = "github" | "linkedin" | "cv" | "appstore";

export type SiteLink = {
  label: Record<Lang, string>;
  value: string;
  href: string;
  /** dolu ise link indirme olarak davranır; değer indirilen dosya adıdır */
  download?: string;
  /** ikon şeridindeki görsel */
  icon?: LinkIcon;
  /** ikon şeridinde ikon yerine bu metin gösterilir (ör. "CV") */
  iconText?: string;
};

const links: SiteLink[] = [
  {
    label: { tr: "github", en: "github" },
    value: "github.com/fatihgnc",
    href: "https://github.com/fatihgnc",
    icon: "github",
  },
  {
    label: { tr: "linkedin", en: "linkedin" },
    value: "in/fatihgnc",
    href: "https://linkedin.com/in/fatihgnc",
    icon: "linkedin",
  },
  {
    label: { tr: "app store", en: "app store" },
    value: "SecretMap",
    href: "#",
    icon: "appstore",
  },
  {
    label: { tr: "cv", en: "cv" },
    value: "fatih-genc-cv.pdf",
    href: "/fatih-genc-cv.pdf",
    download: "Fatih-Genc-Frontend-Developer-CV.pdf",
    icon: "cv",
    iconText: "CV",
  },
];

export const site = {
  name: "Fatih Genç",
  email: "fatihgnc.dev@gmail.com",
  ticker:
    "SECRETMAP · MAMAMIX · SWIFT · SWIFTUI · NEXT.JS · TYPESCRIPT · SUPABASE · MAPKIT · ",
  links,
  tools: {
    tr: [
      { label: "arayüz", items: "React · Next.js · TypeScript · Tailwind" },
      { label: "mobil", items: "Swift · SwiftUI · MapKit · CoreLocation" },
      { label: "arka uç", items: "Supabase · Postgres · next-intl" },
      { label: "masa", items: "VS Code · Xcode · Figma · Claude Code · Vercel" },
    ],
    en: [
      { label: "interface", items: "React · Next.js · TypeScript · Tailwind" },
      { label: "mobile", items: "Swift · SwiftUI · MapKit · CoreLocation" },
      { label: "backend", items: "Supabase · Postgres · next-intl" },
      { label: "desk", items: "VS Code · Xcode · Figma · Claude Code · Vercel" },
    ],
  },
} as const;

export const copy = {
  tr: {
    role: "frontend & indie mobile developer",
    kicker: "müsait",
    heroL1: "Fatih",
    heroL2: "Genç",
    heroSub:
      "Dört yıl başka insanların ürünlerini kodladım. Geçen yıl kendiminkini yapmaya başladım.",
    status: [
      { k: "SecretMap", v: "App Store review'da" },
      { k: "secretmap.dev", v: "yayında" },
      { k: "mamamix.com.tr", v: "teslim edildi" },
    ],
    workLabel: "işler",
    workTitle: "Üç şey yaptım, üçü de yayında.",
    shotHint: "ekran görüntüsü gelecek",
    expLabel: "deneyim",
    expTitle: "Dört masa, tek meslek.",
    expNote: "hepsi uzaktan",
    jobs: [
      {
        co: "MLPCARE",
        role: "Frontend Developer",
        when: "01/2026 — 02/2026",
        one: "Hastane personelinin satın alma taleplerini oluşturup takip ettiği web uygulamasını sıfırdan kurmaya başladım.",
        note: "Kurum içi bileşen kütüphanesiyle, Agile ekipte.",
        stack: ["Next.js", "TypeScript", "Zustand", "React Query", "Azure DevOps"],
      },
      {
        co: "Adsby",
        role: "Frontend Developer",
        when: "01/2024 — 07/2025",
        one: "Google Ads'e alternatif bir reklam platformunun frontend'ini sıfırdan kurdum ve yürüttüm.",
        note: "Rol bazlı yetkilendirme, Stripe abonelik sistemi, grafiklerle metrik ekranları. Tasarım ve backend ekipleriyle omuz omuza.",
        stack: ["React", "TypeScript", "Redux", "RTK Query", "Stripe", "chart.js", "Sentry"],
      },
      {
        co: "Codeventure Bilişim",
        role: "Frontend Developer",
        when: "06/2022 — 01/2024",
        one: "Bir buçuk yıl boyunca gerçek zamanlı bir sosyal platform geliştirdim.",
        note: "Grup ve özel mesajlaşma, akış, yorum ve yetki sistemi. Backend tarafına da girdim.",
        stack: ["React", "TypeScript", "socket.io", "Node.js", "Express", "MongoDB"],
      },
      {
        co: "Codeventure Bilişim",
        role: "Backend Developer Intern",
        when: "01/2022 — 06/2022",
        one: "Verilen gereksinimlere göre bir muhasebe uygulaması yazdım.",
        note: "İlk profesyonel kodum.",
        stack: ["Node.js", "Express", "MongoDB"],
      },
    ],
    interludeLabel: "ara not",
    interlude:
      "Arada bir soruyorlar: neden kendi işini yapıyorsun? Cevabı basit — dört yıl boyunca en iyi bildiğim şeyin son bir milimetresine hiç karar veremedim.",
    interludeSub:
      "Kendi ürününü yaptığında o milimetre sende kalıyor. Freelance işler de bunun için var: faturayı ödüyorlar ve aynı kararı bir başkası için vermeyi öğretiyorlar.",
    aboutLabel: "arka plan",
    aboutTitle: "Dört yıl frontend, bir yıl kendi ürünlerim.",
    aboutParas: [
      "Ajans ve ürün ekiplerinde React, Next.js ve TypeScript yazdım. İyi işlerdi, ama her zaman birinin çizdiği ekranı kodluyordum.",
      "Günlük akışımda Claude Code var: iskelet, refactor, bilmediğim bir API'yi hızlı okumak. Mimariyi ve incelemeyi devretmiyorum — okumadığım kod projeye girmiyor.",
      "Frontend hâlâ işimin merkezinde. Aradaki fark şu: artık o bir milimetreye ben karar veriyorum.",
    ],
    contactLabel: "iletişim",
    contactTitle: "Bir fikrin mi var?",
    contactSub: "Aynı gün dönerim.",
    fName: "adın",
    fEmail: "e-postan",
    fMsg: "ne yapmak istiyorsun?",
    fNamePh: "Fatih Genç",
    fEmailPh: "sen@ornek.com",
    fMsgPh: "Birkaç cümle yeter.",
    fSend: "gönder",
    fNote: "Form e-posta uygulamanı açar — hiçbir yere kayıt gitmez.",
    sentTitle: "E-posta uygulaman açıldı.",
    sentBody:
      "Açılmadıysa doğrudan fatihgnc.dev@gmail.com adresine yazabilirsin.",
    again: "yeni mesaj",
    iconLabels: {
      github: "GitHub profilim",
      linkedin: "LinkedIn profilim",
      cv: "CV'mi indir (PDF)",
      appstore: "App Store'da SecretMap",
    },
    footerB: "2026",
    mailSubject: "Portfolyodan mesaj — ",
    themeToLight: "açık tema",
    themeToDark: "koyu tema",
  },
  en: {
    role: "frontend & indie mobile developer",
    kicker: "available",
    heroL1: "Fatih",
    heroL2: "Genç",
    heroSub:
      "For four years I built other people's products. Last year I started building my own.",
    status: [
      { k: "SecretMap", v: "in App Store review" },
      { k: "secretmap.dev", v: "live" },
      { k: "mamamix.com.tr", v: "delivered" },
    ],
    workLabel: "work",
    workTitle: "Three things built, three things shipped.",
    shotHint: "screenshot goes here",
    expLabel: "experience",
    expTitle: "Four desks, one craft.",
    expNote: "all remote",
    jobs: [
      {
        co: "MLPCARE",
        role: "Frontend Developer",
        when: "01/2026 — 02/2026",
        one: "Started building, from scratch, the web app hospital staff use to create and track purchase requests.",
        note: "On the company's internal component library, in an Agile team.",
        stack: ["Next.js", "TypeScript", "Zustand", "React Query", "Azure DevOps"],
      },
      {
        co: "Adsby",
        role: "Frontend Developer",
        when: "01/2024 — 07/2025",
        one: "Led the frontend of an advertising platform built as an alternative to Google Ads, from scratch.",
        note: "Role-based authorization, Stripe subscriptions, metric dashboards with charts. Shoulder to shoulder with design and backend.",
        stack: ["React", "TypeScript", "Redux", "RTK Query", "Stripe", "chart.js", "Sentry"],
      },
      {
        co: "Codeventure Bilişim",
        role: "Frontend Developer",
        when: "06/2022 — 01/2024",
        one: "Spent a year and a half building a real-time social platform.",
        note: "Group and private messaging, feed, comments, a permission system. I went into the backend too.",
        stack: ["React", "TypeScript", "socket.io", "Node.js", "Express", "MongoDB"],
      },
      {
        co: "Codeventure Bilişim",
        role: "Backend Developer Intern",
        when: "01/2022 — 06/2022",
        one: "Wrote an accounting app to a given set of requirements.",
        note: "My first professional code.",
        stack: ["Node.js", "Express", "MongoDB"],
      },
    ],
    interludeLabel: "a note in between",
    interlude:
      "People ask why I build my own things. The answer is simple — for four years I never got to decide the last millimetre of the thing I know best.",
    interludeSub:
      "When it's your own product, that millimetre stays with you. Freelance work is there for the same reason: it pays the bills and teaches me to make that call for someone else.",
    aboutLabel: "background",
    aboutTitle: "Four years of frontend, one year of my own products.",
    aboutParas: [
      "I wrote React, Next.js and TypeScript in agency and product teams. Good work, but I was always building a screen someone else had drawn.",
      "Claude Code sits in my daily flow: scaffolding, refactors, reading an unfamiliar API fast. I don't hand over architecture or review — code I haven't read doesn't get in.",
      "Frontend is still the centre of what I do. The difference is that the millimetre is my call now.",
    ],
    contactLabel: "contact",
    contactTitle: "Got an idea?",
    contactSub: "I reply the same day.",
    fName: "your name",
    fEmail: "your email",
    fMsg: "what do you want to build?",
    fNamePh: "Jane Doe",
    fEmailPh: "you@example.com",
    fMsgPh: "A couple of sentences is enough.",
    fSend: "send",
    fNote: "The form opens your mail app — nothing is stored anywhere.",
    sentTitle: "Your mail app is open.",
    sentBody: "If it didn't open, write to fatihgnc.dev@gmail.com directly.",
    again: "new message",
    iconLabels: {
      github: "My GitHub profile",
      linkedin: "My LinkedIn profile",
      cv: "Download my CV (PDF)",
      appstore: "SecretMap on the App Store",
    },
    footerB: "2026",
    mailSubject: "From your portfolio — ",
    themeToLight: "light mode",
    themeToDark: "dark mode",
  },
} as const;

export type Copy = (typeof copy)[Lang];
