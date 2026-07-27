// The handbook is served under the main WordPress site at
// /criticalminerals/handbook via an nginx reverse proxy. Sitemap URLs use that
// path so search engines index the consolidated location.
const SITE = "https://www.homeworld.bio/criticalminerals/handbook";

// Served at <basePath>/sitemap.xml — the list of pages worth indexing.
//
// NOTE: submit this exact URL in Google Search Console. The authoritative
// /robots.txt at the domain root is WordPress's, so discovery via the nested
// robots.txt is not guaranteed.
//
// `/admin/comments` is deliberately ABSENT — see robots.js.
const PAGES = [
  { path: "", priority: 1.0 },
  // The main body of the handbook
  { path: "/what-is-biomining", priority: 0.8 },
  { path: "/mining-101", priority: 0.8 },
  { path: "/biology-101", priority: 0.8 },
  { path: "/complex-materials", priority: 0.8 },
  { path: "/flowsheets", priority: 0.8 },
  { path: "/technology-assessment", priority: 0.8 },
  // Reference material
  { path: "/frontier-challenges", priority: 0.6 },
  { path: "/glossary", priority: 0.6 },
  { path: "/references", priority: 0.6 },
  // Housekeeping pages — real, but not what anyone is searching for
  { path: "/privacy-policy", priority: 0.3 },
  { path: "/version-history", priority: 0.3 },
];

export default function sitemap() {
  return PAGES.map(({ path, priority }) => ({
    url: `${SITE}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
