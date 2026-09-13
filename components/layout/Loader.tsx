/* Portfolio by Avdesh Jadon — Full Stack Developer & Software Tester. */
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import styles from "./Loader.module.css";

const LETTERS = ["A", "V", "D", "E", "S", "H"];

const MIN_SHOW_MS = 4500;

export default function Loader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let tl: gsap.core.Timeline | null = null;

    const reveal = () => {
      document.documentElement.classList.remove("av-loading");
      setGone(true);
    };

    const el = rootRef.current;

    const run = () => {
      if (!el) {
        reveal();
        return;
      }
      if (el.dataset.avBoot) return;
      el.dataset.avBoot = "1";

      tl = gsap.timeline({
        onComplete: () => {
          tl = null;
          reveal();
        },
      });

      const chars = Array.from(el.querySelectorAll<HTMLElement>(`.${styles.char}`));
      const dot = el.querySelector<HTMLElement>(`.${styles.dot}`);
      const ring = el.querySelector<HTMLElement>(`.${styles.ring}`);
      const tag = el.querySelector<HTMLElement>(`.${styles.tag}`);
      const corners = Array.from(el.querySelectorAll<HTMLElement>(`.${styles.cornerSlot}`));
      const cornerInners = Array.from(el.querySelectorAll<HTMLElement>(`.${styles.cornerInner}`));

      tl.fromTo(
        chars,
        { yPercent: 118, rotate: 4 },
        { yPercent: 0, rotate: 0, duration: 1, stagger: 0.065, ease: "expo.out" }
      )
        .fromTo(
          ring,
          { autoAlpha: 0, scale: 0.7 },
          { autoAlpha: 1, scale: 1, rotate: 360, duration: 0.95, ease: "power2.out" },
          0
        )
        .fromTo(dot, { scale: 0.15 }, { scale: 1.2, duration: 0.65, ease: "back.out(2.5)" }, 0.9)
        .fromTo(tag, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: "expo.out" }, 1.5)
        .fromTo(corners, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, stagger: 0.06 }, 1.7)
        .fromTo(
          cornerInners,
          { scaleX: 0, scaleY: 0 },
          { scaleX: 1, scaleY: 1, duration: 0.5, ease: "expo.out" },
          1.7
        )
        .to(chars, { scale: 1.025, duration: 0.55, ease: "power2.inOut", yoyo: true, repeat: 1 }, 2.35)
        .to(ring, { autoAlpha: 0, duration: 0.45, ease: "power2.inOut" }, 2.7)
        .to(el, { scale: 1.04, opacity: 0, duration: 1.2, ease: "power3.inOut" }, 3.3);

      const now = tl.duration();
      const extra = MIN_SHOW_MS / 1000 - now;
      if (extra > 0) tl.to({}, { duration: extra, ease: "none" });
    };

    if (prefersReducedMotion()) {
      const t = setTimeout(reveal, 2400);
      return () => clearTimeout(t);
    }

    let t1: ReturnType<typeof setTimeout> | null = null;
    Promise.race([
      document.fonts.ready.catch(() => {}),
      new Promise<void>((res) => {
        t1 = setTimeout(res, 1200);
      }),
    ]).then(() => run());

    const safety = setTimeout(reveal, 6500);

    return () => {
      if (t1) clearTimeout(t1);
      clearTimeout(safety);
      tl?.kill();
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`${styles.overlay} av-loader`} ref={rootRef} aria-hidden="true">
      <span className={styles.ring} />
      <div className={styles.frame}>
        <span className={`${styles.cornerSlot} ${styles.cTL}`}><span className={styles.cornerInner} /></span>
        <span className={`${styles.cornerSlot} ${styles.cTR}`}><span className={styles.cornerInner} /></span>
        <span className={`${styles.cornerSlot} ${styles.cBL}`}><span className={styles.cornerInner} /></span>
        <span className={`${styles.cornerSlot} ${styles.cBR}`}><span className={styles.cornerInner} /></span>
      </div>
      <div className={styles.inner}>
        <p className={styles.name}>
          {LETTERS.map((ch) => (
            <span className={styles.mask} key={ch}>
              <span className={styles.char}>{ch}</span>
            </span>
          ))}
          <span className={styles.mask}>
            <span className={`${styles.char} ${styles.dot}`}>.</span>
          </span>
        </p>
        <p className={styles.tag}>Software Developer &amp; Software Tester</p>
      </div>
    </div>
  );
}