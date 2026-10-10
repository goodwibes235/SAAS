"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Radio } from "lucide-react";

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const cockpitWrapRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(0);

  useEffect(() => {
    let gsapCtx: { revert: () => void } | null = null;
    let isCancelled = false;

    async function initShowcaseMotion() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      if (isCancelled || !sectionRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      gsapCtx = gsap.context(() => {
        if (cockpitWrapRef.current) {
          // Perspective 3D entrance: starts angled away, resolves flat and forward with scrub
          gsap.fromTo(
            cockpitWrapRef.current,
            {
              rotateX: 24,
              rotateY: -8,
              scale: 0.9,
              y: 80,
              opacity: 0.6,
            },
            {
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              y: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "center center",
                scrub: 1.2,
              },
            }
          );
        }
      });
    }

    initShowcaseMotion();

    return () => {
      isCancelled = true;
      if (gsapCtx) gsapCtx.revert();
    };
  }, []);

  const HOTSPOTS = [
    {
      title: "Real-Time Agent Topology",
      detail: "Visualizes all 64 parallel execution pods with active telemetry sync and sub-ms consensus.",
      x: "54%",
      y: "48%",
      metric: "64 Pods Online",
    },
    {
      title: "Vector Memory Store",
      detail: "Zero context loss across enterprise conversations with 0.64ms cosine similarity lookup.",
      x: "24%",
      y: "28%",
      metric: "99.98% Accuracy",
    },
    {
      title: "Self-Healing Fallbacks",
      detail: "Automated circuit breaker intercepts API schema drift before downstream impacts occur.",
      x: "78%",
      y: "32%",
      metric: "4.2ms Recovery",
    },
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: "linear-gradient(180deg, #080B10 0%, #0B1019 50%, #080B10 100%)",
        padding: "140px 24px",
        overflow: "hidden",
        zIndex: 5,
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "9999px",
              background: "rgba(84, 217, 255, 0.08)",
              border: "1px solid rgba(84, 217, 255, 0.2)",
              marginBottom: "16px",
            }}
          >
            <Radio size={14} color="#54D9FF" />
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "12px",
                letterSpacing: "0.1em",
                color: "#54D9FF",
                textTransform: "uppercase",
              }}
            >
              Enterprise Cockpit
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display, sans-serif)",
              fontSize: "clamp(32px, 4.5vw, 50px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#F0F4FF",
              marginBottom: "16px",
            }}
          >
            Autonomous Command, <span style={{ color: "#54D9FF" }}>Dimensional Clarity</span>
          </h2>
          <p
            style={{
              color: "#8899AC",
              fontSize: "17px",
              maxWidth: "680px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Inspect live agent dispatch, vector retrieval latencies, and cryptographic audit proofs directly through NEXORA’s glass operational canvas.
          </p>
        </div>

        {/* 3D Perspective Viewport */}
        <div
          style={{
            perspective: "1200px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            ref={cockpitWrapRef}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "1080px",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(84, 217, 255, 0.3)",
              boxShadow: "0 30px 100px rgba(0, 0, 0, 0.8), 0 0 50px rgba(84, 217, 255, 0.15)",
              background: "rgba(10, 16, 26, 0.9)",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            {/* High-Res Holographic Glass Cockpit Image */}
            <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
              <Image
                src="/images/cockpit-ui.jpg"
                alt="NEXORA Autonomous Enterprise Cockpit"
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1080px"
                style={{
                  objectFit: "cover",
                }}
              />

              {/* Glowing Scanline Sweep Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(84, 217, 255, 0.08) 50%, transparent 100%)",
                  pointerEvents: "none",
                  animation: "scanline 6s linear infinite",
                }}
              />

              {/* Interactive Telemetry Hotspots */}
              {HOTSPOTS.map((spot, idx) => (
                <div
                  key={idx}
                  style={{
                    position: "absolute",
                    left: spot.x,
                    top: spot.y,
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                  }}
                >
                  <button
                    onClick={() => setActiveHotspot(activeHotspot === idx ? null : idx)}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "rgba(8, 12, 20, 0.85)",
                      border: "2px solid #54D9FF",
                      boxShadow: "0 0 16px rgba(84, 217, 255, 0.6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "#54D9FF",
                      fontSize: "12px",
                      fontWeight: 700,
                      fontFamily: "var(--font-mono, monospace)",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    0{idx + 1}
                  </button>

                  {/* Hotspot Popover Card */}
                  {activeHotspot === idx && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "40px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "rgba(8, 14, 24, 0.98)",
                        border: "1px solid rgba(84, 217, 255, 0.4)",
                        borderRadius: "12px",
                        padding: "16px 20px",
                        width: "260px",
                        boxShadow: "0 16px 40px rgba(0, 0, 0, 0.8)",
                        pointerEvents: "auto",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "6px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-display, sans-serif)",
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "#F0F4FF",
                          }}
                        >
                          {spot.title}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-mono, monospace)",
                            fontSize: "10px",
                            color: "#00E5A3",
                            background: "rgba(0, 229, 163, 0.1)",
                            padding: "2px 6px",
                            borderRadius: "4px",
                          }}
                        >
                          {spot.metric}
                        </span>
                      </div>
                      <p style={{ color: "#8E9EAF", fontSize: "12px", lineHeight: 1.5, margin: 0 }}>
                        {spot.detail}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </section>
  );
}
