import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh, Group } from "three";
import { useMotionValue, type MotionValue } from "framer-motion";

function Shape({
  geom,
  position,
  scale = 1,
  color = "#c9a36a",
  wire = false,
  spin = 1,
}: {
  geom: "ico" | "torus" | "octa" | "cone" | "box" | "tetra";
  position: [number, number, number];
  scale?: number;
  color?: string;
  wire?: boolean;
  spin?: number;
}) {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.35 * spin;
    ref.current.rotation.y = t * 0.5 * spin;
  });
  const geometry =
    geom === "ico" ? <icosahedronGeometry args={[1, 0]} /> :
    geom === "torus" ? <torusGeometry args={[0.8, 0.22, 24, 96]} /> :
    geom === "octa" ? <octahedronGeometry args={[1, 0]} /> :
    geom === "cone" ? <coneGeometry args={[0.8, 1.6, 48]} /> :
    geom === "tetra" ? <tetrahedronGeometry args={[1, 0]} /> :
    <boxGeometry args={[1.2, 1.2, 1.2]} />;
  return (
    <Float speed={1.8} rotationIntensity={0.7} floatIntensity={1.4}>
      <mesh ref={ref} position={position} scale={scale}>
        {geometry}
        <meshStandardMaterial
          color={color}
          roughness={0.22}
          metalness={0.9}
          wireframe={wire}
          emissive={wire ? color : "#0a0805"}
          emissiveIntensity={wire ? 0.35 : 0.2}
        />
      </mesh>
    </Float>
  );
}

function SceneInner({ rotation, scale }: { rotation: MotionValue<number>; scale: MotionValue<number> }) {
  const groupRef = useRef<Group>(null);
  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = rotation.get();
    const s = scale.get();
    groupRef.current.scale.set(s, s, s);
  });
  return (
    <group ref={groupRef}>
      <Shape geom="torus" position={[-6.2, 2.8, -1]} scale={0.7} />
      <Shape geom="octa" position={[6.4, 2.0, 0]} scale={0.75} wire />
      <Shape geom="ico" position={[-5.5, -2.6, 1]} scale={0.65} color="#f5f5f3" />
      <Shape geom="cone" position={[5.8, -3.0, 0]} scale={0.6} spin={-1} />
      <Shape geom="tetra" position={[-2.5, 3.4, -2]} scale={0.5} wire color="#f5f5f3" />
      <Shape geom="box" position={[3.0, -3.6, -1]} scale={0.45} wire />
      <Shape geom="ico" position={[0, 0, -4]} scale={0.55} color="#c9a36a" wire />
    </group>
  );
}

export function ManifestoShapes({
  rotation,
  scale,
}: {
  rotation?: MotionValue<number>;
  scale?: MotionValue<number>;
}) {
  const fallbackRot = useMotionValue(0);
  const fallbackScale = useMotionValue(1);
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 9], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} color="#fff" />
          <directionalLight position={[-5, -3, -2]} intensity={0.7} color="#c9a36a" />
          <SceneInner rotation={rotation ?? fallbackRot} scale={scale ?? fallbackScale} />
        </Suspense>
      </Canvas>
    </div>
  );
}
