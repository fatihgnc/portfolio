import TechBadges from "@/components/sections/tech-badges";
import { identity, type Messages } from "@/content/site";

export default function Hero({ t }: { t: Messages }) {
  return (
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
  );
}
