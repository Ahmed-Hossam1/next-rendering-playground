"use client";

import Button from "@/components/Button";
import { cn } from "@/lib/cn";
import { useState } from "react";

/* ─── Section wrapper ─────────────────────────────────────── */
function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10 animate-in slide-up">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-foreground mb-1">{title}</h3>
        {description && (
          <p className="text-muted-foreground text-xs leading-relaxed">{description}</p>
        )}
        <div className="mt-3 h-px bg-linear-to-r from-primary/50 via-accent/30 to-transparent" />
      </div>
      {children}
    </div>
  );
}

/* ─── Code snippet block with Copy to Clipboard ──────────────────────────────────── */
function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code snippet", err);
    }
  }

  return (
    <div className="relative group/code mt-3">
      <pre className="glass rounded-xl p-4 overflow-x-auto text-xs text-muted-foreground font-mono leading-relaxed pr-10">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className={cn(
          "absolute right-2 top-2 p-1.5 rounded-lg border border-border bg-card/90 text-muted-foreground transition-all duration-200",
          "hover:bg-primary hover:text-white hover:border-primary hover:scale-105 active:scale-95",
          "opacity-0 group-hover/code:opacity-100 focus:opacity-100",
          "flex items-center justify-center cursor-pointer"
        )}
        title="Copy code"
      >
        {copied ? (
          <svg className="h-3.5 w-3.5 text-emerald-500 animate-in zoom-in" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
        )}
      </button>
    </div>
  );
}

/* ─── Component preview card ─────────────────────────────── */
function PreviewCard({
  label,
  children,
  code,
}: {
  label: string;
  children: React.ReactNode;
  code: string;
}) {
  return (
    <div className="glass rounded-2xl p-5 glass-hover flex flex-col justify-between">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
          {label}
        </p>
        <div className="flex flex-wrap gap-3 items-center min-h-[48px]">
          {children}
        </div>
      </div>
      <CodeBlock code={code} />
    </div>
  );
}

/* ─── Standard Icon ────────────────────────────────────────── */
const Icon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
};

/* ─── Main Component ──────────────────────────────────────── */
export default function Home() {
  const [asyncLoading, setAsyncLoading] = useState(false);

  // Playground/Sandbox States
  const [sbVariant, setSbVariant] = useState<"primary" | "outline" | "ghost" | "danger">("primary");
  const [sbSize, setSbSize] = useState<"sm" | "md" | "lg" | "icon">("md");
  const [sbRounded, setSbRounded] = useState<"none" | "sm" | "md" | "lg" | "full">("lg");
  const [sbIsLoading, setSbIsLoading] = useState(false);
  const [sbHasIcon, setSbHasIcon] = useState(false);
  const [sbIconPosition, setSbIconPosition] = useState<"left" | "right">("left");
  const [sbFullWidth, setSbFullWidth] = useState(false);
  const [sbText, setSbText] = useState("Interactive Button");

  async function handleDemoAction() {
    setAsyncLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } finally {
      setAsyncLoading(false);
    }
  }

  // Generates sandbox code dynamically
  function generateSandboxCode() {
    let codeStr = `<Button`;
    if (sbVariant !== "primary") codeStr += ` variant="${sbVariant}"`;
    if (sbSize !== "md") codeStr += ` size="${sbSize}"`;
    if (sbRounded !== "lg") codeStr += ` rounded="${sbRounded}"`;
    if (sbIsLoading) codeStr += ` isLoading`;
    if (sbFullWidth) codeStr += ` fullWidth`;

    if (sbSize === "icon") {
      codeStr += `>\n  <Icon />\n</Button>`;
    } else if (sbHasIcon) {
      codeStr += `>\n`;
      if (sbIconPosition === "left") {
        codeStr += `  <Icon />\n  ${sbText}\n`;
      } else {
        codeStr += `  ${sbText}\n  <Icon />\n`;
      }
      codeStr += `</Button>`;
    } else {
      codeStr += `>\n  ${sbText}\n</Button>`;
    }
    return codeStr;
  }

  return (
    <div className="min-h-screen px-6 py-12 max-w-6xl mx-auto flex flex-col gap-12">
      {/* ─── Hero Section ─── */}
      <section className="relative pt-12 pb-16 overflow-hidden">
        {/* Dotted Grid Background */}
        <div className="absolute inset-0 bg-grid mask-radial opacity-35 dark:opacity-20 pointer-events-none" />
        
        {/* Glowing backdrop blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] glow-radial mask-radial pointer-events-none" />

        <div className="relative text-center max-w-3xl mx-auto flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary mb-6 animate-in fade-in">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            Tailwind CSS v4 & Next.js 16 Ready
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-tight animate-in slide-up">
            The Next-Gen <br />
            <span className="gradient-text">Design System</span> Experience
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-8 animate-in slide-up" style={{ animationDelay: "100ms" }}>
            A meticulously crafted collection of responsive, themeable, and highly interactive components. Accelerate your web application development with style and confidence.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 items-center justify-center animate-in slide-up" style={{ animationDelay: "200ms" }}>
            <Button 
              variant="primary" 
              onClick={() => document.getElementById("sandbox")?.scrollIntoView({ behavior: "smooth" })}
              className="shadow-lg shadow-primary/25 cursor-pointer"
            >
              Try Sandbox
            </Button>
            <Button 
              variant="outline" 
              onClick={() => document.getElementById("components")?.scrollIntoView({ behavior: "smooth" })}
              className="cursor-pointer"
            >
              Explore Components
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Features Grid ─── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4">
        {/* Card 1 */}
        <div className="glass rounded-2xl p-6 glass-hover relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors" />
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-foreground mb-2">Performance First</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Optimized for speed and core web vitals. Styled with Tailwind CSS v4 to guarantee tiny CSS bundles and zero runtime overhead.
          </p>
        </div>

        {/* Card 2 */}
        <div className="glass rounded-2xl p-6 glass-hover relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-xl group-hover:bg-accent/10 transition-colors" />
          <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-foreground mb-2">Adaptive Theme System</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Full light and dark mode integration out of the box. Fluid transitions and persistent theme choices via next-themes.
          </p>
        </div>

        {/* Card 3 */}
        <div className="glass rounded-2xl p-6 glass-hover relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors" />
          <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-foreground mb-2">Developer Experience</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Strictly typed with TypeScript, built on Radix UI primitives, and packaged with detailed usage guides for rapid development.
          </p>
        </div>
      </section>

      {/* ─── Interactive Sandbox ─── */}
      <section id="sandbox" className="py-12 scroll-mt-20 border-t border-border/80">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Component Sandbox</h2>
          <p className="text-muted-foreground text-xs md:text-sm">
            Configure properties in real time to customize the button component. Copy the generated code block below with one click.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          {/* Live Preview Panel */}
          <div className="lg:col-span-3 glass rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden min-h-[350px]">
            {/* Decorative gradient blob */}
            <div className="absolute -right-16 -top-16 w-36 h-36 rounded-full bg-primary/10 blur-2xl" />
            <div className="absolute -left-16 -bottom-16 w-36 h-36 rounded-full bg-accent/10 blur-2xl" />
            
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4 z-10">
              Live Preview
            </div>
            
            <div className="flex-1 flex items-center justify-center p-8 z-10">
              <Button
                variant={sbVariant}
                size={sbSize}
                rounded={sbRounded}
                isLoading={sbIsLoading}
                fullWidth={sbFullWidth}
              >
                {!sbIsLoading && sbHasIcon && sbIconPosition === "left" && sbSize !== "icon" && <Icon />}
                {sbSize !== "icon" ? sbText : <Icon />}
                {!sbIsLoading && sbHasIcon && sbIconPosition === "right" && sbSize !== "icon" && <Icon />}
              </Button>
            </div>
            
            {/* Code snippet shown under the preview */}
            <div className="z-10 mt-6 pt-4 border-t border-border/50">
              <p className="text-[10px] font-bold text-muted-foreground mb-1 uppercase tracking-widest">Generated Code</p>
              <CodeBlock code={generateSandboxCode()} />
            </div>
          </div>

          {/* Controls Panel */}
          <div className="lg:col-span-2 glass rounded-3xl p-6 md:p-8 flex flex-col gap-5 z-10 justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
                Configure Properties
              </div>
              
              <div className="flex flex-col gap-4">
                {/* Text input */}
                {sbSize !== "icon" && (
                  <div>
                    <label className="block text-2xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">Button Text</label>
                    <input 
                      type="text" 
                      value={sbText} 
                      onChange={(e) => setSbText(e.target.value)}
                      className="w-full h-9 px-3 bg-muted/30 border border-border rounded-xl text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:bg-muted/70 transition-all"
                    />
                  </div>
                )}
                
                {/* Variant */}
                <div>
                  <label className="block text-2xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">Variant</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["primary", "outline", "ghost", "danger"] as const).map((v) => (
                      <button
                        key={v}
                        onClick={() => setSbVariant(v)}
                        className={cn(
                          "h-8 text-xs font-semibold rounded-lg border transition-all cursor-pointer",
                          sbVariant === v 
                            ? "bg-primary text-white border-primary shadow-xs shadow-primary/20" 
                            : "bg-muted/10 text-muted-foreground border-border hover:bg-muted/30 hover:text-foreground"
                        )}
                      >
                        {v.charAt(0).toUpperCase() + v.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div>
                  <label className="block text-2xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">Size</label>
                  <div className="grid grid-cols-4 gap-2">
                    {(["sm", "md", "lg", "icon"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setSbSize(s)}
                        className={cn(
                          "h-8 text-xs font-semibold rounded-lg border transition-all cursor-pointer",
                          sbSize === s 
                            ? "bg-primary text-white border-primary shadow-xs" 
                            : "bg-muted/10 text-muted-foreground border-border hover:bg-muted/30 hover:text-foreground"
                        )}
                      >
                        {s.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rounded */}
                <div>
                  <label className="block text-2xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">Rounded Corners</label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {(["none", "sm", "md", "lg", "full"] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => setSbRounded(r)}
                        className={cn(
                          "h-8 text-[11px] font-semibold rounded-lg border transition-all cursor-pointer",
                          sbRounded === r 
                            ? "bg-primary text-white border-primary shadow-xs" 
                            : "bg-muted/10 text-muted-foreground border-border hover:bg-muted/30 hover:text-foreground"
                        )}
                      >
                        {r.charAt(0).toUpperCase() + r.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Toggles */}
            <div className="flex flex-col gap-3 pt-4 border-t border-border/50 mt-4">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  Loading Spinner
                </span>
                <input 
                  type="checkbox" 
                  checked={sbIsLoading} 
                  onChange={(e) => setSbIsLoading(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary h-4 w-4 bg-muted"
                />
              </label>

              {sbSize !== "icon" && (
                <>
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      Include Icon
                    </span>
                    <input 
                      type="checkbox" 
                      checked={sbHasIcon} 
                      onChange={(e) => setSbHasIcon(e.target.checked)}
                      className="rounded border-border text-primary focus:ring-primary h-4 w-4 bg-muted"
                    />
                  </label>

                  {sbHasIcon && (
                    <div className="flex items-center justify-between pl-4">
                      <span className="text-2xs text-muted-foreground font-semibold uppercase tracking-wider">Icon Position</span>
                      <div className="flex rounded-lg bg-muted/40 p-0.5 border border-border">
                        <button
                          onClick={() => setSbIconPosition("left")}
                          className={cn(
                            "px-2.5 py-1 text-[10px] font-semibold rounded-md transition-colors cursor-pointer",
                            sbIconPosition === "left" ? "bg-card text-foreground shadow-2xs" : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          Left
                        </button>
                        <button
                          onClick={() => setSbIconPosition("right")}
                          className={cn(
                            "px-2.5 py-1 text-[10px] font-semibold rounded-md transition-colors cursor-pointer",
                            sbIconPosition === "right" ? "bg-card text-foreground shadow-2xs" : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          Right
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  Full Width
                </span>
                <input 
                  type="checkbox" 
                  checked={sbFullWidth} 
                  onChange={(e) => setSbFullWidth(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary h-4 w-4 bg-muted"
                />
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Component Gallery ─── */}
      <section id="components" className="pt-12 pb-16 scroll-mt-20 border-t border-border/80">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Component Gallery</h2>
          <p className="text-muted-foreground text-xs md:text-sm">
            A comprehensive overview of pre-configured variants, dimensions, status modes, and layouts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Colors showcase */}
          <Section title="Color Variations" description="Different functional button types to match brand color schemes.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PreviewCard
                label="Primary"
                code={`<Button variant="primary">Primary Accent</Button>`}
              >
                <Button>Primary Accent</Button>
              </PreviewCard>

              <PreviewCard
                label="Outline"
                code={`<Button variant="outline">Secondary Border</Button>`}
              >
                <Button variant="outline">Secondary Border</Button>
              </PreviewCard>

              <PreviewCard
                label="Ghost"
                code={`<Button variant="ghost">Minimal Action</Button>`}
              >
                <Button variant="ghost">Minimal Action</Button>
              </PreviewCard>

              <PreviewCard
                label="Danger"
                code={`<Button variant="danger">Destructive Action</Button>`}
              >
                <Button variant="danger">Destructive Action</Button>
              </PreviewCard>
            </div>
          </Section>

          {/* Sizes showcase */}
          <Section title="Dimensions & Sizing" description="Prepackaged button sizing configurations including full block widths.">
            <div className="flex flex-col gap-4">
              <PreviewCard
                label="Fixed Height Variations"
                code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
              >
                <Button variant="primary" size="sm">
                  Small
                </Button>
                <Button variant="primary" size="md">
                  Medium
                </Button>
                <Button variant="primary" size="lg">
                  Large
                </Button>
              </PreviewCard>

              <PreviewCard
                label="Full Width Block Layout"
                code={`<Button fullWidth>Block Button</Button>`}
              >
                <Button variant="primary" fullWidth>
                  Block Button
                </Button>
              </PreviewCard>
            </div>
          </Section>

          {/* State indicators showcase */}
          <Section title="State Indicators" description="Interactive components showing background tasks or loader feedback.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PreviewCard
                label="Processing / Loading"
                code={`<Button isLoading>Loading...</Button>`}
              >
                <Button variant="primary" isLoading>
                  Loading...
                </Button>
              </PreviewCard>

              <PreviewCard
                label="Dynamic Async Action"
                code={`const [loading, setLoading] = useState(false);
<Button isLoading={loading} onClick={asyncAction}>
  {loading ? "Processing..." : "Click to Load"}
</Button>`}
              >
                <Button isLoading={asyncLoading} onClick={handleDemoAction}>
                  {asyncLoading ? "Processing..." : "Click to Load"}
                </Button>
              </PreviewCard>
            </div>
          </Section>

          {/* Icon integrations showcase */}
          <Section title="Icon Integrations" description="Supports preceding, succeeding, and standalone icon-only layouts.">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PreviewCard
                  label="Preceding Icon (Prefix)"
                  code={`<Button><Icon /> Add New</Button>`}
                >
                  <Button variant="primary">
                    <Icon />
                    Add New
                  </Button>
                </PreviewCard>

                <PreviewCard
                  label="Succeeding Icon (Suffix)"
                  code={`<Button>Add New <Icon /></Button>`}
                >
                  <Button variant="primary">
                    Add New
                    <Icon />
                  </Button>
                </PreviewCard>
              </div>

              <PreviewCard
                label="Standalone Square Icon"
                code={`<Button size="icon"><Icon /></Button>`}
              >
                <Button variant="primary" size="icon">
                  <Icon />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon />
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon />
                </Button>
                <Button variant="danger" size="icon">
                  <Icon />
                </Button>
              </PreviewCard>
            </div>
          </Section>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="mt-16 pt-8 pb-6 border-t border-border/60 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div>
          &copy; {new Date().getFullYear()} Ahmed Hossam. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-foreground transition-colors">Documentation</a>
          <a href="#" className="hover:text-foreground transition-colors">Components</a>
          <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
        </div>
      </footer>
    </div>
  );
}
