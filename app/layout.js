import './globals.css'
import Navigation from './Navigation'
import Footer from './Footer'
import PageTransition from './components/PageTransition'
import { Analytics } from "@vercel/analytics/next"
import Script from 'next/script'

// metadataBase now points at the nested home so canonicals resolve to the new path.
// NOTE: og/twitter image URLs are absolute on purpose — a leading-slash path ('/og-image.png')
// resolves against the ORIGIN and would drop the /criticalminerals/handbook prefix.
export const metadata = {
  metadataBase: new URL('https://www.homeworld.bio/criticalminerals/handbook'),
  title: 'The Biomining Handbook - A Practical Guide for Biologists and Mining Professionals',
  description: 'An interactive guide to where biotechnology fits in critical mineral recovery',
  openGraph: {
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
