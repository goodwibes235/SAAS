"use client";

import { useRef, useEffect } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import { safeDuration, EASE } from "@/lib/animations";

// Lazy-load the Three.js scene to avoid SSR issues
const IntelligenceCore = dynamic(() => import("./IntelligenceCore"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.3,
      }}
    >
      <div
        style={{
          width: "180px",
          height: "180px",
          border: "1px solid rgba(84,217,255,0.2)",
          borderRadius: "50%",
        }}
      />
    </div>
  ),
});

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const coreWrapRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    let gsapCtx: { revert: () => void } | null = null;

    async function initGSAP() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const d = safeDuration(1);

      gsapCtx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: EASE.out },
        });

        // Initial states
        gsap.set(
          [
            badgeRef.current,
            headlineRef.current,
            subRef.current,
            ctaGroupRef.current,
          ],
          { opacity: 0, y: 28 }
        );
        gsap.set(coreWrapRef.current, { opacity: 0, scale: 0.88 });
        gsap.set(scrollIndicatorRef.current, { opacity: 0 });

        // Entrance sequence
        tl.to(badgeRef.current, {
          opacity: 1,
          y: 0,
          duration: d * 0.7,
        })
          .to(
            headlineRef.current,
            {
              opacity: 1,
              y: 0,
              duration: d * 0.9,
            },
            "-=0.3"
          )
          .to(
            subRef.current,
            {
              opacity: 1,
              y: 0,
              duration: d * 0.8,
            },
            "-=0.5"
          )
          .to(
            ctaGroupRef.current,
            {
              opacity: 1,
              y: 0,
              duration: d * 0.7,
            },
            "-=0.4"
          )
          .to(
            coreWrapRef.current,
            {
              opacity: 1,
              scale: 1,
              duration: d * 1.1,
              ease: "power2.out",
            },
            0.1 // start nearly from beginning
          )
          .to(
            scrollIndicatorRef.current,
            { opacity: 1, duration: d * 0.5 },
            "-=0.2"
          );

        // Scroll-linked cinematic parallax & exit
        const heroExitTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        heroExitTl.to(
          [badgeRef.current, headlineRef.current, subRef.current, ctaGroupRef.current],
          {
            y: -50,
            opacity: 0,
            stagger: 0.05,
            ease: "power1.in",
          },
          0
        );

        heroExitTl.to(
          coreWrapRef.current,
          {
            y: 90,
            scale: 0.9,
            opacity: 0.35,
            ease: "power1.inOut",
          },
          0
        );

        // Scroll indicator fade out on first scroll
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top+=80 top",
          onEnter: () => {
            if (scrollIndicatorRef.current) {
              gsap.to(scrollIndicatorRef.current, {
                opacity: 0,
                y: 8,
                duration: 0.4,
              });
            }
          },
          onLeaveBack: () => {
            if (scrollIndicatorRef.current) {
              gsap.to(scrollIndicatorRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.4,
              });
            }
          },
        });

        // Subtle scroll indicator float
        if (d > 0.01) {
          gsap.to(scrollIndicatorRef.current, {
            y: 6,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 2.5,
          });
        }
      }, sectionRef);
    }

    initGSAP().catch(console.error);

    return () => {
      gsapCtx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="NEXORA hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(84, 217, 255, 0.06) 0%, transparent 65%), radial-gradient(ellipse 50% 60% at 20% 80%, rgba(154, 131, 255, 0.05) 0%, transparent 60%)",
      }}
    >
      {/* Fine grid overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(84,217,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(84,217,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 60% 50%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 60% 50%, black 30%, transparent 80%)",
          pointerEvents: "none",
        }}
      />

      {/* Content layout */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "120px 32px 80px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "auto",
          gap: "48px",
          alignItems: "center",
          minHeight: "100vh",
        }}
        className="hero-grid"
      >
        {/* Left: Text content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {/* Status badge */}
          <div ref={badgeRef}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px 6px 10px",
                background: "rgba(84, 217, 255, 0.08)",
                border: "1px solid rgba(84, 217, 255, 0.2)",
                borderRadius: "100px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                color: "#54D9FF",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#54D9FF",
                  boxShadow: "0 0 8px #54D9FF",
                  flexShrink: 0,
                }}
              />
              Now in Early Access
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(48px, 5.5vw, 84px)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: "#F0F4FF",
              maxWidth: "560px",
            }}
          >
            Your business.{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #54D9FF 0%, #9A83FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              In sync.
            </span>
          </h1>

          {/* Supporting copy */}
          <p
            ref={subRef}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(15px, 1.5vw, 18px)",
              lineHeight: 1.7,
              color: "#8A97AE",
              maxWidth: "440px",
            }}
          >
            Connect every team, tool, and process into a single AI-assisted
            operational system. NEXORA surfaces the right context at the right
            moment — so your people can focus on work that matters.
          </p>

          {/* CTAs */}
          <div
            ref={ctaGroupRef}
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            {/* Primary CTA */}
            <a
              href="#get-started"
              id="hero-cta-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 28px",
                background: "linear-gradient(135deg, #54D9FF 0%, #9A83FF 100%)",
                borderRadius: "10px",
                color: "#080B10",
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                fontWeight: 600,
                textDecoration: "none",
                letterSpacing: "0.01em",
                transition: "opacity 0.2s ease, transform 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "0.88";
                (e.currentTarget as HTMLAnchorElement).style.transform =
                  "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
                (e.currentTarget as HTMLAnchorElement).style.transform =
                  "translateY(0)";
              }}
            >
              Get Started
              <ArrowRight size={16} strokeWidth={2.5} />
            </a>

            {/* Secondary CTA */}
            <a
              href="#platform"
              id="hero-cta-secondary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 24px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "10px",
                color: "#8A97AE",
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "0.01em",
                transition:
                  "border-color 0.2s ease, color 0.2s ease, transform 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(255,255,255,0.28)";
                el.style.color = "#F0F4FF";
                el.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(255,255,255,0.12)";
                el.style.color = "#8A97AE";
                el.style.transform = "translateY(0)";
              }}
            >
              Explore the Platform
            </a>
          </div>

          {/* Trust signal */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              paddingTop: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0",
              }}
            >
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  aria-hidden="true"
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    border: "2px solid #080B10",
                    background: `hsl(${200 + i * 30}, 40%, 25%)`,
                    marginLeft: i > 0 ? "-8px" : "0",
                  }}
                />
              ))}
            </div>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "#3A4558",
              }}
            >
              Trusted by 200+ teams in early access
            </span>
          </div>
        </div>

        {/* Right: Intelligence Core */}
        <div
          ref={coreWrapRef}
          aria-label="Intelligence Core visualization"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "clamp(380px, 52vw, 640px)",
          }}
        >
          {/* Ambient glow behind the core */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: "60%",
              height: "60%",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(84,217,255,0.08) 0%, transparent 70%)",
              filter: "blur(40px)",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: "40%",
              height: "40%",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(154,131,255,0.07) 0%, transparent 70%)",
              filter: "blur(30px)",
              transform: "translate(20%, 20%)",
              pointerEvents: "none",
            }}
          />

          {/* Three.js canvas */}
          <IntelligenceCore className="core-canvas-absolute" />

          {/* Floating info cards */}
          <InfoCard
            top="12%"
            right="-8%"
            label="Workflows Active"
            value="2,847"
            change="+12.4%"
            positive
          />
          <InfoCard
            bottom="14%"
            left="-6%"
            label="Time Saved / Week"
            value="38 hrs"
            change="per team"
            positive={false}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          color: "#3A4558",
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <ChevronDown size={14} />
      </div>

      {/* Bottom gradient bridge into section 2 */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "180px",
          background:
            "linear-gradient(to bottom, transparent, rgba(8,11,16,0.7) 60%, #080B10)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />

      <style>{`
        .core-canvas-absolute {
          position: absolute;
          inset: 0;
          width: 100% !important;
          height: 100% !important;
        }
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto !important;
            padding: 100px 24px 60px !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}

/** Small floating data card overlaid on the core */
function InfoCard({
  top,
  right,
  bottom,
  left,
  label,
  value,
  change,
  positive,
}: {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  label: string;
  value: string;
  change: string;
  positive: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top,
        right,
        bottom,
        left,
        padding: "12px 16px",
        background: "rgba(17, 25, 37, 0.95)",
        border: "1px solid rgba(84, 217, 255, 0.2)",
        borderRadius: "12px",
        minWidth: "148px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
        zIndex: 20,
      }}
    >
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "11px",
          color: "#3A4558",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: "6px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "22px",
          fontWeight: 600,
          color: "#F0F4FF",
          lineHeight: 1,
          marginBottom: "4px",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "12px",
          color: positive ? "#54D9FF" : "#9A83FF",
        }}
      >
        {change}
      </div>
    </div>
  );
}
