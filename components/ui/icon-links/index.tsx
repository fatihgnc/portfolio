"use client";

import { useSiteState } from "@/components/providers/site-state";
import Icon, { type IconName } from "@/components/ui/icons";
import { site } from "@/content/site";

/** Linkler arasındaki nokta ayraç. */
export function LinkDot() {
  return (
    <span aria-hidden className="select-none text-mut opacity-50">
      ·
    </span>
  );
}

type IconLinksProps = {
  /** ikon kenar uzunluğu (px) */
  size?: number;
  className?: string;
};

/** github · linkedin · app store · cv — ikon (ve CV için metin) şeridi. */
export default function IconLinks({ size = 16, className }: IconLinksProps) {
  const { t } = useSiteState();
  const links = site.links.filter((link) => link.icon);

  return (
    <div
      className={`flex items-center gap-3 min-[520px]:gap-[14px] ${className ?? ""}`}
    >
      {links.map((link) => {
        const icon = link.icon as IconName;
        const label = t.iconLabels[icon];

        return (
          <a
            key={link.value}
            href={link.href}
            download={link.download}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
            aria-label={label}
            className="flex flex-none items-center justify-center text-mut transition-colors duration-200 hover:text-accent"
          >
            {link.iconText ? (
              <span className="leading-none">{link.iconText}</span>
            ) : (
              <Icon name={icon} size={size} />
            )}
          </a>
        );
      })}
    </div>
  );
}
