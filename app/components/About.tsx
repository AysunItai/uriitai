import SectionLabel from "./SectionLabel";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative border-b border-rule/60 bg-paper-deep/40"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-2">
            <SectionLabel number="01" title="About" />
          </div>

          <div className="col-span-12 md:col-span-5">
            <Portrait />
            <figcaption className="mt-3 font-mono-cap text-muted">
              fig.&nbsp;02 — portrait, replace&nbsp;with photograph
            </figcaption>
          </div>

          <div className="col-span-12 md:col-span-5">
            <h2
              id="about-heading"
              className="max-w-[14ch] font-display text-[clamp(2.4rem,5.2vw,4.4rem)] leading-[0.98] text-ink"
            >
              Between the{" "}
              <span className="italic text-accent">blackboard</span>{" "}
              and the&nbsp;terminal.
            </h2>

            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
              <p>
                I hold a&nbsp;Ph.D. in Applied Mathematics from the Technion,
                where my dissertation introduced two generalisations of linear
                point-refining schemes — one constructing surfaces by refining
                non-intersecting curves, the other generating matrix-valued
                functions from sequences of symmetric positive-definite&nbsp;matrices.
              </p>
              <p>
                For more than a decade since, I&nbsp;have moved between roles
                where rigour matters: cyber threat detection on the CAN&nbsp;bus,
                liquid-biopsy algorithms, log-analysis with Intel, prediction
                and pacing for ad-tech, and trustworthy&nbsp;AI for finance.
              </p>
              <p>
                I&nbsp;currently work as Data&nbsp;Science Specialist at{" "}
                <em className="text-ink">Fetcherr</em>, lecture in the
                mathematics department of <em className="text-ink">GTIIT</em>,
                and teach Machine&nbsp;Learning for Cyber at the
                <em className="text-ink"> Holon Institute of Technology</em>.
                Native English and Hebrew. Available for selected consulting
                engagements and&nbsp;public lectures.
              </p>
            </div>

            <ul className="mt-10 grid grid-cols-2 gap-y-3 font-mono-cap text-muted">
              <li>· Python</li>
              <li>· Statistical research</li>
              <li>· Deep learning</li>
              <li>· Geometric NN</li>
              <li>· Anomaly detection</li>
              <li>· Trustworthy AI</li>
              <li>· Pandas / NumPy</li>
              <li>· Public lectures</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Portrait placeholder — a generative SVG of nested level-sets and a
 * silhouetted bust. Functions as art rather than waiting for a stock
 * photograph; the user replaces this with a real picture later.
 */
function Portrait() {
  const rings = Array.from({ length: 14 }, (_, i) => i);
  return (
    <figure className="relative aspect-[4/5] w-full overflow-hidden border border-rule bg-paper">
      <svg
        viewBox="0 0 400 500"
        className="absolute inset-0 h-full w-full"
        aria-label="Generative portrait placeholder"
      >
        <defs>
          <radialGradient id="halo" cx="50%" cy="38%" r="55%">
            <stop offset="0%" stopColor="#8b3a1f" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#8b3a1f" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#8b3a1f" stopOpacity="0" />
          </radialGradient>
          <pattern
            id="grid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="#14110f"
              strokeOpacity="0.05"
              strokeWidth="0.5"
            />
          </pattern>
          <clipPath id="bust">
            <path d="M 200 110 C 252 110 282 152 282 198 C 282 232 264 254 252 268 C 290 284 316 312 332 360 L 332 500 L 68 500 L 68 360 C 84 312 110 284 148 268 C 136 254 118 232 118 198 C 118 152 148 110 200 110 Z" />
          </clipPath>
        </defs>

        <rect width="400" height="500" fill="#efeae0" />
        <rect width="400" height="500" fill="url(#grid)" />
        <rect width="400" height="500" fill="url(#halo)" />

        {/* Concentric level sets — feels like a contour map of a face. */}
        <g
          stroke="#14110f"
          strokeOpacity="0.35"
          fill="none"
          clipPath="url(#bust)"
        >
          {rings.map((i) => (
            <ellipse
              key={i}
              cx={200 + Math.sin(i * 0.6) * 6}
              cy={230 + Math.cos(i * 0.7) * 8}
              rx={30 + i * 14}
              ry={40 + i * 16}
              strokeWidth={0.45 + (i % 3) * 0.15}
              opacity={0.85 - i * 0.04}
            />
          ))}
        </g>

        {/* Bust outline. */}
        <path
          d="M 200 110 C 252 110 282 152 282 198 C 282 232 264 254 252 268 C 290 284 316 312 332 360 L 332 500 L 68 500 L 68 360 C 84 312 110 284 148 268 C 136 254 118 232 118 198 C 118 152 148 110 200 110 Z"
          fill="none"
          stroke="#14110f"
          strokeWidth="1.2"
        />

        {/* Crosshair, like a research diagram registration mark. */}
        <g stroke="#8b3a1f" strokeWidth="0.8">
          <line x1="200" y1="80" x2="200" y2="100" />
          <line x1="190" y1="90" x2="210" y2="90" />
        </g>

        <text
          x="20"
          y="490"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          letterSpacing="2"
          fill="#6b6358"
        >
          PORTRAIT · placeholder · 4:5
        </text>
        <text
          x="380"
          y="490"
          textAnchor="end"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          letterSpacing="2"
          fill="#6b6358"
        >
          U.&nbsp;ITAI
        </text>
      </svg>
    </figure>
  );
}
