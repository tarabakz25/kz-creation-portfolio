import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

function CameraRig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.pointer.x * 5, state.pointer.y * 3, 50],
      0.3,
      delta,
    );
    state.camera.lookAt(0, 0, 0);
  });
}

function Stars() {
  const containerRef = useRef([]);

  useFrame((state) => {
    const timer = 0.00001 * Date.now();
    containerRef.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.position.x = 400 * Math.sin(timer + i);
        mesh.position.z = 400 * Math.sin(timer + i * 1.1);
        
        mesh.rotation.x += 0.001;
      }
    });
  });

  return (
    <group>
      {Array.from({ length: 500 }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (containerRef.current[i] = el)}
          position={[
            Math.random() * 600 - 300,
            Math.random() * 600 - 300,
            Math.random() * 600 - 300,
          ]}
        >
          <octahedronGeometry args={[Math.random() * 1]} />
          <meshPhongMaterial emissive="#fff" />
        </mesh>
      ))}
    </group>
  );
}

function Sun() {
  const containerRef = useRef(null);

  useFrame(() => {
    if (containerRef.current) containerRef.current.rotation.x += 0.001;
  });

  return (
    <group>
      <mesh ref={containerRef}>
        <icosahedronGeometry args={[5, 1]} />
        <meshBasicMaterial
          color={0xf66120}
          wireframe
        />
      </mesh>
    </group>
  );
}

function OrbitRing() {
  const containerRef = useRef(null);

  useFrame(() => {
    if (containerRef.current) {
      containerRef.current.rotation.x += 0.0007;
      containerRef.current.rotation.y += 0.0007;
      containerRef.current.rotation.z += 0.0007;
    }
  });

  return (
    <group ref={containerRef}>
      <mesh>
        <torusGeometry args={[16, 0.03, 80, 90, Math.PI * 3]} />
        <meshLambertMaterial color={0x4f4f4f} emissive={0x4f4f4f} flatShading />
      </mesh>
    </group>
  );
}

export default function Scene() {
  return (
    <>
      <CameraRig />
      <Stars />
      <group position={[10, 0, 0]}>
        <Sun />
        <OrbitRing />
      </group>
      <directionalLight position={[4, 4, 4]} color={0x4f4f4f} />
      <directionalLight position={[-4, -4, -4]} color={0x4f4f4f} />
    </>
  );
}
