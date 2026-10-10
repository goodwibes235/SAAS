"use client";

import {
  Cpu,
  Database,
  Shield,
  Activity,
  Layers,
  Sparkles,
  CheckCircle2,
  Lock,
  GitBranch,
} from "lucide-react";

export default function FeaturesBento() {

  return (
    <section
      id="product"
      style={{
        position: "relative",
        background: "rgba(8, 11, 16, 0.78)",
        padding: "120px 24px",
        overflow: "hidden",
      }}
    >
      {/* Decorative Grid Background */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(84, 217, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(84, 217, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
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
              Platform Architecture
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
              lineHeight: 1.15,
            }}
          >
            Engineered for <span style={{ color: "#54D9FF" }}>Deterministic Autonomy</span>
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
            Traditional RPA breaks when inputs change. NEXORA blends adaptive LLM cognition with rigid deterministic policy engines to orchestrate enterprise workloads flawlessly.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: "24px",
          }}
        >
          {/* Bento Card 1: Autonomous Decision Matrix (Large 8 cols) */}
          <div
            style={{
              gridColumn: "span 12",
              background: "linear-gradient(135deg, rgba(14, 22, 35, 0.92) 0%, rgba(9, 14, 24, 0.96) 100%)",
              border: "1px solid rgba(84, 217, 255, 0.15)",
              borderRadius: "20px",
              padding: "36px",
              position: "relative",
              overflow: "hidden",
            }}
            className="bento-card-8"
          >
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "24px", marginBottom: "32px" }}>
              <div>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "rgba(84, 217, 255, 0.1)",
                    border: "1px solid rgba(84, 217, 255, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "18px",
                  }}
                >
                  <Cpu size={22} color="#54D9FF" />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display, sans-serif)",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#F0F4FF",
                    marginBottom: "8px",
                  }}
                >
                  Autonomous Decision Matrix
                </h3>
                <p style={{ color: "#8E9EAF", fontSize: "15px", maxWidth: "480px", lineHeight: 1.6 }}>
                  Sub-second cognitive routing engine that parses complex enterprise signals, evaluates multi-tier risk, and commits verified operational actions.
                </p>
              </div>

              {/* Live Metric Widget */}
              <div
                style={{
                  background: "rgba(8, 12, 20, 0.8)",
                  border: "1px solid rgba(84, 217, 255, 0.15)",
                  borderRadius: "12px",
                  padding: "16px 20px",
                  display: "flex",
                  gap: "24px",
                }}
              >
                <div>
                  <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "11px", color: "#6A7B8C" }}>
                    ROUTING LATENCY
                  </div>
                  <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "20px", fontWeight: 700, color: "#54D9FF" }}>
                    0.82ms
                  </div>
                </div>
                <div style={{ width: "1px", background: "rgba(255, 255, 255, 0.1)" }} />
                <div>
                  <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "11px", color: "#6A7B8C" }}>
                    CONFIDENCE SCORE
                  </div>
                  <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "20px", fontWeight: 700, color: "#00E5A3" }}>
                    99.98%
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Decision Matrix Visualizer */}
            <div
              style={{
                background: "rgba(6, 9, 15, 0.9)",
                border: "1px solid rgba(84, 217, 255, 0.1)",
                borderRadius: "14px",
                padding: "24px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "12px", color: "#8E9EAF" }}>
                  DISPATCH PIPELINE — LIVE QUEUE
                </span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "11px",
                    color: "#00E5A3",
                  }}
                >
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00E5A3", boxShadow: "0 0 8px #00E5A3" }} />
                  PARALLEL PIPELINES ACTIVE (64/64)
                </span>
              </div>

              {/* Progress Pipelines */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { label: "SAP Ledger Entry Verification", stage: "Dispatched", time: "1.2ms", pct: 100, color: "#00E5A3" },
                  { label: "Salesforce Lead Scoring & Tier Assignment", stage: "Synthesizing", time: "3.4ms", pct: 78, color: "#54D9FF" },
                  { label: "Snowflake Vector Search Sync", stage: "Indexing", time: "0.9ms", pct: 92, color: "#9A83FF" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "13px" }}>
                    <div style={{ width: "260px", color: "#C8D6EC", fontFamily: "var(--font-display, sans-serif)", fontWeight: 500 }}>
                      {item.label}
                    </div>
                    <div style={{ flex: 1, height: "6px", background: "rgba(255, 255, 255, 0.06)", borderRadius: "999px", overflow: "hidden" }}>
                      <div style={{ width: `${item.pct}%`, height: "100%", background: item.color, borderRadius: "999px" }} />
                    </div>
                    <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "11px", color: item.color, width: "90px", textAlign: "right" }}>
                      {item.stage} ({item.time})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bento Card 2: Sub-Millisecond Vector Memory (4 cols) */}
          <div
            style={{
              gridColumn: "span 12",
              background: "linear-gradient(135deg, rgba(14, 22, 35, 0.92) 0%, rgba(9, 14, 24, 0.96) 100%)",
              border: "1px solid rgba(154, 131, 255, 0.15)",
              borderRadius: "20px",
              padding: "36px",
              position: "relative",
            }}
            className="bento-card-4"
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                background: "rgba(154, 131, 255, 0.1)",
                border: "1px solid rgba(154, 131, 255, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "18px",
              }}
            >
              <Database size={22} color="#9A83FF" />
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display, sans-serif)",
                fontSize: "22px",
                fontWeight: 700,
                color: "#F0F4FF",
                marginBottom: "8px",
              }}
            >
              Zero-Loss Vector Memory
            </h3>
            <p style={{ color: "#8E9EAF", fontSize: "14px", lineHeight: 1.6, marginBottom: "24px" }}>
              Persistent contextual state mapped across all historical executions. Agents never lose thread context or hallucinate parameters.
            </p>

            <div
              style={{
                background: "rgba(8, 12, 20, 0.9)",
                border: "1px solid rgba(154, 131, 255, 0.15)",
                borderRadius: "12px",
                padding: "16px",
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "12px",
              }}
            >
              <div style={{ color: "#6A7B8C", marginBottom: "8px" }}>{"// Vector Memory Probe"}</div>
              <div style={{ color: "#9A83FF", marginBottom: "4px" }}>&gt; query: &quot;enterprise_rebate_clause_v4&quot;</div>
              <div style={{ color: "#00E5A3", marginBottom: "4px" }}>&gt; matched: doc_hash_94f8a (cosine: 0.994)</div>
              <div style={{ color: "#54D9FF" }}>&gt; latency: 0.64ms (in-memory cache hit)</div>
            </div>
          </div>

          {/* Bento Card 3: Self-Healing Process Pipelines (4 cols) */}
          <div
            style={{
              gridColumn: "span 12",
              background: "linear-gradient(135deg, rgba(14, 22, 35, 0.92) 0%, rgba(9, 14, 24, 0.96) 100%)",
              border: "1px solid rgba(0, 229, 163, 0.15)",
              borderRadius: "20px",
              padding: "36px",
              position: "relative",
            }}
            className="bento-card-third"
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                background: "rgba(0, 229, 163, 0.1)",
                border: "1px solid rgba(0, 229, 163, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "18px",
              }}
            >
              <Activity size={22} color="#00E5A3" />
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display, sans-serif)",
                fontSize: "20px",
                fontWeight: 700,
                color: "#F0F4FF",
                marginBottom: "8px",
              }}
            >
              Self-Healing Pipelines
            </h3>
            <p style={{ color: "#8E9EAF", fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }}>
              API timeouts and schema drifts trigger autonomous micro-fallbacks without breaking upstream business SLAs.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#00E5A3", fontSize: "13px", fontWeight: 600 }}>
              <CheckCircle2 size={16} />
              <span>99.999% Recovery Success Rate</span>
            </div>
          </div>

          {/* Bento Card 4: Cryptographic Audit Mesh (4 cols) */}
          <div
            style={{
              gridColumn: "span 12",
              background: "linear-gradient(135deg, rgba(14, 22, 35, 0.92) 0%, rgba(9, 14, 24, 0.96) 100%)",
              border: "1px solid rgba(84, 217, 255, 0.15)",
              borderRadius: "20px",
              padding: "36px",
              position: "relative",
            }}
            className="bento-card-third"
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                background: "rgba(84, 217, 255, 0.1)",
                border: "1px solid rgba(84, 217, 255, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "18px",
              }}
            >
              <Shield size={22} color="#54D9FF" />
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display, sans-serif)",
                fontSize: "20px",
                fontWeight: 700,
                color: "#F0F4FF",
                marginBottom: "8px",
              }}
            >
              Cryptographic Audit Mesh
            </h3>
            <p style={{ color: "#8E9EAF", fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }}>
              Every prompt, tool execution, and state change is cryptographically hashed with SHA-256 for instant SOC 2 and HIPAA compliance.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#54D9FF", fontSize: "13px", fontWeight: 600 }}>
              <Lock size={16} />
              <span>Zero-Knowledge Proof Verification</span>
            </div>
          </div>

          {/* Bento Card 5: Multi-Model Orchestration Engine (4 cols) */}
          <div
            style={{
              gridColumn: "span 12",
              background: "linear-gradient(135deg, rgba(14, 22, 35, 0.92) 0%, rgba(9, 14, 24, 0.96) 100%)",
              border: "1px solid rgba(154, 131, 255, 0.15)",
              borderRadius: "20px",
              padding: "36px",
              position: "relative",
            }}
            className="bento-card-third"
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                background: "rgba(154, 131, 255, 0.1)",
                border: "1px solid rgba(154, 131, 255, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "18px",
              }}
            >
              <GitBranch size={22} color="#9A83FF" />
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display, sans-serif)",
                fontSize: "20px",
                fontWeight: 700,
                color: "#F0F4FF",
                marginBottom: "8px",
              }}
            >
              Multi-LLM Arbitration
            </h3>
            <p style={{ color: "#8E9EAF", fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }}>
              Auto-route between Claude 3.7, GPT-4o, Gemini 2.0, and Private Sovereign LLMs based on cost, latency, and reasoning depth requirements.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#9A83FF", fontSize: "13px", fontWeight: 600 }}>
              <Layers size={16} />
              <span>42% Lower Token Compute Cost</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 900px) {
          :global(.bento-card-8) {
            grid-column: span 8 !important;
          }
          :global(.bento-card-4) {
            grid-column: span 4 !important;
          }
          :global(.bento-card-third) {
            grid-column: span 4 !important;
          }
        }
      `}</style>
    </section>
  );
}
