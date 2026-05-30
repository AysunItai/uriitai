import { ImageResponse } from "next/og";

// 180×180 is the size iOS uses for the "Add to Home Screen" icon. Larger
// than the favicon, so we can give the U more breathing room and a
// stronger dot.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const PAPER = "#efeae0";
const INK = "#14110f";
const ACCENT = "#8b3a1f";

export default function AppleIcon() {
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
          fontSize: 132,
          letterSpacing: "-0.02em",
          position: "relative",
        }}
      >
        <span style={{ display: "flex", lineHeight: 1, paddingTop: 8 }}>U</span>
        <div
          style={{
            position: "absolute",
            top: 26,
            right: 32,
            width: 16,
            height: 16,
            borderRadius: 8,
            background: ACCENT,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
