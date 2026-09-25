import { ArrowDown } from "lucide-react";
import { profile } from "@/data/portfolio-data";

// Static placeholder — the particle field, globe, and boot sequence arrive in Phase 3.
export default function Hero() {
  return (
    <section
      id="top"
      className="flex min-h-svh flex-col items-center justify-center px-6 text-center"
    >
      <p className="mb-4 font-mono text-sm text-accent">{profile.role}</p>
      <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
        {profile.name}
      </h1>
      <p className="mt-6 max-w-xl text-lg text-muted">{profile.tagline}</p>
      <a
        href="#about"
        aria-label="Scroll to About"
        className="mt-16 text-muted transition-colors hover:text-accent"
      >
        <ArrowDown className="size-5" />
      </a>
    </section>
  );
}
