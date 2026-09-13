"use client";

/* Top bar for the lab route. Split out as a client component so the label
   follows the EN/FR choice — the page itself stays a server component so its
   noindex metadata is still emitted on the server. */

import Link from "next/link";
import { useLang } from "@/lib/i18n";

export default function LabBar() {
  const { t } = useLang();

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "18px 28px",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.08em",
        color: "var(--ink-3)",
      }}
    >
      <Link href="/" style={{ color: "var(--ink-2)", whiteSpace: "nowrap" }}>
        {t("lab.back")}
      </Link>
      <span style={{ textAlign: "right" }}>{t("lab.hint")}</span>
    </div>
  );
}
