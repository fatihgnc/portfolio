import CopyEmail from "@/components/ui/copy-email";
import { identity, type Messages } from "@/content/site";

export default function Contact({ t }: { t: Messages }) {
  return (
    <section id="contact" aria-labelledby="contact-h">
      <h2 id="contact-h" className="h2">
        {t.contact.h}
      </h2>
      <p className="contact-intro">{t.contact.intro}</p>
      <dl className="contact-list">
        <dt>{t.contact.email}</dt>
        <dd className="contact-email">
          <a href={`mailto:${identity.email}`}>{identity.email}</a>
          <CopyEmail email={identity.email} copy={t.contact.copy} copied={t.contact.copied} />
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
  );
}
