'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Droplets, Mountain, Factory, Cpu, Beaker, AlertTriangle, Sparkles } from 'lucide-react';

const materialsData = {
  ard: {
    name: "Acid Rock Drainage (ARD) / Acid Mine Drainage (AMD)",
    icon: Droplets,
    color: "orange",
    definition: "Acidic, metal-rich drainage formed when sulfide minerals are exposed to oxygen and water; often biologically accelerated",
    hazards: [
      "Ecological damage to watersheds and groundwater",
      "Toxic metals (Fe, Al, Mn, As) affect human and ecosystem health",
      "Site-specific geochemistry with variable flow",
      "High public visibility and strong community opposition"
    ],
    bioOpportunities: [
      {
        title: "Constructed Wetlands & SRB Systems",
        description: "Passive treatment using sulfate-reducing bacteria to precipitate metals as sulfides while raising pH and removing toxins"
      },
      {
        title: "Engineered Consortia for Bio-immobilization",
        description: "Designed microbial communities for biological 'polishing' of metals and co-recovery of critical metals"
      },
      {
        title: "AMD as Resource",
        description: "Recovery of Cu, Zn, REEs, and other metals from drainage - treating liability as opportunity"
      },
      {
        title: "Extremophile Biobanking",
        description: "'Superbank' concept: biobanking extremophiles from legacy sites for bioprospecting and method development"
      }
    ],
    whyBiology: "Microbes both cause AMD and can solve it. Biology offers passive, low-cost treatment that can simultaneously recover value.",
    maturity: "High - proven in constructed wetlands and pilot-scale SRB reactors"
  },
  wasteRock: {
    name: "Bulk Waste Rock & Refractory Ores",
    icon: Mountain,
    color: "slate",
    definition: "Heterogeneous rock with low grades and/or refractory mineralogy; can contain 'hidden' critical metals",
    hazards: [
      "Potential leaching of metals over time",
      "Slope instability in waste dumps",
      "Future ARD generation",
      "Classified as sub-economic under current conventional methods"
    ],
    bioOpportunities: [
      {
        title: "Refractory Biooxidation",
        description: "For gold and other metals trapped in sulfides - break down sulfide matrix to release metals (BIOX®-style processing)"
      },
      {
        title: "Biogenic Lixiviants",
        description: "Microbes produce organic acids, ferric iron, iodide, or cyanide locally to reduce chemical transport costs and enable site-specific leaching"
      },
      {
        title: "Hidden Critical Metals",
        description: "Re-evaluation of 'waste' piles as future resources. Extract critical by-products (Co, REEs, Ni) that weren't original targets"
      },
      {
        title: "Long Time-Horizon Processing",
        description: "Stockpile bio-leaching with multi-year residence times acceptable for previously uneconomic material"
      }
    ],
    whyBiology: "Biology can unlock value from material too expensive to process conventionally - turning waste into revenue at lower operating costs.",
    maturity: "Medium-High - proven for refractory gold; emerging for low-grade stockpiles and critical metal co-products"
  },
  tailings: {
    name: "Tailings",
    icon: Factory,
    color: "amber",
    definition: "Fine residues after processing; they track what was processed and what was not recovered",
    hazards: [
      "Dam failures cause catastrophic loss of life",
      "Dust carries heavy metals to nearby communities",
      "Long-term seepage and groundwater contamination",
      "Tailings volumes grow as ore grades decline globally"
    ],
    bioOpportunities: [
      {
        title: "Secondary Metal Recovery",
        description: "Bioleaching or biosorption to recover Cu, Au, REEs, and other metals left behind in initial processing"
      },
      {
        title: "Biological Stabilization",
        description: "Vegetation, bio-cementation (MICP), and microbial crusts to reduce dust and seepage while improving long-term stability"
      },
      {
        title: "Tailings Revalorization",
        description: "Historic tailings often contain critical metals that weren't extracted originally - bioleach without expensive re-mining infrastructure"
      },
      {
        title: "Orebank Standardization",
        description: "Tailings-derived samples as standardized test feedstocks for technology benchmarking across labs"
      }
    ],
    whyBiology: "Bioleaching is cheaper than rebuilding infrastructure. Biocement and stabilization avoid toxic chemical transport to remote sites.",
    maturity: "Medium - proven for some metals; emerging for REEs and biological stabilization"
  },
  ewaste: {
    name: "Electronic Waste (E-waste)",
    icon: Cpu,
    color: "emerald",
    definition: "Discarded electronics rich in Cu, Au, Pd, REEs, and critical metals, but with complex polymer/metal mixtures",
    hazards: [
      "World's fastest growing waste stream (74.7M tons by 2030)",
      "Complex mix of metals, plastics, glass - hard to separate",
      "Current recycling exposes workers to carcinogens",
      "Thin profit margins mean much ends up in landfills"
    ],
    bioOpportunities: [
      {
        title: "Bioleaching Circuit Boards",
        description: "Microbes dissolve Cu, Au, Ag, Pd from printed circuit boards - potentially safer and cheaper than smelting"
      },
      {
        title: "Metal-Binding Proteins",
        description: "Bioseparation using engineered proteins to selectively grab specific metals from complex e-waste leachates"
      },
      {
        title: "Biogenic Acids On-Site",
        description: "Microbial production of leaching acids on-site, reducing chemical transport costs and improving safety"
      },
      {
        title: "Urban Biomining Integration",
        description: "Integration with circular-economy frameworks (collection systems, logistics, distributed processing)"
      }
    ],
    whyBiology: "E-waste is metal-rich but expensive to recycle. Biotech could shift economics while reducing worker health risks and environmental impact.",
    maturity: "Low-Medium - lab-proven, early pilots; significant commercialization challenges remain"
  },
  other: {
    name: "Other Secondary Resources",
    icon: Beaker,
    color: "violet",
    definition: "Slag, fly ash, phosphogypsum, red mud, produced waters, and geothermal brines",
    hazards: [
      "Slag: Metal oxides from smelting; weathers and leaches over time",
      "Fly ash: Coal combustion byproduct with REEs and heavy metals",
      "Phosphogypsum: Radioactive waste from fertilizer production",
      "Red mud: Caustic bauxite waste with REEs, Sc, and other metals"
    ],
    bioOpportunities: [
      {
        title: "Slag Processing",
        description: "Biotech may extract residual critical minerals that are too expensive for traditional pyrometallurgical methods"
      },
      {
        title: "REE from Fly Ash",
        description: "Microbial or biomolecular extraction of rare earth elements from coal power plant waste"
      },
      {
        title: "Red Mud Valorization",
        description: "Bioleaching of Sc, REEs, and other metals from highly alkaline bauxite processing waste"
      },
      {
        title: "Produced Water Cleanup",
        description: "Bioremediation to clean oil/gas wastewater for reuse in arid regions while recovering dissolved metals"
      }
    ],
    whyBiology: "Each of these wastes contains value that conventional processing can't economically extract. Biology's mild conditions and selectivity are key advantages.",
    maturity: "Low-Medium - mostly at research and early pilot stage; case-by-case evaluation needed"
  }
};

export default function ComplexMaterials() {
  const [expandedMaterial, setExpandedMaterial] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-3">Complex Materials Guide</h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto mb-4">
            Where biology helps most: materials too complex, contaminated, or low-grade for conventional processing
          </p>
          <p className="text-slate-300 max-w-3xl mx-auto text-sm">
            Biology won't replace conventional mining for high-grade ores - that's highly optimized. But for complex
            materials where traditional methods struggle, biotechnology can shift the economics and reduce environmental impact.
          </p>
        </div>

        {/* Key Insight */}
        <div className="bg-purple-950/30 border-2 border-purple-500/50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-purple-300 mb-3">When Biology Wins</h2>
          <ul className="text-purple-100 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">✓</span>
              <span><strong>Low-grade material</strong> where conventional processing is uneconomic</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">✓</span>
              <span><strong>Complex mineralogy</strong> (refractory ores, polymetallic systems)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">✓</span>
              <span><strong>Environmental hazards</strong> (AMD, tailings, legacy sites)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">✓</span>
              <span><strong>Remote locations</strong> where chemical transport is expensive or impossible</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">✓</span>
              <span><strong>Thin margins</strong> where small OPEX reductions make projects viable</span>
            </li>
          </ul>
        </div>

        {/* Materials */}
        <div className="space-y-4">
          {Object.keys(materialsData).map(key => (
            <MaterialCard
              key={key}
              materialKey={key}
              material={materialsData[key]}
              expanded={expandedMaterial === key}
              onToggle={() => setExpandedMaterial(expandedMaterial === key ? null : key)}
            />
          ))}
        </div>

        {/* Bottom Insight */}
        <div className="mt-8 bg-emerald-950/30 border border-emerald-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-emerald-300 mb-2">The Best Opportunities</h3>
          <p className="text-emerald-100 text-sm">
            The sweet spot for biomining is where you're dealing with <strong>waste, legacy sites, or materials
            too costly to process conventionally</strong>. These are the contexts where biology's advantages
            (lower OPEX, mild conditions, selectivity, reduced environmental impact) matter most.
          </p>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex justify-between">
          <Link href="/" className="text-purple-400 hover:text-purple-300 flex items-center gap-2">
            ← Back to Home
          </Link>
          <Link href="/research" className="text-purple-400 hover:text-purple-300 flex items-center gap-2">
            Research Frontiers →
          </Link>
        </div>
      </div>
    </div>
  );
}

function MaterialCard({ materialKey, material, expanded, onToggle }) {
  const Icon = material.icon;

  const colorClasses = {
    orange: { bg: 'bg-orange-900/20', border: 'border-orange-500/50', text: 'text-orange-300', header: 'bg-orange-950/50' },
    slate: { bg: 'bg-slate-900/20', border: 'border-slate-500/50', text: 'text-slate-300', header: 'bg-slate-950/50' },
    amber: { bg: 'bg-amber-900/20', border: 'border-amber-500/50', text: 'text-amber-300', header: 'bg-amber-950/50' },
    emerald: { bg: 'bg-emerald-900/20', border: 'border-emerald-500/50', text: 'text-emerald-300', header: 'bg-emerald-950/50' },
    violet: { bg: 'bg-violet-900/20', border: 'border-violet-500/50', text: 'text-violet-300', header: 'bg-violet-950/50' }
  };

  const colors = colorClasses[material.color];

  return (
    <div className={`backdrop-blur-sm rounded-xl border ${colors.border} ${colors.bg} overflow-hidden`}>
      <button
        onClick={onToggle}
        className={`w-full p-5 ${colors.header} flex items-center justify-between hover:opacity-90 transition-opacity`}
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-6 h-6 ${colors.text}`} />
          <div className="text-left">
            <h2 className="text-xl font-bold text-white">{material.name}</h2>
            <p className="text-xs text-slate-400 mt-1">Maturity: {material.maturity}</p>
          </div>
        </div>
        {expanded ? <ChevronDown className="w-6 h-6 text-slate-300" /> : <ChevronRight className="w-6 h-6 text-slate-300" />}
      </button>

      {expanded && (
        <div className="p-6 space-y-5">
          {/* Definition */}
          <div>
            <p className="text-slate-200 italic">{material.definition}</p>
          </div>

          {/* Hazards */}
          <div>
            <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              Key Hazards & Challenges
            </h3>
            <ul className="space-y-1">
              {material.hazards.map((hazard, i) => (
                <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>{hazard}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bio Opportunities */}
          <div>
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Beaker className="w-5 h-5 text-emerald-400" />
              Where Biology Can Help
            </h3>
            <div className="space-y-3">
              {material.bioOpportunities.map((opp, i) => (
                <div key={i} className="bg-slate-800/30 rounded-lg p-4 border border-slate-600/50">
                  <h4 className="font-semibold text-emerald-300 text-sm mb-1">{opp.title}</h4>
                  <p className="text-slate-300 text-sm">{opp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Biology */}
          <div className={`${colors.header} rounded-lg p-4 border ${colors.border}`}>
            <h3 className="font-semibold text-white text-sm mb-2">💡 Why Biology Works Here</h3>
            <p className={`text-sm ${colors.text}`}>{material.whyBiology}</p>
          </div>
        </div>
      )}
    </div>
  );
}
