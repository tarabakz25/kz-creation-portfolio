import { Canvas } from "@react-three/fiber";
import Scene from "./threeObject";

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-5 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 45 }}
        eventSource={
          typeof document !== "undefined" ? document.body : undefined
        }
        eventPrefix="client"
      >
        <Scene />
      </Canvas>
    </div>
  );
}
