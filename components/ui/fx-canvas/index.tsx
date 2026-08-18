"use client";

import dynamic from "next/dynamic";

/** three.js yalnızca istemcide ve ilk boyamadan sonra yüklensin. */
const FxScene = dynamic(() => import("./scene"), { ssr: false });

export default function FxCanvas() {
  return <FxScene />;
}
