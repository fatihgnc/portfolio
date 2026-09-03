// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import TechBadges from "./tech-badges";

describe("TechBadges", () => {
  it("renders one badge per stack item, in order", () => {
    render(<TechBadges list="Next.js, TypeScript, Tailwind CSS." label="Stack" />);

    const list = screen.getByRole("list", { name: "Stack" });
    const items = screen.getAllByRole("listitem");

    expect(list).toBeInTheDocument();
    expect(items.map((li) => li.textContent)).toEqual([
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ]);
  });

  it("drops empty entries from stray commas", () => {
    render(<TechBadges list="React,, Next.js" />);

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
