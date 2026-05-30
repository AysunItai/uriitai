import { ImageResponse } from "next/og";

// 32×32 is the canonical favicon size — what browsers actually display
// in the tab strip. We let `icon.svg`-style behavior apply through
// ImageResponse, which produces a PNG of any size we choose.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Why generated, not a static .ico? Two reasons:
//   1. Static favicon.ico in app/ ships the Vercel default by template.
//      Generating it as code lets us drive it from the same palette as
//      the rest of the site, and version it with the design.
//   2. PNG at 32×32 is sharper than .ico at 32×32 in modern browsers
//      and Next.js still emits the right <link rel="icon"> for it.
const PAPER = "#efeae0";
const INK = "#14110f";
const ACCENT = "#8b3a1f";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: PAPER,
          color: INK,
          fontFamily: "serif",
          // Slightly oversized so the U sits visually centered with its
          // serifs touching the edges — feels intentional in the tab,
          // not lost in negative space.
          fontSize: 28,
          fontWeight: 400,
          letterSpacing: "-0.02em",
          // The dot above the U is the same accent oxblood as the rest of
          // the site. Tiny, but unmistakable in the tab strip.
          position: "relative",
        }}
      >
        <span style={{ display: "flex", lineHeight: 1, paddingTop: 2 }}>U</span>
        <div
          style={{
            position: "absolute",
            top: 4,
            right: 5,
            width: 4,
            height: 4,
            borderRadius: 2,
            background: ACCENT,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
