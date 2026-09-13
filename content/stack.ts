/* Portfolio by Avdesh Jadon — Full Stack Developer & Software Tester. */


export type Tool = {
  name: string;
  group: "Languages" | "Frontend" | "Backend" | "Database, DevOps & Testing";
  src?: string;
  mono?: string;
  color?: string;
};

export const TOOLS: Tool[] = [
  { name: "Java", group: "Languages", src: "/images/tech/java.svg", mono: "Ja", color: "#E76F00" },
  { name: "Python", group: "Languages", src: "/images/tech/python.svg", mono: "Py", color: "#3776AB" },
  { name: "C++", group: "Languages", src: "/images/tech/cpp.svg", mono: "C+", color: "#00599C" },

  { name: "React", group: "Frontend", src: "/images/tech/react.svg", mono: "Re", color: "#0E7C99" },
  { name: "JavaScript", group: "Frontend", src: "/images/tech/javascript.svg", mono: "JS", color: "#C99A00" },
  { name: "Tailwind CSS", group: "Frontend", src: "/images/tech/tailwind.svg", mono: "TW", color: "#0891A6" },

  { name: "Spring Boot", group: "Backend", src: "/images/tech/springboot.svg", mono: "Sb", color: "#6DB33F" },
  { name: "Spring Security", group: "Backend", src: "/images/tech/springsecurity.svg", mono: "Ss", color: "#3D6B48" },
  { name: "Node.js", group: "Backend", src: "/images/tech/nodejs.svg", mono: "No", color: "#339933" },
  { name: "REST APIs", group: "Backend", src: "/images/tech/api.svg", mono: "API", color: "#0EA5E9" },

  { name: "MySQL", group: "Database, DevOps & Testing", src: "/images/tech/mysql.svg", mono: "My", color: "#00758F" },
  { name: "PostgreSQL", group: "Database, DevOps & Testing", src: "/images/tech/postgresql.svg", mono: "Pg", color: "#336791" },
  { name: "MongoDB", group: "Database, DevOps & Testing", src: "/images/tech/mongodb.svg", mono: "M", color: "#47A248" },
  { name: "Docker", group: "Database, DevOps & Testing", src: "/images/tech/docker.svg", mono: "Dk", color: "#2496ED" },
  { name: "AWS EC2", group: "Database, DevOps & Testing", src: "/images/tech/aws.svg", mono: "AWS", color: "#FF9900" },
  { name: "Maven", group: "Database, DevOps & Testing", src: "/images/tech/maven.svg", mono: "Mv", color: "#C71A36" },
  { name: "Git", group: "Database, DevOps & Testing", src: "/images/tech/git.svg", mono: "Gi", color: "#F05032" },
  { name: "GitHub", group: "Database, DevOps & Testing", src: "/images/tech/github.svg", mono: "GH", color: "#181717" },
  { name: "JUnit", group: "Database, DevOps & Testing", src: "/images/tech/junit.svg", mono: "J", color: "#25A162" },
  { name: "JMeter", group: "Database, DevOps & Testing", src: "/images/tech/jmeter.png", mono: "Jm", color: "#E4591B" },
  { name: "Linux", group: "Database, DevOps & Testing", src: "/images/tech/linux.svg", mono: "Ub", color: "#E95420" },
];