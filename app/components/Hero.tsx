import HeroCanvas from "./HeroCanvas";

export default function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="relative isolate overflow-hidden border-b border-rule/60"
    >
      {/* Live mathematical artwork — the hero IS Uri's Ph.D. subject. */}
      <div className="absolute inset-0 -z-10">
        <HeroCanvas />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 pt-14 pb-20 sm:px-6 sm:pt-20 sm:pb-24 md:px-10 md:pt-28 md:pb-40">
        <div className="grid grid-cols-12 gap-x-6 gap-y-4">
          <div className="col-span-12 md:col-span-2">
            <p className="font-mono-cap text-muted">
              <span className="text-accent">§&nbsp;00</span>
              <span className="ml-3 inline-block md:mt-2 md:ml-0 md:block">
                Frontispiece
              </span>
            </p>
          </div>

          <div className="col-span-12 md:col-span-10">
            <p className="animate-ink-rise font-mono-cap text-muted [animation-delay:0.05s]">
              Senior Data Scientist · Mathematician · Tel&nbsp;Aviv ↔ Guangdong
            </p>

            <h1 className="mt-6 max-w-[14ch] animate-ink-rise font-display text-[clamp(3rem,11vw,11rem)] leading-[0.92] text-ink sm:mt-8 [animation-delay:0.15s]">
              A mathematician,
              <span className="block italic text-accent">at work.</span>
            </h1>

            <div className="mt-10 grid grid-cols-1 gap-10 sm:mt-12 md:mt-16 md:grid-cols-12 md:gap-12">
              <p className="col-span-1 max-w-prose animate-ink-rise text-base leading-relaxed text-ink-soft sm:text-lg md:col-span-7 md:text-xl [animation-delay:0.35s]">
                I translate theorems into machines that learn. Two decades
                between a&nbsp;blackboard and&nbsp;a terminal — refinement
                schemes, geometric neural networks, anomaly detection,
                trustworthy&nbsp;AI. The curve above is a four-point
                interpolatory subdivision scheme — the&nbsp;subject of my
                doctorate, redrawn live each frame. Move your&nbsp;cursor.
              </p>

              <aside className="col-span-1 grid animate-ink-rise grid-cols-2 gap-x-6 gap-y-5 border-t border-rule pt-6 sm:grid-cols-4 md:col-span-4 md:col-start-9 md:grid-cols-1 md:border-l md:border-t-0 md:pl-6 md:pt-0 [animation-delay:0.55s]">
                <Stat k="Years in industry" v="15+" />
                <Stat k="Doctorate" v="Technion · Applied Math" />
                <Stat k="Following on LinkedIn" v="17,557" />
                <Stat k="Currently" v="Fetcherr · Tel Aviv" />
              </aside>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 border-t border-rule/60 bg-paper/70 px-5 py-2.5 font-mono-cap text-muted backdrop-blur-sm sm:px-6 sm:py-3 md:px-10">
        <span>scroll · §&nbsp;01</span>
        <span className="hidden truncate text-center md:inline">
          fig.&nbsp;01 — 4-pt&nbsp;interpolatory subdivision · live
        </span>
        <span aria-hidden className="animate-drift">↓</span>
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="font-mono-cap text-muted">{k}</dt>
      <dd className="font-display text-xl text-ink sm:text-2xl">{v}</dd>
    </div>
  );
}
