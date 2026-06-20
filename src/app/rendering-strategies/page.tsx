import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rendering Strategies Topic",
  description:
    "Explore Next.js rendering strategies: SSG, SSR, ISR, and CSR — all in one playground.",
};

const strategies = [
  {
    href: "/rendering-strategies/ssg",
    type: "ssg",
    icon: "⚡",
    name: "Static Site Generation",
    abbr: "SSG",
    description:
      "Pages built at compile time. The fastest delivery — HTML is pre-rendered and served from a CDN.",
    tags: ["Build-time render", "No data fetching", "CDN cached"],
  },
  {
    href: "/rendering-strategies/ssr",
    type: "ssr",
    icon: "🌐",
    name: "Server-Side Rendering",
    abbr: "SSR",
    description:
      "Pages rendered fresh on every request. Always shows up-to-date data directly from the server.",
    tags: ["Per-request render", "cache: no-store", "Always fresh"],
  },
  {
    href: "/rendering-strategies/isr",
    type: "isr",
    icon: "🔄",
    name: "SSG + Incremental Static Regen.",
    abbr: "ISR",
    description:
      "Static pages that silently re-validate in the background every N seconds. Best of both worlds.",
    tags: ["revalidate: 5s", "Background refresh", "Stale-while-revalidate"],
  },
  {
    href: "/rendering-strategies/csr",
    type: "csr",
    icon: "🖥️",
    name: "Client-Side Rendering",
    abbr: "CSR",
    description:
      "Data fetched in the browser after the page loads. Ideal for personalised, interactive dashboards.",
    tags: ["\"use client\"", "Browser fetch", "Dynamic UI"],
  },
];

export default function RenderingStrategiesLandingPage() {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <Link href="/" className="strategy-tag" style={{ marginBottom: "1rem", display: "inline-flex", textDecoration: "none" }}>
          ← Back to Topics
        </Link>
        <h1 className="page-title">Rendering Strategies</h1>
        <p className="page-description">
          Next.js offers multiple ways to render your content. Choose a sub-topic below to explore the working demo and characteristics of each strategy.
        </p>
      </div>

      <div className="section-label">Select a Strategy Demo</div>

      <div className="strategies-grid">
        {strategies.map((s) => (
          <Link key={s.href} href={s.href} className={`strategy-card ${s.type}`}>
            <div className="strategy-card-header">
              <div className={`strategy-card-icon ${s.type}`}>{s.icon}</div>
              <span className="strategy-card-arrow">→</span>
            </div>

            <div>
              <div className={`strategy-badge ${s.type}`} style={{ marginBottom: "0.5rem" }}>
                {s.abbr}
              </div>
              <div className="strategy-card-name">{s.name}</div>
              <div className="strategy-card-desc">{s.description}</div>
            </div>

            <div className="strategy-card-tags">
              {s.tags.map((tag) => (
                <span key={tag} className="strategy-tag">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
