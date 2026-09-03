import { ImageResponse } from "next/og";

/** Facebook / LinkedIn / X all crop happily around 1200x630. */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

type Args = {
  /** small label above the title */
  kicker: string;
  title: string;
  subtitle: string;
};

/**
 * Shared open-graph card. Satori (behind ImageResponse) supports a subset of
 * CSS only: every container is an explicit flex box and there are no classes.
 */
export function ogImage({ kicker, title, subtitle }: Args) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f141a",
          color: "#e4e8ec",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 40, height: 4, background: "#e4e8ec" }} />
          <div
            style={{
              fontSize: 24,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#8c97a4",
            }}
          >
            {kicker}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 26 ? 74 : 92,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              lineHeight: 1.4,
              color: "#8c97a4",
              maxWidth: 940,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#8c97a4",
            borderTop: "1px solid #26303b",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex" }}>fatihgenc.dev</div>
          <div style={{ display: "flex" }}>Frontend Developer</div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
