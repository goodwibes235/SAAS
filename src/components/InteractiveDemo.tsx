"use client";

import { useState } from "react";
import {
  Play,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Terminal,
  Activity,
} from "lucide-react";

interface Scenario {
  id: string;
  name: string;
  category: string;
  description: string;
  agents: { name: string; role: string; icon: string }[];
  steps: {
    title: string;
    detail: string;
    latency: string;
    status: "success" | "warning" | "in_progress" | "idle";
  }[];
}

const SCENARIOS: Scenario[] = [
  {
    id: "finance",
    name: "Autonomous Ledger Reconciliation",
    category: "FINTECH & ERP",
    description: "Detects cross-border currency variances, reconciles SAP transactions against SWIFT rails, and commits verified adjustments.",
    agents: [
      { name: "Parser-Agent", role: "Extracts ERP Transactions", icon: "01" },
      { name: "Risk-Auditor", role: "Cross-checks Sovereign Sanctions", icon: "02" },
      { name: "Ledger-Mesh", role: "Dual-entry Cryptographic Commit", icon: "03" },
    ],
    steps: [
      { title: "Ingest SWIFT MT940 Payload", detail: "Parsed 4,120 transaction records in 1.4ms", latency: "1.4ms", status: "success" },
      { title: "Deterministic Variance Audit", detail: "Identified $12,450 FX disparity between SAP and Citi gateway", latency: "3.2ms", status: "success" },
      { title: "Autonomous Remediation Check", detail: "Variance satisfies Rule RFC-402; automatic hedge applied", latency: "2.1ms", status: "success" },
      { title: "Cryptographic Block Commit", detail: "SHA-256 state locked & audit trail generated for PWC compliance", latency: "0.8ms", status: "success" },
    ],
  },
  {
    id: "supply",
    name: "Dynamic Supply Chain Rerouting",
    category: "GLOBAL LOGISTICS",
    description: "Monitors carrier telemetry, detects geopolitical port chokepoints, and autonomously re-books freight shipments within SLA budgets.",
    agents: [
      { name: "Telemetry-Sentinel", role: "Real-time Port Congestion Tracker", icon: "01" },
      { name: "Cost-Optimizer", role: "Evaluates Air vs Rail Arbitrage", icon: "02" },
      { name: "Booking-Dispatcher", role: "Executes Carrier Contracts", icon: "03" },
    ],
    steps: [
      { title: "Port Anomaly Detected", detail: "Rotterdam container terminal delay +72 hrs reported", latency: "0.9ms", status: "success" },
      { title: "Multi-Route Optimization", detail: "Calculated alternative routing via Hamburg rail corridor with $400 margin buffer", latency: "4.8ms", status: "success" },
      { title: "Dynamic Carrier Re-allocation", detail: "Signed digital bill of lading with Maersk via EDI 214", latency: "6.1ms", status: "success" },
      { title: "Warehouse ETA Synchronization", detail: "Updated 18 distribution center intake schedules automatically", latency: "1.1ms", status: "success" },
    ],
  },
  {
    id: "devsecops",
    name: "Zero-Day Vulnerability Auto-Patching",
    category: "CYBERSECURITY & INFRA",
    description: "Detects CVE alerts in container base images, auto-generates semantic patches, runs test suites, and opens canary PRs.",
    agents: [
      { name: "CVE-Scanner", role: "Vulnerability Feed Ingestion", icon: "01" },
      { name: "Semantic-Coder", role: "Targeted AST Patch Synthesis", icon: "02" },
      { name: "Canary-Verifier", role: "Sandboxed Regression Testing", icon: "03" },
    ],
    steps: [
      { title: "Zero-Day CVE Ingestion", detail: "Critical AST buffer overflow identified in libssl dependencies", latency: "0.6ms", status: "success" },
      { title: "Autonomous Patch Synthesis", detail: "Synthesized backward-compatible memory safety guard in 2.1s", latency: "2.1s", status: "success" },
      { title: "Container Sandbox Test Pass", detail: "1,420 unit & integration tests completed with zero regression", latency: "8.4s", status: "success" },
      { title: "Canary PR & Blue/Green Deploy", detail: "Dispatched to 5% traffic canary with telemetry watchdogs enabled", latency: "1.2s", status: "success" },
    ],
  },
];

export default function InteractiveDemo() {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(4);
  const [hasAnomaly, setHasAnomaly] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "[14:30:02.102] NEXORA Autonomous Daemon v4.18.2 initialized",
    "[14:30:02.104] Connecting to Enterprise Mesh: 32 agent pods active",
    "[14:30:02.108] All systems operational. Awaiting trigger or scheduled cron.",
  ]);

  const currentScenario = SCENARIOS[selectedScenarioIndex];

  function runSimulation(withAnomaly = false) {
    setIsRunning(true);
    setActiveStepIndex(0);
    setHasAnomaly(withAnomaly);

    setConsoleLogs([
      `[${new Date().toLocaleTimeString()}] INITIATING WORKFLOW: ${currentScenario.name}`,
      `[${new Date().toLocaleTimeString()}] Context injected: 32KB payload loaded into sub-ms vector store`,
    ]);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step <= currentScenario.steps.length) {
        setActiveStepIndex(step);
        const currentStep = currentScenario.steps[step - 1];
        setConsoleLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] [PASS] ${currentStep.title} (${currentStep.latency})`,
          `    ↳ ${currentStep.detail}`,
        ]);
      } else {
        clearInterval(interval);
        setIsRunning(false);
        if (withAnomaly) {
          setConsoleLogs((prev) => [
            ...prev,
            `[${new Date().toLocaleTimeString()}] [HEAL] Simulated network latency spike detected: Auto-healed via circuit breaker in 4.2ms!`,
          ]);
        }
      }
    }, 900);
  }

  function resetSimulation() {
    setIsRunning(false);
    setActiveStepIndex(currentScenario.steps.length);
    setHasAnomaly(false);
    setConsoleLogs([
      `[${new Date().toLocaleTimeString()}] Workflow reset to ready state.`,
      `[${new Date().toLocaleTimeString()}] Pipeline ready for autonomous execution.`,
    ]);
  }

  return (
    <section
      id="solutions"
      style={{
        position: "relative",
        background: "rgba(8, 11, 16, 0.78)",
        padding: "120px 24px",
        borderTop: "1px solid rgba(84, 217, 255, 0.08)",
        borderBottom: "1px solid rgba(84, 217, 255, 0.08)",
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
              background: "rgba(0, 229, 163, 0.08)",
              border: "1px solid rgba(0, 229, 163, 0.2)",
              marginBottom: "16px",
            }}
          >
            <Activity size={14} color="#00E5A3" />
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "12px",
                letterSpacing: "0.1em",
                color: "#00E5A3",
                textTransform: "uppercase",
              }}
            >
              Interactive Playground
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
            Experience the <span style={{ color: "#54D9FF" }}>Autonomous Mesh</span> Live
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
            Select an enterprise operational scenario below and trigger an autonomous workflow to watch multi-agent coordination, sub-millisecond execution, and instant self-healing.
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "40px",
          }}
        >
          {SCENARIOS.map((scenario, index) => {
            const isSelected = selectedScenarioIndex === index;
            return (
              <button
                key={scenario.id}
                onClick={() => {
                  setSelectedScenarioIndex(index);
                  setActiveStepIndex(scenario.steps.length);
                  setHasAnomaly(false);
                }}
                style={{
                  background: isSelected ? "rgba(84, 217, 255, 0.12)" : "rgba(14, 20, 32, 0.6)",
                  border: isSelected ? "1px solid #54D9FF" : "1px solid rgba(84, 217, 255, 0.12)",
                  color: isSelected ? "#54D9FF" : "#8E9EAF",
                  borderRadius: "12px",
                  padding: "12px 20px",
                  fontFamily: "var(--font-display, sans-serif)",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "11px",
                    background: isSelected ? "rgba(84, 217, 255, 0.2)" : "rgba(255, 255, 255, 0.05)",
                    padding: "2px 6px",
                    borderRadius: "4px",
                  }}
                >
                  {scenario.category}
                </span>
                {scenario.name}
              </button>
            );
          })}
        </div>

        {/* Interactive Workspace Container */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(14, 22, 35, 0.95) 0%, rgba(8, 12, 20, 0.98) 100%)",
            border: "1px solid rgba(84, 217, 255, 0.18)",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 24px 64px rgba(0, 0, 0, 0.6)",
          }}
        >
          {/* Simulator Action Toolbar */}
          <div
            style={{
              padding: "16px 24px",
              background: "rgba(6, 10, 18, 0.8)",
              borderBottom: "1px solid rgba(84, 217, 255, 0.12)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: hasAnomaly ? "#9A83FF" : "#00E5A3",
                  boxShadow: hasAnomaly ? "0 0 10px #9A83FF" : "0 0 10px #00E5A3",
                }}
              />
              <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "13px", color: "#F0F4FF", fontWeight: 600 }}>
                {currentScenario.name} {hasAnomaly && "(ANOMALY CIRCUIT HEALED)"}
              </span>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => runSimulation(false)}
                disabled={isRunning}
                style={{
                  background: isRunning ? "rgba(84, 217, 255, 0.2)" : "linear-gradient(135deg, #54D9FF 0%, #30A8FF 100%)",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 18px",
                  color: "#080B10",
                  fontFamily: "var(--font-display, sans-serif)",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: isRunning ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Play size={14} fill="#080B10" />
                {isRunning ? "Running Pipeline..." : "Execute Workflow"}
              </button>

              <button
                onClick={() => runSimulation(true)}
                disabled={isRunning}
                style={{
                  background: "rgba(154, 131, 255, 0.12)",
                  border: "1px solid rgba(154, 131, 255, 0.3)",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  color: "#9A83FF",
                  fontFamily: "var(--font-display, sans-serif)",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: isRunning ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <AlertTriangle size={14} />
                Simulate Anomaly
              </button>

              <button
                onClick={resetSimulation}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  padding: "8px 14px",
                  color: "#8E9EAF",
                  fontSize: "13px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <RotateCcw size={14} />
                Reset
              </button>
            </div>
          </div>

          {/* Simulator Content Area: Agent Architecture & Step Sequence */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", padding: "32px" }}>
            {/* Left: Active Autonomous Agents */}
            <div>
              <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "12px", color: "#54D9FF", marginBottom: "16px", letterSpacing: "0.08em" }}>
                COORDINATED AGENT PODS (3 ACTIVE)
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {currentScenario.agents.map((agent, i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(10, 16, 26, 0.7)",
                      border: "1px solid rgba(84, 217, 255, 0.12)",
                      borderRadius: "12px",
                      padding: "16px 20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "8px",
                        background: "rgba(84, 217, 255, 0.1)",
                        border: "1px solid rgba(84, 217, 255, 0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#54D9FF",
                        fontFamily: "var(--font-mono, monospace)",
                        fontWeight: 700,
                        fontSize: "12px",
                      }}
                    >
                      {agent.icon}
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-display, sans-serif)", fontSize: "14px", fontWeight: 600, color: "#F0F4FF" }}>
                        {agent.name}
                      </div>
                      <div style={{ fontSize: "12px", color: "#7A8C9E" }}>{agent.role}</div>
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                      <span
                        style={{
                          fontSize: "11px",
                          fontFamily: "var(--font-mono, monospace)",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          background: "rgba(0, 229, 163, 0.08)",
                          color: "#00E5A3",
                          border: "1px solid rgba(0, 229, 163, 0.2)",
                        }}
                      >
                        SYNCED
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Execution Steps */}
              <div style={{ marginTop: "28px" }}>
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "12px", color: "#9A83FF", marginBottom: "16px", letterSpacing: "0.08em" }}>
                  EXECUTION PIPELINE STAGES
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {currentScenario.steps.map((st, i) => {
                    const isDone = activeStepIndex > i;
                    const isCurrent = activeStepIndex === i;
                    return (
                      <div
                        key={i}
                        style={{
                          background: isCurrent
                            ? "rgba(84, 217, 255, 0.08)"
                            : isDone
                            ? "rgba(0, 229, 163, 0.04)"
                            : "rgba(255, 255, 255, 0.02)",
                          border: isCurrent
                            ? "1px solid #54D9FF"
                            : isDone
                            ? "1px solid rgba(0, 229, 163, 0.2)"
                            : "1px solid rgba(255, 255, 255, 0.05)",
                          borderRadius: "10px",
                          padding: "12px 16px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          {isDone ? (
                            <CheckCircle2 size={16} color="#00E5A3" />
                          ) : isCurrent ? (
                            <Activity size={16} color="#54D9FF" className="animate-spin" />
                          ) : (
                            <div style={{ width: "16px", height: "16px", borderRadius: "50%", border: "1px solid rgba(255, 255, 255, 0.2)" }} />
                          )}
                          <span style={{ fontSize: "13px", color: isDone || isCurrent ? "#F0F4FF" : "#6A7B8C", fontWeight: 500 }}>
                            {st.title}
                          </span>
                        </div>
                        <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "11px", color: isDone ? "#00E5A3" : "#6A7B8C" }}>
                          {st.latency}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Live Terminal Log Stream */}
            <div
              style={{
                background: "#05070B",
                border: "1px solid rgba(84, 217, 255, 0.15)",
                borderRadius: "14px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "12px",
                minHeight: "340px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                  paddingBottom: "12px",
                  marginBottom: "16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#8E9EAF" }}>
                  <Terminal size={14} color="#54D9FF" />
                  <span>AUTONOMOUS_EXECUTION_STREAM</span>
                </div>
                <span style={{ color: "#00E5A3", fontSize: "11px" }}>STREAMING 100 Hz</span>
              </div>

              <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "6px" }}>
                {consoleLogs.map((log, idx) => (
                  <div
                    key={idx}
                    style={{
                      color: log.includes("[PASS]")
                        ? "#00E5A3"
                        : log.includes("[HEAL]")
                        ? "#9A83FF"
                        : log.includes("INITIATING")
                        ? "#54D9FF"
                        : "#A0B0C4",
                      lineHeight: 1.5,
                      wordBreak: "break-all",
                    }}
                  >
                    {log}
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: "16px",
                  paddingTop: "12px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#6A7B8C",
                  fontSize: "11px",
                }}
              >
                <span>STATUS: {isRunning ? "EXECUTING" : "IDLE / READY"}</span>
                <span>CRYPTOGRAPHIC HASH: e4b2..9f1a</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
