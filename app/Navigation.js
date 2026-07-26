'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import ContributeModal from './components/ContributeModal';
import NewsletterModal from './components/NewsletterModal';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [showContribute, setShowContribute] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);

  const navigation = {
    learn: {
      name: 'Learn',
      items: [
        { name: 'What Is Biomining?', href: '/what-is-biomining' },
        { name: 'Mining 101', href: '/mining-101' },
        { name: 'Biology 101', href: '/biology-101' },
        { name: 'Complex Materials Playbook', href: '/complex-materials' },
        { name: 'Example Flowsheets', href: '/flowsheets' }
      ]
    },
    professionals: {
      name: 'For Professionals',
      items: [
        { name: 'Technology Assessment Checklists', href: '/technology-assessment' }
      ]
    },
    resources: {
      name: 'Resources',
      items: [
        { name: 'Frontier Challenges', href: '/frontier-challenges' },
        { name: 'Core Glossary', href: '/glossary' },
        { name: 'References', href: '/references' }
      ]
    }
  };

  return (
    <div className="flex justify-center max-w-6xl mx-auto px-4 pt-10 pb-2">
      <div className="w-full">
        <nav
          className="bg-[#f9f7f1] border border-[#264563] shadow-lg rounded-2xl overflow-hidden"
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <div className="pl-2 sm:pl-0 pr-3 sm:pr-7">
            <div className="flex items-center justify-between h-[72px] sm:h-[92px] gap-2">

              {/* Logo + Handbook label */}
              <div className="flex items-center min-w-0 flex-1">
                <a href="https://www.homeworld.bio" target="_blank" rel="noopener noreferrer" className="flex items-center sm:-ml-8 shrink-0">
                  <img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/homeworld-logo-full-dark.png`} alt="Homeworld Collective" className="h-14 sm:h-[7.5rem]" />
                </a>
                <div className="hidden sm:block h-10 w-px bg-[#264563]/30 -ml-7 mr-2" />
                <Link href="/" className="text-sm sm:text-lg font-light tracking-wide text-[#264563]/70 uppercase hover:text-[#264563] transition-colors truncate ml-2 sm:ml-0">Biomining Handbook</Link>
              </div>

              {/* Desktop links */}
              <div className="hidden lg:flex lg:items-center lg:space-x-0.5 relative">
                {Object.entries(navigation).map(([key, section], idx, arr) => {
                  const isLast = idx === arr.length - 1;
                  return (
                  <div key={key} onMouseEnter={() => setOpenDropdown(key)} className="relative">
                    <button className="flex items-center px-3.5 py-2 text-xl text-[#264563] hover:bg-gray-300/40 rounded-xl transition-colors">
                      <span>{section.name}</span>
                    </button>

                    {/* Vertical tick at text start */}
                    <div className={`absolute bottom-0 left-3.5 w-px h-2 bg-[#264563]/60 transition-opacity duration-500 ${openDropdown === key ? 'opacity-100' : 'opacity-0'}`} />

                    {/* Dropdown items — last dropdown aligns right to avoid cutoff */}
                    <div className={`absolute top-full ${isLast ? 'right-0' : 'left-0'} pt-2 transition-opacity duration-500 ${openDropdown === key ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                      <div className={`flex flex-col gap-1.5 ${isLast ? 'items-end' : ''}`}>
                        {section.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpenDropdown(null)}
                            className="text-base text-[#264563] hover:underline transition-colors whitespace-nowrap"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  );
                })}

                <div onMouseEnter={() => setOpenDropdown('getInvolved')} className="relative !ml-4">
                  <button className="px-3 py-1 text-xl font-medium text-white bg-[#264563] rounded-lg hover:bg-[#1e3450] transition-colors">
                    Get Involved
                  </button>

                  <div className={`absolute bottom-0 left-3.5 w-px h-2 bg-[#264563]/60 transition-opacity duration-500 ${openDropdown === 'getInvolved' ? 'opacity-100' : 'opacity-0'}`} />

                  <div className={`absolute top-full right-0 pt-2 transition-opacity duration-500 ${openDropdown === 'getInvolved' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div className="flex flex-col gap-1.5 items-end">
                      <button
                        onClick={() => { setShowContribute(true); setOpenDropdown(null); }}
                        className="text-base text-[#264563] hover:underline transition-colors whitespace-nowrap"
                      >
                        Contribute
                      </button>
                      <button
                        onClick={() => { setShowNewsletter(true); setOpenDropdown(null); }}
                        className="text-base text-[#264563] hover:underline transition-colors whitespace-nowrap"
                      >
                        Newsletter Sign Up
                      </button>
                    </div>
                  </div>
                </div>

                {/* Horizontal line */}
                <div className={`absolute bottom-0 left-0 right-0 h-px bg-[#264563]/40 transition-opacity duration-500 ${openDropdown ? 'opacity-100' : 'opacity-0'}`} />
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-xl text-[#264563] hover:bg-gray-300/40 transition-colors"
                >
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Expanding spacer — opens the nav box to reveal the absolutely positioned items */}
          <div
            className={`hidden lg:block transition-[max-height,opacity] duration-500 ease-out ${
              openDropdown ? 'max-h-44 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="h-36" />
          </div>

          {/* Mobile menu */}
          {isOpen && (
            <div className="lg:hidden border-t border-[#264563]/30">
              <div className="px-3 pt-2 pb-3 space-y-1">
                {Object.entries(navigation).map(([key, section]) => (
                  <div key={key} className="space-y-1">
                    <button
                      onClick={() => setMobileDropdown(mobileDropdown === key ? null : key)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-lg text-[#264563] hover:bg-gray-300/40 transition-colors"
                    >
                      <span>{section.name}</span>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${mobileDropdown === key ? 'rotate-180' : ''}`} />
                    </button>

                    {mobileDropdown === key && (
                      <div className="ml-4 space-y-1">
                        {section.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-3 py-2 rounded-xl text-lg text-[#264563] hover:bg-gray-300/40 transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

                <div className="space-y-1">
                  <button
                    onClick={() => setMobileDropdown(mobileDropdown === 'getInvolved' ? null : 'getInvolved')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-lg text-white bg-[#264563] hover:bg-[#1e3450] transition-colors"
                  >
                    <span>Get Involved</span>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${mobileDropdown === 'getInvolved' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileDropdown === 'getInvolved' && (
                    <div className="ml-4 space-y-1">
                      <button
                        onClick={() => { setShowContribute(true); setIsOpen(false); }}
                        className="block w-full text-left px-3 py-2 rounded-xl text-lg text-[#264563] hover:bg-gray-300/40 transition-colors"
                      >
                        Contribute
                      </button>
                      <button
                        onClick={() => { setShowNewsletter(true); setIsOpen(false); }}
                        className="block w-full text-left px-3 py-2 rounded-xl text-lg text-[#264563] hover:bg-gray-300/40 transition-colors"
                      >
                        Newsletter Sign Up
                      </button>
                    </div>
                  )}
                </div>
            </div>
          )}
        </nav>
      </div>

      <ContributeModal isOpen={showContribute} onClose={() => setShowContribute(false)} />
      <NewsletterModal isOpen={showNewsletter} onClose={() => setShowNewsletter(false)} />
    </div>
  );
}
