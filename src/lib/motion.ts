import type { Variants } from "framer-motion";

/**
 * Shared motion primitives.
 *
 * Every animated element drives itself with `initial` + `whileInView` rather
 * than inheriting a variant state from a staggering parent. Parent-to-child
 * variant propagation proved unreliable here: children mounted inside a
 * container that had already resolved its own state stayed pinned at their
 * `hidden` opacity and never became visible, which silently blanked whole
 * sections. Self-driven reveals cannot fail that way, and a per-item `delay`
 * reproduces the staggered feel.
 *
 * `MotionConfig reducedMotion="user"` in App.tsx strips these for anyone who
 * asks for reduced motion.
 */

export const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

/** Scroll-reveal props for a single element: animate once, when it comes into view. */
export const revealProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.15 },
  variants: fadeUp,
} as const;

/**
 * Scroll-reveal for item `index` in a list, offset so items arrive in sequence.
 * Spread onto each item instead of wrapping them in a staggering parent.
 */
export function revealItem(index: number, step = 0.07) {
  return {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.15 },
    variants: {
      hidden: { opacity: 0, y: 16 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: EASE, delay: index * step },
      },
    } satisfies Variants,
  } as const;
}

/** Entry animation for above-the-fold content, which must not wait for scroll. */
export function entranceItem(index: number, step = 0.07) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: EASE, delay: index * step },
  } as const;
}
