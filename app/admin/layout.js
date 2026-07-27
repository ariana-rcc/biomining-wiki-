// Keep the comment-moderation screen out of search results.
//
// Why this is needed: robots.txt is per-ORIGIN, and www.homeworld.bio/robots.txt
// is served by WordPress (nginx routes it through `location /`). The handbook's
// own robots.js at /criticalminerals/handbook/robots.txt is NEVER read by
// crawlers, so its `Disallow: /admin` has no effect. This meta tag is the only
// lever the app controls.
//
// Note this is a search-visibility measure only. The screen is separately
// protected by ADMIN_TOKEN — robots rules are not, and must never be, security.
export const metadata = {
  title: 'Comment Moderation',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return children;
}
