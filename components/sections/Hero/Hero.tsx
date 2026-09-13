/* Portfolio by Avdesh Jadon — Full Stack Developer & Software Tester. */
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, prefersReducedMotion, EASE } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import styles from "./Hero.module.css";
import { useLang } from "@/lib/i18n";

const STATS_LEFT = [
  { n: 20, suffix: "+", key: "stat.projects", icon: "/images/icons/projects.png" },
  { n: 5, suffix: "+", key: "stat.years", icon: "/images/icons/years.png" },
];
const STATS_RIGHT = [
  { n: 10, suffix: "+", key: "stat.countries", icon: "/images/icons/countries.png" },
  { n: 100, suffix: "%", key: "stat.satisfaction", icon: "/images/icons/satisfaction.png" },
];

const PARTICLES = [
  { x: 8, y: 26, s: 6, accent: true },
  { x: 14, y: 62, s: 4, accent: false },
  { x: 5, y: 78, s: 5, accent: false },
  { x: 90, y: 22, s: 5, accent: false },
  { x: 94, y: 58, s: 6, accent: true },
  { x: 86, y: 82, s: 4, accent: false },
];

function StatCard({ n, suffix, label, icon }: { n: number; suffix: string; label: string; icon: string }) {
  return (
    <div className={styles.statCard}>
      <img className={styles.statIcon} src={icon} alt="" aria-hidden="true" />
      <div className={styles.statNum} data-count={n}>
        <span>0</span>
        <i>{suffix}</i>
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const { t } = useLang();

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {

      const tl = gsap.timeline({

        defaults: { ease: EASE.outExpo, immediateRender: false },
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });

      tl.from(`.${styles.ambient} > *`, { autoAlpha: 0, duration: 1.8, stagger: 0.06, ease: "power1.out" }, 0)
        .from(`.${styles.kicker}`, { y: 22, autoAlpha: 0, duration: 0.7 }, 0.1)
        .from(`.${styles.row}`, { y: 70, autoAlpha: 0, duration: 1.05, stagger: 0.12 }, "-=0.45")
        .from(`.${styles.sub}`, { y: 24, autoAlpha: 0, duration: 0.8 }, "-=0.7")
        .from(`.${styles.ctas} > *`, { y: 18, autoAlpha: 0, duration: 0.6, stagger: 0.08 }, "-=0.55")
        .from(
          `.${styles.archLine}`,
          { scaleY: 0.85, autoAlpha: 0, transformOrigin: "bottom center", duration: 0.9, ease: "power3.out" },
          "-=0.5"
        )
        .from(
          `.${styles.arch}`,
          { scaleY: 0.9, autoAlpha: 0, transformOrigin: "bottom center", duration: 1.0, ease: "power3.out" },
          "<0.08"
        )
        .from(`.${styles.portrait}`, { y: 110, autoAlpha: 0, duration: 1.15, ease: "power3.out" }, "-=0.75")
        .from(
          `.${styles.statCard}`,
          { y: 40, autoAlpha: 0, duration: 0.85, stagger: 0.09, ease: "back.out(1.3)" },
          "-=0.75"
        )
        .from(`.${styles.scrollCue}`, { y: 16, autoAlpha: 0, duration: 0.7 }, "-=0.6");

      tl.call(
        () => {
          gsap.utils.toArray<HTMLElement>(`.${styles.statNum}`).forEach((numEl) => {
            const target = Number(numEl.dataset.count || 0);
            const obj = { v: 0 };
            gsap.to(obj, {
              v: target,
              duration: 1.3,
              ease: "power2.out",
              onUpdate: () => {
                numEl.firstChild!.textContent = String(Math.round(obj.v));
              },
            });
          });
        },
        [],
        "-=0.9"
      );

      gsap.utils.toArray<HTMLElement>(`.${styles.particle}`).forEach((p) => {
        gsap.to(p, {
          y: `+=${gsap.utils.random(-18, 18)}`,
          x: `+=${gsap.utils.random(-10, 10)}`,
          duration: gsap.utils.random(4, 7),
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: gsap.utils.random(0, 2),
        });
      });
      gsap.utils.toArray<HTMLElement>(`.${styles.glow}`).forEach((g, i) => {
        gsap.to(g, {
          opacity: 0.55,
          duration: 5.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: i * 2,
        });
      });

      const layers = gsap.utils.toArray<HTMLElement>("[data-depth]");
      const setters = layers.map((layer) => ({
        depth: Number(layer.dataset.depth),
        x: gsap.quickTo(layer, "x", { duration: 1.1, ease: "power3.out" }),
        y: gsap.quickTo(layer, "y", { duration: 1.1, ease: "power3.out" }),
      }));
      const portraitEl = el.querySelector(`.${styles.portrait}`);
      const tilt = portraitEl
        ? gsap.quickTo(portraitEl, "rotation", { duration: 1.4, ease: "power3.out" })
        : null;
      const onMove = (e: MouseEvent) => {
        const cx = (e.clientX / window.innerWidth - 0.5) * 2;
        const cy = (e.clientY / window.innerHeight - 0.5) * 2;
        setters.forEach((s) => {
          s.x(cx * s.depth * 80);
          s.y(cy * s.depth * 44);
        });
        tilt?.(cx * 1.2);
      };
      window.addEventListener("mousemove", onMove);

      gsap
        .timeline({
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        })
        .to(`.${styles.head}`, { y: -60, autoAlpha: 0.2 }, 0)
        .to(`.${styles.arch}`, { y: 50 }, 0)
        .to([`.${styles.sideL}`, `.${styles.sideR}`], { y: -34 }, 0)
        .to(`.${styles.ambient}`, { autoAlpha: 0 }, 0);

      return () => window.removeEventListener("mousemove", onMove);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} id="home" ref={root}>
      {}
      <div className={styles.ambient} aria-hidden="true">
        <span className={`${styles.glow} ${styles.glowL}`} data-depth="0.012" />
        <span className={`${styles.glow} ${styles.glowR}`} data-depth="0.016" />
        <span className={styles.ring} data-depth="0.02" />
        <span className={styles.plusA}>+</span>
        <span className={styles.plusB}>+</span>
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={`${styles.particle} ${p.accent ? styles.particleAccent : ""}`}
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s }}
          />
        ))}
      </div>

      {}
      <div className={styles.head} data-depth="0.01">
        <p className={styles.kicker}>{t("hero.kicker")}</p>
        <h1 className={styles.h1}>
          <span className={styles.row}>
            {t("hero.h1a")} <em className={styles.serif}>{t("hero.h1aEm")}</em>
          </span>
          <span className={styles.row}>
            {t("hero.h1b")}{" "}
            <em className={`${styles.serif} ${styles.red}`}>{t("hero.h1bEm")}</em>
          </span>
        </h1>
        <p className={styles.sub}>{t("hero.sub")}</p>
        <div className={styles.ctas}>
          <Button href="#work" variant="primary" arrow>
            {t("hero.cta1")}
          </Button>
          <Button href="#about" variant="ghost" lead={<span className={styles.play}>▶</span>}>
            {t("hero.cta2")}
          </Button>
        </div>
      </div>

      {}
      <div className={styles.stageRow}>
        <div className={`${styles.side} ${styles.sideL}`}>
          {STATS_LEFT.map((s) => (
            <StatCard key={s.key} n={s.n} suffix={s.suffix} icon={s.icon} label={t(s.key)} />
          ))}
        </div>

        <div className={styles.stage}>
          <div className={styles.archLine} aria-hidden="true" />
          <div className={styles.arch} data-depth="0.02" aria-hidden="true" />

          <Image
            className={styles.portrait}
            src="/images/portrait-v2.png"
            alt="Avdesh Jadon — Full Stack Developer & Software Tester"
            width={554}
            height={573}
            priority
            data-depth="0.03"
          />

        </div>

        <div className={`${styles.side} ${styles.sideR}`}>
          {STATS_RIGHT.map((s) => (
            <StatCard key={s.key} n={s.n} suffix={s.suffix} icon={s.icon} label={t(s.key)} />
          ))}
        </div>
      </div>

      {}
      <div className={styles.scrollCue}>
        <span>{t("hero.scroll")}</span>
        <span className={styles.cueArrow} aria-hidden="true">
          ↓
        </span>
      </div>
    </section>
  );
}
