"use client";

import { useEffect, useState } from "react";

// Phone number: 00972522633810 (Israel mobile). The wa.me deep-link
// format requires the international prefix WITHOUT leading zeros and
// WITHOUT the `+` sign — so we strip the `00` here. Storing the raw
// number in code makes it easy to grep, easy to update, and means the
// link is identical on every render (no hydration mismatch risk from
// formatting differences between server and client).
const PHONE_INTL = "972522633810";

// Pre-filled greeting that opens the conversation. WhatsApp's API
// requires URL-encoded text via the `text` query param. Keeping it
// short, in the same voice as the rest of the site — referencing the
// fact that they came from his website lets Uri triage messages that
// originate here vs. from contacts saved in his phone.
const GREETING =
  "Hi Uri — I came across your site and wanted to start a conversation about ";

const WHATSAPP_URL = `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(
  GREETING,
)}`;

// The official WhatsApp brand green. Using the canonical glyph and
// colour matters for instant recognition — most users learn the icon
// shape long before they read alt text.
const BRAND_GREEN = "#25D366";

export default function WhatsAppFab() {
  // We delay first render until the user has scrolled a little, so the
  // hero composition stays clean on first paint. ~120px is enough to
  // pass the headline; after that the button fades in.
  const [visible, setVisible] = useState(false);

  // The mobile nav drawer is its own fullscreen overlay (panel z-50,
  // backdrop z-30). We listen for `aria-hidden="false"` on the drawer
  // and hide ourselves while it's open, so we don't punch a hole
  // through the dimmed backdrop.
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const drawer = document.getElementById("mobile-nav-drawer");
    if (!drawer) return;
    // MutationObserver instead of polling: we only re-read when the
    // drawer's attributes actually change, so this costs nothing while
    // the user is just reading the page.
    const update = () =>
      setDrawerOpen(drawer.getAttribute("aria-hidden") === "false");
    update();
    const obs = new MutationObserver(update);
    obs.observe(drawer, { attributes: true, attributeFilter: ["aria-hidden"] });
    return () => obs.disconnect();
  }, []);

  const hidden = !visible || drawerOpen;

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Uri on WhatsApp"
      // z-20 keeps the button above page content but BELOW the mobile
      // drawer backdrop (z-30) and panel (z-50), so the drawer reads
      // as a clean overlay when it opens. The pair of focus styles
      // (offset + accent ring) keeps keyboard users oriented.
      className={`group fixed bottom-5 right-5 z-20 flex items-center gap-3 rounded-full bg-paper py-3 pl-3 pr-4 shadow-[0_8px_24px_-8px_rgba(20,17,15,0.35)] ring-1 ring-rule/70 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-10px_rgba(20,17,15,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:bottom-7 sm:right-7 ${
        hidden
          ? "pointer-events-none translate-y-3 opacity-0"
          : "translate-y-0 opacity-100"
      }`}
      style={{
        // Honour iOS safe-area so the button doesn't sit under the
        // home indicator in landscape on a notched device.
        marginBottom: "env(safe-area-inset-bottom, 0)",
      }}
    >
      {/* The brand glyph. Drawn inline (rather than imported as an SVG
          file) so the markup has no extra request and the colour token
          stays editable in this file. Path data is from the canonical
          WhatsApp brand mark. */}
      <span
        aria-hidden
        className="relative flex h-10 w-10 items-center justify-center rounded-full"
        style={{ backgroundColor: BRAND_GREEN }}
      >
        <svg
          viewBox="0 0 32 32"
          width={22}
          height={22}
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.788 3.41 4.83 4.342.515.237 2.406 1.103 2.948 1.103.616 0 1.654-.337 1.926-.938.214-.485.357-1.018.357-1.547 0-.43-2.108-1.398-2.42-1.398zm-3.04 8.378c-1.94 0-3.81-.586-5.398-1.696L6.78 25.137l1.27-3.764A9.737 9.737 0 0 1 6.32 16c0-5.387 4.385-9.78 9.785-9.78 5.387 0 9.78 4.395 9.78 9.78 0 5.388-4.394 9.583-9.78 9.583zM16.105 4.21C9.6 4.21 4.32 9.494 4.32 16c0 2.21.62 4.395 1.804 6.296L4.04 28.81a.36.36 0 0 0 .085.36.385.385 0 0 0 .272.114h.083l6.81-1.787a11.677 11.677 0 0 0 4.815 1.04c6.502 0 11.79-5.27 11.79-11.776 0-3.146-1.232-6.107-3.456-8.336-2.224-2.225-5.18-3.45-8.334-3.45z" />
        </svg>
      </span>

      {/* Label is hidden below sm so the button stays compact on phones,
          where screen real estate is dearest. On tablets and up it's a
          pill — friendlier and clearer about what the button does. */}
      <span className="hidden font-mono-cap text-[0.65rem] leading-none text-ink sm:inline-block">
        Chat on
        <br />
        <span className="text-accent">WhatsApp</span>
      </span>
    </a>
  );
}
