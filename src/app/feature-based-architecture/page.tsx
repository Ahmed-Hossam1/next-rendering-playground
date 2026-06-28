import Link from "next/link";
import type { Metadata } from "next";
import Editor from "./src/editor/components/Editor";

export const metadata: Metadata = {
  title: "Feature-Based Architecture Topic",
  description:
    "Explore a feature-based architecture example with local hooks, utilities, and UI grouped by feature.",
};

const architecturePoints = [
  {
    title: "Feature folder",
    description:
      "Keep the editor UI, logic, and helpers inside one feature folder instead of scattering them across the app.",
  },
  {
    title: "Local state and hooks",
    description:
      "The editor logic lives in a dedicated hook so the component stays focused on rendering.",
  },
  {
    title: "Reusable utilities",
    description:
      "Word counting and read-time calculations are separated into small utilities for easier testing and maintenance.",
  },
];

const folderStructure = [
  {
    type: "folder",
    name: "src/",
    children: [
      {
        type: "folder",
        name: "app/",
        children: [
          {
            type: "folder",
            name: "feature-based-architecture/",
            children: [
              { type: "file", name: "page.tsx" },
              {
                type: "folder",
                name: "feature/",
                children: [
                  {
                    type: "folder",
                    name: "editor/",
                    children: [
                      {
                        type: "folder",
                        name: "components/",
                        children: [{ type: "file", name: "Editor.tsx" }],
                      },
                      {
                        type: "folder",
                        name: "hooks/",
                        children: [{ type: "file", name: "useEditor.ts" }],
                      },
                      {
                        type: "folder",
                        name: "utils/",
                        children: [{ type: "file", name: "index.ts" }],
                      },
                      { type: "file", name: "types.ts" },
                    ],
                  },
                  {
                    type: "folder",
                    name: "Likes/",
                    children: [
                      {
                        type: "folder",
                        name: "components/",
                        children: [{ type: "file", name: "Likes.tsx" }],
                      },
                      {
                        type: "folder",
                        name: "hooks/",
                        children: [{ type: "file", name: "useLikes.ts" }],
                      },
                      {
                        type: "folder",
                        name: "utils/",
                        children: [{ type: "file", name: "index.ts" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

function FolderTree({ items }: { items: typeof folderStructure }) {
  return (
    <div
      style={{
        fontFamily: "'Fira Code', 'SFMono-Regular', monospace",
        fontSize: "0.9rem",
        lineHeight: 1.7,
      }}
    >
      {items.map((item) => (
        <div key={item.name}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ color: "#818cf8" }}>
              {item.type === "folder" ? "📁" : "📄"}
            </span>
            <span
              style={{
                color:
                  item.type === "folder" ? "#c7d2fe" : "var(--text-secondary)",
              }}
            >
              {item.name}
            </span>
          </div>
          {item.children && (
            <div
              style={{
                marginLeft: "1rem",
                borderLeft: "1px solid rgba(129, 140, 248, 0.25)",
                paddingLeft: "0.75rem",
              }}
            >
              <FolderTree items={item.children as typeof folderStructure} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function FeatureBasedArchitecturePage() {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <Link
          href="/"
          className="strategy-tag"
          style={{
            marginBottom: "1rem",
            display: "inline-flex",
            textDecoration: "none",
          }}
        >
          ← Back to Topics
        </Link>
        <div
          className="strategy-badge csr"
          style={{
            background: "rgba(99, 102, 241, 0.12)",
            color: "#818cf8",
            borderColor: "rgba(99, 102, 241, 0.3)",
          }}
        >
          🧩 Feature-Based Architecture
        </div>
        <h1 className="page-title">Organize by Feature</h1>
        <p className="page-description">
          This route demonstrates how a feature can own its own components,
          hooks, utilities, and types in a single place.
        </p>
      </div>

      <div className="info-card">
        <div className="info-card-title">Why this structure is helpful</div>
        <div className="info-card-grid">
          <div className="info-item">
            <span className="info-label">Scalability</span>
            <span className="info-value">
              Add new features without mixing concerns.
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Maintainability</span>
            <span className="info-value">
              Find related code faster inside one feature folder.
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Team collaboration</span>
            <span className="info-value">
              Different developers can work on separate features safely.
            </span>
          </div>
        </div>
      </div>

      <div className="detail-layout" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div>
          <div className="section-label">Feature structure</div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {architecturePoints.map((point) => (
              <div
                key={point.title}
                className="feature-card"
                style={{ padding: "1rem" }}
              >
                <div
                  className="info-card-title"
                  style={{ fontSize: "1rem", marginBottom: "0.35rem" }}
                >
                  {point.title}
                </div>
                <div className="strategy-card-desc">{point.description}</div>
              </div>
            ))}
          </div>

          <div
            className="feature-card"
            style={{ padding: "1rem", marginTop: "1rem" }}
          >
            <div
              className="info-card-title"
              style={{ fontSize: "1rem", marginBottom: "0.6rem" }}
            >
              Folder preview
            </div>
            <FolderTree items={folderStructure} />
          </div>
        </div>

        <div>
          <div className="section-label">Live demo</div>
          <div className="feature-card" style={{ padding: "1rem" }}>
            <Editor />
          </div>
        </div>
      </div>
    </div>
  );
}
