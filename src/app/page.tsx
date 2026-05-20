import Button, { buttonVariants } from "@/components/Button";
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
        <h2 className="text-2xl font-bold text-foreground mb-1">{title}</h2>
        {description && <p className="text-muted-foreground text-sm">{description}</p>}
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

/* ─── Page ────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="min-h-screen px-6 py-12 max-w-6xl mx-auto">
      <Section title="Buttons" description="All button variants and sizes">
        <div className="grid gap-4">
          <PreviewCard
            label="Variants"
            code={`<Button variant="primary">Primary</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="danger">Danger</Button>`}
          >
            <Button variant="primary" rounded="full">Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Link href={""} className={`${buttonVariants()} h-12` } >Link</Link>
          </PreviewCard>

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
            <Button loading>Loading…</Button>
          </PreviewCard>
        </div>
      </Section>
    </div>
  );
}
