import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SSG — Static Site Generation",
  description: "Static Site Generation (SSG) demo page — pre-rendered at build time.",
};

const features = [
  {
    icon: "⚡",
    title: "Instant Load",
    desc: "HTML is pre-built at compile time and served as a static file from CDN edge nodes worldwide.",
  },
  {
    icon: "🏗️",
    title: "Build-Time Render",
    desc: "Next.js runs your component once during `next build`. No server compute on each request.",
  },
  {
    icon: "💰",
    title: "Zero Server Cost",
    desc: "No server required at runtime. Serve millions of users with minimal infrastructure cost.",
  },
  {
    icon: "🔒",
    title: "Highly Secure",
    desc: "No dynamic server-side code means no server-side attack surface at request time.",
  },
  {
    icon: "🌍",
    title: "Global CDN",
    desc: "Static files are cached on edge locations globally, reducing latency for all users.",
  },
  {
    icon: "📸",
    title: "Snapshot in Time",
    desc: "Content reflects the state at build time. Great for docs, blogs, and marketing sites.",
  },
];

export default function SSGPage() {
  const buildTime = new Date().toUTCString();

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <Link href="/rendering-strategies" className="strategy-tag" style={{ marginBottom: "1rem", display: "inline-flex", textDecoration: "none" }}>
          ← Back to Rendering Strategies
        </Link>
        <div className="strategy-badge ssg">⚡ SSG — Static Site Generation</div>
        <h1 className="page-title">Static Site Generation</h1>
        <p className="page-description">
          This page is generated once at <strong>build time</strong> and served
          as a static HTML file. The timestamp below is frozen — it won't change
          on refresh because there's no server involved.
        </p>
      </div>

      {/* Timestamp Banner */}
      <div className="timestamp-banner">
        <div className="timestamp-dot static" />
        <span className="timestamp-text">Built at:</span>
        <span className="timestamp-value">{buildTime}</span>
        <span className="timestamp-text" style={{ marginLeft: "auto" }}>
          🔒 Frozen — no re-render on request
        </span>
      </div>

      {/* Info Card */}
      <div className="info-card">
        <div className="info-card-title">How SSG works in Next.js</div>
        <div className="info-card-grid">
          <div className="info-item">
            <span className="info-label">Trigger</span>
            <span className="info-value">next build</span>
          </div>
          <div className="info-item">
            <span className="info-label">Revalidation</span>
            <span className="info-value">Never (until rebuild)</span>
          </div>
          <div className="info-item">
            <span className="info-label">Data freshness</span>
            <span className="info-value">Build-time snapshot</span>
          </div>
          <div className="info-item">
            <span className="info-label">Server cost per req.</span>
            <span className="info-value">None (CDN cached)</span>
          </div>
        </div>
      </div>

      {/* About Hero */}
      <div className="about-hero" style={{ paddingTop: "1rem" }}>
        <div className="about-icon">⚡</div>
        <div className="strategy-badge ssg" style={{ margin: "0 auto 1rem" }}>
          Static Site Generation
        </div>
        <h2 className="page-title" style={{ marginBottom: "0.75rem" }}>
          Pre-rendered at Build Time
        </h2>
        <p className="page-description" style={{ margin: "0 auto" }}>
          SSG is the default rendering mode for pages with no data fetching. It
          produces zero-server-overhead HTML that's ideal for content that
          doesn't change per request.
        </p>
      </div>

      {/* Features */}
      <div className="section-label">Key Characteristics</div>
      <div className="feature-grid">
        {features.map((f) => (
          <div key={f.title} className="feature-card">
            <div className="feature-icon">{f.icon}</div>
            <div className="feature-title">{f.title}</div>
            <div className="feature-desc">{f.desc}</div>
          </div>
        ))}
      </div>

      {/* Best for */}
      <div className="divider" />
      <div className="info-card">
        <div className="info-card-title">✅ Best used for</div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginTop: "0.5rem",
          }}
        >
          {[
            "Marketing pages",
            "Blog posts",
            "Documentation",
            "Landing pages",
            "Portfolio sites",
            "Product pages with stable content",
          ].map((item) => (
            <span key={item} className="detail-tag">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
