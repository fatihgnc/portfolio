import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

/** Case study'lerin sayfadaki sırası — dosya adı (slug) ile. */
export const PROJECT_SLUGS = ["secret-map", "mamamix", "secretmap-dev"] as const;

export type ProjectSlug = (typeof PROJECT_SLUGS)[number];

export type ProjectMeta = {
  /** "01", "02" … tasarımdaki numara */
  order: string;
  title: string;
  meta: string;
  /** tek cümlelik özet — büyük punto */
  one: string;
  stack: string[];
  link: string;
  href: string;
  /** görsel yerine geçen not */
  shot: string;
  /** varsa kartta gösterilen ekran görüntüsü (public altındaki yol) */
  image?: string;
};

/** Frontmatter + gövde kaynağı; gövde sunucuda MDX olarak render edilir. */
export type ProjectDoc = ProjectMeta & { source: string };

export type Project = { slug: ProjectSlug } & ProjectDoc;

function toMeta(data: Record<string, unknown>, file: string): ProjectMeta {
  const stack = data.stack;
  if (!Array.isArray(stack)) {
    throw new Error(`${file}: frontmatter "stack" bir dizi olmalı`);
  }

  for (const key of ["order", "title", "meta", "one", "link", "href", "shot"]) {
    if (typeof data[key] !== "string") {
      throw new Error(`${file}: frontmatter "${key}" eksik`);
    }
  }

  const image = data.image;
  if (image !== undefined && typeof image !== "string") {
    throw new Error(`${file}: frontmatter "image" bir yol olmalı`);
  }

  return {
    order: data.order as string,
    title: data.title as string,
    meta: data.meta as string,
    one: data.one as string,
    stack: stack.map(String),
    link: data.link as string,
    href: data.href as string,
    shot: data.shot as string,
    ...(image ? { image } : {}),
  };
}

async function readProjectDoc(slug: ProjectSlug): Promise<ProjectDoc> {
  const file = `${slug}.mdx`;
  const raw = await fs.readFile(path.join(PROJECTS_DIR, file), "utf8");
  const { content, data } = matter(raw);

  return { ...toMeta(data, file), source: content };
}

/** Tüm case study'leri okur. */
export async function getProjects(): Promise<Project[]> {
  return Promise.all(
    PROJECT_SLUGS.map(async (slug) => ({
      slug,
      ...(await readProjectDoc(slug)),
    })),
  );
}
