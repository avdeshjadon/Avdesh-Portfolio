"use client";

/*
 * VelocityMarquee — scroll-velocity marquee, rebuilt from scratch
 * (ReactBits ScrollVelocity as the interaction benchmark).
 *
 * · each row drifts continuously in its own base direction
 * · scrolling accelerates the drift; scrolling up flips the direction
 * · seamless infinite wrap: 4 copies per row, xPercent wrapped in (-25, 0]
 * · transform-only, one shared gsap ticker, reduced-motion → static rows
 */

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import styles from "./VelocityMarquee.module.css";

export type MarqueeRow = {
  items: string[];
  /** px-per-second feel; sign sets base direction (positive = leftward) */
  velocity: number;
  outline?: boolean;
};

const COPIES = 4;

function RowCopy({ items, outline }: { items: string[]; outline?: boolean }) {
  return (
    <span className={styles.copy} aria-hidden="true">
      {items.map((t) => (
        <span key={t} className={styles.item}>
          <span className={outline ? styles.outlineText : styles.solidText}>{t}</span>
          <span className={styles.sep}>✦</span>
        </span>
      ))}
    </span>
  );
}

export default function VelocityMarquee({ rows }: { rows: MarqueeRow[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const tracks = Array.from(el.querySelectorAll<HTMLElement>(`.${styles.track}`));
    const state = tracks.map((track, i) => ({
      track,
      x: 0,
      /* velocity is TRUE px/s (sign = direction), so both rows read at the
         same calm pace regardless of how wide their content happens to be */
      base: rows[i]?.velocity ?? 40,
      copyPx: 1,
    }));

    const measure = () => {
      state.forEach((s) => {
        s.copyPx = Math.max(1, s.track.scrollWidth / COPIES);
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    const wrap = gsap.utils.wrap(-25, 0);
    let lastY = window.scrollY;
    let lastT = performance.now();
    let boost = 0;

    const tick = () => {
      const now = performance.now();
      const dt = Math.min((now - lastT) / 1000, 0.05);
      lastT = now;

      /* scroll velocity (px/s), heavily smoothed */
      const y = window.scrollY;
      const vRaw = dt > 0 ? (y - lastY) / dt : 0;
      lastY = y;
      boost += (gsap.utils.clamp(-3000, 3000, vRaw) - boost) * 0.1;

      const dirFromScroll = boost < -40 ? -1 : 1; /* scrolling up reverses */
      /* gentle: scrolling at most doubles the pace */
      const accel = 1 + Math.min(Math.abs(boost) / 1400, 1.2);

      state.forEach((s) => {
        const pxDelta = s.base * dirFromScroll * accel * dt;
        /* one copy = 25 xPercent of the 4-copy track */
        s.x -= (pxDelta / s.copyPx) * 25;
        gsap.set(s.track, { xPercent: wrap(s.x) });
      });
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      ro.disconnect();
    };
  }, [rows]);

  return (
    <div className={styles.marquee} ref={root}>
      {/* accessible summary for screen readers; visual rows are decorative */}
      <p className={styles.srOnly}>
        Skills: {rows.flatMap((r) => r.items).join(", ")}
      </p>
      {rows.map((row, i) => (
        <div className={styles.row} key={i}>
          <div className={styles.track}>
            {Array.from({ length: COPIES }).map((_, c) => (
              <RowCopy key={c} items={row.items} outline={row.outline} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
