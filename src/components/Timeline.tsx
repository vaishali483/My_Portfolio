import { education, experience, volunteering } from "@/data/portfolio-data";
import Section from "./Section";

interface Entry {
  period: string;
  title: string;
  place: string;
  detail?: string;
  points?: string[];
}

function TimelineList({ heading, entries }: { heading: string; entries: Entry[] }) {
  return (
    <div>
      <h3 className="mb-8 font-mono text-xs uppercase tracking-widest text-muted">{heading}</h3>
      <ol className="space-y-10 border-l border-border pl-8">
        {entries.map((entry) => (
          <li key={entry.title + entry.place} className="relative">
            <span
              aria-hidden
              className="absolute -left-[37px] top-1 size-2.5 rounded-full border border-accent bg-background"
            />
            <p className="font-mono text-xs text-accent">{entry.period}</p>
            <h4 className="mt-1 font-semibold">{entry.title}</h4>
            <p className="text-sm text-muted">{entry.place}</p>
            {entry.detail && <p className="mt-2 text-sm text-muted">{entry.detail}</p>}
            {entry.points && (
              <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm text-muted marker:text-accent/60">
                {entry.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Timeline() {
  const work: Entry[] = experience.map((job) => ({
    period: `${job.start} – ${job.end}`,
    title: job.role,
    place: job.organisation,
    points: job.points,
  }));

  const study: Entry[] = education.map((edu) => ({
    period: `${edu.start} – ${edu.end}`,
    title: edu.degree,
    place: `${edu.institution}, ${edu.location}`,
    detail: `Grade: ${edu.grade}`,
  }));

  const community: Entry[] = volunteering.map((v) => ({
    period: "Volunteering",
    title: v.role,
    place: v.organisation,
    detail: v.description,
  }));

  return (
    <Section id="experience" index="05" title="Experience & Education">
      <div className="grid gap-16 lg:grid-cols-[3fr_2fr]">
        <TimelineList heading="Work" entries={work} />
        <div className="space-y-16">
          <TimelineList heading="Education" entries={study} />
          <TimelineList heading="Community" entries={community} />
        </div>
      </div>
    </Section>
  );
}
