import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

// Shared terracotta / cream palette for 3D elements.
const TERRACOTTA = "#c6633f";
const CREAM = "#F8F5F0";

// ── Hero accent: slowly rotating wireframe icosahedron ──
function HeroShape({ color = TERRACOTTA }: { color?: string }) {
  const grp = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!grp.current) return;
    grp.current.rotation.y += delta * 0.18;
    grp.current.rotation.x += delta * 0.06;
  });
  return (
    <group ref={grp}>
      <mesh>
        <icosahedronGeometry args={[1.35, 0]} />
        <meshStandardMaterial color={color} transparent opacity={0.12} flatShading />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.4, 0]} />
        <meshBasicMaterial color={color} wireframe />
      </mesh>
      <mesh>
        <torusGeometry args={[0.6, 0.05, 8, 48]} />
        <meshBasicMaterial color={CREAM} wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function HeroLighting() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <pointLight position={[-4, -2, -3]} intensity={0.6} color={TERRACOTTA} />
    </>
  );
}

export function Hero3D({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        dpr={1}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <HeroLighting />
          <HeroShape />
        </Suspense>
      </Canvas>
    </div>
  );
}

// ── Section accent: slow particle field ──
function Particles({ count = 40, color = TERRACOTTA }: { count?: number; color?: string }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.05} sizeAttenuation transparent opacity={0.7} />
    </points>
  );
}

export function ParticleField({
  className,
  count,
  color,
}: {
  className?: string;
  count?: number;
  color?: string;
}) {
  return (
    <div className={className} aria-hidden style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        dpr={1}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      >
        <Suspense fallback={null}>
          <Particles count={count} color={color} />
        </Suspense>
      </Canvas>
    </div>
  );
}
