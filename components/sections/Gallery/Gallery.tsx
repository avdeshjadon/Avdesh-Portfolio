/* Portfolio by Avdesh Jadon — Full Stack Developer & Software Tester. */
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, EASE, prefersReducedMotion } from "@/lib/gsap";
import { sceneScrub } from "@/lib/scene";
import { FRAMES } from "@/content/gallery";
import { useLang } from "@/lib/i18n";
import styles from "./Gallery.module.css";

const SPEED = 42; 
const VARIANCE = 0.45; 
const PARALLAX = 0.6; 
const LIFT = 64; 
const DIRECTION = -1; 

const COLS_DESKTOP = 4;
const COLS_LAPTOP = 4;
const COLS_TABLET = 3;
const COLS_MOBILE = 2;

const colCount = (w: number) =>
  w >= 1400 ? COLS_DESKTOP : w >= 1100 ? COLS_LAPTOP : w >= 700 ? COLS_TABLET : COLS_MOBILE;

export default function Gallery() {
  const root = useRef<HTMLElement>(null);
  const { t } = useLang();

  const [cols, setCols] = useState<number>(COLS_DESKTOP);

  useEffect(() => {
    const apply = () => setCols(colCount(window.innerWidth));
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const colEls = gsap.utils.toArray<HTMLElement>(`.${styles.colInner}`);
    if (!colEls.length) return;

    const speeds = colEls.map(
      (_, i) =>
        SPEED *
        (1 + (i % 2 === 0 ? 1 : -1) * VARIANCE * ((i + 1) / colEls.length)) *
        (i % 2 === 0 ? 1 : 0.84)
    );
    const offsets = colEls.map(() => 0);
    const halves = colEls.map((c) => Math.max(1, c.scrollHeight / 2));

    const view = el.querySelector<HTMLElement>(`.${styles.wallView}`);
    const measure = () => {
      if (view) el.style.setProperty("--wall-h", `${Math.round(view.clientHeight)}px`);
      colEls.forEach((c, i) => (halves[i] = Math.max(1, c.scrollHeight / 2)));
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (view) ro.observe(view);
    measure();

    let scrollPush = 0;

    const tick = (_t: number, dt: number) => {
      const f = Math.min(dt / 1000, 0.05);
      colEls.forEach((c, i) => {
        offsets[i] = (offsets[i] + speeds[i] * f) % halves[i];
        const total =
          (offsets[i] + scrollPush * (0.72 + (i % 3) * 0.24)) % halves[i];
        c.style.transform = `translate3d(0, ${(DIRECTION * total).toFixed(2)}px, 0)`;
      });
    };

    let running = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          gsap.ticker.add(tick);
          running = true;
        } else if (!entry.isIntersecting && running) {
          gsap.ticker.remove(tick);
          running = false;
        }
      },
      { rootMargin: "150px" }
    );
    io.observe(el);

    const st = ScrollTrigger.create({
      ...sceneScrub(el),
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        scrollPush = self.progress * LIFT * 8;
      },
    });

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const wall = el.querySelector<HTMLElement>(`.${styles.wall}`);
    let onMove: ((e: PointerEvent) => void) | null = null;
    if (wall && finePointer) {
      const px = gsap.quickTo(wall, "x", { duration: 1.2, ease: "power3.out" });
      const py = gsap.quickTo(wall, "y", { duration: 1.2, ease: "power3.out" });
      onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const cx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        const cy = ((e.clientY - r.top) / r.height - 0.5) * 2;
        px(cx * 30 * PARALLAX);
        py(cy * 20 * PARALLAX);
      };
      el.addEventListener("pointermove", onMove);
    }

    gsap.fromTo(
      `.${styles.head} > *`,
      { y: 36, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: EASE.outExpo,
        stagger: 0.09,
        immediateRender: false,
        scrollTrigger: { trigger: el, start: "top 90%" },
      }
    );

    return () => {
      if (running) gsap.ticker.remove(tick);
      io.disconnect();
      ro.disconnect();
      st.kill();
      if (onMove) el.removeEventListener("pointermove", onMove);
    };
  }, [cols]);

  const columns: (typeof FRAMES)[] = Array.from({ length: cols }, () => []);
  FRAMES.forEach((f, i) => columns[i % cols].push(f));

  return (
    <section className={styles.gallery} id="gallery" ref={root}>
      <div className={styles.head}>
        <p className={styles.eyebrow}>
          <span>08</span> {t("gallery.eyebrow")}
        </p>
        <h2 className={styles.h2}>
          {t("gallery.h2a")}{" "}
          <em className={styles.serif}>{t("gallery.h2Em")}</em>
        </h2>
        <p className={styles.lede}>{t("gallery.lede")}</p>
      </div>

      <div className={styles.wallView}>
        {
}
        <div className={styles.wall} style={{ "--cols": cols } as React.CSSProperties}>
          {columns.map((col, ci) => (
            <div className={styles.col} key={ci}>
              <div className={styles.colInner}>
                {}
                {[...col, ...col].map((f, i) => (
                  <figure
                    className={styles.tile}
                    key={`${f.id}-${i}`}
                    style={{ "--ar": f.ar } as React.CSSProperties}
                    aria-hidden={i >= col.length}
                  >
                    <img
                      src={f.src}
                      alt={i < col.length ? t("gallery.alt") : ""}
                      loading={ci < 3 && i < 2 ? "eager" : "lazy"}
                      decoding="async"
                      draggable={false}
                    />
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </div>
        {
}
        <div className={styles.fade} aria-hidden="true" />
      </div>

      <div className={styles.foot}>
        <span className={styles.count}>
          {String(FRAMES.length).padStart(2, "0")} {t("gallery.frames")}
        </span>
        <span className={styles.hint}>{t("gallery.hint")}</span>
      </div>
    </section>
  );
}
