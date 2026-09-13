/* Featured projects — single source of truth for the Work section
   and the /work/[slug] case-study routes. Order = showcase order,
   fixed by Avdesh (2026-08-08): Heeding · LockAI · five GitHub
   builds · the automation system.

   ⚠ SOURCING: panels 3–7 come from github.com/avdeshjadon ONLY —
   real repo names, README facts and his uploaded captures. Reel numbers
   (56K views, 20.5K likes) are verified in PROJECT_DATABASE.md. Live-demo
   links were reachability-checked before shipping; the two Vercel demos
   currently return 402 (paused), so those cards link to their repos. */

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

/* French mirror of Study. Every field optional: anything left out falls back
   to the English original, so a half-translated entry still renders. */
export type StudyFr = Partial<Study>;

/* Card / case-page cover.
   ⚠ Only VERIFIED assets go in `src` — official brand marks, or Avdesh's
   own project captures. `variant: "photo"` renders full-bleed; "brand"
   (default) centres the mark on its ground. Projects with no asset get a
   designed typographic cover (`mark`), never a stock image. */
export type Cover = {
  bg: string; /* brand ground (also the letterbox behind photos) */
  ink: "light" | "dark";
  src?: string; /* verified asset */
  aspect?: number; /* true aspect ratio of a brand mark */
  variant?: "brand" | "photo";
  /* object-position for photo covers. The supplied artwork is portrait and
     the card frame is landscape, so this keeps the subject in frame — the
     image is only ever cropped, never scaled non-uniformly. */
  focus?: string;
  mark?: string; /* typographic cover when no asset exists */
};

export type Project = {
  slug: string;
  title: string;
  tags: string[];
  year: string;
  oneLiner: string;
  /* the card's one-line "what I did" — portfolio copy, not a resume bullet */
  contribution: string;
  coverLabel: string; /* alt/aria text for the cover */
  cover?: Cover;
  /* verified official destination — never guessed (CONTENT_AUDIT rule) */
  site?: { url: string; label: string };
  /* verified GitHub repository */
  repo?: string;
  award?: string;
  study: Study;
  /* French copy — card fields plus the full case study (see lib/i18n.tsx -> L()).
     Company, product and tool names are deliberately left untranslated. */
  fr?: {
    title?: string;
    oneLiner?: string;
    contribution?: string;
    tags?: string[];
    study?: StudyFr;
  };
};

export const PROJECTS: Project[] = [
  /* ─────────────── 1 · HEEDING (kept) ─────────────── */
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
    /* official Heeding lockup (supplied file) on a light brand ground */
    cover: { bg: "#E9F2FC", ink: "dark", src: "/images/companies/heeding.png", aspect: 1199 / 330 },
    site: { url: "https://www.myheeding.com/en", label: "myheeding.com" },
    fr: {
      title: "Heeding — Marketplace de carburants durables",
      oneLiner: "Construire la marketplace B2B de carburants durables pour la transition énergétique européenne — frontend React/Next.js, API Node.js et des flux de conformité automatisés qui rendent invisible une réglementation lourde.",
      contribution:
        "Build full stack — trois parcours acheteurs, un système de composants cohérent, testé de bout en bout.",
      tags: ["React", "Next.js", "Climate-Tech"],
      study: {
        role: "Développeur full stack",
        timeline: "Mai – oct. 2026 · en cours",
        context:
          "Heeding est une plateforme propulsée par l’IA qui relie acheteurs de carburant, producteurs et fournisseurs de matières premières — mise en relation intelligente des offres, traçabilité au lot avec Proof of Sustainability vérifiable, conformité automatisée et reporting CO₂ du puits à la roue, sur six secteurs et trois modes d’achat.",
        problem:
          "Acheter du carburant durable conforme, c’est des semaines de paperasse entre FuelEU, ReFuelEU, RED III et TIRUERT — pour trois types d’acheteurs aux parcours totalement différents. Le problème d’ingénierie : rendre la conformité invisible.",
        process: [
          {
            title: "Cartographier le parcours de chaque acheteur",
            body: "Entretiens et ateliers de segmentation avec transporteurs, fournisseurs de carburant et acheteurs publics ; chacun a eu sa propre carte de décision plutôt qu’un persona moyen.",
          },
          {
            title: "Des fonctionnalités avec un KPI attaché",
            body: "Chaque flux entre au backlog avec une intention de conversion explicite — ce que l’utilisateur doit décider ici, et comment on le mesure.",
          },
          {
            title: "De l’ingénierie dans un système gouverné",
            body: "Composants React partagés et modèles typés co-possédés avec le Product Owner, pour que la vélocité ne coûte jamais la cohérence.",
          },
          {
            title: "Mesurer, puis itérer",
            body: "Tunnels acquisition → activation → rétention instrumentés sous GA4 et revus chaque semaine ; les enseignements repartaient directement dans le backlog.",
          },
        ],
        decisions: [
          {
            title: "La conformité se génère, elle ne se demande pas",
            why: "Les utilisateurs ne remplissent pas de formulaires réglementaires — la plateforme produit les documents FuelEU/RED III/TIRUERT comme le reçu d’un achat normal. La partie la plus effrayante du domaine devient un non-événement.",
          },
          {
            title: "Trois modes d’achat, un seul modèle mental",
            why: "Spot, Récurrent et Appel d’offres partagent le même squelette comparer-décider-suivre : apprendre une voie les enseigne toutes les trois.",
          },
          {
            title: "Deux minutes d’essai avant tout engagement",
            why: "Le Diagnostic Flash donne une estimation d’économies et d’émissions sans inscription — la valeur avant l’identité, la séquence de confiance B2B en miniature.",
          },
        ],
        outcomes: [
          "Points de preuve plateforme : 80 % de temps gagné sur la gestion carburant · 100 % de traçabilité (métriques produit)",
          "Des parcours bout en bout livrés pour les trois segments d’acheteurs",
          "Le produit vise plus d’un milliard de tonnes de CO₂ évitées d’ici 2050",
        ],
        reflection:
          "La complexité d’un domaine est un cadeau pour un développeur : quand la réglementation est la friction du concurrent, la clarté devient le produit.",
        note: "Visuels sélectionnés uniquement — travail client ; parcours complets présentés lors d’un échange portfolio.",
      },
    },
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

  /* ─────────────── 2 · LOCKAI / UNBIAS (kept) ─────────────── */
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
    /* official UNBIAS wordmark (supplied file) on a light violet ground */
    cover: { bg: "#F0EBFD", ink: "dark", src: "/images/companies/unbias.png", aspect: 685 / 226 },
    award: "🏆 1st Place",
    fr: {
      title: "LockAI — Assistant IA hors-ligne",
      oneLiner: "Un assistant IA hors-ligne, priorisant la confidentialité, construit de bout en bout en un sprint — trois prototypes fonctionnels, un workflow d’inférence embarqué et un pitch basé sur la démo, lauréat du hackathon.",
      contribution:
        "Workflow IA embarqué et trois prototypes fonctionnels — un pitch que le jury pouvait cliquer.",
      tags: ["TypeScript", "React", "IA embarquée"],
      study: {
        role: "Ingénieur full stack — IA",
        timeline: "Mars 2026 · sprint intensif",
        context:
          "UNBIAS Innovation Hackathon, cohorte ALPHA. Un sprint pour construire et défendre une entreprise IA de bout en bout — concept, architecture, produit, pitch.",
        problem:
          "Les gens veulent l’aide de l’IA sur leurs informations les plus sensibles — exactement celles qu’ils n’enverraient jamais dans le cloud. Comment construire un assistant dont la confidentialité se *ressent*, au lieu de se proclamer ?",
        process: [
          {
            title: "Le build avant le pitch",
            body: "Workflow d’inférence embarqué, logique de monétisation et cadre financier à trois ans d’abord — pour que chaque décision technique ait une raison commerciale d’exister.",
          },
          {
            title: "Un modèle d’interaction pour la confiance",
            body: "Une agentivité offline-first où l’état local est toujours visible : ce qui reste sur l’appareil est le message le plus fort du produit.",
          },
          {
            title: "Trois prototypes, une seule histoire",
            body: "Site concept, démo de workflow IA et implémentation commerciale — construits en direct, pour que le jury clique au lieu d’imaginer.",
          },
        ],
        decisions: [
          {
            title: "Le zéro-cloud comme état visible, pas comme note de bas de page",
            why: "Les promesses de confidentialité sont du papier peint ; un indicateur permanent d’exécution locale rend la promesse inspectable à tout moment.",
          },
          {
            title: "Un pitch qui démontre",
            why: "Dérouler l’architecture, le parcours utilisateur et l’économie unitaire en direct à l’écran a transformé une affirmation en preuve.",
          },
        ],
        outcomes: [
          "🏆 1re place — Sophia Antipolis Innovation Hackathon",
          "Trois sites prototypes fonctionnels livrés pendant le sprint",
        ],
        reflection:
          "La contrainte est un accélérateur : avec des jours au lieu de mois, seules les décisions qui servent l’histoire survivent.",
      },
    },
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

  /* ─────────────── 4 · PRICE INTELLIGENCE ─────────────── */
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
    fr: {
      title: "Intelligence tarifaire de la chaîne logistique",
      oneLiner: "Transformer des données complexes en décisions — un tableau de bord d’intelligence tarifaire que les profils non techniques utilisent vraiment, alimenté par des API REST.",
      contribution:
        "Pipeline de données + hiérarchie de KPI et vues comparatives — la donnée devient décision.",
      tags: ["Power BI", "API REST", "Ingénierie de données"],
      study: {
        role: "Développeur data & analyste BI",
        timeline: "2025 · projet portfolio",
        context:
          "Un tableau de bord analytique en temps réel qui suit et compare les prix produits entre pays pour soutenir la planification logistique et la stratégie tarifaire — construit sous Power BI sur des API REST.",
        problem:
          "La donnée existait ; les décisions non. La comparaison de prix multi-pays vivait dans des tableurs que seul un analyste pouvait aimer — le problème d’ingénierie était de rendre l’intelligence marché lisible pour des planificateurs non techniques.",
        process: [
          {
            title: "La hiérarchie de KPI avant les visuels",
            body: "Définir ce qu’un planificateur doit savoir en 5 secondes, 30 secondes et 5 minutes — les trois altitudes du tableau de bord — avant de choisir le moindre graphique.",
          },
          {
            title: "Filtrage progressif",
            body: "Des filtres multi-dimensionnels qui resserrent de la région au produit sans jamais perdre le contexte de comparaison.",
          },
          {
            title: "Des encodages pour balayer, pas pour étudier",
            body: "Comparaisons en barres alignées et en écarts, jamais en camemberts ; anomalies remontées d’avance plutôt que cherchées.",
          },
        ],
        decisions: [
          {
            title: "Des tuiles avant des tableaux",
            why: "La réponse en 5 secondes vit dans les tuiles de KPI ; la preuve vit en dessous. La plupart des sessions n’ouvrent jamais le tableau — et c’est précisément le cas de succès.",
          },
          {
            title: "La comparaison comme vue par défaut",
            why: "Personne n’ouvre un outil de prix pour voir un seul prix. Le premier écran répond à « où est-ce moins cher, et de combien ? »",
          },
        ],
        outcomes: [
          "Un fouillis tarifaire multi-sources devenu des décisions au premier coup d’œil",
          "Des visualisations interactives utilisables par des gens qui n’écriront jamais une requête",
        ],
        reflection:
          "Le dashboarding est un exercice d’honnêteté : chaque tuile sert une décision ou en cache une.",
      },
    },
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

  /* ─────────────── 5 · OIGETIT ─────────────── */
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
    fr: {
      title: "Oigetit — Valider la confiance en l’IA",
      oneLiner: "Rendre expliquable un filtre anti-désinformation — la confiance validée aux frontières du modèle.",
      contribution:
        "Cas limites validés, verdicts réécrits en langage humain.",
      tags: ["IA responsable", "QA", "Validation"],
      study: {
        role: "Analyste IA avec humain dans la boucle",
        timeline: "Janv. – mai 2025 · à distance (Los Gatos, USA)",
        context:
          "Oigetit filtre les fausses informations avec un moteur de scoring IA. J’étais dans la boucle — validation des prédictions, chasse aux cas limites, et traduction de la machine pour les humains qu’elle sert.",
        problem:
          "Un modèle juste que personne ne comprend est un modèle auquel on ne fait pas confiance. Le travail avait deux faces : rendre l’IA plus juste, et rendre sa justesse lisible.",
        process: [
          {
            title: "Valider aux frontières",
            body: "Reconnaissance systématique de motifs dans les erreurs de classification — ironie, vérités partielles, blanchiment de sources — réinjectée pour renforcer le pipeline.",
          },
          {
            title: "Traduire le moteur",
            body: "Réécriture de la façon dont le moteur de vérification s’explique : un langage simplifié, orienté utilisateur, sur les raisons d’un score.",
          },
        ],
        decisions: [
          {
            title: "Des explications dans la langue du lecteur",
            why: "« Confiance : 0,82 » ne convainc personne ; « plusieurs sources indépendantes confirment l’affirmation centrale », si.",
          },
        ],
        outcomes: [
          "Précision de classification améliorée par l’identification de motifs récurrents",
          "Contribution aux initiatives d’IA responsable et digne de confiance",
        ],
        reflection:
          "Les produits IA sont des produits de confiance. L’interface entre un modèle et une personne vaut exactement ce que vaut son explication.",
      },
    },
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

  /* ─────────────── 6 · WEB PERFORMANCE ─────────────── */
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
    fr: {
      title: "Performance web du portefeuille",
      oneLiner: "+35 % de croissance organique sur un portefeuille client — des décisions guidées par la mesure.",
      contribution:
        "Corrections au niveau des gabarits — une correction, des centaines de pages.",
      tags: ["CRO", "Analytics", "Web"],
      study: {
        role: "SEO & performance web",
        timeline: "Janv. – avr. 2025 · Site Web & Co, Montpellier",
        context:
          "Le portefeuille de sites clients B2B et B2C d’une agence digitale, audité et optimisé avec Google Analytics, Search Console et la recherche de mots-clés.",
        problem:
          "De beaux sites que personne ne trouvait, des gabarits qui perdaient du trafic — l’écart entre l’allure des pages et leur performance était invisible pour leurs propriétaires.",
        process: [
          {
            title: "Auditer ce qui se positionne réellement",
            body: "Audits de performance web et SEO sur tout le portefeuille ; les gabarits les plus fréquentés ont vu leur architecture de métadonnées et leur maillage interne refaits en premier.",
          },
          {
            title: "Corriger au niveau du gabarit",
            body: "Une correction de gabarit se propage à des centaines de pages — l’effet de levier bat le perfectionnisme page par page.",
          },
          {
            title: "Rapporter pour que le client agisse",
            body: "Des tableaux de bord mensuels traduisant l’analytics en prochaines actions, pas en graphiques.",
          },
        ],
        decisions: [
          {
            title: "Le SEO technique avant le SEO éditorial",
            why: "Le contenu ne sauve pas un gabarit que les moteurs peinent à analyser ; les fondations d’abord.",
          },
        ],
        outcomes: ["+35 % de trafic organique sur le portefeuille géré"],
        reflection:
          "Le travail de croissance m’a donné l’habitude que j’apporte à chaque build : livrer, mesurer, et laisser les chiffres argumenter.",
      },
    },
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

  /* ─────────────── 8 · AVENGERS: DOOMSDAY (GitHub) ─────────────── */
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
      focus: "center 26%", /* keeps the mask in frame */
    },
    repo: "https://github.com/avdeshjadon/AVENGERS-DOOMSDAY-",
    fr: {
      title: "Avengers: Doomsday — Cinéma piloté au scroll",
      oneLiner:
        "Une expérience web cinématique inspirée de Marvel où le scroll dirige tout — vidéo, 3D et récit sur six sections chorégraphiées.",
      contribution:
        "Six scènes chorégraphiées au scroll, un Doom 3D, un scrubbing vidéo exact.",
      tags: ["Three.js", "GSAP", "Dév créatif"],
      study: {
        role: "Développement full stack — solo",
        timeline: "Juillet 2026",
        context:
          "Une expérience cinématique pilotée au scroll, inspirée des trailers Marvel Studios : six sections chorégraphiées, de l’orage d’ouverture à une frise MCU finale, construites comme un concept de fan à visée pédagogique.",
        problem:
          "L’énergie d’un trailer sur le web, c’est d’habitude une vidéo en autoplay et de l’espoir. L’expérience : la position de scroll peut-elle diriger tout le film — chaque image, chaque mouvement 3D, chaque panneau — sans aucune navigation classique ?",
        process: [
          {
            title: "Le scroll comme timeline",
            body: "Scrubbing vidéo image par image synchronisé au scroll, avec un encodage all-intra pour que la recherche de frame soit instantanée dans les deux sens.",
          },
          {
            title: "Une pièce maîtresse procédurale",
            body: "Un Doctor Doom 3D en React Three Fiber, des cartes de personnages en orbite autour du modèle, et une atmosphère en GLSL — particules, brouillard volumétrique, éclairs.",
          },
          {
            title: "La performance comme fonctionnalité",
            body: "Une architecture à signaux sans re-render garde React hors de la boucle de rendu ; le scroll pilote directement les uniforms.",
          },
        ],
        decisions: [
          {
            title: "Aucun bouton lecture, nulle part",
            why: "Le scroll du visiteur est la tête de lecture — s’engager sur une seule entrée rend l’expérience lisible instantanément.",
          },
        ],
        outcomes: ["24 étoiles et 7 forks sur GitHub", "Six sections cinématiques, entièrement dirigées au scroll"],
        reflection:
          "Ces expériences sous contrainte sont ma salle d’entraînement à l’interaction — le travail produit est là où cette discipline se dépense.",
        note: "Concept de fan non officiel — sans affiliation avec Marvel.",
      },
    },
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

  /* ─────────────── 4 · GAME OF THRONES (GitHub) ─────────────── */
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
      focus: "center 34%", /* Daenerys and the dragon's eyes */
    },
    repo: "https://github.com/avdeshjadon/GoT",
    fr: {
      title: "Game of Thrones — Une expérience cinématique",
      oneLiner:
        "Un hommage cinématique piloté au scroll qui a trouvé son public — 20,5 K likes, 3 597 commentaires et 7 035 partages sur un reel.",
      contribution:
        "Un cinéma au scroll image par image — 20,5 K likes et 7 K partages.",
      tags: ["Scrubbing vidéo", "GSAP", "Vite"],
      study: {
        role: "Développement full stack — solo",
        timeline: "Juillet 2026",
        context:
          "Un site cinématique piloté au scroll : un prologue qui coule vers un héros en parallaxe, des vidéos de chapitres pour Jon Snow et Daenerys, et une atmosphère de particules, de brume et de dragons.",
        problem:
          "La vidéo sur le web est passive. L’objectif : un cinéma que l’on conduit — un scrubbing image par image, en avant comme en arrière, au rythme de l’attention du lecteur.",
        process: [
          {
            title: "Un moteur de scrubbing sur canvas",
            body: "Les vidéos de chapitres sont décodées vers un canvas, avec des assets optimisés par ffmpeg, pour qu’à toute vitesse de scroll on retombe sur une image nette.",
          },
          {
            title: "Des paliers de performance",
            body: "La détection des capacités de l’appareil sert une atmosphère allégée au matériel modeste ; le mouvement réduit reçoit un chemin calme.",
          },
        ],
        decisions: [
          {
            title: "L’atmosphère en couches, jamais aplatie",
            why: "Brume, braises et dragons vivent en couches séparées au-dessus du film — la scène reste nette à toutes les tailles d’écran.",
          },
        ],
        outcomes: [
          "20,5 K likes · 3 597 commentaires · 7 035 partages sur le reel de lancement",
          "4 étoiles sur GitHub",
        ],
        reflection:
          "Le reel m’a plus appris sur l’accroche et le rythme que n’importe quel tableau de bord — le public est le critique honnête.",
        note: "Concept de fan non officiel — sans affiliation avec les ayants droit.",
      },
    },
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

  /* ─────────────── 5 · BAAHUBALI (GitHub) ─────────────── */
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
    fr: {
      title: "Baahubali — Une légende ne meurt jamais",
      oneLiner:
        "Quatre chapitres de cinéma piloté au scroll, avec lumière procédurale et son synthétisé — 56 K vues sur le reel de lancement.",
      contribution:
        "Quatre chapitres où le scroll porte l’émotion — 56 K vues en un reel.",
      tags: ["Next.js", "Web Audio", "GSAP"],
      study: {
        role: "Développement full stack — solo",
        timeline: "Juillet 2026",
        context:
          "Un hommage interactif à Baahubali en quatre chapitres — The Hero, The Duel, The Prophecy, The Finale — chacun une scène dirigée au scroll, avec sa propre météo visuelle.",
        problem:
          "Le brief que je me suis donné : le scroll doit contrôler l’émotion, pas seulement l’animation — le rythme, la lumière et le son portés par un seul geste.",
        process: [
          {
            title: "L’image sous contrôle du geste",
            body: "Un contrôle image par image des séquences vidéo, pour que la scène avance exactement au rythme du visiteur.",
          },
          {
            title: "Des effets fabriqués, pas filmés",
            body: "Éclairs, lumière volumétrique, brume et braises générés procéduralement sur canvas accéléré GPU, par-dessus le film.",
          },
          {
            title: "Un paysage sonore synthétisé",
            body: "Les ambiances naissent de la Web Audio API — aucune piste audio embarquée, le son est calculé en direct.",
          },
        ],
        decisions: [
          {
            title: "Un export 100 % statique",
            why: "Tout le film tient dans un site statique rendu côté client — aucune infrastructure à entretenir pour une pièce de portfolio.",
          },
        ],
        outcomes: ["56 K vues sur le reel de lancement", "3 étoiles et 2 forks sur GitHub"],
        reflection:
          "L’émotion se conçoit : quand le rythme, la lumière et le son suivent la main du visiteur, l’écran cesse d’être un écran.",
        note: "Hommage de fan non officiel — sans affiliation avec les ayants droit.",
      },
    },
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

  /* ─────────────── 11 · GHOST RIDER (GitHub) ─────────────── */
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
      focus: "center 30%", /* the split face */
    },
    repo: "https://github.com/avdeshjadon/Ghost-Rider-",
    site: { url: "https://ghost-rider-orpin.vercel.app", label: "Live site" },
    fr: {
      title: "Ghost Rider — Spirit of Vengeance",
      oneLiner:
        "Un film surnaturel que l’on touche — six chapitres de cinéma dirigé au scroll, avec un feu infernal procédural en WebGL.",
      contribution:
        "Six chapitres, des shaders de feu procédural, une poursuite au scroll.",
      tags: ["WebGL", "GLSL", "Dév créatif"],
      study: {
        role: "Développement full stack — solo",
        timeline: "Août 2026",
        context:
          "Une expérience cinématique en six chapitres : l’Éveil et son feu procédural, une poursuite de 16 secondes dirigée au scroll, une vitrine de moto en 3D, un mur cinématique interactif à colonnes infinies.",
        problem:
          "Une bande-annonce se regarde. Celle-ci devait se conduire — le visiteur tient le rythme du film, chapitre après chapitre.",
        process: [
          {
            title: "Le feu écrit en shaders",
            body: "Le feu infernal et l’atmosphère naissent de shaders de bruit procédural en GLSL — rien n’est pré-rendu, tout réagit.",
          },
          {
            title: "Un encodage pensé pour le scrub",
            body: "Vidéo H.264 all-intra pour que la recherche d’image soit instantanée, orchestrée par des timelines GSAP.",
          },
        ],
        decisions: [
          {
            title: "Des chapitres, pas des sections",
            why: "Nommer les blocs « Chapitre I, II, III » impose une grammaire narrative — le visiteur lit un film, pas une page.",
          },
        ],
        outcomes: ["Déployé et en ligne sur Vercel", "Six chapitres, du hero au mur d’archives"],
        reflection:
          "Le WebGL n’est pas un effet : c’est une matière. Quand la lumière est calculée, la scène respire avec le visiteur.",
        note: "Concept de fan non officiel — sans affiliation avec les ayants droit.",
      },
    },
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

  /* ─────────────── 12 · HABU (GitHub) ─────────────── */
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
      focus: "center 45%", /* the diver, with the signal above */
    },
    repo: "https://github.com/avdeshjadon/HABU-",
    fr: {
      title: "HABU — Exosquelette des grands fonds",
      oneLiner:
        "Une page de lancement pour un exosquelette sous-marin — une intro de jeu AAA croisée avec le storytelling produit d’Apple.",
      contribution:
        "Du storytelling produit en un scroll — inspection, specs, empilement.",
      tags: ["Next.js", "GSAP", "3D & animation"],
      study: {
        role: "Développement full stack — solo",
        timeline: "Juillet 2026",
        context:
          "Une page d’atterrissage cinématique, en un seul scroll, pour un exosquelette fictif des grands fonds — entièrement pilotée par la vidéo, avec une section d’inspection produit interactive.",
        problem:
          "Les pages produit alignent des caractéristiques. Celle-ci devait faire ressentir l’objet avant de l’expliquer — la fiche technique arrive après l’émotion.",
        process: [
          {
            title: "Une architecture en piles de scènes",
            body: "Des scènes collantes qui s’empilent en film, pour que les transitions de phase coulent au lieu de se succéder.",
          },
          {
            title: "L’inspection comme moment produit",
            body: "Un rig de caméra et des panneaux de spécifications laissent le visiteur tourner autour de l’objet à son rythme.",
          },
          {
            title: "Une lecture vidéo au scroll, amortie",
            body: "Un lissage inertiel sur le scrubbing pour que la vidéo suive la main sans à-coups.",
          },
        ],
        decisions: [
          {
            title: "Des hotspots accessibles",
            why: "Les points chauds de l’interface restent atteignables au clavier et respectent le mouvement réduit — le spectacle n’exclut personne.",
          },
        ],
        outcomes: ["Sept des huit sections prévues terminées", "Un pied de page fonctionnel avec hotspots interactifs"],
        reflection:
          "Le storytelling produit, c’est du séquencement : montrer, laisser ressentir, puis seulement expliquer.",
      },
    },
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

  /* ─────────────── 13 · VISTARAIL (GitHub) ─────────────── */
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
    fr: {
      title: "VistaRail — Le train de nuit, imaginé",
      oneLiner:
        "Une marque de rail panoramique de luxe conçue de bout en bout — héros vidéo cinématique, interface de verre et un mouvement qui vend une sensation, pas un billet.",
      contribution:
        "Une marque ferroviaire de luxe imaginée de bout en bout — verre et parallaxe.",
      tags: ["Concept de marque", "Next.js", "Framer Motion"],
      study: {
        role: "Développement full stack — solo",
        timeline: "Juillet 2026",
        context:
          "Une marque conceptuelle de voyage ferroviaire nocturne — « découvrir la beauté qui s’éveille après le coucher du soleil » — conçue et construite comme une expérience d’atterrissage complète.",
        problem:
          "Les sites de voyage vendent des billets ; celui-ci devait vendre une sensation. Chaque élément — la vidéo, le verre, le mouvement — travaille d’abord pour l’atmosphère.",
        process: [
          {
            title: "La vidéo intouchée au centre",
            body: "Le héros vidéo est diffusé plein cadre, sans recadrage ni ré-encodage — la pièce maîtresse reste exactement telle qu’elle a été créée.",
          },
          {
            title: "Un système d’interface en verre",
            body: "Composants glassmorphism réutilisables sur Tailwind, avec parallaxe au pointeur et à l’orientation de l’appareil.",
          },
          {
            title: "Le timing centralisé",
            body: "Toutes les durées et courbes d’animation vivent dans une seule configuration — un endroit unique pour accorder la sensation.",
          },
        ],
        decisions: [
          {
            title: "L’accessibilité dès le départ",
            why: "Mouvement réduit respecté et navigation clavier soignée — l’atmosphère n’est jamais une barrière.",
          },
        ],
        outcomes: ["4 étoiles et 2 forks sur GitHub", "Un système jour/nuit prévu dans l’architecture"],
        reflection:
          "Le branding est de l’ingénierie de mouvement au ralenti : la sensation d’une marque, c’est le timing de ses mouvements.",
      },
    },
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

  /* ─────────────── 7 · RÊVERIE (GitHub) ─────────────── */
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
    fr: {
      title: "Rêverie — Un rêve éveillé",
      oneLiner:
        "Un concept cinématique original — lumière, immobilité et mouvement éditorial — conçu, construit et en ligne.",
      contribution:
        "Un rêve original, en ligne — scroll cinématique, verre, sur le web.",
      tags: ["Ingénierie créative", "Next.js", "Framer Motion"],
      study: {
        role: "Ingénierie créative — solo",
        timeline: "Juillet 2026",
        context:
          "« Là où l’ordinaire devient doré » — une rêverie originale d’une seule page à travers la lumière et l’immobilité : héros, éditorial, récit, galerie, appel.",
        problem:
          "Pas de franchise, pas de brief — le concept seul peut-il tenir un scroll sur une page entière ?",
        process: [
          {
            title: "Le film sous le verre",
            body: "Des arrière-plans vidéo plein écran sous des voiles de verre — la lumière du film traverse chaque composant.",
          },
          {
            title: "Une typographie éditoriale",
            body: "Cormorant Garamond et Inter auto-hébergées — la voix sérif du rêve, la voix droite du réel.",
          },
          {
            title: "Un mouvement au rythme du souffle",
            body: "Révélations et parallaxe sur Lenis + Framer Motion, réglées lentes — le calme est la signature.",
          },
        ],
        decisions: [
          {
            title: "Statique et léger",
            why: "Un export entièrement statique, ~155 kB de JS au premier chargement — le rêve n’a pas besoin de serveur.",
          },
        ],
        outcomes: ["Déployé et en ligne sur Netlify", "Le seul concept 100 % original de la série — aucune licence, aucune béquille"],
        reflection:
          "Sans propriété intellectuelle sur laquelle s’appuyer, chaque décision est à nu — c’est la pièce qui me ressemble le plus.",
      },
    },
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

  /* ─────────────── 14 · AUTOMATION SYSTEM (kept) ─────────────── */
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
    fr: {
      title: "Système d’automatisation supply chain & ventes-marketing",
      oneLiner: "Automatiser le produit invisible — des workflows de bout en bout qui retirent le travail manuel de tout le tunnel.",
      contribution:
        "Processus humain cartographié, travail de robot automatisé — et inspectable.",
      tags: ["Automatisation", "Systèmes", "n8n"],
      study: {
        role: "Ingénieur automatisation & systèmes",
        timeline: "2025 · projet portfolio",
        context:
          "Une automatisation de bout en bout sur les ventes, le marketing et les opérations — pipelines de génération de leads, mises à jour CRM, tableaux de bord de reporting et flux de distribution de contenu, sur n8n, Zapier et des intégrations REST.",
        problem:
          "Un tunnel plein de gens compétents faisant un travail de robot : copier des leads, mettre à jour des champs, assembler le même rapport hebdomadaire. Le problème relevait de l’ingénierie de systèmes — où le jugement humain apporte-t-il vraiment de la valeur, et que doit-on faire disparaître ?",
        process: [
          {
            title: "Cartographier d’abord le processus humain",
            body: "Avant toute automatisation, le workflow existant a été cartographié de bout en bout — chaque passation, temps d’attente et copier-coller identifié comme candidat.",
          },
          {
            title: "Automatiser les passations, garder le jugement",
            body: "Les flux ont été dessinés autour des points de décision : les machines déplacent l’information entre les décisions ; les humains les prennent.",
          },
          {
            title: "Concevoir les états d’échec",
            body: "Chaque flux a reçu un état observable et un chemin d’échec compréhensible par un responsable non technique — une automatisation qu’on ne peut pas inspecter est une automatisation à laquelle on ne peut pas se fier.",
          },
        ],
        decisions: [
          {
            title: "Invisible jusqu’à la panne — puis bruyant",
            why: "Le succès, c’est le silence ; les échecs alertent avec du contexte. L’inverse — succès bruyant, échec silencieux — est la façon dont meurent les automatisations.",
          },
          {
            title: "Des flux documentés en schémas, pas en code",
            why: "Le système ne survit à son auteur que si la personne suivante sait le lire.",
          },
        ],
        outcomes: [
          "Effort manuel nettement réduit sur l’ensemble du tunnel",
          "Génération de leads, hygiène CRM, reporting et distribution automatisés et autonomes",
        ],
        reflection:
          "La meilleure interface pour un travail répétitif est l’absence d’interface — mais bien construire ce « rien » demande la même rigueur que construire des écrans.",
      },
    },
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

  /* ─────────────── 15 · SPIDER-MAN (visual showcase, no repo) ───────────────
     Deliberately has neither `site` nor `repo`: no public URL exists, and the
     rule is never to invent one. The panel is identical in every other way —
     same cover treatment, typography, arc position and hover language. */
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
    fr: {
      title: "Spider-Man — Le pouvoir derrière le masque",
      oneLiner:
        "Une expérience cinématique de fan sur la personne sous le costume — pour voir jusqu’où la retenue porte une licence d’action.",
      contribution:
        "Concept et build cinématique — le calme, pas le combat.",
      tags: ["Web cinématique", "Concept", "Visuel"],
      study: {
        role: "Ingénierie créative — solo",
        timeline: "Juin 2026",
        context:
          "Une expérience cinématique de fan construite autour d’une seule idée : « le pouvoir derrière le masque » — le masque déchiré, le visage en dessous, l’humain avant le héros.",
        problem:
          "Les licences d’action se vendent par le mouvement. L’exercice inverse : est-ce qu’un seul plan fixe, tenu et bien cadré, porte plus loin qu’une séquence de combat ?",
        process: [
          {
            title: "Une image, tenue",
            body: "Le plan central — regard caméra, masque déchiré — reste immobile ; toute la mise en scène travaille autour de lui plutôt que par-dessus.",
          },
          {
            title: "Une typographie qui chuchote",
            body: "Un titrage fin, très espacé, posé bas dans le cadre : le texte accompagne l’image au lieu de la concurrencer.",
          },
        ],
        decisions: [
          {
            title: "La retenue comme parti pris",
            why: "Sur une propriété bâtie sur le spectacle, le silence est le choix le plus remarquable — et le plus difficile à tenir.",
          },
        ],
        outcomes: [
          "Une pièce visuelle qui tient sur une seule idée de mise en scène",
          "L’exercice de retenue qui a nourri les projets cinématiques suivants",
        ],
        reflection:
          "Savoir ce qu’on retire est une compétence de conception — ce projet ne parle que de ça.",
        note: "Concept de fan non officiel — sans affiliation avec les ayants droit. Pièce visuelle : aucun dépôt public.",
      },
    },
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
