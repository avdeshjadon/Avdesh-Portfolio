/* Portfolio by Avdesh Jadon — Full Stack Developer & Software Tester. */
"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion, EASE } from "@/lib/gsap";
import { sceneScrub } from "@/lib/scene";
import { PROJECTS } from "@/content/projects";
import styles from "./Work.module.css";
import { useLang, L } from "@/lib/i18n";

const SPREAD = 330; 

const PIN_PER_CARD = 210;

const pad = (n: number) => String(n).padStart(2, "0");

export default function Work() {
  const root = useRef<HTMLElement>(null);
  const { t, lang } = useLang();

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1101px) and (prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`);
      const counter = el.querySelector<HTMLElement>(`.${styles.count}`);
      const dots = gsap.utils.toArray<HTMLElement>(`.${styles.dot}`);
      const n = cards.length;

      const render = (p: number) => {
        cards.forEach((card, i) => {
          const d = i - p;
          const ad = Math.abs(d);
          gsap.set(card, {
            x: d * SPREAD,
            y: Math.min(ad * ad * 9, 110),
            rotationY: gsap.utils.clamp(-34, 34, -d * 10),
            scale: 1 - Math.min(ad * 0.065, 0.38),

            autoAlpha: ad <= 2 ? 1 : Math.max(0.55, 1 - (ad - 2) * 0.22),
            zIndex: Math.round(100 - ad * 10),
          });
        });
        const active = Math.round(gsap.utils.clamp(0, n - 1, p));
        if (counter) {
          counter.textContent = `${pad(active + 1)} / ${pad(n)}`;
        }
        dots.forEach((dot, i) => dot.classList.toggle(styles.dotOn, i === active));
      };

      render(0);

      const st = ScrollTrigger.create({
        ...sceneScrub(el),
        scrub: 0.65,
        invalidateOnRefresh: true,
        onUpdate: (self) => render(self.progress * (n - 1)),
      });

      gsap.from(`.${styles.header} > *`, {
        y: 40,
        autoAlpha: 0,
        duration: 0.9,
        ease: EASE.outExpo,
        stagger: 0.09,
        immediateRender: false,
        scrollTrigger: { trigger: el, start: "top 70%" },
      });

      return () => st.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section className={styles.work} id="work" ref={root}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>
          <span>05</span> {t("work.eyebrow")}
        </p>
        <div className={styles.headRow}>
          <h2 className={styles.h2}>
            {t("work.h2a")}
            <br />
            {t("work.h2b")} <em className={styles.serif}>{t("work.h2Em")}</em>
          </h2>
          <p className={styles.lede}>
            {t("work.lede")}
          </p>
        </div>
      </div>

      <div className={styles.stage}>
        <div className={styles.track}>
          {PROJECTS.map((p, i) => (
            <article className={styles.card} key={p.slug} style={{ zIndex: 100 - i }}>
              <a className={styles.inner} href={`/work/${p.slug}`}>
                <div
                  className={styles.cover}
                  style={
                    p.cover
                      ? { background: p.cover.bg, color: p.cover.ink === "light" ? "#fff" : "var(--ink)" }
                      : undefined
                  }
                >
                  {p.cover?.src && p.cover.variant === "photo" ? (

                    <img
                      className={styles.coverPhoto}
                      src={p.cover.src}
                      alt={p.coverLabel}
                      style={p.cover.focus ? { objectPosition: p.cover.focus } : undefined}
                      loading="lazy"
                    />
                  ) : p.cover?.src ? (

                    <img
                      className={styles.coverBrand}
                      src={p.cover.src}
                      alt={p.coverLabel}
                      style={{ aspectRatio: p.cover.aspect ?? 1 }}
                      loading="lazy"
                    />
                  ) : p.cover?.mark ? (
                    <span className={styles.coverMark} aria-label={p.coverLabel}>
                      {p.cover.mark}
                    </span>
                  ) : (
                    <span>▢&nbsp;&nbsp;{p.coverLabel}</span>
                  )}
                  {p.award && <span className={styles.award}>{p.award}</span>}
                </div>
                <div className={styles.meta}>
                  <h3>{L(lang, p, "title")}</h3>
                  <p className={styles.contribution}>{L(lang, p, "contribution")}</p>
                  <p className={styles.tags}>
                    {p.tags.join(" · ").toUpperCase()}
                  </p>
                  <div className={styles.metaFoot}>
                    <span className={styles.year}>{p.year}</span>
                    <span className={styles.open}>
                      {t("work.open")} <i>→</i>
                    </span>
                  </div>
                </div>
              </a>
              {

}
              {(p.site || p.repo) && (
                <a
                  className={styles.siteChip}
                  href={p.site ? p.site.url : p.repo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${p.site ? p.site.label : "GitHub"} ↗`}
                >
                  {p.site ? p.site.label : "GitHub"} <i aria-hidden="true">↗</i>
                </a>
              )}
            </article>
          ))}
        </div>
      </div>

      <div className={styles.foot}>
        <span className={styles.count}>01 / {pad(PROJECTS.length)}</span>
        <div className={styles.dots}>
          {PROJECTS.map((p, i) => (
            <span key={p.slug} className={`${styles.dot} ${i === 0 ? styles.dotOn : ""}`} />
          ))}
        </div>
        <span className={styles.hint}>{t("work.hint")}</span>
      </div>
    </section>
  );
}
