"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How does NEXORA guarantee against hallucinations in mission-critical workflows?",
    answer:
      "NEXORA operates on a dual-layer cognitive architecture. LLMs are strictly utilized for semantic interpretation, translation, and intent synthesis. Execution paths, financial updates, and system mutations are enforced through deterministic guardrails, mathematical schema contracts, and pre-commit assertion checks. If any assertion score drops below 99.98%, the workflow pauses and alerts human supervisors.",
  },
  {
    question: "Does NEXORA train public models on our enterprise data or customer payloads?",
    answer:
      "Never. All enterprise agreements include zero-data-retention guarantees. Customer operational payloads, database schemas, and execution contexts are never used to train foundation models. In Sovereign Cloud deployments, all model inference runs on isolated VPC clusters with dedicated encryption keys (BYOK).",
  },
  {
    question: "How does NEXORA compare to legacy RPA tools like UiPath or Automation Anywhere?",
    answer:
      "Legacy RPA relies on brittle selector trees and UI screen-scraping that break whenever software updates. NEXORA is an API-first and semantic-native mesh that connects directly to ERPs, databases, and message queues. When third-party schemas drift or unexpected errors occur, NEXORA's self-healing circuit breakers automatically synthesize fallback pathways in real time.",
  },
  {
    question: "What compliance standards and security certifications does NEXORA support?",
    answer:
      "NEXORA is audited annually for SOC 2 Type II, ISO 27001, HIPAA, and GDPR compliance. Every state transition and automated commit generates a cryptographic SHA-256 tamper-proof ledger entry, making external compliance audits effortless and provable.",
  },
  {
    question: "How long does a typical enterprise deployment take?",
    answer:
      "Through our pre-built universal connectors (Snowflake, Databricks, SAP S/4HANA, Salesforce, AWS, Slack), teams typically achieve their first fully automated production workflow within 3 to 5 business days. Full enterprise-wide rollout with custom sovereign policies averages 2 to 3 weeks.",
  },
  {
    question: "Can NEXORA be deployed in air-gapped or on-premise environments?",
    answer:
      "Yes. The Sovereign Cloud tier supports completely disconnected air-gapped deployments on private Kubernetes clusters or hardware appliances, with locally hosted open-weights models (e.g. Llama-3 70B, DeepSeek R1) requiring zero outbound internet connectivity.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(idx: number) {
    setOpenIndex(openIndex === idx ? null : idx);
  }

  return (
    <section
      id="faq"
      style={{
        position: "relative",
        background: "rgba(8, 11, 16, 0.88)",
        borderTop: "1px solid rgba(84, 217, 255, 0.08)",
        padding: "120px 24px",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
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
            <HelpCircle size={14} color="#54D9FF" />
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "12px",
                letterSpacing: "0.1em",
                color: "#54D9FF",
                textTransform: "uppercase",
              }}
            >
              Enterprise Verification
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display, sans-serif)",
              fontSize: "clamp(32px, 4.5vw, 44px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#F0F4FF",
              marginBottom: "16px",
            }}
          >
            Frequently Asked Questions
          </h2>
          <p
            style={{
              color: "#8899AC",
              fontSize: "16px",
              lineHeight: 1.6,
            }}
          >
            Clear answers about architecture, data sovereignty, security governance, and deployment speed.
          </p>
        </div>

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  background: isOpen ? "rgba(14, 22, 35, 0.75)" : "rgba(14, 20, 32, 0.45)",
                  border: isOpen ? "1px solid rgba(84, 217, 255, 0.25)" : "1px solid rgba(84, 217, 255, 0.08)",
                  borderRadius: "14px",
                  overflow: "hidden",
                  transition: "all 0.25s ease",
                }}
              >
                <button
                  onClick={() => toggle(idx)}
                  style={{
                    width: "100%",
                    padding: "24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "20px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display, sans-serif)",
                      fontSize: "16px",
                      fontWeight: 600,
                      color: isOpen ? "#54D9FF" : "#F0F4FF",
                      lineHeight: 1.4,
                    }}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    color={isOpen ? "#54D9FF" : "#8E9EAF"}
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.25s ease",
                      flexShrink: 0,
                    }}
                  />
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: "0 24px 24px",
                      color: "#9BB0C7",
                      fontSize: "15px",
                      lineHeight: 1.7,
                      borderTop: "1px solid rgba(255, 255, 255, 0.04)",
                      paddingTop: "16px",
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
