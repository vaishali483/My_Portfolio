# Vaishali's AI/ML Portfolio — Build Plan

**Vibe:** Dark, techy, cinematic. Feels like booting into an AI system, not loading a website.
**Built with:** Claude Code (VS Code) → GitHub → Vercel

---

## 1. Concept

A dark-themed, 3D/animated portfolio for an AI & ML student. The site should feel *alive* —
particles react to the mouse, a neural network / globe motif runs through it, and scrolling
feels like moving through layers of a system rather than flipping pages.

### Signature moments (must-haves)

**A. Boot sequence (page load, plays once)**
```
Initializing AI Portfolio...
Loading Vision Models...        ██████████ 100%
Loading Neural Networks...      ██████████ 100%
Connecting Agent Memory...      ██████████ 100%

Welcome.
```
Terminal/monospace font, green or cyan-on-black, lines typing in with progress bars filling,
then fades out into the hero scene. Skippable (click/tap or press any key) so repeat visitors
aren't stuck watching it.

**B. Hero scene (after boot)**
Near-black background, tiny glowing particles drifting, a slowly rotating holographic globe,
name fades in, cursor movement pushes particles away, a faint neural-network mesh forms behind
the text as you scroll, and the whole scene smoothly transitions into the About section.

These two are the centerpiece — everything else in the site should feel calmer by comparison so
these stand out.

---

## 2. Tech Stack

| Purpose | Choice | Why |
|---|---|---|
| Framework | **Next.js 14+ (App Router, TypeScript)** | Built by Vercel — zero-config deploys, great defaults |
| Styling | **Tailwind CSS** | Fast to theme, pairs well with component libraries |
| 3D | **React Three Fiber + drei** (Three.js) | For the globe, particle field, neural-mesh background |
| Animation | **Framer Motion** | Element/page transitions, text reveals, hover states |
| Scroll effects | **GSAP + ScrollTrigger** (optional, add if Framer Motion feels limiting) | Best-in-class scroll-driven sequences |
| Component inspiration | **reactbits.dev** | Free, open-source animated components — install individual pieces via their CLI instead of hand-rolling everything |
| Icons | **lucide-react** | Clean, consistent icon set |
| Hosting | **Vercel** | Free tier, auto-deploys from GitHub, made for Next.js |

**Optional/creative extras:**
- Generate a short abstract "neural network" or particle clip in **Google Flow** and use it as a
  muted looping `<video>` background behind a section (lighter on the GPU than a full Three.js
  scene, good for a secondary section rather than the main hero).
- Browse **motionsites.ai** for hero-section *prompt structure* ideas (it's a paid prompt library,
  not free code) — useful for wording your own prompts to Claude Code well, not for copy-pasting.

---

## 3. Site Structure

1. **Boot Sequence** — plays once, skippable
2. **Hero** — name, tagline, particle/globe scene, scroll cue
3. **About** — short bio, what draws you to AI/ML
4. **Skills** — languages, frameworks, tools (grouped: Programming, ML/DL, Tools & Platforms)
5. **Projects** — cards (title, stack, short description, links); hover = subtle 3D tilt or glow
6. **Experience / Education** — timeline format
7. **Contact** — email, LinkedIn, GitHub, resume download button

*(Exact sections depend on what's in your resume — Claude Code should read
`Vaishali - Resume.pdf` from this folder and propose the final section list and content before
writing any code.)*

---

## 4. Folder Structure (target)

```
MyPortfolio/
├── Vaishali - Resume.pdf
├── PORTFOLIO_PLAN.md
├── public/
│   └── resume.pdf              # copy for the "Download Resume" button
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── BootSequence.tsx
│   │   ├── Hero/
│   │   │   ├── ParticleField.tsx
│   │   │   └── Globe.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Timeline.tsx
│   │   └── Contact.tsx
│   ├── data/
│   │   └── portfolio-data.ts   # skills/projects/experience pulled from resume
│   └── styles/
│       └── globals.css
├── package.json
└── tsconfig.json
```

---

## 5. Build Phases

Work through these **in order**, one prompt/session at a time — don't ask Claude Code to build
the whole site in one shot.

- [ ] **Phase 0 — Scaffold**
  Create the Next.js + TypeScript + Tailwind project, init git, confirm `npm run dev` works with
  a blank page.

- [ ] **Phase 1 — Content extraction**
  Have Claude Code read `Vaishali - Resume.pdf` and draft `src/data/portfolio-data.ts` (skills,
  projects, experience, education) for you to review and correct.

- [ ] **Phase 2 — Static layout**
  Build all sections (About, Skills, Projects, Timeline, Contact) with real content but no
  fancy animation yet. Get the structure and copy right first.

- [ ] **Phase 3 — Hero + boot sequence**
  This is the hardest part — build it on its own, iterate on it alone before touching anything
  else. Particle field → globe → mouse interaction → scroll-triggered neural mesh.

- [ ] **Phase 4 — Motion pass**
  Add Framer Motion (and GSAP if needed) transitions across the rest of the site: scroll reveals,
  hover states, page/section transitions.

- [ ] **Phase 5 — Polish**
  Mobile responsiveness, performance check (3D scenes are heavy — test on a mid-range phone),
  loading states, accessibility (skip-boot-sequence option, reduced-motion support).

- [ ] **Phase 6 — Deploy**
  Push to GitHub, import into Vercel, verify the live deploy, add a custom domain if you have one.

---

## 6. Deployment Flow

1. Push the project to a GitHub repository.
2. Go to vercel.com → **Add New Project** → import that repo.
3. Vercel auto-detects Next.js — default settings work out of the box. Deploy.
4. Every future `git push` to `main` auto-redeploys. Feature branches get their own preview URLs.

No manual connection between Claude Code and Vercel is needed — GitHub is the bridge.

---

## 7. Notes to self

- Keep 3D scenes performant: cap particle counts, use `React.lazy`/dynamic import so Three.js
  code doesn't block the initial page load.
- Respect `prefers-reduced-motion` for anyone who needs less animation.
- Keep the resume PDF and this plan in the project root so Claude Code always has them as
  reference context.
