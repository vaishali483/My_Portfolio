import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}

export default function Section({ id, index, title, children }: SectionProps) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="mb-12 flex items-baseline gap-4 text-2xl font-semibold tracking-tight sm:text-3xl">
        <span className="font-mono text-sm text-accent">{index}</span>
        {title}
        <span aria-hidden className="h-px flex-1 bg-border" />
      </h2>
      {children}
    </section>
  );
}
