import { MapPin } from "lucide-react";
import { profile } from "@/data/portfolio-data";
import Section from "./Section";

export default function About() {
  return (
    <Section id="about" index="01" title="About">
      <div className="grid gap-12 md:grid-cols-[3fr_2fr]">
        <div className="space-y-5 leading-relaxed text-muted">
          {profile.summary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="flex items-center gap-2 font-mono text-sm">
            <MapPin className="size-4 text-accent" />
            {profile.location}
          </p>
        </div>

        <div className="space-y-8">
          <dl className="grid grid-cols-3 gap-3 md:grid-cols-1">
            {profile.highlights.map((item) => (
              <div
                key={item.label}
                className="flex flex-col rounded-lg border border-border bg-surface p-4"
              >
                <dt className="text-xs text-muted">{item.label}</dt>
                <dd className="order-first font-mono text-xl text-accent sm:text-2xl">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
              Interests
            </h3>
            <ul className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <li key={interest} className="rounded-full border border-border px-3 py-1 text-sm">
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
