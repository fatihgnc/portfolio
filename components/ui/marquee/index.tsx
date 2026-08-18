/** Eğik, sonsuz kayan accent şerit — üstüne gelince durur. */
export default function Marquee({ items }: { items: readonly string[] }) {
  const line = items.join(" · ") + " · ";

  return (
    <div className="group relative z-[1] mt-[clamp(20px,5vh,48px)] w-full overflow-hidden py-4">
      <div className="overflow-hidden bg-accent py-[13px] text-ink [transform:rotate(-1.1deg)_scale(1.05)]">
        <div className="flex w-max animate-marquee whitespace-nowrap font-display text-[clamp(14px,1.7vw,21px)] font-bold uppercase tracking-[0.06em] group-hover:[animation-play-state:paused]">
          <span>{line.repeat(3)}</span>
          <span aria-hidden>{line.repeat(3)}</span>
        </div>
      </div>
    </div>
  );
}
