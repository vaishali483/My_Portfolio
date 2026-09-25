"use client";

import { useEffect, useState } from "react";

const STEPS = [
  { text: "Initializing AI Portfolio...", bar: false },
  { text: "Loading Vision Models...", bar: true },
  { text: "Loading Neural Networks...", bar: true },
  { text: "Connecting Agent Memory...", bar: true },
  { text: "Welcome.", bar: false },
];

const CHAR_MS = 18;
const BAR_MS = 420;
const GAP_MS = 160;
const HOLD_MS = 900;
const EXIT_MS = 700;
const LABEL_WIDTH = 30;
const BAR_BLOCKS = 10;
const SEEN_KEY = "boot-sequence-seen";

const SCHEDULE = (() => {
  let t = 0;
  return STEPS.map((step) => {
    const start = t;
    const typeEnd = start + step.text.length * CHAR_MS;
    const barEnd = typeEnd + (step.bar ? BAR_MS : 0);
    t = barEnd + GAP_MS;
    return { ...step, start, typeEnd, barEnd };
  });
})();

const TOTAL_MS = SCHEDULE[SCHEDULE.length - 1].barEnd + HOLD_MS;

type Phase = "running" | "exiting" | "done";

function shouldSkip() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function renderBar(progress: number) {
  const filled = Math.round(progress * BAR_BLOCKS);
  const percent = `${Math.round(progress * 100)}%`.padStart(4);
  return `${"█".repeat(filled)}${"░".repeat(BAR_BLOCKS - filled)} ${percent}`;
}

/**
 * Terminal-style intro that plays once per browser session.
 * `onFinish` fires as the overlay starts fading, so the hero can reveal underneath it.
 */
export default function BootSequence({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<Phase>("running");
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (phase !== "running") return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const exit = () => setPhase("exiting");
    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = now - start;
      setElapsed(t);
      if (t >= TOTAL_MS) exit();
      else frame = requestAnimationFrame(tick);
    };

    if (shouldSkip()) {
      frame = requestAnimationFrame(() => {
        onFinish();
        setPhase("done");
      });
      return () => cancelAnimationFrame(frame);
    }

    window.scrollTo(0, 0);
    root.style.overflow = "hidden";
    frame = requestAnimationFrame(tick);
    window.addEventListener("keydown", exit);
    window.addEventListener("pointerdown", exit);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", exit);
      window.removeEventListener("pointerdown", exit);
      root.style.overflow = previousOverflow;
    };
  }, [phase, onFinish]);

  useEffect(() => {
    if (phase !== "exiting") return;
    onFinish();
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // Storage can be unavailable (private mode); the intro just plays again next time.
    }
    const timeout = setTimeout(() => setPhase("done"), EXIT_MS);
    return () => clearTimeout(timeout);
  }, [phase, onFinish]);

  if (phase === "done") return null;

  const visible = SCHEDULE.filter((step) => elapsed >= step.start);
  const activeIndex = visible.length - 1;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black px-4 font-mono transition-opacity duration-700 ${
        phase === "exiting" ? "pointer-events-none opacity-0" : ""
      }`}
    >
      <p className="sr-only" role="status">
        Loading portfolio
      </p>

      <div
        aria-hidden
        className="w-full max-w-[34rem] whitespace-pre text-[10.5px] leading-relaxed text-accent [text-shadow:0_0_8px_rgb(34_211_238/0.55)] sm:text-sm"
      >
        {visible.map((step, i) => {
          const typed = Math.min(step.text.length, Math.floor((elapsed - step.start) / CHAR_MS));
          const typing = typed < step.text.length;
          const progress = Math.min(1, Math.max(0, (elapsed - step.typeEnd) / BAR_MS));
          const isWelcome = i === STEPS.length - 1;

          return (
            <div key={step.text} className={isWelcome ? "mt-6 text-base text-foreground sm:text-lg" : ""}>
              {step.bar
                ? step.text.slice(0, typed).padEnd(typing ? 0 : LABEL_WIDTH)
                : step.text.slice(0, typed)}
              {step.bar && !typing && renderBar(progress)}
              {i === activeIndex && <span className="animate-blink">▍</span>}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setPhase("exiting")}
        className="absolute bottom-6 right-6 text-xs text-muted transition-colors hover:text-accent"
      >
        Press any key to skip
      </button>
    </div>
  );
}
