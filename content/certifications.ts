/* Portfolio by Avdesh Jadon — Full Stack Developer & Software Tester. */


export type Cert = {
  no: string; 

  issuer: string | null;

  logo?: { src: string; aspect: number };
  title: string;
  year: string | null;
  credentialId: string | null;
  credentialUrl?: string;
  verified: boolean;
  skills: string[];
  metric?: { value: string; label: string };
  fr?: { title?: string; skills?: string[]; metricLabel?: string };
};

export const CERTS: Cert[] = [
  {
    no: "2.1",

    issuer: "Microsoft",
    logo: { src: "/images/issuers/microsoft.png", aspect: 2110 / 540 },
    title: "Power Platform — Power BI & Power Virtual Agents",
    year: null,
    credentialId: null,
    verified: false,
    skills: [
      "Dashboard development & KPI design",
      "Data storytelling for non-technical users",
      "Conversational agent flows",
    ],
    metric: { value: "Power BI", label: "Applied curriculum" },
    fr: {
      skills: [
        "Développement de tableaux de bord & design de KPI",
        "Data storytelling pour des publics non techniques",
        "Parcours d’agents conversationnels",
      ],
      metricLabel: "Cursus appliqué",
    },
  },
  {
    no: "2.2",

    issuer: "Google",
    logo: { src: "/images/issuers/google.png", aspect: 10000 / 3382 },
    title: "Attract & Engage Customers with Digital Marketing",
    year: null,
    credentialId: null,
    verified: false,
    skills: [
      "Customer acquisition funnels",
      "Positioning & messaging",
      "Campaign measurement",
    ],
    metric: { value: "B2B / B2C", label: "Funnel scope" },
    fr: {
      title: "Attirer & engager les clients par le marketing digital",
      skills: [
        "Tunnels d’acquisition client",
        "Positionnement & discours de marque",
        "Mesure de campagnes",
      ],
      metricLabel: "Périmètre du tunnel",
    },
  },
  {
    no: "2.3",
    issuer: null,
    title: "SEO & Content Marketing",
    year: null,
    credentialId: null,
    verified: false,
    skills: [
      "Technical & on-page SEO",
      "Content architecture",
      "Search-intent research",
    ],
    metric: { value: "35%", label: "Organic growth delivered" },
    fr: {
      title: "SEO & marketing de contenu",
      skills: [
        "SEO technique & on-page",
        "Architecture de contenu",
        "Analyse de l’intention de recherche",
      ],
      metricLabel: "Croissance organique obtenue",
    },
  },
  {
    no: "2.4",
    issuer: null,
    title: "Business Analysis Fundamentals",
    year: null,
    credentialId: null,
    verified: false,
    skills: [
      "Requirements gathering",
      "Gap & root-cause analysis",
      "Process mapping",
    ],
    metric: { value: "12%", label: "Workflow efficiency gain" },
    fr: {
      title: "Fondamentaux de l’analyse métier",
      skills: [
        "Recueil des besoins",
        "Analyse d’écarts & de causes racines",
        "Cartographie des processus",
      ],
      metricLabel: "Gain d’efficacité des flux",
    },
  },
  {
    no: "2.5",

    issuer: "IBM",
    logo: { src: "/images/issuers/ibm.png", aspect: 4464 / 1944 },
    title: "Artificial Intelligence — Foundations & Applied Use Cases",
    year: null,
    credentialId: null,
    verified: false,
    skills: [
      "Applied generative AI",
      "Prompt engineering",
      "Human-in-the-loop validation",
    ],
    metric: { value: "HITL", label: "Validation practice" },
    fr: {
      title: "Intelligence artificielle — fondamentaux & cas d’usage",
      skills: [
        "IA générative appliquée",
        "Ingénierie de prompts",
        "Validation avec humain dans la boucle",
      ],
      metricLabel: "Pratique de validation",
    },
  },
];
