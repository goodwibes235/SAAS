"use client";

import { useState } from "react";
import { Layers, Search } from "lucide-react";

interface Integration {
  name: string;
  category: "data" | "erp" | "cloud" | "ops";
  protocol: string;
  description: string;
  status: "verified" | "native";
}

const INTEGRATIONS: Integration[] = [
  { name: "Snowflake", category: "data", protocol: "SQL / REST API", description: "Direct vector search & continuous warehouse ingestion", status: "native" },
  { name: "Databricks", category: "data", protocol: "Delta Lake / Spark", description: "Lakehouse operational sync & model table extraction", status: "native" },
  { name: "SAP S/4HANA", category: "erp", protocol: "OData / RFC", description: "Bi-directional ledger adjustments & PO reconciliation", status: "verified" },
  { name: "Salesforce Core", category: "erp", protocol: "Pub/Sub gRPC", description: "Real-time pipeline orchestration & stage automation", status: "native" },
  { name: "Workday Enterprise", category: "erp", protocol: "REST / RaaS", description: "Autonomous org updates & headcount approval paths", status: "verified" },
  { name: "ServiceNow ITSM", category: "ops", protocol: "REST Table API", description: "Zero-touch incident triage and automated resolution", status: "native" },
  { name: "AWS Infrastructure", category: "cloud", protocol: "EventBridge / IAM", description: "Cross-region compute scaling & S3 ledger vaults", status: "native" },
  { name: "Google Cloud Platform", category: "cloud", protocol: "Pub/Sub / BigQuery", description: "Serverless trigger ingestion & streaming analytics", status: "native" },
  { name: "Microsoft Azure", category: "cloud", protocol: "Service Bus / AD", description: "Enterprise Entra ID SSO & sovereign cloud routing", status: "native" },
  { name: "Apache Kafka", category: "data", protocol: "Kafka Protocol", description: "High-throughput telemetry ingestion at 100k events/sec", status: "native" },
  { name: "Slack Enterprise Grid", category: "ops", protocol: "Socket Mode", description: "Interactive human-in-the-loop escalation modals", status: "native" },
  { name: "GitHub Enterprise", category: "ops", protocol: "Webhooks / GraphQL", description: "Automated PR synthesis, code review & canary flags", status: "native" },
];

export default function IntegrationsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = INTEGRATIONS.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="integrations"
      style={{
        position: "relative",
        background: "rgba(8, 11, 16, 0.78)",
        padding: "120px 24px",
        overflow: "hidden",
      }}
    >
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
              background: "rgba(84, 217, 255, 0.08)",
              border: "1px solid rgba(84, 217, 255, 0.2)",
              marginBottom: "16px",
            }}
          >
            <Layers size={14} color="#54D9FF" />
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "12px",
                letterSpacing: "0.1em",
                color: "#54D9FF",
                textTransform: "uppercase",
              }}
            >
              Universal Ecosystem Connectors
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
            Connects to Your Existing Enterprise Stack in Minutes
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
            Zero rip-and-replace. NEXORA attaches to your databases, ERPs, and cloud message buses through 100+ native protocol adapters with end-to-end encryption.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          {/* Categories */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {[
              { id: "all", label: "All Connectors" },
              { id: "data", label: "Data & Warehouses" },
              { id: "erp", label: "ERP & CRM" },
              { id: "cloud", label: "Cloud Platforms" },
              { id: "ops", label: "Dev & Operations" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  background: activeCategory === cat.id ? "rgba(84, 217, 255, 0.14)" : "rgba(14, 20, 32, 0.6)",
                  border: activeCategory === cat.id ? "1px solid #54D9FF" : "1px solid rgba(84, 217, 255, 0.1)",
                  color: activeCategory === cat.id ? "#54D9FF" : "#8E9EAF",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  fontFamily: "var(--font-display, sans-serif)",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(14, 20, 32, 0.8)",
              border: "1px solid rgba(84, 217, 255, 0.15)",
              borderRadius: "8px",
              padding: "8px 14px",
              width: "280px",
            }}
          >
            <Search size={16} color="#6A7B8C" style={{ marginRight: "10px" }} />
            <input
              type="text"
              placeholder="Search 100+ connectors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#F0F4FF",
                fontSize: "13px",
                width: "100%",
                fontFamily: "var(--font-display, sans-serif)",
              }}
            />
          </div>
        </div>

        {/* Connectors Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {filtered.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: "linear-gradient(135deg, rgba(14, 22, 35, 0.6) 0%, rgba(8, 12, 20, 0.7) 100%)",
                border: "1px solid rgba(84, 217, 255, 0.1)",
                borderRadius: "14px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.25s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(84, 217, 255, 0.35)";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(84, 217, 255, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-display, sans-serif)",
                      fontSize: "17px",
                      fontWeight: 600,
                      color: "#F0F4FF",
                    }}
                  >
                    {item.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "10px",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      background: item.status === "native" ? "rgba(0, 229, 163, 0.1)" : "rgba(154, 131, 255, 0.1)",
                      color: item.status === "native" ? "#00E5A3" : "#9A83FF",
                      border: item.status === "native" ? "1px solid rgba(0, 229, 163, 0.25)" : "1px solid rgba(154, 131, 255, 0.25)",
                    }}
                  >
                    {item.status.toUpperCase()}
                  </span>
                </div>

                <p style={{ color: "#8E9EAF", fontSize: "13px", lineHeight: 1.5, marginBottom: "18px" }}>
                  {item.description}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                  paddingTop: "12px",
                  fontSize: "11px",
                  fontFamily: "var(--font-mono, monospace)",
                  color: "#6A7B8C",
                }}
              >
                <span>PROTOCOL: {item.protocol}</span>
                <span style={{ color: "#00E5A3" }}>CONNECTED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
