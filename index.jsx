import React, { useState } from 'react';
import { ChevronRight, Microscope, Mountain, BookOpen, Beaker, Droplets, Users, Lightbulb, GraduationCap, Factory } from 'lucide-react';

export default function BiominingHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              Biomining Wiki
            </h1>
            <p className="text-xl text-emerald-200 max-w-3xl mx-auto">
              A bridge between biology and mining for critical mineral recovery
            </p>
            <p className="text-slate-300 mt-4 max-w-2xl mx-auto">
              Using microbes and biomolecules to extract metals, clean up waste, and transform the economics
              of complex materials
            </p>
          </div>

          {/* Dual Path Selection */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-16">
            {/* Path for Biologists */}
            <PathCard
              title="For Biologists"
              subtitle="Learn how your biology fits into mining operations"
              icon={Microscope}
              color="emerald"
              sections={[
                { title: "Understanding Mining Operations", icon: Mountain },
                { title: "The Mining Value Chain", icon: Factory },
                { title: "Where Biology Fits", icon: Beaker },
                { title: "Design Checklist for Bio-Projects", icon: BookOpen }
              ]}
              link="/for-biologists"
            />

            {/* Path for Mining Professionals */}
            <PathCard
              title="For Mining Professionals"
              subtitle="Understand how biology can enhance your operations"
              icon={Mountain}
              color="amber"
              sections={[
                { title: "Microbial Energy & Metabolism", icon: Microscope },
                { title: "Mechanisms of Metal Mobilization", icon: Beaker },
                { title: "Biomining Modalities & Flowsheets", icon: Factory },
                { title: "Evaluation Checklist for Bio-Solutions", icon: BookOpen }
              ]}
              link="/for-miners"
            />
          </div>

          {/* Shared Resources */}
          <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Shared Resources for Both Communities
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <ResourceCard
                title="Core Glossary"
                description="Canonical definitions bridging mining and biology terminology"
                icon={BookOpen}
                link="/glossary"
              />
              <ResourceCard
                title="Complex Materials Guide"
                description="ARD, tailings, e-waste, and where biology helps most"
                icon={Droplets}
                link="/complex-materials"
              />
              <ResourceCard
                title="Research Frontiers"
                description="Open problems, benchmarks, and collaboration opportunities"
                icon={Lightbulb}
                link="/research"
              />
            </div>
          </div>

          {/* What is Biomining */}
          <div className="mt-12 max-w-4xl mx-auto bg-emerald-950/50 rounded-xl p-8 border border-emerald-700/50">
            <h3 className="text-xl font-semibold text-emerald-300 mb-3 flex items-center gap-2">
              <GraduationCap className="w-6 h-6" />
              What is Biomining?
            </h3>
            <p className="text-emerald-100 mb-4">
              In this wiki, <strong>biomining</strong> means <strong>any use of biology to aid metal recovery
              or management</strong>, including:
            </p>
            <ul className="text-emerald-200 space-y-2 ml-6">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Bioleaching</strong> – microbes dissolve metals from ores, tailings, or e-waste</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Biooxidation</strong> – microbes oxidize sulfides to expose locked metals (e.g., gold)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Bioseparations</strong> – biomolecules selectively capture specific metals from complex solutions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Bioremediation</strong> – biology cleans up acid mine drainage and stabilizes tailings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Hybrid flowsheets</strong> – biology integrated with conventional hydrometallurgy and pyrometallurgy</span>
              </li>
            </ul>
            <p className="text-emerald-100 mt-4 text-sm italic">
              Our goal: a gold-standard, technically accurate, practically oriented resource that helps both
              communities design better projects together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PathCard({ title, subtitle, icon: Icon, color, sections, link }) {
  const colorClasses = {
    emerald: {
      bg: 'from-emerald-900/50 to-emerald-800/30',
      border: 'border-emerald-500/50',
      text: 'text-emerald-300',
      hover: 'hover:border-emerald-400'
    },
    amber: {
      bg: 'from-amber-900/50 to-amber-800/30',
      border: 'border-amber-500/50',
      text: 'text-amber-300',
      hover: 'hover:border-amber-400'
    }
  };

  const colors = colorClasses[color];

  return (
    <div className={`bg-gradient-to-br ${colors.bg} backdrop-blur-sm rounded-2xl p-8 border-2 ${colors.border} ${colors.hover} transition-all duration-300 hover:scale-105`}>
      <div className="flex items-center gap-3 mb-4">
        <Icon className={`w-8 h-8 ${colors.text}`} />
        <div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <p className="text-slate-300 text-sm">{subtitle}</p>
        </div>
      </div>

      <div className="space-y-3 mt-6">
        {sections.map((section, i) => {
          const SectionIcon = section.icon;
          return (
            <div key={i} className="flex items-center gap-3 text-slate-200">
              <SectionIcon className="w-5 h-5 text-slate-400" />
              <span className="text-sm">{section.title}</span>
            </div>
          );
        })}
      </div>

      <a
        href={link}
        className={`mt-6 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors`}
      >
        <span>Start Learning</span>
        <ChevronRight className="w-5 h-5" />
      </a>
    </div>
  );
}

function ResourceCard({ title, description, icon: Icon, link }) {
  return (
    <a
      href={link}
      className="bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all"
    >
      <Icon className="w-8 h-8 text-emerald-400 mb-3" />
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-300 text-sm">{description}</p>
    </a>
  );
}
