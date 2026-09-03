// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import CopyEmail from "./index";

describe("CopyEmail", () => {
  const writeText = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    writeText.mockClear();
    vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText } });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("copies the e-mail and shows the 'copied' label, then reverts", async () => {
    vi.useFakeTimers();
    render(<CopyEmail email="me@example.com" copy="Copy" copied="Copied" />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Copy" }));
      await Promise.resolve();
    });

    expect(writeText).toHaveBeenCalledWith("me@example.com");
    expect(screen.getByRole("button", { name: "Copied" })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1800);
    });
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();
  });

  it("still shows 'copied' when the clipboard write rejects", async () => {
    writeText.mockRejectedValueOnce(new Error("denied"));
    render(<CopyEmail email="me@example.com" copy="Copy" copied="Copied" />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Copy" }));
      await Promise.resolve();
    });

    expect(screen.getByRole("button", { name: "Copied" })).toBeInTheDocument();
  });
});
