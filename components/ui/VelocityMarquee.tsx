/* Portfolio by Avdesh Jadon — Full Stack Developer & Software Tester. */
"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import styles from "./VelocityMarquee.module.css";

export type MarqueeRow = {
  items: string[];

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

      const y = window.scrollY;
      const vRaw = dt > 0 ? (y - lastY) / dt : 0;
      lastY = y;
      boost += (gsap.utils.clamp(-3000, 3000, vRaw) - boost) * 0.1;

      const dirFromScroll = boost < -40 ? -1 : 1; 

      const accel = 1 + Math.min(Math.abs(boost) / 1400, 1.2);

      state.forEach((s) => {
        const pxDelta = s.base * dirFromScroll * accel * dt;

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
      {}
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
