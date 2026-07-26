'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Microscope, Mountain, BookOpen, Beaker, Droplets, GraduationCap, Factory, AlertTriangle, Target, TrendingUp, MessageSquare, HelpCircle, ArrowRight, Atom, Hammer } from 'lucide-react';
import TableOfContents from './components/TableOfContents';
import GlossaryTerm from './components/GlossaryTerm';
import ContributeModal from './components/ContributeModal';

export default function BiominingHome() {
  const [showContribute, setShowContribute] = useState(false);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 pt-4 pb-6">
          {/* Hero Card + Ghost Box — full SVG version for wide screens (sm+) */}
          <div className="mb-6 hidden sm:block">
            <div className="relative w-full hero-svg-container" style={{ isolation: 'isolate' }}>
              {/* Pre-blurred backdrop matching body's background image, masked to green shape */}
              {(() => {
                const greenPath = "M56 791V90.5C56 73.6553 69.6553 60 86.5 60H1193.36C1206.88 60 1219.82 65.4465 1228.31 75.9557C1257.64 112.253 1323.03 207.029 1317 324.5C1309.85 463.669 1155.76 596.892 1131.66 616.914C1129.49 618.713 1127.53 620.576 1125.67 622.685C1075.48 679.403 1051.8 721.481 1041.88 793.998C1038.29 820.248 1016.8 841 990.303 841H106C78.3858 841 56 818.614 56 791Z";
                const maskUrl = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='56 60 1900 781' preserveAspectRatio='none'><path d='${greenPath}' fill='white'/></svg>")`;
                return (
                  <div
                    className="absolute inset-0 pointer-events-none overflow-hidden"
                    style={{
                      maskImage: maskUrl,
                      WebkitMaskImage: maskUrl,
                      maskSize: '100% 100%',
                      WebkitMaskSize: '100% 100%',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_PATH}/images/background.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed',
                        filter: 'blur(18px)',
                        transform: 'scale(1.1)',
                      }}
                    />
                  </div>
                );
              })()}

              {/* Single SVG with both shapes — curves always align */}
              <svg
                viewBox="56 60 1900 781"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
              >
                {/* Green title card shape */}
                <path
                  d="M56 791V90.5C56 73.6553 69.6553 60 86.5 60H1193.36C1206.88 60 1219.82 65.4465 1228.31 75.9557C1257.64 112.253 1323.03 207.029 1317 324.5C1309.85 463.669 1155.76 596.892 1131.66 616.914C1129.49 618.713 1127.53 620.576 1125.67 622.685C1075.48 679.403 1051.8 721.481 1041.88 793.998C1038.29 820.248 1016.8 841 990.303 841H106C78.3858 841 56 818.614 56 791Z"
                  fill="#779883"
                  fillOpacity="0.7"
                />
                <defs>
                  <clipPath id="blueShapeClip">
                    <path d="M1346.5 309C1351.4 225.926 1318.68 160.066 1284.83 107.173C1271.82 86.8478 1285.78 60 1309.92 60H1926.5C1943.07 60 1956.5 73.4315 1956.5 90V805C1956.5 821.569 1943.07 835 1926.5 835H1097.49C1084.89 835 1073.69 827.003 1072.45 814.46C1069.61 785.551 1074.25 729.991 1134 673C1220.5 590.5 1337.04 469.576 1346.5 309Z" />
                  </clipPath>
                </defs>
                {/* Blue TOC shape with inside-only stroke (doubled width; outer half clipped to shape interior) */}
                <path
                  d="M1346.5 309C1351.4 225.926 1318.68 160.066 1284.83 107.173C1271.82 86.8478 1285.78 60 1309.92 60H1926.5C1943.07 60 1956.5 73.4315 1956.5 90V805C1956.5 821.569 1943.07 835 1926.5 835H1097.49C1084.89 835 1073.69 827.003 1072.45 814.46C1069.61 785.551 1074.25 729.991 1134 673C1220.5 590.5 1337.04 469.576 1346.5 309Z"
                  fill="rgba(38, 69, 99, 0.95)"
                  stroke="white"
                  strokeWidth="8"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  shapeRendering="geometricPrecision"
                  clipPath="url(#blueShapeClip)"
                />
              </svg>

              {/* Homeworld logo - positioned within green shape */}
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/homeworld-logo-full.png`}
                alt="Homeworld Collective"
                className="absolute z-10"
                style={{ top: '6%', left: '3%', width: 'clamp(140px, 16%, 320px)' }}
              />

              {/* Title + subtitle */}
              <div className="absolute z-10" style={{ bottom: '8%', left: '3%', right: '38%' }}>
                <h1 className="text-white font-normal" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', lineHeight: '1.05' }}>
                  The Biomining<br />Handbook
                </h1>
                <p className="text-white font-extralight mt-3" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', lineHeight: '1.3', maxWidth: '85%' }}>
                  A practical guide for biologists and mining professionals
                </p>
              </div>

              {/* TOC - positioned within blue shape */}
              <div
                className="absolute z-10"
                style={{ top: '8%', right: '7%', bottom: '8%', width: '26%' }}
              >
                <TableOfContents bare />
              </div>
            </div>
          </div>

          {/* Simpler hero for very narrow screens (below sm) */}
          <div className="mb-6 sm:hidden">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-white" style={{ backgroundColor: '#779883' }}>
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_PATH}/images/background.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(14px)',
                  opacity: 0.7,
                }}
              />
              <div className="relative p-6 sm:p-8">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/homeworld-logo-full.png`}
                  alt="Homeworld Collective"
                  className="w-32 sm:w-40 mb-8"
                />
                <h1 className="text-white font-normal text-4xl sm:text-5xl leading-tight">
                  The Biomining Handbook
                </h1>
                <p className="text-white font-extralight mt-3" style={{ fontSize: '20px' }}>
                  A practical guide for biologists and mining professionals
                </p>
              </div>
            </div>
          </div>

          {/* About This Handbook */}
          <div className="mb-6">
            <div className="bg-[#edede6] rounded-3xl p-5 sm:p-8 shadow-xl border border-white">
              <h3 className="text-2xl font-bold text-[#264563] mb-3">
                About This Handbook
              </h3>
              <div className="text-[#264563] space-y-3">
                <p>
                  Biomining holds enormous potential for critical mineral recovery, but the field lacks a centralized resource bridging biological solutions and mining challenges. This handbook aims to address that gap.
                </p>
                <p>
                  Born from Homeworld's <Link href="/frontier-challenges#building-the-research-roadmap" className="underline decoration-dotted decoration-emerald-600/50 underline-offset-2 cursor-pointer hover:decoration-emerald-600 transition-colors">Biomining Under Complex Conditions Workshop</Link>, <strong>our goal is a gold-standard, technically accurate resource for both communities to design better projects together.</strong>
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[#264563] rounded-xl p-4">
                    <p className="font-semibold text-white mb-2">What you'll find:</p>
                    <div className="space-y-1 ml-1">
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400" style={{marginTop: '-0.1em'}}>•</span>
                        <span className="text-white text-sm">Key biomining concepts for biotechnologists and mining professionals</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400" style={{marginTop: '-0.1em'}}>•</span>
                        <span className="text-white text-sm">Real-world examples and flowsheets of biological integration</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400" style={{marginTop: '-0.1em'}}>•</span>
                        <span className="text-white text-sm">Practical tools for evaluating biological solutions</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400" style={{marginTop: '-0.1em'}}>•</span>
                        <span className="text-white text-sm">Shared vocabulary and frameworks bridging both fields</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl p-4 border-2 border-[#264563]">
                    <button
                      onClick={() => setShowContribute(true)}
                      className="font-semibold text-[#264563] hover:text-[#264563]/60 mb-2 transition-colors cursor-pointer text-left"
                    >
                      Contribute to This Handbook:
                    </button>
                    <p className="text-[#264563] text-sm">
                      To keep this resource current and accurate, we've added a commenting feature. Highlight any text and click the <MessageSquare className="w-3.5 h-3.5 inline text-emerald-600" /> icon that appears to suggest updates, additions, or corrections.
                    </p>
                    <p className="text-[#264563] text-sm mt-2">
                      Interested in authoring or expanding a section? Select "Interested in Contributing" in the comment form and we'll reach out.
                    </p>
                    <p className="text-[#264563] text-xs mt-2 italic">
                      Note: Commenting is not available on the home page. All comments remain confidential and are reviewed by Homeworld Collective staff.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What is Biomining */}
          <div className="mb-6">
            <div className="bg-[#edede6] rounded-3xl p-5 sm:p-8 shadow-xl border border-white">
              <h3 className="text-2xl font-bold text-[#264563] mb-3">
                What is Biomining?
              </h3>
              <div>
                <p className="text-[#264563] mb-4">
                  Any biological mechanism used to aid metal recovery, mineral processing, or the management of
                  mining-related wastes and liabilities.
                </p>
                <div className="flex flex-col lg:flex-row items-center gap-4 mt-6">
                  <div className="bg-gray-50 rounded-xl p-5 border-2 border-[#264563]/20 flex-1 w-full">
                    <div className="flex items-center gap-2 mb-3">
                      <Atom className="w-5 h-5 text-emerald-600" />
                      <h4 className="text-[#264563] font-semibold">Mechanisms</h4>
                    </div>
                    <ul className="text-[#264563] text-sm ml-1 grid grid-cols-2 gap-x-3 gap-y-1.5">
                      <li className="flex items-start gap-2 min-w-0 break-words"><span className="text-emerald-600 flex-shrink-0">•</span><span className="min-w-0 break-words"><GlossaryTerm term="Bioleaching">Bioleaching</GlossaryTerm></span></li>
                      <li className="flex items-start gap-2 min-w-0 break-words"><span className="text-emerald-600 flex-shrink-0">•</span><span className="min-w-0 break-words"><GlossaryTerm term="Biooxidation">Biooxidation</GlossaryTerm></span></li>
                      <li className="flex items-start gap-2 min-w-0 break-words"><span className="text-emerald-600 flex-shrink-0">•</span><span className="min-w-0 break-words"><GlossaryTerm term="Bioseparation">Bioseparation</GlossaryTerm></span></li>
                      <li className="flex items-start gap-2 min-w-0 break-words"><span className="text-emerald-600 flex-shrink-0">•</span><span className="min-w-0 break-words"><GlossaryTerm term="Biosorption">Biosorption</GlossaryTerm></span></li>
                      <li className="flex items-start gap-2 min-w-0 break-words"><span className="text-emerald-600 flex-shrink-0">•</span><span className="min-w-0 break-words"><GlossaryTerm term="Bioaccumulation">Bioaccumulation</GlossaryTerm></span></li>
                      <li className="flex items-start gap-2 min-w-0 break-words"><span className="text-emerald-600 flex-shrink-0">•</span><span className="min-w-0 break-words"><GlossaryTerm term="Bioprecipitation">Bioprecipitation</GlossaryTerm></span></li>
                      <li className="flex items-start gap-2 min-w-0 break-words"><span className="text-emerald-600 flex-shrink-0">•</span><span className="min-w-0 break-words"><GlossaryTerm term="Biomineralization">Biomineralization</GlossaryTerm></span></li>
                      <li className="flex items-start gap-2 min-w-0 break-words"><span className="text-emerald-600 flex-shrink-0">•</span><span className="min-w-0 break-words"><GlossaryTerm term="Bioflotation">Bioflotation</GlossaryTerm></span></li>
                      <li className="flex items-start gap-2 min-w-0 break-words"><span className="text-emerald-600 flex-shrink-0">•</span><span className="min-w-0 break-words"><GlossaryTerm term="Phytomining">Phytomining</GlossaryTerm></span></li>
                      <li className="flex items-start gap-2 min-w-0 break-words"><span className="text-emerald-600 flex-shrink-0">•</span><span className="min-w-0 break-words"><GlossaryTerm term="Biosensing">Biosensing</GlossaryTerm></span></li>
                    </ul>
                  </div>
                  <ArrowRight className="w-10 h-10 text-[#264563] flex-shrink-0 rotate-90 lg:rotate-0" />
                  <div className="bg-gray-50 rounded-xl p-5 border-2 border-[#264563]/20 flex-1 w-full">
                    <div className="flex items-center gap-2 mb-3">
                      <Hammer className="w-5 h-5 text-emerald-600" />
                      <h4 className="text-[#264563] font-semibold">Applications</h4>
                    </div>
                    <ul className="text-[#264563] text-sm ml-1 grid grid-cols-2 gap-x-3 gap-y-1.5">
                      <li className="flex items-start gap-2 min-w-0 break-words"><span className="text-emerald-600 flex-shrink-0">•</span><span className="min-w-0 break-words"><GlossaryTerm term="Heap Leaching">Heap leaching</GlossaryTerm></span></li>
                      <li className="flex items-start gap-2 min-w-0 break-words"><span className="text-emerald-600 flex-shrink-0">•</span><span className="min-w-0 break-words"><GlossaryTerm term="Tank Leaching">Tank leaching</GlossaryTerm></span></li>
                      <li className="flex items-start gap-2 min-w-0 break-words"><span className="text-emerald-600 flex-shrink-0">•</span><span className="min-w-0 break-words"><GlossaryTerm term="In-stope Leaching">In-stope leaching</GlossaryTerm></span></li>
                      <li className="flex items-start gap-2 min-w-0 break-words"><span className="text-emerald-600 flex-shrink-0">•</span><span className="min-w-0 break-words">Metal separation</span></li>
                      <li className="flex items-start gap-2 min-w-0 break-words"><span className="text-emerald-600 flex-shrink-0">•</span><span className="min-w-0 break-words">Stream polishing</span></li>
                      <li className="flex items-start gap-2 min-w-0 break-words"><span className="text-emerald-600 flex-shrink-0">•</span><span className="min-w-0 break-words"><GlossaryTerm term="Acid Mine Drainage (AMD)">AMD</GlossaryTerm> treatment</span></li>
                      <li className="flex items-start gap-2 min-w-0 break-words"><span className="text-emerald-600 flex-shrink-0">•</span><span className="min-w-0 break-words">Mine closure</span></li>
                      <li className="flex items-start gap-2 min-w-0 break-words"><span className="text-emerald-600 flex-shrink-0">•</span><span className="min-w-0 break-words"><GlossaryTerm term="Tailings">Tailings</GlossaryTerm> reprocessing</span></li>
                      <li className="flex items-start gap-2 min-w-0 break-words"><span className="text-emerald-600 flex-shrink-0">•</span><span className="min-w-0 break-words"><GlossaryTerm term="Electronic Waste (E-waste)">E-waste</GlossaryTerm> recovery</span></li>
                      <li className="flex items-start gap-2 min-w-0 break-words"><span className="text-emerald-600 flex-shrink-0">•</span><span className="min-w-0 break-words">Ground stabilization</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Now Section */}
          <div className="mb-6">
            <div className="bg-[#edede6] rounded-3xl p-5 sm:p-8 shadow-xl border border-white">
              <h2 className="text-2xl font-bold text-[#264563] mb-4">
                Why Biomining Now?
              </h2>
              <div className="text-[#264563] space-y-3">
                <p>
                  Mining and critical mineral recovery face a <strong>new set of constraints</strong>: rising demand from clean energy,
                  a shift toward more complex feedstocks, and tightening limits around energy, water, tailings, and social licence.
                </p>
                <p>
                  <strong>Complexity</strong> is the central issue. Most lab breakthroughs use simplified systems, but industry faces
                  polymetallic ores, process waters with diverse co-metals, legacy wastes, and tight operational constraints.
                </p>
                <p className="text-emerald-700 font-semibold">
                  This complexity can make conventional chemistry overly expensive, intensive, or risky. Biology can couple selectivity with adaptation to unlock value.
                </p>
              </div>
            </div>
          </div>

          {/* Dual Path Selection */}
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <PathCard
              title="Mining 101"
              subtitle="Learn how your biology fits into mining operations"
              icon={Mountain}
              color="blue"
              sections={[
                { title: "Mining Value Chain — Stage by Stage", icon: Factory },
                { title: "Constraints That Shape Bio-Adoption", icon: AlertTriangle }
              ]}
              link="/mining-101"
            />

            <PathCard
              title="Biology 101"
              subtitle="Understand how biology can enhance your operations"
              icon={Microscope}
              color="emerald"
              sections={[
                { title: "Biological Systems in Mining", icon: Microscope },
                { title: "Mechanisms of Metal Mobilization & Capture", icon: Beaker },
                { title: "Biomining Modalities & Flowsheets", icon: Factory }
              ]}
              link="/biology-101"
            />
          </div>

          {/* Core Resources */}
          <div className="mt-6">
            <div className="bg-[#edede6] rounded-3xl p-5 sm:p-8 shadow-xl border border-white">
              <h2 className="text-2xl font-bold text-[#264563] mb-6 text-left">
                Essential Resources
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                <ResourceCard
                  title="What Is Biomining?"
                  description="Definitions, mechanisms, and where biotech complements and rivals chemistry"
                  icon={GraduationCap}
                  link="/what-is-biomining"
                />
                <ResourceCard
                  title="Complex Materials"
                  description="Tailings, AMD, e-waste, and where biology helps most"
                  icon={Droplets}
                  link="/complex-materials"
                />
                <ResourceCard
                  title="Example Flowsheets"
                  description="Real-world integration examples and bio-modules"
                  icon={Target}
                  link="/flowsheets"
                />
                <ResourceCard
                  title="Technology Assessment Checklist"
                  description="Evaluate biomining technologies against mining requirements"
                  icon={BookOpen}
                  link="/technology-assessment"
                />
                <ResourceCard
                  title="Frontier Challenges"
                  description="Key research gaps and the roadmap ahead for biomining"
                  icon={TrendingUp}
                  link="/frontier-challenges"
                />
              </div>
              <div className="flex justify-end mt-12">
                <Link href="/what-is-biomining" className="group flex flex-col items-end text-[#264563] hover:text-[#1e3450] transition-colors">
                  <span className="text-xs text-[#264563]/50 mb-1">Start learning →</span>
                  <span className="text-base font-medium group-hover:underline">What Is Biomining?</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      <ContributeModal isOpen={showContribute} onClose={() => setShowContribute(false)} />
    </div>
  );
}

function PathCard({ title, subtitle, icon: Icon, color, sections, link }) {
  const colorClasses = {
    emerald: {
      iconColor: 'text-emerald-600',
      btn: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    },
    blue: {
      iconColor: 'text-[#264563]',
      btn: 'bg-[#264563] hover:bg-[#1e3450] text-white',
    }
  };

  const colors = colorClasses[color];

  return (
    <div className="bg-[#edede6] rounded-3xl p-5 sm:p-8 shadow-xl border border-white hover:shadow-2xl transition-all duration-300 flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <Icon className={`w-7 h-7 ${colors.iconColor}`} />
        <div>
          <h2 className="text-2xl font-bold text-[#264563]">{title}</h2>
          <p className="text-[#264563] text-sm">{subtitle}</p>
        </div>
      </div>

      <div className="space-y-2 mt-5 pl-10 flex-grow">
        {sections.map((section, i) => {
          const SectionIcon = section.icon;
          return (
            <div key={i} className="flex items-center gap-3 text-[#264563]">
              <SectionIcon className="w-4 h-4 text-[#264563]/50" />
              <span className="text-sm">{section.title}</span>
            </div>
          );
        })}
      </div>

      <Link
        href={link}
        className={`mt-6 flex items-center justify-center gap-2 ${colors.btn} px-6 py-2.5 rounded-lg transition-colors text-sm font-medium`}
      >
        <span>Start Learning</span>
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

function ResourceCard({ title, description, icon: Icon, link }) {
  return (
    <Link
      href={link}
      className="bg-gray-50 hover:bg-white rounded-xl p-5 border border-gray-200 hover:border-emerald-700 hover:shadow-md transition-all block"
    >
      <Icon className="w-7 h-7 text-emerald-600 mb-3" />
      <h3 className="text-base font-semibold text-[#264563] mb-1.5">{title}</h3>
      <p className="text-[#264563] text-sm">{description}</p>
    </Link>
  );
}
