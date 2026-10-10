"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "Solutions", href: "#solutions" },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

interface NavigationProps {
  /** When true, nav has scrolled past 60px and shows background */
  scrolled?: boolean;
}

export default function Navigation({ scrolled }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(scrolled ?? false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={navRef}
      role="banner"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background 0.4s ease, border-color 0.4s ease",
        background: isScrolled
          ? "rgba(8, 11, 16, 0.88)"
          : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        borderBottom: isScrolled
          ? "1px solid rgba(84, 217, 255, 0.08)"
          : "1px solid transparent",
      }}
    >
      <nav
        aria-label="Main navigation"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 32px",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand mark */}
        <Link
          href="/"
          aria-label="NEXORA home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          {/* Logo mark */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
          >
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
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: "18px",
              letterSpacing: "0.12em",
              color: "#F0F4FF",
            }}
          >
            NEXORA
          </span>
        </Link>

        {/* Desktop nav links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "40px",
          }}
          className="desktop-nav"
        >
          <ul
            role="list"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "36px",
              listStyle: "none",
            }}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#8A97AE",
                    textDecoration: "none",
                    letterSpacing: "0.01em",
                    transition: "color 0.2s ease",
                    padding: "4px 0",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#F0F4FF";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#8A97AE";
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#get-started"
            id="nav-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 22px",
              background: "rgba(84, 217, 255, 0.1)",
              border: "1px solid rgba(84, 217, 255, 0.35)",
              borderRadius: "8px",
              color: "#54D9FF",
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "none",
              letterSpacing: "0.02em",
              transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "rgba(84, 217, 255, 0.18)";
              el.style.borderColor = "rgba(84, 217, 255, 0.6)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "rgba(84, 217, 255, 0.1)";
              el.style.borderColor = "rgba(84, 217, 255, 0.35)";
            }}
          >
            Get Started
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          id="mobile-menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#8A97AE",
            padding: "8px",
          }}
          className="mobile-menu-btn"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-label="Mobile navigation"
          style={{
            background: "rgba(8, 11, 16, 0.97)",
            backdropFilter: "blur(16px)",
            borderTop: "1px solid rgba(84, 217, 255, 0.1)",
            padding: "24px 32px",
          }}
        >
          <ul role="list" style={{ listStyle: "none", marginBottom: "24px" }}>
            {NAV_LINKS.map((link) => (
              <li key={link.label} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block",
                    padding: "16px 0",
                    color: "#8A97AE",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "16px",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#get-started"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "inline-block",
              padding: "12px 28px",
              background: "rgba(84, 217, 255, 0.12)",
              border: "1px solid rgba(84, 217, 255, 0.35)",
              borderRadius: "8px",
              color: "#54D9FF",
              fontFamily: "'Inter', sans-serif",
              fontSize: "15px",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Get Started
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
