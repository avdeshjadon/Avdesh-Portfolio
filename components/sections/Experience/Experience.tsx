"use client";

/*
 * EXPERIENCE — centred stacked panel composition.
 *
 * Corrections applied from review:
 *   · The stack is the HERO VISUAL and sits in the CENTRE of the viewport —
 *     not small cards on the right, not a timeline, not a carousel.
 *   · Panels are WIDE, SHORT boards (≈72vw × 150–170px), sharp-edged and
 *     perspective-distorted — physical sheets, not rounded app cards.
 *   · Depth stack recedes up-and-back on a diagonal; the active board is
 *     closest, largest, sharpest. Exit travels down + back + blur + fade.
 *   · TEXT NEVER COLLIDES: waiting boards render identity only (year · role ·
 *     company). Description and skills exist ONLY on the active board.
 *   · Scroll physics: scroll → target progress → rAF interpolation →
 *     transforms. Never bound directly to raw scroll position.
 *   · One curated colour per board; white gallery background.
 */

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, EASE } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { sceneScrub } from "@/lib/scene";
import { ROLES } from "@/content/experience";
import styles from "./Experience.module.css";
import { useLang, L } from "@/lib/i18n";

/* Scroll length per board. Kept deliberately short: Work, Experience and
   Credentials are three pinned set-pieces in a row, so each one holds only as
   long as its own interaction needs — the page reads as cinematic beats
   rather than one long locked stretch. */
const STEP_VH = 0.62;
const DEPTH = 3; /* panels rendered behind the active one — depth/context */

/* Stack geometry (px). NOTE: the stage's rotateX turns part of each board's
   negative Z into DOWNWARD screen movement, which cancels much of the upward
   offset. UP is therefore sized so the RENDERED gap still exceeds the 46px
   identity strip — that is what keeps text from ever colliding. */
const UP = 74; /* each waiting panel sits this much higher */
const RIGHT = 26; /* …and this much further right → diagonal */
const BACK = 96; /* …and this much deeper in Z */
const TILT = 6; /* rotateX on the stage: the trapezoid read */

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
          const d = i - p; /* >0 waiting · 0 active · <0 leaving */
          const b = boards[i];

          if (d > DEPTH + 0.6 || d < -1.1) {
            b.style.visibility = "hidden";
            continue;
          }
          b.style.visibility = "visible";

          if (d >= 0) {
            /* waiting: up + right + back, progressively compressed */
            const k = Math.min(d, DEPTH);
            b.style.transform =
              `translate3d(${(k * RIGHT).toFixed(1)}px, ${(-k * UP).toFixed(1)}px, ${(-k * BACK).toFixed(1)}px)` +
              ` scale(${(1 - k * 0.028).toFixed(3)})`;
            b.style.opacity = String(Math.max(0, 1 - k * 0.16));
            b.style.filter = k > 1.2 ? `blur(${Math.min(3, (k - 1.2) * 1.2).toFixed(2)}px)` : "";
            b.style.zIndex = String(200 - Math.round(k * 10));
          } else {
            /* leaving: down + back, dissolving */
            const t = Math.min(1, -d / 1.1);
            b.style.transform =
              `translate3d(${(-t * 40).toFixed(1)}px, ${(t * 230).toFixed(1)}px, ${(-t * 320).toFixed(1)}px)` +
              ` scale(${(1 - t * 0.06).toFixed(3)})`;
            b.style.opacity = String(Math.max(0, 1 - t * 1.35));
            b.style.filter = t > 0.25 ? `blur(${((t - 0.25) * 5).toFixed(2)}px)` : "";
            b.style.zIndex = "210";
          }
        }
        setActive(Math.round(gsap.utils.clamp(0, n - 1, p)));
      };

      /* ---- scroll → target → interpolation → transforms ---- */
      let target = 0;
      let current = 0;
      const tick = (_t: number, dt: number) => {
        const f = Math.min(dt / 1000, 0.05);
        current += (target - current) * Math.min(f * 9, 1);
        place(current);
      };
      gsap.ticker.add(tick);
      place(0);

      /* the Scene's sticky hold does the pinning; this only reads progress */
      const st = ScrollTrigger.create({
        ...sceneScrub(el),
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          target = self.progress * (n - 1);
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

      /* very small perspective response to the pointer */
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
        gsap.from(b, {
          y: 40,
          autoAlpha: 0,
          duration: 0.85,
          ease: EASE.outExpo,
          immediateRender: false,
          scrollTrigger: { trigger: b, start: "top 88%" },
        });
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

      {/* the stack — centred, large, the hero visual of this section */}
      <div className={styles.stageWrap}>
        <div className={styles.stage}>
          {ROLES.map((r, i) => (
            <article
              className={`${styles.board} ${r.fg === "dark" ? styles.dark : ""} ${i === 0 ? styles.on : ""}`}
              key={r.company}
              style={{ background: r.color, zIndex: 200 - i }}
            >
              {/* IDENTITY STRIP — sits inside the exposed top band of every
                  panel, so a waiting panel's text can never be covered by,
                  or collide with, the panel in front of it */}
              <div className={styles.strip}>
                <span className={styles.year}>{r.period}</span>
                <span className={styles.company}>{r.company}</span>
                <span className={styles.type}>{t(`type.${r.type}`)}</span>
              </div>

              {/* FULL CONTENT — the active panel only, which nothing sits
                  in front of. This is the large, readable experience card. */}
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

                {/* right-hand visual anchor — the company mark. Sits forward
                    in Z so it parallaxes with the panel's own 3D movement. */}
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
                      {/* not lazy: five marks totalling ~17KB, and lazy
                          loading never triggers reliably inside a
                          3D-transformed panel — it just risks pop-in */}
                      <img src={r.logo.src} alt={`${r.company} logo`} />
                    </span>
                  ) : (
                    /* no official file supplied yet — typographic stand-in */
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
