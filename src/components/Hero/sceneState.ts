// Mutable state shared between DOM listeners and the render loop.
// Kept outside React so scroll/pointer updates never trigger re-renders.
export const sceneState = {
  /** Scroll position in viewport heights: 0 at the top, 1 once the hero has scrolled away. */
  progress: 0,
  /** Pointer in normalised device coordinates (-1..1). */
  pointer: { x: 0, y: 0, active: false },
  reducedMotion: false,
};

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function smoothstep(edge0: number, edge1: number, v: number) {
  const t = clamp01((v - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/** Full strength through the hero, dims behind About, gone by Skills. */
export function sceneOpacity(progress: number) {
  if (progress < 1.2) return 1 - 0.7 * smoothstep(0.5, 1.2, progress);
  return 0.3 * (1 - smoothstep(1.2, 2.2, progress));
}
