"use client";

/*
 * Design-system Button — the interaction standard for every CTA on the site.
 * Interaction language (recreated from scratch, PillNav as benchmark):
 *   · circular fill expands from the bottom of the pill on hover
 *   · label rolls up, replacement rolls in from below
 *   · optional trailing arrow rotates -45° on hover
 *   · magnetic pull on fine pointers
 * All motion is transform-only (GPU), respects prefers-reduced-motion,
 * and degrades to plain taps on touch devices.
 */

import { useEffect, useRef, type ReactNode, type MouseEventHandler } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import styles from "./Button.module.css";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "dark" | "ghost";
  size?: "sm" | "md";
  arrow?: boolean;
  lead?: ReactNode;
  magnetic?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  lead,
  magnetic = true,
  className = "",
  onClick,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !magnetic || prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const bx = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const by = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      bx((e.clientX - r.left - r.width / 2) * 0.18);
      by((e.clientY - r.top - r.height / 2) * 0.26);
    };
    const leave = () => {
      bx(0);
      by(0);
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [magnetic]);

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${className}`}
    >
      <span className={styles.fill} aria-hidden="true" />
      {lead && <span className={styles.lead}>{lead}</span>}
      <span className={styles.labelWrap}>
        <span className={styles.labelStack}>
          <span className={styles.label}>{children}</span>
          <span className={`${styles.label} ${styles.labelClone}`} aria-hidden="true">
            {children}
          </span>
        </span>
      </span>
      {arrow && (
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      )}
    </a>
  );
}
