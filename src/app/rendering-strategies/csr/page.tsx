"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  stock: number;
  category: string;
  thumbnail: string;
  discountPercentage: number;
}

interface ProductsResponse {
  products: Product[];
  total: number;
}

function StatCard({
  label,
  value,
  change,
  icon,
  negative = false,
}: {
  label: string;
  value: string;
  change: string;
  icon: string;
  negative?: boolean;
}) {
  return (
    <div className="stat-card">
      <div className="stat-label">
        <span>{icon}</span> {label}
      </div>
      <div className="stat-value">{value}</div>
      <div className={`stat-change ${negative ? "negative" : ""}`}>{change}</div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="data-card">
      <div className="skeleton" style={{ width: "100%", aspectRatio: "4/3" }} />
      <div className="data-card-body" style={{ gap: "0.75rem" }}>
        <div className="skeleton" style={{ height: "12px", width: "60%" }} />
        <div className="skeleton" style={{ height: "16px", width: "85%" }} />
        <div className="skeleton" style={{ height: "12px", width: "100%" }} />
        <div className="skeleton" style={{ height: "12px", width: "75%" }} />
      </div>
    </div>
  );
}

export default function CSRPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState<Date | null>(null);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  // Live clock — client only
  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // CSR data fetch
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch("https://dummyjson.com/products?limit=8");
        if (!res.ok) throw new Error("Network response was not ok");
        const data: ProductsResponse = await res.json();
        setProducts(data.products);
        setTotal(data.total);
        setFetchedAt(new Date().toUTCString());
      } catch {
        setError("Failed to fetch product data. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Derived stats
  const avgPrice =
    products.length > 0
      ? (products.reduce((a, p) => a + p.price, 0) / products.length).toFixed(2)
      : "—";

  const avgRating =
    products.length > 0
      ? (products.reduce((a, p) => a + p.rating, 0) / products.length).toFixed(1)
      : "—";

  const totalStock = products.reduce((a, p) => a + p.stock, 0);

  const categories = [...new Set(products.map((p) => p.category))].length;

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <Link href="/rendering-strategies" className="strategy-tag" style={{ marginBottom: "1rem", display: "inline-flex", textDecoration: "none" }}>
          ← Back to Rendering Strategies
        </Link>
        <div className="strategy-badge csr">🖥️ CSR — Client-Side Rendering</div>
        <h1 className="page-title">Products Dashboard</h1>
        <p className="page-description">
          Data is fetched in the <strong>browser</strong> after the initial
          paint using <code style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.85em", background: "var(--bg-card)", padding: "1px 5px", borderRadius: "4px", border: "1px solid var(--border)" }}>useEffect</code>. The clock below is a live client-side timer — impossible with SSG/SSR.
        </p>
      </div>

      {/* Live Timestamp */}
      <div className="timestamp-banner">
        <div className="timestamp-dot csr" />
        <span className="timestamp-text">Live clock:</span>
        <span className="timestamp-value">
          {now ? now.toLocaleTimeString() : "—"}
        </span>
        {fetchedAt && (
          <>
            <span className="timestamp-text" style={{ marginLeft: "1rem" }}>
              Fetched at:
            </span>
            <span className="timestamp-value">{fetchedAt}</span>
          </>
        )}
        <span className="timestamp-text" style={{ marginLeft: "auto" }}>
          🖥️ Client-side JS
        </span>
      </div>

      {/* CSR Info */}
      <div className="info-card">
        <div className="info-card-title">How CSR works in Next.js</div>
        <div className="info-card-grid">
          <div className="info-item">
            <span className="info-label">Directive</span>
            <span className="info-value">"use client"</span>
          </div>
          <div className="info-item">
            <span className="info-label">Data fetching</span>
            <span className="info-value">useEffect + fetch()</span>
          </div>
          <div className="info-item">
            <span className="info-label">HTML on server</span>
            <span className="info-value">Empty shell</span>
          </div>
          <div className="info-item">
            <span className="info-label">Total products</span>
            <span className="info-value">{total > 0 ? `${total}` : "Loading…"}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      {!loading && !error && (
        <>
          <div className="section-label">Real-time Stats</div>
          <div className="dashboard-grid">
            <StatCard
              icon="📦"
              label="Products Loaded"
              value={`${products.length}`}
              change={`of ${total} total`}
            />
            <StatCard
              icon="💰"
              label="Avg. Price"
              value={`$${avgPrice}`}
              change="across all loaded"
            />
            <StatCard
              icon="⭐"
              label="Avg. Rating"
              value={`${avgRating}/5`}
              change="customer score"
            />
            <StatCard
              icon="🏷️"
              label="Categories"
              value={`${categories}`}
              change="unique in view"
            />
            <StatCard
              icon="📋"
              label="Total Stock"
              value={`${totalStock.toLocaleString()}`}
              change="units available"
            />
          </div>
        </>
      )}

      {/* Error */}
      {error && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "var(--text-secondary)",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⚠️</div>
          <p>{error}</p>
          <button
            className="retry-btn"
            style={{ marginTop: "1rem" }}
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      )}

      {/* Products Grid */}
      <div className="section-label" style={{ marginTop: "2rem" }}>
        {loading ? "Fetching from browser…" : `${products.length} Products — Loaded via CSR`}
      </div>

      <div className="cards-grid">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : products.map((product) => (
              <div key={product.id} className="data-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="data-card-image"
                  loading="lazy"
                />
                <div className="data-card-body">
                  <div className="data-card-category">{product.category}</div>
                  <div className="data-card-title">{product.title}</div>
                  <div className="data-card-footer">
                    <div className="data-card-price">
                      $
                      {(
                        product.price *
                        (1 - product.discountPercentage / 100)
                      ).toFixed(2)}
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-muted)",
                          fontWeight: 400,
                          marginLeft: "6px",
                          textDecoration: "line-through",
                        }}
                      >
                        ${product.price}
                      </span>
                    </div>
                    <div className="data-card-rating">
                      <span className="rating-star">★</span>
                      {product.rating.toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
