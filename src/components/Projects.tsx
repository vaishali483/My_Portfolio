import type { ComponentType, SVGProps } from "react";
import { ArrowUpRight, FileText } from "lucide-react";
import { projects, type Project } from "@/data/portfolio-data";
import { GithubIcon } from "./BrandIcons";
import Section from "./Section";

interface LinkItem {
  href: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

function ProjectLinks({ links }: { links: Project["links"] }) {
  if (!links) return null;
  const items: LinkItem[] = [];
  if (links.github) items.push({ href: links.github, label: "Code", Icon: GithubIcon });
  if (links.demo) items.push({ href: links.demo, label: "Demo", Icon: ArrowUpRight });
  if (links.paper) items.push({ href: links.paper, label: "Paper", Icon: FileText });

  return (
    <div className="mt-5 flex gap-4">
      {items.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
        >
          <Icon className="size-4" />
          {label}
        </a>
      ))}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent/50">
      {project.subtitle && (
        <p className="mb-2 font-mono text-xs text-accent">{project.subtitle}</p>
      )}
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
      <ul className="mt-4 list-disc space-y-1.5 pl-4 text-sm text-muted marker:text-accent/60">
        {project.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <ul className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-5 font-mono text-xs text-muted/80">
        {project.stack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <ProjectLinks links={project.links} />
    </article>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <Section id="projects" index="03" title="Projects">
      <div className="grid gap-6 md:grid-cols-2">
        {featured.map((project, i) => (
          <div key={project.title} className={i === 0 ? "md:col-span-2" : undefined}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
      {others.length > 0 && (
        <>
          <h3 className="mb-6 mt-16 font-mono text-xs uppercase tracking-widest text-muted">
            More projects
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {others.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </>
      )}
    </Section>
  );
}
