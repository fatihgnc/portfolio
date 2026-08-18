/**
 * Site geneli içerik. Case study metinleri MDX'te (content/projects),
 * geri kalan arayüz metinleri burada. Site tek dilli: İngilizce.
 */

import type { IconName } from "@/components/ui/icons";

export type Theme = "dark" | "light";

export type NavItem = {
  /** bölüm id'si; "top" sayfa başı demek */
  id: "top" | "work" | "experience" | "about" | "contact";
  /** klavye kısayolu */
  key: string;
  label: string;
};

export const nav: NavItem[] = [
  { id: "top", key: "1", label: "Start" },
  { id: "work", key: "2", label: "Work" },
  { id: "experience", key: "3", label: "Experience" },
  { id: "about", key: "4", label: "Background" },
  { id: "contact", key: "5", label: "Contact" },
];

export type SocialLink = {
  icon: IconName;
  label: string;
  value: string;
  href: string;
  /** dolu ise indirme */
  download?: string;
};

/** Sidebar'daki bağlantı listesi. */
export const social: SocialLink[] = [
  {
    icon: "github",
    label: "GitHub",
    value: "fatihgnc",
    href: "https://github.com/fatihgnc",
  },
  {
    icon: "linkedin",
    label: "LinkedIn",
    value: "in/fatihgnc",
    href: "https://linkedin.com/in/fatihgnc",
  },
  {
    icon: "appstore",
    label: "App Store",
    value: "SecretMap",
    href: "#",
  },
  {
    icon: "mail",
    label: "Email",
    value: "fatihgnc.dev@gmail.com",
    href: "mailto:fatihgnc.dev@gmail.com",
  },
  {
    icon: "cv",
    label: "CV",
    value: "download as PDF",
    href: "/fatih-genc-cv.pdf",
    download: "Fatih-Genc-Frontend-Developer-CV.pdf",
  },
];

export type SiteLink = {
  value: string;
  href: string;
  /** dolu ise link indirme olarak davranır; değer indirilen dosya adıdır */
  download?: string;
  /** ikon şeridindeki görsel */
  icon?: IconName;
  /** ikon şeridinde ikon yerine bu metin gösterilir (ör. "CV") */
  iconText?: string;
};

/** Footer'daki ikon şeridi. */
const links: SiteLink[] = [
  {
    value: "github.com/fatihgnc",
    href: "https://github.com/fatihgnc",
    icon: "github",
  },
  {
    value: "in/fatihgnc",
    href: "https://linkedin.com/in/fatihgnc",
    icon: "linkedin",
  },
  {
    value: "SecretMap",
    href: "#",
    icon: "appstore",
  },
  {
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
  /** kayan şeritteki terimler */
  ticker: [
    "React",
    "React Native",
    "Next.js",
    "Tailwind",
    "Node.js",
    "MongoDB",
    "Supabase",
    "Claude Code",
    "Cursor",
  ],
  links,
  tools: [
    { label: "interface", items: "React · Next.js · TypeScript · Tailwind" },
    { label: "mobile", items: "Swift · SwiftUI · MapKit · CoreLocation" },
    { label: "backend", items: "Supabase · Postgres · next-intl" },
    { label: "desk", items: "VS Code · Xcode · Figma · Claude Code · Vercel" },
  ],
} as const;

export const copy = {
  role: "frontend & indie mobile developer",
  heroL1: "Fatih",
  heroL2: "Genç",
  heroSub:
    "For four years I built other people's products. Last year I started building my own.",
  status: [
    { k: "SecretMap", v: "in App Store review" },
    { k: "secretmap.dev", v: "live" },
    { k: "mamamix.com.tr", v: "in testing" },
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
      stack: [
        "React",
        "TypeScript",
        "Redux",
        "RTK Query",
        "Stripe",
        "chart.js",
        "Sentry",
      ],
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
  onlineLabel: "online",
  navLabel: "page",
  menuLabel: "menu",
  iconLabels: {
    github: "My GitHub profile",
    linkedin: "My LinkedIn profile",
    mail: "Send me an e-mail",
    cv: "Download my CV (PDF)",
    appstore: "SecretMap on the App Store",
  },
  footerB: "2026",
  mailSubject: "From your portfolio — ",
  themeToLight: "light mode",
  themeToDark: "dark mode",
} as const;

export type Copy = typeof copy;
