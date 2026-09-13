/* Portfolio by Avdesh Jadon — Full Stack Developer & Software Tester. */
import type Lenis from "lenis";

let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;

export function headerOffset() {
  if (typeof document === "undefined") return 104;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(
    "--nav-offset"
  );
  const px = parseFloat(raw);
  return Number.isFinite(px) ? px : 104;
}

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

    if (toTop) window.scrollTo({ top: 0 });
    else (target as HTMLElement).scrollIntoView();
  }

  if (hash && hash !== "#") history.pushState(null, "", hash);
}
