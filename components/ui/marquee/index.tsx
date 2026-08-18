/** Eğik, sonsuz kayan accent şerit. */
export default function Marquee({ text }: { text: string }) {
  const line = text.repeat(3);

  return (
    <div
      aria-hidden
      className="relative z-[1] mt-[clamp(20px,5vh,48px)] w-full overflow-hidden py-4"
    >
      <div className="overflow-hidden bg-accent py-[13px] text-ink [transform:rotate(-1.1deg)_scale(1.05)]">
        <div className="flex w-max animate-marquee whitespace-nowrap font-display text-[clamp(14px,1.7vw,21px)] font-bold tracking-[0.06em]">
          <span>{line}</span>
          <span>{line}</span>
        </div>
      </div>
    </div>
  );
}
