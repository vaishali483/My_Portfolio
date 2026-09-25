import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sceneState, smoothstep } from "./sceneState";
import { useGlowTexture } from "./useGlowTexture";

const LAYERS = [4, 6, 8, 8, 6, 4];
const WIDTH = 18;
const HEIGHT = 8;
const MESH_Z = -3;
const PULSES = 28;
const CONNECTION_CHANCE = 0.45;

interface Edge {
  from: number;
  to: number;
}

/** A layered feed-forward network. Edges are ordered by layer so revealing them reads left → right. */
function createNetwork() {
  const nodes: THREE.Vector3[] = [];
  const layerNodes: number[][] = [];

  LAYERS.forEach((size, l) => {
    const x = -WIDTH / 2 + (l / (LAYERS.length - 1)) * WIDTH;
    const ids: number[] = [];
    for (let n = 0; n < size; n++) {
      const y = size === 1 ? 0 : -HEIGHT / 2 + (n / (size - 1)) * HEIGHT;
      ids.push(nodes.length);
      nodes.push(
        new THREE.Vector3(
          x + (Math.random() - 0.5) * 0.8,
          y * (size / Math.max(...LAYERS)) + (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 1.5,
        ),
      );
    }
    layerNodes.push(ids);
  });

  const edges: Edge[] = [];
  for (let l = 0; l < layerNodes.length - 1; l++) {
    const layerEdges: Edge[] = [];
    const current = layerNodes[l];
    const next = layerNodes[l + 1];
    for (const from of current) {
      for (const to of next) {
        if (Math.random() < CONNECTION_CHANCE) layerEdges.push({ from, to });
      }
    }
    // Every node gets at least one connection in and out.
    for (const from of current) {
      if (!layerEdges.some((e) => e.from === from)) {
        layerEdges.push({ from, to: next[Math.floor(Math.random() * next.length)] });
      }
    }
    for (const to of next) {
      if (!layerEdges.some((e) => e.to === to)) {
        layerEdges.push({ from: current[Math.floor(Math.random() * current.length)], to });
      }
    }
    layerEdges.sort(() => Math.random() - 0.5);
    edges.push(...layerEdges);
  }

  const nodePositions = new Float32Array(nodes.length * 3);
  nodes.forEach((node, i) => node.toArray(nodePositions, i * 3));

  const edgePositions = new Float32Array(edges.length * 6);
  edges.forEach((edge, i) => {
    nodes[edge.from].toArray(edgePositions, i * 6);
    nodes[edge.to].toArray(edgePositions, i * 6 + 3);
  });

  return {
    nodes,
    edges,
    nodePositions,
    edgePositions,
    pulsePositions: new Float32Array(PULSES * 3),
  };
}

/** Signals travelling along edges — held in a ref because the render loop mutates it. */
function createPulses() {
  return {
    items: Array.from({ length: PULSES }, () => ({
      edge: 0,
      t: Math.random(),
      speed: 0.35 + Math.random() * 0.5,
    })),
    scratch: new THREE.Vector3(),
  };
}

export default function NeuralMesh() {
  const group = useRef<THREE.Group>(null);
  const lines = useRef<THREE.LineSegments>(null);
  const nodePoints = useRef<THREE.Points>(null);
  const pulsePoints = useRef<THREE.Points>(null);
  const lineMat = useRef<THREE.LineBasicMaterial>(null);
  const nodeMat = useRef<THREE.PointsMaterial>(null);
  const pulseMat = useRef<THREE.PointsMaterial>(null);
  const texture = useGlowTexture();
  const network = useMemo(() => createNetwork(), []);
  const pulseState = useRef<ReturnType<typeof createPulses>>(null);

  useFrame(({ camera, viewport, clock }, delta) => {
    if (!group.current || !lines.current || !nodePoints.current || !pulsePoints.current) return;
    pulseState.current ??= createPulses();
    const { items: pulses, scratch } = pulseState.current;
    const { nodes, edges } = network;
    const pulseAttr = pulsePoints.current.geometry.attributes.position as THREE.BufferAttribute;
    const pulsePositions = pulseAttr.array as Float32Array;
    const { progress, reducedMotion } = sceneState;
    const dt = Math.min(delta, 0.05);
    const motion = reducedMotion ? 0 : 1;

    // The network assembles itself as the hero scrolls away.
    const form = smoothstep(0.05, 0.75, progress);
    const visibleEdges = Math.floor(form * edges.length);
    lines.current.geometry.setDrawRange(0, visibleEdges * 2);
    nodePoints.current.geometry.setDrawRange(0, Math.ceil(Math.min(1, form * 1.15) * nodes.length));

    if (lineMat.current) lineMat.current.opacity = 0.16 * form;
    if (nodeMat.current) nodeMat.current.opacity = 0.9 * form;
    if (pulseMat.current) pulseMat.current.opacity = visibleEdges > 0 ? form : 0;

    // Signals travelling along the connections that have formed so far.
    if (visibleEdges > 0) {
      pulses.forEach((pulse, i) => {
        pulse.t += pulse.speed * dt * motion;
        if (pulse.t >= 1 || pulse.edge >= visibleEdges) {
          pulse.t = 0;
          pulse.edge = Math.floor(Math.random() * visibleEdges);
        }
        const edge = edges[pulse.edge];
        scratch.lerpVectors(nodes[edge.from], nodes[edge.to], pulse.t).toArray(pulsePositions, i * 3);
      });
      pulseAttr.needsUpdate = true;
    }

    // On portrait screens the network flows top → bottom instead of left → right.
    const vp = viewport.getCurrentViewport(camera, [0, 0, MESH_Z]);
    const portrait = vp.width < vp.height;
    const span = portrait ? vp.height : vp.width;
    const breadth = portrait ? vp.width : vp.height;
    group.current.rotation.z = portrait ? -Math.PI / 2 : 0;
    group.current.scale.set(span / (WIDTH + 2), Math.min(1, breadth / (HEIGHT + 2)), 1);
    group.current.position.y = Math.sin(clock.elapsedTime * 0.3) * 0.15 * motion;
  });

  return (
    <group ref={group} position={[0, 0, MESH_Z]}>
      <lineSegments ref={lines} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[network.edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          ref={lineMat}
          color="#38bdf8"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      <points ref={nodePoints} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[network.nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={nodeMat}
          size={0.22}
          map={texture}
          color="#67e8f9"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <points ref={pulsePoints} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[network.pulsePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={pulseMat}
          size={0.16}
          map={texture}
          color="#ecfeff"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
