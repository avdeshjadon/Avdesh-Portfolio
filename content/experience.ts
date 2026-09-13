/* Portfolio by Avdesh Jadon — Full Stack Developer & Software Tester. */

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
  color: string;
  fg: "light" | "dark";
  logo?: {
    src: string;
    variant: "tile" | "plate";
    aspect: number;
    placement?: "right" | "below";
  };
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
    logo: {
      src: "/images/companies/heeding.png",
      variant: "plate",
      aspect: 1199 / 330,
      placement: "right",
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
    logo: {
      src: "/images/companies/unbias.png",
      variant: "plate",
      aspect: 685 / 226,
      placement: "below",
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
    logo: { src: "/images/companies/vraise.jpg", variant: "tile", aspect: 1 },
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
    logo: { src: "/images/companies/oigetit.jpg", variant: "tile", aspect: 1 },
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
  },
  {
    company: "Sage Finance",
    role: "Operations & Business Development Lead",
    type: "Full-time",
    location: "India",
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
    logo: { src: "/images/companies/sage.jpg", variant: "tile", aspect: 1 },
  },
  {
    company: "Tutorac",
    role: "Business Development Executive",
    type: "Full-time",
    location: "India",
    period: "Nov 2021 – Aug 2022",
    summary:
      "Go-to-market and retention analysis for a subscription e-learning platform across the Indian market.",
    achievements: [
      "Analysed subscription trends and customer feedback to support retention",
      "Expanded the client portfolio through outbound and partnership channels",
    ],
    outcome: "$50K+ subscription sales in one month",
    skills: ["Go-to-Market", "Growth", "Retention"],
    color: "#171429",
    fg: "light",
    logo: { src: "/images/companies/tutorac.jpg", variant: "tile", aspect: 1 },
  },
];