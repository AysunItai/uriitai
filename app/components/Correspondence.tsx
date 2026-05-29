"use client";

import { useMemo, useState, type FormEvent } from "react";
import SectionLabel from "./SectionLabel";

/**
 * Correspondence — a contact form with the aesthetic of a Beautiful-Mind
 * window pane. Field labels are mathematical assignments (α := …), the
 * background is a faint constellation of equations, and a live FNV-1a
 * signature is computed from the visitor's note as they type, in the
 * spirit of Nash decoding patterns most people would never see.
 *
 * Submission opens the visitor's default email composer with a fully
 * formatted message — no backend required, no API key, no third party.
 */
export default function Correspondence() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  // FNV-1a 32-bit — small, deterministic, and matches the "find the pattern
  // in the noise" feeling. We render it as 8 hex chars beside the message
  // counter, updating live as the visitor types.
  const signature = useMemo(() => {
    if (!message) return "—       ";
    let h = 0x811c9dc5;
    for (let i = 0; i < message.length; i++) {
      h ^= message.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return (h >>> 0).toString(16).padStart(8, "0");
  }, [message]);

  const charCount = message.length;
  const wordCount = message.trim().length
    ? message.trim().split(/\s+/).length
    : 0;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subj = subject.trim() || "A note via uriitai.com";
    const sender = [name.trim(), email.trim()].filter(Boolean).join(" · ");
    const body = [
      message.trim(),
      "",
      "—",
      sender,
      `sig ${signature}`,
    ]
      .filter((line) => line !== undefined)
      .join("\n");

    const url = `mailto:hello@uriitai.com?subject=${encodeURIComponent(
      subj
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setSent(true);
  }

  return (
    <section
      id="correspondence"
      aria-labelledby="correspondence-heading"
      className="relative scroll-mt-24 overflow-hidden border-b border-rule/60 bg-paper-deep/40"
    >
      <Backdrop />

      <div className="relative mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8 md:gap-y-10">
          <div className="col-span-12 md:col-span-2">
            <SectionLabel number="05" title="Correspondence" />
          </div>

          <div className="col-span-12 md:col-span-10">
            <h2
              id="correspondence-heading"
              className="max-w-[14ch] font-display text-[clamp(2rem,5.4vw,4.8rem)] leading-[0.98] text-ink"
            >
              A note,{" "}
              <span className="italic text-accent">then</span>.
            </h2>
            <p className="mt-5 max-w-prose text-base text-ink-soft sm:mt-6 sm:text-lg">
              If a calendar feels presumptuous — write a paragraph instead.
              I read every message and reply within a few&nbsp;days, in
              English or&nbsp;Hebrew.
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="col-span-12 mt-2 grid grid-cols-1 gap-x-6 gap-y-7 sm:mt-4 sm:grid-cols-2 md:col-span-10 md:col-start-3 md:gap-y-9"
          >
            <Field
              symbol="α"
              label="From"
              type="text"
              name="name"
              value={name}
              onChange={setName}
              autoComplete="name"
              placeholder="Ada Lovelace"
              required
            />
            <Field
              symbol="β"
              label="At"
              type="email"
              name="email"
              value={email}
              onChange={setEmail}
              autoComplete="email"
              placeholder="ada@analyticalengine.org"
              required
            />

            <div className="sm:col-span-2">
              <FieldLabel symbol="γ" label="Re" htmlFor="cs-subject" />
              <input
                id="cs-subject"
                type="text"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Convex hulls in production · a quick question"
                className={INPUT_CLS}
              />
            </div>

            <div className="sm:col-span-2">
              <FieldLabel symbol="δ" label="Note" htmlFor="cs-note" />
              <textarea
                id="cs-note"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                required
                placeholder="A few sentences about the problem you're chewing on. Where it lives in the stack, what's already been tried, what 'good' would look like."
                className={`${INPUT_CLS} resize-none`}
              />
              <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 font-mono-cap text-muted">
                <span>
                  ƒ(n) = {charCount} chars · {wordCount} words
                </span>
                <span className="text-accent/80">
                  sig&nbsp;<span className="tabular-nums">{signature}</span>
                </span>
              </div>
            </div>

            <div className="mt-2 flex flex-col items-stretch gap-4 border-t border-rule pt-6 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <p className="font-mono-cap text-muted">
                {sent
                  ? "✓ Email composer opened — send when ready."
                  : "Drafts in your default email composer · hello@uriitai.com"}
              </p>
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 font-mono-cap text-paper transition-colors hover:bg-accent"
              >
                Send dispatch
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  ↗
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

const INPUT_CLS =
  "mt-2 w-full border-0 border-b border-ink/25 bg-transparent py-2 font-display text-xl text-ink outline-none transition-colors placeholder:text-muted/60 placeholder:italic focus:border-accent sm:text-2xl";

function FieldLabel({
  symbol,
  label,
  htmlFor,
}: {
  symbol: string;
  label: string;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-baseline gap-3 font-mono-cap text-muted"
    >
      <span
        aria-hidden
        className="font-display text-base italic normal-case tracking-normal text-accent"
      >
        {symbol}
      </span>
      <span>{label}</span>
      <span
        aria-hidden
        className="font-display text-base italic normal-case tracking-normal text-muted/60"
      >
        :=
      </span>
    </label>
  );
}

function Field({
  symbol,
  label,
  type,
  name,
  value,
  onChange,
  required,
  placeholder,
  autoComplete,
}: {
  symbol: string;
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  const id = `cs-${name}`;
  return (
    <div>
      <FieldLabel symbol={symbol} label={label} htmlFor={id} />
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={INPUT_CLS}
      />
    </div>
  );
}

/**
 * Backdrop — equations and a faint dot-grid pinned to the section's
 * viewport, like John Nash's window in Princeton. Positions are derived
 * from a deterministic hash of the index, so SSR and CSR agree exactly
 * (no hydration mismatch).
 */
function Backdrop() {
  const tokens = [
    "p_{2i+1} = -1/16·p_{i-1} + 9/16·p_i + 9/16·p_{i+1} - 1/16·p_{i+2}",
    "∂L/∂θ → 0",
    "∮ ω = ∫ dω",
    "lim_{n→∞} (1 + 1/n)^n = e",
    "Σ_{k=0}^{n} (n choose k) = 2^n",
    "γ(s) ⊂ ℝ²",
    "P(A|B) = P(B|A)·P(A)/P(B)",
    "Δx · Δp ≥ ℏ/2",
    "e^{iπ} + 1 = 0",
    "∇·E = ρ/ε₀",
    "α · β ≠ β · α",
    "ker(T) ⊕ im(Tᵀ) = V",
    "𝟙_{A∩B} = 𝟙_A · 𝟙_B",
    "‖x‖² = ⟨x, x⟩",
    "ℙ(X ≤ x) = ∫₋∞ˣ f(t) dt",
    "det(A − λI) = 0",
    "f̂(ξ) = ∫ f(x) e^{−2πixξ} dx",
    "Cov(X, Y) = E[XY] − E[X]E[Y]",
  ];

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
      viewBox="0 0 1000 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="cs-dots"
          width="14"
          height="14"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="0.5" fill="#14110f" />
        </pattern>
      </defs>
      <rect width="1000" height="800" fill="url(#cs-dots)" />
      <g fill="#14110f" fontFamily="ui-monospace, monospace">
        {tokens.map((t, i) => {
          const x = (i * 137) % 1000;
          const y = ((i * 211) % 740) + 40;
          const rot = ((i * 23) % 30) - 15;
          const size = 14 + (i % 5) * 3;
          const op = 0.45 + ((i * 7) % 5) * 0.1;
          return (
            <text
              key={i}
              x={x}
              y={y}
              transform={`rotate(${rot} ${x} ${y})`}
              fontSize={size}
              opacity={op}
            >
              {t}
            </text>
          );
        })}
      </g>
    </svg>
  );
}
