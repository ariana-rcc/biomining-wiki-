const SITE = "https://biomininghandbook.homeworld.bio";

// Served at /robots.txt — the first thing a search engine asks for. Before this,
// /robots.txt returned a 404, and the sitemap line below did not exist anywhere, so
// Google had no pointer to the page list.
//
// `/admin/comments` is disallowed: it is the comment-moderation screen and has no
// business in search results. It IS properly protected — it asks for an admin token
// (ADMIN_TOKEN) before showing anything. Checked 2026-07-22. The robots rule is only to
// keep it out of search results; it is not, and never should be, the thing guarding it.
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
