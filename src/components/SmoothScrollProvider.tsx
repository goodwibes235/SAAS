"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<import("lenis").default | null>(null);
  const tickerFnRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    let isCancelled = false;

    async function initLenis() {
      const { default: Lenis } = await import("lenis");
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      if (isCancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.2,
      });

      lenisRef.current = lenis;

      // Update ScrollTrigger on Lenis scroll
      lenis.on("scroll", ScrollTrigger.update);

      // Connect Lenis RAF to GSAP ticker
      const updateGsapTicker = (time: number) => {
        lenis.raf(time * 1000);
      };
      tickerFnRef.current = updateGsapTicker;

      gsap.ticker.add(updateGsapTicker);
      gsap.ticker.lagSmoothing(0);

      // Refresh ScrollTrigger once DOM layout is settled
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }

    initLenis();

    return () => {
      isCancelled = true;
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      if (tickerFnRef.current) {
        import("gsap").then(({ gsap }) => {
          if (tickerFnRef.current) {
            gsap.ticker.remove(tickerFnRef.current);
            tickerFnRef.current = null;
          }
        });
      }
    };
  }, []);

  return <>{children}</>;
}
