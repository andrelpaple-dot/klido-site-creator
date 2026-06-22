import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";

function Shape({
  geom,
  position,
  scale = 1,
  color = "#c9a36a",
  wire = false,
}: {
  geom: "ico" | "torus" | "octa" | "cone" | "box";
  position: [number, number, number];
  scale?: number;
  color?: string;
  wire?: boolean;
}) {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.3;
    ref.current.rotation.y = t * 0.4;
  });
  const geometry =
    geom === "ico" ? <icosahedronGeometry args={[1, 0]} /> :
    geom === "torus" ? <torusGeometry args={[0.8, 0.22, 16, 64]} /> :
    geom === "octa" ? <octahedronGeometry args={[1, 0]} /> :
    geom === "cone" ? <coneGeometry args={[0.8, 1.6, 32]} /> :
    <boxGeometry args={[1.2, 1.2, 1.2]} />;
  return (
    <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        {geometry}
        <meshStandardMaterial
          color={color}
          roughness={0.25}
          metalness={0.85}
          wireframe={wire}
        />
      </mesh>
    </Float>
  );
}

export function ManifestoShapes() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1.1} color="#fff" />
          <directionalLight position={[-5, -3, -2]} intensity={0.6} color="#c9a36a" />
          <Shape geom="torus" position={[-5.5, 2.4, 0]} scale={0.55} />
          <Shape geom="octa" position={[5.6, 1.6, 0]} scale={0.6} wire />
          <Shape geom="ico" position={[-4.8, -2.2, 0]} scale={0.5} color="#f5f5f3" />
          <Shape geom="cone" position={[5.0, -2.6, 0]} scale={0.5} />
          <Shape geom="box" position={[0, -3.4, 0]} scale={0.35} wire color="#f5f5f3" />
        </Suspense>
      </Canvas>
    </div>
  );
}
