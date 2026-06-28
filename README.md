# Next.js 16 Practice Sandbox

A premium, hands-on **Next.js 16 (App Router)** playground containing structured practice tasks for core framework capabilities.

---

## 🗺️ Topic Folders & Routes

| Section                        | Route                         | Naming Convention & Concept   | Description                                                                                |
| ------------------------------ | ----------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------ |
| **Home**                       | `/`                           | —                             | Entry point listing all topic sandboxes                                                    |
| **Rendering Strategies**       | `/rendering-strategies`       | `page.tsx` landing            | Topic overview for different rendering styles                                              |
|                                | `/rendering-strategies/ssg`   | `ssg/page.tsx`                | Static Site Generation (build-time rendered)                                               |
|                                | `/rendering-strategies/ssr`   | `ssr/page.tsx`                | Server-Side Rendering (`cache: "no-store"`)                                                |
|                                | `/rendering-strategies/isr`   | `isr/page.tsx`                | Incremental Static Regeneration (`revalidate: 5`)                                          |
|                                | `/rendering-strategies/csr`   | `csr/page.tsx`                | Client-Side Rendering (`"use client"` + `useEffect`)                                       |
| **Feature-Based Architecture** | `/feature-based-architecture` | `page.tsx` landing            | Demonstrates organizing code by feature with local components, hooks, utilities, and types |
| **Route Handlers**             | `/route-handlers`             | `page.tsx` console            | Console UI to interact with CRUD endpoints                                                 |
|                                | `/api/exercises`              | `api/exercises/route.ts`      | **GET** all exercises & **POST** new exercise                                              |
|                                | `/api/exercises/[id]`         | `api/exercises/[id]/route.ts` | **GET** single, **PUT** update, & **DELETE** exercise                                      |

---

## ✨ Features

- **🎨 Premium Dark Theme** — Tailwind CSS v4, custom CSS variables, and high-end cards.
- **⚡ Rendering Strategies topic** — Explore the 4 major rendering pipelines side-by-side with timestamps, spec grids, live clocks, and stats.
- **🧩 Feature-Based Architecture Demo** — Shows how to group UI, hooks, utilities, and types inside a single feature folder for cleaner, more scalable apps.
- **⚙️ Route Handlers CRUD Console** — A beautiful interactive sandbox where you can:
  - **Query & filter** exercises.
  - **Create** exercises (`POST`).
  - **Update** exercises (`PUT`).
  - **Delete** exercises (`DELETE`).
  - View real-time **dynamic code snippets** showing how to use `fetch` for each request type.
- **🛠️ RESTful Dynamic Routing** — Uses `api/exercises/[id]/route.ts` dynamically resolving REST actions correctly.

---

## 🏗️ Project Structure

```text
src/
├── data.ts                           # Mutable database in-memory list of exercises
└── app/
    ├── components/
    │   └── Navbar.tsx                # Dynamic top navbar with badges
    ├── rendering-strategies/         # Topic: Rendering strategies
    │   ├── page.tsx                  # Strategy cards landing
    │   ├── ssg/page.tsx              # SSG static render demo
    │   ├── ssr/page.tsx              # SSR server-render demo
    │   ├── isr/page.tsx              # ISR revalidation demo
    │   └── csr/page.tsx              # CSR client-render demo
    ├── feature-based-architecture/   # Topic: Feature-based architecture
    │   ├── page.tsx                  # Architecture landing page + folder preview
    │   └── src/editor/               # Feature-local editor example
    │       ├── components/Editor.tsx # Local editor UI
    │       ├── hooks/useEditor.ts    # Feature-specific hook
    │       └── utils/index.ts        # Feature-local helpers
    ├── route-handlers/               # Topic: REST Route Handlers
    │   └── page.tsx                  # Interactive CRUD workspace console
    ├── api/
    │   └── exercises/
    │       ├── route.ts              # GET / POST endpoints
    │       └── [id]/
    │           └── route.ts          # GET / PUT / DELETE endpoints (RESTful [id] pattern)
    ├── layout.tsx                    # Layout with Navbar
    ├── page.tsx                      # Topic selector home
    └── globals.css                   # Theme system styling, animations, tokens
```

---

## 🚀 Getting Started

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Start the Development Server**:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the playground.
