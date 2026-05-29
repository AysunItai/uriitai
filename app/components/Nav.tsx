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
    <nav
      aria-label="Primary"
      className="sticky top-0 z-30 w-full border-b border-rule/60 bg-paper/85 backdrop-blur-md"
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
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>

          {/* Hamburger — visible below xl. */}
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav-drawer"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="relative grid h-11 w-11 place-items-center rounded-full border border-ink/80 text-ink transition-colors hover:bg-ink hover:text-paper xl:hidden"
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

      {/* Mobile drawer. */}
      <div
        id="mobile-nav-drawer"
        aria-hidden={!open}
        className={`xl:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop. */}
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={`fixed inset-0 z-20 bg-ink/30 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Panel. */}
        <div
          className={`fixed inset-x-0 top-[var(--nav-h,64px)] z-30 origin-top border-b border-rule bg-paper transition-[transform,opacity] duration-300 ease-out ${
            open
              ? "translate-y-0 opacity-100"
              : "-translate-y-3 opacity-0"
          }`}
          style={{ ["--nav-h" as string]: "60px" }}
        >
          <ul className="mx-auto flex max-w-[1400px] flex-col px-5 py-4 sm:px-6">
            {items.map((it, i) => (
              <li
                key={it.href}
                className={i > 0 ? "border-t border-rule/70" : ""}
              >
                <Link
                  href={it.href}
                  onClick={() => setOpen(false)}
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
            <li className="mt-2 border-t border-rule/70 pt-5">
              <Link
                href="#conversation"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-mono-cap text-paper"
              >
                Book a conversation
                <span aria-hidden>→</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
