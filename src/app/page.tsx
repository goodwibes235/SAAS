import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CustomerShowcase from "@/components/CustomerShowcase";
import PinnedWorkflowMesh from "@/components/PinnedWorkflowMesh";
import ProductShowcase from "@/components/ProductShowcase";
import FeaturesBento from "@/components/FeaturesBento";
import InteractiveDemo from "@/components/InteractiveDemo";
import WorkflowSection from "@/components/WorkflowSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import CinematicBackground from "@/components/CinematicBackground";

export default function Home() {
  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "transparent",
        color: "#F0F4FF",
      }}
    >
      {/* Multi-Plane 2.5D Parallax Environment */}
      <CinematicBackground />

      {/* Floating Glass Navigation */}
      <Navigation />

      {/* Hero Viewport & Dimensional Intelligence Core */}
      <HeroSection />

      {/* Enterprise Provenance & Trust Marquee */}
      <CustomerShowcase />

      {/* Pinned Cinematic Scrollytelling Sequence: Disconnected to Connected Mesh */}
      <PinnedWorkflowMesh />

      {/* 3D Perspective Operations Cockpit Showcase */}
      <ProductShowcase />

      {/* Architectural Bento Grid */}
      <FeaturesBento />

      {/* Live Interactive Playground / Anomaly Sandbox */}
      <InteractiveDemo />

      {/* Operational Capabilities & Core Architecture */}
      <WorkflowSection />

      {/* Universal Ecosystem Connectors */}
      <IntegrationsSection />

      {/* Predictable Enterprise Tiers & Interactive ROI Calculator */}
      <PricingSection />

      {/* Enterprise Verification & Compliance FAQ */}
      <FaqSection />

      {/* Instant Deployment Conversion Banner */}
      <CtaSection />

      {/* Enterprise Footer */}
      <Footer />
    </main>
  );
}
