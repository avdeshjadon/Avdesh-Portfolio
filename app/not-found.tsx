"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useLang();

  return (
    <main
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 24,
        gap: 0,
      }}
    >
      <p
        style={{
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: "0.2em",
          color: "var(--ink-3)",
        }}
      >
        {t("nf.label")}
      </p>
      <h1
        style={{
          marginTop: 18,
          fontWeight: 900,
          fontSize: "clamp(40px, 7vw, 88px)",
          letterSpacing: "-0.035em",
          lineHeight: 1,
        }}
      >
        {t("nf.h1")}
        <br />
        <em
          style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            color: "var(--accent)",
          }}
        >
          {t("nf.h1Em")}
        </em>
      </h1>
      <Link
        href="/"
        style={{
          marginTop: 34,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "var(--accent)",
          color: "#fff",
          fontWeight: 700,
          fontSize: 13,
          padding: "12px 22px",
          borderRadius: 999,
        }}
      >
        {t("nf.cta")}
      </Link>
    </main>
  );
}
