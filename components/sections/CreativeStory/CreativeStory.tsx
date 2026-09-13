/* Portfolio by Avdesh Jadon — Full Stack Developer & Software Tester. */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ScrollTrigger } from "@/lib/gsap";
import { sceneScrub } from "@/lib/scene";
import styles from "./CreativeStory.module.css";
import { useLang } from "@/lib/i18n";
import { scrollToHash } from "@/lib/lenis";

const RAIL = ["Idea", "Build", "Develop", "Deploy", "Impact"];

const LABELS = [
  { text: "AI.", pos: styles.posAi, cls: styles.labelAi },
  { text: "SYSTEMS.", pos: styles.posSys, cls: styles.labelSys },
  { text: "WEB.", pos: styles.posWeb, cls: styles.labelWeb },
  { text: "APIs.", pos: styles.posApi, cls: styles.labelApi },
  { text: "AUTOMATION.", pos: styles.posAuto, cls: styles.labelAuto },
];

const DOORS = [
  {
    key: "who",
    num: "01",
    kicker: "( Identity )",
    img: "/about/hero-portrait.jpg",
    alt: "",
    title: ["Who", "I Am"],
    sub: "Avdesh — full stack developer & software tester.",
    theme: styles.themeWho,
    air: false,
  },
  {
    key: "what",
    num: "02",
    kicker: "( Craft )",
    img: "/about/aircraft.jpg",
    alt: "",
    title: ["What", "I Do"],
    sub: "Web · App · Code",
    theme: styles.themeWhat,
    air: true,
  },
  {
    key: "think",
    num: "03",
    kicker: "( Approach )",
    img: "/about/portrait.jpg",
    alt: "",
    title: ["How", "I Think"],
    sub: "Idea · Build · Develop · Deploy · Impact",
    theme: styles.themeThink,
    air: false,
  },
] as const;

type DoorId = "who" | "what" | "think";

const S2_RANGE_DESK = 2.4;
const S2_RANGE_MOBILE = 1.8;
const TR_RANGE_DESK = 3.4;
const TR_RANGE_MOBILE = 2.8;
const TR_SPAN = 0.34;
const MOBILE_CUT = 1000;

const LINE_RANGES: [number, number][] = [
  [0.08, 0.36],
  [0.2, 0.5],
  [0.32, 0.64],
];
const META_RANGE: [number, number] = [0.02, 0.22];
const LABEL_START = 0.66;
const LABEL_STEP = 0.045;
const LABEL_SPAN = 0.16;
const FINAL_ROT = [-6, -3, -4, 3, -2];
const EXTRA_ROT = [10, -8, 9, -10, 7];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const sub = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

type TileCfg = {
  r: [number, number, number, number];
  d: [number, number];
  rot: number;
  s: number;
  inv: boolean;
};

const TILES_DESKTOP: TileCfg[] = [
  { r: [0, 0, 0.34, 0.21], d: [-0.5, -0.15], rot: -2.5, s: 0.3, inv: false },
  { r: [0.34, 0, 0.32, 0.21], d: [0.04, -0.5], rot: 0.5, s: 0.36, inv: true },
  { r: [0.66, 0, 0.34, 0.21], d: [0.55, -0.2], rot: 2, s: 0.33, inv: false },
  { r: [0, 0.21, 0.26, 0.26], d: [-0.6, 0.05], rot: -2, s: 0.4, inv: false },
  { r: [0.26, 0.21, 0.24, 0.26], d: [-0.22, 0.45], rot: -1.5, s: 0.52, inv: true },
  { r: [0.5, 0.21, 0.22, 0.26], d: [0.24, -0.4], rot: 1.5, s: 0.5, inv: false },
  { r: [0.72, 0.21, 0.28, 0.26], d: [0.62, -0.08], rot: 2.5, s: 0.37, inv: false },
  { r: [0, 0.47, 0.3, 0.29], d: [-0.55, 0.28], rot: -2, s: 0.44, inv: false },
  { r: [0.3, 0.47, 0.33, 0.29], d: [0.05, 0.55], rot: 1, s: 0.58, inv: false },
  { r: [0.63, 0.47, 0.37, 0.29], d: [0.6, 0.22], rot: 2, s: 0.42, inv: true },
  { r: [0, 0.76, 0.55, 0.24], d: [-0.32, 0.5], rot: -1, s: 0.47, inv: false },
  { r: [0.55, 0.76, 0.45, 0.24], d: [0.38, 0.5], rot: 1.5, s: 0.49, inv: false },
];

const TILES_MOBILE: TileCfg[] = [
  { r: [0, 0, 0.5, 0.33], d: [-0.34, -0.2], rot: -1.5, s: 0.3, inv: false },
  { r: [0.5, 0, 0.5, 0.33], d: [0.34, -0.25], rot: 1, s: 0.36, inv: true },
  { r: [0, 0.33, 0.55, 0.35], d: [-0.36, 0.15], rot: -1, s: 0.42, inv: false },
  { r: [0.55, 0.33, 0.45, 0.35], d: [0.36, 0.1], rot: 1.5, s: 0.5, inv: false },
  { r: [0, 0.68, 0.5, 0.32], d: [-0.3, 0.35], rot: -1, s: 0.46, inv: true },
  { r: [0.5, 0.68, 0.5, 0.32], d: [0.3, 0.4], rot: 1, s: 0.56, inv: false },
];

type Tile = {
  el: HTMLDivElement;
  content: HTMLElement;
  seam: HTMLElement;
  cfg: TileCfg;
};

export default function CreativeStory() {
  const root = useRef<HTMLElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const doorRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const lastOpenRef = useRef<DoorId | null>(null);
  const [open, setOpen] = useState<DoorId | null>(null);
  const [flash, setFlash] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const q = (sel: string) => el.querySelector(sel) as HTMLElement | null;
    const qa = (sel: string) =>
      Array.from(el.querySelectorAll<HTMLElement>(sel));

    const stageEl = q(`.${styles.stage}`);
    const compEl = q(`.${styles.comp}`);
    const lines = [1, 2, 3].map((n) => q(`.${styles["line" + n]}`));
    const metas = [
      styles.eyebrow,
      styles.brand,
      styles.sideL,
      styles.sideR,
      styles.railL,
      styles.railR,
    ]
      .map((c) => q(`.${c}`))
      .filter(Boolean) as HTMLElement[];
    const labelWraps = qa(`.${styles.lp}`);
    const labels = labelWraps.map((w) =>
      w.querySelector<HTMLElement>(`.${styles.label}`)
    );

    const trAtmo = q(`.${styles.atmo}`);
    const trWindow = q(`.${styles.window}`);
    const trGhost = q(`.${styles.ghost}`);
    const trFragsBox = q(`.${styles.frags}`);
    const trCluster = q(`.${styles.cluster}`);
    const trFrame = q(`.${styles.frame}`);
    const p3Dim = q(`.${styles.dim}`);
    const p3Corners = qa(`.${styles.corner}`);
    const atmoCredits = qa(`.${styles.credit}`);
    const abTitle = q(`.${styles.abTitle}`);
    const abBoxes = qa(`.${styles.doorPos} .${styles.door}`);
    const abFoot = q(`.${styles.foot}`);
    const hasTr = !!(stageEl && compEl && trWindow && trFragsBox && trAtmo);

    const isMobileLayout = () => window.innerWidth <= MOBILE_CUT;
    const s2Range = () =>
      window.innerHeight * (isMobileLayout() ? S2_RANGE_MOBILE : S2_RANGE_DESK);
    const trRange = () =>
      window.innerHeight * (isMobileLayout() ? TR_RANGE_MOBILE : TR_RANGE_DESK);

    let tiles: Tile[] = [];
    let clusterInner: HTMLElement | null = null;
    let compRect = { left: 0, top: 0, w: 0, h: 0 };
    let stageW = 0;
    let stageH = 0;
    let builtMobile: boolean | null = null;
    let centers: { x: number; y: number }[] = [];
    let centroid = { x: 0, y: 0 };
    let range = 1;

    const layoutFragments = () => {
      if (!trFragsBox || !tiles.length) return;
      tiles.forEach(({ el: tile, content, cfg }) => {
        const [rx, ry, rw, rh] = cfg.r;
        const x0 = Math.round(compRect.left + rx * compRect.w);
        const y0 = Math.round(compRect.top + ry * compRect.h);
        const x1 = Math.round(compRect.left + (rx + rw) * compRect.w);
        const y1 = Math.round(compRect.top + (ry + rh) * compRect.h);
        tile.style.left = x0 + "px";
        tile.style.top = y0 + "px";
        tile.style.width = x1 - x0 + "px";
        tile.style.height = y1 - y0 + "px";
        content.style.left = (compRect.left - x0).toFixed(2) + "px";
        content.style.top = (compRect.top - y0).toFixed(2) + "px";
        content.style.width = compRect.w.toFixed(2) + "px";
        content.style.height = compRect.h.toFixed(2) + "px";
      });
      if (clusterInner && trCluster) {
        clusterInner.style.left = compRect.left.toFixed(1) + "px";
        clusterInner.style.top = compRect.top.toFixed(1) + "px";
        clusterInner.style.width = compRect.w.toFixed(1) + "px";
        clusterInner.style.height = compRect.h.toFixed(1) + "px";
      }
    };

    const buildFragments = () => {
      if (!hasTr || !compEl) return;
      builtMobile = isMobileLayout();
      if (trFragsBox) trFragsBox.replaceChildren();
      if (trCluster) trCluster.replaceChildren();
      tiles = [];

      (builtMobile ? TILES_MOBILE : TILES_DESKTOP).forEach((cfg) => {
        const tile = document.createElement("div");
        tile.className = styles.frag;
        const content = compEl.cloneNode(true) as HTMLElement;
        content.classList.remove(styles.comp);
        content.classList.add(styles.fragContent);
        const lbl = content.querySelector(`.${styles.labels}`);
        if (lbl) lbl.remove();
        content.querySelectorAll("[style]").forEach((n) =>
          n.removeAttribute("style")
        );
        const seam = document.createElement("div");
        seam.className = styles.fragSeam;
        tile.append(content, seam);
        trFragsBox?.append(tile);
        tiles.push({ el: tile, content, seam, cfg });
      });

      const srcLabels = compEl.querySelector(`.${styles.labels}`);
      if (srcLabels && trCluster) {
        clusterInner = document.createElement("div");
        clusterInner.className = styles.clusterInner;
        const clone = srcLabels.cloneNode(true) as HTMLElement;
        clone.querySelectorAll("[style]").forEach((n) => n.removeAttribute("style"));
        clusterInner.append(clone);
        trCluster.append(clusterInner);
      }
      layoutFragments();
    };

    const measure = () => {
      if (triggerEl && triggerEl.getBoundingClientRect) {
        range = Math.max(1, triggerEl.getBoundingClientRect().height);
      }
      const s = stageEl?.getBoundingClientRect();
      const c = compEl?.getBoundingClientRect();
      if (s && c) {
        stageW = s.width;
        stageH = s.height;
        compRect = { left: c.left - s.left, top: c.top - s.top, w: c.width, h: c.height };
      }
      centers = labelWraps.map((w) => {
        const r = w.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      });
      const n = centers.length || 1;
      centroid = centers.reduce(
        (acc, c) => ({ x: acc.x + c.x / n, y: acc.y + c.y / n }),
        { x: 0, y: 0 }
      );
      layoutFragments();
    };

    const applyS2 = (p: number) => {
      lines.forEach((line, i) => {
        if (!line) return;
        const e = easeOut(sub(p, LINE_RANGES[i][0], LINE_RANGES[i][1]));
        line.style.transform = `translate3d(0, ${((1 - e) * 112).toFixed(3)}%, 0)`;
      });

      const m = easeOut(sub(p, META_RANGE[0], META_RANGE[1]));
      metas.forEach((el) => {
        el.style.opacity = m.toFixed(3);
        el.style.transform =
          m < 0.999 ? `translate3d(0, ${((1 - m) * 14).toFixed(2)}px, 0)` : "";
      });

      labels.forEach((label, i) => {
        if (!label) return;
        const c = centers[i];
        if (!c) return;
        const a = LABEL_START + i * LABEL_STEP;
        const s = sub(p, a, a + LABEL_SPAN);
        const e = easeOut(s);
        const dx = (centroid.x - c.x) * (1 - e);
        const dy = (centroid.y - c.y) * (1 - e);
        const rot = FINAL_ROT[i] + EXTRA_ROT[i] * (1 - e);
        const scale = 0.32 + 0.68 * e;
        label.style.opacity = Math.min(1, s * 3.2).toFixed(3);
        label.style.transform =
          `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0) ` +
          `rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
        label.style.filter = e < 0.985 ? `blur(${((1 - e) * 5).toFixed(2)}px)` : "";
      });
    };

    let trActive = false;

    const applyTr = (pt: number) => {
      if (!hasTr) return;
      const active = pt > 0.0005;
      if (active !== trActive) {
        trActive = active;
        stageEl?.classList.toggle(styles.isTransitioning, active);
        if (!active) {
          qa(`.${styles.rail}`).forEach((r) => {
            r.style.opacity = "";
            r.style.transform = "";
          });
          const ey = q(`.${styles.eyebrow}`);
          if (ey) ey.style.opacity = "";
          stageEl?.classList.remove(styles.isLocked);
        }
      }
      if (!active) return;

      const hOut = easeOut(sub(pt, 0, 0.14));
      const eyebrow = q(`.${styles.eyebrow}`);
      if (eyebrow) eyebrow.style.opacity = (1 - hOut).toFixed(3);

      const railOut = easeOut(sub(pt, 0, 0.12));
      qa(`.${styles.rail}`).forEach((r, i) => {
        r.style.opacity = (1 - railOut).toFixed(3);
        r.style.transform = `translate3d(${(
          (i === 0 ? -1 : 1) * railOut * 24
        ).toFixed(1)}px, 0, 0)`;
      });

      if (trAtmo)
        trAtmo.style.opacity = easeOut(sub(pt, 0.02, 0.16)).toFixed(3);
      if (p3Dim)
        p3Dim.style.opacity = (0.55 * easeOut(sub(pt, 0.06, 0.2))).toFixed(3);

      const creditsOut = easeOut(sub(pt, 0.8, 0.9));
      atmoCredits.forEach((c) => {
        c.style.opacity = (1 - creditsOut).toFixed(3);
      });
      const cornersIn = easeOut(sub(pt, 0.86, 0.97));
      p3Corners.forEach((c) => {
        c.style.opacity = cornersIn.toFixed(3);
      });

      const locked = pt > 0.65;
      if (!locked) {
        if (abTitle) {
          const te = easeInOut(sub(pt, 0.55, 0.8));
          abTitle.style.transform = `translate3d(0, ${((1 - te) * 108).toFixed(
            2
          )}%, 0)`;
        }
        abBoxes.forEach((box, i) => {
          const a = 0.6 + i * 0.06;
          const e = easeInOut(sub(pt, a, a + 0.25));
          box.style.transform = `translate3d(0, ${((1 - e) * 0.14 * stageH).toFixed(
            1
          )}px, 0)`;
          box.style.opacity = easeOut(sub(pt, a, a + 0.16)).toFixed(3);
        });
        if (abFoot)
          abFoot.style.opacity = easeOut(sub(pt, 0.85, 0.97)).toFixed(3);
      }

      if (locked !== !!stageEl?.classList.contains(styles.isLocked)) {
        stageEl?.classList.toggle(styles.isLocked, locked);
        if (locked) {
          if (abTitle) abTitle.style.transform = "";
          abBoxes.forEach((b) => {
            b.style.transform = "";
            b.style.opacity = "";
          });
          if (abFoot) abFoot.style.opacity = "";
        }
      }
      if (lastOpenRef.current && pt < 0.45) {
        setOpen(null);
        lastOpenRef.current = null;
      }

      const framed = easeInOut(sub(pt, 0.02, 0.17));
      const windowFade = easeOut(sub(pt, 0.92, 1));
      const wScale = 1 - (isMobileLayout() ? 0.1 : 0.2) * framed;
      if (trWindow) {
        trWindow.style.transform = `scale(${wScale.toFixed(4)})`;
        trWindow.style.setProperty("--s3r", (framed * 20).toFixed(1) + "px");
        trWindow.style.opacity = (1 - windowFade).toFixed(3);
      }
      if (trFrame) trFrame.style.opacity = (framed * (1 - windowFade)).toFixed(3);
      if (trGhost)
        trGhost.style.opacity = (1 - easeInOut(sub(pt, 0.5, 0.85))).toFixed(3);

      const seamGlobal = easeOut(sub(pt, 0.05, 0.18));
      tiles.forEach(({ el: tile, seam, cfg }) => {
        const e = easeInOut(sub(pt, cfg.s, cfg.s + TR_SPAN));
        const dx = cfg.d[0] * stageW * e;
        const dy = cfg.d[1] * stageH * e;
        const sc = 1 + (cfg.d[0] < 0 ? -0.035 : 0.03) * e;
        tile.style.transform =
          `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0) ` +
          `rotate(${(cfg.rot * e).toFixed(2)}deg) scale(${sc.toFixed(3)})`;
        tile.style.opacity = (1 - easeOut(sub(e, 0.62, 1))).toFixed(3);
        if (cfg.inv) {
          const k = sub(pt, cfg.s * 0.7, cfg.s * 0.95);
          tile.style.filter =
            k > 0.002 ? `grayscale(${k.toFixed(2)}) invert(${k.toFixed(2)})` : "";
        }
        seam.style.opacity = (seamGlobal * (1 - e)).toFixed(3);
      });

      if (trCluster) {
        const drift = easeInOut(sub(pt, 0.3, 0.85));
        const cfade = easeOut(sub(pt, 0.8, 0.92));
        trCluster.style.transform =
          `translate3d(0, ${(-0.16 * stageH * drift).toFixed(1)}px, 0) ` +
          `scale(${(1 - 0.06 * drift).toFixed(3)})`;
        trCluster.style.opacity = (1 - cfade).toFixed(3);
      }
    };

    const apply = (p: number) => {
      const scrolled = p * range;
      const p2 = clamp01(scrolled / s2Range());
      const pt = clamp01((scrolled - s2Range()) / trRange());
      applyS2(p2);
      applyTr(pt);
    };

    const triggerEl = sceneScrub(el).trigger;

    measure();

    const st = ScrollTrigger.create({
      ...sceneScrub(el),
      scrub: 0.6,
      invalidateOnRefresh: true,
      onRefresh: (self) => {
        measure();
        apply(self.progress);
      },
      onUpdate: (self) => apply(self.progress),
    });

    buildFragments();
    apply(st.progress);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        measure();
        apply(st.progress);
        st.refresh();
      });
    }

    const onResize = () => {
      if (builtMobile !== null && builtMobile !== isMobileLayout()) {
        buildFragments();
      }
      measure();
      apply(st.progress);
    };
    window.addEventListener("resize", onResize);

    return () => {
      st.kill();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const openDoor = (key: DoorId) => {
    setOpen(key);
    lastOpenRef.current = key;
    requestAnimationFrame(() => {
      const detail = detailRef.current;
      const btn = doorRefs.current[key];
      if (detail && btn) {
        const dRect = detail.getBoundingClientRect();
        const bRect = btn.getBoundingClientRect();
        detail.style.transformOrigin =
          `${Math.round(bRect.left + bRect.width / 2 - dRect.left)}px ` +
          `${Math.round(bRect.top + bRect.height / 2 - dRect.top)}px`;
      }
    });
    window.setTimeout(
      () => closeRef.current?.focus({ preventScroll: true }),
      420
    );
  };

  const closeAbout = useCallback(() => {
    const was = lastOpenRef.current;
    setOpen(null);
    lastOpenRef.current = null;
    if (was) doorRefs.current[was]?.focus({ preventScroll: true });
  }, []);

  const triggerWorks = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scrollToHash("#work");
      return;
    }
    setFlash(true);
    window.setTimeout(() => {
      scrollToHash("#work");
      window.setTimeout(() => setFlash(false), 380);
    }, 140);
  };

  const onDoor = (key: string) => {
    openDoor(key as DoorId);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAbout();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeAbout]);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <section
      ref={root}
      className={styles.section}
      aria-label="Where code meets creative thinking, and about me"
    >
      <p className={styles.eyebrow}>
        <span>04</span> {t("hunch.eyebrow")}
      </p>

      <div className={styles.stage}>
        {}
        <div className={styles.comp}>
          <p className={styles.brand} aria-hidden="true">
            <span>My </span>
            <span className={styles.brandCreative}>Creative</span>
            <span className={styles.brandHunch}>Hunch</span>
          </p>

          <div className={`${styles.side} ${styles.sideL}`}>
            <p>
              <span>Built by</span> <strong>MyCreativeHunch</strong>
            </p>
            <p>
              <span>Code into</span>{" "}
              <strong>
                <em>Solutions.</em>
              </strong>
            </p>
          </div>

          <div className={`${styles.side} ${styles.sideR}`}>
            <p>
              <span>Built with</span> <strong>Passion.</strong>
            </p>
            <p>
              <span>Driven by</span> <strong>Creativity.</strong>
            </p>
          </div>

          <h2
            className={styles.title}
            aria-label="Where Code Meets Creative Thinking"
          >
            <span className={styles.mask1}>
              <span className={styles.line1}>
                <span className={styles.wordWhere} aria-hidden="true">
                  Where
                </span>
              </span>
            </span>
            <span className={styles.mask2}>
              <span className={styles.line2}>
                <span className={styles.wordCode} aria-hidden="true">
                  Code
                </span>
                <span className={styles.wordMeets} aria-hidden="true">
                  Meets
                </span>
              </span>
            </span>
            <span className={styles.mask3}>
              <span className={styles.line3}>
                <span className={styles.wordCreative} aria-hidden="true">
                  Creative
                </span>
                <span className={styles.wordThinking} aria-hidden="true">
                  Thinking
                </span>
              </span>
            </span>
          </h2>

          <ul className={styles.labels} aria-label="Focus areas">
            {LABELS.map((lb) => (
              <li className={`${styles.lp} ${lb.pos}`} key={lb.text}>
                <span className={`${styles.label} ${lb.cls}`}>{lb.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${styles.rail} ${styles.railL}`} aria-hidden="true">
          <span className={styles.railDot} />
          <ul className={styles.railList}>
            {RAIL.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
          <span className={`${styles.railLine} ${styles.railLineA}`} />
          <span className={`${styles.railLine} ${styles.railLineB}`} />
        </div>

        <div className={`${styles.rail} ${styles.railR}`} aria-hidden="true">
          <span className={styles.railDot} />
          <ul className={styles.railList}>
            {RAIL.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
          <span className={`${styles.railLine} ${styles.railLineA}`} />
          <span className={`${styles.railLine} ${styles.railLineB}`} />
        </div>

        {}
        <div className={styles.atmo} aria-hidden="true">
          <p className={`${styles.credit} ${styles.creditL}`}>
            MyCreativeHunch Studio
          </p>
          <p className={`${styles.credit} ${styles.creditR}`}>
            &copy; 2026 MyCreativeHunch
          </p>
        </div>

        {}
        <div className={styles.p3} id="section-03">
          <div className={styles.dim} aria-hidden="true">
            <span>Functional &amp; Beautiful</span>
            <span>Builds for Startups</span>
            <span className={styles.dim3}>Ready to Scale</span>
          </div>

          <p className={`${styles.corner} ${styles.cornerL}`}>
            Transforming <b>Visions</b> to Reality
          </p>
          <p className={`${styles.corner} ${styles.cornerR}`}>
            www.mycreativehunch.com
          </p>

          <div className={`${styles.abComp} ${open ? styles.isExpanded : ""}`}>
            <div className={styles.titleMask}>
              <h2 className={styles.abTitle}>
                <span>About</span>
                <span className={styles.titleScript}>Me</span>
              </h2>
            </div>

            <div className={styles.doors}>
              {DOORS.map((d) => (
                <div className={styles.doorPos} key={d.key}>
                  <button
                    ref={(n) => {
                      doorRefs.current[d.key] = n;
                    }}
                    type="button"
                    className={`${styles.door} ${d.theme} ${
                      open === d.key ? styles.isActive : ""
                    }`}
                    data-ab={d.key}
                    aria-expanded={open === d.key}
                    onClick={() => onDoor(d.key)}
                  >
                    <span className={styles.doorIn}>
                      <span className={styles.num}>{d.num}</span>
                      <span className={styles.kicker}>{d.kicker}</span>
                      <img
                        className={`${styles.img} ${d.air ? styles.imgAir : ""}`}
                        src={d.img}
                        alt={d.alt}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className={styles.boxTitle}>
                        {d.title[0]}
                        <br />
                        {d.title[1]}
                      </span>
                      <span className={styles.doorLine} />
                      <span className={styles.sub}>{d.sub}</span>
                      <span className={styles.arrow}>
                        <svg
                          viewBox="0 0 18 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M1 6h15M11 1l5 5-5 5" />
                        </svg>
                      </span>
                    </span>
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.foot}>
              <span>( 03 · About )</span>
              <span>Web · App · Code</span>
            </div>
          </div>

          {}
          {open && (
            <div
              ref={detailRef}
              className={`${styles.detail} ${styles.detailOpen} ${
                open === "think"
                  ? styles.detailThink
                  : open === "what"
                  ? styles.detailWhat
                  : styles.detailWho
              }`}
              role="region"
              aria-label="About details"
            >
              <button
                ref={closeRef}
                type="button"
                className={styles.close}
                aria-label="Close"
                onClick={closeAbout}
              >
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" />
                </svg>
              </button>

              {/* 01 — WHO I AM */}
              <div
                className={`${styles.view} ${
                  open === "who" ? styles.viewActive : ""
                }`}
                data-ab="who"
              >
                <div className={styles.viewCopy}>
                  <p className={styles.eyebrowD}>01 — Who I Am</p>
                  <h3 className={styles.head}>Avdesh Jadon</h3>
                  <p className={styles.roleSub}>
                    Full Stack Developer &amp; Software Tester
                  </p>
                  <p className={styles.dText}>
                    I am a final-year engineering student dedicated to building scalable, high-performance web applications and rock-solid software systems.
                  </p>
                  <p className={styles.dTextSecondary}>
                    My skill set bridges aesthetic, responsive frontend engineering with reliable backend architecture and comprehensive QA pipelines — from writing clean TypeScript and modern React components to database design and automated end-to-end testing.
                  </p>
                  <div className={styles.detailMetaGrid}>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Status</span>
                      <span className={styles.metaVal}>Final Year B.Tech (2023–2027)</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Hometown</span>
                      <span className={styles.metaVal}>Agra → College, India</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Core Focus</span>
                      <span className={styles.metaVal}>Full Stack &amp; Automation QA</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Problem Solving</span>
                      <span className={styles.metaVal}>500+ LeetCode &amp; GFG Problems</span>
                    </div>
                  </div>
                  <ul className={styles.tags}>
                    <li>Full Stack</li>
                    <li>Software QA</li>
                    <li>React &amp; Next.js</li>
                    <li>Node.js</li>
                    <li>TypeScript</li>
                    <li>Java &amp; Spring Boot</li>
                  </ul>
                </div>
                <div className={styles.viewMedia}>
                  <img
                    src="/about/hero-portrait.jpg"
                    alt="Portrait of Avdesh Jadon"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              {/* 02 — WHAT I DO */}
              <div
                className={`${styles.view} ${
                  open === "what" ? styles.viewActive : ""
                }`}
                data-ab="what"
              >
                <div className={styles.viewCopy}>
                  <p className={styles.eyebrowD}>02 — What I Do</p>
                  <h3 className={styles.head}>Craft &amp; Build</h3>
                  <p className={styles.roleSub}>
                    Web Systems · API Architecture · Quality Engineering
                  </p>
                  <p className={styles.dText}>
                    I design, build, test, and deploy production-grade software applications from end to end:
                  </p>
                  <div className={styles.craftList}>
                    <div className={styles.craftItem}>
                      <strong>01. Full Stack Web Applications</strong>
                      <span>Crafting modern, accessible web apps using Next.js, React, TypeScript, Node.js, and Tailwind CSS with fluid animations and responsive layouts.</span>
                    </div>
                    <div className={styles.craftItem}>
                      <strong>02. Software Testing &amp; Automation QA</strong>
                      <span>Writing automated E2E tests with Playwright &amp; Jest, designing comprehensive test cases, API contract testing, and performance testing with JMeter.</span>
                    </div>
                    <div className={styles.craftItem}>
                      <strong>03. Backend Architecture &amp; Database Design</strong>
                      <span>Designing robust RESTful APIs, relational databases (PostgreSQL, MySQL), MongoDB schemas, and secure role-based auth.</span>
                    </div>
                    <div className={styles.craftItem}>
                      <strong>04. DevOps &amp; Production Deployments</strong>
                      <span>Dockerizing applications, setting up automated CI/CD workflows, and managing 10+ live deployments on AWS EC2, Vercel, and cloud infrastructure.</span>
                    </div>
                  </div>
                  <ul className={styles.tags}>
                    <li>Next.js</li>
                    <li>React</li>
                    <li>Playwright</li>
                    <li>Jest &amp; JUnit</li>
                    <li>REST APIs</li>
                    <li>Docker &amp; AWS</li>
                  </ul>
                </div>
                <div className={styles.viewMedia}>
                  <img
                    src="/about/aircraft.jpg"
                    alt="Craft and Engineering"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              {/* 03 — HOW I THINK */}
              <div
                className={`${styles.view} ${
                  open === "think" ? styles.viewActive : ""
                }`}
                data-ab="think"
              >
                <div className={styles.viewCopy}>
                  <p className={styles.eyebrowD}>03 — How I Think</p>
                  <h3 className={`${styles.head} ${styles.headQuote}`}>
                    &ldquo;Code is how I think — shipping with reliability is how I aim it.&rdquo;
                  </h3>
                  <p className={styles.roleSub}>Engineering Philosophy &amp; Standards</p>
                  <p className={styles.dText}>
                    Every product I build is guided by core engineering principles that guarantee both velocity and resilience:
                  </p>
                  <div className={styles.craftList}>
                    <div className={styles.craftItem}>
                      <strong>1. Effortless User Simplicity</strong>
                      <span>Great software hides complex edge cases behind intuitive, obvious user interfaces. If an interface feels confusing, the architecture needs refinement.</span>
                    </div>
                    <div className={styles.craftItem}>
                      <strong>2. Reliability Through Testing</strong>
                      <span>Untested code is broken code waiting to surprise you. Testing is not an afterthought; it is built into the architecture from day one.</span>
                    </div>
                    <div className={styles.craftItem}>
                      <strong>3. Clean, Maintainable Architecture</strong>
                      <span>Writing modular, self-documenting code with clear boundaries ensures any engineer can step in, understand, and extend the system with confidence.</span>
                    </div>
                    <div className={styles.craftItem}>
                      <strong>4. End-to-End Ownership</strong>
                      <span>Taking full responsibility for the entire journey — from the initial idea and schema design to automated tests, deployment, and live monitoring.</span>
                    </div>
                  </div>
                  <ul className={styles.tags}>
                    <li>Reliability First</li>
                    <li>Clean Code</li>
                    <li>Test-Driven</li>
                    <li>End-to-End Ownership</li>
                    <li>Scalable Systems</li>
                  </ul>
                </div>
                <div className={styles.viewMedia}>
                  <img
                    src="/about/portrait.jpg"
                    alt="Engineering Philosophy"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {}
        <div className={styles.window} aria-hidden="true">
          <div className={styles.ghost} />
          <div className={styles.frags} />
          <div className={styles.cluster} />
          <div className={styles.frame} />
        </div>
      </div>

      {}
      {flash &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className={`${styles.flash} ${styles.flashOn}`}
            aria-hidden="true"
          />,
          document.body
        )}
    </section>
  );
}