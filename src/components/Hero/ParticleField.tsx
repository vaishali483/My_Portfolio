import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sceneState } from "./sceneState";
import { useGlowTexture } from "./useGlowTexture";

const SPREAD_X = 14;
const SPREAD_Y = 9;
const Z_MIN = -8;
const Z_MAX = 3;
const REPEL_RADIUS = 1.8;
const REPEL_FORCE = 10;
const SPRING = 2.5;
const PALETTE = ["#22d3ee", "#a5f3fc", "#818cf8", "#e0f2fe"];

function createColors(count: number) {
  const colors = new Float32Array(count * 3);
  const color = new THREE.Color();
  for (let i = 0; i < count; i++) {
    color.set(PALETTE[Math.floor(Math.random() * PALETTE.length)]);
    color.multiplyScalar(0.35 + Math.random() * 0.65);
    color.toArray(colors, i * 3);
  }
  return colors;
}

/** Per-frame simulation state — held in a ref because the render loop mutates it. */
function createSimulation(count: number) {
  const home = new Float32Array(count * 3);
  const drift = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    home[i * 3] = (Math.random() * 2 - 1) * SPREAD_X;
    home[i * 3 + 1] = (Math.random() * 2 - 1) * SPREAD_Y;
    home[i * 3 + 2] = Z_MIN + Math.random() * (Z_MAX - Z_MIN);
    drift[i * 2] = (Math.random() - 0.5) * 0.12;
    drift[i * 2 + 1] = (Math.random() - 0.5) * 0.08 + 0.03;
  }
  return { count, home, drift, offset: new Float32Array(count * 2), rayDir: new THREE.Vector3() };
}

export default function ParticleField({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const simulation = useRef<ReturnType<typeof createSimulation>>(null);
  const texture = useGlowTexture();
  const buffers = useMemo(
    () => ({ positions: new Float32Array(count * 3), colors: createColors(count) }),
    [count],
  );

  useFrame(({ camera }, delta) => {
    const mesh = points.current;
    if (!mesh) return;
    if (simulation.current?.count !== count) simulation.current = createSimulation(count);
    const { home, drift, offset, rayDir } = simulation.current;
    const positionAttr = mesh.geometry.attributes.position as THREE.BufferAttribute;
    const positions = positionAttr.array as Float32Array;
    const { pointer, progress, reducedMotion } = sceneState;
    const dt = Math.min(delta, 0.05);
    const motion = reducedMotion ? 0 : 1;
    const cam = camera.position;
    const groupY = progress * 1.5;
    const decay = 1 - Math.min(1, SPRING * dt);

    // Ray from the camera through the cursor; intersected at each particle's depth below.
    rayDir.set(pointer.x, pointer.y, 0.5).unproject(camera).sub(cam).normalize();

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const io = i * 2;

      home[ix] += drift[io] * dt * motion;
      home[ix + 1] += drift[io + 1] * dt * motion;
      if (home[ix] > SPREAD_X) home[ix] -= 2 * SPREAD_X;
      else if (home[ix] < -SPREAD_X) home[ix] += 2 * SPREAD_X;
      if (home[ix + 1] > SPREAD_Y) home[ix + 1] -= 2 * SPREAD_Y;
      else if (home[ix + 1] < -SPREAD_Y) home[ix + 1] += 2 * SPREAD_Y;

      if (pointer.active) {
        const t = (home[ix + 2] - cam.z) / rayDir.z;
        const dx = home[ix] + offset[io] - (cam.x + rayDir.x * t);
        const dy = home[ix + 1] + offset[io + 1] - (cam.y + rayDir.y * t - groupY);
        const distSq = dx * dx + dy * dy;
        if (distSq < REPEL_RADIUS * REPEL_RADIUS && distSq > 1e-6) {
          const dist = Math.sqrt(distSq);
          const push = (1 - dist / REPEL_RADIUS) * REPEL_FORCE * dt;
          offset[io] += (dx / dist) * push;
          offset[io + 1] += (dy / dist) * push;
        }
      }

      offset[io] *= decay;
      offset[io + 1] *= decay;
      positions[ix] = home[ix] + offset[io];
      positions[ix + 1] = home[ix + 1] + offset[io + 1];
      positions[ix + 2] = home[ix + 2];
    }

    positionAttr.needsUpdate = true;
    mesh.position.y = groupY;
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[buffers.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[buffers.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        map={texture}
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
