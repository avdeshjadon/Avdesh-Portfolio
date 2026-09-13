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
    slug: "dragolink",
    title: "Dragolink — Dynamic Link & Campaign Routing Platform",
    tags: ["React", "Spring Boot", "MySQL", "Dynamic Routing", "Analytics"],
    year: "2026",
    oneLiner:
      "More than just a URL shortener! Dragolink is a comprehensive link management platform with powerful dynamic UTM routing rules, advanced analytics, and campaign tracking.",
    contribution:
      "Full-stack architecture — Spring Boot REST APIs, dynamic redirection engine, and React analytics dashboard.",
    coverLabel: "DRAGOLINK",
    cover: {
      bg: "#061A14",
      ink: "light",
      src: "/images/projects/dragolink.svg",
      aspect: 1260 / 1284,
      mark: "DL",
    },
    repo: "https://github.com/avdeshjadon/Dragolink",
    study: {
      role: "Full Stack Developer (Spring Boot & React)",
      timeline: "2026",
      context:
        "Modern marketing campaigns require precision link attribution, dynamic A/B routing, and device/geographic redirection rather than naive static URL shortening.",
      problem:
        "Generic link shorteners lack real-time parameter injection, conditional fallback rules, and campaign performance dashboards tailored for high-throughput link clicks.",
      process: [
        {
          title: "Schema & API Architecture",
          body: "Engineered high-performance Spring Boot REST endpoints with MySQL indexing for sub-millisecond redirect lookups.",
        },
        {
          title: "Dynamic Rule Engine",
          body: "Implemented conditional redirect logic based on device, location, and UTM parameters.",
        },
        {
          title: "React Analytics Dashboard",
          body: "Built an interactive analytics control center with live click logs, conversion metrics, and referer graphs.",
        },
      ],
      decisions: [
        {
          title: "Cached routing tables",
          why: "In-memory caching for active links guarantees minimal redirection latency under heavy incoming traffic.",
        },
        {
          title: "Parametric UTM preservation",
          why: "Automatic forwarding and sanitization of incoming query parameters to destination targets ensures marketing attribution is never lost.",
        },
      ],
      outcomes: [
        "Sub-10ms redirection resolution under concurrent simulated load",
        "Zero-loss analytics telemetry with full referer and user-agent logging",
        "Comprehensive campaign management and link lifecycle monitoring",
      ],
      reflection:
        "Building a high-throughput routing engine underscored the importance of database indexing, latency budgets, and defensive URL sanitization.",
    },
  },

  {
    slug: "libranova",
    title: "Libranova — Book Rental Management System",
    tags: ["React", "Spring Boot", "MySQL", "OAuth2", "Full-Stack"],
    year: "2026",
    oneLiner:
      "Libranova is a premium, full-stack Book Rental Management System featuring a modern glassmorphism UI, secure OAuth authentication (Google/GitHub), and an interactive Admin Dashboard with real-time stats.",
    contribution:
      "End-to-end full-stack build — OAuth2 token pipeline, role-based access control, and inventory rental state machine.",
    coverLabel: "LIBRANOVA",
    cover: {
      bg: "#EBF3EE",
      ink: "dark",
      src: "/images/projects/Libranova.svg",
      aspect: 1,
      mark: "LN",
    },
    repo: "https://github.com/avdeshjadon/Libranova",
    study: {
      role: "Full Stack Developer (Spring Boot / React)",
      timeline: "2026",
      context:
        "Libraries and educational institutions require automated book inventory tracking, member rental history, fine calculation, and streamlined authentication.",
      problem:
        "Legacy library management tools suffer from clunky user interfaces, manual check-in/out workflows, and insecure password management.",
      process: [
        {
          title: "OAuth2 Security Architecture",
          body: "Configured Spring Security with Google and GitHub OAuth2 social logins alongside JWT token verification.",
        },
        {
          title: "Relational Inventory Schema",
          body: "Designed comprehensive JPA entities covering books, categories, rental transactions, overdue fines, and users.",
        },
        {
          title: "Modern Glassmorphism UI",
          body: "Crafted a React interface with frosted glass styling, responsive book search filters, and smooth modal checkouts.",
        },
      ],
      decisions: [
        {
          title: "Automated fine computation",
          why: "Background scheduled jobs calculate daily overdue fines automatically upon return, eliminating human error.",
        },
        {
          title: "Role-based authorization",
          why: "Strict separation between student borrower capabilities and administrative inventory controls guarantees system integrity.",
        },
      ],
      outcomes: [
        "100% automated rental status transitions from borrowed to returned",
        "Unified OAuth2 single sign-on experience across Google and GitHub",
        "Interactive real-time admin analytics dashboard with live inventory counts",
      ],
      reflection:
        "Integrating Spring Security with third-party OAuth providers highlighted the power of standardized auth flows and declarative authorization.",
    },
  },

  {
    slug: "webin",
    title: "WebIn — Draggable Floating Overlay Chrome Extension",
    tags: ["JavaScript", "Chrome Extension", "Productivity", "Open Source"],
    year: "2025",
    oneLiner:
      "WebIn is a lightweight, draggable floating overlay that gives you instant access to your most-used web tools — right from any webpage! Whether you're coding, researching, chatting with AI, or chilling.",
    contribution:
      "Chrome extension engineering — Manifest v3 content-script injection, draggable floating portal, and custom shortcut engine.",
    coverLabel: "WEBIN",
    cover: {
      bg: "#0F172A",
      ink: "light",
      src: "/images/projects/webin.png",
      aspect: 1,
      mark: "WI",
    },
    repo: "https://github.com/avdeshjadon/WebIn",
    study: {
      role: "Extension Developer & Creator",
      timeline: "2025",
      context:
        "Developers and power users switch tabs constantly to fetch tools, notes, bookmarks, or AI assistants, interrupting their primary workflow.",
      problem:
        "Traditional bookmark bars clutter screen real estate and lack contextual, draggable availability without leaving the active browser viewport.",
      process: [
        {
          title: "Isolated Shadow DOM",
          body: "Injected the floating widget via Shadow DOM to prevent host page CSS collisions.",
        },
        {
          title: "Draggable Physics & Snapping",
          body: "Engineered mouse and touch drag handlers with smooth boundary collision detection.",
        },
        {
          title: "Quick-Access Tool Hub",
          body: "Built customizable launcher docks for web search, AI tools, and developer utilities.",
        },
      ],
      decisions: [
        {
          title: "Chrome Storage Sync",
          why: "Persisted user position and configured shortcuts across multiple logged-in Chrome browser sessions.",
        },
        {
          title: "Zero CPU idle footprint",
          why: "Event listeners attach only during active drag or expansion states, conserving browser resources.",
        },
      ],
      outcomes: [
        "Instant tool invocation without ever leaving the active webpage",
        "Zero style leakage into host page DOMs via isolated shadow roots",
        "Customizable shortcut launcher supporting custom URLs and search queries",
      ],
      reflection:
        "Chrome extension development requires strict adherence to Manifest v3 permissions and careful DOM isolation techniques.",
    },
  },

  {
    slug: "personallearn",
    title: "PersonalLearn — Personal Learning & Productivity Dashboard",
    tags: ["React 19", "Node.js", "MongoDB", "Tailwind CSS", "Analytics"],
    year: "2025",
    oneLiner:
      "A personal productivity dashboard built with React 19, Tailwind CSS, Node.js, and MongoDB, featuring markdown note-taking and learning analytics.",
    contribution:
      "Full-stack developer — React 19 UI state management, MongoDB aggregation pipelines, and markdown editor integration.",
    coverLabel: "PERSONAL LEARN",
    cover: {
      bg: "#18181B",
      ink: "light",
      src: "/images/projects/personallearn.svg",
      aspect: 1,
      mark: "PL",
    },
    repo: "https://github.com/avdeshjadon/PersonalLearn",
    study: {
      role: "Full Stack Developer",
      timeline: "2025",
      context:
        "Self-directed technical learning requires continuous organization of notes, active recall flashcards, and quantitative progress tracking.",
      problem:
        "Scattered tools across Notion, Anki, and spreadsheets result in fragmented learning notes and lost momentum.",
      process: [
        {
          title: "React 19 Concurrent Features",
          body: "Leveraged React 19 transitions and hooks for instant markdown rendering and preview.",
        },
        {
          title: "REST API & Aggregation",
          body: "Built Node.js and Express backend with MongoDB aggregation pipelines for weekly study streaks.",
        },
        {
          title: "Flashcard Review Loop",
          body: "Implemented spaced repetition review mechanics with confidence scoring.",
        },
      ],
      decisions: [
        {
          title: "Markdown-first storage",
          why: "Raw markdown persistence with syntax highlighting for code snippets ensures notes remain portable and developer-friendly.",
        },
        {
          title: "Aggregated analytics",
          why: "MongoDB $group and $facet queries enable rapid streak and retention visualization without heavy client-side processing.",
        },
      ],
      outcomes: [
        "Unified study workspace with sub-50ms editor responsiveness",
        "Visualized weekly retention rate and practice streak metrics",
        "Tag-based search allowing instant retrieval of past engineering notes",
      ],
      reflection:
        "Designing personal productivity software taught me to prioritize friction-free capture over excessive configuration options.",
    },
  },

  {
    slug: "practicetyping",
    title: "PracticeTyping — Sleek Minimalist Typing Application",
    tags: ["React", "Vite", "JavaScript", "Touch Typing", "Zen Mode"],
    year: "2025",
    oneLiner:
      "A sleek, minimalist typing practice application. Built with React and Vite, featuring progressive row-by-row modes, live WPM tracking, a butter-smooth cursor, and a distraction-free Zen mode.",
    contribution:
      "Frontend engineering — real-time keystroke buffer, accuracy calculation matrix, and smooth cursor physics.",
    coverLabel: "PRACTICE TYPING",
    cover: {
      bg: "#323437",
      ink: "light",
      src: "/images/projects/practicetyping.svg",
      aspect: 1,
      mark: "PT",
    },
    repo: "https://github.com/avdeshjadon/PracticeTyping",
    study: {
      role: "Frontend Developer & UI Designer",
      timeline: "2025",
      context:
        "Touch-typing mastery requires focused repetition without visual distractions, with immediate feedback on cadence and erroneous keystrokes.",
      problem:
        "Many typing platforms are cluttered with banner ads, complex layouts, and laggy cursor animations that disorient high-speed typists.",
      process: [
        {
          title: "Keystroke Engine",
          body: "Built a low-latency event listener handling character-by-character accuracy, backspaces, and word wraps.",
        },
        {
          title: "Progressive Training",
          body: "Created row-specific practice tiers (home row, top row, bottom row, number row) and custom word lists.",
        },
        {
          title: "Fluid Cursor Dynamics",
          body: "Used CSS transforms and RAF (requestAnimationFrame) interpolation for a smooth cursor glide.",
        },
      ],
      decisions: [
        {
          title: "Distraction-Free Zen Mode",
          why: "Minimal monochrome UI that fades non-essential elements during active typing sessions maximizes user focus.",
        },
        {
          title: "WPM Calculation Standard",
          why: "Standardized calculation using 5-character word units divided by elapsed minutes guarantees comparable metrics.",
        },
      ],
      outcomes: [
        "Zero-latency keystroke response tested up to 140+ WPM typing speeds",
        "Intuitive progression paths for beginners and competitive typists alike",
        "Accurate live accuracy graphs and error breakdown heatmaps",
      ],
      reflection:
        "High-frequency user input demands minimal component re-renders and direct DOM/ref manipulation for the smoothest possible feel.",
    },
  },

  {
    slug: "cookies-extension",
    title: "Cookies — Extractor & Inserter Chrome Extension",
    tags: ["JavaScript", "Chrome Extension", "CSS", "QA & Testing"],
    year: "2025",
    oneLiner:
      "Cookies Extractor & Inserter is a lightweight Chrome browser extension that gives you full control over website cookies in just a few clicks.",
    contribution:
      "Browser extension developer — Chrome Cookies API integration, JSON cookie import/export, and security sandbox testing.",
    coverLabel: "COOKIES",
    cover: {
      bg: "#1C1917",
      ink: "light",
      src: "/images/projects/cookies.svg",
      aspect: 1130 / 1014,
      mark: "CK",
    },
    repo: "https://github.com/avdeshjadon/Cookies",
    study: {
      role: "Chrome Extension & QA Tools Developer",
      timeline: "2025",
      context:
        "Testing cross-browser authentication states and user permissions often requires manipulating cookie states without tedious manual DevTools digging.",
      problem:
        "Standard DevTools cookie menus are cumbersome to export, transfer between testing environments, or restore during manual QA runs.",
      process: [
        {
          title: "Chrome Cookies API Integration",
          body: "Built permissions-scoped background scripts to query and manipulate cookie stores.",
        },
        {
          title: "One-Click JSON Serialization",
          body: "Implemented structured export/import formatting preserving domain, path, expiry, and HttpOnly flags.",
        },
        {
          title: "Security Boundary Checks",
          body: "Validated SameSite and Secure policy handling during dynamic cookie injection.",
        },
      ],
      decisions: [
        {
          title: "Scoped origin permissions",
          why: "Restricting active cookie reading strictly to the currently focused tab domain prevents cross-site leaks.",
        },
        {
          title: "Quick preset manager",
          why: "Allows QA engineers to save and swap authentication personas instantly across test cycles.",
        },
      ],
      outcomes: [
        "Saved up to 10 minutes per test scenario when swapping between QA authentication tokens",
        "Clean, lightweight extension popup with zero background memory bloat",
        "Reliable JSON import/export compatible with standard web test runners",
      ],
      reflection:
        "Building QA utility extensions deepened my understanding of browser security boundaries, SameSite attributes, and cookie lifecycles.",
    },
  },

  {
    slug: "sessionid-extension",
    title: "SessionID — Automated Auth Session Detector",
    tags: ["JavaScript", "Chrome Extension", "Security", "Developer Tools"],
    year: "2025",
    oneLiner:
      "A powerful Chrome Extension that automatically detects when a user logs in, extracts their Session ID, and copies authentication tokens for rapid API testing and debugging.",
    contribution:
      "Extension architecture — webRequest and storage listeners for zero-latency session token interception.",
    coverLabel: "SESSION ID",
    cover: {
      bg: "#0B1120",
      ink: "light",
      src: "/images/projects/session.png",
      aspect: 1,
      mark: "SID",
    },
    repo: "https://github.com/avdeshjadon/SessionID",
    study: {
      role: "Extension Developer",
      timeline: "2025",
      context:
        "Testing backend endpoints in Postman or cURL requires constantly copying session tokens and bearer headers from browser network tabs.",
      problem:
        "Developers lose focus repeatedly inspecting network requests and decoding headers to find valid session keys.",
      process: [
        {
          title: "Network Event Interception",
          body: "Utilized Chrome webRequest APIs to observe auth header exchanges on successful login HTTP responses.",
        },
        {
          title: "Pattern Matching Engine",
          body: "Developed regex token detectors recognizing JWTs, Bearer strings, and session IDs.",
        },
        {
          title: "One-Click Clipboard",
          body: "Added instant clipboard copy with automated notification toasts.",
        },
      ],
      decisions: [
        {
          title: "Local-only storage",
          why: "Strictly keeping extracted tokens in local volatile memory without telemetry protects developer credentials.",
        },
        {
          title: "Whitelist domain filtering",
          why: "Allows users to restrict token extraction strictly to localhost or selected staging domains.",
        },
      ],
      outcomes: [
        "Instantaneous token capture on successful login events",
        "Accelerated Postman and automated test script preparation",
        "Zero-friction developer ergonomics for backend and QA workflows",
      ],
      reflection:
        "Handling authentication tokens in browser extensions reinforced the necessity of zero-telemetry architecture and strict user privacy.",
    },
  },

  {
    slug: "employee-management-system",
    title: "Employee Management System — Hibernate ORM & JPA",
    tags: ["Java", "Hibernate", "JPA", "MySQL", "Maven"],
    year: "2024",
    oneLiner:
      "A Java console-based Employee Management System using Hibernate ORM, JPA, Maven, and MySQL with robust CRUD operations and relationship mapping.",
    contribution:
      "Backend architecture — entity mapping, transactional session management, and HQL query optimization.",
    coverLabel: "EMPLOYEE SYSTEM",
    cover: {
      bg: "#F8FAFC",
      ink: "dark",
      src: "/images/projects/employeemanagementsystem.jpg",
      aspect: 1920 / 1755,
      mark: "EMS",
    },
    repo: "https://github.com/avdeshjadon/EmployeeManagementSystem",
    study: {
      role: "Backend Java Developer",
      timeline: "2024",
      context:
        "Corporate HR systems depend on reliable entity persistence, transactional guarantees, and automated relational database mapping.",
      problem:
        "Traditional raw JDBC code suffers from boilerplate SQL strings, connection leakage risks, and difficult entity-relationship maintenance.",
      process: [
        {
          title: "Hibernate ORM Configuration",
          body: "Configured hibernate.cfg.xml and JPA entity annotations (@Entity, @Table, @Id).",
        },
        {
          title: "DAO & Service Pattern",
          body: "Separated business logic from data access layers with safe transactional boundaries (Session.beginTransaction()).",
        },
        {
          title: "Console CLI Interface",
          body: "Created a user-friendly console menu for managing departments, employee records, roles, and salaries.",
        },
      ],
      decisions: [
        {
          title: "Lazy loading strategy",
          why: "Avoided N+1 query overhead by tuning fetch configurations for employee department relations.",
        },
        {
          title: "Automated schema generation",
          why: "Employed Hibernate hbm2ddl.auto for clean database table generation during initial setup.",
        },
      ],
      outcomes: [
        "Complete CRUD lifecycle with atomic transaction rollbacks on error",
        "Clean relational mapping between employees, departments, and payroll records",
        "Modular Maven project architecture ready for enterprise extension",
      ],
      reflection:
        "Mastering Hibernate ORM and JPA provided fundamental insights into enterprise Java architectures and relational database abstractions.",
    },
  },

  {
    slug: "panda-login",
    title: "Panda Login & Sign-Up — Interactive Micro-Interactions",
    tags: ["HTML5", "CSS3", "JavaScript", "Animation", "UI/UX"],
    year: "2024",
    oneLiner:
      "Cute, responsive login & signup page with animated panda UI — built with HTML, CSS & JS, featuring playful paw-covering eye interactions on password focus.",
    contribution:
      "Creative UI engineering — pure CSS keyframe animations, SVG rigging, and responsive DOM event coordination.",
    coverLabel: "PANDA AUTH",
    cover: {
      bg: "#FFF1F2",
      ink: "dark",
      src: "/images/projects/panda.png",
      aspect: 1628 / 1664,
      mark: "🐼",
    },
    repo: "https://github.com/avdeshjadon/PandaLogin-SignUpPage",
    study: {
      role: "Creative Frontend Developer",
      timeline: "2024",
      context:
        "User authentication is often cold and transactional; delightful micro-interactions increase user engagement and emotional resonance.",
      problem:
        "Standard authentication forms fail to create memorable first impressions for consumer web applications.",
      process: [
        {
          title: "SVG Vector Rigging",
          body: "Designed vector panda facial elements with isolated movable paws, eyes, and ears.",
        },
        {
          title: "Focus Event Triggering",
          body: "Linked input focus listeners to trigger paw movements over the panda's eyes when password field is active.",
        },
        {
          title: "Responsive Card Layout",
          body: "Structured responsive modal containers using CSS Flexbox and subtle box shadows.",
        },
      ],
      decisions: [
        {
          title: "Pure CSS Keyframe Animation",
          why: "Minimizing JavaScript animation overhead by using hardware-accelerated CSS transforms guarantees 60fps responsiveness.",
        },
        {
          title: "Form validation feedback",
          why: "Added gentle shake animations on invalid submission attempts to provide clear, friendly error affordance.",
        },
      ],
      outcomes: [
        "High engagement and positive user sentiment across open-source showcase platforms",
        "60fps smooth animation transitions across mobile and desktop browsers",
        "Zero external CSS library dependencies for minimal bundle weight",
      ],
      reflection:
        "Micro-interactions transform mundane tasks into memorable user moments when executed with performance and restraint.",
    },
  },

  {
    slug: "spotify-home",
    title: "Spotify Home — Pixel-Perfect Responsive UI Clone",
    tags: ["HTML5", "CSS3", "Responsive Design", "CSS Grid"],
    year: "2024",
    oneLiner:
      "A pixel-perfect Spotify homepage UI clone built with pure HTML and CSS, replicating the complex multi-column layout, player bar, and card grid.",
    contribution:
      "CSS architecture — multi-pane responsive layout, dark-mode audio controls, and hover card micro-interactions.",
    coverLabel: "SPOTIFY CLONE",
    cover: {
      bg: "#121212",
      ink: "light",
      src: "/images/projects/spotify.svg",
      aspect: 496 / 512,
      mark: "SP",
    },
    repo: "https://github.com/avdeshjadon/Spotify-Home",
    study: {
      role: "CSS / Frontend Developer",
      timeline: "2024",
      context:
        "Replicating world-class applications like Spotify is an essential exercise in mastering advanced CSS layouts and design system nuances.",
      problem:
        "Recreating Spotify's sticky sidebar, scrollable content grid, sticky player bar, and dark theme gradients without relying on CSS frameworks.",
      process: [
        {
          title: "Layout Grid Structure",
          body: "Employed CSS Grid for the tri-pane layout (sidebar, main feed, right sidebar) and media player footer.",
        },
        {
          title: "Card Hover Transformations",
          body: "Implemented Spotify's signature green play button hover elevation with CSS transitions.",
        },
        {
          title: "Responsive Media Breakpoints",
          body: "Structured responsive adaptations for tablet and mobile viewport widths.",
        },
      ],
      decisions: [
        {
          title: "Pure Vanilla CSS",
          why: "Zero utility framework dependencies allowed full mastery of fundamental cascade and positioning mechanics.",
        },
        {
          title: "Custom scrollbar styling",
          why: "Styled native webkit scrollbars to match Spotify's sleek dark theme aesthetic perfectly.",
        },
      ],
      outcomes: [
        "Faithful replication of Spotify's desktop web player aesthetic",
        "Clean, maintainable CSS architecture with semantic naming conventions",
        "Smooth fluid card wrapping and responsive viewport adaptation",
      ],
      reflection:
        "Building this clone solidified my confidence in complex CSS Grid architectures and subtle aesthetic details.",
    },
  },

  {
    slug: "twitter-home",
    title: "Twitter Home — Layout & Feed UI Replica",
    tags: ["HTML5", "CSS3", "UI Replica", "Responsive Design"],
    year: "2024",
    oneLiner:
      "A static, responsive replica of Twitter's Home page UI built purely with HTML and CSS. Designed to mimic the core layout and styling of the original platform.",
    contribution:
      "UI developer — sticky three-column responsive structure, infinite feed typography, and interaction states.",
    coverLabel: "TWITTER CLONE",
    cover: {
      bg: "#000000",
      ink: "light",
      src: "/images/projects/X.svg",
      aspect: 300 / 271,
      mark: "TW",
    },
    repo: "https://github.com/avdeshjadon/Twitter-Home",
    study: {
      role: "Frontend Developer",
      timeline: "2024",
      context:
        "Social feed interfaces require precise typographical hierarchies, border alignments, and responsive column management.",
      problem:
        "Replicating Twitter's sticky left navigation, center infinite timeline, and right-hand trending widget while preserving responsive proportions.",
      process: [
        {
          title: "Three-Column Grid",
          body: "Structured navigation, feed, and search/trends columns using modern CSS Flexbox and sticky positioning.",
        },
        {
          title: "Tweet Card Components",
          body: "Coded modular tweet card items with avatars, handles, timestamps, media embeds, and action bars.",
        },
        {
          title: "Micro-State Styling",
          body: "Added subtle hover backgrounds, active navigation pills, and verified badge alignments.",
        },
      ],
      decisions: [
        {
          title: "Sticky sidebar columns",
          why: "Maintained sticky viewports for navigation and search widgets while timeline scrolls independently.",
        },
        {
          title: "SVG iconography",
          why: "Integrated crisp SVG icons for repost, like, bookmark, and share actions without raster blurring.",
        },
      ],
      outcomes: [
        "Pixel-accurate replica of Twitter's core timeline layout",
        "Adaptive column collapse for smaller display viewports",
        "Crisp typography and spacing matching the production application",
      ],
      reflection:
        "Dissecting Twitter's interface revealed how subtle borders and generous whitespace create effortless legibility in dense content feeds.",
    },
  },
];

