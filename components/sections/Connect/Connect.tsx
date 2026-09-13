/* Portfolio by Avdesh Jadon — Full Stack Developer & Software Tester. */
"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, EASE, prefersReducedMotion } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import styles from "./Connect.module.css";
import { useLang } from "@/lib/i18n";

const PANELS = [
  { src: "/images/connect/moment-1.jpg", focus: "58% 30%", rotate: 26, z: -110, y: -26 },
  { src: "/images/connect/moment-2.jpg", focus: "center 32%", rotate: 13, z: -40, y: -8 },
  { src: "/images/connect/moment-3.jpg", focus: "center 34%", rotate: 0, z: 0, y: 0 },
  { src: "/images/connect/moment-4.jpg", focus: "center 30%", rotate: -13, z: -40, y: -8 },
  { src: "/images/connect/moment-5.jpg", focus: "46% 32%", rotate: -26, z: -110, y: -26 },
];

const MARKS: Record<string, ReactNode> = {
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  ),
};

const SOCIALS = [
  { name: "LinkedIn", mark: "linkedin", href: "https://www.linkedin.com/in/avdesh-jadon-" },
  { name: "GitHub", mark: "github", href: "https://github.com/avdeshjadon" },
  { name: "Instagram", mark: "instagram", href: "https://www.instagram.com/itsavdeshjadon" },
  { name: "Email", glyph: "@", href: "mailto:avdeshjadon.dev@gmail.com" },
] as const;

export default function Connect() {
  const root = useRef<HTMLElement>(null);
  const { t } = useLang();

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {

      gsap.from(`.${styles.head} > *`, {
        y: 36,
        autoAlpha: 0,
        duration: 0.9,
        ease: EASE.outExpo,
        stagger: 0.09,
        immediateRender: false,
        scrollTrigger: { trigger: el, start: "top 70%" },
      });
      gsap.from(`.${styles.panel}`, {
        y: 90,
        autoAlpha: 0,
        duration: 1.1,
        ease: EASE.outExpo,
        stagger: { each: 0.08, from: "center" },
        immediateRender: false,
        scrollTrigger: { trigger: `.${styles.arc}`, start: "top 82%" },
      });
      gsap.from(`.${styles.socials} > *`, {
        y: 26,
        autoAlpha: 0,
        duration: 0.8,
        ease: EASE.outExpo,
        stagger: 0.07,
        immediateRender: false,
        scrollTrigger: { trigger: `.${styles.socials}`, start: "top 88%" },
      });

      gsap.utils.toArray<HTMLElement>(`.${styles.panelInner}`).forEach((p, i) => {
        gsap.to(p, {
          y: `+=${6 + (i % 3) * 3}`,
          duration: 3 + (i % 3) * 0.7,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: i * 0.4,
        });
      });

      const panels = gsap.utils.toArray<HTMLElement>(`.${styles.panel}`);
      const setters = panels.map((p, i) => ({
        rx: gsap.quickTo(p, "rotationX", { duration: 0.9, ease: "power3.out" }),
        add: gsap.quickTo(p, "rotationY", { duration: 0.9, ease: "power3.out" }),
        base: PANELS[i].rotate,
      }));
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const cx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        const cy = ((e.clientY - r.top) / r.height - 0.5) * 2;
        setters.forEach((s) => {
          s.add(s.base + cx * 5);
          s.rx(-cy * 4);
        });
      };
      const onLeave = () => setters.forEach((s) => {
        s.add(s.base);
        s.rx(0);
      });
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);

      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.connect} id="contact" ref={root}>
      <div className={styles.head}>
        <p className={styles.eyebrow}>
          <span>09</span> {t("connect.eyebrow")}
        </p>
        <h2 className={styles.h2}>
          {t("connect.h2a")}{" "}
          <em className={styles.serif}>{t("connect.h2Em")}</em>
        </h2>
        <p className={styles.lede}>
          {t("connect.lede")}
        </p>
        <div className={styles.cta}>
          <Button href="mailto:avdeshjadon.dev@gmail.com" variant="primary" arrow>
            {t("connect.cta")}
          </Button>
        </div>
      </div>

      {}
      <div className={styles.arc} aria-hidden="true">
        {PANELS.map((p, i) => (
          <div
            className={styles.panel}
            key={p.src}
            style={
              {
                transform: `translate3d(0, ${p.y}px, ${p.z}px) rotateY(${p.rotate}deg)`,
              } as React.CSSProperties
            }
          >
            <div className={`${styles.panelInner} ${styles.hasPhoto}`}>
              <img
                className={styles.photo}
                src={p.src}
                alt=""
                style={{ objectPosition: p.focus }}
                loading="lazy"
                decoding="async"
                aria-hidden="true"
              />
            </div>
          </div>
        ))}
      </div>

      {}
      <div className={styles.socials}>
        {SOCIALS.map((s) => (
          <a
            key={s.name}
            href={s.href}
            className={styles.social}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel={s.href.startsWith("http") ? "noreferrer" : undefined}
          >
            <span className={styles.glyph}>
              {"mark" in s ? MARKS[s.mark] : s.glyph}
            </span>
            <span className={styles.roll}>
              <span>{s.name}</span>
              <span aria-hidden="true">{s.name}</span>
            </span>
            <span className={styles.arrow}>↗</span>
          </a>
        ))}
      </div>

      <footer className={styles.footer}>
        <span>
          {t("connect.credit")} <b>Avdesh</b>
        </span>
        <a href="#home" className={styles.top}>
          {t("connect.top")}
        </a>
        <span>© 2026 Avdesh Jadon</span>
      </footer>
    </section>
  );
}
