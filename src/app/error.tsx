"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="page-wrapper">
      <div className="error-page">
        <div className="error-icon">⚠️</div>
        <h2 className="error-title">Something went wrong</h2>
        <p className="error-desc">
          {error.message || "An unexpected error occurred while rendering this page."}
        </p>
        {error.digest && (
          <code
            style={{
              fontSize: "0.72rem",
              color: "var(--text-muted)",
              fontFamily: "JetBrains Mono, monospace",
              marginTop: "0.25rem",
            }}
          >
            Digest: {error.digest}
          </code>
        )}
        <button className="retry-btn" onClick={reset}>
          Try again
        </button>
      </div>
    </div>
  );
}
