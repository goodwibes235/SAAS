import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "NEXORA — Deterministic Autonomy for Modern Enterprise",
  description:
    "NEXORA is the autonomous enterprise mesh for business operations, self-healing pipelines, and sub-millisecond execution.",
  keywords: [
    "AI workflow automation",
    "enterprise operations",
    "autonomous business mesh",
    "vector memory",
    "NEXORA",
  ],
  openGraph: {
    title: "NEXORA — Deterministic Autonomy for Modern Enterprise",
    description:
      "The autonomous enterprise mesh for deterministic business operations, self-healing pipelines, and sub-millisecond execution.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="noise-overlay" aria-hidden="true" />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
