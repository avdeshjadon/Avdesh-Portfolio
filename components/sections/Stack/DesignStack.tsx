/* Portfolio by Avdesh Jadon — Full Stack Developer & Software Tester. */
"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { TOOLS } from "@/content/stack";
import styles from "./DesignStack.module.css";
import { useLang } from "@/lib/i18n";

const TWO_PI = Math.PI * 2;

const TURNS = 1.9;
const PHASE = -Math.PI * 0.5;

const INNER_WIDE = 0.4;
const INNER_COMPACT = 0.62;

const SPEED = 0.021; 
const HOVER_SLOW = 0.16;

const FADE_IN = 0.09;
const FADE_OUT = 0.3;
const SCALE_POW = 0.5;
const LEAN_MAX = 11; 

const M = 1000;
const K = 1024;

type Table = { nForArc: Float32Array; ratio: number; inner: number };

function buildArcTable(ratio: number, inner: number): Table {
  const point = (n: number) => {
    const a = n * TURNS * TWO_PI + PHASE;
    const r = 1 - n * (1 - inner);
    return { x: r * Math.cos(a), y: -r * Math.sin(a) * ratio };
  };

  const cum = new Float32Array(M + 1);
  let prev = point(0);
  for (let k = 1; k <= M; k++) {
    const p = point(k / M);
    cum[k] = cum[k - 1] + Math.hypot(p.x - prev.x, p.y - prev.y);
    prev = p;
  }
  const total = cum[M] || 1;

  const nForArc = new Float32Array(K + 1);
  let j = 0;
  for (let a = 0; a <= K; a++) {
    const target = (a / K) * total;
    while (j < M && cum[j + 1] < target) j++;
    const seg = cum[j + 1] - cum[j];
    nForArc[a] = (j + (seg > 0 ? (target - cum[j]) / seg : 0)) / M;
  }
  return { nForArc, ratio, inner };
}

export default function DesignStack() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  useEffect(() => {
    const stageEl = stage.current;
    const rootEl = root.current;
    if (!stageEl || !rootEl) return;

    const cards = Array.from(stageEl.querySelectorAll<HTMLElement>(`.${styles.card}`));
    const N = cards.length;
    if (!N) return;

    const compactMQ = window.matchMedia("(max-width: 700px)");

    let Rx = 0;
    let Ry = 0;
    let inner = INNER_WIDE;
    let table = buildArcTable(1, INNER_WIDE);

    const measure = () => {
      const w = stageEl.clientWidth;
      const h = stageEl.clientHeight;
      const compact = compactMQ.matches;

      inner = compact ? INNER_COMPACT : INNER_WIDE;

      Rx = compact ? Math.max(0.5 * w, 236) : 0.5 * w;
      Ry = 0.5 * h;

      const ratio = Ry / Rx;
      if (
        Math.abs(ratio - table.ratio) / table.ratio > 0.02 ||
        inner !== table.inner
      ) {
        table = buildArcTable(ratio, inner);
      }

      const cardW = compact
        ? 52
        : gsap.utils.clamp(112, 168, Math.min(Rx, Ry) * 0.3);
      stageEl.style.setProperty("--card-w", `${cardW}px`);
    };

    const arcToN = (s: number) => {
      const x = Math.min(K, Math.max(0, s * K));
      const i = Math.floor(x);
      const a = table.nForArc[i];
      const b = table.nForArc[Math.min(i + 1, K)];
      return a + (b - a) * (x - i);
    };

    const at = (n: number) => {
      const ang = n * TURNS * TWO_PI + PHASE;
      const rFrac = 1 - n * (1 - inner);
      return { x: Rx * rFrac * Math.cos(ang), y: -Ry * rFrac * Math.sin(ang), rFrac };
    };

    const zSet = cards.map(() => -1);

    const place = (base: number) => {
      for (let i = 0; i < N; i++) {
        const s = (base + i / N) % 1;
        const n = arcToN(s);
        const p = at(n);

        let o = 1;
        if (s < FADE_IN) o = s / FADE_IN;
        else if (s > 1 - FADE_OUT) o = (1 - s) / FADE_OUT;
        o = Math.max(0, Math.min(1, o));

        const scale = Math.pow(p.rFrac, SCALE_POW);

        const q = at(Math.min(n + 0.002, 1));
        const dx = q.x - p.x;
        const dy = q.y - p.y;
        const len = Math.hypot(dx, dy) || 1;
        const lean = LEAN_MAX * (dy / len);

        const el = cards[i];
        el.style.transform = `translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(
          2
        )}px, 0) rotate(${lean.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        el.style.opacity = o.toFixed(3);

        const z = Math.round((1 - n) * 100);
        if (z !== zSet[i]) {
          el.style.zIndex = String(z);
          zSet[i] = z;
        }
      }
    };

    measure();

    if (prefersReducedMotion()) {
      place(0);
      return;
    }

    let base = 0;
    let speedMul = 1;
    let target = 1;

    const tick = (_t: number, dt: number) => {
      const f = Math.min(dt / 1000, 0.05);
      speedMul += (target - speedMul) * Math.min(f * 6, 1);
      base = (base + SPEED * speedMul * f) % 1;
      place(base);
    };

    let hovered = 0;
    const onOver = (e: PointerEvent) => {
      if ((e.target as Element)?.closest?.(`.${styles.card}`)) {
        hovered++;
        target = HOVER_SLOW;
      }
    };
    const onOut = (e: PointerEvent) => {
      if ((e.target as Element)?.closest?.(`.${styles.card}`)) {
        hovered = Math.max(0, hovered - 1);
        if (!hovered) target = 1;
      }
    };
    stageEl.addEventListener("pointerover", onOver);
    stageEl.addEventListener("pointerout", onOut);

    const ro = new ResizeObserver(() => {
      measure();
      place(base);
    });
    ro.observe(stageEl);

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
      { rootMargin: "120px" }
    );
    io.observe(rootEl);

    place(0);

    return () => {
      if (running) gsap.ticker.remove(tick);
      io.disconnect();
      ro.disconnect();
      stageEl.removeEventListener("pointerover", onOver);
      stageEl.removeEventListener("pointerout", onOut);
    };
  }, []);

  return (
    <section className={styles.section} id="stack" ref={root}>
      <div className={styles.glowA} aria-hidden="true" />
      <div className={styles.glowB} aria-hidden="true" />

      <div className={styles.stage} ref={stage}>
        {}
        <div className={styles.center}>
          <p className={styles.eyebrow}>
            <span>03</span> {t("stack.eyebrow")}
          </p>
          <h2 className={styles.h2}>
            {t("stack.h2")} <em className={styles.serif}>{t("stack.h2Em")}</em>
          </h2>
          <p className={styles.lede}>
            {t("stack.lede")}
          </p>
          <p className={styles.count}>
            {TOOLS.length} {t("stack.count")} · <span>4</span> {t("stack.disciplines")}
          </p>
        </div>

        {}
        <ul className={styles.orbit}>
          {TOOLS.map((t) => (
            <li className={styles.card} key={t.name}>
              <span className={styles.face}>
                <span className={styles.mark}>
                  {t.src ? (
                    <img src={t.src} alt="" aria-hidden="true" />
                  ) : (
                    <span
                      className={styles.mono}
                      style={{ color: t.color, background: `${t.color}14` }}
                      aria-hidden="true"
                    >
                      {t.mono}
                    </span>
                  )}
                </span>
                <span className={styles.name}>{t.name}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
