import SectionLabel from "./SectionLabel";

export default function Manifesto() {
  return (
    <section
      aria-label="Manifesto"
      className="relative border-b border-rule/60"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <SectionLabel number="A" title="Premise" />
          </div>

          <blockquote className="col-span-12 max-w-[18ch] font-display text-[clamp(2.2rem,6vw,5.5rem)] leading-[1.04] text-ink md:col-span-10">
            <span className="text-accent">“</span>
            From mathematical principles
            <span className="italic"> to effective programming </span>
            solutions
            <span className="text-accent">.”</span>
          </blockquote>

          <div className="col-span-12 mt-10 md:col-span-10 md:col-start-3">
            <p className="max-w-prose text-lg leading-relaxed text-ink-soft md:text-xl">
              Most software is built on top of mathematics it never names.
              I&nbsp;work the other direction — beginning with the geometry,
              the inequality, the proof, then asking what useful behaviour
              falls&nbsp;out. The&nbsp;result tends to be smaller, stranger,
              and&nbsp;harder to&nbsp;break.
            </p>

            <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3">
              <Pillar
                k="01"
                t="Theory"
                d="Refinement schemes, convex geometry, statistical modelling — the toolkit of a working mathematician."
              />
              <Pillar
                k="02"
                t="Practice"
                d="Production data science across cyber, finance, ad-tech, automotive and life sciences. Fifteen years of shipped systems."
              />
              <Pillar
                k="03"
                t="Teaching"
                d="Lecturer at Technion (Guangdong) and HIT, head of AI training at Cyberpro. Research only matters if it transfers."
              />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pillar({ k, t, d }: { k: string; t: string; d: string }) {
  return (
    <li className="border-t border-rule pt-5">
      <div className="mb-3 flex items-baseline justify-between font-mono-cap text-muted">
        <span>·&nbsp;{k}</span>
      </div>
      <h3 className="font-display text-3xl text-ink">{t}</h3>
      <p className="mt-3 text-ink-soft">{d}</p>
    </li>
  );
}
