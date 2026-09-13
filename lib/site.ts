/* Single source of truth for site-wide constants.
   Set NEXT_PUBLIC_SITE_URL in Vercel once the domain exists —
   everything (sitemap, robots, OG, JSON-LD) follows automatically. */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const PERSON = {
  name: "Avdesh Jadon",
  jobTitle: "Full Stack Developer & Software Tester",
  email: "avdeshjadon.dev@gmail.com",
  location: "Antibes, France",
  /* ⚠ PLACEHOLDER profile URLs — replace with the real ones when ready.
     Everything here is only meta (JSON-LD, sitemap); the visible socials
     live in components/sections/Connect/Connect.tsx. */
  sameAs: [
    "https://www.linkedin.com/in/avdesh-jadon-",
    "https://github.com/avdeshjadon",
    "https://www.instagram.com/itsavdeshjadon",
  ],
};
