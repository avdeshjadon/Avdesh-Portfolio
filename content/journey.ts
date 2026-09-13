/* Portfolio by Avdesh Jadon — Full Stack Developer & Software Tester. */

export type Chapter = {
  id: string;
  year: string;
  title: string;
  place: string;
  story: string;
  bridge: string;
};

export const CHAPTERS: Chapter[] = [
  {
    id: "roots",
    year: "2023",
    title: "Roots & The First Spark",
    place: "Agra, India",
    story:
      "Where the journey began. Growing up in Agra with a relentless curiosity about how computers and digital systems function beneath the surface. Leaving for college wasn't just about an engineering degree — it was a deliberate choice to learn how to write software, solve logic puzzles, and build tools from scratch.",
    bridge: "Every developer starts with curiosity and an empty editor.",
  },
  {
    id: "foundations",
    year: "2023",
    title: "First Code, Clones & Browser Tools",
    place: "College Campus",
    story:
      "Stepping onto campus and diving deep into HTML5, CSS3, and JavaScript. To master layout mechanics and responsive UI, I built pixel-accurate clones of Spotify and Twitter. Alongside, I built Webin — a custom Chrome productivity extension that overlays a smart bookmark interface across any webpage with customizable keyboard shortcuts.",
    bridge:
      "Cloning taught me visual hierarchy. Building browser tools taught me how users actually interact.",
  },
  {
    id: "logic-tools",
    year: "2024",
    title: "Logic, State & Algorithmic Foundations",
    place: "College",
    story:
      "Moving beyond static layouts to state machines and algorithmic problem solving. Built interactive web tools including a comprehensive Calculator while strengthening core CS fundamentals — Java, OOP, DBMS, Operating Systems, Computer Networks, and solving 500+ problems across LeetCode and GeeksforGeeks.",
    bridge:
      "Code stopped being just syntax and became about thinking in edge cases, efficiency, and clean structure.",
  },
  {
    id: "libranova",
    year: "2025",
    title: "Engineering Systems — LibraNova LMS",
    place: "College",
    story:
      "Stepping up to full-stack system architecture with LibraNova LMS — a complete Library Management System. Designed normalized relational database schemas, role-based authentication (Admin vs. Student), catalog search, book issue/return workflows, automated fine tracking, and end-to-end integration tests to guarantee reliability.",
    bridge:
      "Building full-stack taught me that good software is defined by its tests and database integrity as much as its UI.",
  },
  {
    id: "dragolink",
    year: "2026",
    title: "Production Scale — DragoLink",
    place: "College",
    story:
      "Final-year capstone engineering: architecting DragoLink — a modern link management and analytics platform. Engineered dynamic UTM routing, click-stream telemetry, device/geo analytics, and URL redirection pipelines backed by automated test suites and cloud deployment.",
    bridge:
      "From a curious student in Agra to an engineer building scalable, tested software ready for production.",
  },
];