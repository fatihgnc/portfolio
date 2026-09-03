import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProjectPage from "@/components/pages/project";
import { messages, paths, projectBySlug, projects } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};

  return pageMetadata({
    locale: "en",
    path: (l) => paths.project(l, project.slug),
    title: project.name,
    ogTitle: `${project.name} — ${messages.en.meta.projectTitleTail}`,
    description: project.tagline.en,
    type: "article",
  });
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  return <ProjectPage locale="en" project={project} />;
}
