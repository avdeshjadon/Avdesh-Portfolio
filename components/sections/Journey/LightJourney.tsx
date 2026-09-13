"use client";

/*
 * THE JOURNEY v2 — light-cable tunnel (LightTunnel as the concept reference;
 * engine built from scratch to its parameter language: cables, pulses,
 * waviness, sway, glow, fade near/far, color variance, mouse influence).
 *
 * · 20 wavy light cables (10 on mobile) converge toward a vanishing point;
 *   additive-blended shader pulses travel outward along them — energy
 *   moving through a living system, with direction, depth and falloff.
 * · SCROLL IS THE JOURNEY: the section pins for ~4 viewports. Scroll
 *   progress (not just velocity) drives travel, pulse energy and the color
 *   progression — blue → orange → coral → purple → green — so the journey
 *   has a beginning, middle and climax. Velocity feel comes free from the
 *   double smoothing (scrub → travel-lerp): flick fast and the tunnel
 *   surges, then settles. Touch uses native scrolling.
 * · The pointer leans the camera and sways the tunnel — atmospheric, ±0.06.
 * · THE EXIT: light intensity peaks, then the cables dissolve as white
 *   returns and the next section arrives — the same compression-into-white
 *   grammar as the opening tunnel.
 * · Minimal chapter labels sit over the depth; the full story stays in
 *   screen-reader text. prefers-reduced-motion gets a calm static frame.
 */

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { sceneScrub } from "@/lib/scene";
import { CHAPTERS } from "@/content/journey";
import styles from "./LightJourney.module.css";
import { useLang, L } from "@/lib/i18n";

/* palette progression across the journey */
const PALETTE = ["#0072E3", "#FF6A00", "#FF2E0F", "#AB54F7", "#00AA3C"];

/* One viewport of scroll per chapter, so a chapter can actually be read
   before the tunnel moves on. */
const JOURNEY_VIEWPORTS = CHAPTERS.length;
const DEPTH = 30;
const RADIUS = 1.12;
const WAVINESS = 0.3;
const TRAVEL_TOTAL = 26; /* pulse-phase travel across the journey */
const T_EXIT = 0.9; /* white return begins */

/* Chapters live inside this slice of the pin: the head is the section
   title settling, the tail is the last chapter holding before the whiteout
   takes over. Text is never asked to compete with the dissolve. */
const CH_START = 0.06;
const CH_END = 0.86;
const CH_SPAN = (CH_END - CH_START) / CHAPTERS.length;

const VERT = /* glsl */ `
  varying float vT;
  varying float vZ;
  void main() {
    vT = uv.x;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vZ = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTravel;
  uniform float uPhase;
  uniform float uEnergy;
  uniform float uMaster;
  varying float vT;
  varying float vZ;
  void main() {
    /* rim base + a pulse with a decaying tail, travelling outward */
    float p = fract(vT * 3.0 - uTravel * 0.14 + uPhase);
    float pulse = smoothstep(0.30, 0.0, p) * (1.1 + uEnergy * 1.6);
    float b = 0.20 + pulse;
    /* depth: fade in just past the camera, fade out into the far dark */
    float a = smoothstep(0.6, 2.4, vZ) * (1.0 - smoothstep(16.0, 27.0, vZ));
    vec3 c = uColor * b;
    gl_FragColor = vec4(c, 1.0) * a * uMaster;
  }
`;

export default function LightJourney() {
  const rootRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglOk, setWebglOk] = useState(true);
  /* reduced motion (or no WebGL) drops the pin entirely, so the chapters
     have to be readable as a plain stack — content is never motion-gated */
  const [staticMode, setStaticMode] = useState(false);
  const { t, lang } = useLang();

  useEffect(() => {
    const rootEl = rootRef.current;
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!rootEl || !frame || !canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) setStaticMode(true);
    /* Aligned to the site's real mobile boundary (1000px) and to coarse
       pointers. At 700px a landscape phone or an 8-inch tablet fell through
       to the desktop tier: 20 antialiased cables at DPR 2 in a continuous
       loop across a six-viewport hold. */
    const compact = window.matchMedia(
      "(max-width: 1000px), (hover: none) and (pointer: coarse)"
    ).matches;
    const CABLES = compact ? 10 : 20;
    const DPR_CAP = compact ? 1.5 : 2;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch {
      setWebglOk(false);
      return;
    }
    renderer.setPixelRatio(Math.min(DPR_CAP, window.devicePixelRatio || 1));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0a0a0c");
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 0);

    const group = new THREE.Group();
    scene.add(group);

    const paletteC = PALETTE.map((h) => new THREE.Color(h));

    /* ---------- cables ---------- */
    type Cable = {
      mat: THREE.ShaderMaterial;
      baseColor: THREE.Color;
      tmp: THREE.Color;
    };
    const cables: Cable[] = [];
    const geoms: THREE.BufferGeometry[] = [];

    for (let i = 0; i < CABLES; i++) {
      const angle = (i / CABLES) * Math.PI * 2 + (Math.random() - 0.5) * 0.18;
      const rBase = RADIUS * (0.86 + Math.random() * 0.34);
      const wPhase = Math.random() * Math.PI * 2;
      const wFreq = 1.6 + Math.random() * 1.6;

      const pts: THREE.Vector3[] = [];
      const STEPS = 26;
      for (let s = 0; s <= STEPS; s++) {
        const t = s / STEPS;
        const z = 1.4 - t * (DEPTH + 1.4);
        const wob = Math.sin(t * wFreq * Math.PI * 2 + wPhase) * WAVINESS * (0.25 + t);
        const r = rBase + wob * 0.4;
        const a = angle + wob * 0.22;
        pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r * 0.82, z));
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      const geo = new THREE.TubeGeometry(curve, compact ? 48 : 72, 0.016, 5, false);
      geoms.push(geo);

      const baseColor = paletteC[i % paletteC.length].clone();
      const mat = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: {
          uColor: { value: baseColor.clone() },
          uTravel: { value: 0 },
          uPhase: { value: Math.random() },
          uEnergy: { value: 0.3 },
          uMaster: { value: 1 },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      group.add(new THREE.Mesh(geo, mat));
      cables.push({ mat, baseColor, tmp: new THREE.Color() });
    }

    /* soft core at the vanishing point — the infinite end of the tunnel */
    const coreCanvas = document.createElement("canvas");
    coreCanvas.width = coreCanvas.height = 128;
    const cctx = coreCanvas.getContext("2d")!;
    const grad = cctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, "rgba(255,255,255,0.9)");
    grad.addColorStop(0.35, "rgba(255,255,255,0.28)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    cctx.fillStyle = grad;
    cctx.fillRect(0, 0, 128, 128);
    const coreTex = new THREE.CanvasTexture(coreCanvas);
    const coreMat = new THREE.SpriteMaterial({
      map: coreTex,
      color: new THREE.Color(PALETTE[0]),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.85,
    });
    const core = new THREE.Sprite(coreMat);
    core.position.set(0, 0, -DEPTH + 4);
    core.scale.setScalar(7);
    scene.add(core);

    /* ---------- sizing ---------- */
    const resize = () => {
      const w = Math.max(1, frame.clientWidth);
      const h = Math.max(1, frame.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      if (reduced) renderer.render(scene, camera);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(frame);
    resize();

    /* ---------- color mixing per progress ---------- */
    const mixed = new THREE.Color();
    const applyColors = (p: number) => {
      const x = gsap.utils.clamp(0, PALETTE.length - 1.001, p * (PALETTE.length - 1));
      const i0 = Math.floor(x);
      const f = x - i0;
      mixed.copy(paletteC[i0]).lerp(paletteC[i0 + 1], f);
      for (const c of cables) {
        /* controlled variance: 72% progression color, 28% the cable's own hue */
        (c.mat.uniforms.uColor.value as THREE.Color)
          .copy(mixed)
          .lerp(c.baseColor, 0.28);
      }
      coreMat.color.copy(mixed);
    };
    applyColors(0);

    /* ---------- reduced motion: calm static frame ---------- */
    if (reduced) {
      for (const c of cables) c.mat.uniforms.uTravel.value = 0.6;
      applyColors(0.4);
      renderer.render(scene, camera);
      return () => {
        ro.disconnect();
        geoms.forEach((g) => g.dispose());
        cables.forEach((c) => c.mat.dispose());
        coreTex.dispose();
        coreMat.dispose();
        renderer.dispose();
      };
    }

    /* ---------- journey state ---------- */
    let progress = 0;
    let travel = 0;
    let idle = 0;
    let mx = 0;
    let my = 0;

    const chapterEls = Array.from(rootEl.querySelectorAll<HTMLElement>(`.${styles.chapter}`));
    const tickEls = Array.from(rootEl.querySelectorAll<HTMLElement>(`.${styles.tick}`));
    const introEl = rootEl.querySelector<HTMLElement>(`.${styles.intro}`);
    const counterEl = rootEl.querySelector<HTMLElement>(`.${styles.counterNow}`);
    const narrative = rootEl.querySelector<HTMLElement>(`.${styles.overlay}`);
    const whiteout = rootEl.querySelector<HTMLElement>(`.${styles.whiteout}`);
    let shown = -1;

    const onPointerMove = (e: PointerEvent) => {
      const r = frame.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      my = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onPointerLeave = () => {
      mx = 0;
      my = 0;
    };
    frame.addEventListener("pointermove", onPointerMove);
    frame.addEventListener("pointerleave", onPointerLeave);

    let raf = 0;
    let last = 0;
    let running = false;

    const animate = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(animate);
      const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
      last = now;

      /* travel: progress-mapped + slow idle life, inertia-lerped */
      idle += dt * 0.35;
      const target = progress * TRAVEL_TOTAL + idle;
      travel += (target - travel) * 0.075;

      const energy = 0.3 + progress * 1.5; /* pulses intensify with depth */
      for (const c of cables) {
        c.mat.uniforms.uTravel.value = travel;
        c.mat.uniforms.uEnergy.value = energy;
      }

      /* exit: light peaks then dissolves into white */
      const rel = gsap.utils.clamp(0, 1, (progress - T_EXIT) / (1 - T_EXIT));
      const eased = rel * rel * (3 - 2 * rel);
      for (const c of cables) c.mat.uniforms.uMaster.value = 1 - eased;
      coreMat.opacity = 0.85 * (1 - eased) + 0.6 * eased;
      if (whiteout) whiteout.style.opacity = String(eased);
      /* the story dissolves with the tunnel — white text never gets
         stranded on the white exit */
      if (narrative) narrative.style.opacity = String(1 - eased);

      /* atmosphere: camera lean + slow sway */
      camera.position.x += (mx * 0.06 - camera.position.x) * 0.05;
      camera.position.y += (-my * 0.045 - camera.position.y) * 0.05;
      group.rotation.z = Math.sin(travel * 0.05) * 0.05 + mx * 0.02;

      applyColors(progress);
      renderer.render(scene, camera);
    };

    const startLoop = () => {
      if (running) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(animate);
    };
    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    /* ---------- the journey, held by its Scene ----------
       The Scene's sticky hold pins this section, so no `pin` here — this
       trigger only reads progress across the scene's runway. */
    const st = ScrollTrigger.create({
      ...sceneScrub(rootEl),
      scrub: 0.6,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        progress = self.progress;
        const p = self.progress;

        /* the section title hands over to chapter one */
        if (introEl) introEl.style.opacity = String(gsap.utils.clamp(0, 1, 1 - p / CH_START));

        /* one chapter at a time; -1 while the title still owns the frame */
        const idx =
          p < CH_START
            ? -1
            : Math.min(CHAPTERS.length - 1, Math.floor((p - CH_START) / CH_SPAN));

        if (idx !== shown) {
          shown = idx;
          /* class swap only — the stagger and crossfade are CSS, so the
             text never re-lays-out mid-scroll */
          chapterEls.forEach((el, i) => el.classList.toggle(styles.on, i === idx));
          tickEls.forEach((el, i) => el.classList.toggle(styles.tickOn, i <= idx));
          if (counterEl) {
            counterEl.textContent = String(Math.max(0, idx) + 1).padStart(2, "0");
          }
        }
      },
      onToggle: (self) => (self.isActive ? startLoop() : stopLoop()),
    });

    /* render while approaching too, so it's alive before the pin */
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startLoop();
        else if (!st.isActive) stopLoop();
      },
      { rootMargin: "160px" }
    );
    io.observe(rootEl);

    return () => {
      stopLoop();
      st.kill();
      io.disconnect();
      ro.disconnect();
      frame.removeEventListener("pointermove", onPointerMove);
      frame.removeEventListener("pointerleave", onPointerLeave);
      geoms.forEach((g) => g.dispose());
      cables.forEach((c) => c.mat.dispose());
      coreTex.dispose();
      coreMat.dispose();
      renderer.dispose();
    };
  }, []);

  const isStatic = staticMode || !webglOk;

  return (
    <section className={styles.journey} id="journey" ref={rootRef}>
      <div
        className={`${styles.frame} ${isStatic ? styles.frameStatic : ""}`}
        ref={frameRef}
      >
        {webglOk ? (
          <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
        ) : null}

        {/* ---------- travelling narrative (the scroll experience) ---------- */}
        {!isStatic && (
          <>
            {/* keeps white type legible wherever the cables flare */}
            <div className={styles.scrim} aria-hidden="true" />

            <div className={styles.overlay} aria-hidden="true">
              <div className={styles.intro}>
                <p className={styles.introLabel}>
                  <span>02</span> {t("journey.eyebrow")}
                </p>
                <p className={styles.introLede}>{t("journey.lede")}</p>
                <p className={styles.introHint}>{t("journey.enter")}</p>
              </div>

              {CHAPTERS.map((c) => (
                <article className={styles.chapter} key={c.id}>
                  <span className={styles.chYear}>{c.year}</span>
                  <h3 className={styles.chTitle}>{L(lang, c, "title")}</h3>
                  <p className={styles.chPlace}>{L(lang, c, "place")}</p>
                  <p className={styles.chStory}>{L(lang, c, "story")}</p>
                  <p className={styles.chBridge}>
                    <i aria-hidden="true">→</i> {L(lang, c, "bridge")}
                  </p>
                </article>
              ))}

              {/* chapter rail — where you are in the journey */}
              <div className={styles.rail}>
                <span className={styles.counter}>
                  <b className={styles.counterNow}>01</b> /{" "}
                  {String(CHAPTERS.length).padStart(2, "0")}
                </span>
                <span className={styles.ticks}>
                  {CHAPTERS.map((c, i) => (
                    <span
                      className={`${styles.tick} ${i === 0 ? styles.tickOn : ""}`}
                      key={c.id}
                    />
                  ))}
                </span>
              </div>
            </div>

            <div className={styles.whiteout} aria-hidden="true" />
          </>
        )}

        {/* ---------- the same story, readable without motion ---------- */}
        <div className={isStatic ? styles.staticStory : styles.srOnly}>
          <h2>{t("journey.eyebrow")}</h2>
          <p className={styles.staticLede}>{t("journey.lede")}</p>
          <ol>
            {CHAPTERS.map((c) => (
              <li key={c.id}>
                <span className={styles.staticYear}>{c.year}</span>
                <h3>{L(lang, c, "title")}</h3>
                <p className={styles.staticPlace}>{L(lang, c, "place")}</p>
                <p>{L(lang, c, "story")}</p>
                <p className={styles.staticBridge}>{L(lang, c, "bridge")}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
