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
import { useEffect, useState } from "react";

import { useSiteState } from "@/components/providers/site-state";
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
import { identity, type Locale } from "@/content/site";
import { cn } from "@/lib/utils";

const NAV = [
  { id: "top", key: "1", label: "home", Icon: IconHome },
  { id: "projects", key: "2", label: "projects", Icon: IconFolder },
  { id: "experience", key: "3", label: "experience", Icon: IconBriefcase },
  { id: "contact", key: "4", label: "contact", Icon: IconMail },
] as const;

function go(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Tracks the visible section: the last one whose top is above 40% of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
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
  }, []);

  return active;
}

const itemClass =
  "flex w-full items-center gap-3 rounded-lg px-2.5 py-1.5 text-[15px] text-foreground no-underline transition-colors hover:bg-accent [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-muted-foreground hover:[&>svg]:text-foreground";

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  const { theme, locale, t, toggleTheme, setLocale } = useSiteState();
  const active = useActiveSection();

  const online = [
    { label: t.links.github, href: identity.github, Icon: IconBrandGithub, external: true },
    { label: t.links.linkedin, href: identity.linkedin, Icon: IconBrandLinkedin, external: true },
    { label: t.links.email, href: `mailto:${identity.email}`, Icon: IconMail, external: false },
    { label: t.links.cv, href: identity.cv, Icon: IconFileText, external: true },
  ];

  const LangButton = ({ value }: { value: Locale }) => (
    <Button
      variant="ghost"
      size="xs"
      aria-pressed={locale === value}
      onClick={() => setLocale(value)}
      className={cn(
        "h-6 px-1.5 text-[13px] leading-none font-semibold text-muted-foreground hover:bg-transparent hover:text-foreground",
        locale === value && "text-foreground",
      )}
    >
      {value.toUpperCase()}
    </Button>
  );

  return (
    <div className="flex h-full flex-col gap-1 p-3.5 pt-5">
      <div className="flex items-center gap-3 px-2 pb-3">
        <Avatar className="size-11">
          <AvatarImage src="/profile.jpg" alt="" />
          <AvatarFallback>FG</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-[15px] leading-tight font-semibold">{identity.name}</p>
          <p className="truncate text-sm leading-snug text-muted-foreground">{t.hero.role}</p>
        </div>
      </div>

      <nav aria-label={t.navLabel} className="flex flex-col gap-1">
        {NAV.map(({ id, key, label, Icon }) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-current={isActive ? "true" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go(id);
                onNavigate?.();
              }}
              className={cn(
                itemClass,
                isActive && "bg-accent font-semibold [&>svg]:text-primary",
              )}
            >
              <Icon />
              <span className="flex-1">{t.nav[label]}</span>
              <Badge
                variant={isActive ? "default" : "secondary"}
                className="h-5 min-w-5 justify-center rounded px-1 font-mono text-[11px] tabular-nums"
              >
                {key}
              </Badge>
            </a>
          );
        })}
      </nav>

      <Separator className="my-3" />

      <p className="px-2.5 pb-1 text-sm text-muted-foreground">{t.online}</p>
      <ul className="flex flex-col gap-1">
        {online.map(({ label, href, Icon, external }) => (
          <li key={href}>
            <a
              href={href}
              className={itemClass}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <Icon />
              <span className="flex-1">{label}</span>
              <IconArrowUpRight className="!size-3.5" />
              {external ? <span className="sr-only"> {t.external}</span> : null}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between gap-3 px-1.5 pt-3">
        <div role="group" aria-label={t.localeLabel} className="flex items-center gap-0.5">
          <LangButton value="tr" />
          <span aria-hidden="true" className="select-none text-[13px] leading-none text-border">
            |
          </span>
          <LangButton value="en" />
        </div>
        <Switch
          checked={theme === "dark"}
          onCheckedChange={toggleTheme}
          aria-label={t.themeLabel}
          size="lg"
          thumbIcon={
            theme === "dark" ? (
              <IconMoon className="size-3" />
            ) : (
              <IconSun className="size-3" />
            )
          }
        />
      </div>
    </div>
  );
}

export default function Sidebar() {
  const { t } = useSiteState();
  const [open, setOpen] = useState(false);

  // Keys 1-4 jump to sections; disabled inside form fields.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const item = NAV.find((n) => n.key === e.key);
      if (item) go(item.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* narrow screens: top bar + drawer */}
      <div className="sticky top-0 z-30 flex h-[var(--topbar-h)] items-center justify-between border-b border-border bg-background px-[var(--gut)] text-[15px] font-semibold min-[900px]:hidden">
        <span>{identity.name}</span>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={<Button variant="ghost" size="icon" aria-label={t.menu} />}
          >
            <IconMenu2 className="size-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-[var(--sb)] bg-sidebar p-0">
            <SheetTitle className="sr-only">{t.navLabel}</SheetTitle>
            <SheetDescription className="sr-only">{t.menu}</SheetDescription>
            <SidebarBody onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* wide screens: fixed left panel */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[var(--sb)] overflow-y-auto border-r border-border bg-sidebar transition-colors min-[900px]:block">
        <SidebarBody />
      </aside>
    </>
  );
}
