import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Room({ accentColor = "#c6633f" }: { accentColor?: string }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group ref={group}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#2D2318" roughness={0.8} />
      </mesh>

      {/* Walls */}
      {[
        { pos: [0, 1.5, -3], rot: [0, 0, 0] },
        { pos: [0, 1.5, 3], rot: [0, Math.PI, 0] },
        { pos: [-3, 1.5, 0], rot: [0, -Math.PI / 2, 0] },
        { pos: [3, 1.5, 0], rot: [0, Math.PI / 2, 0] },
      ].map(({ pos, rot }, i) => (
        <mesh key={i} position={pos as any} rotation={rot as any}>
          <planeGeometry args={[6, 3]} />
          <meshStandardMaterial color="#F8F5F0" roughness={0.6} />
        </mesh>
      ))}

      {/* Floor plane accent strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.48, 0]}>
        <planeGeometry args={[5.5, 5.5]} />
        <meshStandardMaterial color={accentColor} transparent opacity={0.05} />
      </mesh>

      {/* Central object — modern coffee table */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[1.2, 0.1, 0.8]} />
          <meshStandardMaterial color="#2D2318" roughness={0.4} metalness={0.1} />
        </mesh>
        <mesh position={[-0.5, -0.35, -0.3]}>
          <boxGeometry args={[0.08, 0.5, 0.08]} />
          <meshStandardMaterial color="#2D2318" roughness={0.5} />
        </mesh>
        <mesh position={[0.5, -0.35, -0.3]}>
          <boxGeometry args={[0.08, 0.5, 0.08]} />
          <meshStandardMaterial color="#2D2318" roughness={0.5} />
        </mesh>
        <mesh position={[-0.5, -0.35, 0.3]}>
          <boxGeometry args={[0.08, 0.5, 0.08]} />
          <meshStandardMaterial color="#2D2318" roughness={0.5} />
        </mesh>
        <mesh position={[0.5, -0.35, 0.3]}>
          <boxGeometry args={[0.08, 0.5, 0.08]} />
          <meshStandardMaterial color="#2D2318" roughness={0.5} />
        </mesh>
      </group>

      {/* Vase on table */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.25, 16]} />
        <meshStandardMaterial color={accentColor} roughness={0.3} />
      </mesh>

      {/* Window frame (back wall) */}
      <group position={[0, 1.5, -2.98]}>
        <mesh>
          <planeGeometry args={[2, 2]} />
          <meshStandardMaterial color="#87CEEB" transparent opacity={0.15} roughness={0.1} metalness={0.3} />
        </mesh>
      </group>

      {/* Art frame on right wall */}
      <group position={[2.98, 1.8, -0.5]}>
        <mesh>
          <planeGeometry args={[0.8, 0.6]} />
          <meshStandardMaterial color={accentColor} roughness={0.6} />
        </mesh>
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[0.7, 0.5]} />
          <meshStandardMaterial color="#F8F5F0" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

function Scene({ accentColor }: { accentColor?: string }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 6]} intensity={1.2} />
      <pointLight position={[-3, 2, -2]} intensity={0.4} color="#c6633f" />
      <Suspense fallback={null}>
        <Room accentColor={accentColor} />
        <Environment preset="city" />
        <ContactShadows position={[0, -0.49, 0]} opacity={0.4} scale={6} blur={2} />
      </Suspense>
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        rotateSpeed={0.6}
        autoRotate
        autoRotateSpeed={0.8}
      />
    </>
  );
}

export default function VirtualTour({ className, accentColor }: { className?: string; accentColor?: string }) {
  return (
    <div className={className} style={{ width: "100%", height: "100%", minHeight: "400px" }}>
      <Canvas
        camera={{ position: [2.5, 1.8, 3.5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Scene accentColor={accentColor} />
      </Canvas>
    </div>
  );
}