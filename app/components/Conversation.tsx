import SectionLabel from "./SectionLabel";

// Replace this with the real Calendly URL when it exists.
// Until then, the section degrades to a beautiful "intent" card.
const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";

export default function Conversation() {
  return (
    <section
      id="conversation"
      aria-labelledby="conversation-heading"
      className="relative border-b border-rule/60"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <SectionLabel number="04" title="Conversation" />
          </div>

          <div className="col-span-12 md:col-span-10">
            <h2
              id="conversation-heading"
              className="max-w-[18ch] font-display text-[clamp(2.4rem,5.6vw,5rem)] leading-[0.98] text-ink"
            >
              Begin a&nbsp;
              <span className="italic text-accent">conversation</span>.
            </h2>
            <p className="mt-6 max-w-prose text-ink-soft md:text-lg">
              I&nbsp;take on a small number of consulting engagements,
              advisory roles, public lectures and graduate-level
              collaborations each year. Pick a thirty-minute window
              below — or write directly. I read every message.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-7">
            <BookingFrame />
          </div>

          <aside className="col-span-12 md:col-span-5">
            <ul className="space-y-8">
              <Channel
                k="Email"
                v="hello@uriitai.com"
                href="mailto:hello@uriitai.com"
                hint="placeholder · update with real address"
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

            <div className="mt-12 border-t border-rule pt-6 font-mono-cap text-muted">
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
        <div className="flex items-center justify-between border-b border-rule px-4 py-3 font-mono-cap text-muted">
          <span>fig.&nbsp;03 — calendly · 30&nbsp;minutes</span>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            open in new tab ↗
          </a>
        </div>
        <iframe
          title="Schedule a conversation with Uri Itai"
          src={CALENDLY_URL}
          className="h-[680px] w-full"
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

      <div className="flex items-center justify-between border-b border-ink px-5 py-3 font-mono-cap">
        <span>fig.&nbsp;03 — booking</span>
        <span className="text-muted">placeholder · 30&nbsp;min</span>
      </div>

      <div className="relative grid place-items-center px-8 py-16 md:py-24">
        <div className="text-center">
          <p className="font-mono-cap text-muted">Calendly will live here</p>
          <h3 className="mt-4 max-w-[20ch] font-display text-4xl leading-tight text-ink md:text-5xl">
            Thirty minutes,
            <span className="block italic text-accent">
              by appointment.
            </span>
          </h3>
          <p className="mx-auto mt-6 max-w-md text-ink-soft">
            Drop a Calendly link into{" "}
            <code className="rounded bg-paper-deep px-1.5 py-0.5 font-mono text-sm text-ink">
              NEXT_PUBLIC_CALENDLY_URL
            </code>{" "}
            and this card replaces itself with a live booking calendar.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:hello@uriitai.com"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-mono-cap text-paper transition-colors hover:bg-accent"
            >
              Write instead <span aria-hidden>→</span>
            </a>
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink px-5 py-3 font-mono-cap text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Set up Calendly <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 border-t border-ink font-mono-cap text-muted">
        <div className="border-r border-rule px-5 py-4">
          <p>Mon — Thu</p>
          <p className="text-ink">10:00 — 18:00 IDT</p>
        </div>
        <div className="border-r border-rule px-5 py-4">
          <p>Friday</p>
          <p className="text-ink">10:00 — 13:00 IDT</p>
        </div>
        <div className="px-5 py-4">
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
      <div className="font-display text-2xl text-ink md:text-3xl">{v}</div>
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
