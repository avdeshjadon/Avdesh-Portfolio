/* Portfolio by Avdesh Jadon — Full Stack Developer & Software Tester. */


export type Study = {
  role: string;
  timeline: string;
  context: string;
  problem: string;
  process: { title: string; body: string }[];
  decisions: { title: string; why: string }[];
  outcomes: string[];
  reflection: string;
  note?: string;
};

export type Cover = {
  bg: string; 
  ink: "light" | "dark";
  src?: string; 
  aspect?: number; 
  variant?: "brand" | "photo";

  focus?: string;
  mark?: string; 
};

export type Project = {
  slug: string;
  title: string;
  tags: string[];
  year: string;
  oneLiner: string;

  contribution: string;
  coverLabel: string; 
  cover?: Cover;

  site?: { url: string; label: string };

  repo?: string;
  award?: string;
  study: Study;
};

export const PROJECTS: Project[] = [

  {
    slug: "heeding-marketplace",
    title: "Heeding — Sustainable-Fuel Marketplace",
    tags: ["React", "Next.js", "Climate-Tech"],
    year: "2026",
    oneLiner:
      "Building the B2B sustainable-fuel marketplace for Europe's energy transition — React/Next.js frontend, Node.js APIs and automated compliance flows that make heavy regulation invisible.",
    contribution:
      "Full-stack build — three buyer journeys, one governed component system, tested all the way through.",
    coverLabel: "HEEDING MARKETPLACE",

    cover: { bg: "#E9F2FC", ink: "dark", src: "/images/companies/heeding.png", aspect: 1199 / 330 },
    site: { url: "https://www.myheeding.com/en", label: "myheeding.com" },
    study: {
      role: "Full Stack Developer (Next.js / Node.js)",
      timeline: "May – Oct 2026 · ongoing",
      context:
        "Heeding is an AI-powered platform connecting fuel buyers, producers and feedstock suppliers — smart offer matching, batch-level traceability with verifiable Proof of Sustainability, automated compliance and Well-to-Wheel CO₂ reporting, across six sectors and three purchase modes.",
      problem:
        "Buying compliant sustainable fuel means weeks of paperwork across FuelEU, ReFuelEU, RED III and TIRUERT — for three buyer types with completely different journeys. The engineering problem: make compliance invisible.",
      process: [
        {
          title: "Map each buyer's workflow",
          body: "Stakeholder interviews and segmentation workshops with fleet operators, fuel suppliers and public-sector buyers; each got its own decision-journey map instead of one averaged persona.",
        },
        {
          title: "Features with a KPI attached",
          body: "Every flow entered the backlog with a stated conversion intent — what the user should decide here, and how we'd measure it.",
        },
        {
          title: "Engineering inside a governed system",
          body: "Shared React components and typed models co-owned with the Product Owner, so velocity never cost consistency.",
        },
        {
          title: "Measure, then iterate",
          body: "GA4-instrumented acquisition → activation → retention funnels reviewed weekly; insights fed straight back into the backlog.",
        },
      ],
      decisions: [
        {
          title: "Compliance is generated, never asked for",
          why: "Users don't fill regulatory forms — the platform produces FuelEU/RED III/TIRUERT paperwork as a receipt of a normal purchase. The scariest part of the domain became a non-event.",
        },
        {
          title: "Three purchase modes, one mental model",
          why: "Spot, Recurring and Tender share the same compare-decide-track skeleton, so learning one lane teaches all three.",
        },
        {
          title: "A two-minute ramp before any commitment",
          why: "The Flash Diagnostic gives a savings-and-emissions estimate with no signup — value before identity, the B2B trust sequence in miniature.",
        },
      ],
      outcomes: [
        "Platform proof points: 80% time saved on fuel management · 100% traceability (product metrics)",
        "End-to-end flows shipped for all three buyer segments",
        "The product targets 1B+ tonnes of avoided CO₂ by 2050",
      ],
      reflection:
        "Deep domain complexity is a gift to a builder: when regulation is the competitor's friction, clarity itself becomes the product.",
      note: "Selected visuals only — client work; full flows available in a portfolio review call.",
    },
  },

  {
    slug: "lockai",
    title: "LockAI — Offline On-Device AI Assistant",
    tags: ["TypeScript", "React", "On-device AI"],
    year: "2026",
    oneLiner:
      "Built an offline, privacy-first AI assistant end to end in one sprint — three working prototypes, an on-device inference workflow and a demo-first pitch that won the hackathon.",
    contribution:
      "On-device AI workflow and three working prototypes — a pitch the jury could click.",
    coverLabel: "LOCKAI",

    cover: { bg: "#F0EBFD", ink: "dark", src: "/images/companies/unbias.png", aspect: 685 / 226 },
    award: "🏆 1st Place",
    study: {
      role: "Full Stack Engineer — AI",
      timeline: "March 2026 · intensive sprint",
      context:
        "UNBIAS Innovation Hackathon, ALPHA cohort. One sprint to build and defend an AI venture end to end — concept, architecture, product, pitch.",
      problem:
        "People want AI help with their most sensitive information — exactly the information they'd never send to a cloud. How do you build an assistant whose privacy is *felt*, not just claimed?",
      process: [
        {
          title: "Build before pitch",
          body: "On-device inference workflow, monetisation logic and a three-year financial framework first — so every technical decision had a commercial reason to exist.",
        },
        {
          title: "An interaction model for trust",
          body: "Offline-first, on-device inference where the local state is always visible: what stays on the device is the product's loudest message.",
        },
        {
          title: "Three prototypes, one story",
          body: "Concept site, AI-workflow demo and commercial implementation — built live, so the jury clicked instead of imagining.",
        },
      ],
      decisions: [
        {
          title: "Zero-cloud as a visible state, not a footnote",
          why: "Privacy claims are wallpaper; a persistent on-device indicator makes the promise inspectable at all times.",
        },
        {
          title: "Demo-first pitch",
          why: "Walking the jury through architecture, user flow and unit economics live on screen turned a claim into evidence.",
        },
      ],
      outcomes: [
        "🏆 1st place — Sophia Antipolis Innovation Hackathon",
        "Three functional prototype websites shipped inside the sprint",
      ],
      reflection:
        "Constraints are a forcing function: with days instead of months, only decisions that serve the story survive.",
    },
  },

  {
    slug: "price-intelligence",
    title: "Supply-Chain Price Intelligence",
    tags: ["Power BI", "REST APIs", "Data Engineering"],
    year: "2025",
    oneLiner:
      "Turning complex data into decisions — a price-intelligence dashboard non-technical planners actually use, fed by REST APIs.",
    contribution:
      "Data pipeline + KPI hierarchy and comparison-first views — pricing data into decisions.",
    coverLabel: "PRICE INTELLIGENCE",
    cover: { bg: "#0E1F38", ink: "light", mark: "KPI" },
    study: {
      role: "Data Engineer & BI Developer",
      timeline: "2025 · portfolio project",
      context:
        "A real-time analytics dashboard tracking and comparing product prices across countries to support logistics planning and pricing strategy — built in Power BI over REST APIs.",
      problem:
        "The data existed; the decisions didn't. Multi-country price comparison lived in spreadsheets only an analyst could love — the engineering problem was making market intelligence legible to non-technical planners.",
      process: [
        {
          title: "KPI hierarchy before visuals",
          body: "Decided what a planner must know in 5 seconds, 30 seconds and 5 minutes — the dashboard's three altitudes — before choosing a single chart.",
        },
        {
          title: "Progressive filtering",
          body: "Multi-dimensional filters that narrow from region to product without ever losing the comparison context.",
        },
        {
          title: "Encodings for scanning, not studying",
          body: "Comparisons as aligned bars and deltas, never pie charts; anomalies pre-surfaced instead of hunted for.",
        },
      ],
      decisions: [
        {
          title: "Tiles before tables",
          why: "The 5-second answer lives in KPI tiles; the evidence lives underneath. Most sessions never need the table — and that's the success case.",
        },
        {
          title: "Comparison is the default view",
          why: "No one opens a price tool to see one price. The first screen answers 'where is it cheaper, and by how much?'",
        },
      ],
      outcomes: [
        "A multi-source pricing mess became decisions at a glance",
        "Interactive visualisations usable by people who will never write a query",
      ],
      reflection:
        "Dashboarding is honesty engineering: every tile either helps a decision or hides one.",
    },
  },

  {
    slug: "oigetit-hitl",
    title: "Oigetit — Validating AI Trust",
    tags: ["Responsible AI", "QA", "Validation"],
    year: "2025",
    oneLiner:
      "Making an AI misinformation filter explainable — trust validated at the model's boundaries.",
    contribution:
      "Edge cases validated, verdicts rewritten in human language.",
    coverLabel: "AI TRUST · QA",
    cover: { bg: "#EAF0F8", ink: "dark", src: "/images/companies/oigetit.jpg", aspect: 1 },
    study: {
      role: "Human-in-the-Loop AI Analyst",
      timeline: "Jan – May 2025 · remote (Los Gatos, USA)",
      context:
        "Oigetit filters fake news with an AI scoring engine. I sat in the loop — validating predictions, hunting edge cases, and explaining the machine to the humans it serves.",
      problem:
        "An accurate model nobody understands is an untrusted model. The work was double-sided: make the AI more right, and make its rightness legible.",
      process: [
        {
          title: "Validate at the edges",
          body: "Systematic pattern recognition across misclassifications — sarcasm, partial truths, source laundering — fed back to strengthen the pipeline.",
        },
        {
          title: "Translate the engine",
          body: "Rewrote how the verification engine explains itself: simplified, user-facing language for why an article scores the way it does.",
        },
      ],
      decisions: [
        {
          title: "Explanations in the reader's language",
          why: "'Confidence: 0.82' persuades no one; 'multiple independent sources confirm the core claim' does.",
        },
      ],
      outcomes: [
        "Improved AI classification accuracy through recurring-pattern identification",
        "Contributed to Responsible AI / Trustworthy AI initiatives",
      ],
      reflection:
        "AI products are trust products. The interface between a model and a person is exactly as strong as its explanation.",
    },
  },

  {
    slug: "seo-growth",
    title: "Portfolio-Wide Web Performance",
    tags: ["CRO", "Analytics", "Web"],
    year: "2025",
    oneLiner:
      "35% organic growth across a client portfolio — decisions driven by measurement.",
    contribution:
      "Template-level fixes across a client portfolio — one fix, hundreds of pages.",
    coverLabel: "GROWTH & CRO",
    cover: { bg: "#FF6A00", ink: "light", mark: "+35%" },
    study: {
      role: "SEO & Web Performance",
      timeline: "Jan – Apr 2025 · Site Web & Co, Montpellier",
      context:
        "A digital agency's portfolio of B2B and B2C client sites, audited and optimised with Google Analytics, Search Console and keyword research.",
      problem:
        "Beautiful sites nobody found, templates that leaked traffic — the gap between how pages looked and how they performed was invisible to their owners.",
      process: [
        {
          title: "Audit what actually ranks",
          body: "Web-performance and SEO audits across the portfolio; the highest-traffic templates got their meta architecture and internal-linking logic rebuilt first.",
        },
        {
          title: "Fix at the template level",
          body: "One template fix propagates to hundreds of pages — leverage beats page-by-page perfectionism.",
        },
        {
          title: "Report so clients act",
          body: "Monthly dashboards translated analytics into next actions, not charts.",
        },
      ],
      decisions: [
        {
          title: "Technical SEO before content SEO",
          why: "Content can't rescue a template that search engines struggle to parse; foundations first.",
        },
      ],
      outcomes: ["35% organic-traffic growth across the managed portfolio"],
      reflection:
        "Growth work taught me the habit I bring to every build: ship, measure, and let the numbers argue.",
    },
  },

  {
    slug: "avengers-doomsday",
    title: "Avengers: Doomsday — Scroll-Driven Cinema",
    tags: ["Three.js", "GSAP", "Creative Dev"],
    year: "2026",
    oneLiner:
      "A Marvel-inspired cinematic web experience where scroll conducts everything — video, 3D and story across six choreographed sections.",
    contribution:
      "Six scroll-choreographed scenes, a 3D Doom, frame-exact video scrubbing.",
    coverLabel: "AVENGERS: DOOMSDAY",
    cover: {
      bg: "#0B0B0E",
      ink: "light",
      src: "/images/projects/avengers-cover.jpg",
      variant: "photo",
      focus: "center 26%", 
    },
    repo: "https://github.com/avdeshjadon/AVENGERS-DOOMSDAY-",
    study: {
      role: "Full Stack & Engineering — solo",
      timeline: "July 2026",
      context:
        "A scroll-driven cinematic experience inspired by Marvel Studios trailers: six choreographed sections, from a lightning-storm opening to an MCU-timeline finale, built as an educational fan concept.",
      problem:
        "Trailer energy on the web usually means autoplay video and hope. The experiment: can scroll position alone conduct the entire film — every video frame, 3D move and story panel — with no traditional navigation at all?",
      process: [
        {
          title: "Scroll as the timeline",
          body: "Frame-by-frame video scrubbing synced to scroll position, with all-intra encoding so frame-seeking is instant in both directions.",
        },
        {
          title: "A procedural centrepiece",
          body: "A 3D Doctor Doom built in React Three Fiber, character cards orbiting the model, and a custom GLSL atmosphere — particles, volumetric fog, lightning.",
        },
        {
          title: "Performance as a feature",
          body: "A zero-re-render signal architecture keeps React out of the frame loop; scroll drives shader uniforms directly.",
        },
      ],
      decisions: [
        {
          title: "No play buttons, anywhere",
          why: "The visitor's scroll is the playhead — committing to one input makes the experience instantly legible.",
        },
      ],
      outcomes: ["24 stars and 7 forks on GitHub", "Six cinematic sections, fully scroll-conducted"],
      reflection:
        "Constraint experiments like this are my interaction gym — product work is where that discipline gets spent.",
      note: "Unofficial fan-made concept — not affiliated with Marvel.",
    },
  },

  {
    slug: "got-cinematic",
    title: "Game of Thrones — A Cinematic Experience",
    tags: ["Video Scrubbing", "GSAP", "Vite"],
    year: "2026",
    oneLiner:
      "A scroll-scrubbed cinematic tribute that found its audience — 20.5K likes, 3,597 comments and 7,035 shares on one reel.",
    contribution:
      "Frame-perfect scroll cinema — 20.5K likes and 7K shares on one reel.",
    coverLabel: "GAME OF THRONES",
    cover: {
      bg: "#0B0B0E",
      ink: "light",
      src: "/images/projects/got-cover.jpg",
      variant: "photo",
      focus: "center 34%", 
    },
    repo: "https://github.com/avdeshjadon/GoT",
    study: {
      role: "Full Stack & Engineering — solo",
      timeline: "July 2026",
      context:
        "A scroll-driven cinematic website: a prologue flowing into a parallax hero, chapter videos for Jon Snow and Daenerys, and an atmosphere of particles, fog and dragons.",
      problem:
        "Video on the web is passive. The goal: cinema you drive — frame-perfect scrubbing forward and backward, at the speed of the reader's own attention.",
      process: [
        {
          title: "A canvas scrubbing engine",
          body: "Chapter videos decode to canvas with ffmpeg-optimised assets, so any scroll speed lands on a clean frame.",
        },
        {
          title: "Performance tiers",
          body: "Device-capability detection serves lighter atmosphere to weaker hardware; reduced-motion gets a calm path.",
        },
      ],
      decisions: [
        {
          title: "Atmosphere layered, never baked in",
          why: "Fog, embers and dragons live as separate layers above the film — the scene stays sharp at every viewport.",
        },
      ],
      outcomes: [
        "20.5K likes · 3,597 comments · 7,035 shares on the launch reel",
        "4 stars on GitHub",
      ],
      reflection:
        "The reel taught me more about hooks and pacing than any dashboard — an audience is the honest reviewer.",
      note: "Unofficial fan-made concept — not affiliated with the rights-holders.",
    },
  },

  {
    slug: "baahubali",
    title: "Baahubali — A Legend Never Dies",
    tags: ["Next.js", "Web Audio", "GSAP"],
    year: "2026",
    oneLiner:
      "Four chapters of scroll-driven cinema with procedural light and synthesised sound — 56K views on the launch reel.",
    contribution:
      "Four chapters where scroll drives the emotion — 56K views in one reel.",
    coverLabel: "BAAHUBALI",
    cover: { bg: "#0B0B0E", ink: "light", src: "/images/projects/bahubali-cover.jpg", variant: "photo" },
    repo: "https://github.com/avdeshjadon/Bahubali",
    study: {
      role: "Full Stack & Engineering — solo",
      timeline: "July 2026",
      context:
        "An interactive tribute to Baahubali in four chapters — The Hero, The Duel, The Prophecy, The Finale — each a scroll-conducted scene with its own visual weather.",
      problem:
        "The brief I set myself: the scroll should control the emotion, not just the animation — pace, light and sound all riding a single gesture.",
      process: [
        {
          title: "The frame under the visitor's hand",
          body: "Frame-by-frame control of the video sequences, so the scene advances exactly at the visitor's pace.",
        },
        {
          title: "Effects made, not filmed",
          body: "Lightning, volumetric light, fog and embers generated procedurally on GPU-accelerated canvas, layered over the film.",
        },
        {
          title: "A synthesised soundscape",
          body: "The ambience comes from the Web Audio API — no audio files shipped; the sound is computed live.",
        },
      ],
      decisions: [
        {
          title: "A 100% static export",
          why: "The whole film ships as a client-rendered static site — zero infrastructure to maintain for a portfolio piece.",
        },
      ],
      outcomes: ["56K views on the launch reel", "3 stars and 2 forks on GitHub"],
      reflection:
        "Emotion is buildable: when pace, light and sound follow the visitor's hand, the screen stops feeling like a screen.",
      note: "Unofficial fan tribute — not affiliated with the rights-holders.",
    },
  },

  {
    slug: "ghost-rider",
    title: "Ghost Rider — Spirit of Vengeance",
    tags: ["WebGL", "GLSL", "Creative Dev"],
    year: "2026",
    oneLiner:
      "A supernatural film you can touch — six chapters of scroll-directed cinema with procedural hellfire rendered in WebGL.",
    contribution:
      "Six chapters, procedural hellfire shaders, a chase you scroll through.",
    coverLabel: "GHOST RIDER",
    cover: {
      bg: "#0B0B0E",
      ink: "light",
      src: "/images/projects/ghostrider-cover.jpg",
      variant: "photo",
      focus: "center 30%", 
    },
    repo: "https://github.com/avdeshjadon/Ghost-Rider-",
    site: { url: "https://ghost-rider-orpin.vercel.app", label: "Live site" },
    study: {
      role: "Full Stack & Engineering — solo",
      timeline: "August 2026",
      context:
        "A six-chapter cinematic experience: The Awakening with procedural hellfire, a scroll-directed 16-second chase, a 3D bike showcase, and an interactive cinematic wall with infinite column motion.",
      problem:
        "A trailer is watched. This one had to be driven — the visitor holding the film's pace, chapter by chapter.",
      process: [
        {
          title: "Fire written in shaders",
          body: "The hellfire and atmosphere come from procedural noise shaders in GLSL — nothing pre-rendered, everything reactive.",
        },
        {
          title: "Encoding built for scrubbing",
          body: "All-intra H.264 video so frame-seeking is instant, orchestrated by GSAP timelines.",
        },
      ],
      decisions: [
        {
          title: "Chapters, not sections",
          why: "Naming the blocks 'Chapter I, II, III' imposes a narrative grammar — the visitor reads a film, not a page.",
        },
      ],
      outcomes: ["Deployed and live on Vercel", "Six chapters, from hero to archive wall"],
      reflection:
        "WebGL isn't an effect, it's a material. When light is computed, the scene breathes with the visitor.",
      note: "Unofficial fan-made concept — not affiliated with the rights-holders.",
    },
  },

  {
    slug: "habu",
    title: "HABU — Deep-Ocean Exosuit",
    tags: ["Next.js", "GSAP", "3D & Motion"],
    year: "2026",
    oneLiner:
      "A product launch page for a deep-ocean exosuit — a AAA game intro crossed with Apple product storytelling.",
    contribution:
      "Product storytelling in one scroll — inspection rig, specs, scene stack.",
    coverLabel: "HABU EXOSUIT",
    cover: {
      bg: "#06131C",
      ink: "light",
      src: "/images/projects/habu-cover.jpg",
      variant: "photo",
      focus: "center 45%", 
    },
    repo: "https://github.com/avdeshjadon/HABU-",
    study: {
      role: "Full Stack & Engineering — solo",
      timeline: "July 2026",
      context:
        "A cinematic single-scroll landing page for a fictional deep-ocean exosuit — fully video-driven, with an interactive product-inspection section.",
      problem:
        "Product pages list features. This one had to make you feel the object before explaining it — the spec sheet arrives after the emotion.",
      process: [
        {
          title: "A scene-stack architecture",
          body: "Sticky scenes stack into film, so phase transitions flow instead of cutting.",
        },
        {
          title: "Inspection as the product moment",
          body: "A camera rig and spec panels let the visitor move around the object at their own pace.",
        },
        {
          title: "Scroll-driven playback, damped",
          body: "Inertial lerping on the scrubbing so video follows the hand without jitter.",
        },
      ],
      decisions: [
        {
          title: "Accessible hotspots",
          why: "Interface hotspots stay keyboard-reachable and respect reduced motion — spectacle that excludes nobody.",
        },
      ],
      outcomes: ["Seven of eight planned sections complete", "A functional footer with working hotspots"],
      reflection:
        "Product storytelling is sequencing: show it, let it land, and only then explain it.",
    },
  },

  {
    slug: "vistarail",
    title: "VistaRail — Night-Train Travel, Imagined",
    tags: ["Brand Concept", "Next.js", "Framer Motion"],
    year: "2026",
    oneLiner:
      "A luxury scenic-rail brand conceived end to end — a cinematic video hero, glassmorphism UI and motion that sells a feeling, not a ticket.",
    contribution:
      "A luxury rail brand imagined end to end — video hero, glass UI, parallax.",
    coverLabel: "VISTARAIL",
    cover: { bg: "#0B0B0E", ink: "light", src: "/images/projects/vistarail-cover.jpg", variant: "photo" },
    repo: "https://github.com/avdeshjadon/vistaRail",
    study: {
      role: "Full Stack & Engineering — solo",
      timeline: "July 2026",
      context:
        "A concept brand for luxury night-rail travel — “discover the beauty that awakens after sunset” — designed and built as a complete landing experience.",
      problem:
        "Travel sites sell tickets; this one had to sell a feeling. Every element — the video, the glass, the motion — works for atmosphere first.",
      process: [
        {
          title: "The video untouched at the centre",
          body: "The hero video renders full-bleed with no cropping or re-encoding — the centrepiece stays exactly as it was created.",
        },
        {
          title: "A glass interface system",
          body: "Reusable glassmorphism components on Tailwind, with pointer and device-orientation parallax.",
        },
        {
          title: "Timing centralised",
          body: "Every animation duration and easing lives in one configuration — a single place to tune the feel.",
        },
      ],
      decisions: [
        {
          title: "Accessibility from the start",
          why: "Reduced-motion respected and keyboard navigation kept first-class — atmosphere is never a barrier.",
        },
      ],
      outcomes: ["4 stars and 2 forks on GitHub", "A day/night system planned into the architecture"],
      reflection:
        "Branding is motion engineering in slow motion: how a brand feels is the timing of how it moves.",
    },
  },

  {
    slug: "reverie",
    title: "Rêverie — A Waking Dream",
    tags: ["Creative Engineering", "Next.js", "Framer Motion"],
    year: "2026",
    oneLiner:
      "An original cinematic concept — light, stillness and editorial motion — conceived, built and live on the web.",
    contribution:
      "An original dream, shipped — cinematic scroll, glass, live on the web.",
    coverLabel: "RÊVERIE",
    cover: { bg: "#0B0B0E", ink: "light", src: "/images/projects/reverie-cover.jpg", variant: "photo" },
    site: { url: "https://musical-tanuki-680d11.netlify.app", label: "Live site" },
    repo: "https://github.com/avdeshjadon/R-VERIE-A-Waking-Dream",
    study: {
      role: "Creative Engineering — solo",
      timeline: "July 2026",
      context:
        "“Where the ordinary turns golden” — an original single-page reverie through light and stillness: hero, editorial, story, gallery, call.",
      problem:
        "No franchise, no brief — can pure concept hold a scroll for an entire page?",
      process: [
        {
          title: "The film under the glass",
          body: "Fullscreen video backgrounds under glass veils — the film's light passes through every component.",
        },
        {
          title: "Editorial typography",
          body: "Self-hosted Cormorant Garamond and Inter — the serif voice of the dream, the upright voice of the real.",
        },
        {
          title: "Motion at breathing pace",
          body: "Reveals and parallax on Lenis + Framer Motion, tuned slow — calm is the signature.",
        },
      ],
      decisions: [
        {
          title: "Static and light",
          why: "A fully static export at ~155 kB first-load JS — a dream needs no server.",
        },
      ],
      outcomes: ["Deployed and live on Netlify", "The one fully original concept in the series — no licence to lean on"],
      reflection:
        "With no IP to borrow gravity from, every decision stands naked — this is the piece that looks most like me.",
    },
  },

  {
    slug: "workflow-automation",
    title: "Supply Chain & Sales Marketing Automation System",
    tags: ["Automation", "Systems", "n8n"],
    year: "2025",
    oneLiner:
      "Automating the invisible product — end-to-end workflows that removed manual effort across the whole funnel.",
    contribution:
      "The human process mapped, the robot work automated away — and inspectable.",
    coverLabel: "AUTOMATION SYSTEM",
    cover: { bg: "#101a12", ink: "light", mark: "FLOW" },
    study: {
      role: "Automation & Systems Engineer",
      timeline: "2025 · portfolio project",
      context:
        "End-to-end automation across sales, marketing and operations — lead-generation pipelines, CRM updates, reporting dashboards and content-distribution flows, built on n8n, Zapier and REST integrations.",
      problem:
        "A funnel full of competent people doing robot work: copying leads, updating fields, assembling the same weekly report. The problem was a systems one — where does human judgment actually add value, and what should disappear?",
      process: [
        {
          title: "Map the human process first",
          body: "Before any automation, the existing workflow was mapped end to end — every handoff, wait state and copy-paste surfaced as a candidate.",
        },
        {
          title: "Automate handoffs, keep judgment",
          body: "Flows were drawn around decision points: machines move information between decisions; people make them.",
        },
        {
          title: "Engineer the failure states",
          body: "Every flow got an observable state and a failure path a non-technical owner could understand — automation you can't inspect is automation you can't trust.",
        },
      ],
      decisions: [
        {
          title: "Invisible until it breaks — then loud",
          why: "Success is silence; failures alert with context. The inverse (noisy success, silent failure) is how automations die.",
        },
        {
          title: "Flows documented as diagrams, not code",
          why: "The system outlives its author only if the next person can read it.",
        },
      ],
      outcomes: [
        "Materially reduced manual effort across the funnel",
        "Automated lead-gen, CRM hygiene, reporting and distribution running unattended",
      ],
      reflection:
        "The best interface for repetitive work is no interface — but engineering 'nothing' well takes the same rigor as building screens.",
    },
  },

  {
    slug: "spider-man",
    title: "Spider-Man — The Power Behind the Mask",
    tags: ["Cinematic Web", "Concept", "Visual"],
    year: "2026",
    oneLiner:
      "A cinematic fan experience about the person under the suit — built to see how far restraint carries an action property.",
    contribution:
      "Concept and cinematic build — the quiet frame, not the fight.",
    coverLabel: "SPIDER-MAN",
    cover: { bg: "#0B0B0E", ink: "light", src: "/images/projects/spiderman-cover.jpg", variant: "photo" },
    study: {
      role: "Creative Engineering — solo",
      timeline: "June 2026",
      context:
        "A cinematic fan experience built around a single idea — “the power behind the mask”: the torn mask, the face underneath, the person before the hero.",
      problem:
        "Action properties sell through movement. The inverse exercise: can one held, well-framed still carry further than a fight sequence?",
      process: [
        {
          title: "One frame, held",
          body: "The central shot — eyes to camera, mask torn — stays still; the whole composition works around it rather than over it.",
        },
        {
          title: "Typography that whispers",
          body: "Thin, widely-tracked titling set low in the frame: the text accompanies the image instead of competing with it.",
        },
      ],
      decisions: [
        {
          title: "Restraint as the position",
          why: "On a property built from spectacle, quiet is the most noticeable choice — and the hardest to hold.",
        },
      ],
      outcomes: [
        "A visual piece that holds on a single directorial idea",
        "The restraint exercise that fed the cinematic projects after it",
      ],
      reflection:
        "Knowing what to remove is a creative skill — this project is only about that.",
      note: "Unofficial fan-made concept — not affiliated with the rights-holders. Visual piece: no public repository.",
    },
  },
];
