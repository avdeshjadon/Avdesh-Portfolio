/* Portfolio by Avdesh Jadon — Full Stack Developer & Software Tester. */
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import styles from "./Nav.module.css";

const LINKS = [
  { key: "nav.home", href: "#home", watch: null },
  { key: "nav.about", href: "#about", watch: "about" },
  { key: "nav.work", href: "#work", watch: "work" },
  { key: "nav.contact", href: "#contact", watch: "contact" },
];

export default function Nav() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLang();
  const [active, setActive] = useState<string | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const close = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  useEffect(() => {
    const nav = ref.current;
    if (!nav) return;

    const ctx = gsap.context(() => {

      ScrollTrigger.create({
        start: "top top-=40",
        onUpdate: (self) => {
          nav.classList.toggle(styles.scrolled, self.scroll() > 40);
        },
        onLeaveBack: () => nav.classList.remove(styles.scrolled),
      });

      const spies = LINKS.filter((l) => l.watch)
        .map((l) => {
          const target = document.getElementById(l.watch!);
          if (!target) return null;
          return ScrollTrigger.create({
            trigger: target,
            start: "top 55%",
            end: "bottom 45%",
            onToggle: (self) => {
              if (self.isActive) setActive(l.watch);
            },
          });
        })
        .filter((s): s is ScrollTrigger => s !== null);
      const top = ScrollTrigger.create({
        start: 0,
        end: () => window.innerHeight * 1.2,
        onToggle: (self) => {
          if (self.isActive) setActive(null);
        },
      });

      const about = document.getElementById("about");
      const aboutHide = about
        ? (() => {
            const tw = gsap.to(nav, {
              opacity: 0,
              y: -14,
              duration: 0.7,
              ease: "power2.inOut",
              paused: true,
              onComplete: () => {
                nav.style.pointerEvents = "none";
              },
              onReverseComplete: () => {
                nav.style.pointerEvents = "";
              },
            });
            return ScrollTrigger.create({
              trigger: about,
              start: "top 100%",
              end: "top 45%",
              onEnter: () => tw.play(),
              onLeaveBack: () => tw.reverse(),
            });
          })()
        : null;

      return () => {
        spies.forEach((s) => s.kill());
        top.kill();
        aboutHide?.kill();
      };
    }, nav);

    return () => ctx.revert();
  }, []);

  return (
    <header className={styles.wrap} ref={ref}>
      <div className={styles.cap}>
        <a href="#home" className={styles.logo} aria-label={t("nav.home")}>
          AVDESH<i>.</i>
        </a>

        <nav className={styles.links} aria-label="Primary">
          {LINKS.map((l) => {
            const isOn = l.watch === active;
            return (
              <a
                key={l.key}
                href={l.href}
                className={isOn ? styles.on : ""}
                aria-current={isOn ? "page" : undefined}
              >
                <span className={styles.roll}>
                  <span>{t(l.key)}</span>
                  <span aria-hidden="true">{t(l.key)}</span>
                </span>
              </a>
            );
          })}
        </nav>

        <div className={styles.right}>
          <button
            type="button"
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
            aria-label={menuOpen ? t("nav.close") : t("nav.menu")}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      {}
      <div
        className={`${styles.sheet} ${menuOpen ? styles.sheetOpen : ""}`}
        id="mobile-nav"
        hidden={!menuOpen}
      >
        <nav aria-label="Primary mobile">
          {LINKS.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className={l.watch === active ? styles.sheetOn : ""}
              aria-current={l.watch === active ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {t(l.key)}
            </a>
          ))}
        </nav>
      </div>
      <button
        type="button"
        className={`${styles.scrim} ${menuOpen ? styles.scrimOn : ""}`}
        aria-label={t("nav.close")}
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
      />
    </header>
  );
}
