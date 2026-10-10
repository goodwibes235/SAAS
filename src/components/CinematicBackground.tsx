"use client";

import { useEffect, useRef } from "react";

export default function CinematicBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const distantMeshRef = useRef<HTMLDivElement>(null);
  const rearOrbitalRef = useRef<HTMLDivElement>(null);
  const telemetryCanvasRef = useRef<HTMLCanvasElement>(null);
  const mouseGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsapCtx: { revert: () => void } | null = null;
    let animFrameId: number | null = null;
    let isCancelled = false;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // --- 1. High-Performance Telemetry Data Pathways (Canvas) ---
    const canvas = telemetryCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        const handleResize = () => {
          if (!canvas) return;
          w = canvas.width = window.innerWidth;
          h = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        // Precise circuit pathways with traveling data packets
        const packets = [
          { x: w * 0.15, y: 0, speed: 1.4, len: 60, col: "#54D9FF", isVert: true },
          { x: w * 0.82, y: 0, speed: 1.8, len: 80, col: "#9A83FF", isVert: true },
          { x: 0, y: h * 0.35, speed: 2.1, len: 90, col: "#54D9FF", isVert: false },
          { x: 0, y: h * 0.72, speed: 1.6, len: 70, col: "#00E5A3", isVert: false },
        ];

        // Crisp constellation nodes (only 24 high-visibility precision anchor points)
        const anchors = [
          { x: 0.15, y: 0.2 }, { x: 0.15, y: 0.35 }, { x: 0.25, y: 0.35 },
          { x: 0.82, y: 0.25 }, { x: 0.82, y: 0.45 }, { x: 0.72, y: 0.45 },
          { x: 0.18, y: 0.72 }, { x: 0.35, y: 0.72 }, { x: 0.35, y: 0.85 },
          { x: 0.85, y: 0.7 }, { x: 0.68, y: 0.7 }, { x: 0.68, y: 0.85 },
        ];

        const renderCanvas = () => {
          if (isCancelled) return;
          ctx.clearRect(0, 0, w, h);

          // Draw fine circuit tracks
          ctx.lineWidth = 1;
          ctx.strokeStyle = "rgba(84, 217, 255, 0.04)";
          ctx.beginPath();
          ctx.moveTo(w * 0.15, 0); ctx.lineTo(w * 0.15, h);
          ctx.moveTo(w * 0.82, 0); ctx.lineTo(w * 0.82, h);
          ctx.moveTo(0, h * 0.35); ctx.lineTo(w, h * 0.35);
          ctx.moveTo(0, h * 0.72); ctx.lineTo(w, h * 0.72);
          ctx.stroke();

          // Draw precision waypoint crosshairs
          anchors.forEach((pt) => {
            const px = pt.x * w;
            const py = pt.y * h;
            ctx.strokeStyle = "rgba(84, 217, 255, 0.18)";
            ctx.beginPath();
            ctx.moveTo(px - 4, py); ctx.lineTo(px + 4, py);
            ctx.moveTo(px, py - 4); ctx.lineTo(px, py + 4);
            ctx.stroke();

            ctx.fillStyle = "rgba(154, 131, 255, 0.25)";
            ctx.fillRect(px - 1, py - 1, 2, 2);
          });

          // Draw purposeful moving telemetry packets (only if not reduced motion)
          if (!prefersReducedMotion) {
            packets.forEach((p) => {
              ctx.lineWidth = 2;
              ctx.strokeStyle = p.col;

              if (p.isVert) {
                p.y += p.speed;
                if (p.y > h + p.len) p.y = -p.len;

                const grad = ctx.createLinearGradient(p.x, p.y - p.len, p.x, p.y);
                grad.addColorStop(0, "transparent");
                grad.addColorStop(1, p.col);
                ctx.strokeStyle = grad;

                ctx.beginPath();
                ctx.moveTo(p.x, p.y - p.len);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();
              } else {
                p.x += p.speed;
                if (p.x > w + p.len) p.x = -p.len;

                const grad = ctx.createLinearGradient(p.x - p.len, p.y, p.x, p.y);
                grad.addColorStop(0, "transparent");
                grad.addColorStop(1, p.col);
                ctx.strokeStyle = grad;

                ctx.beginPath();
                ctx.moveTo(p.x - p.len, p.y);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();
              }
            });
          }

          animFrameId = requestAnimationFrame(renderCanvas);
        };
        renderCanvas();
      }
    }

    // --- 2. GSAP ScrollTrigger Multi-Plane 2.5D Parallax ---
    async function initParallax() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      if (isCancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      gsapCtx = gsap.context(() => {
        // Distant atmospheric mesh (subtle 0.1x movement)
        if (distantMeshRef.current) {
          gsap.to(distantMeshRef.current, {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: document.body,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            },
          });
        }

        // Rear architectural orbital geometry (0.28x movement + controlled 12deg rotation)
        if (rearOrbitalRef.current) {
          gsap.to(rearOrbitalRef.current, {
            yPercent: 28,
            rotation: 12,
            ease: "none",
            scrollTrigger: {
              trigger: document.body,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.2,
            },
          });
        }

        // Mouse Parallax using GSAP quickTo on mouseGroupRef (nested child, zero transform conflict)
        if (mouseGroupRef.current && !prefersReducedMotion) {
          const quickX = gsap.quickTo(mouseGroupRef.current, "x", { duration: 0.8, ease: "power2.out" });
          const quickY = gsap.quickTo(mouseGroupRef.current, "y", { duration: 0.8, ease: "power2.out" });

          const handleMouseMove = (e: MouseEvent) => {
            const normX = (e.clientX / window.innerWidth - 0.5) * 28;
            const normY = (e.clientY / window.innerHeight - 0.5) * 20;
            quickX(normX);
            quickY(normY);
          };

          window.addEventListener("mousemove", handleMouseMove, { passive: true });

          return () => {
            window.removeEventListener("mousemove", handleMouseMove);
          };
        }
      });
    }

    initParallax();

    return () => {
      isCancelled = true;
      if (animFrameId) cancelAnimationFrame(animFrameId);
      if (gsapCtx) gsapCtx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        backgroundColor: "#080B10", // Pristine deep obsidian base
      }}
    >
      {/* Plane 0: Pure Atmospheric Radial Illumination (Clean falloff, no muddy wash) */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "900px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(84, 217, 255, 0.05) 0%, rgba(154, 131, 255, 0.03) 45%, transparent 75%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: "700px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(154, 131, 255, 0.035) 0%, rgba(84, 217, 255, 0.02) 40%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Plane 1: Precision SVG Technical Architecture Grid & Horizon Axes */}
      <div
        ref={distantMeshRef}
        style={{
          position: "absolute",
          top: "-10%",
          left: 0,
          width: "100%",
          height: "120%",
          willChange: "transform",
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          style={{ opacity: 0.6 }}
        >
          <defs>
            <pattern id="techGrid" width="120" height="120" patternUnits="userSpaceOnUse">
              <path
                d="M 120 0 L 0 0 0 120"
                fill="none"
                stroke="rgba(84, 217, 255, 0.03)"
                strokeWidth="1"
              />
              <circle cx="0" cy="0" r="1.5" fill="rgba(84, 217, 255, 0.15)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#techGrid)" />

          {/* Precision technical telemetry markings */}
          <text x="40" y="80" fill="rgba(84, 217, 255, 0.2)" fontSize="10" fontFamily="var(--font-mono, monospace)">
            // NEXORA.OS MESH_COORD: 48.8566° N, 2.3522° E [GRID_ACTIVE]
          </text>
          <text x="40" y="860" fill="rgba(154, 131, 255, 0.2)" fontSize="10" fontFamily="var(--font-mono, monospace)">
            // PROTOCOL_BUS: gRPC_SECURE_TUNNEL_01 [SUB_MS_SYNC]
          </text>
        </svg>
      </div>

      {/* Plane 2: Inner Mouse-Parallax Wrapper with Razor-Sharp Geometric Rings */}
      <div
        ref={mouseGroupRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          willChange: "transform",
        }}
      >
        {/* Plane 3: Rear Architectural Orbital Ring Assembly (SVG Vector Sharpness) */}
        <div
          ref={rearOrbitalRef}
          style={{
            position: "absolute",
            top: "8%",
            right: "-120px",
            width: "680px",
            height: "680px",
            willChange: "transform",
          }}
        >
          <svg width="680" height="680" viewBox="0 0 680 680" fill="none">
            {/* Primary outer orbital ring */}
            <circle
              cx="340"
              cy="340"
              r="300"
              stroke="rgba(84, 217, 255, 0.09)"
              strokeWidth="1"
            />
            {/* Dashed secondary track */}
            <circle
              cx="340"
              cy="340"
              r="260"
              stroke="rgba(154, 131, 255, 0.12)"
              strokeWidth="1"
              strokeDasharray="6 12"
            />
            {/* Fine inner telemetry track */}
            <circle
              cx="340"
              cy="340"
              r="220"
              stroke="rgba(84, 217, 255, 0.06)"
              strokeWidth="1"
            />
            {/* Cardinal tick marks */}
            <line x1="340" y1="30" x2="340" y2="50" stroke="#54D9FF" strokeWidth="1.5" opacity="0.4" />
            <line x1="340" y1="630" x2="340" y2="650" stroke="#54D9FF" strokeWidth="1.5" opacity="0.4" />
            <line x1="30" y1="340" x2="50" y2="340" stroke="#9A83FF" strokeWidth="1.5" opacity="0.4" />
            <line x1="630" y1="340" x2="650" y2="340" stroke="#9A83FF" strokeWidth="1.5" opacity="0.4" />
          </svg>
        </div>
      </div>

      {/* Plane 4: High-Efficiency Telemetry Data Stream Canvas */}
      <canvas
        ref={telemetryCanvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />

      {/* Controlled Edge Vignette: Guides visual focus directly to central content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(8, 11, 16, 0.6) 75%, #080B10 100%)",
        }}
      />
    </div>
  );
}
