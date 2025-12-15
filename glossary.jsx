import React, { useState } from 'react';
import { Search, Mountain, Microscope, BookOpen } from 'lucide-react';

const glossaryData = {
  mining: [
    {
      term: "Mineral",
      definition: "Solid inorganic substance with a defined chemical composition and crystalline structure",
      examples: "Quartz, chalcopyrite, pyrite",
      forBiologists: "The building blocks of rocks that microbes interact with. Different minerals require different biological strategies for metal extraction.",
      forMiners: "Standard definition - biology doesn't change mineralogy, but can change reaction pathways."
    },
    {
      term: "Rock",
      definition: "Aggregate of one or more minerals; composition and texture can be heterogeneous",
      examples: "Granite, basalt, ore bodies",
      forBiologists: "Your feedstock is rock, not pure minerals. Expect heterogeneity and variable reactivity.",
      forMiners: "Biology works on real rock, not idealized single minerals - important for lab-to-field translation."
    },
    {
      term: "Ore",
      definition: "Rock that contains a commodity (metal/mineral) in concentrations and contexts that are economically mineable",
      examples: "Copper ore, gold ore, REE-bearing rock",
      forBiologists: "What counts as 'ore' is price-dependent and process-dependent. Biology can shift the economic threshold.",
      forMiners: "Bio-processes may make sub-economic material economic by reducing processing costs."
    },
    {
      term: "Gangue",
      definition: "The unwanted minerals that accompany ore minerals in a rock",
      examples: "Calcite in sphalerite-bearing ore, quartz in gold ore",
      forBiologists: "Gangue affects pH buffering, competing reactions, and can consume reagents. Always characterize gangue mineralogy.",
      forMiners: "Biology may be more selective than conventional chemistry, potentially handling gangue-rich material better."
    },
    {
      term: "Grade",
      definition: "Concentration of a valuable element or mineral in ore",
      examples: "2.5% Cu, 0.8 g/t Au",
      forBiologists: "Grade directly affects energy and reagent budgets. Low-grade material is where biology often has competitive advantage.",
      forMiners: "Biological processes may be economic at lower grades than conventional methods due to lower OPEX."
    },
    {
      term: "Feedstock",
      definition: "Material fed into a process step",
      examples: "Ore into the mill, tailings into reprocessing plant",
      forBiologists: "Always characterize your feedstock: mineralogy, grade, particle size, moisture, acid consumption.",
      forMiners: "Bio-feedstock characterization should include microbial toxicity tests and buffering capacity."
    },
    {
      term: "Tailings",
      definition: "Fine-grained residues after metal extraction; typically stored in engineered impoundments",
      examples: "Post-flotation tailings, heap leach residues",
      forBiologists: "Huge volumes, lower grades, but often accessible and already partially processed. Good bio-targets.",
      forMiners: "Tailings reprocessing with biology can reduce liability while recovering value."
    },
    {
      term: "Bulk Waste Rock",
      definition: "Rock discarded prior to metallurgical extraction (overburden, low-grade, refractory, or gangue-rich material)",
      examples: "Mine dumps, low-grade stockpiles",
      forBiologists: "Potential future resources. Long time horizons acceptable. Design for low-cost, extensive bio-systems.",
      forMiners: "Biology may unlock value from waste piles too expensive to process conventionally."
    },
    {
      term: "Critical Minerals",
      definition: "Elements deemed essential to economic or national security and vulnerable to supply disruption",
      examples: "Rare earth elements, Ni, Co, Li, Pt-group metals",
      forBiologists: "Often present as minor or trace elements. Selective bio-ligands can capture them as co-products.",
      forMiners: "Biology's selectivity advantage is strongest for complex, multi-metal systems with critical by-products."
    }
  ],
  biology: [
    {
      term: "Autotroph / Heterotroph",
      definition: "Organisms that fix carbon from CO₂ vs. those that rely on organic carbon",
      examples: "Autotroph: Acidithiobacillus; Heterotroph: most fungi",
      forBiologists: "Standard definition. Most bioleaching microbes are autotrophs (CO₂ fixers).",
      forMiners: "Autotrophs don't need organic carbon - cheaper to operate in metal-rich, nutrient-poor environments."
    },
    {
      term: "Lithotroph",
      definition: "Organism using inorganic electron donors such as Fe²⁺, reduced sulfur, or H₂ for energy",
      examples: "Iron-oxidizers, sulfur-oxidizers",
      forBiologists: "Key players in bioleaching. They 'eat' the mineral electrons.",
      forMiners: "Lithotrophs are the workforce of bioleaching - they generate the acids and oxidants that dissolve metals."
    },
    {
      term: "Bioleaching",
      definition: "Microbially mediated solubilization of metals from solids (ores, tailings, wastes)",
      examples: "Heap leaching copper, tank leaching e-waste",
      forBiologists: "Broad category. Can involve acid production, oxidant production, or complexing ligands.",
      forMiners: "The main bio-process for primary metal extraction. Proven at commercial scale for Cu, Au, U, Ni, Co."
    },
    {
      term: "Biooxidation",
      definition: "Microbially driven oxidation of sulfides where the valuable metal remains in the solid phase",
      examples: "Pre-treatment of refractory gold ores (BIOX®)",
      forBiologists: "Goal is to break down sulfide matrix, not dissolve the target metal. Different optimization than bioleaching.",
      forMiners: "Proven technology for refractory gold. Exposes gold locked in sulfides for subsequent cyanidation."
    },
    {
      term: "Biosorption",
      definition: "Sorption of dissolved metals onto biomass or extracellular polymeric substances (EPS)",
      examples: "Algae accumulating heavy metals, bacterial EPS binding REEs",
      forBiologists: "Rapid, often passive. Can be very selective depending on functional groups on cell surface.",
      forMiners: "Useful for metal capture from dilute streams (AMD, process water). Can be coupled with biomass harvest."
    },
    {
      term: "Metallophores / Siderophores",
      definition: "Small molecules secreted by microbes that chelate metals with high affinity",
      examples: "Siderophores for Fe, lanthanophores for REEs",
      forBiologists: "Natural metal-binding ligands. Can be harvested or expressed heterologously.",
      forMiners: "Highly selective ligands for separations. Potential advantage over synthetic ligands in complex matrices."
    },
    {
      term: "Bioseparation",
      definition: "Use of biomolecules (proteins, peptides, polymers, whole cells) as selective sorbents or separation agents",
      examples: "Lanmodulin for REE separation, peptide-functionalized resins",
      forBiologists: "Emerging field. Combines selectivity of biology with engineering of deployable systems.",
      forMiners: "Most relevant for high-value, hard-to-separate metals (REEs, PGMs). Still early-stage but promising."
    },
    {
      term: "Acidophile",
      definition: "Organism that thrives at low pH (typically pH < 3)",
      examples: "Acidithiobacillus, Leptospirillum, Ferroplasma",
      forBiologists: "Acid-tolerant microbes are essential for most bioleaching applications.",
      forMiners: "These are the organisms that work in the harsh, acidic conditions of heaps and tanks."
    },
    {
      term: "Sulfate-Reducing Bacteria (SRB)",
      definition: "Bacteria that use sulfate as electron acceptor, producing sulfide",
      examples: "Desulfovibrio, Desulfotomaculum",
      forBiologists: "Opposite of sulfur-oxidizers. Lower redox potential, raise pH, precipitate metals.",
      forMiners: "Core organisms for AMD treatment. Convert dissolved metals to insoluble metal sulfides."
    },
    {
      term: "Extracellular Polymeric Substances (EPS)",
      definition: "Polymers secreted by microbes that form biofilms and modify local chemistry",
      examples: "Polysaccharides, proteins, DNA in biofilms",
      forBiologists: "EPS affects metal binding, diffusion, and surface reactivity.",
      forMiners: "EPS can enhance or inhibit leaching depending on context. Important for heap irrigation design."
    }
  ]
};

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedTerm, setExpandedTerm] = useState(null);

  const allTerms = [
    ...glossaryData.mining.map(t => ({ ...t, category: 'mining' })),
    ...glossaryData.biology.map(t => ({ ...t, category: 'biology' }))
  ];

  const filteredTerms = allTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <BookOpen className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-3">Core Glossary</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Canonical definitions bridging mining and biology terminology
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedCategory('mining')}
                className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  selectedCategory === 'mining'
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Mountain className="w-4 h-4" />
                Mining
              </button>
              <button
                onClick={() => setSelectedCategory('biology')}
                className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  selectedCategory === 'biology'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Microscope className="w-4 h-4" />
                Biology
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-slate-400 text-sm mb-4">
          Showing {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''}
        </div>

        {/* Terms List */}
        <div className="space-y-3">
          {filteredTerms.map((term, i) => (
            <TermCard
              key={i}
              term={term}
              expanded={expandedTerm === `${term.category}-${i}`}
              onToggle={() => setExpandedTerm(
                expandedTerm === `${term.category}-${i}` ? null : `${term.category}-${i}`
              )}
            />
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400">No terms found matching your search.</p>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-12 text-center">
          <a href="/" className="text-emerald-400 hover:text-emerald-300 flex items-center justify-center gap-2">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

function TermCard({ term, expanded, onToggle }) {
  const categoryColors = {
    mining: {
      bg: 'bg-amber-900/20',
      border: 'border-amber-500/50',
      badge: 'bg-amber-600',
      text: 'text-amber-300'
    },
    biology: {
      bg: 'bg-emerald-900/20',
      border: 'border-emerald-500/50',
      badge: 'bg-emerald-600',
      text: 'text-emerald-300'
    }
  };

  const colors = categoryColors[term.category];

  return (
    <div className={`bg-white/10 backdrop-blur-sm rounded-lg border ${colors.border} overflow-hidden transition-all`}>
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${colors.badge}`}>
            {term.category === 'mining' ? <Mountain className="w-3 h-3 inline" /> : <Microscope className="w-3 h-3 inline" />}
          </span>
          <span className="text-lg font-bold text-white">{term.term}</span>
        </div>
        <span className="text-slate-400 text-2xl">{expanded ? '−' : '+'}</span>
      </button>

      {expanded && (
        <div className="p-4 pt-0 border-t border-white/10">
          <div className="space-y-4 mt-4">
            <div>
              <h4 className="text-sm font-semibold text-slate-400 mb-1">Definition</h4>
              <p className="text-slate-200">{term.definition}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-400 mb-1">Examples</h4>
              <p className="text-slate-300 text-sm italic">{term.examples}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className={`${colors.bg} rounded-lg p-3 border ${colors.border}`}>
                <h4 className="text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                  <Microscope className="w-4 h-4" />
                  For Biologists
                </h4>
                <p className="text-emerald-100 text-sm">{term.forBiologists}</p>
              </div>

              <div className={`${colors.bg} rounded-lg p-3 border ${colors.border}`}>
                <h4 className="text-sm font-semibold text-amber-400 mb-2 flex items-center gap-2">
                  <Mountain className="w-4 h-4" />
                  For Miners
                </h4>
                <p className="text-amber-100 text-sm">{term.forMiners}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
