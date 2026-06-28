"use client";

import { useEditor } from "../hooks/useEditor";

const Editor = () => {
  const { content, setContent, wordCount, readTime } = useEditor();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write something to preview the feature-based editor..."
        rows={8}
        style={{
          width: "100%",
          padding: "0.75rem",
          borderRadius: "10px",
          border: "1px solid var(--border)",
          backgroundColor: "var(--bg-card)",
          color: "var(--text-primary)",
          resize: "vertical",
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "1rem",
          color: "var(--text-secondary)",
          fontSize: "0.9rem",
        }}
      >
        <span>{wordCount} words</span>
        <span>{readTime} min read</span>
      </div>
    </div>
  );
};

export default Editor;
