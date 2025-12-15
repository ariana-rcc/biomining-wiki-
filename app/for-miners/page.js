'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Microscope, Zap, Beaker, Factory, FlaskConical, FileCheck } from 'lucide-react';

export default function ForMiners() {
  const [expandedSection, setExpandedSection] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Biology 101 for Mining Professionals</h1>
          <p className="text-xl text-amber-200 max-w-3xl mx-auto">
            Understanding how microbes and biomolecules interact with metals and minerals
          </p>
        </div>

        {/* Key Insight */}
        <div className="bg-amber-950/30 border-2 border-amber-500/50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-amber-300 mb-3">
            Biology as Switchable, Selective Chemistry
          </h2>
          <p className="text-amber-100">
            Microbes provide <strong>switchable, selective chemistry</strong> for metal extraction and management.
            Like reagents and catalysts, they're constrained by temperature, pH, ionic strength, inhibitors, and
            substrate availability. Understanding these constraints is key to successful integration.
          </p>
        </div>

        {/* Microbial Energy & Carbon */}
        <Section
          title="Microbial Energy and Carbon Sources"
          icon={Zap}
          expanded={expandedSection === 'energy'}
          onToggle={() => setExpandedSection(expandedSection === 'energy' ? null : 'energy')}
        >
          <div className="space-y-4">
            <p className="text-slate-200">
              At a high level, microbes need three things to survive and do work:
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <NeedCard
                title="Energy Source"
                examples={[
                  "Light (not relevant here)",
                  "Oxidation of Fe²⁺",
                  "Reduced sulfur compounds",
                  "Organic carbon"
                ]}
              />
              <NeedCard
                title="Electron Donors/Acceptors"
                examples={[
                  "Fe²⁺ / Fe³⁺",
                  "Reduced/oxidized sulfur",
                  "O₂, nitrate, sulfate",
                  "CO₂"
                ]}
              />
              <NeedCard
                title="Carbon Source"
                examples={[
                  "CO₂ (autotrophs)",
                  "Organic carbon (heterotrophs)",
                  "Mixed modes"
                ]}
              />
            </div>

            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-600 mt-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Key Functional Groups in Biomining
              </h3>

              <div className="space-y-4">
                <MicrobeCard
                  name="Iron & Sulfur-Oxidizing Autotrophs"
                  examples="Acidithiobacillus ferrooxidans, Leptospirillum spp."
                  function="Generate Fe³⁺ and sulfuric acid that attack sulfide minerals"
                  relevance="Core organisms in bioleaching and biooxidation"
                />

                <MicrobeCard
                  name="Sulfur-Oxidizers"
                  examples="Acidithiobacillus thiooxidans"
                  function="Drive sulfuric acid production and metal solubilization"
                  relevance="Essential for maintaining acidity in heaps and tanks"
                />

                <MicrobeCard
                  name="Sulfate-Reducing Bacteria (SRB)"
                  examples="Desulfovibrio, Desulfotomaculum"
                  function="Produce sulfide that precipitates metals as metal sulfides"
                  relevance="Critical for AMD treatment and metal recovery from drainage"
                />

                <MicrobeCard
                  name="Heterotrophs & Consortia"
                  examples="Various species working together"
                  function="Produce organic acids and chelators, modify biofilms, influence sorption"
                  relevance="Support ecosystems in heaps and modify mineral surfaces"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* Mechanisms */}
        <Section
          title="Mechanisms of Metal Mobilization & Capture"
          icon={Beaker}
          expanded={expandedSection === 'mechanisms'}
          onToggle={() => setExpandedSection(expandedSection === 'mechanisms' ? null : 'mechanisms')}
        >
          <div className="space-y-4">
            <p className="text-slate-200 mb-4">
              Microbes mobilize and capture metals through several mechanistic pathways. All can be engineered or tuned:
            </p>

            <MechanismCard
              title="Acidolysis"
              description="Production of acid (e.g., H₂SO₄) that dissolves minerals"
              application="Critical for sulfides and carbonates"
              example="Microbes oxidize sulfur to sulfuric acid, which attacks chalcopyrite (CuFeS₂)"
              color="red"
            />

            <MechanismCard
              title="Redoxolysis"
              description="Oxidation or reduction of metals or ligands, controlling solubility"
              application="Fe²⁺ → Fe³⁺ oxidation, U(VI) → U(IV) reduction"
              example="Fe³⁺ generated by microbes acts as oxidant to leach copper from sulfides"
              color="blue"
            />

            <MechanismCard
              title="Complexolysis"
              description="Production of ligands that complex metals and keep them in solution"
              application="Metallophores, siderophores, organic acids"
              example="Microbes secrete organic acids that chelate rare earth elements"
              color="purple"
            />

            <MechanismCard
              title="Biosorption & Bioaccumulation"
              description="Metals stick to cell surfaces/EPS or are actively taken up and stored"
              application="Rapid, often not directly tied to metabolism"
              example="Algae and bacteria accumulate heavy metals from AMD on cell surfaces"
              color="green"
            />

            <MechanismCard
              title="Bioprecipitation / Biomineralization"
              description="Microbial activity alters local chemistry to precipitate new minerals"
              application="Changes pH, redox, carbonate, or sulfide levels"
              example="SRB produce sulfide that precipitates Cu, Zn, and other metals from solution"
              color="amber"
            />
          </div>
        </Section>

        {/* Biomining Modalities */}
        <Section
          title="Biomining Modalities & Flowsheets"
          icon={Factory}
          expanded={expandedSection === 'modalities'}
          onToggle={() => setExpandedSection(expandedSection === 'modalities' ? null : 'modalities')}
        >
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-3">
              Classical Bioleaching & Biooxidation
            </h3>

            <ModalityCard
              title="Dump / Heap Bioleaching"
              description="Low-grade sulfide ores piled on pads and irrigated with acidic ferric solutions. Native or inoculated acidophiles catalyze Fe/S oxidation and metal release."
              applications="Common for copper, increasingly for other sulfides"
              parameters={[
                "Time: Months to years",
                "Temperature: Ambient to 50°C",
                "pH: 1.5-2.5",
                "Scale: Very large (Mt)"
              ]}
              integration="PLS → SX/EW → metal cathodes"
              challenges="Passivation layers, channeling, oxygen/nutrient limitations"
            />

            <ModalityCard
              title="Stirred-Tank Biooxidation"
              description="High-grade refractory gold or polymetallic concentrates oxidized in aerated reactors prior to cyanidation or other leach."
              applications="Proven technology for refractory gold (BIOX®, BacTech)"
              parameters={[
                "Time: Days to weeks",
                "Temperature: 40-50°C (mesophile) or 65-85°C (thermophile)",
                "pH: 1.5-2.0",
                "Scale: Moderate (kt concentrate)"
              ]}
              integration="Flotation → biooxidation → cyanidation → recovery"
              challenges="Capital intensive, energy costs, solids loading limits"
            />

            <ModalityCard
              title="In-Situ / In-Stope Bioleaching"
              description="Injection of lixiviants and/or microbes into permeable deposits underground or in fractured zones."
              applications="Attractive for low-grade or inaccessible deposits"
              parameters={[
                "Time: Years",
                "Temperature: Variable (geothermal gradient)",
                "pH: Controlled by injection",
                "Scale: Highly variable"
              ]}
              integration="Injection wells → collection → processing"
              challenges="Geotechnical risks, regulatory hurdles, containment"
            />

            <h3 className="text-lg font-semibold text-white mb-3 mt-8">
              Bioseparations & Advanced Flowsheets
            </h3>

            <div className="bg-purple-900/20 rounded-lg p-5 border border-purple-500/30">
              <h4 className="font-semibold text-purple-300 mb-3">Emerging Technologies for REEs & Complex Matrices</h4>
              <ul className="space-y-2 text-slate-200 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span><strong>Protein/peptide-based ligands</strong> (e.g., lanmodulin) for selective REE capture</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span><strong>Hybrid biomolecular ligands</strong> – peptides + polymers for improved manufacturability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span><strong>Non-chromatographic deployments</strong> – membranes, beads, structured packings for PLS polishing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span><strong>Applications</strong>: Coal by-products, phosphogypsum, red mud, spent catalysts, magnet scrap</span>
                </li>
              </ul>
              <p className="text-purple-200 text-sm mt-3 italic">
                Challenges: Matrix effects, fouling, immobilization strategies, feed chemistry variability
              </p>
            </div>

            <h3 className="text-lg font-semibold text-white mb-3 mt-8">
              Bioremediation & Recovery from Waste
            </h3>

            <div className="bg-emerald-900/20 rounded-lg p-5 border border-emerald-500/30">
              <ul className="space-y-3 text-slate-200 text-sm">
                <li>
                  <strong className="text-emerald-300">AMD/ARD Bioremediation:</strong> Constructed wetlands,
                  SRB bioreactors, algae systems that remove metals and raise pH via sulfate reduction and metal sulfide precipitation
                </li>
                <li>
                  <strong className="text-emerald-300">Metal Recovery from AMD:</strong> Coupling bioremediation
                  with selective sorbents or biomineralization to recover Cu, Zn, REEs, and other metals
                </li>
                <li>
                  <strong className="text-emerald-300">E-waste & Urban Mining:</strong> Bioleaching and biosorption
                  applied to circuit boards, magnets, and electronics as alternative to high-temperature smelting
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Evaluation Checklist */}
        <Section
          title="Evaluation Checklist for Bio-Solutions"
          icon={FileCheck}
          expanded={expandedSection === 'checklist'}
          onToggle={() => setExpandedSection(expandedSection === 'checklist' ? null : 'checklist')}
        >
          <div className="bg-slate-800/50 rounded-lg p-6 border border-amber-500/50">
            <p className="text-amber-200 mb-4">
              Before dismissing or adopting a bio-solution, ask these questions:
            </p>
            <div className="space-y-4">
              {[
                {
                  q: "What problem is it actually solving?",
                  detail: "New resource access, cost reduction, impurity management, water quality, closure risk, social license?"
                },
                {
                  q: "What is the technology-readiness level (TRL) and evidence base?",
                  detail: "Lab vs. pilot vs. commercial references. Performance in representative feedstocks, not just synthetic solutions."
                },
                {
                  q: "Time scales and integration",
                  detail: "Does it fit within existing residence times? Can it run as a side-stream or bleed-stream process?"
                },
                {
                  q: "Risk and monitoring",
                  detail: "What monitoring (sensors, assays) is required? What happens if it fails or stops?"
                },
                {
                  q: "Regulatory and public-perception impacts",
                  detail: "Does it simplify permitting (less chemical transport, lower emissions)? Does it improve closure outcomes and community relations?"
                }
              ].map((item, i) => (
                <div key={i} className="border-l-4 border-amber-500 pl-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{item.q}</p>
                      <p className="text-slate-300 text-sm mt-1">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Navigation */}
        <div className="mt-12 flex justify-between">
          <Link href="/" className="text-amber-400 hover:text-amber-300 flex items-center gap-2">
            ← Back to Home
          </Link>
          <Link href="/complex-materials" className="text-amber-400 hover:text-amber-300 flex items-center gap-2">
            Explore Complex Materials →
          </Link>
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
          <Icon className="w-6 h-6 text-amber-400" />
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

function NeedCard({ title, examples }) {
  return (
    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
      <h3 className="font-semibold text-white mb-2">{title}</h3>
      <ul className="space-y-1">
        {examples.map((ex, i) => (
          <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
            <span className="text-amber-500 mt-1">→</span>
            <span>{ex}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MicrobeCard({ name, examples, function: func, relevance }) {
  return (
    <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-500/50">
      <h4 className="font-semibold text-emerald-300">{name}</h4>
      <p className="text-slate-400 text-xs mt-1 italic">{examples}</p>
      <p className="text-slate-200 text-sm mt-2"><strong>Function:</strong> {func}</p>
      <p className="text-amber-300 text-sm mt-1"><strong>Relevance:</strong> {relevance}</p>
    </div>
  );
}

function MechanismCard({ title, description, application, example, color }) {
  const colorClasses = {
    red: 'border-red-500/50 bg-red-900/10',
    blue: 'border-blue-500/50 bg-blue-900/10',
    purple: 'border-purple-500/50 bg-purple-900/10',
    green: 'border-green-500/50 bg-green-900/10',
    amber: 'border-amber-500/50 bg-amber-900/10'
  };

  return (
    <div className={`rounded-lg p-4 border ${colorClasses[color]}`}>
      <h3 className="font-semibold text-white mb-1">{title}</h3>
      <p className="text-slate-200 text-sm mb-2">{description}</p>
      <p className="text-slate-300 text-sm mb-2">
        <strong className="text-slate-200">Application:</strong> {application}
      </p>
      <div className="bg-slate-800/50 rounded p-2 border border-slate-600/50">
        <p className="text-slate-300 text-xs">
          <strong>Example:</strong> {example}
        </p>
      </div>
    </div>
  );
}

function ModalityCard({ title, description, applications, parameters, integration, challenges }) {
  return (
    <div className="bg-slate-800/30 rounded-lg p-5 border border-slate-600/50">
      <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
      <p className="text-slate-200 text-sm mb-3">{description}</p>

      <div className="grid md:grid-cols-2 gap-4 mb-3">
        <div>
          <p className="text-xs font-semibold text-emerald-400 mb-1">APPLICATIONS</p>
          <p className="text-slate-300 text-sm">{applications}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-blue-400 mb-1">KEY PARAMETERS</p>
          <ul className="text-slate-300 text-xs space-y-0.5">
            {parameters.map((p, i) => <li key={i}>• {p}</li>)}
          </ul>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-xs font-semibold text-purple-400 mb-1">INTEGRATION</p>
        <p className="text-slate-300 text-sm">{integration}</p>
      </div>

      <div className="bg-red-900/20 rounded p-2 border border-red-700/30">
        <p className="text-xs font-semibold text-red-400 mb-1">COMMON CHALLENGES</p>
        <p className="text-red-200 text-xs">{challenges}</p>
      </div>
    </div>
  );
}
