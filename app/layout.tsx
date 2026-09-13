import type { Metadata } from "next";
import { Inter, Instrument_Serif, Caveat, Anton } from "next/font/google";
import SmoothScroll from "@/components/layout/SmoothScroll";
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

/* Condensed single-weight display face for the My Creative Hunch lockup —
   without it the editorial title collapses to a stretched regular weight. */
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const DESCRIPTION =
  "Full Stack Developer & Software Tester building web and app products for climate-tech and AI — React, Next.js, Node and end-to-end QA. Based in Antibes, France.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Avdesh Jadon — Full Stack Developer & Software Tester",
    template: "%s",
  },
  description: DESCRIPTION,
  openGraph: {
    title: "Avdesh Jadon — Full Stack Developer & Software Tester",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Avdesh — Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avdesh Jadon — Full Stack Developer & Software Tester",
    description: DESCRIPTION,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSON.name,
  jobTitle: PERSON.jobTitle,
  email: `mailto:${PERSON.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Antibes", addressCountry: "FR" },
  url: SITE_URL,
  sameAs: PERSON.sameAs,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${caveat.variable} ${anton.variable}`}
    >
      <body>
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
