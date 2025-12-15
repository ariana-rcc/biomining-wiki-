import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Mountain, Factory, Beaker, AlertCircle, TrendingUp, Clock, Droplets, FileCheck } from 'lucide-react';

export default function ForBiologists() {
  const [expandedSection, setExpandedSection] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Mining 101 for Biologists</h1>
          <p className="text-xl text-emerald-200 max-w-3xl mx-auto">
            If you want biology to matter in mining, you have to know where your biology would live in a flowsheet
          </p>
        </div>

        {/* Why This Matters */}
        <div className="bg-amber-950/30 border-2 border-amber-500/50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-amber-300 mb-3 flex items-center gap-2">
            <AlertCircle className="w-6 h-6" />
            Why Biologists Need to Understand Mining
          </h2>
          <div className="text-amber-100 space-y-3">
            <p>
              From the mining side, <strong>"biomining" is not a magical stand-alone box</strong>. It's a candidate
              step in a tightly constrained value chain where:
            </p>
            <ul className="ml-6 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">•</span>
                Rock is moved at <strong>millions of tonnes per year</strong> scale
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">•</span>
                Margins can be thin and metal prices volatile
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">•</span>
                Time scales, water availability, and permitting often matter as much as chemistry
              </li>
            </ul>
            <p className="mt-4 font-semibold">
              This guide helps you place biological ideas in realistic process contexts and speak the language
              of mining engineers.
            </p>
          </div>
        </div>

        {/* The Journey */}
        <Section
          title="The Journey from Rock to Metal"
          icon={Mountain}
          expanded={expandedSection === 'journey'}
          onToggle={() => setExpandedSection(expandedSection === 'journey' ? null : 'journey')}
        >
          <div className="space-y-4">
            <p className="text-slate-200">
              At a high level, the mining value chain looks like this:
            </p>

            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-600">
              <div className="font-mono text-sm text-emerald-300 space-y-2">
                <div>Rock in ground</div>
                <div className="ml-4">↓ <span className="text-slate-400">(exploration & resource modeling)</span></div>
                <div>Ore body defined</div>
                <div className="ml-4">↓ <span className="text-slate-400">(mine planning & development)</span></div>
                <div>Ore and waste rock excavated</div>
                <div className="ml-4">↓ <span className="text-slate-400">(crushing, grinding, concentration)</span></div>
                <div>Concentrate / leach solution</div>
                <div className="ml-4">↓ <span className="text-slate-400">(metallurgical refining)</span></div>
                <div>Saleable product (metal, concentrate, chemicals)</div>
                <div className="ml-4">↓</div>
                <div>Tailings, waste rock, water to be managed and closed</div>
              </div>
            </div>

            <div className="bg-emerald-900/30 rounded-lg p-4 border border-emerald-700/50">
              <p className="text-emerald-200 text-sm">
                <strong>Where biology plugs in:</strong> Heap/in-situ leaching, metal separation and polishing,
                AMD treatment and closure, tailings reprocessing
              </p>
            </div>
          </div>
        </Section>

        {/* Value Chain Stages */}
        <Section
          title="Mining Value Chain - Stage by Stage"
          icon={Factory}
          expanded={expandedSection === 'stages'}
          onToggle={() => setExpandedSection(expandedSection === 'stages' ? null : 'stages')}
        >
          <div className="space-y-6">
            <StageCard
              title="1. Exploration & Resource Definition"
              what="Finding and characterizing ore bodies through geologic mapping, core drilling, and lab assays to measure grade and mineralogy"
              whyBiology={[
                "New bio-technologies can change which parts of a deposit are considered 'ore'",
                "Enable recovery of critical by-product elements currently ignored",
                "Bio-assays and biosensors for exploration geochemistry"
              ]}
              whereBio={[
                "Biosensors for exploration",
                "Resource models that incorporate bioprocess options"
              ]}
            />

            <StageCard
              title="2. Mine Planning & Development"
              what="Choosing mining method (open pit vs underground), mine layout, and routing material to ore stockpiles, low-grade stockpiles, waste dumps, or tailings"
              whyBiology={[
                "Decisions here govern tonnage, time, and access for your process",
                "Long-residence-time bio-processes best suited for stockpiles, tailings, or AMD",
                "Include bio-recovery in closure plans from day one"
              ]}
              whereBio={[
                "Biologically compatible stockpile design",
                "Bioremediation and bio-recovery in closure plans"
              ]}
            />

            <StageCard
              title="3. Extraction: Getting Rock Out"
              what="Drill, blast, load, and haul rock. Scale: tens to hundreds of thousands of tonnes per day. Mix of ore and waste is imperfect"
              whyBiology={[
                "Input material is stressed, mixed, partly oxidized rock - not pure minerals",
                "Size distribution and surface damage from blasting affect leach kinetics",
                "Water infiltration and oxygen diffusion are key for heaps and in-situ"
              ]}
              whereBio={[
                "In-stope leaching (injecting solutions into fractured zones)",
                "Blast patterns that favor bioleaching (fracture networks)"
              ]}
            />

            <StageCard
              title="4. Comminution & Concentration"
              what="Crushing/grinding to liberate minerals, then concentration via flotation, gravity, or magnetic separation. Produces concentrate (high value) and tailings"
              whyBiology={[
                "Comminution is the most energy-intensive step",
                "Biology that enables coarser processing while maintaining recovery is extremely valuable",
                "Tailings are huge, lower-grade targets for bio-recovery"
              ]}
              whereBio={[
                "Bio-assisted comminution (microbes weakening grain boundaries)",
                "Recovery of critical elements from tailings",
                "Bio-compatible tailings design"
              ]}
            />

            <StageCard
              title="5. Metallurgy & Refining"
              what="Convert concentrates to saleable products via hydrometallurgy (leach, SX, IX, EW) or pyrometallurgy (smelting, refining)"
              whyBiology={[
                "Selectivity and purity are critical here",
                "Biology offers highly selective ligands and mild operating conditions",
                "Impurities can wreck downstream processes"
              ]}
              whereBio={[
                "Bioleaching/biooxidation as primary leach steps",
                "Bioseparations for polishing and capturing critical co-products",
                "SRB reactors for treating bleed streams"
              ]}
            />

            <StageCard
              title="6. Waste, Water & Closure"
              what="Managing tailings storage, waste-rock dumps, water systems, and long-term closure obligations"
              whyBiology={[
                "Acid mine drainage and seepage can persist for decades",
                "This is where liability and social license live",
                "Most mature biological applications are in this space"
              ]}
              whereBio={[
                "Constructed wetlands and SRB reactors for AMD",
                "Treating AMD as a resource (recover Cu, Zn, REEs)",
                "Using former mine sites as test beds for new tech"
              ]}
            />
          </div>
        </Section>

        {/* Key Constraints */}
        <Section
          title="Constraints That Shape Bio-Adoption"
          icon={AlertCircle}
          expanded={expandedSection === 'constraints'}
          onToggle={() => setExpandedSection(expandedSection === 'constraints' ? null : 'constraints')}
        >
          <div className="space-y-4">
            <ConstraintCard
              title="Time"
              icon={Clock}
              description="Operations expect days to weeks, not months to years (except heaps/dumps)"
              implication="If your process is slow, consider treating stockpiles, tailings, or AMD where slow is acceptable, or use biology to polish/condition streams"
            />
            <ConstraintCard
              title="Throughput & Scale"
              icon={TrendingUp}
              description="Mid-size mines move tens of millions of tonnes per year"
              implication="Be explicit about scale. Side-stream bio-units are more realistic early targets than whole-plant replacements"
            />
            <ConstraintCard
              title="Process Integration & Risk"
              icon={AlertCircle}
              description="Mines are complex, coupled systems. Unexpected downtime is extremely expensive"
              implication="Emphasize instrumentation and control. Design 'safe failure' modes with bypass options. Provide clear lab → pilot → demo pathways"
            />
            <ConstraintCard
              title="Water, Reagents & Permitting"
              icon={Droplets}
              description="Water is often constrained. Reagents have costs, hazards, and permitting implications"
              implication="Bio-solutions that reduce net reagent use, enable higher water recycling, or simplify permitting have extra strategic value"
            />
          </div>
        </Section>

        {/* Design Checklist */}
        <Section
          title="Quick Design Checklist"
          icon={FileCheck}
          expanded={expandedSection === 'checklist'}
          onToggle={() => setExpandedSection(expandedSection === 'checklist' ? null : 'checklist')}
        >
          <div className="bg-slate-800/50 rounded-lg p-6 border border-emerald-500/50">
            <p className="text-emerald-200 mb-4">
              Before investing heavily in a biomining concept, answer these in one page:
            </p>
            <div className="space-y-4">
              {[
                "Where does this sit in the mining value chain? (exploration, extraction, comminution, concentration, leaching, separation, closure)",
                "What is the feedstock? (ore, concentrate, tailings, AMD, e-waste, slag - mineralogy, grade, particle size)",
                "What is the competing conventional option? (heap leach, tank leach, SX, smelting, lime neutralization)",
                "What is your biological advantage? (lower cost, lower energy, higher selectivity, new resource access, better closure)",
                "What does success look like to the mine operator? (higher recovery, lower OPEX, unlocking new resource, reducing closure liability)",
                "What is your realistic first deployment? (side-stream polishing, tailings/AMD reprocessing, pilot at legacy site)"
              ].map((q, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-slate-200">{q}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Navigation */}
        <div className="mt-12 flex justify-between">
          <a href="/" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2">
            ← Back to Home
          </a>
          <a href="/flowsheets" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2">
            See Example Flowsheets →
          </a>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, expanded, onToggle, children }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl mb-4 border border-white/20 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6 text-emerald-400" />
          <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
        {expanded ? <ChevronDown className="w-6 h-6 text-slate-300" /> : <ChevronRight className="w-6 h-6 text-slate-300" />}
      </button>
      {expanded && (
        <div className="p-6 pt-0 border-t border-white/10">
          {children}
        </div>
      )}
    </div>
  );
}

function StageCard({ title, what, whyBiology, whereBio }) {
  return (
    <div className="bg-slate-800/30 rounded-lg p-5 border border-slate-600/50">
      <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>

      <div className="mb-4">
        <h4 className="text-sm font-semibold text-slate-400 mb-1">What it is:</h4>
        <p className="text-slate-200 text-sm">{what}</p>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-semibold text-emerald-400 mb-2">Why it matters to biologists:</h4>
        <ul className="space-y-1">
          {whyBiology.map((item, i) => (
            <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
              <span className="text-emerald-500 mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-emerald-900/20 rounded p-3 border border-emerald-700/30">
        <h4 className="text-sm font-semibold text-emerald-300 mb-2">Where biology might plug in:</h4>
        <ul className="space-y-1">
          {whereBio.map((item, i) => (
            <li key={i} className="text-emerald-200 text-sm flex items-start gap-2">
              <span className="text-emerald-400">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ConstraintCard({ title, icon: Icon, description, implication }) {
  return (
    <div className="bg-slate-800/30 rounded-lg p-5 border border-amber-600/30">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-5 h-5 text-amber-400" />
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      <p className="text-slate-300 text-sm mb-3">{description}</p>
      <div className="bg-amber-900/20 rounded p-3 border-l-4 border-amber-500">
        <p className="text-amber-200 text-sm">
          <strong>Implication:</strong> {implication}
        </p>
      </div>
    </div>
  );
}
