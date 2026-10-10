"use client";

import { useRef } from "react";
import { Zap, TrendingUp, Building2, Cpu, Globe, Database, Layers, Radio } from "lucide-react";

const ENTERPRISE_LOGOS = [
  { name: "VORTEX DYNAMICS", icon: Cpu, metric: "8.4M ops/day" },
  { name: "APEX CLOUD", icon: Globe, metric: "99.999% uptime" },
  { name: "SYNAPSE AI", icon: Zap, metric: "12ms avg latency" },
  { name: "HYPERION DATA", icon: Database, metric: "4.2 PB synced" },
  { name: "AETHER GLOBAL", icon: Layers, metric: "42 global hubs" },
  { name: "KINETIC FINANCIAL", icon: Building2, metric: "$180M protected" },
];

const TESTIMONIALS = [
  {
    quote:
      "NEXORA replaced over 14 bespoke cron pipelines and fragile microservices with an autonomous mesh that diagnoses and heals execution errors before on-call engineers even receive an alert.",
    author: "Elena Rostova",
    role: "Chief Technology Officer",
    company: "Vortex Global Systems",
    metric: "88% Drop in Sev-1 Incidents",
  },
  {
    quote:
      "The sub-millisecond vector memory and multi-agent coordination cut our cross-cloud reconciliation latency from 45 minutes to 3.2 seconds. The ROI was provable within our first sprint.",
    author: "Marcus Chen",
    role: "VP of Enterprise Architecture",
    company: "Apex Financial Core",
    metric: "14.2x Processing Throughput",
  },
  {
    quote:
      "Deploying autonomous agents into regulated enterprise banking requires deterministic guardrails and cryptographic auditing. NEXORA gave our compliance team 100% verifiable peace of mind.",
    author: "Sarah Lindqvist",
    role: "Head of Infrastructure & Security",
    company: "Nordic Sovereign Bank",
    metric: "100% SOC-2 & ISO 27001 Passed",
  },
];

export default function CustomerShowcase() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        background: "rgba(8, 11, 16, 0.78)",
        borderTop: "1px solid rgba(84, 217, 255, 0.08)",
        borderBottom: "1px solid rgba(84, 217, 255, 0.08)",
        padding: "80px 24px 100px",
        overflow: "hidden",
      }}
    >
      {/* Background ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "350px",
          background: "radial-gradient(ellipse at center, rgba(84, 217, 255, 0.05) 0%, rgba(154, 131, 255, 0.03) 50%, transparent 80%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "9999px",
              background: "rgba(84, 217, 255, 0.06)",
              border: "1px solid rgba(84, 217, 255, 0.16)",
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
              Enterprise Provenance
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display, sans-serif)",
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#F0F4FF",
              marginBottom: "14px",
            }}
          >
            Trusted by Mission-Critical Operations
          </h2>
          <p
            style={{
              color: "#8899AC",
              fontSize: "16px",
              maxWidth: "640px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Powering autonomous business operations across global financial institutions, logistics networks, and tier-1 SaaS enterprises.
          </p>
        </div>

        {/* Enterprise Logos Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            marginBottom: "64px",
          }}
        >
          {ENTERPRISE_LOGOS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                style={{
                  background: "rgba(14, 20, 32, 0.6)",
                  border: "1px solid rgba(84, 217, 255, 0.08)",
                  borderRadius: "12px",
                  padding: "18px 20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(84, 217, 255, 0.3)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(84, 217, 255, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(84, 217, 255, 0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#C8D6EC" }}>
                  <Icon size={18} color="#54D9FF" />
                  <span
                    style={{
                      fontFamily: "var(--font-display, sans-serif)",
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {item.name}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "11px",
                    color: "#00E5A3",
                    background: "rgba(0, 229, 163, 0.08)",
                    padding: "2px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {item.metric}
                </div>
              </div>
            );
          })}
        </div>

        {/* Executive Quotes Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              style={{
                background: "linear-gradient(135deg, rgba(16, 24, 38, 0.9) 0%, rgba(10, 15, 26, 0.95) 100%)",
                border: "1px solid rgba(84, 217, 255, 0.12)",
                borderRadius: "16px",
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              {/* Metric Tag */}
              <div
                style={{
                  alignSelf: "flex-start",
                  marginBottom: "20px",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  background: "rgba(154, 131, 255, 0.12)",
                  border: "1px solid rgba(154, 131, 255, 0.25)",
                  color: "#9A83FF",
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "12px",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <TrendingUp size={13} />
                {t.metric}
              </div>

              {/* Quote text */}
              <p
                style={{
                  color: "#D4E1F4",
                  fontSize: "15px",
                  lineHeight: 1.7,
                  fontStyle: "italic",
                  marginBottom: "28px",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author Info */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                  paddingTop: "20px",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${idx === 0 ? "#54D9FF" : idx === 1 ? "#9A83FF" : "#00E5A3"} 0%, #0B1019 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "14px",
                    fontFamily: "var(--font-display, sans-serif)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  {t.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display, sans-serif)",
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#F0F4FF",
                    }}
                  >
                    {t.author}
                  </div>
                  <div style={{ fontSize: "12px", color: "#7A8C9E" }}>
                    {t.role} &middot; <span style={{ color: "#54D9FF" }}>{t.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
