import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Experience from "@/components/sections/experience";
import Intro from "@/components/sections/intro";
import Work from "@/components/sections/work";
import type { ProjectCaseData } from "@/components/sections/project-case";
import Marquee from "@/components/ui/marquee";
import MdxBody from "@/components/ui/mdx-body";
import PointerGlow from "@/components/ui/pointer-glow";
import ScrollProgress from "@/components/ui/scroll-progress";
import SiteHeader from "@/components/ui/site-header";
import SmoothScroll from "@/components/ui/smooth-scroll";
import { site } from "@/content/site";
import { getProjects } from "@/lib/mdx";

export default async function Page() {
  const projects = await getProjects();

  // MDX gövdeleri sunucuda render edilir, istemci sadece dili seçer.
  const cases: ProjectCaseData[] = projects.map(({ slug, tr, en }) => ({
    slug,
    meta: { tr, en },
    body: {
      tr: <MdxBody source={tr.source} />,
      en: <MdxBody source={en.source} />,
    },
  }));

  return (
    <SmoothScroll>
      <PointerGlow />
      <ScrollProgress />
      <SiteHeader />

      <main>
        <Intro />
        <Marquee text={site.ticker} />
        <Work cases={cases} />
        <Experience />
        <About />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
