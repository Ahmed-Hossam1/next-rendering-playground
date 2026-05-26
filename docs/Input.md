# Input Component

The `Input` component is a high-fidelity text input element designed to capture user text input. It features support for labels, helper texts, validation states (success/error), custom roundings, dimension scaling, and prefix/suffix icon slots.

It is built with React, styled with **Tailwind CSS v4** via `class-variance-authority` (cva), and implements forwardRef to allow seamless form library integration (e.g., React Hook Form).

---

## Table of Contents
1. [Description](#description)
2. [Props Reference](#props-reference)
3. [Usage Guides](#usage-guides)
4. [Accessibility Notes](#accessibility-notes)
5. [Do's and Don'ts](#dos-and-donts)

---

## Description

The `Input` component provides a standard interactive text input control with styled containers, message feedbacks, and accessibility structures out of the box.

### Core Features:
- **Variant Management**: Controlled using `class-variance-authority` (CVA) for outline, filled, and ghost borders.
- **Icon Slots**: Fully-positioned left and right icon containers with automated spacing and sizing styles.
- **Validation feedback**: Embedded support for helper text, validation errors, and success states with corresponding color tokens.
- **Accessibility Integration**: Utilizes `React.useId()` to ensure robust connection between label, input element, helper texts, and error messages.
- **Form Libraries Ready**: Built with `React.forwardRef` to pass referencing hooks to libraries such as Formik or React Hook Form.

---

## Props Reference

The component extends all standard HTML input attributes (`React.InputHTMLAttributes<HTMLInputElement>`) as well as the custom properties defined below:

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **`variant`** | `"outline"` \| `"filled"` \| `"ghost"` | `"outline"` | The visual accent border styling of the input container. |
| **`Size`** | `"sm"` \| `"md"` \| `"lg"` | `"md"` | The size (height, spacing, and font sizes) of the input container. |
| **`rounded`** | `"none"` \| `"sm"` \| `"md"` \| `"lg"` \| `"full"` | `"lg"` | The border-radius corner styling of the input container. |
| **`Disabled`** | `boolean` | `false` | Sets the HTML disabled state and applies disabled visual styles. |
| **`fullWidth`** | `boolean` | `false` | Sets width of the container to 100% (`w-full`). |
| **`label`** | `string` | — | An optional label displayed above the input. |
| **`helperText`** | `string` | — | Text containing supplementary instruction or tips displayed below the input. |
| **`errorText`** | `string` | — | Validation error message displayed below the input in destructive/danger styling. |
| **`successText`** | `string` | — | Success confirmation message displayed below the input in success/emerald styling. |
| **`leftIcon`** | `React.ReactNode` | — | An optional prefix icon positioned inside the left boundary of the input. |
| **`rightIcon`** | `React.ReactNode` | — | An optional suffix icon positioned inside the right boundary of the input. |

---

## Usage Guides

### 1. Basic Usage
Use the default outline text input:
```tsx
import Input from "@/components/Input";

export default function Example() {
  return (
    <Input
      label="Username"
      placeholder="Enter your username"
      onChange={(e) => console.log(e.target.value)}
    />
  );
}
```

### 2. Variants and Rounding
Select between Outline, Filled, and Ghost variants, and apply corner radius configurations:
```tsx
// Variants
<Input variant="outline" label="Outline variant (default)" />
<Input variant="filled" label="Filled variant" />
<Input variant="ghost" label="Ghost variant" />

// Rounding
<Input rounded="none" placeholder="Sharp edges" />
<Input rounded="lg" placeholder="Large rounding" />
<Input rounded="full" placeholder="Fully pill shape" />
```

### 3. Sizes
Scale input dimensions based on layout density requirements:
```tsx
<Input Size="sm" placeholder="Small size input" />
<Input Size="md" placeholder="Medium size input" />
<Input Size="lg" placeholder="Large size input" />
```

### 4. Integration with Prefix / Suffix Icons
Insert visual icon guides into prefix (`leftIcon`) or suffix (`rightIcon`) slots:
```tsx
import Input from "@/components/Input";
import { MagnifyingGlassIcon, EnvelopeIcon } from "@heroicons/react/20/solid";

// Prefix Search Icon
<Input
  leftIcon={<MagnifyingGlassIcon />}
  placeholder="Search files..."
/>

// Suffix Mail Icon
<Input
  rightIcon={<EnvelopeIcon />}
  placeholder="user@domain.com"
/>
```

### 5. Validation Feedback States
Render clear visual feedback messages with error or success statuses:
```tsx
// Helper description
<Input
  label="Password"
  type="password"
  helperText="Password must be at least 8 characters long."
/>

// Validation Error
<Input
  label="Email Address"
  errorText="Please enter a valid email address."
  placeholder="user@domain"
/>

// Success State
<Input
  label="Referral Code"
  successText="Code verified successfully!"
  placeholder="DISCOUNT100"
/>
```

---

## Accessibility Notes

To comply with the Web Content Accessibility Guidelines (WCAG), the Input component incorporates the following accessibility features:

- **Id Management**: The component utilizes `React.useId()` to generate a unique element ID. This ID is automatically linked between the `<label>` and the `<input>` element.
- **Aria Descriptive References**:
  - When `errorText` is provided, the input receives `aria-invalid="true"` and an `aria-describedby` reference linking to the error text element.
  - When `successText` or `helperText` are provided, the input receives an `aria-describedby` attribute pointing to the respective descriptive elements.
- **Keyboard Interaction**: Fully navigable and focusable via mouse click, touch tap, and keyboard tab. High-contrast focus outlines ensure readability during keyboard navigation.
- **Disabled Semantics**: When the `Disabled` prop is active, the input receives a native `disabled` attribute, notifying assistive tech and preventing clicks, focusing, or input events.

---

## Do's and Don'ts

### Do
- [x] **DO** use the `leftIcon` slot for search controls or filters to give users an immediate visual anchor.
- [x] **DO** combine `errorText` or `successText` to provide instant feedback as users type or when they submit forms.
- [x] **DO** always use the `label` prop or supply an `aria-label` attribute if the visual label is hidden in the design.
- [x] **DO** pass an input `type` matching the content type (e.g. `type="password"`, `type="email"`, `type="number"`) to improve mobile keyboard integration.

### Don't
- [x] **DON'T** use the helperText or errorText to convey vital information that cannot be read by screen readers without aria references.
- [x] **DON'T** override container styles with custom paddings that break icon alignments, as prefix/suffix padding sizes are managed internally.
- [x] **DON'T** leave placeholder texts to stand as visual labels. Placeholders disappear once input is entered, making form checking difficult.
- [x] **DON'T** pass interactive elements (like clickable buttons or dropdowns) inside the icon slots without configuring keyboard traps and manual aria descriptors.
