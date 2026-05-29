import SectionLabel from "./SectionLabel";

const ESSAYS = [
  {
    kind: "Essay",
    date: "May 2026",
    title: "From Neptune to Vulcan",
    sub: "How Neptune, Vulcan, and Einstein teach us that past victories can blind us.",
    href: "https://medium.com/@uriitai",
  },
  {
    kind: "Essay",
    date: "May 2026",
    title: "The Success Trap",
    sub: "Why your past wins might be your future blind spots — a story in three planets.",
    href: "https://medium.com/@uriitai",
  },
];

const PAPERS = [
  {
    date: "Apr 2025",
    title: "Tighten the Lasso: A Convex-Hull Volume-based Anomaly Detection Method",
    sub: "A novel anomaly detection algorithm exploiting the convex-hull volume of a dataset; competitive with seven SOTA methods across ten datasets.",
  },
  {
    date: "Oct 2022",
    title: "Parametric PDF for Goodness of Fit",
    sub: "A threshold-free framework for goodness of fit in classification — preserving the curve information typically lost to a fixed cut-off.",
  },
  {
    date: "2013",
    title: "Generalised refinement schemes for surfaces and SPD-matrix-valued functions",
    sub: "Doctoral dissertation, Technion. Two extensions of linear point-refining schemes to geometric objects.",
  },
];

export default function Writing() {
  return (
    <section
      id="writing"
      aria-labelledby="writing-heading"
      className="relative scroll-mt-24 border-b border-rule/60 bg-paper-deep/40"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-12 gap-x-6 gap-y-6">
          <div className="col-span-12 md:col-span-2">
            <SectionLabel number="03" title="Writing" />
          </div>

          <div className="col-span-12 md:col-span-10">
            <h2
              id="writing-heading"
              className="max-w-[16ch] font-display text-[clamp(2rem,5.2vw,4.6rem)] leading-[0.98] text-ink"
            >
              Notes from the&nbsp;
              <span className="italic text-accent">margins</span>.
            </h2>
            <p className="mt-5 max-w-prose text-base text-ink-soft sm:mt-6 sm:text-lg">
              Selected essays and peer-reviewed work. The essays live on
              Medium — long-form thinking on innovation, physics, and the
              cognitive&nbsp;traps of expertise.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-12 sm:mt-16 md:gap-10">
          <div className="col-span-12 md:col-span-6">
            <h3 className="mb-5 font-mono-cap text-muted sm:mb-6">
              Essays · medium.com/@uriitai
            </h3>
            <ul>
              {ESSAYS.map((e, i) => (
                <li key={i} className="border-t border-rule">
                  <a
                    href={e.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col gap-2 py-5 transition-colors hover:bg-paper sm:py-6"
                  >
                    <div className="flex items-baseline justify-between font-mono-cap text-muted">
                      <span>{e.kind}</span>
                      <span>{e.date}</span>
                    </div>
                    <h4 className="font-display text-2xl leading-tight text-ink transition-colors group-hover:text-accent sm:text-3xl md:text-4xl">
                      {e.title}
                    </h4>
                    <p className="text-base text-ink-soft sm:text-base">
                      {e.sub}
                    </p>
                    <span className="mt-1 inline-flex items-center gap-1.5 font-mono-cap text-accent transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                      Read on Medium <span aria-hidden>↗</span>
                    </span>
                  </a>
                </li>
              ))}
              <li className="border-t border-rule" />
            </ul>
          </div>

          <div className="col-span-12 md:col-span-6">
            <h3 className="mb-5 font-mono-cap text-muted sm:mb-6">
              Selected publications
            </h3>
            <ul>
              {PAPERS.map((p, i) => (
                <li key={i} className="border-t border-rule py-5 sm:py-6">
                  <div className="flex items-baseline justify-between font-mono-cap text-muted">
                    <span>Paper</span>
                    <span>{p.date}</span>
                  </div>
                  <h4 className="mt-2 font-display text-xl leading-tight text-ink sm:text-2xl md:text-3xl">
                    {p.title}
                  </h4>
                  <p className="mt-2 text-base text-ink-soft">{p.sub}</p>
                </li>
              ))}
              <li className="border-t border-rule" />
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono-cap text-muted sm:mt-12 sm:gap-4">
          <span>17,557 followers · LinkedIn</span>
          <span aria-hidden>·</span>
          <span>9 publications</span>
          <span aria-hidden>·</span>
          <span>43 endorsed skills</span>
        </div>
      </div>
    </section>
  );
}
