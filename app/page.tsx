import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Experience from "@/components/sections/experience";
import Intro from "@/components/sections/intro";
import Work from "@/components/sections/work";
import type { ProjectCaseData } from "@/components/sections/project-case";
import FxCanvas from "@/components/ui/fx-canvas";
import Marquee from "@/components/ui/marquee";
import MdxBody from "@/components/ui/mdx-body";
import PointerGlow from "@/components/ui/pointer-glow";
import ScrollProgress from "@/components/ui/scroll-progress";
import Sidebar from "@/components/ui/sidebar";
import SiteHeader from "@/components/ui/site-header";
import SmoothScroll from "@/components/ui/smooth-scroll";
import { site } from "@/content/site";
import { getProjects } from "@/lib/mdx";

export default async function Page() {
  const projects = await getProjects();

  // MDX gövdeleri sunucuda render edilir.
  const cases: ProjectCaseData[] = projects.map((project) => ({
    slug: project.slug,
    meta: project,
    body: <MdxBody source={project.source} />,
  }));

  return (
    <SmoothScroll>
      <FxCanvas />
      <PointerGlow />
      <ScrollProgress />
      <Sidebar />
      <SiteHeader />

      <main className="ml-[var(--sb)]">
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
