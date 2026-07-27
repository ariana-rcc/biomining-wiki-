'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { track } from '@vercel/analytics';
import { AlertCircle } from 'lucide-react';
import ContributeModal from './components/ContributeModal';
import { currentVersion } from './data/versions';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  const [showContribute, setShowContribute] = useState(false);

  const navLinks = [
    { name: 'Biomining Handbook', href: '/' },
    { name: 'Learn', href: '/what-is-biomining' },
    { name: 'For Professionals', href: '/technology-assessment' },
    { name: 'Resources', href: '/frontier-challenges' },
    { name: 'Get Involved', href: null },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, Address: '' })
      });

      if (response.ok) {
        track('Newsletter Signup', { source: 'handbook-footer' });
        setSubmitMessage({ type: 'success', text: "You've been subscribed!" });
        setEmail('');
        setTimeout(() => setSubmitMessage(null), 3000);
      } else {
        setSubmitMessage({ type: 'error', text: 'Failed to subscribe. Please try again.' });
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center max-w-6xl mx-auto px-4 pb-6">
      <div className="w-full">
        <footer className="bg-[#0a3954] text-white rounded-2xl shadow-2xl px-6 sm:px-10 py-8 border border-white overflow-hidden">

          {/* Top section: Logo + pills (left) | Newsletter (right) */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-4">
            <div className="flex flex-col gap-2">
            <div className="flex items-center gap-6">
              <a href="https://www.homeworld.bio" className="shrink-0">
                <img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/homeworld-logo-full.png`} alt="Homeworld Logo" className="h-12" />
              </a>
              <div className="flex flex-wrap gap-2">
                {navLinks.map((link) => (
                  link.href ? (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="px-3 py-1 text-xs text-white border border-white/60 rounded-full hover:bg-white/10 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      key={link.name}
                      onClick={() => setShowContribute(true)}
                      className="px-3 py-1 text-xs text-white border border-white/60 rounded-full hover:bg-white/10 transition-colors"
                    >
                      {link.name}
                    </button>
                  )
                ))}
              </div>
            </div>

            {/* Social links — aligned with email input row */}
            <div className="flex items-center gap-2 text-xs text-white/70 ml-2">
              <span>Follow us on</span>
              <a href="https://www.linkedin.com/company/homeworld-collective" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://x.com/HomeworldBio" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
            </div>

            <div className="shrink-0 lg:mt-4">
              <h4 className="text-base font-semibold text-white mb-2">Newsletter Sign Up</h4>
              <form onSubmit={handleSubmit} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="min-w-0 flex-1 sm:w-44 sm:flex-initial px-4 py-2 text-sm text-white bg-transparent border border-white/60 rounded-full rounded-r-none focus:outline-none focus:border-white placeholder-white/50"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white border border-white/60 border-l-0 rounded-full rounded-l-none hover:bg-white/10 disabled:opacity-50 transition-colors whitespace-nowrap"
                >
                  {isSubmitting ? '...' : 'Sign up'}
                </button>
              </form>
              {submitMessage && (
                <div className={`mt-2 text-xs flex items-center gap-1 ${submitMessage.type === 'success' ? 'text-emerald-300' : 'text-red-300'}`}>
                  <AlertCircle className="w-3 h-3" />
                  <span>{submitMessage.text}</span>
                </div>
              )}
            </div>
          </div>

          {/* Dotted divider */}
          <div className="border-t border-dashed border-white/30 mb-5" />

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-white/50">
            <span>
              © Homeworld Collective Inc {new Date().getFullYear()}
              {'  |  '}
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            </span>
            <span className="sm:text-center">Somerville, MA | San Francisco, CA</span>
            <Link
              href={`/version-history#v${currentVersion.version}`}
              className="hover:text-white transition-colors sm:text-right"
              title="View version history, authors, and contributors"
            >
              v{currentVersion.version}
              {process.env.NEXT_PUBLIC_BUILD_DATE && (
                <> · Updated {new Date(process.env.NEXT_PUBLIC_BUILD_DATE).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</>
              )}
            </Link>
          </div>

        </footer>
      </div>

      <ContributeModal isOpen={showContribute} onClose={() => setShowContribute(false)} />
    </div>
  );
}
