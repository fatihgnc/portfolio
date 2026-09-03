import { describe, expect, it } from "vitest";

import { paths, projectBySlug, projectHref, projects, stackList } from "./site";

describe("paths", () => {
  it("keeps English at the root", () => {
    expect(paths.home("en")).toBe("/");
    expect(paths.section("en", "projects")).toBe("/#projects");
    expect(paths.project("en", "secretmap")).toBe("/projects/secretmap");
  });

  it("prefixes Turkish and translates the project segment", () => {
    expect(paths.home("tr")).toBe("/tr");
    expect(paths.section("tr", "projects")).toBe("/tr#projects");
    expect(paths.project("tr", "secretmap")).toBe("/tr/projeler/secretmap");
  });
});

describe("projectHref", () => {
  it("falls back to the url as an https address", () => {
    expect(projectHref({ url: "example.com" } as never)).toBe("https://example.com");
  });

  it("prefers an explicit href when set", () => {
    expect(
      projectHref({ url: "example.com", href: "https://apps.apple.com/x" } as never),
    ).toBe("https://apps.apple.com/x");
  });
});

describe("stackList", () => {
  it("splits a trailing-dot, comma-separated stack into trimmed items", () => {
    expect(stackList("Next.js, TypeScript, Tailwind CSS.")).toEqual([
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ]);
  });

  it("drops empty entries from stray commas", () => {
    expect(stackList("React,, Next.js")).toEqual(["React", "Next.js"]);
  });
});

describe("projectBySlug", () => {
  it("finds a project that exists", () => {
    expect(projectBySlug("secretmap")?.name).toBe("SecretMap Landing");
  });

  it("returns undefined for an unknown slug", () => {
    expect(projectBySlug("does-not-exist")).toBeUndefined();
  });
});

describe("projects", () => {
  it("has a unique slug per project", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
