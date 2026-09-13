/* Portfolio by Avdesh Jadon — Full Stack Developer & Software Tester. */
import type { Metadata } from "next";
import TunnelType from "@/components/tunnel/TunnelType";
import LabBar from "@/components/layout/LabBar";

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
