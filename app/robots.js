// The handbook is served under the main site at /criticalminerals/handbook
// (see sitemap.js).
const SITE = "https://www.homeworld.bio/criticalminerals/handbook";

// Served at <basePath>/robots.txt.
//
// IMPORTANT: crawlers only read the origin-root /robots.txt, which on this
// domain is WordPress's. This file is therefore informational — the rules that
// actually bind crawlers live in WordPress. The moderation screen is kept out
// of search results by a noindex tag in app/admin/layout.js instead.
//
// `/admin/comments` is disallowed here as well: it is the comment-moderation
// screen and has no business in search results. It is separately protected by
// ADMIN_TOKEN — the robots rule is about search visibility only, and is not,
// and never should be, the thing guarding it.
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: "https://www.homeworld.bio",
  };
}
