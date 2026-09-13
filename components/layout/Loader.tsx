/* Portfolio by Avdesh Jadon — Full Stack Developer & Software Tester. */
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import styles from "./Loader.module.css";

const LETTERS = ["A", "V", "D", "E", "S", "H"];

const MIN_SHOW_MS = 4400;

export default function Loader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let tl: gsap.core.Timeline | null = null;

    const unhide = () => {
      document.documentElement.classList.remove("av-loading");
    };
    const finish = () => {
      unhide();
      setGone(true);
    };

    const el = rootRef.current;

    const run = () => {
      if (!el) {
        finish();
        return;
      }
      if (el.dataset.avBoot) return;
      el.dataset.avBoot = "1";

      tl = gsap.timeline({
        onComplete: () => {
          tl = null;
          finish();
        },
      });

      const chars = Array.from(el.querySelectorAll<HTMLElement>(`.${styles.char}`));
      const dot = el.querySelector<HTMLElement>(`.${styles.dot}`);
      const tag = el.querySelector<HTMLElement>(`.${styles.tag}`);
      const corners = Array.from(el.querySelectorAll<HTMLElement>(`.${styles.cornerSlot}`));
      const cornerInners = Array.from(el.querySelectorAll<HTMLElement>(`.${styles.cornerInner}`));
      const name = el.querySelector<HTMLElement>(`.${styles.name}`);

      const zoomScale = (() => {
        if (!name) return 6;
        const fs = parseFloat(getComputedStyle(name).fontSize);
        if (!fs) return 6;
        return (window.innerHeight * 0.62) / fs;
      })();

      tl.fromTo(
        chars,
        { yPercent: 115, rotate: 2 },
        { yPercent: 0, rotate: 0, duration: 1, stagger: 0.065, ease: "expo.out" }
      )
        .fromTo(dot, { scale: 0.15 }, { scale: 1.2, duration: 0.65, ease: "back.out(2.5)" }, 0.85)
        .fromTo(tag, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: "expo.out" }, 1.5)
        .fromTo(corners, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, stagger: 0.06 }, 1.7)
        .fromTo(
          cornerInners,
          { scaleX: 0, scaleY: 0 },
          { scaleX: 1, scaleY: 1, duration: 0.5, ease: "expo.out" },
          1.7
        )
        .to(
          name,
          { scale: zoomScale, autoAlpha: 0, duration: 1.4, ease: "power2.inOut" },
          2.9
        )
        .to(tag, { autoAlpha: 0, y: -18, duration: 0.7, ease: "power2.in" }, 2.9)
        .to(corners, { autoAlpha: 0, duration: 0.5 }, 2.9)
        .add(() => unhide(), 3.2)
        .to(el, { autoAlpha: 0, duration: 1.0, ease: "power2.inOut" }, 3.2);

      const now = tl.duration();
      const extra = MIN_SHOW_MS / 1000 - now;
      if (extra > 0) tl.to({}, { duration: extra, ease: "none" });
    };

    if (prefersReducedMotion()) {
      const t = setTimeout(finish, 2400);
      return () => clearTimeout(t);
    }

    let t1: ReturnType<typeof setTimeout> | null = null;
    Promise.race([
      document.fonts.ready.catch(() => {}),
      new Promise<void>((res) => {
        t1 = setTimeout(res, 1200);
      }),
    ]).then(() => run());

    const safety = setTimeout(finish, 6500);

    return () => {
      if (t1) clearTimeout(t1);
      clearTimeout(safety);
      tl?.kill();
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`${styles.overlay} av-loader`} ref={rootRef} aria-hidden="true">
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