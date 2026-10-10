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
    let registeredTicker: ((time: number) => void) | null = null;
    let localGsap: (typeof import("gsap"))["gsap"] | null = null;

    async function initLenis() {
      try {
        const { default: Lenis } = await import("lenis");
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");

        if (isCancelled) return;
        localGsap = gsap;

        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
          duration: 1.1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.2,
          autoRaf: false,
        });

        lenisRef.current = lenis;

        // Update ScrollTrigger on Lenis scroll
        lenis.on("scroll", ScrollTrigger.update);

        // Connect Lenis RAF to GSAP ticker safely
        const updateGsapTicker = (time: number) => {
          if (lenisRef.current) {
            lenisRef.current.raf(time * 1000);
          }
        };
        registeredTicker = updateGsapTicker;
        tickerFnRef.current = updateGsapTicker;

        gsap.ticker.add(updateGsapTicker);
        gsap.ticker.lagSmoothing(500, 33);

        // Refresh ScrollTrigger once DOM layout is settled
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      } catch (err) {
        console.warn("Smooth scroll initialization fallback to native:", err);
      }
    }

    initLenis();

    return () => {
      isCancelled = true;
      if (localGsap && registeredTicker) {
        localGsap.ticker.remove(registeredTicker);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      tickerFnRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
