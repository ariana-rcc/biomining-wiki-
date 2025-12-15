# Biomining Wiki - Interactive Educational Site

A comprehensive educational website about biomining - the use of biology to aid metal recovery and management. This site bridges the knowledge gap between biologists and mining professionals working on critical mineral recovery.

## Site Structure

### Home Page (`index.jsx`)
- Dual learning paths: one for biologists, one for mining professionals
- Links to shared resources
- Overview of what biomining is

### For Biologists Path

#### Mining 101 for Biologists (`for-biologists.jsx`)
Helps biologists understand where their biology fits into mining operations:
- Why biologists need to understand mining
- The journey from rock to metal
- Mining value chain stage by stage (exploration, planning, extraction, comminution, metallurgy, closure)
- Key constraints (time, throughput, integration, water/reagents, social license)
- Quick design checklist

### For Mining Professionals Path

#### Biology 101 for Miners (`for-miners.jsx`)
Helps mining professionals understand how biology can enhance operations:
- Microbial energy and carbon sources
- Key functional groups (iron/sulfur oxidizers, SRBs, heterotrophs)
- Mechanisms of metal mobilization and capture (acidolysis, redoxolysis, complexolysis, biosorption, bioprecipitation)
- Biomining modalities (heap leaching, tank biooxidation, in-situ, bioseparations, bioremediation)
- Evaluation checklist for bio-solutions

### Shared Resources

#### Core Glossary (`glossary.jsx`)
- Searchable glossary of mining and biology terms
- Each term includes definitions, examples, and "For Biologists/For Miners" explanations
- Filterable by category (mining vs biology terms)

#### Complex Materials Guide (`complex-materials.jsx`)
Interactive guide to materials where biology helps most:
- Acid Rock Drainage (ARD) / Acid Mine Drainage (AMD)
- Bulk Waste Rock & Refractory Ores
- Tailings
- Electronic Waste (E-waste)
- Other Secondary Resources (slag, fly ash, etc.)

Each material includes:
- Definition and hazards
- Biological opportunities
- Why biology works
- Technology maturity level

#### Example Flowsheets (`flowsheets.jsx`)
Real-world integration examples:
- Copper Heap Leach Operation
- Refractory Gold with Tank Biooxidation
- Tailings Reprocessing for Critical Metals
- AMD Treatment & Metal Recovery

Each flowsheet shows:
- Process diagram
- Biological integration points
- Control parameters
- Reality check / practical considerations

#### Research Frontiers (`research.jsx`)
Open problems and collaboration opportunities:

**Technical Frontiers:**
- Metal-biology interactions in complex matrices
- Realistic feedstocks and benchmarks
- Ecology, evolution, and field persistence
- Instrumentation, sensing, and modeling

**Ecosystem & Infrastructure:**
- Shared materials and testbeds (Orebank, Superbank)
- Data, models, and governance
- Funding, IP, and translation pathways
- Language, branding, and talent development

## Technology Stack

- React.js for interactive components
- Tailwind CSS for styling
- Lucide React for icons

## Design Principles

1. **Dual Audience**: Content structured to serve both biologists and mining professionals
2. **Technically Accurate**: Based on peer-reviewed literature and industry practice
3. **Practically Oriented**: Focus on real-world applications and constraints
4. **Visual & Interactive**: Expandable sections, flowsheet diagrams, searchable content
5. **Cross-Referenced**: Clear navigation between related concepts

## Key Features

- **Interactive Learning Paths**: Users choose their background and get tailored content
- **Expandable Sections**: Reduce overwhelm by allowing users to explore at their own pace
- **Search & Filter**: Glossary is searchable and filterable
- **Visual Flowsheets**: ASCII diagrams show where biology integrates into real operations
- **Color-Coded Categories**: Consistent visual language (mining = amber, biology = emerald, etc.)

## Content Source

Based on the comprehensive "Biomining Wiki - Cross-walk for Biologists and Miners" document, which synthesizes:
- Workshop insights from biomining conferences
- Peer-reviewed literature (2020-2025)
- Commercial bioprocessing operations (BIOX®, heap leach, SRB systems)
- Emerging research in bioseparations and REE recovery

## Future Enhancements

- Add reading list with categorized references
- Include case studies from actual operations
- Add interactive quizzes/assessments
- Develop techno-economic analysis (TEA) templates
- Create downloadable checklists and worksheets
- Add video content and webinars
- Build community contribution system

## Running the Site

```bash
npm install
npm start
```

The site will run on `http://localhost:3000`

## Contributing

This wiki is meant to be a living resource. Contributions welcome for:
- New case studies
- Updated references
- Additional flowsheet examples
- Glossary term additions
- Improved visualizations

## License

Educational resource - check with maintainers for usage terms.
