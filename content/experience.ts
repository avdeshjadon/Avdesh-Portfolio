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
    company: "Freelance Development",
    role: "Full Stack Developer & QA Specialist",
    type: "Freelance",
    location: "Remote · India",
    period: "2025 – Present",
    summary:
      "Designing and delivering custom web applications, responsive client portals, and automated test pipelines for diverse business use cases.",
    achievements: [
      "Engineered responsive full-stack applications in React, Next.js, and Spring Boot with secure role-based access and REST APIs",
      "Formulated comprehensive QA test suites with Postman API automation, cutting client post-deployment defects by over 40%",
      "Integrated secure authentication, payment processing, and scheduled database backups for 99.9% client platform uptime",
    ],
    outcome: "10+ client deliverables with 100% on-time milestone delivery",
    skills: ["React", "Next.js", "Spring Boot", "MySQL", "Postman", "QA Automation"],
    color: "#0072E3",
    fg: "light",
  },
  {
    company: "Finance & Loan Manager",
    role: "Full Stack Architect & Backend Lead",
    type: "Freelance",
    location: "Client Solution · Punjab / Remote",
    period: "2025 – 2026",
    summary:
      "Architected an end-to-end Loan & Finance Management platform handling borrower onboarding, interest amortization schedules, and multi-tier approval workflows.",
    achievements: [
      "Built a mathematically verified EMI engine supporting reducing balance and flat rate calculations with zero round-off drift",
      "Constructed an administrative verification portal for borrower risk scoring, KYC document validation, and disbursement tracking",
      "Conducted extensive QA testing: verified edge-case repayment dates, overdue penalty calculations, and transaction rollbacks",
    ],
    outcome: "100% automated lending lifecycle handling thousands of simulated borrower accounts",
    skills: ["Java", "Spring Boot", "MySQL", "JPA/Hibernate", "JUnit 5", "Financial Logic"],
    color: "#0D9488",
    fg: "light",
  },
  {
    company: "Collegiate Hackathons",
    role: "Full Stack Lead & Team Lead",
    type: "Hackathon",
    location: "Educational Institution · India",
    period: "2024 – 2025",
    summary:
      "Led college developer teams in 24-48 hour hackathon sprints, building innovative prototypes, real-time web utilities, and delivering winning jury pitches.",
    achievements: [
      "Spearheaded rapid development of functional full-stack MVPs, turning complex problem statements into working web products in under 36 hours",
      "Designed clean database schemas, connected RESTful microservices, and deployed live preview builds for jury evaluations",
      "Handled defensive edge-case testing under live presentation pressure, ensuring zero runtime crashes during live judge demos",
    ],
    outcome: "🏆 Top Finalist & Performer across multiple collegiate hackathons",
    skills: ["Rapid Prototyping", "React", "Node.js", "System Design", "Git", "REST APIs"],
    color: "#6D3BF5",
    fg: "light",
  },
  {
    company: "Open Source QA Tooling",
    role: "Extension Creator & Open Source Developer",
    type: "Freelance",
    location: "Open Source · India",
    period: "2024 – 2025",
    summary:
      "Created open-source productivity and QA utility extensions (WebIn floating dock, Cookies Extractor, SessionID Detector) solving real pain points for web testers and developers.",
    achievements: [
      "Built WebIn using Shadow DOM injection for flawless CSS isolation on any webpage without layout interference",
      "Developed Cookies & SessionID extensions to automate cookie swapping and JWT token extraction for fast Postman testing",
      "Audited Manifest v3 security policies, eliminated background thread leaks, and published full source code on GitHub",
    ],
    outcome: "Open-source extensions actively utilized by developers & QA testers daily",
    skills: ["JavaScript", "Chrome Extensions API", "Manifest v3", "Shadow DOM", "Security Auditing"],
    color: "#FF6A00",
    fg: "light",
    logo: {
      src: "/images/projects/webin.png",
      variant: "tile",
      aspect: 1,
    },
  },
  {
    company: "College Journey & Foundation",
    role: "Computer Science & Engineering Student",
    type: "Internship",
    location: "Agra → Educational Institution",
    period: "2023 – 2024",
    summary:
      "Began my 4-year engineering degree in 2023 from Agra, establishing a deep foundation in core computer science, Data Structures & Algorithms, and full-stack software architecture.",
    achievements: [
      "Solved 500+ algorithmic problems across LeetCode and GeeksforGeeks covering binary trees, dynamic programming, and graphs",
      "Engineered Employee Management System using Hibernate ORM, JPA, and MySQL with transactional integrity",
      "Built pixel-perfect responsive clones of Spotify and Twitter, mastering CSS Grid, Flexbox, and modern frontend styling",
    ],
    outcome: "Built strong CS core fundamentals, advanced DSA problem-solving, and clean coding standards",
    skills: ["Data Structures", "Algorithms", "Java", "Hibernate", "HTML5/CSS3", "Git"],
    color: "#171429",
    fg: "light",
  },
];