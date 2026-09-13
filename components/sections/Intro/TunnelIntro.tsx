/* Portfolio by Avdesh Jadon — Full Stack Developer & Software Tester. */
"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { sceneScrub } from "@/lib/scene";
import styles from "./TunnelIntro.module.css";
import { useLang } from "@/lib/i18n";

const TUNNEL_WIDTH = 2;
const TUNNEL_HEIGHT = 1.8;
const SEGMENT_DEPTH = 1;
const LINE_RADIUS = 0.003;
const SCROLL_TO_Z = 0.05;
const CAMERA_CHASE = 0.1;
const FADE_IN = 1;

const BACKGROUND = "#0a0a0c";
const LINE_COLOR = "#9a9aa0";
const COLORS = ["#FF6A00", "#AB54F7", "#FF2E0F", "#0072E3", "#00AA3C", "#FFB200"];

const IMAGES = [
  "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/f8b3688c-11d0-425c-0b6f-66f133322c00/w=800",
  "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/c083d83a-f5a4-4434-989f-4eaa9bbe7500/w=800",
  "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/12e8b0be-f114-4134-1ab7-53116bfc2800/w=800",
  "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/b14ae2a2-1116-4a7f-0a18-1d74c4a46f00/w=800",
  "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/babdb603-8b5b-4520-58d6-240a34463c00/w=800",
];

const JOURNEY_VIEWPORTS = 5.5; 
const STAGES = 6; 
const TRAVEL_UNITS = 1050; 
const TRAVEL_CURVE = 1.35; 
const IDLE_DRIFT = 5; 
const T_START = 0.78; 
const T_RELEASE = 0.9; 
const MOUSE_X = 0.11;
const MOUSE_Y = 0.07;

export default function TunnelIntro({ text = "AVDESH" }: { text?: string }) {
  const rootRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglOk, setWebglOk] = useState(true);
  const { t } = useLang();

  useEffect(() => {
    const rootEl = rootRef.current;
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!rootEl || !frame || !canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const compact = window.matchMedia(
      "(max-width: 1000px), (hover: none) and (pointer: coarse)"
    ).matches;

    const GRID = compact ? 3 : 4;
    const NUM_SEGMENTS = compact ? 11 : 15;
    const FOG_FAR = NUM_SEGMENTS * SEGMENT_DEPTH * 0.95;
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
      document.body.classList.remove("intro-active");
      return;
    }
    renderer.setPixelRatio(Math.min(DPR_CAP, window.devicePixelRatio || 1));

    const bgColor = new THREE.Color(BACKGROUND);
    const white = new THREE.Color("#ffffff");

    const scene = new THREE.Scene();
    scene.background = bgColor.clone();
    const fog = new THREE.Fog(bgColor.clone(), 0.01, FOG_FAR);
    scene.fog = fog;

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 0, 0);

    const lineMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(LINE_COLOR),
      transparent: true,
      opacity: 0.5,
    });

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    const fading: THREE.MeshBasicMaterial[] = [];
    let alive = true;

    const colorMats = COLORS.map(
      (hex) => new THREE.MeshBasicMaterial({ color: new THREE.Color(hex), side: THREE.DoubleSide })
    );
    const imageMats = IMAGES.map((url) => {
      const mat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, side: THREE.DoubleSide });
      loader.load(
        url,
        (tex) => {
          if (!alive) {
            tex.dispose();
            return;
          }
          tex.minFilter = THREE.LinearFilter;
          tex.generateMipmaps = false;
          tex.colorSpace = THREE.SRGBColorSpace;
          mat.map = tex;
          mat.needsUpdate = true;
          fading.push(mat);
        },
        undefined,
        () => {}
      );
      return mat;
    });

    const hw = TUNNEL_WIDTH / 2;
    const hh = TUNNEL_HEIGHT / 2;
    const colW = TUNNEL_WIDTH / GRID;
    const rowH = TUNNEL_HEIGHT / GRID;

    const geoFloor = new THREE.PlaneGeometry(colW, SEGMENT_DEPTH);
    const geoWall = new THREE.PlaneGeometry(SEGMENT_DEPTH, rowH);
    const geoTubeZ = new THREE.TubeGeometry(
      new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -SEGMENT_DEPTH)),
      1,
      LINE_RADIUS,
      8
    );
    const geoTubeX = new THREE.TubeGeometry(
      new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(TUNNEL_WIDTH, 0, 0)),
      1,
      LINE_RADIUS,
      8
    );
    const geoTubeY = new THREE.TubeGeometry(
      new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, TUNNEL_HEIGHT, 0)),
      1,
      LINE_RADIUS,
      8
    );

    const tube = (geo: THREE.BufferGeometry, x: number, y: number, z = 0) => {
      const m = new THREE.Mesh(geo, lineMaterial);
      m.position.set(x, y, z);
      return m;
    };

    const SLOTS: { geo: THREE.BufferGeometry; pos: THREE.Vector3; rot: THREE.Euler }[] = [];
    {
      const z = -SEGMENT_DEPTH / 2;
      for (let i = 0; i < GRID; i++) {
        const x = -hw + i * colW + colW / 2;
        SLOTS.push({ geo: geoFloor, pos: new THREE.Vector3(x, -hh, z), rot: new THREE.Euler(-Math.PI / 2, 0, 0) });
        SLOTS.push({ geo: geoFloor, pos: new THREE.Vector3(x, hh, z), rot: new THREE.Euler(Math.PI / 2, 0, 0) });
      }
      for (let i = 0; i < GRID; i++) {
        const y = -hh + i * rowH + rowH / 2;
        SLOTS.push({ geo: geoWall, pos: new THREE.Vector3(-hw, y, z), rot: new THREE.Euler(0, Math.PI / 2, 0) });
        SLOTS.push({ geo: geoWall, pos: new THREE.Vector3(hw, y, z), rot: new THREE.Euler(0, -Math.PI / 2, 0) });
      }
    }

    let imageIndex = 0;
    let colorIndex = 0;
    let populateIndex = 0;

    function populate(group: THREE.Group) {
      const takesSlabs = populateIndex % 2 === 0;
      populateIndex++;
      const slabs = group.userData.slabs as THREE.Mesh[];
      for (const slab of slabs) {
        if (!takesSlabs || Math.random() > 0.5) {
          slab.visible = false;
          continue;
        }
        slab.visible = true;
        if (Math.random() > 0.5) {
          slab.material = colorMats[(5 * colorIndex) % colorMats.length];
          colorIndex++;
        } else {
          slab.material = imageMats[(3 * imageIndex) % imageMats.length];
          imageIndex++;
        }
      }
    }

    function createSegment(z: number) {
      const group = new THREE.Group();
      group.position.z = z;
      for (let i = 0; i <= GRID; i++) {
        const x = -hw + i * colW;
        group.add(tube(geoTubeZ, x, -hh));
        group.add(tube(geoTubeZ, x, hh));
      }
      for (let i = 1; i < GRID; i++) {
        const y = -hh + i * rowH;
        group.add(tube(geoTubeZ, -hw, y));
        group.add(tube(geoTubeZ, hw, y));
      }
      group.add(tube(geoTubeX, -hw, -hh));
      group.add(tube(geoTubeX, -hw, hh));
      group.add(tube(geoTubeY, -hw, -hh));
      group.add(tube(geoTubeY, hw, -hh));

      const slabs: THREE.Mesh[] = SLOTS.map((slot) => {
        const m = new THREE.Mesh(slot.geo, colorMats[0]);
        m.position.copy(slot.pos);
        m.rotation.copy(slot.rot);
        m.visible = false;
        group.add(m);
        return m;
      });
      group.userData.slabs = slabs;
      populate(group);
      return group;
    }

    const segments: THREE.Group[] = [];
    for (let i = 0; i < NUM_SEGMENTS; i++) {
      const g = createSegment(-i * SEGMENT_DEPTH);
      scene.add(g);
      segments.push(g);
    }

    const buildMask = () => {
      const w = Math.max(1, frame.clientWidth);
      const h = Math.max(1, frame.clientHeight);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const m = document.createElement("canvas");
      m.width = Math.floor(w * dpr);
      m.height = Math.floor(h * dpr);
      const ctx = m.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      const family = getComputedStyle(document.body).fontFamily || "Inter, sans-serif";
      let size = h * 0.62;
      ctx.font = `900 ${size}px ${family}`;
      if ("letterSpacing" in ctx) {
        (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = "-0.04em";
      }
      const measured = ctx.measureText(text).width;
      size = Math.min(size, (size * (w * 0.94)) / Math.max(1, measured));
      ctx.font = `900 ${size}px ${family}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#000";
      ctx.fillText(text, w / 2, h / 2 + size * 0.02);
      const url = m.toDataURL("image/png");
      canvas.style.maskImage = `url(${url})`;
      canvas.style.maskSize = "100% 100%";
      canvas.style.maskRepeat = "no-repeat";
      canvas.style.setProperty("-webkit-mask-image", `url(${url})`);
      canvas.style.setProperty("-webkit-mask-size", "100% 100%");
      canvas.style.setProperty("-webkit-mask-repeat", "no-repeat");
    };

    const resize = () => {
      const w = Math.max(1, frame.clientWidth);
      const h = Math.max(1, frame.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      buildMask();
      if (reduced) renderer.render(scene, camera);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(frame);
    resize();
    document.fonts?.ready?.then(() => {
      if (alive) buildMask();
    });

    if (reduced) {
      renderer.render(scene, camera);
      document.body.classList.remove("intro-active");
      return () => {
        alive = false;
        ro.disconnect();
        renderer.dispose();
      };
    }

    document.body.classList.add("intro-active");

    let progress = 0; 
    let scrollPos = 0; 
    let idle = 0;
    let mx = 0;
    let my = 0;

    const stageEl = rootEl.querySelector<HTMLElement>(`.${styles.stageNow}`);
    const fillEl = rootEl.querySelector<HTMLElement>(`.${styles.progFill}`);
    const progressWrap = rootEl.querySelector<HTMLElement>(`.${styles.progress}`);
    const hintEl = rootEl.querySelector<HTMLElement>(`.${styles.hint}`);
    let stageShown = 1;

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
      if (!alive || !running) return;
      raf = requestAnimationFrame(animate);
      const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
      last = now;

      idle += IDLE_DRIFT * dt;
      const target = Math.pow(progress, TRAVEL_CURVE) * TRAVEL_UNITS + idle;
      scrollPos += (target - scrollPos) * 0.07;

      const want = -SCROLL_TO_Z * scrollPos;
      camera.position.z += CAMERA_CHASE * (want - camera.position.z);
      camera.position.x += (mx * MOUSE_X - camera.position.x) * 0.06;
      camera.position.y += (-my * MOUSE_Y - camera.position.y) * 0.06;

      const span = NUM_SEGMENTS * SEGMENT_DEPTH;
      const z = camera.position.z;
      for (const seg of segments) {
        if (seg.position.z > z + SEGMENT_DEPTH) {
          let min = 0;
          for (const s of segments) min = Math.min(min, s.position.z);
          seg.position.z = min - SEGMENT_DEPTH;
          populate(seg);
        } else if (seg.position.z < z - span - SEGMENT_DEPTH) {
          let max = -999999;
          for (const s of segments) max = Math.max(max, s.position.z);
          seg.position.z = max + SEGMENT_DEPTH;
          populate(seg);
        }
      }

      for (let i = fading.length - 1; i >= 0; i--) {
        const m = fading[i];
        m.opacity = Math.min(1, m.opacity + dt / FADE_IN);
        if (m.opacity >= 1) fading.splice(i, 1);
      }

      const k = gsap.utils.clamp(0, 1, (progress - T_START) / (1 - T_START));
      if (k > 0) {
        const eased = k * k * (3 - 2 * k);
        (scene.background as THREE.Color).copy(bgColor).lerp(white, eased);
        fog.color.copy(bgColor).lerp(white, eased);
        fog.far = FOG_FAR - (FOG_FAR - 2.2) * eased; 
        lineMaterial.opacity = 0.5 * (1 - eased);
      } else {
        (scene.background as THREE.Color).copy(bgColor);
        fog.color.copy(bgColor);
        fog.far = FOG_FAR;
        lineMaterial.opacity = 0.5;
      }

      const rel = gsap.utils.clamp(0, 1, (progress - T_RELEASE) / (1 - T_RELEASE));
      canvas.style.opacity = String(1 - rel);
      if (progressWrap) progressWrap.style.opacity = String(1 - rel);
      if (hintEl) hintEl.style.opacity = String(Math.max(0, 1 - progress * 6) * (1 - rel));

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
    startLoop();

    const st = ScrollTrigger.create({
      ...sceneScrub(rootEl),
      scrub: 0.6,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        progress = self.progress;

        document.body.classList.toggle("intro-active", self.progress < 0.94);

        const stage = Math.min(STAGES, 1 + Math.floor(self.progress * STAGES));
        if (stage !== stageShown && stageEl) {
          stageShown = stage;
          stageEl.textContent = `0${stage}`;
        }
        if (fillEl) fillEl.style.transform = `scaleX(${self.progress.toFixed(4)})`;
      },
      onLeave: () => {
        document.body.classList.remove("intro-active");
        stopLoop();
      },
      onEnterBack: () => {
        startLoop();
      },
    });

    return () => {
      alive = false;
      stopLoop();
      st.kill();
      ro.disconnect();
      frame.removeEventListener("pointermove", onPointerMove);
      frame.removeEventListener("pointerleave", onPointerLeave);
      document.body.classList.remove("intro-active");
      geoFloor.dispose();
      geoWall.dispose();
      geoTubeZ.dispose();
      geoTubeX.dispose();
      geoTubeY.dispose();
      for (const m of colorMats) m.dispose();
      for (const m of imageMats) {
        m.map?.dispose();
        m.dispose();
      }
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, [text]);

  return (
    <section className={styles.intro} id="intro" ref={rootRef}>
      <div className={styles.frame} ref={frameRef}>
        {webglOk ? (
          <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
        ) : (
          <span className={styles.fallback}>{text}</span>
        )}
        <h1 className={styles.srOnly}>{text} — Full Stack Developer &amp; Software Tester</h1>

        <p className={styles.hint} aria-hidden="true">
          {t("intro.scroll")}
        </p>

        {}
        <div className={styles.progress} aria-hidden="true">
          <span className={styles.stageNow}>01</span>
          <span className={styles.progLine}>
            <span className={styles.progFill} />
          </span>
          <span>0{STAGES}</span>
        </div>
      </div>
    </section>
  );
}
