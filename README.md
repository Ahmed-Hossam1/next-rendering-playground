# Next.js Rendering Strategies Playground

A hands-on **Next.js 16** playground for practicing and understanding the four core rendering strategies — **SSG**, **SSR**, **ISR**, and **CSR** — side-by-side with real API data and a polished dark UI.

---

## 🗺️ Pages & Rendering Strategies

| Route | Strategy | Description |
|-------|----------|-------------|
| `/` | — | Home — overview & navigation |
| `/about` | **SSG** | Static Site Generation — built once at `next build`, served from CDN |
| `/weather` | **SSR** | Server-Side Rendering — fresh render on every request (`cache: "no-store"`) |
| `/posts` | **SSG + ISR** | Incremental Static Regeneration — static page that revalidates every 5 s |
| `/dashboard` | **CSR** | Client-Side Rendering — data fetched in the browser with `useEffect` |

---

## ✨ Features

- **🎨 Premium Dark UI** — custom CSS design tokens, glassmorphism navbar, smooth hover animations
- **⚡ SSG** — `/about` shows a frozen build-time timestamp to demonstrate static generation
- **🌐 SSR** — `/weather` shows a live server timestamp + full product detail that changes on every refresh
- **🔄 ISR** — `/posts` renders a product catalog that revalidates in the background every 5 seconds (`next: { revalidate: 5 }`)
- **🖥️ CSR** — `/dashboard` has a live ticking clock, skeleton loaders, and `useEffect`-based data fetching
- **🧩 Shared Navbar** — sticky, blur-backdrop navbar with per-route strategy badges
- **💀 Skeleton Loaders** — shimmer animation while CSR data loads
- **📊 Live Stats** — CSR dashboard computes real-time product statistics client-side
- **⚠️ Error Boundary** — styled root `error.tsx` with retry button

---

## 🏗️ Project Structure

```text
src/
└── app/
    ├── components/
    │   └── Navbar.tsx        # Shared sticky navbar with SSG/SSR/ISR/CSR badges
    ├── about/
    │   └── page.tsx          # SSG — Static Site Generation demo
    ├── weather/
    │   └── page.tsx          # SSR — Server-Side Rendering demo
    ├── posts/
    │   └── page.tsx          # SSG + ISR — Incremental Static Regeneration demo
    ├── dashboard/
    │   └── page.tsx          # CSR — Client-Side Rendering demo ("use client")
    ├── error.tsx             # Global error boundary
    ├── layout.tsx            # Root layout with Navbar
    ├── page.tsx              # Home page with strategy overview cards
    └── globals.css           # Full design system (tokens, components, animations)
```

---

## 🔑 Rendering Strategy Cheat Sheet

### ⚡ SSG — Static Site Generation
```tsx
// No fetch at all, or fetch without cache directives at build time
const Page = () => <div>Built once at `next build`</div>;
export default Page;
```
✅ Fastest delivery · CDN cached · Zero server cost per request  
❌ Content is stale until next rebuild

---

### 🌐 SSR — Server-Side Rendering
```tsx
// cache: "no-store" opts out of caching entirely
const res = await fetch(url, { cache: "no-store" });
```
✅ Always fresh data · Great for user-specific or real-time content  
❌ Slower TTFB · Server runs on every request

---

### 🔄 ISR — Incremental Static Regeneration
```tsx
// next.revalidate tells Next.js to refresh the cached page every N seconds
const res = await fetch(url, { next: { revalidate: 5 } });
```
✅ Static speed + periodic freshness · Stale-while-revalidate pattern  
❌ Visitors may briefly see stale content within the revalidation window

---

### 🖥️ CSR — Client-Side Rendering
```tsx
"use client";
useEffect(() => {
  fetch(url).then(r => r.json()).then(setData);
}, []);
```
✅ Interactive, personalised UIs · Live clocks, websockets, etc.  
❌ Empty HTML shell on load · Not SEO-friendly without SSR/SSG wrapper

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to explore the playground.

---

## 🛠️ Tech Stack

| Tool | Version |
|------|---------|
| Next.js | 16.x (App Router) |
| React | 19.x |
| Tailwind CSS | 4.x |
| TypeScript | 5.x |
| Data API | [dummyjson.com](https://dummyjson.com) |

---

Created with ❤️ while learning Next.js rendering strategies.
