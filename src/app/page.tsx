import Button from "@/components/Button";
import Link from "next/link";

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
    <section className="mb-16 animate-in slide-up">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-zinc-100 mb-1">{title}</h2>
        {description && (
          <p className="text-zinc-400 text-sm">{description}</p>
        )}
        <div className="mt-3 h-px bg-gradient-to-r from-blue-500/50 via-violet-500/30 to-transparent" />
      </div>
      {children}
    </section>
  );
}

/* ─── Code snippet block ──────────────────────────────────── */
function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="glass rounded-xl p-4 mt-4 overflow-x-auto text-sm text-zinc-300 font-mono leading-relaxed">
      <code>{code}</code>
    </pre>
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
    <div className="glass rounded-2xl p-6 glass-hover">
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
        {label}
      </p>
      <div className="flex flex-wrap gap-3 items-center">{children}</div>
      <CodeBlock code={code} />
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-bold text-lg gradient-text">Aura UI</span>
          <div className="flex items-center gap-4 text-sm text-zinc-400">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-100 transition-colors"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-20">
        {/* Hero */}
        <header className="mb-24 text-center animate-in fade-in">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-zinc-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Open Source · Next.js 16 · Tailwind v4
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-5 gradient-text">
            Design System
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-8">
            A premium glassmorphism design system built for Next.js. Dark by
            default, animated by nature.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">
              View on GitHub ↗
            </Button>
          </div>
        </header>

        {/* ── Button: Variants ─────────────────────────────── */}
        <Section
          title="Button"
          description="Four semantic variants — primary, outline, ghost, and danger."
        >
          <div className="grid md:grid-cols-2 gap-6">
            <PreviewCard
              label="Variants"
              code={`<Button variant="primary">Primary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`}
            >
              <Button variant="primary">Primary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </PreviewCard>

            <PreviewCard
              label="Sizes"
              code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
            >
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </PreviewCard>

            <PreviewCard
              label="Loading state"
              code={`<Button loading>Saving…</Button>
<Button variant="outline" loading>Loading</Button>`}
            >
              <Button loading>Saving…</Button>
              <Button variant="outline" loading>
                Loading
              </Button>
            </PreviewCard>

            <PreviewCard
              label="Full width"
              code={`<Button fullWidth>Full Width Button</Button>`}
            >
              <Button fullWidth>Full Width Button</Button>
            </PreviewCard>
          </div>
        </Section>

        {/* ── Color tokens ─────────────────────────────────── */}
        <Section
          title="Color Tokens"
          description="CSS variables that power the entire system."
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { name: "--background", hex: "#09090b", cls: "bg-zinc-950" },
              { name: "--card", hex: "#18181b", cls: "bg-zinc-900" },
              { name: "--border", hex: "#27272a", cls: "bg-zinc-800" },
              { name: "--primary", hex: "#3b82f6", cls: "bg-blue-500" },
              { name: "--accent", hex: "#8b5cf6", cls: "bg-violet-500" },
            ].map((token) => (
              <div key={token.name} className="glass rounded-xl p-4 space-y-3">
                <div
                  className={`h-12 rounded-lg ${token.cls} border border-white/10`}
                />
                <div>
                  <p className="text-xs font-mono text-zinc-300">{token.name}</p>
                  <p className="text-xs text-zinc-500">{token.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Glassmorphism utilities ───────────────────────── */}
        <Section
          title="Glass Utilities"
          description="Reusable CSS utility classes for the glassmorphism aesthetic."
        >
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                cls: "glass",
                label: ".glass",
                desc: "Blurred, semi-transparent panel",
              },
              {
                cls: "glass glass-hover",
                label: ".glass-hover",
                desc: "Interactive lift on hover",
              },
              {
                cls: "gradient-text text-2xl font-bold",
                label: ".gradient-text",
                desc: "Blue → violet gradient text",
              },
            ].map((u) => (
              <div
                key={u.cls}
                className="glass rounded-2xl p-6 flex flex-col gap-3 glass-hover"
              >
                <div className={`${u.cls} rounded-lg p-4 text-center`}>
                  {u.label === ".gradient-text" ? (
                    <span className="gradient-text text-xl font-bold">
                      Gradient Text
                    </span>
                  ) : (
                    <span className="text-zinc-300 text-sm font-mono">
                      {u.label}
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-400">{u.desc}</p>
                <CodeBlock code={u.cls} />
              </div>
            ))}
          </div>
        </Section>

        {/* ── Animations ───────────────────────────────────── */}
        <Section
          title="Animations"
          description="Compose animate-in with fade-in, zoom-in, or slide-up."
        >
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "fade-in", desc: "Opacity 0 → 1" },
              { name: "zoom-in", desc: "Scale 0.95 + fade" },
              { name: "slide-up", desc: "Y+20px + fade" },
            ].map((anim) => (
              <div key={anim.name} className="glass rounded-2xl p-6 glass-hover">
                <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">
                  {anim.desc}
                </p>
                <div
                  className={`glass rounded-xl p-4 text-center animate-in ${anim.name}`}
                >
                  <span className="font-mono text-sm text-zinc-300">
                    .{anim.name}
                  </span>
                </div>
                <CodeBlock
                  code={`<div className="animate-in ${anim.name}">\n  …\n</div>`}
                />
              </div>
            ))}
          </div>
        </Section>

        {/* ── Footer ───────────────────────────────────────── */}
        <footer className="mt-24 border-t border-white/5 pt-10 text-center text-zinc-500 text-sm">
          <p className="gradient-text inline font-semibold text-base">
            Aura UI
          </p>
          <p className="mt-1">
            Built with Next.js 16 · Tailwind CSS v4 · class-variance-authority
          </p>
        </footer>
      </main>
    </div>
  );
}
