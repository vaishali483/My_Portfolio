import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sceneState, smoothstep } from "./sceneState";
import { useGlowTexture } from "./useGlowTexture";

const RADIUS = 2.4;
const GLOBE_Z = -1;
const RING_RADIUS = RADIUS * 1.35;
const CYAN = "#22d3ee";

const BASE_OPACITY = { dots: 0.6, grid: 0.1, ring: 0.3, glow: 0.14, satellite: 1 };

/** Evenly spaced points on a sphere (Fibonacci lattice). */
function sphereDots(count: number, radius: number) {
  const out = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    out[i * 3] = Math.cos(theta) * r * radius;
    out[i * 3 + 1] = y * radius;
    out[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return out;
}

/** Latitude rings and meridians as line-segment pairs. */
function gridLines(radius: number, segments = 72) {
  const points: number[] = [];
  const push = (fn: (a: number) => [number, number, number]) => {
    for (let s = 0; s < segments; s++) {
      const a0 = (s / segments) * Math.PI * 2;
      const a1 = ((s + 1) / segments) * Math.PI * 2;
      points.push(...fn(a0), ...fn(a1));
    }
  };
  for (const lat of [-60, -30, 0, 30, 60]) {
    const phi = (lat * Math.PI) / 180;
    const r = Math.cos(phi) * radius;
    const y = Math.sin(phi) * radius;
    push((a) => [Math.cos(a) * r, y, Math.sin(a) * r]);
  }
  for (let lon = 0; lon < 180; lon += 30) {
    const theta = (lon * Math.PI) / 180;
    push((a) => [
      Math.cos(a) * Math.cos(theta) * radius,
      Math.sin(a) * radius,
      Math.cos(a) * Math.sin(theta) * radius,
    ]);
  }
  return new Float32Array(points);
}

function circle(radius: number, segments = 128) {
  const out = new Float32Array(segments * 3);
  for (let s = 0; s < segments; s++) {
    const a = (s / segments) * Math.PI * 2;
    out[s * 3] = Math.cos(a) * radius;
    out[s * 3 + 2] = Math.sin(a) * radius;
  }
  return out;
}

export default function Globe({ dots }: { dots: number }) {
  const group = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const satellite = useRef<THREE.Mesh>(null);
  const dotsMat = useRef<THREE.PointsMaterial>(null);
  const gridMat = useRef<THREE.LineBasicMaterial>(null);
  const ringMat = useRef<THREE.LineBasicMaterial>(null);
  const glowMat = useRef<THREE.SpriteMaterial>(null);
  const satelliteMat = useRef<THREE.MeshBasicMaterial>(null);
  const texture = useGlowTexture();

  const dotPositions = useMemo(() => sphereDots(dots, RADIUS), [dots]);
  const gridPositions = useMemo(() => gridLines(RADIUS * 0.995), []);
  const ringPositions = useMemo(() => circle(RING_RADIUS), []);

  useFrame(({ camera, viewport, clock }, delta) => {
    if (!group.current || !spin.current || !satellite.current) return;
    const { progress, pointer, reducedMotion } = sceneState;
    const dt = Math.min(delta, 0.05);
    const motion = reducedMotion ? 0 : 1;

    spin.current.rotation.y += 0.08 * dt * motion;

    const angle = clock.elapsedTime * 0.45 * motion;
    satellite.current.position.set(Math.cos(angle) * RING_RADIUS, 0, Math.sin(angle) * RING_RADIUS);

    // Lean gently toward the cursor.
    const g = group.current;
    g.rotation.x += (-pointer.y * 0.15 - g.rotation.x) * 0.04;
    g.rotation.y += (pointer.x * 0.25 - g.rotation.y) * 0.04;

    // Fit narrow screens, then drift up and shrink away as the hero scrolls out.
    const vp = viewport.getCurrentViewport(camera, [0, 0, GLOBE_Z]);
    const fit = Math.min(1, vp.width / (RING_RADIUS * 2.2));
    const exit = smoothstep(0, 1, progress);
    g.scale.setScalar(fit * (1 - 0.35 * exit));
    g.position.y = exit * vp.height * 0.35;

    const fade = 1 - exit;
    if (dotsMat.current) dotsMat.current.opacity = BASE_OPACITY.dots * fade;
    if (gridMat.current) gridMat.current.opacity = BASE_OPACITY.grid * fade;
    if (ringMat.current) ringMat.current.opacity = BASE_OPACITY.ring * fade;
    if (glowMat.current) glowMat.current.opacity = BASE_OPACITY.glow * fade;
    if (satelliteMat.current) satelliteMat.current.opacity = BASE_OPACITY.satellite * fade;
  });

  return (
    <group ref={group} position={[0, 0, GLOBE_Z]}>
      <sprite scale={[RADIUS * 3.4, RADIUS * 3.4, 1]}>
        <spriteMaterial
          ref={glowMat}
          map={texture}
          color={CYAN}
          transparent
          opacity={BASE_OPACITY.glow}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      <group rotation={[0, 0, 0.41]}>
        <group ref={spin}>
          <points>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[dotPositions, 3]} />
            </bufferGeometry>
            <pointsMaterial
              ref={dotsMat}
              size={0.05}
              map={texture}
              color={CYAN}
              transparent
              opacity={BASE_OPACITY.dots}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </points>
          <lineSegments>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[gridPositions, 3]} />
            </bufferGeometry>
            <lineBasicMaterial
              ref={gridMat}
              color={CYAN}
              transparent
              opacity={BASE_OPACITY.grid}
              depthWrite={false}
            />
          </lineSegments>
        </group>
      </group>

      <group rotation={[1.25, 0.3, 0]}>
        <lineLoop>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[ringPositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            ref={ringMat}
            color={CYAN}
            transparent
            opacity={BASE_OPACITY.ring}
            depthWrite={false}
          />
        </lineLoop>
        <mesh ref={satellite}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial ref={satelliteMat} color="#e0f2fe" transparent />
        </mesh>
      </group>
    </group>
  );
}
