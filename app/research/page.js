'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Lightbulb, FlaskConical, Database, TrendingUp, Users, Microscope, Target } from 'lucide-react';

const researchData = {
  frontiers: [
    {
      title: "Metal-Biology Interactions in Complex Matrices",
      icon: FlaskConical,
      color: "purple",
      keyIssues: [
        "Binding constants measured in simple buffers don't map cleanly to separation performance in real PLS, leachates, or tailings porewaters",
        "Competing ions, organics, colloids, and solids all affect selectivity and capacity",
        "Ligand space for REEs, PGMs, radionuclides, and polymetallic systems remains underexplored"
      ],
      opportunities: [
        {
          title: "High-Throughput Ligand Screening",
          description: "AI-guided design and microfluidics for rapid discovery of metallophores and binding proteins"
        },
        {
          title: "Matrix-Aware Models",
          description: "Mechanistic and ML models that translate binding data into process performance predictions in real feedstocks"
        },
        {
          title: "Hybrid Biomolecular Ligands",
          description: "Peptides + polymers or mixed-mode platforms for improved fouling resistance and manufacturability"
        },
        {
          title: "Non-Chromatographic Deployment",
          description: "Membranes, beads, structured packings functionalized with selective biomolecules for continuous PLS polishing"
        }
      ]
    },
    {
      title: "Realistic Feedstocks, Complexity Proxies, and Benchmarks",
      icon: Database,
      color: "blue",
      keyIssues: [
        "Lab studies often use synthetic solutions that don't represent real PLS complexity",
        "No standard feedstocks for comparing technologies across labs",
        "Hard to translate lab performance to field conditions"
      ],
      opportunities: [
        {
          title: "Standard Synthetic Feedstocks",
          description: "Agreed recipes (chloride vs sulfate systems, light vs heavy REE mixes, e-waste leachates) for benchmarking"
        },
        {
          title: "Complexity Proxies",
          description: "Dissolved organic carbon, colloids, biomass, competing ion panels to simulate real-world conditions systematically"
        },
        {
          title: "Orebank Sample Panels",
          description: "Reference polymetallic feedstocks from actual tailings, AMD, and waste materials for real-world testing"
        },
        {
          title: "Inter-Lab Round-Robins",
          description: "Community-maintained performance baselines and data standards for cross-comparison"
        }
      ]
    },
    {
      title: "Ecology, Evolution, and Field Persistence",
      icon: Microscope,
      color: "green",
      keyIssues: [
        "Limited understanding of in situ microbial communities (especially deep subsurface and highly acidic systems)",
        "Poor predictive understanding of evolutionary stability of engineered traits under field conditions",
        "Microbial consortia dynamics in heaps and reactors not well characterized"
      ],
      opportunities: [
        {
          title: "Phenotype Foundries",
          description: "Ultra-high-throughput screening for tolerance and leaching performance under realistic stresses"
        },
        {
          title: "Trait Half-Life Models",
          description: "Assays and models for predicting how long engineered traits persist in field populations"
        },
        {
          title: "Community Dynamics Modeling",
          description: "Ecological-theory-guided understanding of consortia stability and performance in heaps, reactors, and AMD"
        },
        {
          title: "Superbank for Extremophiles",
          description: "Biobanking microbes and consortia from legacy sites for bioprospecting and comparative genomics"
        }
      ]
    },
    {
      title: "Instrumentation, Sensing, and Modeling",
      icon: TrendingUp,
      color: "amber",
      keyIssues: [
        "Lack of rugged, low-cost sensors for low-pH, high-ionic-strength environments",
        "Bioleaching models don't adequately couple microbial kinetics with hydrology and chemical speciation",
        "Limited real-time monitoring of biological activity in heaps and reactors"
      ],
      opportunities: [
        {
          title: "In Situ Sensors",
          description: "Gas-phase and solution-phase sensors for redox, speciation, and biological activity in harsh conditions"
        },
        {
          title: "Coupled Biogeochemical Models",
          description: "Integrate microbial kinetics, reactive transport, hydrology, and heat transfer for heap and reactor optimization"
        },
        {
          title: "Digital Twins for Bioleaching",
          description: "Real-time models updated with sensor data for predictive control and optimization"
        },
        {
          title: "Biogeometallurgical Resource Classification",
          description: "Extend geological resource models to explicitly incorporate bioprocess options and economics"
        }
      ]
    }
  ],
  ecosystem: [
    {
      title: "Shared Materials and Testbeds",
      icon: Database,
      description: "Pre-competitive infrastructure for accelerating biomining R&D",
      initiatives: [
        {
          name: "Orebank",
          description: "Shared library of well-characterized ores, tailings, and e-waste for pre-competitive research and technology benchmarking"
        },
        {
          name: "Superbank",
          description: "Biobanking microbes and consortia from legacy and Superfund sites for bioprospecting, method development, and comparative studies"
        },
        {
          name: "Former Mines as Test Sites",
          description: "Converting liabilities into experimental infrastructure for pilot trials, closure technologies, and field validation"
        }
      ]
    },
    {
      title: "Data, Models, and Governance",
      icon: Target,
      description: "Open but governed data sharing to accelerate innovation while protecting IP",
      initiatives: [
        {
          name: "Federated Data Models",
          description: "Allow companies to share insights without surrendering ownership or increasing liability - focus on aggregated learnings"
        },
        {
          name: "Open Process Repositories",
          description: "Microbiome-mineral-process datasets, TEAs, and case studies with governed access and attribution"
        },
        {
          name: "Performance Baselines",
          description: "Community-maintained benchmarks for recovery rates, selectivity, and costs across different material types"
        }
      ]
    },
    {
      title: "Funding, IP, and Translation Pathways",
      icon: TrendingUp,
      description: "Bridging the valley of death between lab discovery and commercial deployment",
      initiatives: [
        {
          name: "TEA-Aware Academic Funding",
          description: "Research grants that require techno-economic analysis and commercialization pathways from the start"
        },
        {
          name: "IP Advocates in Universities",
          description: "Embedded expertise to help academics navigate patents, licensing, and startup formation in biomining"
        },
        {
          name: "Consortium Models with TRL Milestones",
          description: "Industry-academic partnerships with clear technology readiness level gates and co-investment norms"
        },
        {
          name: "Pilot-Plant-Scale Funding",
          description: "Targeted programs to bridge gap between lab success and field demonstration"
        }
      ]
    },
    {
      title: "Language, Branding, and Talent",
      icon: Users,
      description: "Building bridges between communities and attracting the next generation",
      initiatives: [
        {
          name: "Shared Vocabulary Resources",
          description: "This wiki and similar efforts to reduce jargon barriers between mining, biotech, investors, and regulators"
        },
        {
          name: "Reframing for Students",
          description: "'Critical minerals, circularity, and planetary remediation' messaging to attract climate-motivated talent beyond traditional 'mining' brand"
        },
        {
          name: "Case Study Storybank",
          description: "Visual flowsheets and profiles of successful projects to inspire and educate both communities"
        },
        {
          name: "Cross-Training Programs",
          description: "Biomining bootcamps, internships, and secondments between mining companies and biotech labs"
        }
      ]
    }
  ]
};

export default function Research() {
  const [expandedFrontier, setExpandedFrontier] = useState(null);
  const [expandedEcosystem, setExpandedEcosystem] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Lightbulb className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-3">Research Frontiers & Collaboration</h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Open problems, infrastructure needs, and collaboration opportunities in biomining
          </p>
        </div>

        {/* Research Frontiers */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <FlaskConical className="w-7 h-7 text-purple-400" />
            Cross-Cutting Technical Frontiers
          </h2>
          <p className="text-slate-300 mb-6">
            These problem statements and bottlenecks represent a public R&D agenda distilled from workshops,
            literature, and field experience. They're areas where breakthroughs would significantly advance biomining.
          </p>
          <div className="space-y-4">
            {researchData.frontiers.map((frontier, i) => (
              <FrontierCard
                key={i}
                frontier={frontier}
                expanded={expandedFrontier === i}
                onToggle={() => setExpandedFrontier(expandedFrontier === i ? null : i)}
              />
            ))}
          </div>
        </section>

        {/* Ecosystem & Infrastructure */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Users className="w-7 h-7 text-emerald-400" />
            Ecosystem, Infrastructure & Collaboration
          </h2>
          <p className="text-slate-300 mb-6">
            Biomining is a socio-technical field, not just a set of reactions. These initiatives would strengthen
            the ecosystem and accelerate translation from lab to field.
          </p>
          <div className="space-y-4">
            {researchData.ecosystem.map((item, i) => (
              <EcosystemCard
                key={i}
                item={item}
                expanded={expandedEcosystem === i}
                onToggle={() => setExpandedEcosystem(expandedEcosystem === i ? null : i)}
              />
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-purple-900/50 to-emerald-900/50 border border-purple-500/50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4 text-center">Get Involved</h3>
          <p className="text-slate-200 text-center mb-6 max-w-3xl mx-auto">
            These challenges require collaboration across disciplines, sectors, and institutions. Whether you're
            a researcher, mining professional, investor, or policymaker, there's a role for you in advancing
            sustainable biomining technologies.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-purple-300 mb-2">Researchers</h4>
              <p className="text-slate-300 text-sm">Focus on high-impact problems with clear paths to field deployment</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-300 mb-2">Industry</h4>
              <p className="text-slate-300 text-sm">Share pre-competitive data and pilot sites to accelerate innovation</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-amber-300 mb-2">Funders</h4>
              <p className="text-slate-300 text-sm">Support TEA-aware research and pilot-scale demonstration projects</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 text-center">
          <Link href="/" className="text-purple-400 hover:text-purple-300 flex items-center justify-center gap-2">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function FrontierCard({ frontier, expanded, onToggle }) {
  const Icon = frontier.icon;

  const colorClasses = {
    purple: { bg: 'bg-purple-900/20', border: 'border-purple-500/50', text: 'text-purple-300' },
    blue: { bg: 'bg-blue-900/20', border: 'border-blue-500/50', text: 'text-blue-300' },
    green: { bg: 'bg-green-900/20', border: 'border-green-500/50', text: 'text-green-300' },
    amber: { bg: 'bg-amber-900/20', border: 'border-amber-500/50', text: 'text-amber-300' }
  };

  const colors = colorClasses[frontier.color];

  return (
    <div className={`backdrop-blur-sm rounded-xl border ${colors.border} ${colors.bg} overflow-hidden`}>
      <button
        onClick={onToggle}
        className="w-full p-5 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-6 h-6 ${colors.text}`} />
          <h3 className="text-xl font-bold text-white text-left">{frontier.title}</h3>
        </div>
        {expanded ? <ChevronDown className="w-6 h-6 text-slate-300" /> : <ChevronRight className="w-6 h-6 text-slate-300" />}
      </button>

      {expanded && (
        <div className="p-6 pt-0 border-t border-white/10 space-y-5">
          {/* Key Issues */}
          <div>
            <h4 className="font-semibold text-red-400 mb-3">Key Issues & Bottlenecks</h4>
            <ul className="space-y-2">
              {frontier.keyIssues.map((issue, i) => (
                <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                  <span className="text-red-400 mt-1">⚠</span>
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunities */}
          <div>
            <h4 className="font-semibold text-emerald-400 mb-3">Research Opportunities</h4>
            <div className="space-y-3">
              {frontier.opportunities.map((opp, i) => (
                <div key={i} className="bg-slate-800/30 rounded-lg p-4 border border-emerald-500/30">
                  <h5 className="font-semibold text-emerald-300 text-sm mb-1">{opp.title}</h5>
                  <p className="text-slate-300 text-sm">{opp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EcosystemCard({ item, expanded, onToggle }) {
  const Icon = item.icon;

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-5 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="text-left">
          <div className="flex items-center gap-3 mb-2">
            <Icon className="w-6 h-6 text-emerald-400" />
            <h3 className="text-xl font-bold text-white">{item.title}</h3>
          </div>
          <p className="text-slate-300 text-sm">{item.description}</p>
        </div>
        {expanded ? <ChevronDown className="w-6 h-6 text-slate-300 flex-shrink-0 ml-4" /> : <ChevronRight className="w-6 h-6 text-slate-300 flex-shrink-0 ml-4" />}
      </button>

      {expanded && (
        <div className="p-6 pt-0 border-t border-white/10">
          <div className="space-y-4">
            {item.initiatives.map((initiative, i) => (
              <div key={i} className="bg-slate-800/30 rounded-lg p-4 border border-slate-600/50">
                <h4 className="font-semibold text-white mb-2">{initiative.name}</h4>
                <p className="text-slate-300 text-sm">{initiative.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
