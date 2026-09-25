import { skills } from "@/data/portfolio-data";
import Section from "./Section";

export default function Skills() {
  return (
    <Section id="skills" index="02" title="Skills">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => (
          <div key={group.category} className="rounded-lg border border-border bg-surface p-5">
            <h3 className="mb-4 font-mono text-sm text-accent">{group.category}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li key={skill} className="rounded border border-border px-2 py-1 text-xs text-muted">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
