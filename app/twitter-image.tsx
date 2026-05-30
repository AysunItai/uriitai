// X/Twitter share preview is the same image as the Open Graph one. We
// import-and-re-export so we keep a single source of truth — change the
// curve, the type, the palette in opengraph-image.tsx and both share
// previews update together.
//
// Why a separate file at all? Next.js' file conventions: a route segment
// only registers a `twitter:image` <meta> tag if a `twitter-image.*`
// file exists. Without this, X falls back to the OG image — which works,
// but with this we get the proper `summary_large_image` card with a
// dedicated <meta name="twitter:image"> tag pointing at this route.
export { default, size, contentType, alt } from "./opengraph-image";
