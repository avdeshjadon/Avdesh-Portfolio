/* Portfolio by Avdesh Jadon — Full Stack Developer & Software Tester. */
"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, EASE } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { sceneScrub } from "@/lib/scene";
import { CERTS } from "@/content/certifications";
import styles from "./Certifications.module.css";
import { useLang, L } from "@/lib/i18n";

const STEP_VH = 0.7;

const ENTER_X = 118; 
const ENTER_Z = -150; 
const BACK_Z = -520; 
const BACK_SCALE = 0.2; 
const BACK_MIN_OP = 0.18; 
const CULL_IN = 1.25; 
const CULL_BACK = 3.2; 

type Panel = { kind: "cert"; index: number };

const PANELS: Panel[] = CERTS.map((_, index) => ({ kind: "cert", index }));

const TONE = ["dark", "light", "dark", "light", "dark"] as const;

export default function Certifications() {
  const root = useRef<HTMLElement>(null);
  const { t, lang } = useLang();

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1001px) and (prefers-reduced-motion: no-preference)", () => {
      const panels = gsap.utils.toArray<HTMLElement>(`.${styles.panel}`);
      const counter = el.querySelector<HTMLElement>(`.${styles.count}`);
      const n = panels.length;
      let active = -1;

      el.classList.add(styles.deckMode);

      const setActive = (i: number) => {
        if (i === active) return;
        active = i;
        panels.forEach((p, k) => p.classList.toggle(styles.on, k === i));
        if (counter) counter.textContent = `${String(i + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
      };

      const place = (p: number) => {
        const front = Math.round(gsap.utils.clamp(0, n - 1, p));
        for (let i = 0; i < n; i++) {
          const el2 = panels[i];
          const d = i - p; 

          if (d > CULL_IN || d < -CULL_BACK) {
            el2.style.visibility = "hidden";
            continue;
          }
          el2.style.visibility = "visible";

          let x = 0;
          let z = 0;
          let op = 1;
          let sc = 1;

          if (d >= 0) {

            const t = Math.min(d, CULL_IN);
            x = ENTER_X * t;
            z = ENTER_Z * t;
            sc = 1 - 0.05 * t;
            op = 1 - Math.max(0, t - 0.5) / 0.62; 
          } else {

            const t = Math.min(CULL_BACK, -d);
            const e = 1 - Math.pow(1 - Math.min(t, 1), 2); 
            z = BACK_Z * (e + Math.max(0, t - 1) * 0.28);
            sc = 1 - BACK_SCALE * (e + Math.max(0, t - 1) * 0.12);
            op = Math.max(BACK_MIN_OP, 1 - e * 0.68 - Math.max(0, t - 1) * 0.06);
          }

          el2.style.transform =
            `translate3d(${x.toFixed(2)}%, 0%, ${z.toFixed(1)}px)` +
            ` scale(${sc.toFixed(3)})`;
          el2.style.opacity = String(gsap.utils.clamp(0, 1, op));
          el2.style.filter = "";

          el2.style.zIndex = String(i === front ? 500 : 200 - Math.round(Math.abs(d) * 20));
        }
        setActive(front);
      };

      let target = 0;
      let current = 0;
      const tick = (_t: number, dt: number) => {
        const f = Math.min(dt / 1000, 0.05);
        current += (target - current) * Math.min(f * 9, 1);
        place(current);
      };
      gsap.ticker.add(tick);
      place(0);

      const st = ScrollTrigger.create({
        ...sceneScrub(el),
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          target = self.progress * (n - 1);
        },
      });

      const handlers: Array<[HTMLElement, EventListener]> = [];
      panels.forEach((pnl, i) => {
        const h: EventListener = (e) => {
          const target = (e as MouseEvent).target as HTMLElement | null;
          if (target && target.closest("a, button")) {
            return;
          }
          const y = st.start + (i / (n - 1)) * (st.end - st.start);
          const lenis = getLenis();
          if (lenis) lenis.scrollTo(y, { duration: 1 });
          else window.scrollTo({ top: y, behavior: "smooth" });
        };
        pnl.addEventListener("click", h);
        handlers.push([pnl, h]);
      });

      gsap.from(`.${styles.foot} > *`, {
        y: 18,
        autoAlpha: 0,
        duration: 0.8,
        ease: EASE.outExpo,
        stagger: 0.08,
        immediateRender: false,
        scrollTrigger: { trigger: el, start: "top 74%" },
      });

      return () => {
        gsap.ticker.remove(tick);
        st.kill();
        handlers.forEach(([e2, h]) => e2.removeEventListener("click", h));
        el.classList.remove(styles.deckMode);
      };
    });

    mm.add("(max-width: 1000px), (prefers-reduced-motion: reduce)", () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.utils.toArray<HTMLElement>(`.${styles.panel}`).forEach((p) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: p,
            start: "top 92%",
            end: "top 45%",
            scrub: 0.4,
          },
        }).fromTo(
          p,
          { y: 54, rotateX: 14, autoAlpha: 0, transformOrigin: "50% 0%" },
          { y: 0, rotateX: 0, autoAlpha: 1, ease: "none", duration: 1 },
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className={styles.certs} id="certifications" ref={root}>
      {
}
      <div className={styles.head}>
        <p className={styles.eyebrow}>
          <span>07</span> {t("cert.eyebrow")}
        </p>
        <h2 className={styles.h2}>{t("cert.h2")}</h2>
        <p className={styles.lede}>{t("cert.lede")}</p>
      </div>

      <div className={styles.stageWrap}>
        <div className={styles.stage}>
          {PANELS.map((p, i) => {
            const tone = TONE[i % TONE.length];
            const cls = `${styles.panel} ${styles[tone]} ${i === 0 ? styles.on : ""}`;

            const c = CERTS[p.index];
            return (
              <article className={cls} key={c.title} style={{ zIndex: 200 - i }}>
                {
}
                <div className={styles.band}>
                  <span className={styles.no}>{c.no}</span>
                  <span className={styles.kind}>{c.kind}</span>
                  <span className={`${styles.status} ${c.verified ? styles.ok : ""}`}>
                    {c.verified ? t("cert.verified") : t("cert.onRequest")}
                  </span>
                </div>

                <div className={styles.issuerRow}>
                  {c.logo ? (
                    <span className={styles.logoPlate}>
                      <img
                        src={c.logo.src}
                        alt={c.issuer ?? ""}
                        style={{ aspectRatio: c.logo.aspect }}
                      />
                    </span>
                  ) : null}
                  <span className={styles.issuerName}>
                    {c.issuer
                      ? c.issuerSuffix
                        ? `${c.issuer} · ${c.issuerSuffix}`
                        : `${c.issuer} ${c.kind}`
                      : t("cert.issuerTBC")}
                  </span>
                </div>

                <h3 className={styles.title}>{L(lang, c, "title")}</h3>

                <div className={styles.detail}>
                  {c.metric && (
                    <div className={styles.metric}>
                      <span className={styles.metricValue}>{c.metric.value}</span>
                      <span className={styles.metricLabel}>{c.metric.label}</span>
                    </div>
                  )}

                  <div className={styles.cols}>
                    {}
                    <dl className={styles.record}>
                      <div>
                        <dt>{t("cert.issuedBy")}</dt>
                        <dd>{c.issuer ?? t("cert.tbc")}</dd>
                      </div>
                      <div>
                        <dt>{t("cert.year")}</dt>
                        <dd>{c.year ?? t("cert.tbc")}</dd>
                      </div>
                      <div>
                        <dt>{t("cert.id")}</dt>
                        <dd>{c.credentialId ?? "—"}</dd>
                      </div>
                    </dl>

                    <p className={styles.colLbl}>{t("cert.skills")}</p>
                    <ul className={styles.skills}>
                      {c.skills.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>

                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "14px", position: "relative", zIndex: 12 }}>
                      {c.credentialUrl && c.credentialUrl.startsWith("http") && (
                        <a
                          className={styles.verifyLink}
                          href={c.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Verify Online ↗
                        </a>
                      )}
                      {c.pdfUrl && (
                        <a
                          className={styles.verifyLink}
                          href={encodeURI(c.pdfUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View PDF ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className={styles.foot}>
        <span className={styles.brandFoot}>
          <b>06</b> Avdesh
        </span>
        <span className={styles.count}>
          01 / {String(PANELS.length).padStart(2, "0")}
        </span>
        <span className={styles.footLbl}>{t("cert.foot")}</span>
      </div>
    </section>
  );
}
