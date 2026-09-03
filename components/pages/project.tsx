import { IconExternalLink } from "@tabler/icons-react";
import Link from "next/link";

import JsonLd from "@/components/json-ld";
import TechBadges from "@/components/sections/tech-badges";
import ProjectGallery from "@/components/ui/project-gallery";
import { Separator } from "@/components/ui/separator";
import Sidebar from "@/components/ui/sidebar";
import {
  messages,
  paths,
  projectHref,
  projects,
  sidebarCopy,
  type Locale,
  type Project,
} from "@/content/site";
import { otherLocale, projectJsonLd } from "@/lib/seo";

export default function ProjectPage({
  locale,
  project,
}: {
  locale: Locale;
  project: Project;
}) {
  const t = messages[locale];
  const home = paths.home(locale);
  const others = projects.filter((p) => p.slug !== project.slug);
  const visit = project.platform === "ios" ? t.project.visitIos : t.project.visitWeb;

  return (
    <>
      <a href="#main" className="skip-link">
        {t.skip}
      </a>
      <Sidebar
        copy={sidebarCopy(locale)}
        locale={locale}
        homeHref={home}
        altHref={paths.project(otherLocale(locale), project.slug)}
        spy={false}
      />

      <main id="main" className="page project-page">
        <nav aria-label={t.project.kicker} className="crumbs">
          <ol>
            <li>
              <Link href={home}>{t.project.home}</Link>
            </li>
            <li>
              <Link href={paths.section(locale, "projects")}>{t.projects.h}</Link>
            </li>
            <li aria-current="page">{project.name}</li>
          </ol>
        </nav>

        <header className="project-head">
          <p className="project-kicker">{t.project.kicker}</p>
          <h1 className="project-title">{project.name}</h1>
          <p className="project-lede">{project.tagline[locale]}</p>
          <p className="project-meta">
            <a
              href={projectHref(project)}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              {project.url}
              <IconExternalLink aria-hidden="true" className="size-3.5" />
              <span className="sr-only"> {t.external}</span>
            </a>
            <span className="dot-sep" aria-hidden="true">
              ·
            </span>
            <span className="live">{t.projects.live}</span>
            <span className="dot-sep" aria-hidden="true">
              ·
            </span>
            <span className="live">{t.projects.platform[project.platform]}</span>
          </p>
        </header>

        <Separator className="project-rule" />

        <section aria-labelledby="overview-h">
          <h2 id="overview-h" className="h2">
            {t.project.overview}
          </h2>
          <p className="project-desc pretty">{project.description[locale]}</p>
          <p className="project-visit">
            <a href={projectHref(project)} target="_blank" rel="noopener noreferrer">
              {visit}
              <IconExternalLink aria-hidden="true" className="size-4" />
            </a>
          </p>
        </section>

        <section aria-labelledby="stack-h">
          <h2 id="stack-h" className="h2">
            {t.project.stack}
          </h2>
          <TechBadges list={project.stack} label={t.project.stack} />
        </section>

        <section aria-labelledby="shots-h">
          <h2 id="shots-h" className="h2">
            {t.project.screenshots}
          </h2>
          <ProjectGallery
            name={project.name}
            shots={project.shots}
            locale={locale}
            copy={t.gallery}
          />
        </section>

        <section aria-labelledby="other-h">
          <h2 id="other-h" className="h2">
            {t.project.other}
          </h2>
          <ul className="other-list">
            {others.map((p) => (
              <li key={p.slug}>
                <Link href={paths.project(locale, p.slug)}>
                  <span className="other-name">{p.name}</span>
                  <span className="other-tagline">{p.tagline[locale]}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="project-visit">
            <Link href={paths.section(locale, "projects")}>{t.project.back}</Link>
          </p>
        </section>
      </main>

      <footer className="site-footer">{t.footer}</footer>
      <JsonLd data={projectJsonLd(project, locale)} />
    </>
  );
}
