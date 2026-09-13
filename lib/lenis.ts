import type Lenis from "lenis";

/* Shared Lenis instance + one place that owns in-page anchor scrolling,
   so the fixed header can never cover the top of a section. */

let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;

/** Distance the header occupies, plus breathing room below it.
 *  Read from the --nav-offset custom property so the smooth-scrolled path and
 *  the CSS scroll-margin-top path can never disagree. Deliberately NOT measured
 *  from the live header box: the nav hides on scroll-down, so a measurement
 *  taken mid-click would be short and the section would land under it. */
export function headerOffset() {
  if (typeof document === "undefined") return 104;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(
    "--nav-offset"
  );
  const px = parseFloat(raw);
  return Number.isFinite(px) ? px : 104;
}

/** Scroll to an in-page target, stopping clear of the header. */
export function scrollToHash(hash: string) {
  if (typeof document === "undefined") return;

  const toTop = hash === "#home" || hash === "#top" || hash === "#";
  const target = toTop ? null : document.querySelector(hash);
  if (!toTop && !target) return;

  const lenis = getLenis();

  if (lenis) {
    if (toTop) lenis.scrollTo(0, { duration: 1.1 });
    else lenis.scrollTo(target as HTMLElement, { offset: -headerOffset(), duration: 1.1 });
  } else {
    /* reduced motion / no Lenis — scroll-margin-top in globals.css
       keeps the landing position correct here too */
    if (toTop) window.scrollTo({ top: 0 });
    else (target as HTMLElement).scrollIntoView();
  }

  if (hash && hash !== "#") history.pushState(null, "", hash);
}
