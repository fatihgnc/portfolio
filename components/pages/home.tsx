import JsonLd from "@/components/json-ld";
import Contact from "@/components/sections/contact";
import Experience from "@/components/sections/experience";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import Sidebar from "@/components/ui/sidebar";
import { messages, paths, sidebarCopy, type Locale } from "@/content/site";
import { homeJsonLd, otherLocale } from "@/lib/seo";

export default function HomePage({ locale }: { locale: Locale }) {
  const t = messages[locale];

  return (
    <>
      <a href="#main" className="skip-link">
        {t.skip}
      </a>
      <Sidebar
        copy={sidebarCopy(locale)}
        locale={locale}
        homeHref={paths.home(locale)}
        altHref={paths.home(otherLocale(locale))}
        spy
      />

      <main id="main" className="page">
        <Hero t={t} />
        <Projects locale={locale} t={t} />
        <Experience locale={locale} t={t} />
        <Contact t={t} />
      </main>

      <footer className="site-footer">{t.footer}</footer>
      <JsonLd data={homeJsonLd(locale)} />
    </>
  );
}
