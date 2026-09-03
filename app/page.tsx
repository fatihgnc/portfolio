"use client";

import { IconExternalLink } from "@tabler/icons-react";

import { useSiteState } from "@/components/providers/site-state";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import CopyEmail from "@/components/ui/copy-email";
import ProjectGallery from "@/components/ui/project-gallery";
import Sidebar from "@/components/ui/sidebar";
import { experience, formatMonth, identity, projects } from "@/content/site";

function External({ label }: { label: string }) {
  return <span className="sr-only"> {label}</span>;
}

/** "A, B, C." -> list of badges */
function TechBadges({ list, label }: { list: string; label?: string }) {
  const items = list
    .replace(/\.$/, "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
  return (
    <ul className="tech-list" aria-label={label}>
      {items.map((item) => (
        <li key={item}>
          <Badge variant="outline" className="tech-badge">
            {item}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  const { locale, t } = useSiteState();
  const jobs = experience[locale];
  // The ongoing entry gets the current month as its dateTime.
  const thisMonth = new Date().toISOString().slice(0, 7);

  return (
    <>
      <a href="#main" className="skip-link">
        {t.skip}
      </a>
      <Sidebar />

      <main id="main" className="page">
        <section id="top" aria-labelledby="hero-name">
          <h1 id="hero-name" className="hero-name">
            {identity.name}
          </h1>
          <p className="hero-role">{t.hero.role}</p>
          <p className="hero-location">{t.hero.location}</p>
          <p className="hero-positioning">{t.hero.positioning}</p>
          <div className="about-body">
            <div className="era">
              <p className="era-label">{t.about.employedLabel}</p>
              <p>{t.about.employed}</p>
            </div>
            <div className="era era-now">
              <p className="era-label">{t.about.indieLabel}</p>
              <p>{t.about.indie}</p>
              <p>{t.about.now}</p>
            </div>
            <p>{t.about.ai}</p>
            <div className="about-stack">
              <p className="about-stack-lead">{t.about.stackLead}</p>
              <TechBadges list={t.about.stack} label={t.about.stackLead} />
            </div>
          </div>
        </section>

        <section id="projects" aria-labelledby="projects-h">
          <h2 id="projects-h" className="h2 projects-h">
            {t.projects.h}
          </h2>
          <p className="projects-intro">{t.projects.intro}</p>
          <ul className="project-list">
            {projects.map((p) => (
              <li key={p.id}>
                <article aria-labelledby={p.id}>
                  <h3 id={p.id} className="project-name">
                    {p.name}
                  </h3>
                  <p className="project-meta">
                    <a
                      href={p.href ?? `https://${p.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      {p.url}
                      <IconExternalLink aria-hidden="true" className="size-3.5" />
                      <External label={t.external} />
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
                  <ProjectGallery name={p.name} shots={p.shots} locale={locale} />
                </article>
              </li>
            ))}
          </ul>
        </section>

        <section id="experience" aria-labelledby="experience-h">
          <h2 id="experience-h" className="h2 experience-h">
            {t.experience.h}
          </h2>
          <ol className="experience-list">
            {jobs.map((e) => (
              <li key={`${e.start}-${e.org}`}>
                <p className="experience-when">
                  <time dateTime={e.start}>{formatMonth(e.start, locale)}</time>
                  {" – "}
                  <time dateTime={e.end || thisMonth}>
                    {formatMonth(e.end, locale) ?? t.experience.present}
                  </time>
                </p>
                <div className="experience-body">
                  <h3 className="experience-title">{e.title}</h3>
                  <p className="experience-org">
                    {e.org}
                    {e.place ? `, ${e.place}` : null}
                  </p>
                  <ul className="experience-bullets">
                    {e.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="contact" aria-labelledby="contact-h">
          <h2 id="contact-h" className="h2">
            {t.contact.h}
          </h2>
          <p className="contact-intro">{t.contact.intro}</p>
          <dl className="contact-list">
            <dt>{t.contact.email}</dt>
            <dd className="contact-email">
              <a href={`mailto:${identity.email}`}>{identity.email}</a>
              <CopyEmail />
            </dd>
            <dt>{t.contact.phone}</dt>
            <dd>
              <a href={identity.phoneHref} className="plain">
                {identity.phone}
              </a>
            </dd>
            <dt>{t.contact.location}</dt>
            <dd>{t.hero.location}</dd>
          </dl>
        </section>
      </main>

      <footer className="site-footer">{t.footer}</footer>
    </>
  );
}
