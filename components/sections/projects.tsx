import { IconArrowRight, IconExternalLink } from "@tabler/icons-react";
import Link from "next/link";

import TechBadges from "@/components/sections/tech-badges";
import { Separator } from "@/components/ui/separator";
import ProjectGallery from "@/components/ui/project-gallery";
import { paths, projectHref, projects, type Locale, type Messages } from "@/content/site";

export default function Projects({ locale, t }: { locale: Locale; t: Messages }) {
  return (
    <section id="projects" aria-labelledby="projects-h">
      <h2 id="projects-h" className="h2 projects-h">
        {t.projects.h}
      </h2>
      <p className="projects-intro">{t.projects.intro}</p>
      <ul className="project-list">
        {projects.map((p) => {
          const page = paths.project(locale, p.slug);
          return (
            <li key={p.id}>
              <article aria-labelledby={p.id}>
                <h3 id={p.id} className="project-name">
                  <Link href={page}>{p.name}</Link>
                </h3>
                <p className="project-meta">
                  <a
                    href={projectHref(p)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    {p.url}
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
                  <span className="live">{t.projects.platform[p.platform]}</span>
                </p>
                <Separator className="project-rule" />
                <p className="project-desc">{p.description[locale]}</p>
                <TechBadges list={p.stack} />
                <ProjectGallery
                  name={p.name}
                  shots={p.shots}
                  locale={locale}
                  copy={t.gallery}
                />
                <p className="project-more">
                  <Link href={page}>
                    <span>
                      {t.projects.more}
                      <span className="sr-only">: {p.name}</span>
                    </span>
                    <IconArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </p>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
