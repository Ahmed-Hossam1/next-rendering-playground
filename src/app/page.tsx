import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js 16 Topics Playground",
  description:
    "A playground containing comprehensive, interactive practice tasks for Next.js 16 features.",
};

const topics = [
  {
    href: "/rendering-strategies",
    icon: "🌐",
    title: "Rendering Strategies",
    description: "Explore Static Site Generation (SSG), Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), and Client-Side Rendering (CSR).",
    badge: "SSG, SSR, ISR, CSR",
    badgeClass: "ssr",
    tags: ["Build-time", "On-demand", "Revalidation", "useEffect"],
  },
  {
    href: "/route-handlers",
    icon: "⚙️",
    title: "Route Handlers (APIs)",
    description: "Practice building complete CRUD operations (GET, POST, PUT, DELETE) inside REST API route handlers with a live interactive database console.",
    badge: "GET, POST, PUT, DELETE",
    badgeClass: "csr",
    tags: ["REST API", "Dynamic Parameters", "NextResponse", "Request Validation"],
  },
];

export default function Home() {
  return (
    <div className="page-wrapper" style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div className="home-hero" style={{ padding: "2rem 0 3rem" }}>
        <div className="home-eyebrow">✦ Next.js 16 Practice Sandbox</div>
        <h1 className="home-title">
          Topics & Concepts
          <br />
          Playground
        </h1>
        <p className="home-subtitle">
          Click on any topic below to dive into code implementations, explanations, and interactive live dashboards.
        </p>
      </div>

      <div className="section-label">Select a Practice Topic</div>

      <div className="strategies-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
        {topics.map((t) => (
          <Link key={t.href} href={t.href} className="strategy-card ssr" style={{ padding: "2rem" }}>
            <div className="strategy-card-header">
              <div className="strategy-card-icon ssr" style={{ fontSize: "1.8rem", width: "56px", height: "56px" }}>
                {t.icon}
              </div>
              <span className="strategy-card-arrow" style={{ fontSize: "1.5rem" }}>→</span>
            </div>

            <div>
              <span className={`strategy-badge ${t.badgeClass}`} style={{ marginBottom: "0.5rem" }}>
                {t.badge}
              </span>
              <h2 className="strategy-card-name" style={{ fontSize: "1.3rem", marginTop: "0.5rem" }}>{t.title}</h2>
              <p className="strategy-card-desc" style={{ fontSize: "0.88rem", marginTop: "0.5rem", color: "var(--text-secondary)" }}>
                {t.description}
              </p>
            </div>

            <div className="strategy-card-tags" style={{ marginTop: "1rem" }}>
              {t.tags.map((tag) => (
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
