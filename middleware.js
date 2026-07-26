import { NextResponse } from 'next/server';

// Old subdomain 301 → new nested path on the main site.
// The handbook now lives at www.homeworld.bio/criticalminerals/handbook (nginx reverse-proxy).
// Requests that still arrive on the old subdomain are redirected, path preserved.
const OLD_HOST = 'biomininghandbook.homeworld.bio';
const NEW_BASE = 'https://www.homeworld.bio/criticalminerals/handbook';

export function middleware(request) {
  const host = (request.headers.get('host') || '').toLowerCase();

  // Only fire for the old subdomain. NEVER redirect the proxy host
  // (biomining-wiki-gules.vercel.app) or www.homeworld.bio — doing so would
  // redirect the exact traffic nginx is proxying and cause a loop.
  if (host === OLD_HOST) {
    // String-concat, NOT `new URL('/path', NEW_BASE)`: a leading-slash path
    // resolves against the origin and would drop the /criticalminerals/handbook prefix.
    const dest = NEW_BASE + request.nextUrl.pathname + request.nextUrl.search;
    return NextResponse.redirect(dest, 308);
  }

  return NextResponse.next();
}

// Run on everything except Next internals and static assets, so the redirect
// covers every old page URL without touching /_next or asset requests.
export const config = {
  matcher: ['/((?!_next/|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|txt|xml)$).*)'],
};
