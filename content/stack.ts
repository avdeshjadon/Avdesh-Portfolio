/* My Tech Stack — tools shown in the spiral orbit.
   Matches the SKILLS section of the resume — nothing extra.
   `src` uses a real logo from /public/images/logos when we have one;
   otherwise a brand-tinted monogram mark keeps the set visually uniform.
   To upgrade a monogram: drop an SVG/PNG in that folder and swap in `src`. */

export type Tool = {
  name: string;
  group: "Languages" | "Frontend" | "Backend" | "Database, DevOps & Testing";
  src?: string;
  mono?: string;
  color?: string;
};

export const TOOLS: Tool[] = [
  /* — Languages — */
  { name: "Java", group: "Languages", mono: "Ja", color: "#E76F00" },
  { name: "Python", group: "Languages", mono: "Py", color: "#3776AB" },
  { name: "C++", group: "Languages", mono: "C+", color: "#00599C" },

  /* — Frontend — */
  { name: "React", group: "Frontend", mono: "Re", color: "#0E7C99" },
  { name: "JavaScript", group: "Frontend", mono: "JS", color: "#C99A00" },
  { name: "Tailwind CSS", group: "Frontend", mono: "TW", color: "#0891A6" },

  /* — Backend — */
  { name: "Spring Boot", group: "Backend", mono: "Sb", color: "#6DB33F" },
  { name: "Spring Security", group: "Backend", mono: "Ss", color: "#3D6B48" },
  { name: "Node.js", group: "Backend", mono: "No", color: "#339933" },
  { name: "REST APIs", group: "Backend", mono: "API", color: "#6C757D" },

  /* — Database, DevOps & Testing — */
  { name: "MySQL", group: "Database, DevOps & Testing", mono: "My", color: "#00758F" },
  { name: "PostgreSQL", group: "Database, DevOps & Testing", mono: "Pg", color: "#336791" },
  { name: "MongoDB", group: "Database, DevOps & Testing", mono: "M", color: "#47A248" },
  { name: "Docker", group: "Database, DevOps & Testing", mono: "Dk", color: "#2496ED" },
  { name: "AWS EC2", group: "Database, DevOps & Testing", mono: "AWS", color: "#FF9900" },
  { name: "Maven", group: "Database, DevOps & Testing", mono: "Mv", color: "#C71A36" },
  { name: "Git", group: "Database, DevOps & Testing", mono: "Gi", color: "#F05032" },
  { name: "GitHub", group: "Database, DevOps & Testing", mono: "GH", color: "#181717" },
  { name: "JUnit", group: "Database, DevOps & Testing", mono: "J", color: "#25A162" },
  { name: "JMeter", group: "Database, DevOps & Testing", mono: "Jm", color: "#E4591B" },
  { name: "Linux", group: "Database, DevOps & Testing", mono: "Ub", color: "#E95420" },
];