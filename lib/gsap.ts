import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* Shared motion vocabulary — 02_UX_AND_INTERACTIONS.md */
export const EASE = {
  outExpo: "expo.out",
  softInOut: "power3.inOut",
  settle: "power2.out",
} as const;

export const DUR = {
  fast: 0.2,
  base: 0.4,
  slow: 0.8,
  reveal: 1.0,
} as const;

export const STAGGER = 0.07;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger };
