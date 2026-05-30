import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";

// Why fragments and not just one root URL? Each section of this site is
// effectively its own document — About, Trajectory, Writing,
// Conversation, Correspondence — and Google does index hash-anchored
// links as separate result snippets ("jump-to" results). Listing them
// gives the site a stronger semantic surface in search.
//
// Note: the sitemap protocol technically considers fragment URLs as
// pointing at the same resource — search engines will treat them as
// supplementary, not unique pages. That's fine for our purposes.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const base = SITE_URL;

  return [
    {
      url: base,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/#about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/#trajectory`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/#writing`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base}/#conversation`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/#correspondence`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
