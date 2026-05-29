"use client";

import { useEffect, useRef, useState } from "react";
import SectionLabel from "./SectionLabel";

type Stop = {
  year: string;
  org: string;
  role: string;
  note?: string;
};

const STOPS: Stop[] = [
  {
    year: "2026 →",
    org: "Fetcherr",
    role: "Data Science Specialist",
    note: "Tel Aviv · full-time · current",
  },
  {
    year: "2024 — 26",
    org: "GTIIT (Technion · Guangdong)",
    role: "Lecturer, Mathematics",
    note: "Guangdong, China · on-site",
  },
  {
    year: "2025 — 26",
    org: "Cyberpro",
    role: "Head of AI training",
    note: "End-to-end cyber + GenAI program",
  },
  {
    year: "2023 →",
    org: "Holon Institute of Technology",
    role: "Lecturer · ML for Cyber",
  },
  {
    year: "2023",
    org: "Ort Braude Karmiel",
    role: "Geometric NN researcher",
    note: "GNNs for fluid dynamics PDEs",
  },
  {
    year: "2021 — 23",
    org: "TRSTai",
    role: "Senior Data Scientist",
    note: "Trustworthy & explainable AI · finance",
  },
  {
    year: "2020 — 21",
    org: "Qualitest × Intel",
    role: "Senior Data Scientist",
    note: "Hardware-failure detection from logs",
  },
  {
    year: "2019 — 20",
    org: "SafeRide Technologies",
    role: "Data Scientist",
    note: "CAN-bus cyber-attack detection",
  },
  {
    year: "2017 — 19",
    org: "Knowmail",
    role: "Data Scientist",
    note: "Behavioural prediction from email",
  },
  {
    year: "2015 — 17",
    org: "Savicell",
    role: "Head of algorithm & ML",
    note: "Liquid-biopsy startup · Haifa",
  },
  {
    year: "2014 — 15",
    org: "Kenshoo",
    role: "Researcher",
    note: "Pacing algorithms · ad-tech",
  },
  {
    year: "2010 — 14",
    org: "Algorithmic-trading startups",
    role: "Algorithm Developer",
    note: "Derivatives & securities",
  },
  {
    year: "2007 — 13",
    org: "Technion",
    role: "Ph.D., Applied Mathematics",
    note: "Refinement schemes for geometric objects",
  },
];

export default function Trajectory() {
  const [active, setActive] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Keep the SVG curve recomputed when items hover, so the line "breathes"
  // toward the active stop.
  const [pull, setPull] = useState({ x: 0.5, y: 0.5, k: 0 });

  useEffect(() => {
    if (active === null) {
      setPull((p) => ({ ...p, k: 0 }));
      return;
    }
    const target = wrapRef.current?.querySelector<HTMLElement>(
      `[data-stop="${active}"]`
    );
    const wrap = wrapRef.current;
    if (!target || !wrap) return;
    const wb = wrap.getBoundingClientRect();
    const tb = target.getBoundingClientRect();
    setPull({
      x: (tb.left + tb.width / 2 - wb.left) / wb.width,
      y: (tb.top + tb.height / 2 - wb.top) / wb.height,
      k: 1,
    });
  }, [active]);

  return (
    <section
      id="trajectory"
      aria-labelledby="trajectory-heading"
      className="relative scroll-mt-24 border-b border-rule/60"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-12 gap-x-6 gap-y-6">
          <div className="col-span-12 md:col-span-2">
            <SectionLabel number="02" title="Trajectory" />
          </div>

          <div className="col-span-12 md:col-span-10">
            <h2
              id="trajectory-heading"
              className="max-w-[16ch] font-display text-[clamp(2rem,5.2vw,4.6rem)] leading-[0.98] text-ink"
            >
              A career, refined level&nbsp;by&nbsp;level.
            </h2>
            <p className="mt-5 max-w-prose text-base text-ink-soft sm:mt-6 sm:text-lg">
              Each stop is a control point. The line is a four-point
              subdivision curve drawn through them — hover any stop to see
              the&nbsp;curve pull toward&nbsp;it.
            </p>
          </div>
        </div>

        <div
          ref={wrapRef}
          className="relative mt-12 grid grid-cols-12 gap-6 sm:mt-16 md:mt-24"
          onMouseLeave={() => setActive(null)}
        >
          <CurveRail count={STOPS.length} pull={pull} />

          <ol className="col-span-12 md:col-span-10 md:col-start-3">
            {STOPS.map((s, i) => (
              <li
                key={i}
                data-stop={i}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`group relative grid grid-cols-12 items-baseline gap-x-4 gap-y-1 border-t border-rule py-5 transition-colors sm:py-6 md:py-7 ${
                  active === i ? "text-ink" : "text-ink-soft"
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute -left-[1px] top-0 h-px bg-accent transition-all duration-500 ${
                    active === i ? "w-24 opacity-100" : "w-0 opacity-0"
                  }`}
                />
                <span className="col-span-5 font-mono-cap text-muted sm:col-span-4 md:col-span-2">
                  {s.year}
                </span>
                <span className="col-span-7 text-right font-mono-cap text-muted sm:col-span-8 sm:text-left md:hidden">
                  {s.note ?? ""}
                </span>
                <span className="col-span-12 font-display text-2xl text-ink sm:text-3xl md:col-span-4 md:text-3xl">
                  {s.org}
                </span>
                <span className="col-span-12 text-base sm:text-lg md:col-span-3 md:text-lg">
                  {s.role}
                </span>
                <span className="col-span-12 hidden font-mono-cap text-muted md:col-span-3 md:block md:text-right">
                  {s.note ?? ""}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function CurveRail({
  count,
  pull,
}: {
  count: number;
  pull: { x: number; y: number; k: number };
}) {
  // Build a curve through evenly spaced anchors down the column,
  // perturbed toward the hovered point.
  const anchors = Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    const baseX = 50 + Math.sin(t * 6) * 6;
    const baseY = t * 100;
    const dx = (pull.x * 100 - baseX) * 0.45 * pull.k;
    const dy = (pull.y * 100 - baseY) * 0.05 * pull.k;
    return { x: baseX + dx, y: baseY + dy };
  });

  const refined = refine(refine(refine(anchors)));

  const d = refined
    .map(
      (p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`
    )
    .join(" ");

  return (
    <svg
      aria-hidden
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
      className="pointer-events-none absolute inset-0 col-span-12 hidden h-full w-full md:col-span-2 md:block"
    >
      <path
        d={d}
        stroke="#14110f"
        strokeOpacity="0.6"
        strokeWidth="0.25"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
      {anchors.map((p, i) => (
        <g key={i}>
          <circle
            cx={p.x.toFixed(3)}
            cy={p.y.toFixed(3)}
            r="0.55"
            fill="#8b3a1f"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      ))}
    </svg>
  );
}

function refine(pts: { x: number; y: number }[]) {
  const n = pts.length;
  if (n < 4) return pts;
  const out: { x: number; y: number }[] = [];
  const W4 = -1 / 16;
  const W9 = 9 / 16;
  for (let i = 0; i < n - 1; i++) {
    const pm = pts[Math.max(0, i - 1)];
    const p0 = pts[i];
    const p1 = pts[i + 1];
    const p2 = pts[Math.min(n - 1, i + 2)];
    out.push(p0);
    out.push({
      x: W4 * pm.x + W9 * p0.x + W9 * p1.x + W4 * p2.x,
      y: W4 * pm.y + W9 * p0.y + W9 * p1.y + W4 * p2.y,
    });
  }
  out.push(pts[n - 1]);
  return out;
}
