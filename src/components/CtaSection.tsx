"use client";

import { useState } from "react";
import { ArrowRight, Terminal, Copy, Check, ShieldCheck, Lock, Sparkles } from "lucide-react";

export default function CtaSection() {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function copyCli() {
    navigator.clipboard.writeText("npx @nexora/cli init --enterprise");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  }

  return (
    <section
      style={{
        position: "relative",
        background: "transparent",
        padding: "120px 24px",
        overflow: "hidden",
      }}
    >
      {/* Dynamic Background Glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "400px",
          background: "radial-gradient(ellipse at center, rgba(84, 217, 255, 0.12) 0%, rgba(154, 131, 255, 0.08) 50%, transparent 80%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div
          style={{
            background: "linear-gradient(135deg, rgba(16, 26, 44, 0.94) 0%, rgba(10, 16, 28, 0.98) 100%)",
            border: "1px solid rgba(84, 217, 255, 0.25)",
            borderRadius: "28px",
            padding: "clamp(40px, 6vw, 72px) clamp(24px, 5vw, 64px)",
            textAlign: "center",
            boxShadow: "0 32px 80px rgba(0, 0, 0, 0.7), 0 0 40px rgba(84, 217, 255, 0.08)",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "9999px",
              background: "rgba(0, 229, 163, 0.08)",
              border: "1px solid rgba(0, 229, 163, 0.25)",
              marginBottom: "24px",
            }}
          >
            <Sparkles size={14} color="#00E5A3" />
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "12px",
                letterSpacing: "0.1em",
                color: "#00E5A3",
                textTransform: "uppercase",
              }}
            >
              Instant Enterprise Deployment
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display, sans-serif)",
              fontSize: "clamp(34px, 5vw, 54px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#F0F4FF",
              marginBottom: "18px",
              lineHeight: 1.15,
            }}
          >
            Deploy Your First Autonomous Pipeline in <span style={{ color: "#54D9FF" }}>4 Minutes</span>
          </h2>

          <p
            style={{
              color: "#8E9EAF",
              fontSize: "17px",
              maxWidth: "600px",
              margin: "0 auto 40px",
              lineHeight: 1.6,
            }}
          >
            Eliminate operational handoff friction. Connect your data warehouse, synthesize deterministic workflows, and unlock sub-second execution today.
          </p>

          {/* Terminal Command Box */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "14px",
              background: "rgba(6, 10, 16, 0.95)",
              border: "1px solid rgba(84, 217, 255, 0.2)",
              borderRadius: "12px",
              padding: "12px 20px",
              marginBottom: "36px",
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "13px",
              color: "#54D9FF",
            }}
          >
            <Terminal size={16} color="#8E9EAF" />
            <span>npx @nexora/cli init --enterprise</span>
            <button
              onClick={copyCli}
              title="Copy CLI command"
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "none",
                borderRadius: "6px",
                padding: "6px 8px",
                cursor: "pointer",
                color: copied ? "#00E5A3" : "#8E9EAF",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "11px",
              }}
            >
              {copied ? <Check size={14} color="#00E5A3" /> : <Copy size={14} />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>

          {/* Form Capture */}
          {submitted ? (
            <div
              style={{
                background: "rgba(0, 229, 163, 0.1)",
                border: "1px solid rgba(0, 229, 163, 0.3)",
                borderRadius: "12px",
                padding: "16px 24px",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                color: "#00E5A3",
                fontFamily: "var(--font-display, sans-serif)",
                fontWeight: 600,
                fontSize: "15px",
                marginBottom: "36px",
              }}
            >
              <Check size={18} />
              <span>Sandbox Access Granted! Check your inbox for sandbox credentials and cluster tokens.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "36px",
              }}
            >
              <input
                type="email"
                placeholder="Enter enterprise email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  background: "rgba(10, 16, 26, 0.8)",
                  border: "1px solid rgba(84, 217, 255, 0.2)",
                  borderRadius: "10px",
                  padding: "14px 20px",
                  color: "#F0F4FF",
                  fontSize: "14px",
                  fontFamily: "var(--font-display, sans-serif)",
                  width: "320px",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  background: "linear-gradient(135deg, #54D9FF 0%, #30A8FF 100%)",
                  border: "none",
                  borderRadius: "10px",
                  padding: "14px 28px",
                  color: "#080B10",
                  fontFamily: "var(--font-display, sans-serif)",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 20px rgba(84, 217, 255, 0.3)",
                }}
              >
                <span>Request Sandbox Access</span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          {/* Trust Guarantees */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "24px",
              flexWrap: "wrap",
              color: "#6A7B8C",
              fontSize: "13px",
              fontFamily: "var(--font-mono, monospace)",
              borderTop: "1px solid rgba(255, 255, 255, 0.06)",
              paddingTop: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <ShieldCheck size={15} color="#54D9FF" />
              <span>SOC 2 Type II Certified</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Lock size={15} color="#00E5A3" />
              <span>Zero Customer Data Retention</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Sparkles size={15} color="#9A83FF" />
              <span>99.995% Uptime SLA Backed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
