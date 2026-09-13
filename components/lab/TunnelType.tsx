"use client";

/*
 * TUNNEL TYPE — the live Three.js Gallery Tunnel, visible only through
 * huge typography.
 *
 * Pipeline:   LIVE WEBGL CANVAS  →  COMPOSITOR MASK  →  LETTERFORMS
 *
 * · The tunnel is the user-supplied Originkit implementation, ported intact:
 *   Three.js scene · PerspectiveCamera · 15 recycled segments · grid tubes ·
 *   floor/ceiling/wall slab slots · vibrant color materials · image textures
 *   with fade-in · fog · camera-chase interpolation · DPR cap · resize.
 * · The canvas renders opaque (the tunnel's own dark world). A raster of
 *   "AVDESH" — drawn with the page's real loaded display font — is applied
 *   as a CSS mask ON the canvas element. Masking happens in the compositor:
 *   the WebGL loop keeps running untouched, so the 3D world moves while the
 *   stationary letters act as windows into it.
 * · Wheel / touch drive the camera forward through the tunnel (with a slow
 *   idle drift so it never feels dead); the pointer shifts the camera
 *   subtly on x/y. Reduced motion renders a single static frame.
 * · If WebGL is unavailable the component degrades to solid ink type.
 */

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import styles from "./TunnelType.module.css";

/* ---------- tunnel constants (from the supplied implementation) ---------- */
const TUNNEL_WIDTH = 2;
const TUNNEL_HEIGHT = 1.8;
const SEGMENT_DEPTH = 1;
const NUM_SEGMENTS = 15;
const LINE_RADIUS = 0.003;
const SCROLL_TO_Z = 0.05;
const CAMERA_CHASE = 0.1;
const FADE_IN = 1;
const FOG_FAR = NUM_SEGMENTS * SEGMENT_DEPTH * 0.95;

const BACKGROUND = "#0a0a0c";
const LINE_COLOR = "#9a9aa0";
const LINE_OPACITY = 0.5;
/* the supplied vibrant palette, red swapped for the brand vermilion */
const COLORS = ["#FF6A00", "#AB54F7", "#FF2E0F", "#0072E3", "#00AA3C", "#FFB200"];
const GRID = 4;
const FADE_PORTION = 1; /* fog reaches the full depth, like the reference */

const IMAGES = [
  "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/f8b3688c-11d0-425c-0b6f-66f133322c00/w=800",
  "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/c083d83a-f5a4-4434-989f-4eaa9bbe7500/w=800",
  "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/12e8b0be-f114-4134-1ab7-53116bfc2800/w=800",
  "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/b14ae2a2-1116-4a7f-0a18-1d74c4a46f00/w=800",
  "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/babdb603-8b5b-4520-58d6-240a34463c00/w=800",
];

/* ---------- motion ---------- */
const IDLE_SPEED = 0.9; /* slow forward drift so the world never freezes */
const WHEEL_GAIN = 0.045; /* wheel px → tunnel travel */
const MOUSE_X = 0.11; /* max sideways camera shift (world units) */
const MOUSE_Y = 0.07;

type Props = {
  text?: string;
};

export default function TunnelType({ text = "AVDESH" }: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!frame || !canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ================= the tunnel (supplied implementation) ================= */
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
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(BACKGROUND);
    const fogNear = Math.min(FOG_FAR * (1 - FADE_PORTION), FOG_FAR - 0.01);
    scene.fog = new THREE.Fog(new THREE.Color(BACKGROUND), fogNear, FOG_FAR);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 0, 0);

    const lineMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(LINE_COLOR),
      transparent: true,
      opacity: LINE_OPACITY,
    });

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    const fading: THREE.MeshBasicMaterial[] = [];
    let alive = true;

    const colorMats = COLORS.map(
      (hex) =>
        new THREE.MeshBasicMaterial({ color: new THREE.Color(hex), side: THREE.DoubleSide })
    );
    const imageMats = IMAGES.map((url) => {
      const mat = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      });
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
        () => {
          /* a dead URL costs a blank slab, not a broken tunnel */
        }
      );
      return mat;
    });

    const hw = TUNNEL_WIDTH / 2;
    const hh = TUNNEL_HEIGHT / 2;
    const cols = GRID;
    const rows = GRID;
    const colW = TUNNEL_WIDTH / cols;
    const rowH = TUNNEL_HEIGHT / rows;

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

    /* slab slots on floor, ceiling and both walls */
    const SLOTS: { geo: THREE.BufferGeometry; pos: THREE.Vector3; rot: THREE.Euler }[] = [];
    {
      const z = -SEGMENT_DEPTH / 2;
      for (let i = 0; i < cols; i++) {
        const x = -hw + i * colW + colW / 2;
        SLOTS.push({
          geo: geoFloor,
          pos: new THREE.Vector3(x, -hh, z),
          rot: new THREE.Euler(-Math.PI / 2, 0, 0),
        });
        SLOTS.push({
          geo: geoFloor,
          pos: new THREE.Vector3(x, hh, z),
          rot: new THREE.Euler(Math.PI / 2, 0, 0),
        });
      }
      for (let i = 0; i < rows; i++) {
        const y = -hh + i * rowH + rowH / 2;
        SLOTS.push({
          geo: geoWall,
          pos: new THREE.Vector3(-hw, y, z),
          rot: new THREE.Euler(0, Math.PI / 2, 0),
        });
        SLOTS.push({
          geo: geoWall,
          pos: new THREE.Vector3(hw, y, z),
          rot: new THREE.Euler(0, -Math.PI / 2, 0),
        });
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
      for (let i = 0; i <= cols; i++) {
        const x = -hw + i * colW;
        group.add(tube(geoTubeZ, x, -hh));
        group.add(tube(geoTubeZ, x, hh));
      }
      for (let i = 1; i < rows; i++) {
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

    /* ================= the typography mask ================= */
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

      const family =
        getComputedStyle(document.body).fontFamily || "Inter, sans-serif";
      /* fit the word to 94% of the frame width */
      let size = h * 0.62;
      ctx.font = `900 ${size}px ${family}`;
      if ("letterSpacing" in ctx) {
        (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
          "-0.04em";
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

    /* ================= sizing ================= */
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
    /* rebuild once the display font is actually loaded */
    document.fonts?.ready?.then(() => {
      if (alive) buildMask();
    });

    /* ================= input ================= */
    let scrollPos = 0;
    let travelTarget = 0;
    let mx = 0;
    let my = 0;

    const onWheel = (e: WheelEvent) => {
      travelTarget += e.deltaY * WHEEL_GAIN;
    };
    let lastTouchY: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY;
      if (y != null && lastTouchY != null) travelTarget += (lastTouchY - y) * 0.12;
      lastTouchY = y ?? null;
    };
    const onPointerMove = (e: PointerEvent) => {
      const r = frame.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      my = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onPointerLeave = () => {
      mx = 0;
      my = 0;
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    frame.addEventListener("pointermove", onPointerMove);
    frame.addEventListener("pointerleave", onPointerLeave);

    /* ================= loop ================= */
    let raf = 0;
    let last = 0;

    const animate = (now: number) => {
      if (!alive) return;
      raf = requestAnimationFrame(animate);
      const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
      last = now;

      /* travel: slow idle drift + eased wheel/touch input */
      travelTarget += IDLE_SPEED * dt * 10;
      scrollPos += (travelTarget - scrollPos) * 0.06;

      const want = -SCROLL_TO_Z * scrollPos;
      camera.position.z += CAMERA_CHASE * (want - camera.position.z);
      /* subtle pointer shift — a lean, not a game */
      camera.position.x += (mx * MOUSE_X - camera.position.x) * 0.06;
      camera.position.y += (-my * MOUSE_Y - camera.position.y) * 0.06;

      /* infinite segment recycling (from the supplied implementation) */
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

      /* image fade-in */
      for (let i = fading.length - 1; i >= 0; i--) {
        const m = fading[i];
        m.opacity = Math.min(1, m.opacity + dt / FADE_IN);
        if (m.opacity >= 1) fading.splice(i, 1);
      }

      renderer.render(scene, camera);
    };

    if (reduced) {
      renderer.render(scene, camera);
    } else {
      raf = requestAnimationFrame(animate);
    }

    /* ================= cleanup ================= */
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      frame.removeEventListener("pointermove", onPointerMove);
      frame.removeEventListener("pointerleave", onPointerLeave);
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
    <div className={styles.frame} ref={frameRef}>
      {webglOk ? (
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      ) : (
        <span className={styles.fallback}>{text}</span>
      )}
      {/* real text for screen readers and search engines */}
      <h1 className={styles.srOnly}>{text}</h1>
    </div>
  );
}
