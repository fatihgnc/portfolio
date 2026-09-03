import { messages, projectBySlug, projects } from "@/content/site";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = messages.tr.projects.h;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug(slug);

  return ogImage({
    kicker: messages.tr.project.kicker,
    title: project?.name ?? "Fatih Genç",
    subtitle: project?.tagline.tr ?? messages.tr.meta.ogDescription,
  });
}
