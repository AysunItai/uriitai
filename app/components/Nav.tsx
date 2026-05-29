import Link from "next/link";

const items = [
  { href: "#about", label: "About", num: "01" },
  { href: "#trajectory", label: "Trajectory", num: "02" },
  { href: "#writing", label: "Writing", num: "03" },
  { href: "#conversation", label: "Conversation", num: "04" },
];

export default function Nav() {
  return (
    <nav
      aria-label="Primary"
      className="sticky top-0 z-30 w-full border-b border-rule/60 bg-paper/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
        <Link
          href="/"
          className="font-display text-xl tracking-tight text-ink hover:opacity-70 md:text-2xl"
        >
          Uri&nbsp;Itai
          <span className="ml-1 align-super text-[0.55em] tracking-normal text-muted">
            Ph.D.
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {items.map((it) => (
            <li key={it.href}>
              <Link
                href={it.href}
                className="group flex items-baseline gap-2 font-mono-cap text-ink/80 transition-colors hover:text-accent"
              >
                <span className="text-[0.55rem] text-muted group-hover:text-accent/70">
                  §&nbsp;{it.num}
                </span>
                <span>{it.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="#conversation"
          className="group inline-flex items-center gap-2 rounded-full border border-ink px-4 py-2 font-mono-cap text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          <span className="hidden sm:inline">Book a conversation</span>
          <span className="sm:hidden">Book</span>
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </nav>
  );
}
