import { profile } from "@/data/portfolio-data";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#publications", label: "Research" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <a href="#top" className="font-mono text-sm text-accent">
          {profile.shortName.toLowerCase()}.ai
        </a>
        <ul className="hidden gap-6 text-sm text-muted md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-foreground">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="font-mono text-xs text-muted transition-colors hover:text-accent md:hidden"
        >
          contact
        </a>
      </nav>
    </header>
  );
}
