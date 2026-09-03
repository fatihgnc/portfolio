"use client";

import {
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBriefcase,
  IconFileText,
  IconFolder,
  IconHome,
  IconMail,
  IconMenu2,
  IconMoon,
  IconSun,
} from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useTheme } from "@/components/providers/theme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { identity, LOCALES, paths, type Locale, type SidebarCopy } from "@/content/site";
import { cn } from "@/lib/utils";

const NAV = [
  { id: "top", key: "1", label: "home", Icon: IconHome },
  { id: "projects", key: "2", label: "projects", Icon: IconFolder },
  { id: "experience", key: "3", label: "experience", Icon: IconBriefcase },
  { id: "contact", key: "4", label: "contact", Icon: IconMail },
] as const;

export type SidebarProps = {
  copy: SidebarCopy;
  locale: Locale;
  /** home of the current locale: "/" or "/tr" */
  homeHref: string;
  /** this same page in the other locale */
  altHref: string;
  /**
   * On the home page the nav scrolls between sections and highlights the
   * visible one; anywhere else the same items are plain links back home.
   */
  spy: boolean;
};

function go(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Tracks the visible section: the last one whose top is above 40% of the viewport. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    if (!enabled) return;
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const pick = () => {
      const line = window.innerHeight * 0.4;
      let current = sections[0].id;
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = sections[sections.length - 1].id;
      setActive(current);
    };

    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, [enabled]);

  return enabled ? active : null;
}

const itemClass =
  "flex w-full items-center gap-3 rounded-lg px-2.5 py-1.5 text-[15px] text-foreground no-underline transition-colors hover:bg-accent [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-muted-foreground hover:[&>svg]:text-foreground";

function SidebarBody({
  copy,
  locale,
  homeHref,
  altHref,
  spy,
  onNavigate,
}: SidebarProps & { onNavigate?: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const active = useActiveSection(spy);

  const links = [
    { label: copy.links.github, href: identity.github, Icon: IconBrandGithub, external: true },
    {
      label: copy.links.linkedin,
      href: identity.linkedin,
      Icon: IconBrandLinkedin,
      external: true,
    },
    { label: copy.links.email, href: `mailto:${identity.email}`, Icon: IconMail, external: false },
    // The CV is a PDF: opened in its own tab, and kept out of the index.
    { label: copy.links.cv, href: identity.cv, Icon: IconFileText, external: true, nofollow: true },
  ];

  return (
    <div className="flex h-full flex-col gap-1 p-3.5 pt-5">
      <div className="flex items-center gap-3 px-2 pb-3">
        <Avatar className="size-11">
          <AvatarImage src={identity.photo} alt={`${identity.name}, ${copy.role}`} />
          <AvatarFallback>FG</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-[15px] leading-tight font-semibold">{identity.name}</p>
          <p className="truncate text-sm leading-snug text-muted-foreground">{copy.role}</p>
        </div>
      </div>

      <nav aria-label={copy.navLabel} className="flex flex-col gap-1">
        {NAV.map(({ id, key, label, Icon }) => {
          const isActive = active === id;
          const className = cn(
            itemClass,
            isActive && "bg-accent font-semibold [&>svg]:text-primary",
          );
          const inner = (
            <>
              <Icon />
              <span className="flex-1">{copy.nav[label]}</span>
              <Badge
                variant={isActive ? "default" : "secondary"}
                className="h-5 min-w-5 justify-center rounded px-1 font-mono text-[11px] tabular-nums"
              >
                {key}
              </Badge>
            </>
          );

          return spy ? (
            <a
              key={id}
              href={`#${id}`}
              aria-current={isActive ? "true" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go(id);
                onNavigate?.();
              }}
              className={className}
            >
              {inner}
            </a>
          ) : (
            <Link
              key={id}
              href={id === "top" ? homeHref : paths.section(locale, id)}
              onClick={() => onNavigate?.()}
              className={className}
            >
              {inner}
            </Link>
          );
        })}
      </nav>

      <Separator className="my-3" />

      <p className="px-2.5 pb-1 text-sm text-muted-foreground">{copy.linksLabel}</p>
      <ul className="flex flex-col gap-1">
        {links.map(({ label, href, Icon, external, nofollow }) => (
          <li key={href}>
            <a
              href={href}
              className={itemClass}
              {...(external
                ? {
                    target: "_blank",
                    rel: nofollow ? "noopener noreferrer nofollow" : "noopener noreferrer",
                  }
                : {})}
            >
              <Icon />
              <span className="flex-1">{label}</span>
              <IconArrowUpRight className="!size-3.5" />
              {external ? <span className="sr-only"> {copy.external}</span> : null}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between gap-3 px-1.5 pt-3">
        {/* Locale is a URL, so these are real links: crawlable and shareable. */}
        <div aria-label={copy.localeLabel} className="flex items-center gap-0.5">
          {LOCALES.map((value, i) => {
            const isCurrent = value === locale;
            return (
              <span key={value} className="flex items-center gap-0.5">
                {i > 0 ? (
                  <span
                    aria-hidden="true"
                    className="select-none text-[13px] leading-none text-border"
                  >
                    |
                  </span>
                ) : null}
                <a
                  href={isCurrent ? undefined : altHref}
                  hrefLang={value}
                  aria-current={isCurrent ? "true" : undefined}
                  className={cn(
                    "rounded px-1.5 py-0.5 text-[13px] leading-none font-semibold no-underline transition-colors",
                    isCurrent ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {value.toUpperCase()}
                </a>
              </span>
            );
          })}
        </div>
        <Switch
          checked={theme === "dark"}
          onCheckedChange={toggleTheme}
          aria-label={copy.themeLabel}
          size="lg"
          thumbIcon={
            theme === "dark" ? <IconMoon className="size-3" /> : <IconSun className="size-3" />
          }
        />
      </div>
    </div>
  );
}

export default function Sidebar(props: SidebarProps) {
  const [open, setOpen] = useState(false);
  const { copy, spy } = props;

  // Keys 1-4 jump to sections; only meaningful on the page that has them.
  useEffect(() => {
    if (!spy) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const item = NAV.find((n) => n.key === e.key);
      if (item) go(item.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [spy]);

  return (
    <>
      {/* narrow screens: top bar + drawer */}
      <div className="sticky top-0 z-30 flex h-[var(--topbar-h)] items-center justify-between border-b border-border bg-background px-[var(--gut)] text-[15px] font-semibold min-[900px]:hidden">
        <span>{identity.name}</span>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger render={<Button variant="ghost" size="icon" aria-label={copy.menu} />}>
            <IconMenu2 className="size-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-[var(--sb)] bg-sidebar p-0">
            <SheetTitle className="sr-only">{copy.navLabel}</SheetTitle>
            <SheetDescription className="sr-only">{copy.menu}</SheetDescription>
            <SidebarBody {...props} onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* wide screens: fixed left panel */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[var(--sb)] overflow-y-auto border-r border-border bg-sidebar transition-colors min-[900px]:block">
        <SidebarBody {...props} />
      </aside>
    </>
  );
}
