# Uri Itai, Ph.D. — site

A minimal, editorial portfolio for Uri Itai, set in `Instrument Serif` and
`Inter`. The hero is a **live mathematical artwork**: a 4-point interpolatory
subdivision scheme (Dyn–Levin–Gregory) — the subject of Uri's doctorate —
recomputed every frame and gently perturbed by the cursor. The career
trajectory is rendered as a second subdivision curve threaded through each
role as a control point.

The site reads like a small research publication: section markers (§ 01, § 02
…), serif display type, paper-tone palette, oxblood accent, mono caps for
metadata.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- Tailwind CSS v4 (`@theme`, `@utility`)
- TypeScript

## Run

```bash
nvm use 22         # Node ≥ 20.9 required by Next 16
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start
```

## Environment

| Var                       | Purpose                                                                     | Default                  |
|---------------------------|-----------------------------------------------------------------------------|--------------------------|
| `NEXT_PUBLIC_SITE_URL`    | Canonical site URL — used by metadata, Open Graph, sitemap, robots, JSON-LD | `https://uriitai.com`    |
| `NEXT_PUBLIC_CALENDLY_URL`| Calendly booking URL embedded in `§ 04 · Conversation`                      | `https://calendly.com/uri-itai/30min` |

Set in production (Vercel / Netlify / wherever) before the first deploy. Both
need to be `NEXT_PUBLIC_*` because they're read in client components and OG
generators that get inlined at build time.

## SEO and shareability

The site is wired for first-class SEO and rich link previews:

- **Metadata** (`app/layout.tsx`) — title template, ~155-character description,
  keyword set, canonical URL, robots directives, Apple Web App tags, and a
  `metadataBase` that makes every URL field below safe to write as a relative
  path.
- **JSON-LD structured data** — two schema.org blocks (`Person` + `WebSite`)
  rendered in the `<body>`, giving Google enough signal to build a Knowledge
  Panel for "Uri Itai".
- **Open Graph image** (`app/opengraph-image.tsx`) — a 1200×630 PNG generated
  at build time via `next/og`, featuring the same 4-point subdivision curve as
  the hero. Real Instrument Serif is fetched from the `google/fonts` GitHub
  repo so the share preview matches the site's typography exactly. This is
  what people see in WhatsApp, Facebook, X, LinkedIn, iMessage, Slack…
- **Twitter card** (`app/twitter-image.tsx`) — re-exports the OG image so X
  unfurls a `summary_large_image` card with the same artwork.
- **Favicon** (`app/icon.tsx`, `app/apple-icon.tsx`) — serif "U" mark with an
  oxblood accent dot, generated programmatically. Replaces the default
  Vercel/Next.js triangle that ships with `create-next-app`. 32×32 for tabs,
  180×180 for iOS home-screen.
- **Sitemap** (`app/sitemap.ts`) — root + each `§` section as a fragment URL.
- **Robots** (`app/robots.ts`) — allow everything except `/api/` and `/_next/`,
  point crawlers at the sitemap.

After deploying, submit `https://uriitai.com/sitemap.xml` to
[Google Search Console](https://search.google.com/search-console) to seed
indexing.

## Sections

```
§ 00  Frontispiece    Hero with the live subdivision curve.
§ A   Premise         Manifesto + three pillars (Theory · Practice · Teaching).
§ 01  About           Bio + generative SVG portrait placeholder.
§ 02  Trajectory      The career as a refined curve through 13 control points.
§ 03  Writing         Medium essays + selected publications.
§ 04  Conversation    Booking card + contact channels.
§ 05  Correspondence  Beautiful-mind contact form (mailto, live FNV-1a hash).
```

## What to update

| Where                                       | Status                                                                |
|---------------------------------------------|-----------------------------------------------------------------------|
| `Portrait()` in `app/components/About.tsx`  | ✅ Real photograph wired (`public/uri.jpg`) — swap the file or update the path to refresh.   |
| Calendly URL                                | ✅ Wired to <https://calendly.com/uri-itai/30min>. Override via `NEXT_PUBLIC_CALENDLY_URL` if it changes. |
| Email                                       | ✅ `hello@uriitai.com` (Conversation + Footer).                       |
| Essay items in `app/components/Writing.tsx` | Real Medium URLs / titles when the canonical posts are picked.        |

## Design notes

- The hero canvas runs the full 4-point interpolatory rule
  `p_{2i+1} = -1/16·p_{i-1} + 9/16·p_i + 9/16·p_{i+1} - 1/16·p_{i+2}` over five
  refinement levels each frame, drawing each level at decreasing opacity so
  you see the limit curve emerge in real time.
- The trajectory rail uses the same scheme over only three refinement levels
  for a smoother backbone.
- Colors live in `app/globals.css` under `@theme` — change `--color-paper`,
  `--color-ink`, `--color-accent` to retune the palette.
- Respects `prefers-reduced-motion`: the hero curve freezes for users who ask
  for less motion.
