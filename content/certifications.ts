/* Portfolio by Avdesh Jadon — Full Stack Developer & Software Tester. */

export type Cert = {
  no: string;
  kind: "Certification" | "Certificate";
  issuer: string | null;
  issuerSuffix?: string;
  logo?: { src: string; aspect: number };
  title: string;
  year: string | null;
  credentialId: string | null;
  credentialUrl?: string;
  pdfUrl?: string;
  verified: boolean;
  skills: string[];
  metric?: { value: string; label: string };
};

export const CERTS: Cert[] = [
  {
    no: "1.1",
    kind: "Certification",
    issuer: "Oracle",
    issuerSuffix: "Certified",
    logo: { src: "/images/issuers/oracle.svg", aspect: 200 / 44 },
    title: "Oracle Cloud Infrastructure Certified AI Foundations Associate",
    year: "2026",
    credentialId: "102306574OCI26AICFA",
    credentialUrl: "/certificates/oracle_cloud.pdf",
    pdfUrl: "/certificates/oracle_cloud.pdf",
    verified: true,
    skills: [
      "AI & Machine Learning Foundations",
      "Oracle Cloud Infrastructure (OCI)",
      "Generative AI & LLM Architectures",
      "Cloud Security & Model Evaluation",
    ],
    metric: { value: "OCI AI", label: "Official Oracle Certification" },
  },
  {
    no: "1.2",
    kind: "Certification",
    issuer: "Oracle",
    issuerSuffix: "Certified",
    logo: { src: "/images/issuers/oracle.svg", aspect: 200 / 44 },
    title: "Oracle AI Database Certified Foundations Associate",
    year: "2026",
    credentialId: "102306574OCI26DCFA",
    credentialUrl: "/certificates/oracle_ai_db.pdf",
    pdfUrl: "/certificates/oracle_ai_db.pdf",
    verified: true,
    skills: [
      "AI-Vector Search & Autonomous Database",
      "SQL & Relational AI Workloads",
      "Database Optimization & Analytics",
      "Enterprise Data Architecture",
    ],
    metric: { value: "AI DB", label: "Official Oracle Certification" },
  },
  {
    no: "1.3",
    kind: "Certificate",
    issuer: "CSE Pathshala",
    issuerSuffix: "Certificate of Achievement",
    logo: { src: "/images/issuers/csepathshala.svg", aspect: 200 / 44 },
    title: "C++ Programming: OOPs and Data Structures & Algorithms",
    year: "2025",
    credentialId: "CP-20250607-1CPP-049",
    credentialUrl: "/certificates/C++ Programming OOPs and DSA.pdf",
    pdfUrl: "/certificates/C++ Programming OOPs and DSA.pdf",
    verified: true,
    skills: [
      "Object-Oriented Programming (OOP)",
      "Data Structures & Advanced Algorithms",
      "Memory Management & Pointers",
      "Time & Space Complexity Optimization",
    ],
    metric: { value: "35+ Hrs", label: "Live Summer Training" },
  },
  {
    no: "1.4",
    kind: "Certificate",
    issuer: "IBM",
    issuerSuffix: "Course Certificate",
    logo: { src: "/images/issuers/ibm.png", aspect: 4464 / 1944 },
    title: "Introduction to Hardware and Operating Systems",
    year: "2024",
    credentialId: "G40A1YI9X4CQ",
    credentialUrl: "https://coursera.org/verify/G40A1YI9X4CQ",
    pdfUrl: "/certificates/Introduction to Hardware and Operating Systems.pdf",
    verified: true,
    skills: [
      "Operating System Kernels & Architecture",
      "Process Scheduling & Concurrency",
      "Memory Hierarchy & File Systems",
      "System Diagnostics & Troubleshooting",
    ],
    metric: { value: "IBM", label: "Authorized Coursera Course" },
  },
  {
    no: "1.5",
    kind: "Certificate",
    issuer: "Univ. Autònoma de Barcelona",
    issuerSuffix: "Course Certificate",
    logo: { src: "/images/issuers/coursera.svg", aspect: 200 / 44 },
    title: "Digital Systems: From Logic Gates to Processors",
    year: "2024",
    credentialId: "FEQQFSKUZ1CQ",
    credentialUrl: "https://coursera.org/verify/FEQQFSKUZ1CQ",
    pdfUrl: "/certificates/Digital Systems- From Logic Gates to Processors.pdf",
    verified: true,
    skills: [
      "Combinational & Sequential Logic Design",
      "ALU & Processor Datapath Architecture",
      "Boolean Algebra & Gate Minimization",
      "Instruction Set Fundamentals",
    ],
    metric: { value: "40 Hrs", label: "Applied Engineering Course" },
  },
  {
    no: "1.6",
    kind: "Certificate",
    issuer: "University of Colorado",
    issuerSuffix: "Course Certificate",
    logo: { src: "/images/issuers/coursera.svg", aspect: 200 / 44 },
    title: "Fundamentals of Network Communication",
    year: "2024",
    credentialId: "XZVM9696BLAX",
    credentialUrl: "https://coursera.org/verify/XZVM9696BLAX",
    pdfUrl: "/certificates/Fundamentals of Network Communication.pdf",
    verified: true,
    skills: [
      "OSI 7-Layer & TCP/IP Reference Models",
      "Packet Switching & Routing Protocols",
      "Socket Programming & Network Security",
      "Bandwidth, Latency & Error Handling",
    ],
    metric: { value: "Networks", label: "University of Colorado System" },
  },
  {
    no: "1.7",
    kind: "Certificate",
    issuer: "University of Colorado",
    issuerSuffix: "Course Certificate",
    logo: { src: "/images/issuers/coursera.svg", aspect: 200 / 44 },
    title: "Peer-to-Peer Protocols and Local Area Networks",
    year: "2024",
    credentialId: "V0B3VRE5TJLL",
    credentialUrl: "https://coursera.org/verify/V0B3VRE5TJLL",
    pdfUrl: "/certificates/Peer-to-Peer Protocols and Local Area Networks.pdf",
    verified: true,
    skills: [
      "P2P Network Architecture & Topologies",
      "Ethernet, Wi-Fi (802.11) & LAN Standards",
      "Medium Access Control (MAC) Protocols",
      "Decentralized Data Exchange",
    ],
    metric: { value: "P2P & LAN", label: "University of Colorado System" },
  },
  {
    no: "1.8",
    kind: "Certificate",
    issuer: "upGrad Campus & LPU",
    issuerSuffix: "Certificate of Participation",
    logo: { src: "/images/issuers/upgrad.svg", aspect: 200 / 44 },
    title: "Hack Quest — 24 Hours CTF Challenge (Concoction 2024)",
    year: "2024",
    credentialId: "CONCOCTION-2024",
    credentialUrl: "/certificates/Hack Quest.pdf",
    pdfUrl: "/certificates/Hack Quest.pdf",
    verified: true,
    skills: [
      "Capture The Flag (CTF) Cybersecurity",
      "Reverse Engineering & Cryptography",
      "Web Application Vulnerability Analysis",
      "High-Pressure 24h Hackathon Execution",
    ],
    metric: { value: "24h CTF", label: "Intra-University Tech Challenge" },
  },
];
