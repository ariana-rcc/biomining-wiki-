// New canonical home (2026-07): the handbook now lives under the main WordPress site at
// /criticalminerals/handbook (nginx reverse-proxy). Old host biomininghandbook.homeworld.bio
// 301s here. Sitemap URLs must use the new path so GSC indexes the consolidated location.
const SITE = "https://www.homeworld.bio/criticalminerals/handbook";

// Served at <basePath>/sitemap.xml — the list of pages worth indexing.
// NOTE: submit this exact URL in Google Search Console — the authoritative /robots.txt at the
// domain root is WordPress's, so discovery via the nested robots.txt is not guaranteed.
//
// Why this exists (added 2026-07-22): Google Search Console reported
// "No referring sitemaps detected" and "Referring page: None detected" for this site,
// and the last crawl was three weeks old. Nothing on the web links here — the logo in
// the nav points OUT to www.homeworld.bio, not the other way round — so Google had no
// list of pages and little reason to look for them. Only the homepage was reliably
// indexed; the dozen pages below were left to chance.
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
