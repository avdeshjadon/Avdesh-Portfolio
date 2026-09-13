/* Portfolio by Avdesh Jadon — Full Stack Developer & Software Tester. */
"use client";

import type { ReactNode } from "react";
import styles from "./Scene.module.css";

export default function Scene({
  children,
  runway = 0,
  order,
  id,
  keepOnMobile = false,
}: {
  children: ReactNode;

  runway?: number;

  order: number;
  id?: string;

  keepOnMobile?: boolean;
}) {
  return (
    <>
      <div
        className={`${styles.hold} ${keepOnMobile ? styles.keepFrame : ""}`}
        data-scene={id ?? String(order)}
        style={{ zIndex: order }}
      >
        {children}
      </div>
      {runway > 0 && (
        <div
          className={`${styles.runway} ${keepOnMobile ? styles.keepRunway : ""}`}
          data-runway={id ?? String(order)}
          style={{ height: `calc(${runway} * 100svh)` }}
          aria-hidden="true"
        />
      )}
    </>
  );
}
