import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Cell {
  x: number;
  y: number;
  alpha: number; // 0-1 for fade effect
}

export default function InteractiveGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cellsRef = useRef<Map<string, Cell>>(new Map());
  const animationFrameRef = useRef<number>();
  const cellSize = 10; // 小さいセルサイズでもOK

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const cols = Math.ceil(canvas.width / cellSize);
    const rows = Math.ceil(canvas.height / cellSize);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const col = Math.floor(e.clientX / cellSize);
      const row = Math.floor(e.clientY / cellSize);
      const radius = Math.floor(Math.random() * 2) + 1;

      for (let y = row - radius; y <= row + radius; y++) {
        for (let x = col - radius; x <= col + radius; x++) {
          if (x >= 0 && x < cols && y >= 0 && y < rows) {
            if (Math.random() > 0.2) {
              const key = `${x},${y}`;
              const cell = {
                x: x * cellSize,
                y: y * cellSize,
                alpha: 1,
              };

              cellsRef.current.set(key, cell);

              // Use GSAP to animate alpha
              gsap.to(cell, {
                alpha: 0,
                duration: 0,
                delay: 0.1 + Math.random() * 0.4,
                ease: "none",
                onComplete: () => {
                  cellsRef.current.delete(key);
                },
              });
            }
          }
        }
      }
    };

    // Animation loop - GSAP updates cell.alpha, we just draw
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw cells (GSAP animates the alpha values)
      cellsRef.current.forEach((cell) => {
        if (cell.alpha > 0.01) {
          ctx.fillStyle = `rgba(255, 255, 255, ${cell.alpha})`;
          ctx.fillRect(cell.x, cell.y, cellSize, cellSize);
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // Cleanup GSAP animations
      cellsRef.current.forEach((cell) => {
        gsap.killTweensOf(cell);
      });
      cellsRef.current.clear();
    };
  }, []);

  return (
    <>   
      <div className="curzr" hidden>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path className="inner" d="M25,30a5.82,5.82,0,0,1-1.09-.17l-.2-.07-7.36-3.48a.72.72,0,0,0-.35-.08.78.78,0,0,0-.33.07L8.24,29.54a.66.66,0,0,1-.2.06,5.17,5.17,0,0,1-1,.15,3.6,3.6,0,0,1-3.29-5L12.68,4.2a3.59,3.59,0,0,1,6.58,0l9,20.74A3.6,3.6,0,0,1,25,30Z" fill="#F2F5F8" />
          <path className="outer" d="M16,3A2.59,2.59,0,0,1,18.34,4.6l9,20.74A2.59,2.59,0,0,1,25,29a5.42,5.42,0,0,1-.86-.15l-7.37-3.48a1.84,1.84,0,0,0-.77-.17,1.69,1.69,0,0,0-.73.16l-7.4,3.31a5.89,5.89,0,0,1-.79.12,2.59,2.59,0,0,1-2.37-3.62L13.6,4.6A2.58,2.58,0,0,1,16,3m0-2h0A4.58,4.58,0,0,0,11.76,3.8L2.84,24.33A4.58,4.58,0,0,0,7,30.75a6.08,6.08,0,0,0,1.21-.17,1.87,1.87,0,0,0,.4-.13L16,27.18l7.29,3.44a1.64,1.64,0,0,0,.39.14A6.37,6.37,0,0,0,25,31a4.59,4.59,0,0,0,4.21-6.41l-9-20.75A4.62,4.62,0,0,0,16,1Z" fill="#111920" />
        </svg>
      </div>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-10"
        style={{ imageRendering: "pixelated" }}
      /> 
    </>
  );
}
