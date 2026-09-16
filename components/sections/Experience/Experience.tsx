/* Portfolio by Avdesh Jadon — Full Stack Developer & Software Tester. */
"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, EASE } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { sceneScrub } from "@/lib/scene";
import { ROLES } from "@/content/experience";
import styles from "./Experience.module.css";
import { useLang, L } from "@/lib/i18n";

const STEP_VH = 0.62;
const DEPTH = 3; 

const UP = 74; 
const RIGHT = 26; 
const BACK = 96; 
const TILT = 6; 

export default function Experience() {
  const root = useRef<HTMLElement>(null);
  const { t, lang } = useLang();

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1001px) and (prefers-reduced-motion: no-preference)", () => {
      const boards = gsap.utils.toArray<HTMLElement>(`.${styles.board}`);
      const navItems = gsap.utils.toArray<HTMLElement>(`.${styles.navItem}`);
      const counter = el.querySelector<HTMLElement>(`.${styles.count}`);
      const tint = el.querySelector<HTMLElement>(`.${styles.tint}`);
      const n = boards.length;
      let active = -1;

      el.classList.add(styles.deckMode);

      const setActive = (idx: number) => {
        if (idx === active) return;
        active = idx;
        boards.forEach((b, i) => b.classList.toggle(styles.on, i === idx));
        navItems.forEach((it, i) => it.classList.toggle(styles.navOn, i === idx));
        if (counter) counter.textContent = `0${idx + 1} / 0${n}`;
        if (tint) tint.style.background = `${ROLES[idx].color}12`;
      };

      const place = (p: number) => {
        for (let i = 0; i < n; i++) {
          const d = i - p;
          const b = boards[i];

          const hidden = d > DEPTH + 0.6 || d < -1.1;
          if (hidden) {
            if (b.style.visibility !== "hidden") b.style.visibility = "hidden";
            continue;
          }
          if (b.style.visibility !== "visible") b.style.visibility = "visible";

          if (d >= 0) {
            const k = Math.min(d, DEPTH);
            b.style.transform =
              `translate3d(${(k * RIGHT).toFixed(1)}px, ${(-k * UP).toFixed(1)}px, ${(-k * BACK).toFixed(1)}px)` +
              ` scale(${(1 - k * 0.028).toFixed(3)})`;
            b.style.opacity = String(Math.max(0, 1 - k * 0.16));
            b.style.zIndex = String(200 - Math.round(k * 10));
          } else {
            const t = Math.min(1, -d / 1.1);
            b.style.transform =
              `translate3d(${(-t * 40).toFixed(1)}px, ${(t * 230).toFixed(1)}px, ${(-t * 320).toFixed(1)}px)` +
              ` scale(${(1 - t * 0.06).toFixed(3)})`;
            b.style.opacity = String(Math.max(0, 1 - t * 1.35));
            b.style.zIndex = "210";
          }
        }
        setActive(Math.round(gsap.utils.clamp(0, n - 1, p)));
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

      const totalSegs = Math.max(1, n - 1);
      const seg = 1 / totalSegs;
      const st = ScrollTrigger.create({
        ...sceneScrub(el),
        scrub: 0.2,
        invalidateOnRefresh: true,
        snap: {
          snapTo: (value: number) => {
            const snapped = Math.round((value - seg * 0.3) / seg) * seg;
            return gsap.utils.clamp(0, 1, snapped);
          },
          duration: { min: 0.2, max: 0.5 },
          ease: "power2.inOut",
          delay: 0.05,
        },
        onUpdate: (self) => {
          target = Math.round(gsap.utils.clamp(0, totalSegs, self.progress * totalSegs));
        },
      });

      const jump = (idx: number) => {
        const y = st.start + (idx / (n - 1)) * (st.end - st.start);
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(y, { duration: 1 });
        else window.scrollTo({ top: y, behavior: "smooth" });
      };
      const handlers: Array<[HTMLElement, () => void]> = [];
      [...boards, ...navItems].forEach((elm, idx) => {
        const i = idx % n;
        const h = () => jump(i);
        elm.addEventListener("click", h);
        handlers.push([elm, h]);
      });

      const stage = el.querySelector<HTMLElement>(`.${styles.stage}`);
      let rx: ReturnType<typeof gsap.quickTo> | null = null;
      let ry: ReturnType<typeof gsap.quickTo> | null = null;
      if (stage) {
        rx = gsap.quickTo(stage, "rotationX", { duration: 1, ease: "power3.out" });
        ry = gsap.quickTo(stage, "rotationY", { duration: 1, ease: "power3.out" });
      }
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const cx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        const cy = ((e.clientY - r.top) / r.height - 0.5) * 2;
        rx?.(TILT - cy * 2.2);
        ry?.(cx * 2.6);
      };
      el.addEventListener("pointermove", onMove);

      gsap.from(`.${styles.header} > *`, {
        y: 34,
        autoAlpha: 0,
        duration: 0.9,
        ease: EASE.outExpo,
        stagger: 0.09,
        immediateRender: false,
        scrollTrigger: { trigger: el, start: "top 72%" },
      });

      return () => {
        gsap.ticker.remove(tick);
        st.kill();
        el.removeEventListener("pointermove", onMove);
        handlers.forEach(([elm, h]) => elm.removeEventListener("click", h));
        el.classList.remove(styles.deckMode);
      };
    });

    mm.add("(max-width: 1000px), (prefers-reduced-motion: reduce)", () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.utils.toArray<HTMLElement>(`.${styles.board}`).forEach((b) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: b,
            start: "top 92%",
            end: "top 45%",
            scrub: 0.4,
          },
        }).fromTo(
          b,
          { y: 54, rotateX: 14, autoAlpha: 0, transformOrigin: "50% 0%" },
          { y: 0, rotateX: 0, autoAlpha: 1, ease: "none", duration: 1 },
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className={styles.experience} id="experience" ref={root}>
      <div className={styles.tint} aria-hidden="true" />

      <div className={styles.header}>
        <p className={styles.eyebrow}>
          <span>06</span> {t("exp.eyebrow")}
        </p>
        <h2 className={styles.h2}>
          {t("exp.h2")} <em className={styles.serif}>{t("exp.h2Em")}</em>
        </h2>
      </div>

      {}
      <div className={styles.stageWrap}>
        <div className={styles.stage}>
          {ROLES.map((r, i) => (
            <article
              className={`${styles.board} ${r.fg === "dark" ? styles.dark : ""} ${i === 0 ? styles.on : ""}`}
              key={r.company}
              style={{ background: r.color, zIndex: 200 - i }}
            >
              {

}
              <div className={styles.strip}>
                <span className={styles.year}>{r.period}</span>
                <span className={styles.company}>{r.company}</span>
                <span className={styles.type}>{t(`type.${r.type}`)}</span>
              </div>

              {
}
              <div
                className={`${styles.detailCol} ${
                  r.logo?.placement === "below" ? styles.logoBelow : ""
                }`}
              >
                <div className={styles.contentCol}>
                  <h3 className={styles.role}>{L(lang, r, "role")}</h3>
                  <p className={styles.loc}>{r.location}</p>

                  <div className={styles.body}>
                    <div className={styles.bodyMain}>
                      <p className={styles.lbl}>{t("exp.worked")}</p>
                      <p className={styles.summary}>{L(lang, r, "summary")}</p>
                      <ul className={styles.list}>
                        {r.achievements.map((a) => (
                          <li key={a}>{a}</li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.bodySide}>
                      <p className={styles.lbl}>{t("exp.impact")}</p>
                      <p className={styles.outcome}>{L(lang, r, "outcome")}</p>
                      <p className={`${styles.lbl} ${styles.lblGap}`}>{t("exp.tools")}</p>
                      <div className={styles.skills}>
                        {r.skills.map((s) => (
                          <i key={s}>{s}</i>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {
}
                <div className={styles.logoCol}>
                  {r.logo ? (
                    <span
                      className={`${styles.logoWrap} ${styles[r.logo.variant]}`}
                      style={
                        r.logo.variant === "plate"
                          ? ({ "--logo-aspect": r.logo.aspect } as React.CSSProperties)
                          : undefined
                      }
                    >
                      {

}
                      <img src={r.logo.src} alt={`${r.company} logo`} />
                    </span>
                  ) : (

                    <span className={`${styles.logoWrap} ${styles.mono}`}>
                      <b>{r.company.split(" ")[0]}</b>
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.foot}>
        <span className={styles.count}>01 / 0{ROLES.length}</span>
        <div className={styles.nav} role="list">
          {ROLES.map((r) => (
            <button className={styles.navItem} key={r.company} type="button">
              <i style={{ background: r.color }} />
              {r.company}
            </button>
          ))}
        </div>
        <span className={styles.hintFoot}>{t("exp.hint")}</span>
      </div>
    </section>
  );
}
