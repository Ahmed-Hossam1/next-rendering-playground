# Next-Gen Design System Experience (Next.js 16 + Tailwind CSS v4)

A premium, interactive design system showcase built using **Next.js 16 (App Router)** and **Tailwind CSS v4**. This repository serves as a workspace for training, demonstrating, and documenting modern component architectures, fluid theme adaptations, and production-ready component practices.

---

## ✨ Features

- **🚀 Modern Tech Stack**: Powered by Next.js 16, React 19, and the lightning-fast Tailwind CSS v4.
- **🎨 Design Token System**: Fully configured CSS variables in `@layer base` supporting smooth transition transitions between light and dark modes (powered by `next-themes`).
- **⚙️ Dynamic Component Sandbox**: A live, interactive playground where developers can customize components (adjusting variant, size, rounded corners, icons, and loading states) and instantly copy the dynamically generated JSX code.
- **💎 Premium glassmorphism UI**: High-end visual assets, custom blurs, animated border gradients, and grid overlays that look stunning in both light and dark themes.
- **🛠️ Type-Safe & Polymorphic Components**: Component interfaces designed for extensibility, clean variant configurations via `class-variance-authority` (cva), and Radix UI Slot composition (`asChild`).

---

## 🏗️ Project Directory Structure

```text
practice/
├── docs/
│   └── Button.md        # Detailed developer guide for the Button component
├── public/              # Static assets and icons
└── src/
    ├── app/
    │   ├── globals.css  # Core styling, custom keyframe animations, and Tailwind v4 theme mappings
    │   ├── layout.tsx   # Root layout with provider setup (Theme providers)
    │   └── page.tsx     # The interactive Design System landing page & playground
    ├── components/
    │   ├── Button.tsx   # Standard polymorphic Button component
    │   ├── Navbar.tsx   # Global site header with theme switcher integration
    │   └── ThemeChanger.tsx # Smooth-transition Theme Toggle (Sun/Moon icons)
    ├── lib/
    │   └── cn.tsx       # Classnames merging utility (clsx + tailwind-merge)
    └── providers/       # Global React context providers (e.g. ThemeProvider)
```

---

## 🛠️ Design System Theme Architecture

Theme tokens are configured inside [src/app/globals.css](file:///d:/coding/Next%20Js/practice/src/app/globals.css) and exposed to Tailwind CSS v4 using the new inline configuration `@theme inline`:

- **Light Mode (`:root`)**: Vibrant blues, soft zinc outlines, and clean white cards over a neutral light background.
- **Dark Mode (`.dark`)**: Deep charcoal shades, glowing primary borders, and sleek glassmorphism panels.

All custom colors (such as `--primary`, `--border`, and `--muted`) can be accessed using standard utility classes (e.g., `bg-primary`, `border-border`, `text-muted-foreground`).

---

## 📚 Component Documentation

Detailed API specifications, accessibility recommendations, and Do/Don't guides are maintained in the `docs/` folder:

- 📑 [Button Component Developer Guide](file:///d:/coding/Next%20Js/practice/docs/Button.md)

---

## 🚀 Getting Started

Follow these steps to run the interactive playground locally:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```

3. **Explore the Design System**:
   Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the sandbox and browse the component gallery.

---

Created with ❤️ by Antigravity AI
