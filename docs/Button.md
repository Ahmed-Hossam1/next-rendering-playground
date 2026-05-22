# Button Component

The `Button` component is a core building block of the design system. It is designed to trigger actions, forms, navigation, and modal states. 

It is built with React, styled with **Tailwind CSS v4** via `class-variance-authority` (cva), and implements polymorphic composition using **Radix UI's Slot** (`asChild`).

---

## Table of Contents
1. [Description](#description)
2. [Props Reference](#props-reference)
3. [Usage Guides](#usage-guides)
4. [Accessibility Notes](#accessibility-notes)
5. [Do's and Don'ts](#dos-and-donts)

---

## Description

The `Button` component provides a standard interactive control with support for loading states, prefix/suffix icons, custom rounding, full-width layouts, and polymorphism.

### Core Features:
- **Variant Management**: Controlled using `class-variance-authority` (CVA) for clean separation of concerns and class combinations.
- **Polymorphism**: Uses `@radix-ui/react-slot` (`asChild` pattern) so the button can seamlessly transform into other interactive components (e.g., Next.js `<Link>`) while retaining the exact same styles.
- **Theme Adaptation**: Out-of-the-box styling support for both light and dark mode, using design tokens (`var(--primary)`, `var(--border)`, etc.) configured via Tailwind CSS v4's `@theme inline`.
- **Loading State**: Automatically renders a spinner icon, disables user interaction, and sets correct accessibility attributes.

---

## Props Reference

The component extends all standard HTML button attributes (`React.ButtonHTMLAttributes<HTMLButtonElement>`) as well as the variants defined below:

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **`variant`** | `"primary"` \| `"outline"` \| `"ghost"` \| `"danger"` | `"primary"` | The visual accent style of the button. |
| **`size`** | `"sm"` \| `"md"` \| `"lg"` \| `"icon"` | `"md"` | The size (height, padding, and text-size) of the button. Use `"icon"` for standalone icon actions. |
| **`rounded`** | `"none"` \| `"sm"` \| `"md"` \| `"lg"` \| `"full"` | `"lg"` | The border-radius corner styling of the button. |
| **`isLoading`** | `boolean` | `false` | When `true`, shows a spin loader, disables click/focus actions, and adds `aria-busy="true"`. |
| **`asChild`** | `boolean` | `false` | Renders the component as its child element instead of a `<button>`, passing through all classes and props. |
| **`fullWidth`** | `boolean` | `false` | Sets width to 100% (`w-full`) to fill parent layout constraints. |

---

## Usage Guides

### 1. Basic Usage
Use the default button with simple text content:
```tsx
import Button from "@/components/Button";

export default function Example() {
  return (
    <Button onClick={() => console.log("Clicked!")}>
      Get Started
    </Button>
  );
}
```

### 2. Variants & Styles
Choose different variants depending on visual hierarchy:
```tsx
<Button variant="primary">Primary Action</Button>
<Button variant="outline">Secondary Border</Button>
<Button variant="ghost">Subtle Action</Button>
<Button variant="danger">Destructive Action</Button>
```

### 3. Sizes and Corner Radius
Customize height, font-size, and rounding parameters:
```tsx
// Sizing
<Button size="sm">Small Action</Button>
<Button size="md">Medium Action</Button>
<Button size="lg">Large Action</Button>

// Rounding
<Button rounded="none">Sharp Edges</Button>
<Button rounded="full">Pill Button</Button>
```

### 4. Dynamic Loading State
Perfect for asynchronous forms, API calls, or server actions. When `isLoading` is active, a spinner is appended and interaction is locked:
```tsx
import { useState } from "react";
import Button from "@/components/Button";

export default function SubmitForm() {
  const [submitting, setSubmitting] = useState(false);

  const handleAction = async () => {
    setSubmitting(true);
    await fetch("/api/submit", { method: "POST" });
    setSubmitting(false);
  };

  return (
    <Button isLoading={submitting} onClick={handleAction}>
      {submitting ? "Submitting..." : "Save Changes"}
    </Button>
  );
}
```

### 5. Integrating Icons
Add icons inside the button element. Built-in styles handle spacing and sizing automatically:
```tsx
import Button from "@/components/Button";
import { PlusIcon, ArrowRightIcon } from "@heroicons/react/20/solid";

// Prefix Icon
<Button>
  <PlusIcon />
  Create Project
</Button>

// Suffix Icon
<Button>
  Next Step
  <ArrowRightIcon />
</Button>

// Icon-Only (Square Aspect Ratio)
<Button size="icon" aria-label="Search Settings">
  <svg className="h-4 w-4" /* ... */ />
</Button>
```

### 6. Polymorphic Composition (`asChild`)
Use `asChild` to render a different tag or client router link (like Next.js Link) while preserving button visual aesthetics and styling tokens. This avoids nesting `<a>` inside `<button>`, which is invalid HTML:
```tsx
import Button from "@/components/Button";
import Link from "next/link";

export default function Navigation() {
  return (
    <Button asChild variant="outline">
      <Link href="/dashboard">
        Go to Dashboard
      </Link>
    </Button>
  );
}
```

---

## Accessibility Notes

To ensure high accessibility compliance (WCAG standards), keep the following in mind:

- **Keyboard Navigation**: The button is fully focusable via standard browser tab navigation. It features custom-designed visual focus styles to support keyboard-only users:
  - Focus Ring: `focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none`
- **Aria Attributes**:
  - The `isLoading` state automatically injects `aria-busy="true"` so screen readers inform the user that a process is running.
  - When `isLoading` or `disabled` props are active, the element receives a native `disabled` attribute, which removes it from keyboard focus and updates browser accessibility APIs.
- **Icon-Only Buttons**:
  - Whenever you use `size="icon"`, you **must** supply a clear, readable `aria-label` or `aria-labelledby` property. Otherwise, screen reader users will only hear "button" with no functional description.
  - Custom SVG icons include `aria-hidden="true"` by default (like `[&_svg]:pointer-events-none`) to prevent screen readers from reading raw SVG graphics text.

---

## Do's and Don'ts

### Do
- [x] **DO** use the `asChild` prop when wrapping routing links (e.g., Next.js `<Link>`). It renders clean, semantic HTML.
- [x] **DO** specify a descriptive `aria-label` for icon-only buttons (e.g., `aria-label="Add to cart"` instead of just `<Button size="icon"><PlusIcon /></Button>`).
- [x] **DO** leverage standard HTML attributes like `type="submit"` when using the button inside a `<form>` element.
- [x] **DO** use secondary variants like `"outline"` or `"ghost"` to build secondary actions alongside primary buttons, establishing a clear visual hierarchy.

### Don't
- [x] **DON'T** wrap a standard `<Link>` inside a `<Button>` without using `asChild`. This results in nested interactive tags (`<button><a>...</a></button>`), which violates HTML validity specifications.
- [x] **DON'T** manually insert custom SVG styling classes for dimensions (like `h-5 w-5`) if you want the default sizes. The button's CVA automatically sizes SVGs with `[&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0`.
- [x] **DON'T** add custom loading text next to a spinner in a small-width component where layout truncation or layout shift might occur. Keep loading actions clean and compact.
- [x] **DON'T** override active border states unless necessary, as the focus rings are designed to be highly visible for users with low vision or motor impairments.
