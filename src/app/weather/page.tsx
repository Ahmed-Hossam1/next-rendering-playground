import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weather — SSR",
  description: "Server-Side Rendering (SSR) demo — fresh product data fetched on every request.",
};

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  availabilityStatus: string;
  warrantyInformation: string;
  shippingInformation: string;
  returnPolicy: string;
  minimumOrderQuantity: number;
  weight: number;
}

async function getProduct(): Promise<Product> {
  const res = await fetch("https://dummyjson.com/products/1", {
    cache: "no-store", // SSR — never cache, always fetch fresh
  });
  if (!res.ok) throw new Error("Failed to fetch product data");
  return res.json();
}

export default async function WeatherPage() {
  const product = await getProduct();
  const fetchedAt = new Date().toUTCString();
  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div className="strategy-badge ssr">🌐 SSR — Server-Side Rendering</div>
        <h1 className="page-title">Server-Side Rendering</h1>
        <p className="page-description">
          This page is rendered fresh on <strong>every request</strong>. The
          timestamp updates on each reload — data is never cached by Next.js.
        </p>
      </div>

      {/* Live Timestamp */}
      <div className="timestamp-banner">
        <div className="timestamp-dot" />
        <span className="timestamp-text">Rendered at:</span>
        <span className="timestamp-value">{fetchedAt}</span>
        <span className="timestamp-text" style={{ marginLeft: "auto" }}>
          🔄 Refreshes on every request
        </span>
      </div>

      {/* SSR Info */}
      <div className="info-card">
        <div className="info-card-title">How SSR works in Next.js</div>
        <div className="info-card-grid">
          <div className="info-item">
            <span className="info-label">Cache directive</span>
            <span className="info-value">cache: "no-store"</span>
          </div>
          <div className="info-item">
            <span className="info-label">Trigger</span>
            <span className="info-value">Each HTTP request</span>
          </div>
          <div className="info-item">
            <span className="info-label">Data freshness</span>
            <span className="info-value">Always up-to-date</span>
          </div>
          <div className="info-item">
            <span className="info-label">Server cost per req.</span>
            <span className="info-value">Full render + fetch</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <div className="section-label">Live Data — Fetched Now</div>

      <div className="detail-layout">
        {/* Image */}
        <div className="detail-image-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.thumbnail}
            alt={product.title}
            className="detail-image"
          />
        </div>

        {/* Info */}
        <div className="detail-info">
          <div>
            <div className="data-card-category">{product.category}</div>
            <h2
              className="page-title"
              style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}
            >
              {product.title}
            </h2>
            <p className="page-description" style={{ fontSize: "0.875rem" }}>
              {product.description}
            </p>
          </div>

          {/* Meta Tags */}
          <div className="detail-meta-row">
            {product.brand && (
              <span className="detail-tag">🏷️ {product.brand}</span>
            )}
            <span className="detail-tag">
              ⭐ {product.rating.toFixed(1)} / 5
            </span>
            <span className="detail-tag">
              📦 {product.availabilityStatus}
            </span>
          </div>

          {/* Price */}
          <div className="detail-price-row">
            <span className="detail-price">${discountedPrice}</span>
            <span
              style={{
                fontSize: "0.9rem",
                color: "var(--text-muted)",
                textDecoration: "line-through",
              }}
            >
              ${product.price}
            </span>
            <span className="detail-discount">
              -{product.discountPercentage.toFixed(0)}%
            </span>
          </div>

          {/* Specs */}
          <div className="detail-specs">
            <div className="spec-item">
              <div className="spec-label">Stock</div>
              <div className="spec-value">{product.stock} units</div>
            </div>
            <div className="spec-item">
              <div className="spec-label">Min. Order</div>
              <div className="spec-value">{product.minimumOrderQuantity}</div>
            </div>
            <div className="spec-item">
              <div className="spec-label">Weight</div>
              <div className="spec-value">{product.weight} kg</div>
            </div>
            <div className="spec-item">
              <div className="spec-label">Warranty</div>
              <div className="spec-value" style={{ fontSize: "0.78rem" }}>
                {product.warrantyInformation}
              </div>
            </div>
            <div className="spec-item">
              <div className="spec-label">Shipping</div>
              <div className="spec-value" style={{ fontSize: "0.78rem" }}>
                {product.shippingInformation}
              </div>
            </div>
            <div className="spec-item">
              <div className="spec-label">Returns</div>
              <div className="spec-value" style={{ fontSize: "0.78rem" }}>
                {product.returnPolicy}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
