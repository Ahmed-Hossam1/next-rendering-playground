# Next.js 16+ Intercepting & Parallel Routes Demo

A premium, high-performance demonstration of **Next.js 16+** advanced routing patterns. This project showcases how to create seamless "Modal-over-List" experiences using Intercepting Routes and Parallel Routes with a modern, glassmorphic UI.

## ✨ Key Features

- **🚀 Intercepting Routes (`(.)[slug]`)**: Navigate from the blog list to a specific post and see a quick-preview modal without losing your place in the list.
- **🎨 Parallel Routes (`@modal`)**: Render modal content simultaneously with the main page content in a clean, decoupled folder structure.
- **💎 Premium UI/UX**: 
  - Glassmorphism design with backdrop blurs.
  - Smooth fade and scale entry animations.
  - Vibrant gradients using **Tailwind CSS 4**.
  - Fully responsive and dark-mode optimized.
- **🛠️ Advanced Interactivity**:
  - Modal closing via Backdrop click and Escape key.
  - "Break-out" navigation: Seamlessly transition from a modal preview to a full-page view.
  - Type-safe implementation with TypeScript.

## 🏗️ Project Structure

The project follows the standard Next.js App Router convention:

```text
src/app/
├── blogs/
│   ├── [slug]/       # Full page view for blog posts
│   ├── @modal/       # Parallel route slot for modals
│   │   ├── (.)[slug]/ # Intercepted route matching blogs/[slug]
│   │   └── default.tsx # Null fallback for the modal slot
│   ├── layout.tsx    # Renders {children} and {modal}
│   └── page.tsx      # Main blog listing page
└── globals.css       # Custom design system & animations
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 16+](https://nextjs.org/)

## 🧠 Core Concepts

This project is built based on the official [Next.js Routing Documentation](https://nextjs.org/docs/app/building-your-application/routing).

### 🛣️ Parallel Routes
Parallel Routes allow you to simultaneously or conditionally render one or more pages in the same layout. In this project, the `@modal` slot is a **Parallel Route**.
- **Slots**: Defined by folders starting with `@` (e.g., `@modal`).
- **Usage**: They are passed as props to the shared `layout.tsx`.
- **Benefits**: Perfect for complex dashboards or modals that need to maintain state while the URL changes.
- 📖 [Learn more about Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)

### ⚡ Intercepting Routes
Intercepting routes allow you to load a route from another part of your application within the current layout. This project uses the `(.)` convention.
- **Conventions**:
  - `(.)`: Matches segments on the **same level**.
  - `(..)`: Matches segments **one level above**.
  - `(...)`: Matches segments from the **root** app directory.
- **The "Modal" Pattern**: When you click a blog link, Next.js **intercepts** the navigation and shows the content in the `@modal` slot instead of performing a full page transition.
- 📖 [Learn more about Intercepting Routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: Heroicons / SVG
- **Language**: TypeScript

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Visit the app**:
   Open [http://localhost:3000](http://localhost:3000) and click **"Go to Blogs"**.

## 📝 Important Notes

- **Interception Logic**: Interception only happens during **soft navigation** (using `<Link>`). Direct URL entry or page refreshes will correctly trigger the full-page view.
- **Breaking out of Modals**: To view the full page from a modal, the "Read Full Article" button uses a standard `<a>` tag to force a hard navigation, bypassing the interception logic as intended.

---
Created with ❤️ by Antigravity AI
