# Avdesh Jadon — Portfolio

Personal portfolio of **Avdesh Jadon**, Full Stack Developer & Software Tester based in Antibes, France.

Built with [Next.js 16](https://nextjs.org/), React 19 and TypeScript, with GSAP + Lenis smooth-scroll animations and a Three.js tunnel experiment.

## Tech Stack

- **Framework** — Next.js (App Router), React 19
- **Language** — TypeScript
- **Animation** — GSAP, Lenis (smooth scroll), Three.js
- **Styling** — CSS Modules + global CSS (`app/globals.css`)
- **Fonts** — Google Fonts (Inter, Instrument Serif, Caveat, Anton) via `next/font`
- **Tooling** — ESLint

## Getting Started

```bash
# install dependencies
npm install

# start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script            | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start the development server     |
| `npm run build`   | Create a production build        |
| `npm run start`   | Serve the production build       |
| `npm run lint`    | Run ESLint                       |

## Project Structure

```
app/            Routes, layout and pages (/, /work, /work/[slug], /tunnel)
components/     UI, sections, layout and lab components
content/        Data — projects, experience, journey, certifications, gallery, stack
lib/            Site config, i18n strings, GSAP/Lenis/Three setup
public/         Static assets and images
```

## Content & Configuration

- **Personal info & URLs** — `lib/site.ts` (single source of truth for sitemap, robots, OG and JSON-LD)
- **Site copy** — `lib/i18n.tsx` (English-only string dictionary)
- **Projects / experience / etc.** — `content/` as typed TS data files

> Set `NEXT_PUBLIC_SITE_URL` once the production domain exists; everything else (sitemap, robots, OG, JSON-LD) picks it up automatically.

## SEO

Includes metadata, Open Graph, Twitter cards, JSON-LD (`Person` schema), `sitemap.ts` and `robots.ts`.

## License

Personal project — © Avdesh Jadon.