import { experience, formatMonth, type Locale, type Messages } from "@/content/site";

export default function Experience({ locale, t }: { locale: Locale; t: Messages }) {
  // The ongoing entry gets the current month as its dateTime.
  const thisMonth = new Date().toISOString().slice(0, 7);

  return (
    <section id="experience" aria-labelledby="experience-h">
      <h2 id="experience-h" className="h2 experience-h">
        {t.experience.h}
      </h2>
      <ol className="experience-list">
        {experience[locale].map((e) => (
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
  );
}
