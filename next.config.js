/** @type {import('next').NextConfig} */
const basePath = '/criticalminerals/handbook';

const nextConfig = {
  // Served under the WordPress site at /criticalminerals/handbook via nginx reverse-proxy.
  // basePath prefixes next/link, next/image and /_next/ bundle assets automatically.
  // NOTE: raw asset strings (<img src="/...">, CSS url('/...')) are NOT prefixed by basePath —
  // build those paths with process.env.NEXT_PUBLIC_BASE_PATH (exposed via env below).
  basePath,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString(),
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  async redirects() {
    return [
      // Old subdomain -> the handbook's path on the main site.
      //
      // These MUST live here rather than in middleware: `basePath` also scopes
      // the middleware `matcher`, so a request to
      // biomininghandbook.homeworld.bio/glossary never matches it and falls
      // through to a Vercel platform 404. Config redirects run at the routing
      // layer, ahead of the 404, and opt out of the prefix via `basePath: false`.
      //
      // Loop-safe: nginx proxies with `Host: biomining-wiki-gules.vercel.app`,
      // which never matches this `has` host condition.
      {
        source: '/',
        has: [{ type: 'host', value: 'biomininghandbook.homeworld.bio' }],
        destination: 'https://www.homeworld.bio/criticalminerals/handbook',
        permanent: true,
        basePath: false,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'biomininghandbook.homeworld.bio' }],
        destination: 'https://www.homeworld.bio/criticalminerals/handbook/:path*',
        permanent: true,
        basePath: false,
      },

      { source: '/for-biologists', destination: '/mining-101', permanent: true },
      { source: '/for-biologists/:path*', destination: '/mining-101/:path*', permanent: true },
      { source: '/for-miners', destination: '/biology-101', permanent: true },
      { source: '/for-miners/:path*', destination: '/biology-101/:path*', permanent: true },
      { source: '/technology-evaluation', destination: '/technology-assessment', permanent: true },
      { source: '/technology-evaluation/:path*', destination: '/technology-assessment/:path*', permanent: true },
      { source: '/research', destination: '/frontier-challenges', permanent: true },
      { source: '/research/:path*', destination: '/frontier-challenges/:path*', permanent: true },
      { source: '/citations', destination: '/references', permanent: true },
      { source: '/citations/:path*', destination: '/references/:path*', permanent: true },
    ];
  },
}

module.exports = nextConfig
