import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Zap, Target, AlertCircle } from 'lucide-react';

const flowsheetData = [
  {
    id: 'copper-heap',
    title: "Copper Heap Leach Operation",
    type: "Classical Bio-Application",
    description: "Low-grade copper oxide/sulfide ore processed via heap leaching with biological oxidation assistance",
    diagram: `[Mine - Open Pit]
   ↓ ore (0.3-1% Cu)
[Crushing to ~2-5 cm]
   ↓ crushed ore
[Heap Leach Pad] ← (irrigation: acidic ferric sulfate + microbes)
   ↓ PLS (Cu²⁺ solution)
[Solvent Extraction (SX)] → [Electrowinning (EW)] → Cu cathodes (99.99% Cu)
   ↑                              ↓
   └──── raffinate (recycled) ────┘`,
    bioIntegration: [
      {
        stage: "Heap Leach Pad",
        role: "Native or inoculated acidophiles (Acidithiobacillus, Leptospirillum)",
        what: "Microbes oxidize Fe²⁺ to Fe³⁺ and produce sulfuric acid, which dissolves copper from minerals",
        control: "pH control (1.5-2.5), nutrient addition (N, P), aeration management"
      },
      {
        stage: "Side-stream Bio-polishing",
        role: "Optional: biosorption or bioseparation",
        what: "Remove impurities (Fe, Mn, Al) from PLS before SX to improve efficiency",
        control: "Selective biomolecules or microbial biomass; regeneration cycles"
      },
      {
        stage: "Bleed Stream Treatment",
        role: "SRB reactors",
        what: "Treat bleed streams to recover metals, manage sulfate, and reduce discharge volume",
        control: "Anaerobic conditions, organic carbon addition, sulfide precipitation"
      }
    ],
    reality: [
      "Many 'non-biological' heaps already rely on native acidophiles - intentional bio-management improves performance",
      "Time scale: Months to years for full heap cycle",
      "Scale: Very large - tens of millions of tonnes per year",
      "Economics favor biology when ore grade is too low for conventional milling/flotation"
    ],
    maturity: "Commercial - proven at major operations worldwide"
  },
  {
    id: 'refractory-gold',
    title: "Refractory Gold with Tank Biooxidation",
    type: "Proven Bio-Technology",
    description: "Gold encapsulated in sulfides (pyrite, arsenopyrite) treated via biooxidation before cyanidation",
    diagram: `[Ore - Underground or Open Pit]
   ↓ ore (refractory gold in sulfides)
[Crushing & Grinding]
   ↓ ground ore
[Flotation]
   ↓ sulfide concentrate (10-40% solids)
[Biooxidation Tanks] ← (air, nutrients, microbes at 40-50°C or 65-85°C)
   ↓ oxidized residue (gold exposed)
[Cyanidation] ← (NaCN solution)
   ↓ Au-rich solution
[Carbon Adsorption → Stripping → Electrowinning] → Gold doré`,
    bioIntegration: [
      {
        stage: "Biooxidation Tanks",
        role: "Acidophilic Fe/S-oxidizing bacteria (mesophiles or thermophiles)",
        what: "Oxidize sulfide minerals (pyrite, arsenopyrite) to expose encapsulated gold for cyanidation",
        control: "Temperature (40-50°C mesophile or 65-85°C thermophile), pH 1.5-2.0, air flow, retention time 4-7 days"
      },
      {
        stage: "Post-Bioox Neutralization",
        role: "Chemical (lime) or biological buffering",
        what: "Raise pH from ~1.5 to 10-11 for cyanidation step",
        control: "Careful pH management to avoid gold losses"
      },
      {
        stage: "Tailings & Water Treatment",
        role: "Bioremediation downstream",
        what: "Treat process water and tailings using SRB or other microbes to remove residual metals and cyanide",
        control: "Anaerobic bioreactors, organic carbon, detention time"
      }
    ],
    reality: [
      "Core biooxidation step is already fully biological - proven technology (BIOX®, BacTech)",
      "Time scale: Days to weeks (tank residence)",
      "Scale: Moderate - thousands of tonnes of concentrate per year",
      "Enables processing of refractory ores that would otherwise be uneconomic",
      "Capital intensive but OPEX-competitive with alternatives like roasting or pressure oxidation"
    ],
    maturity: "Commercial - operating for 30+ years at multiple sites"
  },
  {
    id: 'tailings-recovery',
    title: "Tailings Reprocessing for Critical Metals",
    type: "Emerging Bio-Application",
    description: "Historic tailings contain metals not recovered in initial processing - bioleach without rebuilding infrastructure",
    diagram: `[Historic Tailings Dam]
   ↓ tailings slurry (low-grade Cu, Co, REEs)
[Bioleach Tanks or Heap-Style Pad] ← (acidophiles, nutrients, air)
   ↓ PLS (polymetallic solution)
[Bioseparation / Selective Recovery]
   ├→ [Cu Recovery] → SX/EW → Cu cathodes
   ├→ [Co Recovery] → Ion exchange or bioseparation → Co product
   └→ [REE Recovery] → Biomolecular ligands or IX → REE concentrate
[Treated Tailings] → Stabilization & Closure`,
    bioIntegration: [
      {
        stage: "Bioleaching",
        role: "Acidophiles for bulk metal solubilization",
        what: "Re-leach metals left behind in original processing - Cu, Zn, Co, Ni, REEs",
        control: "Tank or heap configuration, pH, temperature, solids loading"
      },
      {
        stage: "Bioseparations",
        role: "Selective biomolecules (proteins, peptides, siderophores)",
        what: "Separate and concentrate specific metals from complex PLS - especially valuable for REEs and Co",
        control: "Immobilized ligands, regeneration, matrix tolerance"
      },
      {
        stage: "Tailings Stabilization",
        role: "MICP (microbially-induced calcite precipitation) or vegetation",
        what: "Stabilize re-processed tailings to reduce dust and seepage for final closure",
        control: "Nutrient injection for MICP, vegetation establishment"
      }
    ],
    reality: [
      "Historic tailings often contain critical metals (Co, REEs, PGMs) that weren't economic to recover originally",
      "Bioleaching avoids need to re-mine and rebuild processing infrastructure",
      "Time scale: Flexible - can be slow (years for heap-style) or moderate (weeks for tanks)",
      "Dual benefit: environmental remediation + resource recovery",
      "Regulatory advantage: improves closure outcomes while generating revenue"
    ],
    maturity: "Pilot to Early Commercial - case-by-case evaluation needed"
  },
  {
    id: 'amd-treatment',
    title: "AMD Treatment & Metal Recovery",
    type: "Environmental Bio-Application",
    description: "Convert acid mine drainage from liability to resource via biological treatment and selective metal recovery",
    diagram: `[Acid Mine Drainage Source] (pH 2-4, dissolved Fe, Cu, Zn, Mn, Al, REEs)
   ↓
[Pre-treatment: Aeration & Settling] → Fe precipitates removed
   ↓
[SRB Bioreactor] ← (organic carbon, SRB inoculum)
   ↓ sulfide production raises pH, precipitates metals
[Metal Sulfide Recovery]
   ├→ [Cu/Zn Sulfide Precipitate] → Smelter feedstock
   ├→ [Bioseparation for REEs] → REE concentrate
   └→ [Polishing] → Discharge or reuse
[Constructed Wetland (Optional)] → Final polishing, ecological habitat`,
    bioIntegration: [
      {
        stage: "SRB Bioreactor",
        role: "Sulfate-reducing bacteria (Desulfovibrio, Desulfotomaculum)",
        what: "Reduce sulfate to sulfide, which precipitates metals as metal sulfides and raises pH",
        control: "Anaerobic conditions, organic carbon (e.g., ethanol, molasses), retention time"
      },
      {
        stage: "Selective Metal Recovery",
        role: "Bioseparation or staged precipitation",
        what: "Selectively recover high-value metals (Cu, Zn, REEs) before bulk treatment",
        control: "pH control for staged precipitation, biomolecular ligands for selectivity"
      },
      {
        stage: "Constructed Wetland",
        role: "Mixed microbial communities + vegetation",
        what: "Final polishing for trace metals, ecological restoration, public acceptance",
        control: "Passive system, seasonal monitoring"
      }
    ],
    reality: [
      "AMD is both environmental hazard and metal resource - contains Cu, Zn, Mn, REEs at recoverable concentrations",
      "Passive treatment (wetlands) proven for low-flow systems; bioreactors for higher flows",
      "Time scale: Hours to days (bioreactor); weeks (wetlands)",
      "Dual benefit: regulatory compliance + revenue from recovered metals",
      "Strongest case where discharge limits are tight or where critical metals (REEs) are present"
    ],
    maturity: "Medium-High - wetlands are proven; metal recovery from AMD is emerging"
  }
];

export default function Flowsheets() {
  const [expandedFlowsheet, setExpandedFlowsheet] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Example Flowsheets</h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            See how biology integrates into real mining operations - from proven commercial processes to emerging applications
          </p>
        </div>

        {/* Flowsheets */}
        <div className="space-y-4">
          {flowsheetData.map(flowsheet => (
            <FlowsheetCard
              key={flowsheet.id}
              flowsheet={flowsheet}
              expanded={expandedFlowsheet === flowsheet.id}
              onToggle={() => setExpandedFlowsheet(expandedFlowsheet === flowsheet.id ? null : flowsheet.id)}
            />
          ))}
        </div>

        {/* Key Takeaway */}
        <div className="mt-8 bg-emerald-950/30 border border-emerald-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-emerald-300 mb-2">Integration Patterns</h3>
          <p className="text-emerald-100 text-sm mb-3">
            Notice the common patterns across these flowsheets:
          </p>
          <ul className="text-emerald-200 text-sm space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400">•</span>
              <span><strong>Biology as a unit operation</strong> - integrated into larger flowsheets, not standalone</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400">•</span>
              <span><strong>Control parameters matter</strong> - pH, temperature, residence time, nutrients are critical</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400">•</span>
              <span><strong>Side-stream applications</strong> - polishing, impurity removal, water treatment add value without replacing main process</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400">•</span>
              <span><strong>Dual benefits</strong> - best cases combine economic value with environmental improvement</span>
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex justify-between">
          <a href="/for-biologists" className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
            ← Back to Mining 101
          </a>
          <a href="/" className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

function FlowsheetCard({ flowsheet, expanded, onToggle }) {
  const typeColors = {
    "Classical Bio-Application": "bg-blue-600",
    "Proven Bio-Technology": "bg-emerald-600",
    "Emerging Bio-Application": "bg-purple-600",
    "Environmental Bio-Application": "bg-green-600"
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="text-left">
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${typeColors[flowsheet.type]}`}>
              {flowsheet.type}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-slate-700">
              {flowsheet.maturity}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">{flowsheet.title}</h2>
          <p className="text-slate-300 text-sm">{flowsheet.description}</p>
        </div>
        {expanded ? <ChevronDown className="w-6 h-6 text-slate-300 flex-shrink-0" /> : <ChevronRight className="w-6 h-6 text-slate-300 flex-shrink-0" />}
      </button>

      {expanded && (
        <div className="p-6 pt-0 border-t border-white/10 space-y-6">
          {/* Diagram */}
          <div>
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-400" />
              Flowsheet Diagram
            </h3>
            <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-600">
              <pre className="text-emerald-300 text-sm font-mono whitespace-pre-wrap overflow-x-auto">
                {flowsheet.diagram}
              </pre>
            </div>
          </div>

          {/* Bio Integration Points */}
          <div>
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" />
              Biological Integration Points
            </h3>
            <div className="space-y-3">
              {flowsheet.bioIntegration.map((point, i) => (
                <div key={i} className="bg-slate-800/30 rounded-lg p-4 border border-purple-500/30">
                  <h4 className="font-semibold text-purple-300 mb-2">{point.stage}</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-slate-400">Role:</span>
                      <span className="text-slate-200 ml-2">{point.role}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">What it does:</span>
                      <span className="text-slate-200 ml-2">{point.what}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Control:</span>
                      <span className="text-slate-200 ml-2">{point.control}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reality Check */}
          <div>
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              Reality Check: What You Need to Know
            </h3>
            <ul className="space-y-2">
              {flowsheet.reality.map((item, i) => (
                <li key={i} className="text-slate-200 text-sm flex items-start gap-2">
                  <span className="text-amber-400 mt-1">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
