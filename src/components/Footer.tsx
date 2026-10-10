"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#05070B",
        borderTop: "1px solid rgba(84, 217, 255, 0.1)",
        padding: "80px 24px 40px",
        color: "#8899AC",
        fontFamily: "var(--font-display, sans-serif)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Main Footer Links */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "48px",
            marginBottom: "64px",
          }}
        >
          {/* Brand Info */}
          <div style={{ gridColumn: "span 1" }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                marginBottom: "18px",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <polygon
                  points="16,2 30,10 30,22 16,30 2,22 2,10"
                  fill="none"
                  stroke="#54D9FF"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <polygon
                  points="16,8 24,13 24,21 16,26 8,21 8,13"
                  fill="rgba(84,217,255,0.08)"
                  stroke="#9A83FF"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
                <circle cx="16" cy="16" r="2.5" fill="#54D9FF" />
              </svg>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "18px",
                  letterSpacing: "0.12em",
                  color: "#F0F4FF",
                }}
              >
                NEXORA
              </span>
            </Link>

            <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#7A8C9E", marginBottom: "20px" }}>
              The autonomous enterprise mesh for deterministic business operations, self-healing pipelines, and sub-millisecond execution.
            </p>

            {/* Live Operational Status */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "4px 10px",
                borderRadius: "6px",
                background: "rgba(0, 229, 163, 0.08)",
                border: "1px solid rgba(0, 229, 163, 0.2)",
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "11px",
                color: "#00E5A3",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#00E5A3",
                  boxShadow: "0 0 6px #00E5A3",
                }}
              />
              <span>SYSTEMS 100% OPERATIONAL</span>
            </div>
          </div>

          {/* Column 1: Platform Architecture */}
          <div>
            <h4
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#F0F4FF",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "20px",
                fontFamily: "var(--font-mono, monospace)",
              }}
            >
              Architecture
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px" }}>
              <li><a href="#product" style={{ color: "#8E9EAF", textDecoration: "none" }}>Decision Matrix</a></li>
              <li><a href="#product" style={{ color: "#8E9EAF", textDecoration: "none" }}>Zero-Loss Vector Memory</a></li>
              <li><a href="#product" style={{ color: "#8E9EAF", textDecoration: "none" }}>Self-Healing Pipelines</a></li>
              <li><a href="#product" style={{ color: "#8E9EAF", textDecoration: "none" }}>Cryptographic Audit Mesh</a></li>
              <li><a href="#integrations" style={{ color: "#8E9EAF", textDecoration: "none" }}>100+ Enterprise Connectors</a></li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h4
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#F0F4FF",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "20px",
                fontFamily: "var(--font-mono, monospace)",
              }}
            >
              Solutions
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px" }}>
              <li><a href="#solutions" style={{ color: "#8E9EAF", textDecoration: "none" }}>Financial Reconciliation</a></li>
              <li><a href="#solutions" style={{ color: "#8E9EAF", textDecoration: "none" }}>Supply Chain Orchestration</a></li>
              <li><a href="#solutions" style={{ color: "#8E9EAF", textDecoration: "none" }}>DevSecOps Auto-Remediation</a></li>
              <li><a href="#solutions" style={{ color: "#8E9EAF", textDecoration: "none" }}>ERP & CRM Continuous Sync</a></li>
              <li><a href="#pricing" style={{ color: "#8E9EAF", textDecoration: "none" }}>Sovereign Cloud Deployment</a></li>
            </ul>
          </div>

          {/* Column 3: Trust & Governance */}
          <div>
            <h4
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#F0F4FF",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "20px",
                fontFamily: "var(--font-mono, monospace)",
              }}
            >
              Trust & Security
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px" }}>
              <li><span style={{ color: "#8E9EAF" }}>SOC 2 Type II Certified</span></li>
              <li><span style={{ color: "#8E9EAF" }}>ISO 27001 Registered</span></li>
              <li><span style={{ color: "#8E9EAF" }}>HIPAA BAA Compliant</span></li>
              <li><span style={{ color: "#8E9EAF" }}>GDPR Data Sovereignty</span></li>
              <li><a href="#faq" style={{ color: "#8E9EAF", textDecoration: "none" }}>FAQ & Knowledge Base</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            paddingTop: "32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
            fontSize: "13px",
            color: "#6A7B8C",
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} NEXORA Inc. All rights reserved. Deterministic Autonomy for Enterprise.
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            <a href="#" style={{ color: "#6A7B8C", textDecoration: "none" }} aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="#" style={{ color: "#6A7B8C", textDecoration: "none" }} aria-label="X / Twitter">
              <Twitter size={18} />
            </a>
            <a href="#" style={{ color: "#6A7B8C", textDecoration: "none" }} aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
