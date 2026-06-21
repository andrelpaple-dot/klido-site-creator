import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import type { Mesh } from "three";

function Blob() {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock, mouse }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.08 + mouse.y * 0.2;
    ref.current.rotation.y = t * 0.12 + mouse.x * 0.3;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref} scale={2.6}>
        <icosahedronGeometry args={[1, 64]} />
        
        <MeshDistortMaterial
          color="#c9a36a"
          roughness={0.15}
          metalness={0.95}
          distort={0.45}
          speed={1.4}
          emissive="#1a1208"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

function Ring() {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.getElapsedTime() * 0.1;
    ref.current.rotation.x = Math.PI / 3;
  });
  return (
    <mesh ref={ref} position={[0, 0, -2]} scale={4}>
      <torusGeometry args={[1, 0.015, 16, 200]} />
      <meshBasicMaterial color="#c9a36a" transparent opacity={0.25} />
    </mesh>
  );
}

export function Scene3D() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-0 opacity-90">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} color="#fff" />
          <directionalLight position={[-5, -3, -2]} intensity={0.6} color="#c9a36a" />
          <Blob />
          <Ring />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.92) 100%)",
        }}
      />
    </div>
  );
}
