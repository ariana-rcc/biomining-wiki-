// Shared SEO helpers.
//
// The handbook is served at www.homeworld.bio/criticalminerals/handbook by an
// nginx reverse proxy on the WordPress origin, with Next.js `basePath` set to
// the same path. `basePath` covers routing and framework assets; metadata URLs
// need the care described below.

export const SITE_ORIGIN = 'https://www.homeworld.bio';
export const CRITICAL_MINERALS = `${SITE_ORIGIN}/criticalminerals/`;
export const HANDBOOK_BASE = `${SITE_ORIGIN}/criticalminerals/handbook`;

/**
 * Absolute canonical URL for a handbook route.
 *
 * These MUST be absolute. A leading-slash path ('/glossary') resolves against
 * the metadataBase ORIGIN, silently dropping the /criticalminerals/handbook
 * prefix and producing www.homeworld.bio/glossary — a WordPress 404. The same
 * trap applies to the og:image URLs in app/layout.js. Relative forms ('./')
 * resolve per-route but the behaviour is subtle; absolute is deterministic.
 */
export function canonical(slug = '') {
  const clean = String(slug).replace(/^\/+/, '').replace(/\/+$/, '');
  return clean ? `${HANDBOOK_BASE}/${clean}` : HANDBOOK_BASE;
}

/**
 * Metadata for a handbook route.
 *
 * `title` and `description` are optional: a route that omits them inherits the
 * root layout's. Passing a `title` gives the route its own, rendered through
 * the root layout's title.template.
 */
export function pageMeta({ slug = '', title, description } = {}) {
  const url = canonical(slug);
  const meta = {
    alternates: { canonical: url },
    openGraph: { url },
  };
  if (title) meta.title = title;
  if (description) {
    meta.description = description;
    meta.openGraph.description = description;
  }
  return meta;
}

/**
 * BreadcrumbList structured data, stating that the handbook sits inside the
 * main site's hierarchy:
 *
 * Homeworld Collective › Critical Minerals › Biomining Handbook › <page>
 */
export function breadcrumbJsonLd({ slug = '', name } = {}) {
  const trail = [
    { name: 'Homeworld Collective', item: SITE_ORIGIN },
    { name: 'Critical Minerals', item: CRITICAL_MINERALS },
    { name: 'Biomining Handbook', item: HANDBOOK_BASE },
  ];

  if (slug && name) {
    trail.push({ name, item: canonical(slug) });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((entry, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}

/** WebSite + Organization, emitted once on the handbook home page. */
export function siteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${HANDBOOK_BASE}#website`,
        url: HANDBOOK_BASE,
        name: 'The Biomining Handbook',
        description:
          'An interactive guide to where biotechnology fits in critical mineral recovery',
        publisher: { '@id': `${SITE_ORIGIN}#organization` },
        inLanguage: 'en',
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_ORIGIN}#organization`,
        name: 'Homeworld Collective',
        url: SITE_ORIGIN,
        description:
          'A 501(c)(3) nonprofit growing the climate biotech community.',
      },
    ],
  };
}
