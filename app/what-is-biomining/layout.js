import { pageMeta } from '../seo';

// Server component wrapping a 'use client' page. Client components cannot
// export `metadata`, so the route's canonical URL is declared here.
export const metadata = pageMeta({ slug: 'what-is-biomining' });

export default function Layout({ children }) {
  return children;
}
