import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

import { LANGS, type Lang } from "@/content/site";

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
};

/** Frontmatter + gövde kaynağı; gövde sunucuda MDX olarak render edilir. */
export type ProjectDoc = ProjectMeta & { source: string };

export type Project = { slug: ProjectSlug } & Record<Lang, ProjectDoc>;

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

  return {
    order: data.order as string,
    title: data.title as string,
    meta: data.meta as string,
    one: data.one as string,
    stack: stack.map(String),
    link: data.link as string,
    href: data.href as string,
    shot: data.shot as string,
  };
}

async function readProjectDoc(
  slug: ProjectSlug,
  lang: Lang,
): Promise<ProjectDoc> {
  const file = `${slug}.${lang}.mdx`;
  const raw = await fs.readFile(path.join(PROJECTS_DIR, file), "utf8");
  const { content, data } = matter(raw);

  return { ...toMeta(data, file), source: content };
}

/** Tüm case study'leri iki dilde birden okur — dil değişimi istemcide anlık. */
export async function getProjects(): Promise<Project[]> {
  return Promise.all(
    PROJECT_SLUGS.map(async (slug) => {
      const [tr, en] = await Promise.all(
        LANGS.map((lang) => readProjectDoc(slug, lang)),
      );
      return { slug, tr: tr!, en: en! };
    }),
  );
}
