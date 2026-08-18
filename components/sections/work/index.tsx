"use client";

import { Fragment } from "react";

import Interlude from "@/components/sections/interlude";
import ProjectCase, {
  type ProjectCaseData,
} from "@/components/sections/project-case";
import { useSiteState } from "@/components/providers/site-state";

/** İşler akışı: 01 → ara not → 02 → 03 */
export default function Work({ cases }: { cases: ProjectCaseData[] }) {
  const { t } = useSiteState();

  return (
    <section
      id="work"
      className="relative z-[1] px-gut pb-[clamp(40px,8vh,90px)] pt-[clamp(70px,14vh,150px)]"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4 border-b border-line pb-5">
        <h2 className="m-0 max-w-[20ch] font-display text-section-title font-bold [text-wrap:pretty]">
          {t.workTitle}
        </h2>
        <span className="font-mono text-label uppercase text-accent">
          {t.workLabel} — {String(cases.length).padStart(2, "0")}
        </span>
      </div>

      {cases.map((item, index) => (
        <Fragment key={item.slug}>
          <ProjectCase
            data={item}
            index={index}
            last={index === cases.length - 1}
          />
          {index === 0 ? <Interlude /> : null}
        </Fragment>
      ))}
    </section>
  );
}
