"use client";
import Button from "@/components/Button";
import Link from "next/link";
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
    <section className="mb-16 animate-in slide-up">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-1">{title}</h2>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
        <div className="mt-3 h-px bg-linear-to-r from-primary/50 via-accent/30 to-transparent" />
      </div>
      {children}
    </section>
  );
}

/* ─── Code snippet block ──────────────────────────────────── */
function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="glass rounded-xl p-4 mt-4 overflow-x-auto text-sm text-muted-foreground font-mono leading-relaxed">
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
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        {label}
      </p>
      <div className="flex flex-wrap gap-3 items-center">{children}</div>
      <CodeBlock code={code} />
    </div>
  );
}

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
      aria-hidden="true"
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
};
/* ─── Page ────────────────────────────────────────────────── */
export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Logged in");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen px-6 py-12 max-w-6xl mx-auto">
      <Section title="Buttons" description="All button variants and sizes">
        <div className="grid gap-4">
          <PreviewCard
            label="Variants"
            code={`<Button variant="primary">Primary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button variant="danger" asChild>
  <Link href="/dashboard">Link</Link>
</Button>`}
          >
            <Button variant="primary" rounded="full">
              <Icon />
              Primary
            </Button>
            <Button variant="ghost" aria-label="plus Icon">
              Icon
              <Icon />
            </Button>

            <Button size="icon" variant="danger" rounded="full">
              <Icon />
            </Button>

            <Button variant="outline">Outline</Button>

            <Button variant="ghost">Ghost</Button>

            <Button
              variant="danger"
              isLoading={isLoading}
              onClick={handleLogin}
            >
              Danger
            </Button>

            <Button variant="primary">
              <Link href="/dashboard">Link</Link>
            </Button>
          </PreviewCard>
          {/* 
          <PreviewCard
            label="Sizes"
            code={`<Button size="sm">Small</Button>\n<Button size="md">Medium</Button>\n<Button size="lg">Large</Button>`}
          >
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </PreviewCard>

          <PreviewCard
            label="Loading state"
            code={`<Button loading>Loading…</Button>`}
          >
            <Button>Loading…</Button>
          </PreviewCard> */}
        </div>
      </Section>
    </div>
  );
}
