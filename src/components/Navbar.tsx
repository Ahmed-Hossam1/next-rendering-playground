"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/* ── Sun icon (light mode) ─────────────────────────────────────────────── */
function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

/* ── Moon icon (dark mode) ─────────────────────────────────────────────── */
function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/* ── Navbar ────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render theme-aware UI after mount
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  function toggle() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border"
      style={{ backgroundColor: "var(--navbar)", backdropFilter: "blur(12px)" }}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Brand */}
        <span className="text-lg font-bold tracking-tight gradient-text select-none">
          Design System
        </span>

        {/* Theme toggle */}
        <button
          id="theme-toggle"
          aria-label={
            mounted
              ? isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
              : "Switch theme"
          }
          onClick={toggle}
          className={cn(
            "relative flex h-10 w-10 items-center justify-center",
            "rounded-full border border-border",
            "bg-muted text-muted-foreground",
            "transition-all duration-300",
            "hover:bg-primary hover:text-primary-foreground hover:border-primary",
            "hover:scale-110 hover:shadow-lg hover:shadow-primary/30",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          {/* Crossfade icons once mounted */}
          <span
            className="absolute transition-all duration-300"
            style={{
              opacity: mounted && isDark ? 1 : 0,
              transform:
                mounted && isDark
                  ? "rotate(0deg) scale(1)"
                  : "rotate(-90deg) scale(0.5)",
            }}
          >
            <SunIcon />
          </span>
          <span
            className="absolute transition-all duration-300"
            style={{
              opacity: mounted && !isDark ? 1 : 0,
              transform:
                mounted && !isDark
                  ? "rotate(0deg) scale(1)"
                  : "rotate(90deg) scale(0.5)",
            }}
          >
            <MoonIcon />
          </span>
        </button>
      </nav>
    </header>
  );
}
