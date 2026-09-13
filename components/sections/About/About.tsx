/* Portfolio by Avdesh Jadon — Full Stack Developer & Software Tester. */
"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion, EASE } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import VelocityMarquee from "@/components/ui/VelocityMarquee";
import styles from "./About.module.css";
import { useLang } from "@/lib/i18n";

const MARQUEE_ROWS = [
  {
    items: [
      "Java",
      "Python",
      "C++",
      "Spring Boot",
      "Spring Security",
      "Node.js",
      "REST APIs",
      "React",
      "JavaScript",
      "Tailwind CSS",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
    ],
    velocity: 34,
  },
  {
    items: [
      "Docker",
      "AWS EC2",
      "Maven",
      "Git",
      "GitHub",
      "JUnit",
      "JMeter",
      "Linux",
      "DSA",
      "OOP",
      "DBMS",
      "Computer Networks",
      "Operating Systems",
    ],
    velocity: -28,
    outline: true,
  },
];

const METRICS = [
  { value: "1st", count: null, key: "about.m1" },
  { value: "3+", count: 3, suffix: "+", key: "about.m2" },
  { value: "500+", count: 500, suffix: "+", key: "about.m3" },
  { value: "1B+", count: null, key: "about.m4" },
];

export default function About() {
  const root = useRef<HTMLElement>(null);
  const { t } = useLang();

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {

      const reveal = (targets: gsap.TweenTarget, trigger: Element, vars: gsap.TweenVars = {}) =>
        gsap.from(targets, {
          y: 44,
          autoAlpha: 0,
          duration: 1,
          ease: EASE.outExpo,
          stagger: 0.1,
          immediateRender: false,
          scrollTrigger: { trigger, start: "top 82%" },
          ...vars,
        });

      reveal([`.${styles.eyebrow}`, `.${styles.h2}`], el.querySelector(`.${styles.header}`)!);

      const band = el.querySelector(`.${styles.metrics}`);
      if (band) {
        reveal(`.${styles.metric}`, band, { stagger: 0.09 });
        ScrollTrigger.create({
          trigger: band,
          start: "top 84%",
          once: true,
          onEnter: () => {
            gsap.utils.toArray<HTMLElement>("[data-metric-count]").forEach((numEl) => {
              const target = Number(numEl.dataset.metricCount);
              const obj = { v: 0 };

              numEl.textContent = "0";
              gsap.to(obj, {
                v: target,
                duration: 1.4,
                ease: "power2.out",
                onUpdate: () => {
                  numEl.textContent = String(Math.round(obj.v));
                },
              });
            });
          },
        });
      }

      reveal(
        [`.${styles.edu}`, `.${styles.next}`],
        el.querySelector(`.${styles.edu}`)!,
        { stagger: 0.12 }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.about} id="about" ref={root}>
      <VelocityMarquee rows={MARQUEE_ROWS} />

      <div className={styles.wrap}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>
            <span>01</span> {t("about.eyebrow")}
          </p>
          <h2 className={styles.h2}>
            {t("about.h2a")}<br />
            {t("about.h2b")} <em className={styles.serif}>{t("about.h2Em")}</em>{t("about.h2c")}
          </h2>
        </div>

        <div className={styles.metrics}>
          {METRICS.map((m) => (
            <div className={styles.metric} key={m.key}>
              <div className={styles.metricNum}>
                {m.count !== null ? (
                  <>
                    {"prefix" in m && m.prefix}
                    {

}
                    <span data-metric-count={m.count}>{m.count}</span>
                    <i>{m.suffix}</i>
                  </>
                ) : (
                  <span className={styles.metricStatic}>{m.value}</span>
                )}
              </div>
              <div className={styles.metricLabel}>{t(m.key)}</div>
            </div>
          ))}
        </div>

        <p className={styles.edu}>
          {t("about.edu")}
        </p>

        <div className={styles.next}>
          <Button href="#work" variant="dark" size="sm" arrow>
            {t("about.cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
