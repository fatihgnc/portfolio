"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { useSiteState } from "@/components/providers/site-state";
import IconLinks, { LinkDot } from "@/components/ui/icon-links";
import { site } from "@/content/site";

const fieldClass =
  "border-0 border-b border-line bg-transparent py-2 text-base transition-colors";

/** Klişe "let's work together" değil: kişisel davet + doğrudan kanallar. */
export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [sent, setSent] = useState(false);

  const { t } = useSiteState();
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = nameRef.current?.value ?? "";
    const email = emailRef.current?.value ?? "";
    const message = messageRef.current?.value ?? "";

    const subject = encodeURIComponent(t.mailSubject + name);
    const body = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`);

    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="relative z-[1] border-t border-line px-gut pb-[clamp(30px,6vh,60px)] pt-band"
    >
      <div className="grid grid-cols-1 items-start gap-[clamp(32px,5vw,80px)] min-[900px]:grid-cols-[1fr_1.15fr]">
        <div className="min-w-0">
          <p className="mb-[18px] mt-0 font-mono text-label uppercase text-accent">
            {t.contactLabel}
          </p>

          <motion.h2
            style={reduced ? undefined : { y: titleY }}
            className="m-0 font-display text-contact-title font-extrabold [text-wrap:pretty]"
          >
            {t.contactTitle}
          </motion.h2>

          <p className="mt-[18px] text-[clamp(16px,1.4vw,20px)] text-mut">
            {t.contactSub}
          </p>

        </div>

        <div className="min-w-0 rounded-lg border border-line bg-card p-[clamp(20px,3vw,34px)]">
          {sent ? (
            <div className="grid gap-[14px] py-[18px]">
              <p className="m-0 font-display text-[clamp(22px,2.4vw,30px)] font-bold leading-[1.15] tracking-[-0.02em]">
                {t.sentTitle}
              </p>
              <p className="m-0 text-[15px] leading-[1.6] text-mut">
                {t.sentBody}
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-[6px] cursor-pointer justify-self-start rounded-full border border-accent bg-transparent px-[18px] py-[10px] font-mono text-[11.5px] uppercase tracking-[0.12em] transition-colors hover:bg-accent hover:text-ink"
              >
                {t.again}
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-[22px]">
              <label className="grid gap-2">
                <span className="font-mono text-label-sm uppercase text-mut">
                  {t.fName}
                </span>
                <input
                  ref={nameRef}
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  placeholder={t.fNamePh}
                  className={fieldClass}
                />
              </label>

              <label className="grid gap-2">
                <span className="font-mono text-label-sm uppercase text-mut">
                  {t.fEmail}
                </span>
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder={t.fEmailPh}
                  className={fieldClass}
                />
              </label>

              <label className="grid gap-2">
                <span className="font-mono text-label-sm uppercase text-mut">
                  {t.fMsg}
                </span>
                <textarea
                  ref={messageRef}
                  name="message"
                  rows={4}
                  required
                  placeholder={t.fMsgPh}
                  className={`${fieldClass} resize-y leading-[1.55]`}
                />
              </label>

              <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-[14px]">
                <button
                  type="submit"
                  className="inline-flex cursor-pointer items-center gap-3 rounded-full border border-accent bg-accent px-[26px] py-[13px] font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink transition-[background-color,color,gap] duration-[250ms] hover:gap-[22px] hover:bg-transparent hover:text-accent"
                >
                  {t.fSend} <span aria-hidden>→</span>
                </button>
                <span className="flex-[1_1_180px] text-xs leading-[1.5] text-mut">
                  {t.fNote}
                </span>
              </div>
            </form>
          )}
        </div>
      </div>

      <footer className="mt-[clamp(46px,9vh,92px)] flex flex-wrap items-center justify-center gap-3 border-t border-line pt-[18px] font-mono text-[10.5px] uppercase tracking-[0.16em] text-mut">
        <IconLinks size={17} />
        <LinkDot />
        <span>{t.footerB}</span>
      </footer>
    </section>
  );
}
