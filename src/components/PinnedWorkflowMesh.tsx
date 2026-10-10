"use client";

import { useEffect, useRef } from "react";
import {
  Database,
  Building2,
  Users,
  ShieldAlert,
  Activity,
  Cpu,
} from "lucide-react";

interface NodeData {
  id: string;
  name: string;
  category: string;
  icon: typeof Database;
  initialX: number; // percentage
  initialY: number; // percentage
  targetDeltaX: number; // px shift
  targetDeltaY: number; // px shift
  lineX2: string;
  lineY2: string;
  lineColor: string;
}

const NODES: NodeData[] = [
  {
    id: "erp",
    name: "SAP S/4HANA",
    category: "Finance Core",
    icon: Building2,
    initialX: 18,
    initialY: 22,
    targetDeltaX: 48,
    targetDeltaY: 42,
    lineX2: "28%",
    lineY2: "38%",
    lineColor: "#54D9FF",
  },
  {
    id: "crm",
    name: "Salesforce Core",
    category: "Revenue Ops",
    icon: Users,
    initialX: 82,
    initialY: 22,
    targetDeltaX: -48,
    targetDeltaY: 42,
    lineX2: "72%",
    lineY2: "38%",
    lineColor: "#9A83FF",
  },
  {
    id: "data",
    name: "Snowflake / Lakehouse",
    category: "Telemetry Vault",
    icon: Database,
    initialX: 18,
    initialY: 76,
    targetDeltaX: 48,
    targetDeltaY: -32,
    lineX2: "30%",
    lineY2: "70%",
    lineColor: "#54D9FF",
  },
  {
    id: "sec",
    name: "DevSecOps Sentinel",
    category: "Infrastructure",
    icon: ShieldAlert,
    initialX: 82,
    initialY: 76,
    targetDeltaX: -48,
    targetDeltaY: -32,
    lineX2: "70%",
    lineY2: "70%",
    lineColor: "#00E5A3",
  },
];

const CHAPTERS = [
  {
    badge: "PHASE 01 — THE FRAGMENTED STATE",
    badgeColor: "#FF6B6B",
    title: "Siloed Enterprise Chaos",
    sub: "Teams, legacy cron jobs, and brittle RPA scripts fail on every handoff. Context is lost, errors cascade.",
  },
  {
    badge: "PHASE 02 — COGNITIVE INGESTION",
    badgeColor: "#9A83FF",
    title: "The Autonomous Mesh Awakens",
    sub: "NEXORA ingests every signal into a unified operational graph with sub-millisecond vector memory.",
  },
  {
    badge: "PHASE 03 — DYNAMIC SELF-HEALING",
    badgeColor: "#54D9FF",
    title: "Autonomous Pipeline Synthesis",
    sub: "Dynamic neural routes form between systems. When external APIs fail, circuit breakers self-heal in 4.2ms.",
  },
  {
    badge: "PHASE 04 — CONTINUOUS SYNCHRONY",
    badgeColor: "#00E5A3",
    title: "Deterministic Enterprise Execution",
    sub: "Every transaction, invoice, and canary build executed with cryptographic audit certainty.",
  },
];

export default function PinnedWorkflowMesh() {
  const pinSectionRef = useRef<HTMLElement>(null);
  const coreAnchorRef = useRef<HTMLDivElement>(null);
  const svgLinesRef = useRef<SVGSVGElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let gsapCtx: { revert: () => void } | null = null;
    let isCancelled = false;

    async function initPinnedSequence() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      if (isCancelled || !pinSectionRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      gsapCtx = gsap.context(() => {
        // Initial setup on node elements: set initial centering transform via GSAP so x/y won't blow away percent
        nodeRefs.current.forEach((el) => {
          if (!el) return;
          gsap.set(el, { xPercent: -50, yPercent: -50, x: 0, y: 0 });
        });

        if (coreAnchorRef.current) {
          gsap.set(coreAnchorRef.current, { xPercent: -50, yPercent: -50, scale: 1 });
        }

        if (progressFillRef.current) {
          gsap.set(progressFillRef.current, { scaleX: 0, transformOrigin: "left center" });
        }

        // Set initial chapter opacities: Chapter 0 visible, rest hidden
        chapterRefs.current.forEach((el, idx) => {
          if (!el) return;
          gsap.set(el, { opacity: idx === 0 ? 1 : 0, y: idx === 0 ? 0 : 20 });
        });

        // Master scrubbed timeline pinned for 240% scroll duration
        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: pinSectionRef.current,
            start: "top top",
            end: "+=240%",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        });

        // 1. Progress Bar hardware-accelerated scaleX
        pinTl.to(
          progressFillRef.current,
          {
            scaleX: 1,
            ease: "none",
            duration: 4,
          },
          0
        );

        // 2. Chapter 1 -> Chapter 2 Crossfade (at t = 1.0)
        pinTl.to(
          chapterRefs.current[0],
          { opacity: 0, y: -16, duration: 0.4, ease: "power2.inOut" },
          0.8
        );
        pinTl.to(
          chapterRefs.current[1],
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.inOut" },
          1.0
        );

        // 3. Central Core pulse & initial orbit excitation
        pinTl.to(
          coreAnchorRef.current,
          {
            scale: 1.14,
            boxShadow: "0 0 50px rgba(84, 217, 255, 0.45)",
            borderColor: "#54D9FF",
            duration: 1.2,
            ease: "power2.inOut",
          },
          0.6
        );

        // 4. Nodes travel inward from fragmented state to connected mesh
        nodeRefs.current.forEach((el, idx) => {
          if (!el) return;
          const node = NODES[idx];
          pinTl.to(
            el,
            {
              x: node.targetDeltaX,
              y: node.targetDeltaY,
              borderColor: "rgba(84, 217, 255, 0.55)",
              background: "rgba(14, 24, 40, 0.96)",
              boxShadow: "0 12px 35px rgba(0, 0, 0, 0.7)",
              duration: 1.4,
              ease: "power2.inOut",
            },
            0.6
          );
        });

        // 5. SVG Lines reveal & draw inward using pathLength=100
        if (svgLinesRef.current) {
          const lines = svgLinesRef.current.querySelectorAll("line");
          pinTl.fromTo(
            lines,
            { strokeDashoffset: 100, opacity: 0 },
            {
              strokeDashoffset: 0,
              opacity: 0.85,
              stagger: 0.12,
              duration: 1.2,
              ease: "power2.out",
            },
            1.2
          );
        }

        // 6. Chapter 2 -> Chapter 3 Crossfade (at t = 2.0)
        pinTl.to(
          chapterRefs.current[1],
          { opacity: 0, y: -16, duration: 0.4, ease: "power2.inOut" },
          1.8
        );
        pinTl.to(
          chapterRefs.current[2],
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.inOut" },
          2.0
        );

        // 7. Dynamic Self-Healing verification: Core shifts to high energy
        pinTl.to(
          coreAnchorRef.current,
          {
            boxShadow: "0 0 70px rgba(154, 131, 255, 0.5)",
            borderColor: "#9A83FF",
            duration: 0.8,
            ease: "power2.inOut",
          },
          2.2
        );

        // 8. Chapter 3 -> Chapter 4 Crossfade (at t = 3.0)
        pinTl.to(
          chapterRefs.current[2],
          { opacity: 0, y: -16, duration: 0.4, ease: "power2.inOut" },
          2.8
        );
        pinTl.to(
          chapterRefs.current[3],
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.inOut" },
          3.0
        );

        // 9. Final Phase: Nodes light up in emerald synchrony
        pinTl.to(
          nodeRefs.current.filter(Boolean),
          {
            borderColor: "#00E5A3",
            boxShadow: "0 0 28px rgba(0, 229, 163, 0.35)",
            duration: 0.8,
            ease: "power2.out",
          },
          3.0
        );
      });
    }

    initPinnedSequence();

    return () => {
      isCancelled = true;
      if (gsapCtx) gsapCtx.revert();
    };
  }, []);

  return (
    <section
      ref={pinSectionRef}
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        background: "radial-gradient(ellipse at center, rgba(14, 22, 35, 0.85) 0%, #080B10 85%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 24px 48px",
        overflow: "hidden",
        borderTop: "1px solid rgba(84, 217, 255, 0.12)",
        borderBottom: "1px solid rgba(84, 217, 255, 0.12)",
        zIndex: 10,
      }}
    >
      {/* Narrative Progress Header: Stacked Pre-Rendered Crossfading Chapters */}
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", zIndex: 5, width: "100%" }}>
        <div style={{ position: "relative", minHeight: "130px" }}>
          {CHAPTERS.map((chap, idx) => (
            <div
              key={chap.badge}
              ref={(el) => {
                chapterRefs.current[idx] = el;
              }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: idx === 0 ? "auto" : "none",
              }}
            >
              <div style={{ marginBottom: "10px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "11px",
                    padding: "4px 14px",
                    borderRadius: "999px",
                    border: `1px solid ${chap.badgeColor}50`,
                    color: chap.badgeColor,
                    background: "rgba(8, 11, 16, 0.88)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {chap.badge}
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-display, sans-serif)",
                  fontSize: "clamp(26px, 3.8vw, 42px)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "#F0F4FF",
                  marginBottom: "8px",
                  lineHeight: 1.15,
                }}
              >
                {chap.title}
              </h2>

              <p
                style={{
                  color: "#8E9EAF",
                  fontSize: "15px",
                  lineHeight: 1.55,
                  maxWidth: "580px",
                  margin: "0 auto",
                }}
              >
                {chap.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Global Scrub Progress Track (Hardware-accelerated scaleX) */}
        <div
          style={{
            width: "240px",
            height: "4px",
            background: "rgba(255, 255, 255, 0.08)",
            borderRadius: "999px",
            margin: "16px auto 0",
            overflow: "hidden",
          }}
        >
          <div
            ref={progressFillRef}
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, #54D9FF 0%, #9A83FF 50%, #00E5A3 100%)",
              borderRadius: "999px",
              transform: "scaleX(0)",
              transformOrigin: "left center",
            }}
          />
        </div>
      </div>

      {/* Interactive Spatial Mesh Canvas Area */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1080px",
          height: "56vh",
          margin: "0 auto",
          zIndex: 4,
        }}
      >
        {/* SVG Dynamic Connection Lines */}
        <svg
          ref={svgLinesRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {NODES.map((node) => (
            <line
              key={node.id}
              x1="50%"
              y1="50%"
              x2={node.lineX2}
              y2={node.lineY2}
              stroke={node.lineColor}
              strokeWidth="2"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset="100"
              opacity="0"
            />
          ))}
        </svg>

        {/* Central NEXORA Intelligence Core Anchor */}
        <div
          ref={coreAnchorRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "110px",
            height: "110px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(84, 217, 255, 0.3) 0%, rgba(14, 22, 35, 0.98) 75%)",
            border: "1.5px solid #54D9FF",
            boxShadow: "0 0 35px rgba(84, 217, 255, 0.25)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3,
          }}
        >
          <Cpu size={30} color="#54D9FF" />
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "10px",
              color: "#F0F4FF",
              fontWeight: 700,
              marginTop: "4px",
              letterSpacing: "0.08em",
            }}
          >
            NEXORA
          </span>
          <span style={{ fontSize: "8px", color: "#00E5A3", fontFamily: "var(--font-mono, monospace)" }}>
            CORE MESH
          </span>
        </div>

        {/* Distributed Enterprise Nodes */}
        {NODES.map((node, i) => {
          const Icon = node.icon;
          return (
            <div
              key={node.id}
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
              style={{
                position: "absolute",
                left: `${node.initialX}%`,
                top: `${node.initialY}%`,
                background: "rgba(10, 16, 26, 0.94)",
                border: "1px solid rgba(84, 217, 255, 0.2)",
                borderRadius: "14px",
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                zIndex: 2,
                minWidth: "210px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "rgba(84, 217, 255, 0.1)",
                  border: "1px solid rgba(84, 217, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={18} color="#54D9FF" />
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display, sans-serif)",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#F0F4FF",
                    lineHeight: 1.2,
                  }}
                >
                  {node.name}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#6A7B8C",
                    fontFamily: "var(--font-mono, monospace)",
                    marginTop: "2px",
                  }}
                >
                  {node.category}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Scrub Hint */}
      <div
        style={{
          textAlign: "center",
          zIndex: 5,
          color: "#6A7B8C",
          fontSize: "11px",
          fontFamily: "var(--font-mono, monospace)",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <Activity size={14} color="#54D9FF" />
          SCROLL TO SCRUB CONTINUOUS MESH CHOREOGRAPHY &bull; FULLY REVERSIBLE
        </span>
      </div>
    </section>
  );
}
