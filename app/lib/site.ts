// Single source of truth for the canonical URL.
//
// In dev / preview deploys we point at localhost so absolute URLs in
// Open Graph metadata still resolve to a real host (sharing previews on
// staging won't work, but the build won't fail either).
//
// In production set `NEXT_PUBLIC_SITE_URL=https://uriitai.com` (no
// trailing slash) so absolute URLs in <meta>, sitemap.xml, robots.txt,
// and JSON-LD all agree.
const RAW =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://uriitai.com";

// Strip trailing slash so we can safely concatenate paths everywhere
// without producing `https://uriitai.com//#about`.
export const SITE_URL = RAW.replace(/\/+$/, "");

export const SITE_NAME = "Uri Itai, Ph.D.";

export const SITE_HANDLE = "uriitai";
