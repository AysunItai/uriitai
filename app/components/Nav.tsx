"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const items = [
  { href: "#about", label: "About", num: "01" },
  { href: "#trajectory", label: "Trajectory", num: "02" },
  { href: "#writing", label: "Writing", num: "03" },
  { href: "#conversation", label: "Conversation", num: "04" },
  { href: "#correspondence", label: "Correspondence", num: "05" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on resize past the xl breakpoint, in case the drawer was open.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    // Fragment so the drawer sits OUTSIDE of <nav>. Reason: the nav has
    // `backdrop-blur-md`, which (per CSS spec) makes the nav itself the
    // containing block for any `position: fixed` descendant. If the
    // drawer were rendered inside, scrolling would anchor it to the
    // nav's original document position (= the very top of the page),
    // which is exactly the bug we hit. Rendered outside, it's anchored
    // to the viewport like a real overlay.
    <>
      <nav
        aria-label="Primary"
        className="sticky top-0 z-40 w-full border-b border-rule/60 bg-paper/85 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3 sm:px-6 sm:py-4 md:px-10">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-display text-xl tracking-tight text-ink transition-opacity hover:opacity-70 md:text-2xl"
          >
            Uri&nbsp;Itai
            <span className="ml-1 align-super text-[0.55em] tracking-normal text-muted">
              Ph.D.
            </span>
          </Link>

          {/* Desktop links — only visible at xl and up so the 5-item rail isn't cramped. */}
          <ul className="hidden items-center gap-6 xl:flex 2xl:gap-8">
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

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="#conversation"
              onClick={() => setOpen(false)}
              className="group hidden items-center gap-2 rounded-full border border-ink px-4 py-2 font-mono-cap text-ink transition-colors hover:bg-ink hover:text-paper sm:inline-flex"
            >
              <span className="hidden md:inline">Book a conversation</span>
              <span className="md:hidden">Book</span>
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>

              {/* Hamburger — visible below xl. h-12 (48px) on mobile to
                meet Samsung One UI / Material 3 guidelines for tap
                targets; tightens to h-11 on sm+ where the bar gets
                more vertical room. */}
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav-drawer"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
              className="relative grid h-12 w-12 place-items-center rounded-full border border-ink/80 text-ink transition-colors hover:bg-ink hover:text-paper sm:h-11 sm:w-11 xl:hidden"
              style={{ touchAction: "manipulation" }}
            >
              <span className="sr-only">Menu</span>
              <span aria-hidden className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 top-0 block h-px w-5 origin-center bg-current transition-transform duration-300 ${
                    open ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 block h-px w-5 -translate-y-1/2 bg-current transition-opacity duration-200 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 block h-px w-5 origin-center bg-current transition-transform duration-300 ${
                    open ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer — rendered as a sibling of <nav> so its fixed
          children resolve against the viewport, not the nav. */}
      <div
        id="mobile-nav-drawer"
        aria-hidden={!open}
        className={`xl:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop — z-30 sits BELOW the nav (z-40) so the user can still
            see and tap the X to close, but ABOVE all page content. */}
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
          className={`fixed inset-0 z-30 bg-ink/30 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Panel — top values match the rendered nav height. With the
            48px hamburger + py-3 on mobile, the bar is 72px; with the
            44px hamburger + py-4 on sm+, it's 76px. Setting the panel
            flush below those keeps the drawer visually anchored to the
            bar at every breakpoint. */}
        <div
          className={`fixed inset-x-0 top-[72px] z-50 origin-top border-b border-rule bg-paper transition-[transform,opacity] duration-300 ease-out sm:top-[76px] ${
            open
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-3 opacity-0"
          }`}
        >
          {/* Slightly tighter top padding (pt-2 vs the original py-4)
              so the first link sits closer to the nav and the panel
              doesn't open with an empty band at the top — that was
              reading as unfinished on Samsung Galaxy. The CTA below
              keeps its breathing room via the explicit mt-4 + pt-5. */}
          <ul className="mx-auto flex max-w-[1400px] flex-col px-5 pb-6 pt-2 sm:px-6 sm:pb-8 sm:pt-3">
            {items.map((it, i) => (
              <li
                key={it.href}
                className={i > 0 ? "border-t border-rule/70" : ""}
              >
                <Link
                  href={it.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="flex items-baseline gap-4 py-5 transition-colors hover:text-accent"
                >
                  <span className="font-mono-cap text-accent/80">
                    §&nbsp;{it.num}
                  </span>
                  <span className="font-display text-3xl text-ink">
                    {it.label}
                  </span>
                </Link>
              </li>
            ))}
            {/* CTA spans the full width on mobile so it reads as the
                terminal action of the menu, not just another link. */}
            <li className="mt-4 border-t border-rule/70 pt-5">
              <Link
                href="#conversation"
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="flex w-full items-center justify-between gap-2 rounded-full bg-ink px-6 py-4 font-mono-cap text-paper transition-colors hover:bg-accent"
              >
                Book a conversation
                <span aria-hidden>→</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
