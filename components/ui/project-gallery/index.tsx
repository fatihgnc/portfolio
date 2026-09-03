"use client";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { useSiteState } from "@/components/providers/site-state";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Locale, Shot } from "@/content/site";
import { cn } from "@/lib/utils";

type Props = {
  /** project name, used as the lightbox title */
  name: string;
  shots: Shot[];
  locale: Locale;
};

/** Project screenshots: a thumbnail strip that opens a lightbox. */
export default function ProjectGallery({ name, shots, locale }: Props) {
  const { t } = useSiteState();
  // `index` is kept until the close animation ends so the image leaves with the lightbox.
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const current = shots[index] ?? null;
  const count = shots.length;

  const show = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  if (count === 0) return null;

  return (
    <>
      <ul className="shot-list" aria-label={`${name} — ${t.gallery.label}`}>
        {shots.map((shot, i) => (
          <li key={shot.src}>
            <button
              type="button"
              className={cn("shot-thumb", shot.portrait && "is-portrait")}
              onClick={() => show(i)}
              aria-label={`${t.gallery.open}: ${shot.alt[locale]}`}
            >
              <Image
                src={shot.src}
                alt=""
                width={shot.width}
                height={shot.height}
                sizes="(max-width: 640px) 45vw, 220px"
                quality={85}
              />
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="lightbox duration-200"
          aria-describedby={undefined}
          showCloseButton
        >
          <DialogTitle className="sr-only">{name}</DialogTitle>
          <DialogDescription className="sr-only">{t.gallery.hint}</DialogDescription>

          {current ? (
            <figure className="lightbox-figure">
              <div className={cn("lightbox-stage", current.portrait && "is-portrait")}>
                <Image
                  key={current.src}
                  src={current.src}
                  alt={current.alt[locale]}
                  width={current.width}
                  height={current.height}
                  // Sources are already 1600px WebP; re-encoding degraded them.
                  unoptimized
                  priority
                />
              </div>
              <figcaption className="lightbox-caption">
                <span className="lightbox-text">{current.alt[locale]}</span>
                {count > 1 ? (
                  <span className="lightbox-nav">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => step(-1)}
                      aria-label={t.gallery.prev}
                    >
                      <IconChevronLeft />
                    </Button>
                    <span className="lightbox-count" aria-live="polite">
                      {index + 1} / {count}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => step(1)}
                      aria-label={t.gallery.next}
                    >
                      <IconChevronRight />
                    </Button>
                  </span>
                ) : null}
              </figcaption>
            </figure>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
