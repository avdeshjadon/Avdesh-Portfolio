import type { Metadata } from "next";
import TunnelType from "@/components/lab/TunnelType";
import LabBar from "./LabBar";

/* Isolated preview of the tunnel-through-type effect.
   Nothing else in the portfolio references this route — it exists so the
   effect can be approved on its own before it's placed. */

export const metadata: Metadata = {
  title: "Tunnel Type — Lab · Avdesh",
  robots: { index: false },
};

export default function TunnelLab() {
  return (
    <main
      style={{
        height: "100svh",
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        overflow: "hidden",
      }}
    >
      <LabBar />

      <div style={{ flex: 1, minHeight: 0 }}>
        <TunnelType text="AVDESH" />
      </div>
    </main>
  );
}
