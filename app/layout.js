import './globals.css'
import Navigation from './Navigation'
import Footer from './Footer'
import PageTransition from './components/PageTransition'
import { Analytics } from "@vercel/analytics/next"
import Script from 'next/script'
import { canonical, breadcrumbJsonLd, siteJsonLd } from './seo'

// metadataBase is the handbook's home, so relative metadata URLs resolve there.
// NOTE: og/twitter image URLs are absolute on purpose — a leading-slash path
// ('/og-image.png') resolves against the ORIGIN and drops the
// /criticalminerals/handbook prefix.
export const metadata = {
  metadataBase: new URL('https://www.homeworld.bio/criticalminerals/handbook'),
  // `template` applies to any child route that sets its own `title`; routes
  // that don't set one fall back to `default`.
  title: {
    default: 'The Biomining Handbook - A Practical Guide for Biologists and Mining Professionals',
    template: '%s | The Biomining Handbook',
  },
  description: 'An interactive guide to where biotechnology fits in critical mineral recovery',
  // Canonical for the handbook home. Setting `metadataBase` alone does NOT
  // emit <link rel="canonical">. Without one, the same content is reachable at
  // both this path and the raw proxy target biomining-wiki-gules.vercel.app
  // (public, 200, no noindex), with nothing signalling which should rank.
  //
  // Do NOT try to noindex the .vercel.app host by Host header: nginx proxies
  // with `Host: biomining-wiki-gules.vercel.app`, so a host-based rule would
  // match live traffic too. Canonicals are the safe fix.
  alternates: {
    canonical: canonical(),
  },
  openGraph: {
    url: canonical(),
    title: 'The Biomining Handbook',
    description: 'A practical guide for biologists and mining professionals',
    images: [{ url: 'https://www.homeworld.bio/criticalminerals/handbook/og-image.png', width: 1200, height: 630, alt: 'The Biomining Handbook' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Biomining Handbook',
    description: 'A practical guide for biologists and mining professionals',
    images: ['https://www.homeworld.bio/criticalminerals/handbook/og-image.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/*
          Structured data. BreadcrumbList states that the handbook sits inside
          the main site's hierarchy: Homeworld Collective › Critical Minerals ›
          Biomining Handbook.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd()) }}
        />
      </head>
      <body className="font-sans antialiased">
        <Navigation />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <Analytics />
        <Script async src="https://plausible.io/js/pa-aToVkU0JCR7Uwot-Ew6PF.js" strategy="afterInteractive" />
        <Script id="plausible-init" strategy="afterInteractive">
          {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`}
        </Script>
      </body>
    </html>
  )
}
