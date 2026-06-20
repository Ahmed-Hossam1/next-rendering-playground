import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ISR — Incremental Static Regeneration",
  description:
    "Incremental Static Regeneration (ISR) demo — static page that revalidates every 5 seconds.",
};

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  category: string;
  thumbnail: string;
  brand?: string;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

async function getProducts(): Promise<ProductsResponse> {
  const res = await fetch("https://dummyjson.com/products?limit=12", {
    next: {
      revalidate: 5, // ISR — revalidate every 5 seconds in the background
    },
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function ISRPage() {
  const data = await getProducts();
  const renderedAt = new Date().toUTCString();

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <Link href="/rendering-strategies" className="strategy-tag" style={{ marginBottom: "1rem", display: "inline-flex", textDecoration: "none" }}>
          ← Back to Rendering Strategies
        </Link>
        <div className="strategy-badge isr">🔄 SSG + ISR — Incremental Static Regeneration</div>
        <h1 className="page-title">Products Catalog</h1>
        <p className="page-description">
          This page is statically generated, then silently{" "}
          <strong>re-validated every 5 seconds</strong> in the background.
          After revalidation, the next visitor gets the fresh page.
        </p>
      </div>

      {/* ISR Timestamp */}
      <div className="timestamp-banner">
        <div className="timestamp-dot isr" />
        <span className="timestamp-text">Last rendered at:</span>
        <span className="timestamp-value">{renderedAt}</span>
        <span className="timestamp-text" style={{ marginLeft: "auto" }}>
          ⏱️ Revalidates every 5s
        </span>
      </div>

      {/* ISR Info */}
      <div className="info-card">
        <div className="info-card-title">How ISR works in Next.js</div>
        <div className="info-card-grid">
          <div className="info-item">
            <span className="info-label">Cache directive</span>
            <span className="info-value">next: {"{ revalidate: 5 }"}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Initial render</span>
            <span className="info-value">Build-time (static)</span>
          </div>
          <div className="info-item">
            <span className="info-label">Refresh strategy</span>
            <span className="info-value">Stale-while-revalidate</span>
          </div>
          <div className="info-item">
            <span className="info-label">Products loaded</span>
            <span className="info-value">{data.total} total</span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="section-label">
        {data.products.length} Products — Fetched via ISR
      </div>

      <div className="cards-grid">
        {data.products.map((product) => (
          <div key={product.id} className="data-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.thumbnail}
              alt={product.title}
              className="data-card-image"
            />
            <div className="data-card-body">
              <div className="data-card-category">{product.category}</div>
              <div className="data-card-title">{product.title}</div>
              <div className="data-card-desc">{product.description}</div>

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
