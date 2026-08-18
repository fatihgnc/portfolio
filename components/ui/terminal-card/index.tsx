"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useSiteState } from "@/components/providers/site-state";
import { nav, site, social } from "@/content/site";
import { scrollToSection } from "@/lib/scroll";

type Line = { kind: "in" | "out" | "dim"; text: string };

const PROMPT = "fato@portfolio:~$";

/** İki sütunlu çıktı — sağ sütun hizalansın diye tek satırda birleştirilir. */
function pad(left: string, right: string, width = 22) {
  return `${left.padEnd(width, " ")}${right}`;
}

export default function TerminalCard({ className }: { className?: string }) {
  const { t, theme, toggleTheme } = useSiteState();
  const [lines, setLines] = useState<Line[]>([
    { kind: "dim", text: 'type "help" to see what this thing knows' },
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  // yeni çıktı geldiğinde en alta kaydır
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [lines]);

  const run = useCallback(
    (raw: string): Line[] => {
      const [command, ...args] = raw.trim().toLowerCase().split(/\s+/);

      switch (command) {
        case "help":
          return [
            { kind: "out", text: pad("help", "this list") },
            { kind: "out", text: pad("whoami", "who is typing") },
            { kind: "out", text: pad("status", "what is live right now") },
            { kind: "out", text: pad("stack", "tools I work with") },
            { kind: "out", text: pad("work", "the three shipped things") },
            { kind: "out", text: pad("contact", "how to reach me") },
            { kind: "out", text: pad("cv", "open my CV") },
            { kind: "out", text: pad("go <section>", "jump: work, experience, about, contact") },
            { kind: "out", text: pad("theme", "flip dark / light") },
            { kind: "out", text: pad("clear", "wipe the screen") },
          ];

        case "whoami":
          return [
            { kind: "out", text: `${site.name} — ${t.role}` },
            { kind: "dim", text: t.heroSub },
          ];

        case "status":
          return t.status.map((row) => ({
            kind: "out" as const,
            text: pad(row.k, row.v),
          }));

        case "stack":
        case "tools":
          return site.tools.map((group) => ({
            kind: "out" as const,
            text: pad(group.label, group.items, 12),
          }));

        case "work":
        case "projects":
          return [
            { kind: "out", text: pad("SecretMap", "iOS · my own product") },
            { kind: "out", text: pad("mamamix", "web · freelance") },
            { kind: "out", text: pad("secretmap.dev", "web · side piece") },
            { kind: "dim", text: 'run "go work" to read the case studies' },
          ];

        case "contact":
          return social
            .filter((item) => item.icon !== "cv")
            .map((item) => ({
              kind: "out" as const,
              text: pad(item.label.toLowerCase(), item.value),
            }));

        case "cv": {
          window.open("/fatih-genc-cv.pdf", "_blank", "noopener");
          return [{ kind: "out", text: "opening fatih-genc-cv.pdf" }];
        }

        case "go": {
          const target = args[0];
          const hit = nav.find((item) => item.id === target);
          if (!hit) {
            return [
              {
                kind: "out",
                text: `go: unknown section "${args[0] ?? ""}" — try work, experience, about, contact`,
              },
            ];
          }
          scrollToSection(hit.id, -12);
          return [{ kind: "dim", text: `scrolling to ${hit.label.toLowerCase()}` }];
        }

        case "theme":
          toggleTheme();
          return [
            {
              kind: "out",
              text: `theme: ${theme === "dark" ? "light" : "dark"}`,
            },
          ];

        case "clear":
          return [];

        case "":
          return [];

        default:
          return [
            { kind: "out", text: `${command}: command not found` },
            { kind: "dim", text: 'try "help"' },
          ];
      }
    },
    [t, theme, toggleTheme],
  );

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const raw = value;
    setValue("");

    if (raw.trim()) {
      setHistory((prev) => [raw, ...prev]);
      setCursor(-1);
    }

    if (raw.trim().toLowerCase() === "clear") {
      setLines([]);
      return;
    }

    // komut güncelleyicinin dışında çalışmalı: React updater'ı iki kez
    // çağırabiliyor, yan etkiler (tema, indirme, kaydırma) tekrarlanmasın.
    const output = run(raw);
    setLines((prev) => [...prev, { kind: "in", text: raw }, ...output]);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    if (!history.length) return;

    event.preventDefault();
    const next =
      event.key === "ArrowUp"
        ? Math.min(cursor + 1, history.length - 1)
        : Math.max(cursor - 1, -1);

    setCursor(next);
    setValue(next === -1 ? "" : history[next]!);
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={`w-[min(560px,100%)] overflow-hidden rounded-lg border border-line bg-card/80 font-mono text-[12.5px] backdrop-blur-[6px] ${
        className ?? ""
      }`}
    >
      <div className="flex items-center gap-[7px] border-b border-line px-3 py-[9px]">
        <span aria-hidden className="h-[9px] w-[9px] rounded-full bg-accent" />
        <span
          aria-hidden
          className="h-[9px] w-[9px] rounded-full border border-line"
        />
        <span
          aria-hidden
          className="h-[9px] w-[9px] rounded-full border border-line"
        />
        <span className="ml-1 text-[10px] uppercase tracking-[0.18em] text-mut">
          {PROMPT}
        </span>
      </div>

      <div
        ref={logRef}
        role="log"
        className="grid max-h-[168px] gap-[5px] overflow-y-auto px-3 pb-2 pt-3 leading-[1.5]"
      >
        {lines.map((line, index) => (
          <p
            key={`${index}-${line.text}`}
            className={`m-0 whitespace-pre-wrap ${
              line.kind === "dim" ? "text-mut" : ""
            }`}
          >
            {line.kind === "in" ? (
              <>
                <span className="text-accent">$</span> {line.text}
              </>
            ) : (
              line.text
            )}
          </p>
        ))}
      </div>

      <form onSubmit={submit} className="flex items-center gap-2 px-3 pb-3 pt-1">
        <span aria-hidden className="text-accent">
          $
        </span>
        <input
          ref={inputRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoComplete="off"
          aria-label="terminal"
          placeholder="help"
          // iOS 16px altındaki alanlara odaklanınca sayfayı yakınlaştırıyor
          className="w-full border-0 bg-transparent p-0 text-[16px] focus:outline-none min-[520px]:text-[12.5px]"
        />
      </form>
    </div>
  );
}
