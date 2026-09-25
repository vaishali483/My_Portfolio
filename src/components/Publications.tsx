import { ArrowUpRight } from "lucide-react";
import { publications, type Publication } from "@/data/portfolio-data";
import Section from "./Section";

const rowClass = "flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:gap-6";

function PublicationRow({ pub }: { pub: Publication }) {
  return (
    <>
      <span className="font-mono text-xs text-muted sm:w-20 sm:shrink-0">{pub.date}</span>
      <span className="flex-1">
        <span className="block leading-snug">{pub.title}</span>
        <span className="mt-1 block text-sm text-muted">{pub.venue}</span>
      </span>
      {pub.url && (
        <ArrowUpRight className="hidden size-4 shrink-0 self-center text-muted transition-colors group-hover:text-accent sm:block" />
      )}
    </>
  );
}

export default function Publications() {
  return (
    <Section id="publications" index="04" title="Research">
      <ol className="divide-y divide-border border-y border-border">
        {publications.map((pub) => (
          <li key={pub.title}>
            {pub.url ? (
              <a
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group ${rowClass} transition-colors hover:text-accent`}
              >
                <PublicationRow pub={pub} />
              </a>
            ) : (
              <div className={rowClass}>
                <PublicationRow pub={pub} />
              </div>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
