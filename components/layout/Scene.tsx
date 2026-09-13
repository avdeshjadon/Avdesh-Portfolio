"use client";

/*
 * SCENE — one stacked full-screen frame.
 *
 * ── The architecture, and why it is shaped this way ────────────────────
 *
 * A Scene renders TWO SIBLINGS directly into <main>:
 *
 *   <div class="hold">   position: sticky; top: 0; height: 100svh; z-index: n
 *   <div class="runway"> pure scroll distance, for scroll-driven interiors
 *
 * They are siblings — deliberately NOT nested in a per-scene wrapper. A
 * sticky element is released when its CONTAINING BLOCK runs out. If each
 * hold sat inside its own wrapper, it would unstick at the exact instant the
 * next scene's top entered the viewport, so the two could never overlap and
 * you would be back to ordinary scrolling. With <main> as the shared
 * containing block, a hold STAYS stuck at the top of the viewport while the
 * next hold — a later sibling with a higher z-index and an opaque background
 * — rises up from the bottom and covers it.
 *
 * That is the whole effect: the outgoing frame does not move, the incoming
 * frame slides up over it. It is native sticky driven by native scroll, so
 * it is perfectly scrubbable — stop halfway and the incoming frame stays
 * halfway across, to the pixel. Nothing is timed; nothing can snap or jump.
 *
 * `runway` is extra scroll distance (in viewport heights) for scenes whose
 * interior is scroll-driven: tunnel travel, journey chapters, the card arc,
 * the decks, the drift wall. Those sections scrub against their own trigger
 * over that distance and must NOT use ScrollTrigger `pin: true` — the sticky
 * hold already pins them, and two pinning mechanisms fight.
 */

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
  /** extra scroll length, in viewport heights, for scroll-driven interiors */
  runway?: number;
  /** paint order — later scenes must cover earlier ones */
  order: number;
  id?: string;
  /**
   * Keep the full-screen frame on phones too. Only for scenes that genuinely
   * fill one screen at that size (the tunnel, the journey, the drift wall).
   * Everything else releases into normal flow on mobile, because a 100svh
   * frame would clip a tall stacked layout — see Scene.module.css.
   */
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
