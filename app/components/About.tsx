import Image from "next/image";
import SectionLabel from "./SectionLabel";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative scroll-mt-24 border-b border-rule/60 bg-paper-deep/40"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-12 gap-x-3 gap-y-10 sm:gap-x-6 md:gap-10">
          <div className="col-span-12 md:col-span-2">
            <SectionLabel number="01" title="About" />
          </div>

          <div className="col-span-12 mx-auto w-full max-w-sm sm:max-w-md md:col-span-5 md:max-w-none">
            <Portrait />
          </div>

          <div className="col-span-12 md:col-span-5">
            <h2
              id="about-heading"
              className="max-w-[14ch] font-display text-[clamp(2rem,5.2vw,4.4rem)] leading-[0.98] text-ink"
            >
              Between the{" "}
              <span className="italic text-accent">blackboard</span>{" "}
              and the&nbsp;terminal.
            </h2>

            <div className="mt-6 space-y-5 text-base leading-relaxed text-ink-soft sm:mt-8 sm:text-lg">
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

            <ul className="mt-8 grid grid-cols-2 gap-y-3 font-mono-cap text-muted sm:mt-10">
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
 * Portrait — Uri's real lecture photograph, framed like a research plate.
 *
 * Design notes:
 * - The image sits at its native ~3:2 ratio so nothing is force-cropped.
 * - Subtle corner registration ticks + a top crosshair echo the diagram /
 *   ground-glass vocabulary used elsewhere on the site, without ever
 *   sitting on top of Uri's face or the slide text.
 * - A mono-cap data strip below acts as the figcaption, semantically
 *   correct (it lives inside <figure>) and visually consistent with
 *   "fig. 0X" labels on the other generative panels.
 */
function Portrait() {
  return (
    <figure className="relative w-full overflow-hidden border border-rule bg-paper">
      {/* Photograph at its native aspect ratio (2048×1362 ≈ 3:2). */}
      <div className="relative aspect-[1024/681] w-full">
        <Image
          src="/uri.jpg"
          alt="Uri Itai on stage delivering a public lecture on fairness, robustness and adversarial examples in machine learning."
          fill
          sizes="(min-width: 1024px) 36vw, (min-width: 768px) 42vw, (min-width: 640px) 28rem, 100vw"
          className="object-cover"
          quality={85}
        />

        {/* Corner registration ticks — like a research plate / ground glass.
            Kept paper-coloured so they read on the dark stage backdrop
            without ever competing with the subject. */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-paper/70"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t border-paper/70"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-l border-b border-paper/70"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-r border-b border-paper/70"
        />

        {/* Centre-top crosshair, same registration-mark vocabulary as the
            old placeholder. */}
        <svg
          aria-hidden
          viewBox="0 0 12 12"
          className="pointer-events-none absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 text-paper/70"
        >
          <line
            x1="6"
            y1="0"
            x2="6"
            y2="12"
            stroke="currentColor"
            strokeWidth="0.6"
          />
          <line
            x1="0"
            y1="6"
            x2="12"
            y2="6"
            stroke="currentColor"
            strokeWidth="0.6"
          />
        </svg>
      </div>

      {/* Mono-cap data strip — same "fig. 0X" language used throughout. */}
      <figcaption className="flex items-center justify-between gap-3 border-t border-rule px-3 py-2 font-mono-cap text-muted">
        <span className="truncate">
          fig.&nbsp;02 — U.&nbsp;Itai · in&nbsp;lecture
        </span>
        <span aria-hidden className="shrink-0">
          3:2
        </span>
      </figcaption>
    </figure>
  );
}
