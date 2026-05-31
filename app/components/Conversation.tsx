import SectionLabel from "./SectionLabel";

// Live Calendly link. The env var lets it be swapped without a code edit
// (e.g. when Uri rotates schedules). The hardcoded fallback keeps the
// iframe working in any deployment, with or without env config.
const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/aysun-itai/uri-itai";

export default function Conversation() {
  return (
    <section
      id="conversation"
      aria-labelledby="conversation-heading"
      className="relative scroll-mt-24 border-b border-rule/60"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-12 gap-x-3 gap-y-6 sm:gap-x-6">
          <div className="col-span-12 md:col-span-2">
            <SectionLabel number="04" title="Conversation" />
          </div>

          <div className="col-span-12 md:col-span-10">
            <h2
              id="conversation-heading"
              className="max-w-[18ch] font-display text-[clamp(2rem,5.6vw,5rem)] leading-[0.98] text-ink"
            >
              Begin a&nbsp;
              <span className="italic text-accent">conversation</span>.
            </h2>
            <p className="mt-5 max-w-prose text-base text-ink-soft sm:mt-6 sm:text-lg">
              I&nbsp;take on a small number of consulting engagements,
              advisory roles, public lectures and graduate-level
              collaborations each year. Pick a thirty-minute window
              below — or write directly. I read every message.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-x-3 gap-y-10 sm:mt-16 sm:gap-x-6 md:gap-10">
          <div className="col-span-12 md:col-span-7">
            <BookingFrame />
          </div>

          <aside className="col-span-12 md:col-span-5">
            <ul className="grid grid-cols-1 gap-y-7 sm:grid-cols-2 sm:gap-x-8 md:grid-cols-1 md:gap-y-8">
              <Channel
                k="Email"
                v="hello@uriitai.com"
                href="mailto:hello@uriitai.com"
                hint="I read every message"
              />
              <Channel
                k="LinkedIn"
                v="/in/uri-itai"
                href="https://www.linkedin.com/in/uri-itai-43106316/"
                hint="500+ connections"
              />
              <Channel
                k="Medium"
                v="@uriitai"
                href="https://medium.com/@uriitai"
                hint="long-form essays"
              />
              <Channel
                k="Based"
                v="Tel Aviv ↔ Guangdong"
                hint="UTC+2 · UTC+8"
              />
            </ul>

            <div className="mt-10 border-t border-rule pt-6 font-mono-cap text-muted sm:mt-12">
              <p>Open to:</p>
              <ul className="mt-3 grid grid-cols-2 gap-y-2 text-ink-soft">
                <li>· Consulting</li>
                <li>· Advisory</li>
                <li>· Public lectures</li>
                <li>· Research</li>
                <li>· Expert review</li>
                <li>· Teaching</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function BookingFrame() {
  if (CALENDLY_URL) {
    return (
      <div className="overflow-hidden border border-rule bg-paper">
        <div className="flex items-center justify-between gap-3 border-b border-rule px-4 py-3 font-mono-cap text-muted">
          <span className="truncate">
            fig.&nbsp;03 — calendly · book a&nbsp;conversation
          </span>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 text-accent hover:underline"
          >
            open ↗
          </a>
        </div>
        <iframe
          title="Schedule a conversation with Uri Itai"
          src={CALENDLY_URL}
          loading="lazy"
          className="h-[640px] w-full sm:h-[720px] md:h-[760px]"
        />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden border border-ink bg-paper">
      {/* Decorative crosshatch reminiscent of an architectural plate. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
        viewBox="0 0 200 200"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse">
            <path
              d="M 0 6 L 6 0"
              stroke="#14110f"
              strokeWidth="0.4"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#hatch)" />
      </svg>

      <div className="flex items-center justify-between gap-3 border-b border-ink px-4 py-2.5 font-mono-cap sm:px-5 sm:py-3">
        <span>fig.&nbsp;03 — booking</span>
        <span className="text-muted">placeholder · 30&nbsp;min</span>
      </div>

      <div className="relative grid place-items-center px-5 py-12 sm:px-8 sm:py-16 md:py-24">
        <div className="text-center">
          <p className="font-mono-cap text-muted">Calendly will live here</p>
          <h3 className="mt-3 max-w-[20ch] font-display text-3xl leading-tight text-ink sm:mt-4 sm:text-4xl md:text-5xl">
            Thirty minutes,
            <span className="block italic text-accent">
              by appointment.
            </span>
          </h3>
          <p className="mx-auto mt-5 max-w-md text-base text-ink-soft sm:mt-6">
            Drop a Calendly link into{" "}
            <code className="rounded bg-paper-deep px-1.5 py-0.5 font-mono text-sm text-ink">
              NEXT_PUBLIC_CALENDLY_URL
            </code>{" "}
            and this card replaces itself with a live booking calendar.
          </p>

          <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:mt-8 sm:flex-row sm:items-center">
            <a
              href="mailto:hello@uriitai.com"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 font-mono-cap text-paper transition-colors hover:bg-accent"
            >
              Write instead <span aria-hidden>→</span>
            </a>
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink px-5 py-3 font-mono-cap text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Set up Calendly <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 border-t border-ink font-mono-cap text-muted sm:grid-cols-3">
        <div className="border-b border-rule px-4 py-3 sm:border-b-0 sm:border-r sm:px-5 sm:py-4">
          <p>Mon — Thu</p>
          <p className="text-ink">10:00 — 18:00 IDT</p>
        </div>
        <div className="border-b border-rule px-4 py-3 sm:border-b-0 sm:border-r sm:px-5 sm:py-4">
          <p>Friday</p>
          <p className="text-ink">10:00 — 13:00 IDT</p>
        </div>
        <div className="px-4 py-3 sm:px-5 sm:py-4">
          <p>Languages</p>
          <p className="text-ink">English · עברית</p>
        </div>
      </div>
    </div>
  );
}

function Channel({
  k,
  v,
  href,
  hint,
}: {
  k: string;
  v: string;
  href?: string;
  hint?: string;
}) {
  const inner = (
    <>
      <div className="font-mono-cap text-muted">{k}</div>
      <div className="font-display text-2xl text-ink sm:text-3xl">{v}</div>
      {hint ? (
        <div className="mt-1 font-mono-cap text-muted">{hint}</div>
      ) : null}
    </>
  );
  return (
    <li className="border-t border-rule pt-5">
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
          className="group block transition-colors hover:text-accent"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </li>
  );
}
