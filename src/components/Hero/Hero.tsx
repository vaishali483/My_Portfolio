import { ArrowDown } from "lucide-react";
import { profile } from "@/data/portfolio-data";

const reveal = (revealed: boolean, delay: string) =>
  `transition-all duration-1000 ease-out motion-reduce:transition-none ${delay} ${
    revealed ? "translate-y-0 opacity-100 blur-0" : "translate-y-4 opacity-0 blur-sm"
  }`;

export default function Hero({ revealed }: { revealed: boolean }) {
  return (
    <section
      id="top"
      className="flex min-h-svh flex-col items-center justify-center px-6 text-center"
    >
      <p className={`mb-4 font-mono text-sm text-accent ${reveal(revealed, "delay-100")}`}>
        {profile.role}
      </p>
      <h1
        className={`max-w-4xl text-4xl font-semibold tracking-tight [text-shadow:0_0_40px_rgb(5_7_10)] sm:text-6xl ${reveal(revealed, "delay-300")}`}
      >
        {profile.name}
      </h1>
      <p className={`mt-6 max-w-xl text-lg text-muted ${reveal(revealed, "delay-700")}`}>
        {profile.tagline}
      </p>
      <a
        href="#about"
        aria-label="Scroll to About"
        className={`mt-16 text-muted hover:text-accent ${reveal(revealed, "delay-1000")}`}
      >
        <ArrowDown className="size-5 motion-safe:animate-bounce" />
      </a>
    </section>
  );
}
