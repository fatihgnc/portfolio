import { describe, expect, it } from "vitest";

import { abs, otherLocale } from "./seo";

describe("otherLocale", () => {
  it("swaps en and tr", () => {
    expect(otherLocale("en")).toBe("tr");
    expect(otherLocale("tr")).toBe("en");
  });
});

describe("abs", () => {
  it("resolves a relative path against the canonical origin", () => {
    expect(abs("/projects/secretmap")).toBe(
      "https://fatihgenc.dev/projects/secretmap",
    );
  });

  it("resolves the root path", () => {
    expect(abs("/")).toBe("https://fatihgenc.dev/");
  });
});
