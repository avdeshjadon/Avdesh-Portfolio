/* THE JOURNEY — the chapters the light tunnel travels through.
 *
 * ⚠ SOURCING: every fact here traces to Avdesh's CV (mirrored in
 * content/experience.ts) — companies, dates, places, roles and outcomes.
 * The 2021 chapter carries only what he stated himself: the year and
 * Telangana. Nothing biographical is invented around it.
 *
 * ⚠ CONTENT: the engineering framing here is placeholder copy written for
 * the developer/tester repositioning — the facts (companies, years, places,
 * wins) are real, the technical framing is to be confirmed in edit.
 *
 * Shape per chapter:
 *   year   — shown large, the anchor
 *   title  — what the chapter is about, in his voice
 *   place  — where it happened (context line)
 *   story  — what was actually happening, 2–3 sentences
 *   bridge — how it handed over to the next chapter (the transition line)
 *
 * `fr` mirrors every translatable field (see lib/i18n.tsx -> L()). Company,
 * product and place names stay as they are. French runs ~15% longer than
 * English, so the copy is written to length, not translated literally. */

export type Chapter = {
  id: string;
  year: string;
  title: string;
  place: string;
  story: string;
  bridge: string;
  fr?: { title?: string; place?: string; story?: string; bridge?: string };
};

export const CHAPTERS: Chapter[] = [
  {
    id: "roots",
    year: "2021",
    title: "Roots",
    place: "Telangana, India",
    story:
      "Where the story starts. Southern India — the fixed point everything after it gets measured against: seven roles, two countries, and one deliberate change of craft.",
    bridge: "It started with a sales target, not a stack.",
    fr: {
      title: "Racines",
      place: "Telangana, Inde",
      story:
        "Là où l’histoire commence. Le sud de l’Inde — le point fixe auquel tout se mesure ensuite : sept postes, deux pays, et un changement de métier assumé.",
      bridge: "Cela a commencé par un objectif de vente, pas par une stack.",
    },
  },
  {
    id: "customers",
    year: "2022",
    title: "Customers first, code much later",
    place: "Tutorac → Sage Finance · Telangana",
    story:
      "Business development for a subscription e-learning platform: reading why people renewed, why they left, and what actually moved a portfolio. $50K+ in subscriptions in a single month. By September I had moved to Sage Finance.",
    bridge:
      "Two years of asking customers questions before I ever wrote a feature — still the part of my process I trust most.",
    fr: {
      title: "Les clients d’abord, le code bien plus tard",
      place: "Tutorac → Sage Finance · Telangana",
      story:
        "Développement commercial pour une plateforme d’e-learning par abonnement : comprendre pourquoi on renouvelle, pourquoi on part, ce qui fait vraiment bouger un portefeuille. Plus de 50 000 $ d’abonnements en un mois. En septembre, je rejoignais Sage Finance.",
      bridge:
        "Deux ans à interroger des clients avant d’écrire la moindre fonctionnalité — c’est resté la partie de mon processus en laquelle j’ai le plus confiance.",
    },
  },
  {
    id: "playbook",
    year: "2023",
    title: "Writing the playbook",
    place: "Sage Finance · Telangana, India",
    story:
      "A full year owning sales strategy and client acquisition: market analysis, segmentation, pipeline against tracked KPIs. I wrote the inbound-to-close playbook the wider sales team adopted, and a $20K+ week turned into a promotion to Marketing Team Lead.",
    bridge:
      "That playbook was the first time I designed a system instead of working inside one. I wanted to learn how to build them properly.",
    fr: {
      title: "Écrire le playbook",
      place: "Sage Finance · Telangana, Inde",
      story:
        "Une année entière à piloter la stratégie commerciale et l’acquisition client : analyse de marché, segmentation, pipeline face aux KPI suivis. J’ai écrit le playbook inbound-to-close adopté par toute l’équipe, et une semaine à plus de 20 000 $ est devenue une promotion au marketing.",
      bridge:
        "Ce playbook a été la première fois que je concevais un système au lieu de travailler dedans. Restait à apprendre à les construire.",
    },
  },
  {
    id: "france",
    year: "2024",
    title: "Starting over, in French",
    place: "Montpellier Business School · France",
    story:
      "August closed the India chapter. September opened an MSc in International Business at Montpellier Business School — new country, new language, and the formal training my instincts had been running without.",
    bridge: "Business school handed me the vocabulary. The next year handed me the craft.",
    fr: {
      title: "Tout recommencer, en français",
      place: "Montpellier Business School · France",
      story:
        "Août a refermé le chapitre indien. Septembre a ouvert un MSc International Business à Montpellier Business School — nouveau pays, nouvelle langue, et la formation qui manquait à des intuitions déjà en marche.",
      bridge: "L’école m’a donné le vocabulaire. L’année suivante m’a donné le métier.",
    },
  },
  {
    id: "three-rooms",
    year: "2025",
    title: "Three rooms, one question",
    place: "Montpellier · Los Gatos (remote) · Paris",
    story:
      "Three roles in one year. Web performance and SEO at Site Web & Co — 35% organic growth, won by fixing templates rather than pages. Human-in-the-loop AI at Oigetit — validating a misinformation engine and teaching it to explain itself. Process and data analysis at V Raise in Paris — 12% efficiency across logistics workflows.",
    bridge:
      "Measurement, trust and systems: three different rooms, all asking how you make something complex feel obvious. That question has a job title.",
    fr: {
      title: "Trois terrains, une seule question",
      place: "Montpellier · Los Gatos (à distance) · Paris",
      story:
        "Trois postes en un an. Performance web et SEO chez Site Web & Co — +35 % de trafic organique, gagnés en corrigeant les gabarits plutôt que les pages. IA « human-in-the-loop » chez Oigetit — valider un moteur anti-désinformation et lui apprendre à s’expliquer. Analyse de processus et de données chez V Raise à Paris — +12 % d’efficacité sur les flux logistiques.",
      bridge:
        "Mesure, confiance, systèmes : trois terrains différents, une même question — comment rendre le complexe évident ? Cette question a un intitulé de poste.",
    },
  },
  {
    id: "product",
    year: "2026",
    title: "The job it was heading toward",
    place: "Sophia Antipolis, France",
    story:
      "March: first place at the UNBIAS hackathon with LockAI, a privacy-first offline AI assistant — three working prototypes, an on-device AI workflow and a demo-first pitch in one sprint. May: I joined Heeding as a full stack developer, building the sustainable-fuel marketplace aimed at a billion tonnes of avoided CO₂.",
    bridge:
      "Selling taught me customers. Analysis taught me systems. Engineering is where the two finally do the same job.",
    fr: {
      title: "Le métier vers lequel tout allait",
      place: "Sophia Antipolis, France",
      story:
        "Mars : première place au hackathon UNBIAS avec LockAI, un assistant IA hors-ligne axé confidentialité — trois prototypes fonctionnels, un workflow IA embarqué et un pitch basé sur la démo en un sprint. Mai : je rejoignais Heeding comme développeur full stack, pour construire la marketplace de carburants durables visant un milliard de tonnes de CO₂ évitées.",
      bridge:
        "La vente m’a appris les clients. L’analyse m’a appris les systèmes. L’ingénierie est l’endroit où les deux font enfin le même travail.",
    },
  },
];