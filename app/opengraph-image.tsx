import { ImageResponse } from "next/og";

// 1200×630 is the canonical Open Graph spec size — Facebook, LinkedIn,
// WhatsApp, X (large_image card), and iMessage all crop from this.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Uri Itai, Ph.D. — Mathematician at work. Translating theorems into machines that learn.";

// Site palette — duplicated from globals.css because ImageResponse runs
// in a sandboxed Edge-style runtime that can't read CSS.
const PAPER = "#efeae0";
const PAPER_DEEP = "#e8e1d3";
const INK = "#14110f";
const MUTED = "#6b6358";
const RULE = "#c9c1b3";
const ACCENT = "#8b3a1f";

// Why fetch from GitHub and not Google Fonts CSS?
//
// Google Fonts' CSS API serves WOFF2 to modern browsers, which satori
// cannot rasterize, and EOT to old IE — also unsupported. The reliable
// way to get a raw .ttf is to fetch the original OFL-licensed file from
// `google/fonts` on GitHub, which is the canonical source for these
// font binaries.
//
// This runs once when the OG image route is first generated; the
// resulting PNG is then cached as a static asset and served from the
// CDN, so visitors never pay this cost.
const INSTRUMENT_SERIF_REGULAR =
  "https://raw.githubusercontent.com/google/fonts/main/ofl/instrumentserif/InstrumentSerif-Regular.ttf";
const INSTRUMENT_SERIF_ITALIC =
  "https://raw.githubusercontent.com/google/fonts/main/ofl/instrumentserif/InstrumentSerif-Italic.ttf";

async function loadFont(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url, {
    // Long cache — these font binaries are content-addressed by the OFL
    // license version and never change in place.
    next: { revalidate: 60 * 60 * 24 * 30 },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch font ${url}: ${res.status}`);
  }
  return res.arrayBuffer();
}

// 4-point interpolatory subdivision (Dyn–Levin–Gregory) — same scheme as
// the hero canvas, baked statically so the share preview reads as the
// same artwork people see on the site.
function subdivide(points: number[][], levels = 4): number[][] {
  let pts = points;
  for (let l = 0; l < levels; l++) {
    const out: number[][] = [];
    const n = pts.length;
    for (let i = 0; i < n - 1; i++) {
      out.push(pts[i]);
      const pm1 = pts[i - 1] ?? pts[i];
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const p2 = pts[i + 2] ?? pts[i + 1];
      // p_{2i+1} = -1/16·p_{i-1} + 9/16·p_i + 9/16·p_{i+1} - 1/16·p_{i+2}
      out.push([
        (-1 / 16) * pm1[0] + (9 / 16) * p0[0] + (9 / 16) * p1[0] + (-1 / 16) * p2[0],
        (-1 / 16) * pm1[1] + (9 / 16) * p0[1] + (9 / 16) * p1[1] + (-1 / 16) * p2[1],
      ]);
    }
    out.push(pts[n - 1]);
    pts = out;
  }
  return pts;
}

function pointsToPath(pts: number[][]): string {
  return pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(2)} ${p[1].toFixed(2)}`)
    .join(" ");
}

// Control points spread across the canvas, gently rising — same gesture
// as the hero. Anchored so the curve never touches the type.
const CONTROL: number[][] = [
  [60, 470],
  [220, 380],
  [410, 430],
  [600, 320],
  [800, 360],
  [990, 240],
  [1140, 290],
];

const LIMIT_CURVE = subdivide(CONTROL, 5);
const LEVEL_3 = subdivide(CONTROL, 3);
const LEVEL_2 = subdivide(CONTROL, 2);

export default async function OpenGraphImage() {
  // Parallel fetches — saves ~200ms vs sequential. We load just the two
  // serif weights (regular + italic) since those carry the brand voice.
  // Mono-caps text falls back to the system monospace, which is fine
  // for small uppercase lockups at 18px.
  const [serifRegular, serifItalic] = await Promise.all([
    loadFont(INSTRUMENT_SERIF_REGULAR),
    loadFont(INSTRUMENT_SERIF_ITALIC),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: `linear-gradient(135deg, ${PAPER} 0%, ${PAPER_DEEP} 100%)`,
          position: "relative",
          fontFamily: "Instrument Serif",
        }}
      >
        {/* The subdivision curve, rendered as nested SVG so the preview
            literally is the same artwork as the site. */}
        <svg
          width={size.width}
          height={size.height}
          viewBox={`0 0 ${size.width} ${size.height}`}
          style={{ position: "absolute", inset: 0 }}
        >
          {/* Faint earlier refinement levels, so the limit curve reads as
              the result of a process — not a single stroke. */}
          <path
            d={pointsToPath(LEVEL_2)}
            stroke={RULE}
            strokeWidth={1}
            fill="none"
            opacity={0.55}
          />
          <path
            d={pointsToPath(LEVEL_3)}
            stroke={MUTED}
            strokeWidth={1}
            fill="none"
            opacity={0.4}
          />
          <path
            d={pointsToPath(LIMIT_CURVE)}
            stroke={INK}
            strokeWidth={1.6}
            fill="none"
            opacity={0.85}
            strokeLinecap="round"
          />
          {/* Control points — small accent rings, the visual memo
              that this is a constructed object. */}
          {CONTROL.map((p, i) => (
            <g key={i}>
              <circle
                cx={p[0]}
                cy={p[1]}
                r={4}
                fill={PAPER}
                stroke={ACCENT}
                strokeWidth={1}
              />
            </g>
          ))}
        </svg>

        {/* Top hairline + section marker, like the rest of the site. */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "56px 72px 0 72px",
            color: MUTED,
            fontFamily: "monospace",
            fontSize: 18,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <span>§ 00 · Frontispiece</span>
          <span>uriitai.com</span>
        </div>

        {/* Body block: name, title, tagline. Kept low in the canvas so
            the curve has room to breathe above. Stacking is handled by
            DOM order — this block comes after the SVG, so satori paints
            it on top without needing an explicit z-index. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 72px 64px 72px",
            marginTop: "auto",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              color: INK,
              fontSize: 168,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              fontFamily: "Instrument Serif",
            }}
          >
            Uri Itai
            <span
              style={{
                marginLeft: 22,
                fontSize: 36,
                color: MUTED,
                letterSpacing: "0.08em",
                fontFamily: "monospace",
                textTransform: "uppercase",
              }}
            >
              Ph.D.
            </span>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 44,
              color: INK,
              fontFamily: "Instrument Serif",
              fontStyle: "italic",
              maxWidth: 1000,
              lineHeight: 1.15,
            }}
          >
            A mathematician translating theorems into machines that learn.
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 36,
              alignItems: "center",
              gap: 18,
              color: MUTED,
              fontFamily: "monospace",
              fontSize: 18,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: ACCENT }}>·</span>
            <span>Senior Data Scientist</span>
            <span style={{ color: RULE }}>·</span>
            <span>Tel Aviv</span>
            <span style={{ color: RULE }}>·</span>
            <span>Available for conversation</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Instrument Serif",
          data: serifRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Instrument Serif",
          data: serifItalic,
          style: "italic",
          weight: 400,
        },
      ],
    },
  );
}
