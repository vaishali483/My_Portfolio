import { Download, Mail } from "lucide-react";
import { contact, profile } from "@/data/portfolio-data";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import Section from "./Section";

const stripProtocol = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

const channels = [
  { href: `mailto:${contact.email}`, label: contact.email, Icon: Mail, external: false },
  { href: contact.linkedin, label: stripProtocol(contact.linkedin), Icon: LinkedinIcon, external: true },
  { href: contact.github, label: stripProtocol(contact.github), Icon: GithubIcon, external: true },
];

export default function Contact() {
  return (
    <Section id="contact" index="06" title="Contact">
      <div className="max-w-2xl">
        <p className="text-lg leading-relaxed text-muted">
          Open to research collaborations, ML engineering roles, and interesting problems in
          vision, robotics, and GenAI. Email is the fastest way to reach me.
        </p>
        <ul className="mt-10 space-y-4">
          {channels.map(({ href, label, Icon, external }) => (
            <li key={href}>
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-3 transition-colors hover:text-accent"
              >
                <Icon className="size-5 shrink-0 text-accent" />
                <span className="break-all">{label}</span>
              </a>
            </li>
          ))}
        </ul>
        <a
          href={contact.resume}
          download="Vaishali-Veera-Saravana-Perumal-Resume.pdf"
          className="mt-10 inline-flex items-center gap-2 rounded-md border border-accent px-5 py-2.5 font-mono text-sm text-accent transition-colors hover:bg-accent hover:text-background"
        >
          <Download className="size-4" />
          Download resume
        </a>
      </div>
      <footer className="mt-24 border-t border-border pt-8 font-mono text-xs text-muted">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </Section>
  );
}
