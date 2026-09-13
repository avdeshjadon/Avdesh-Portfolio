"use client";

/*
 * THE PEOPLE BEHIND THE WORK — DriftWall.
 *
 * Built to the supplied DriftWall reference, in this portfolio's language:
 *   columns 5 · tilt 16° · turn -14° · perspective 1200 · depth 120
 *   speed 42px/s · direction up · variance 0.45 · parallax 0.6 · lift 64
 *   fade 0.6 · radius 14 · roll 0 · pauseOnHover false · grayscale false
 *
 * Two deliberate departures from the reference, both to keep Avdesh's own
 * photographs intact:
 *   · overlayColor #060010 → the portfolio's white ground, as instructed
 *   · dim 0.55 → tiles are NOT darkened. Depth reads through scale, the
 *     perspective itself and the soft edge mask, so every face stays bright.
 *
 * Tiles keep each photograph's TRUE aspect ratio rather than the reference's
 * fixed 200×132, so nothing is stretched and the column rhythm varies
 * naturally — the "slight variation between tiles" comes from the pictures.
 *
 * Columns wrap seamlessly: each column's content is rendered twice and the
 * offset wraps at half its height. Motion is a calm autonomous drift plus a
 * scroll contribution, so the wall is alive when still and responds as the
 * page moves. Pointer adds the parallax lean.
 */

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, EASE, prefersReducedMotion } from "@/lib/gsap";
import { sceneScrub } from "@/lib/scene";
import { FRAMES } from "@/content/gallery";
import { useLang } from "@/lib/i18n";
import styles from "./Gallery.module.css";

/* ---- DriftWall parameters (reference values) ---- */
const SPEED = 42; /* px/s base drift */
const VARIANCE = 0.45; /* per-column speed spread */
const PARALLAX = 0.6; /* pointer lean strength */
const LIFT = 64; /* px of scroll-driven travel added across the section */
const DIRECTION = -1; /* up */

/* Columns per breakpoint. Fewer than the reference's 5 on purpose: at 5 the
   tiles fell to ~220px wide, and these photographs deserve to be looked at.
   The wall thins out on small screens rather than shrinking to mush. */
const COLS_DESKTOP = 4;
const COLS_LAPTOP = 4;
const COLS_TABLET = 3;
const COLS_MOBILE = 2;

const colCount = (w: number) =>
  w >= 1400 ? COLS_DESKTOP : w >= 1100 ? COLS_LAPTOP : w >= 700 ? COLS_TABLET : COLS_MOBILE;

export default function Gallery() {
  const root = useRef<HTMLElement>(null);
  const { t } = useLang();

  /* Columns are computed on the client so the count can follow the viewport.
     Round-robin keeps Avdesh's numbering: 1,2,3,4,5 across the first row,
     then 6,7,8… so the sequence reads left-to-right down the wall. */
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

    /* per-column speed: alternating faster / slower, spread by VARIANCE */
    const speeds = colEls.map(
      (_, i) =>
        SPEED *
        (1 + (i % 2 === 0 ? 1 : -1) * VARIANCE * ((i + 1) / colEls.length)) *
        (i % 2 === 0 ? 1 : 0.84)
    );
    const offsets = colEls.map(() => 0);
    const halves = colEls.map((c) => Math.max(1, c.scrollHeight / 2));

    /* The wall is a flex child now, so `vh` no longer describes its height.
       Publish the measured height as --wall-h; tile sizing keys off it, which
       is what keeps every photograph whole inside the frame. */
    const view = el.querySelector<HTMLElement>(`.${styles.wallView}`);
    const measure = () => {
      if (view) el.style.setProperty("--wall-h", `${Math.round(view.clientHeight)}px`);
      colEls.forEach((c, i) => (halves[i] = Math.max(1, c.scrollHeight / 2)));
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (view) ro.observe(view);
    measure();

    /* scroll adds to the drift as the wall passes through the viewport */
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

    /* only animate while the wall is on screen */
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

    /* the Scene holds the wall on screen; this reads progress across its
       runway so the drift is driven by scroll while it is the active frame */
    const st = ScrollTrigger.create({
      ...sceneScrub(el),
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        scrollPush = self.progress * LIFT * 8;
      },
    });

    /* Pointer parallax — the whole wall leans. Mouse only: on a touch screen
       `pointermove` fires while dragging, so every swipe used to lurch the
       wall sideways and fight the scroll. A finger is not a hovering cursor. */
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

    /* The title must NEVER depend on a scroll trigger firing. A `gsap.from`
       with autoAlpha immediately hides the element and only restores it when
       its trigger fires — inside a sticky scene that trigger can fail to
       resolve, and the heading stays invisible forever. `fromTo` with
       immediateRender:false leaves the heading visible by default and only
       animates if the trigger does fire. Fail-safe, not fail-hidden. */
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

  /* deal the 14 frames into columns, round-robin, preserving Avdesh's order */
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
        {/* --cols is driven from JS so the grid can never disagree with the
            number of columns actually rendered */}
        <div className={styles.wall} style={{ "--cols": cols } as React.CSSProperties}>
          {columns.map((col, ci) => (
            <div className={styles.col} key={ci}>
              <div className={styles.colInner}>
                {/* rendered twice for the seamless wrap */}
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
        {/* soft edge mask — the reference's `fade`, as a mask rather than a
            dark overlay, so nothing is tinted */}
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
