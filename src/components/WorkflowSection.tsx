"use client";

import { useRef, useEffect } from "react";
import { Zap, GitMerge, Brain, BarChart2 } from "lucide-react";
import { safeDuration, EASE } from "@/lib/animations";

const PILLARS = [
  {
    id: "unify",
    icon: GitMerge,
    iconColor: "#54D9FF",
    title: "One unified workspace",
    body: "Replace scattered tools with a single operational layer. Every team, tool, and signal — unified.",
  },
  {
    id: "automate",
    icon: Zap,
    iconColor: "#9A83FF",
    title: "AI-driven automation",
    body: "Surface the right actions at the right time. Let intelligence handle the handoffs.",
  },
  {
    id: "context",
    icon: Brain,
    iconColor: "#54D9FF",
    title: "Persistent context",
    body: "Your business memory, always on. No more starting from scratch with every new conversation.",
  },
  {
    id: "insight",
    icon: BarChart2,
    iconColor: "#9A83FF",
    title: "Live operational insight",
    body: "Track what's happening across every workflow, in real time, without building a dashboard from scratch.",
  },
];

export default function WorkflowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsapCtx: { revert: () => void } | null = null;

    async function initGSAP() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const d = safeDuration(1);

      gsapCtx = gsap.context(() => {
        // Set initial states
        gsap.set([headlineRef.current, subRef.current], {
          opacity: 0,
          y: 32,
        });
        gsap.set(cardsRef.current.filter(Boolean), {
          opacity: 0,
          y: 28,
        });
        gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: "left center" });

        // Divider reveal
        ScrollTrigger.create({
          trigger: dividerRef.current,
          start: "top 88%",
          onEnter: () => {
            gsap.to(dividerRef.current, {
              scaleX: 1,
              duration: d * 0.8,
              ease: EASE.out,
            });
          },
        });

        // Headline reveal
        ScrollTrigger.create({
          trigger: headlineRef.current,
          start: "top 82%",
          onEnter: () => {
            gsap.to([headlineRef.current, subRef.current], {
              opacity: 1,
              y: 0,
              duration: d * 0.8,
              ease: EASE.out,
              stagger: 0.12,
            });
          },
        });

        // Cards stagger reveal
        const cards = cardsRef.current.filter(Boolean);
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top+=200 80%",
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: d * 0.7,
              ease: EASE.out,
              stagger: 0.1,
            });
          },
        });
      });
    }

    initGSAP().catch(console.error);

    return () => {
      gsapCtx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="workflow"
      aria-labelledby="workflow-headline"
      style={{
        position: "relative",
        padding: "140px 32px 120px",
        background: "rgba(8, 11, 16, 0.78)",
        overflow: "hidden",
      }}
    >
      {/* Background accent */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          right: "-10%",
          width: "50%",
          height: "60%",
          background:
            "radial-gradient(ellipse, rgba(84,217,255,0.025) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "10%",
          left: "-10%",
          width: "45%",
          height: "50%",
          background:
            "radial-gradient(ellipse, rgba(154,131,255,0.025) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Horizontal rule divider */}
      <div
        ref={dividerRef}
        aria-hidden="true"
        style={{
          maxWidth: "1280px",
          margin: "0 auto 80px",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(84,217,255,0.25) 30%, rgba(154,131,255,0.2) 70%, transparent)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* Section header */}
        <div
          style={{
            maxWidth: "560px",
            marginBottom: "80px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              color: "#54D9FF",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            Platform Overview
          </span>

          <h2
            ref={headlineRef}
            id="workflow-headline"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(36px, 4vw, 58px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "#F0F4FF",
              marginBottom: "24px",
            }}
          >
            Less busywork.{" "}
            <span style={{ color: "#8A97AE" }}>More business.</span>
          </h2>

          <p
            ref={subRef}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(15px, 1.3vw, 17px)",
              lineHeight: 1.7,
              color: "#8A97AE",
              maxWidth: "420px",
            }}
          >
            Disconnected workflows cost teams hours they can&apos;t get back.
            NEXORA turns scattered processes into one connected operational
            system — so your business moves like it should.
          </p>
        </div>

        {/* Pillar cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
          }}
        >
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                ref={(el) => { cardsRef.current[i] = el; }}
                style={{
                  padding: "32px 28px",
                  background: "rgba(17, 25, 37, 0.6)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "16px",
                  transition:
                    "border-color 0.3s ease, background 0.3s ease, transform 0.25s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = `rgba(${pillar.iconColor === "#54D9FF" ? "84,217,255" : "154,131,255"}, 0.22)`;
                  el.style.background = "rgba(17, 25, 37, 0.9)";
                  el.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(255,255,255,0.06)";
                  el.style.background = "rgba(17, 25, 37, 0.6)";
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: `rgba(${pillar.iconColor === "#54D9FF" ? "84,217,255" : "154,131,255"}, 0.1)`,
                    marginBottom: "20px",
                  }}
                >
                  <Icon
                    size={20}
                    style={{ color: pillar.iconColor }}
                    strokeWidth={1.75}
                  />
                </div>

                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600,
                    fontSize: "17px",
                    lineHeight: 1.3,
                    color: "#F0F4FF",
                    marginBottom: "12px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {pillar.title}
                </h3>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    lineHeight: 1.65,
                    color: "#8A97AE",
                  }}
                >
                  {pillar.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* Connecting line visual — shows workflows linking together */}
        <div
          aria-hidden="true"
          style={{
            marginTop: "80px",
            display: "flex",
            alignItems: "center",
            gap: "0",
            opacity: 0.5,
          }}
        >
          {["CRM", "Support", "Finance", "HR", "Ops"].map((label, i, arr) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                flex: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  minWidth: "64px",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: i % 2 === 0 ? "#54D9FF" : "#9A83FF",
                    boxShadow: `0 0 10px ${i % 2 === 0 ? "#54D9FF" : "#9A83FF"}`,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "11px",
                    color: "#3A4558",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </span>
              </div>
              {i < arr.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background:
                      "linear-gradient(to right, rgba(84,217,255,0.3), rgba(154,131,255,0.3))",
                    marginBottom: "20px",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
