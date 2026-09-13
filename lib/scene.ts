/* Scroll range for a section held inside a Scene.
 *
 * A Scene renders two siblings: a sticky `[data-scene]` hold, then a
 * `[data-runway]` spacer that owns the scene's extra scroll distance.
 *
 * A scroll-driven interior CANNOT trigger off the section itself: the section
 * lives inside the sticky hold, so once it sticks its measured position stops
 * tracking the document and ScrollTrigger resolves start/end against a frozen
 * box — progress jams at 1. The runway is in normal flow, so it is the honest
 * ruler for "how far through this scene are we".
 *
 * With the runway as trigger:
 *   start "top bottom"   → the instant the hold sticks
 *   end   "bottom bottom" → exactly one runway later
 *
 * so progress runs 0→1 across precisely the scene's runway, and is scrubbable
 * at every pixel. Sections without a runway fall back to their own box.
 */
export function sceneScrub(el: Element): {
  trigger: Element;
  start: string;
  end: string;
} {
  const hold = el.closest("[data-scene]");
  const next = hold?.nextElementSibling ?? null;
  const runway =
    next instanceof HTMLElement && next.hasAttribute("data-runway") ? next : null;

  return runway
    ? { trigger: runway, start: "top bottom", end: "bottom bottom" }
    : { trigger: el, start: "top top", end: "bottom top" };
}
