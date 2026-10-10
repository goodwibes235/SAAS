"use client";

import { useState } from "react";
import { Check, Sparkles, Calculator } from "lucide-react";

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [opsVolume, setOpsVolume] = useState(250000); // 250k operations/month

  // ROI estimation calculations
  const hoursSavedPerMonth = Math.round((opsVolume / 1000) * 1.8);
  const estimatedAnnualSavings = Math.round((hoursSavedPerMonth * 85 * 12) / 1000); // at $85/hr blended rate in $k

  return (
    <section
      id="pricing"
      style={{
        position: "relative",
        background: "linear-gradient(180deg, rgba(8, 11, 16, 0.82) 0%, rgba(11, 16, 25, 0.92) 100%)",
        padding: "120px 24px",
        borderTop: "1px solid rgba(84, 217, 255, 0.08)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "9999px",
              background: "rgba(154, 131, 255, 0.08)",
              border: "1px solid rgba(154, 131, 255, 0.2)",
              marginBottom: "16px",
            }}
          >
            <Sparkles size={14} color="#9A83FF" />
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "12px",
                letterSpacing: "0.1em",
                color: "#9A83FF",
                textTransform: "uppercase",
              }}
            >
              Predictable Pricing & ROI
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display, sans-serif)",
              fontSize: "clamp(32px, 4.5vw, 48px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#F0F4FF",
              marginBottom: "16px",
            }}
          >
            Transparent Plans for Every Operational Scale
          </h2>
          <p
            style={{
              color: "#8899AC",
              fontSize: "17px",
              maxWidth: "640px",
              margin: "0 auto 32px",
              lineHeight: 1.6,
            }}
          >
            Start with automated team pipelines or roll out a private sovereign cluster with dedicated cryptographic hardware.
          </p>

          {/* Billing Toggle */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "16px", background: "rgba(14, 20, 32, 0.8)", border: "1px solid rgba(84, 217, 255, 0.15)", borderRadius: "999px", padding: "6px 8px" }}>
            <button
              onClick={() => setIsAnnual(false)}
              style={{
                background: !isAnnual ? "rgba(84, 217, 255, 0.15)" : "transparent",
                color: !isAnnual ? "#54D9FF" : "#8E9EAF",
                border: "none",
                borderRadius: "999px",
                padding: "8px 20px",
                fontSize: "13px",
                fontWeight: 600,
                fontFamily: "var(--font-display, sans-serif)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              style={{
                background: isAnnual ? "linear-gradient(135deg, #54D9FF 0%, #30A8FF 100%)" : "transparent",
                color: isAnnual ? "#080B10" : "#8E9EAF",
                border: "none",
                borderRadius: "999px",
                padding: "8px 20px",
                fontSize: "13px",
                fontWeight: 700,
                fontFamily: "var(--font-display, sans-serif)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>Annual Billing</span>
              <span
                style={{
                  background: isAnnual ? "#080B10" : "rgba(0, 229, 163, 0.1)",
                  color: isAnnual ? "#00E5A3" : "#00E5A3",
                  fontSize: "11px",
                  padding: "2px 8px",
                  borderRadius: "999px",
                  fontFamily: "var(--font-mono, monospace)",
                }}
              >
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
            marginBottom: "72px",
          }}
        >
          {/* Tier 1: Pro Mesh */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(14, 22, 35, 0.6) 0%, rgba(8, 12, 20, 0.7) 100%)",
              border: "1px solid rgba(84, 217, 255, 0.12)",
              borderRadius: "20px",
              padding: "36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "12px", color: "#8E9EAF", textTransform: "uppercase", marginBottom: "8px" }}>
                Growth Teams
              </div>
              <h3 style={{ fontFamily: "var(--font-display, sans-serif)", fontSize: "24px", fontWeight: 700, color: "#F0F4FF", marginBottom: "8px" }}>
                Pro Mesh
              </h3>
              <p style={{ color: "#8E9EAF", fontSize: "14px", lineHeight: 1.6, marginBottom: "24px" }}>
                Ideal for scaling engineering and ops teams automating cross-tool handoffs.
              </p>

              <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "32px" }}>
                <span style={{ fontFamily: "var(--font-display, sans-serif)", fontSize: "42px", fontWeight: 800, color: "#F0F4FF" }}>
                  ${isAnnual ? "399" : "499"}
                </span>
                <span style={{ color: "#6A7B8C", fontSize: "14px" }}>/ month</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "36px" }}>
                {[
                  "Up to 100,000 autonomous operations/mo",
                  "12 concurrent agent execution pods",
                  "Sub-second vector memory index",
                  "10+ native enterprise connectors",
                  "Standard 99.9% uptime SLA",
                  "Community & standard ticketing support",
                ].map((feat, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#C8D6EC" }}>
                    <Check size={16} color="#54D9FF" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              style={{
                width: "100%",
                background: "rgba(84, 217, 255, 0.08)",
                border: "1px solid rgba(84, 217, 255, 0.25)",
                color: "#54D9FF",
                borderRadius: "10px",
                padding: "14px",
                fontFamily: "var(--font-display, sans-serif)",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(84, 217, 255, 0.16)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(84, 217, 255, 0.08)";
              }}
            >
              Start 14-Day Free Mesh Trial
            </button>
          </div>

          {/* Tier 2: Enterprise Autonomous (Most Popular) */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(16, 26, 44, 0.9) 0%, rgba(10, 16, 28, 0.95) 100%)",
              border: "1px solid #54D9FF",
              borderRadius: "20px",
              padding: "36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              boxShadow: "0 0 40px rgba(84, 217, 255, 0.15)",
            }}
          >
            {/* Most popular badge */}
            <div
              style={{
                position: "absolute",
                top: "-13px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "linear-gradient(135deg, #54D9FF 0%, #9A83FF 100%)",
                color: "#080B10",
                fontSize: "11px",
                fontWeight: 800,
                padding: "4px 14px",
                borderRadius: "999px",
                fontFamily: "var(--font-mono, monospace)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              MOST DEPLOYED
            </div>

            <div>
              <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "12px", color: "#54D9FF", textTransform: "uppercase", marginBottom: "8px" }}>
                Enterprise Operations
              </div>
              <h3 style={{ fontFamily: "var(--font-display, sans-serif)", fontSize: "24px", fontWeight: 700, color: "#F0F4FF", marginBottom: "8px" }}>
                Enterprise Autonomous
              </h3>
              <p style={{ color: "#8E9EAF", fontSize: "14px", lineHeight: 1.6, marginBottom: "24px" }}>
                Full self-healing autonomy with deterministic policy engines and SOC 2 audit vault.
              </p>

              <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "32px" }}>
                <span style={{ fontFamily: "var(--font-display, sans-serif)", fontSize: "42px", fontWeight: 800, color: "#F0F4FF" }}>
                  ${isAnnual ? "1,499" : "1,899"}
                </span>
                <span style={{ color: "#6A7B8C", fontSize: "14px" }}>/ month</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "36px" }}>
                {[
                  "Unlimited operations (Fair Usage 5M/mo)",
                  "64 dedicated parallel execution pods",
                  "Zero-loss vector memory with unlimited context",
                  "100+ native connectors (SAP, Salesforce, Kafka)",
                  "Automated self-healing circuit breakers",
                  "Cryptographic SHA-256 audit logging",
                  "99.995% Uptime SLA with 24/7 priority pager",
                ].map((feat, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#F0F4FF" }}>
                    <Check size={16} color="#00E5A3" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #54D9FF 0%, #30A8FF 100%)",
                border: "none",
                color: "#080B10",
                borderRadius: "10px",
                padding: "14px",
                fontFamily: "var(--font-display, sans-serif)",
                fontSize: "14px",
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(84, 217, 255, 0.3)",
                transition: "all 0.2s ease",
              }}
            >
              Deploy Enterprise Mesh
            </button>
          </div>

          {/* Tier 3: Sovereign Dedicated */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(14, 22, 35, 0.6) 0%, rgba(8, 12, 20, 0.7) 100%)",
              border: "1px solid rgba(154, 131, 255, 0.2)",
              borderRadius: "20px",
              padding: "36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "12px", color: "#9A83FF", textTransform: "uppercase", marginBottom: "8px" }}>
                Sovereign & Regulated
              </div>
              <h3 style={{ fontFamily: "var(--font-display, sans-serif)", fontSize: "24px", fontWeight: 700, color: "#F0F4FF", marginBottom: "8px" }}>
                Sovereign Cloud
              </h3>
              <p style={{ color: "#8E9EAF", fontSize: "14px", lineHeight: 1.6, marginBottom: "24px" }}>
                Air-gapped VPC or on-premise hardware for defense, central banking, and healthcare.
              </p>

              <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "32px" }}>
                <span style={{ fontFamily: "var(--font-display, sans-serif)", fontSize: "42px", fontWeight: 800, color: "#F0F4FF" }}>
                  Custom
                </span>
                <span style={{ color: "#6A7B8C", fontSize: "14px" }}>/ annual agreement</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "36px" }}>
                {[
                  "Air-gapped / Private AWS, Azure, GCP VPC",
                  "Customer-managed encryption keys (BYOK)",
                  "Custom fine-tuned sovereign models",
                  "Dedicated forward-deployed engineering pod",
                  "99.999% SLA with financial penalty backing",
                  "HIPAA, FedRAMP High, & ISO 27001 readiness",
                ].map((feat, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#C8D6EC" }}>
                    <Check size={16} color="#9A83FF" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              style={{
                width: "100%",
                background: "rgba(154, 131, 255, 0.1)",
                border: "1px solid rgba(154, 131, 255, 0.3)",
                color: "#9A83FF",
                borderRadius: "10px",
                padding: "14px",
                fontFamily: "var(--font-display, sans-serif)",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Contact Sovereign Architect
            </button>
          </div>
        </div>

        {/* Interactive ROI Calculator Card */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(14, 22, 35, 0.8) 0%, rgba(6, 10, 18, 0.9) 100%)",
            border: "1px solid rgba(84, 217, 255, 0.2)",
            borderRadius: "20px",
            padding: "40px",
            boxShadow: "0 16px 40px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
            <Calculator size={20} color="#54D9FF" />
            <h3 style={{ fontFamily: "var(--font-display, sans-serif)", fontSize: "20px", fontWeight: 700, color: "#F0F4FF" }}>
              Interactive Enterprise ROI Calculator
            </h3>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "36px", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ color: "#8E9EAF", fontSize: "14px" }}>Estimated Monthly Operations / Workflow Events:</span>
                <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "16px", color: "#54D9FF", fontWeight: 700 }}>
                  {opsVolume.toLocaleString()} ops
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="2000000"
                step="50000"
                value={opsVolume}
                onChange={(e) => setOpsVolume(Number(e.target.value))}
                style={{
                  width: "100%",
                  accentColor: "#54D9FF",
                  cursor: "pointer",
                  height: "8px",
                  borderRadius: "4px",
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", color: "#6A7B8C", fontSize: "11px", marginTop: "8px", fontFamily: "var(--font-mono, monospace)" }}>
                <span>50k ops</span>
                <span>1M ops</span>
                <span>2M ops</span>
              </div>
            </div>

            {/* Calculated Values */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={{ background: "rgba(8, 12, 20, 0.8)", border: "1px solid rgba(84, 217, 255, 0.15)", borderRadius: "12px", padding: "18px" }}>
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "11px", color: "#6A7B8C", marginBottom: "6px" }}>
                  ESTIMATED HOURS RECLAIMED
                </div>
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "24px", fontWeight: 700, color: "#00E5A3" }}>
                  ~{hoursSavedPerMonth.toLocaleString()} hrs / mo
                </div>
              </div>

              <div style={{ background: "rgba(8, 12, 20, 0.8)", border: "1px solid rgba(154, 131, 255, 0.15)", borderRadius: "12px", padding: "18px" }}>
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "11px", color: "#6A7B8C", marginBottom: "6px" }}>
                  ESTIMATED ANNUAL SAVINGS
                </div>
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "24px", fontWeight: 700, color: "#9A83FF" }}>
                  ~${estimatedAnnualSavings}k / year
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
