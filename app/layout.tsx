/* Portfolio by Avdesh Jadon — Full Stack Developer & Software Tester. */
import type { Metadata } from "next";
import { Inter, Instrument_Serif, Caveat, Anton } from "next/font/google";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Loader from "@/components/layout/Loader";
import { LanguageProvider } from "@/lib/i18n";
import { SITE_URL, PERSON } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-ui",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-script",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const DESCRIPTION =
  "Software Developer & Software Tester — building full-stack web apps, automation and end-to-end QA with React, Next.js, Node and TypeScript.";

const IMAGE = {
  url: `${SITE_URL}/about/hero-portrait.jpg`,
  width: 1408,
  height: 1117,
  alt: "Avdesh Jadon — Software Developer & Software Tester",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Avdesh Jadon — Software Developer & Software Tester",
    template: "%s",
  },
  description: DESCRIPTION,
  keywords: [
    "Avdesh Jadon",
    "Software Developer",
    "Software Tester",
    "Full Stack Developer",
    "College",
    "Agra",
    "QA",
    "React",
    "Next.js",
  ],
  creator: "Avdesh Jadon",
  authors: [{ name: "Avdesh Jadon", url: SITE_URL }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Avdesh Jadon — Software Developer & Software Tester",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Avdesh — Portfolio",
    type: "website",
    locale: "en_US",
    images: [IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avdesh Jadon — Software Developer & Software Tester",
    description: DESCRIPTION,
    images: [IMAGE.url],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSON.name,
  jobTitle: PERSON.jobTitle,
  email: `mailto:${PERSON.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Punjab, India",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: PERSON.university,
  },
  knowsAbout: [
    "Software Development",
    "Software Testing",
    "QA Engineering",
    "Full Stack Web Development",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
  ],
  url: SITE_URL,
  image: IMAGE.url,
  sameAs: PERSON.sameAs,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`av-boot ${inter.variable} ${instrumentSerif.variable} ${caveat.variable} ${anton.variable}`}
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{history.scrollRestoration="manual";if(!window.location.hash)window.scrollTo(0,0)}catch(e){}`,
          }}
        />
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}