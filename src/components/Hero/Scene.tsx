"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Globe from "./Globe";
import NeuralMesh from "./NeuralMesh";
import ParticleField from "./ParticleField";
import { sceneOpacity, sceneState } from "./sceneState";

// Loaded client-only via next/dynamic, so `window` is available during render.
function particleBudget() {
  const small = window.innerWidth < 768;
  return { particles: small ? 600 : 1500, globeDots: small ? 450 : 900 };
}

export default function Scene() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [budget] = useState(particleBudget);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => {
      sceneState.reducedMotion = motionQuery.matches;
    };

    const onScroll = () => {
      const progress = window.scrollY / window.innerHeight;
      const opacity = sceneOpacity(progress);
      sceneState.progress = progress;
      if (wrapper.current) wrapper.current.style.opacity = String(opacity);
      // Stop rendering entirely once the scene has faded out.
      setActive(opacity > 0);
    };

    const onPointerMove = (e: PointerEvent) => {
      sceneState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      sceneState.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
      sceneState.pointer.active = true;
    };
    const onPointerEnd = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") sceneState.pointer.active = false;
    };
    const onPointerLeave = () => {
      sceneState.pointer.active = false;
    };

    updateMotion();
    onScroll();
    motionQuery.addEventListener("change", updateMotion);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerEnd);
    window.addEventListener("pointercancel", onPointerEnd);
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    return () => {
      motionQuery.removeEventListener("change", updateMotion);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerEnd);
      window.removeEventListener("pointercancel", onPointerEnd);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div ref={wrapper} aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="h-full w-full animate-fade-in">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          dpr={[1, 1.5]}
          frameloop={active ? "always" : "never"}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <ParticleField count={budget.particles} />
          <NeuralMesh />
          <Globe dots={budget.globeDots} />
        </Canvas>
      </div>
    </div>
  );
}
