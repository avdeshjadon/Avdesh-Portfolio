/* Professional experience — from Avdesh's CV, positioned engineering-first
   per the developer repositioning. Reverse chronological: newest first.
   ⚠ PLACEHOLDER engineering framing — the companies, periods and outcomes
   are real; the technical wording is to be confirmed/edited by Avdesh. */

export type Role = {
  company: string;
  role: string;
  type: "Internship" | "Full-time" | "Hackathon" | "Freelance";
  location: string;
  period: string;
  summary: string;
  achievements: string[];
  outcome: string;
  skills: string[];
  /* panel color — intentional, one vibrant per role (Experience deck) */
  color: string;
  fg: "light" | "dark";
  /* Company mark. `variant` follows what the supplied file actually IS:
     · "tile"  — the logo ships with its own background baked in (square
                 avatars), so it is shown as a rounded tile, uncropped
     · "plate" — transparent artwork that needs a light ground to read;
                 the plate's width follows the logo's true aspect ratio
     · absent  — no official file supplied yet → typographic fallback */
  logo?: {
    src: string;
    variant: "tile" | "plate";
    aspect: number;
    /* Placement adapts to how dense the panel's copy is — a logo is not
       forced into the same slot for every company.
       "right" — sits beside the content (default, when there is room)
       "below" — closes the panel underneath the content (dense copy) */
    placement?: "right" | "below";
  };
  /* French copy for the translatable fields (see lib/i18n.tsx → L()) */
  fr?: { role?: string; summary?: string; outcome?: string; achievements?: string[] };
};

export const ROLES: Role[] = [
  {
    company: "Heeding Climate Solutions",
    role: "Full Stack Developer",
    type: "Internship",
    location: "Sophia Antipolis, France",
    period: "May – Oct 2026",
    summary:
      "Building the sustainable-fuel marketplace end to end — React/Next.js frontend, Node.js APIs and the tests behind the compliance, traceability and pricing flows.",
    achievements: [
      "Engineered the marketplace UI in React/Next.js — buyer journeys for fleet operators, suppliers and public-sector buyers, each flow tied to a conversion KPI",
      "Shipped TypeScript/Node.js APIs and data pipelines for batch traceability, Proof of Sustainability and automated compliance documents",
      "Wrote unit and end-to-end tests (Jest, Playwright); GA4-instrumented funnels fed weekly iteration back into the backlog",
    ],
    outcome: "Product targeting 1B+ tonnes of avoided CO₂ by 2050",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "Jest", "Playwright"],
    color: "#0072E3",
    fg: "light",
    /* transparent two-tone blue lockup, 1199×330 — needs a light ground.
       Composition has room, so it stays on the right. */
    logo: {
      src: "/images/companies/heeding.png",
      variant: "plate",
      aspect: 1199 / 330,
      placement: "right",
    },
    fr: {
      role: "Développeur full stack",
      summary:
        "Construction de la marketplace de carburants durables de bout en bout — interface React/Next.js, API Node.js et les tests derrière les parcours de conformité, traçabilité et tarification.",
      outcome: "Produit visant 1 Md+ de tonnes de CO₂ évitées d’ici 2050",
      achievements: [
        "Interface de la marketplace développée en React/Next.js — parcours des transporteurs, fournisseurs et acheteurs publics, chacun lié à un KPI de conversion",
        "API TypeScript/Node.js et pipelines de données pour la traçabilité des lots, les Proof of Sustainability et les documents de conformité automatisés",
        "Tests unitaires et de bout en bout (Jest, Playwright) ; tunnels GA4 instrumentés nourrissant le backlog chaque semaine",
      ],
    },
  },
  {
    company: "UNBIAS Innovation Hackathon",
    role: "Full Stack Engineer — AI (Hackathon)",
    type: "Hackathon",
    location: "Sophia Antipolis, France",
    period: "Mar 2026",
    summary:
      "Built an offline, privacy-first AI assistant end to end in one sprint — on-device inference workflow, three working prototypes and a demo-led jury pitch.",
    achievements: [
      "Designed and built the on-device inference workflow for a privacy-first AI assistant — zero cloud dependency",
      "Shipped three functional prototype websites demonstrating concept, AI workflow and commercial framework",
      "Presented architecture, user flow and unit economics live to the jury",
    ],
    outcome: "🏆 1st place — LockAI, offline secure on-device AI",
    skills: ["TypeScript", "React", "On-device AI", "Prototyping", "HTML/CSS"],
    color: "#6D3BF5",
    fg: "light",
    /* transparent violet wordmark, 685×226 — needs a light ground.
       This panel's copy is dense, so the mark closes the panel underneath
       the content instead of competing with it on the right. */
    logo: {
      src: "/images/companies/unbias.png",
      variant: "plate",
      aspect: 685 / 226,
      placement: "below",
    },
    fr: {
      role: "Ingénieur full stack — IA (hackathon)",
      summary:
        "Assistant IA hors-ligne, priorisant la confidentialité, construit de bout en bout en un sprint — workflow d’inférence embarqué, trois prototypes fonctionnels et un pitch basé sur la démo.",
      outcome: "🏆 1re place — LockAI, IA sécurisée hors-ligne",
      achievements: [
        "Workflow d’inférence embarqué conçu et construit — aucune dépendance au cloud",
        "Trois sites prototypes fonctionnels démontrant le concept, le workflow IA et le cadre commercial",
        "Architecture, parcours utilisateur et économie unitaire présentés en direct au jury",
      ],
    },
  },
  {
    company: "V Raise",
    role: "Process & Data Analyst",
    type: "Internship",
    location: "Paris, France",
    period: "Apr – Oct 2025",
    summary:
      "Mapped logistics workflows across operations, finance, IT and external 3PL partners; modelled the process data and surfaced the inefficiencies.",
    achievements: [
      "Business-process mapping, gap analysis and root-cause analysis to surface inefficiencies",
      "Built steering-committee dashboards in Power BI that made operational health legible at a glance",
    ],
    outcome: "12% end-to-end logistics workflow efficiency gain",
    skills: ["Process Mapping", "Power BI", "Data Modelling", "Stakeholders"],
    color: "#FFFFFF",
    fg: "dark",
    /* gold chevron on its own black ground, 200×200 */
    logo: { src: "/images/companies/vraise.jpg", variant: "tile", aspect: 1 },
    fr: {
      role: "Analyste données & processus",
      summary:
        "Cartographie des flux logistiques entre les opérations, la finance, l’IT et les partenaires 3PL externes ; modélisation des données de processus et identification des inefficacités.",
      outcome: "+12 % d’efficacité sur le flux logistique de bout en bout",
      achievements: [
        "Cartographie des processus, analyse des écarts et des causes racines pour révéler les inefficacités",
        "Tableaux de bord du comité de pilotage construits sous Power BI, rendant la santé opérationnelle lisible d’un coup d’œil",
      ],
    },
  },
  {
    company: "Oigetit.ai",
    role: "Software QA & Data Validation Analyst",
    type: "Internship",
    location: "Los Gatos, USA · Remote",
    period: "Jan – May 2025",
    summary:
      "Validated an AI misinformation filter's classifications, hunted edge cases across the pipeline and shipped tests plus user-facing explanations for its verdicts.",
    achievements: [
      "Pattern recognition, data validation and edge-case identification across the AI pipeline",
      "Designed validation checks and rewrote the verification verdicts in simplified, user-friendly language",
    ],
    outcome: "Improved AI classification accuracy",
    skills: ["Test Design", "Data Validation", "Responsible AI", "Regression Testing"],
    color: "#FF2E0F",
    fg: "light",
    /* blue ring mark on its own blue ground, 100×100 */
    logo: { src: "/images/companies/oigetit.jpg", variant: "tile", aspect: 1 },
    fr: {
      role: "Analyste QA & validation de données",
      summary:
        "Validation des classifications d’un filtre anti-désinformation, chasse aux cas limites dans le pipeline et rédaction de tests et d’explications destinées aux utilisateurs pour ses verdicts.",
      outcome: "Précision de classification de l’IA améliorée",
      achievements: [
        "Reconnaissance de motifs, validation des données et identification des cas limites dans le pipeline IA",
        "Conception de contrôles de validation et réécriture des verdicts en langage simplifié, orienté utilisateur",
      ],
    },
  },
  {
    company: "Site Web & Co",
    role: "Web Developer — SEO & Web Performance",
    type: "Internship",
    location: "Montpellier, France",
    period: "Jan – Apr 2025",
    summary:
      "Audited and optimised web experiences across a B2B/B2C client portfolio — template-level code fixes driven by measurement.",
    achievements: [
      "On-page & technical SEO fixes; rebuilt meta architecture and internal-linking logic for the highest-traffic templates",
      "Produced performance dashboards and growth insights for client stakeholders",
    ],
    outcome: "35% organic traffic growth across the portfolio",
    skills: ["Analytics", "Web Performance", "SEO", "Technical SEO"],
    color: "#FF6A00",
    fg: "light",
    fr: {
      role: "Développeur web — SEO & performance",
      summary:
        "Audit et optimisation d’expériences web sur un portefeuille de clients B2B/B2C — des correctifs de code au niveau des gabarits, guidés par la mesure.",
      outcome: "+35 % de trafic organique sur le portefeuille",
      achievements: [
        "SEO technique et on-page ; refonte de l’architecture des métadonnées et du maillage interne des gabarits les plus consultés",
        "Tableaux de bord de performance et recommandations de croissance pour les clients",
      ],
    },
  },
  {
    company: "Sage Finance",
    role: "Operations & Business Development Lead",
    type: "Full-time",
    location: "Telangana, India",
    period: "Sep 2022 – Aug 2024",
    summary:
      "Owned sales strategy and client acquisition for a financial-consulting practice — where my instincts about customers were forged.",
    achievements: [
      "Built the inbound-to-close playbook adopted by the broader sales team",
      "Market analysis, customer segmentation and pipeline management against tracked KPIs",
    ],
    outcome: "$20K+ sales in one week → promoted to Marketing Team Lead",
    skills: ["Strategy", "Segmentation", "Pipeline", "Leadership"],
    color: "#FFB200",
    fg: "dark",
    /* blue wordmark on its own lavender ground, 100×100 */
    logo: { src: "/images/companies/sage.jpg", variant: "tile", aspect: 1 },
    fr: {
      role: "Responsable opérations & développement commercial",
      summary:
        "Pilotage de la stratégie commerciale et de l’acquisition client d’un cabinet de conseil financier — là où s’est forgé mon instinct client.",
      outcome: "20 000 $+ de ventes en une semaine → promu responsable marketing",
      achievements: [
        "Création du playbook inbound-to-close adopté par toute l’équipe commerciale",
        "Analyse de marché, segmentation client et gestion du pipeline face aux KPI suivis",
      ],
    },
  },
  {
    company: "Tutorac",
    role: "Business Development Executive",
    type: "Full-time",
    location: "Telangana, India",
    period: "Nov 2021 – Aug 2022",
    summary:
      "Go-to-market and retention analysis for a subscription e-learning platform across the South-Indian market.",
    achievements: [
      "Analysed subscription trends and customer feedback to support retention",
      "Expanded the client portfolio through outbound and partnership channels",
    ],
    outcome: "$50K+ subscription sales in one month",
    skills: ["Go-to-Market", "Growth", "Retention"],
    color: "#171429",
    fg: "light",
    /* navy wordmark on its own white ground, 100×100 */
    logo: { src: "/images/companies/tutorac.jpg", variant: "tile", aspect: 1 },
    fr: {
      role: "Chargé de développement commercial",
      summary:
        "Go-to-market et analyse de rétention pour une plateforme d’e-learning par abonnement sur le marché sud-indien.",
      outcome: "50 000 $+ de ventes d’abonnements en un mois",
      achievements: [
        "Analyse des tendances d’abonnement et des retours clients pour soutenir la rétention",
        "Élargissement du portefeuille clients via des canaux outbound et partenariats",
      ],
    },
  },
];