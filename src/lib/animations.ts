/**
 * NEXORA Animation System
 *
 * Provides scoped, cleanup-safe GSAP animation utilities
 * for the hero and section transitions.
 */

import type { gsap as GSAPType } from "gsap";

export type GSAPContext = ReturnType<typeof GSAPType.context>;

/**
 * Hero entrance state — defines where each group starts
 * before the timeline drives them to their natural positions.
 */
export const HERO_INITIAL_STATE = {
  nav: { opacity: 0, y: -20 },
  headline: { opacity: 0, y: 32 },
  subtext: { opacity: 0, y: 24 },
  ctas: { opacity: 0, y: 20 },
  core: { opacity: 0, scale: 0.85 },
  badge: { opacity: 0, y: -8 },
};

/** Duration constants in seconds */
export const DUR = {
  fast: 0.4,
  normal: 0.6,
  slow: 0.9,
  xslow: 1.2,
};

/** Ease strings */
export const EASE = {
  out: "power3.out",
  inOut: "power2.inOut",
  elastic: "elastic.out(1, 0.75)",
  back: "back.out(1.4)",
};

/**
 * Returns a reduced-motion-safe duration.
 * Checks the media query at call time.
 */
export function safeDuration(duration: number): number {
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return 0.001;
  }
  return duration;
}

/**
 * Clamp helper for scroll-driven values.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linearly interpolate between two values.
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
