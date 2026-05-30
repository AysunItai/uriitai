import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";

// We want everything indexed (it's a public personal site) and we point
// crawlers at the sitemap so they discover every section we listed.
//
// Disallowing /api/ is a forward-looking guard: today there are no API
// routes, but if any get added later (form handlers, CMS hooks) crawlers
// shouldn't waste their budget on them.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
