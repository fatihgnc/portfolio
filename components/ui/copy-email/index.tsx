"use client";

import { IconCopy, IconCopyCheck } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

type Props = { email: string; copy: string; copied: string };

/** Copies the e-mail to the clipboard and shows "Copied" for 1.8 s. */
export default function CopyEmail({ email, copy, copied: copiedLabel }: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onCopy = () => {
    const done = () => {
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(done, done);
    } else {
      done();
    }
  };

  const label = copied ? copiedLabel : copy;

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={onCopy}
      aria-label={label}
      title={label}
      className="self-center text-muted-foreground hover:text-primary [&_svg]:!size-[18px]"
    >
      {copied ? <IconCopyCheck /> : <IconCopy />}
      <span className="sr-only" aria-live="polite">
        {label}
      </span>
    </Button>
  );
}
