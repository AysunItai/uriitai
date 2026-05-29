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

## Sections

```
§ 00  Frontispiece    Hero with the live subdivision curve.
§ A   Premise         Manifesto + three pillars (Theory · Practice · Teaching).
§ 01  About           Bio + generative SVG portrait placeholder.
§ 02  Trajectory      The career as a refined curve through 13 control points.
§ 03  Writing         Medium essays + selected publications.
§ 04  Conversation    Booking card + contact channels.
```

## What to update

| Where                                | Replace with                                              |
|--------------------------------------|-----------------------------------------------------------|
| `Portrait()` in `app/components/About.tsx` | A real photograph of Uri (`<Image src="/portrait.jpg" … />`). |
| `NEXT_PUBLIC_CALENDLY_URL` env var   | A real Calendly URL. The placeholder card auto-replaces with the embedded calendar when this is set. |
| `hello@uriitai.com` (Conversation, Footer) | Real address.                                             |
| Essay items in `app/components/Writing.tsx` | Real Medium URLs / titles.                            |

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
