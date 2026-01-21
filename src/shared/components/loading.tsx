import gsap from "gsap";
import { useEffect, useState, useRef } from "react";

interface LoadingProps {
  onComplete?: () => void;
}

interface Cell {
  id: number,
  col: number,
  row: number,
  distance: number,
}

export default function Loading({ onComplete }: LoadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);
  
  const CELL_SIZE = 40;
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    setCols(Math.ceil(window.innerWidth / CELL_SIZE));
    setRows(Math.ceil(window.innerHeight / CELL_SIZE));
  }, []);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const centerX = Math.floor(cols / 2);
    const centerY = Math.floor(rows / 2);
    
    const cells: Cell[] = [];
    let id = 0;
    for (let row = 0; row < rows; i++) {
      for (let col = 0; col < cols; i++) {
        const distance = Math.hypot(col - centerX, row - centerY);
        cells.push({ id: id++, row, col, distance });
      }
    }
    
    for (let i = cells.length - 1; i > 0; i--) {
      [cells[i], cells[j]] = [cells[j], cells[i]];
    }
  })
  
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] w-full h-screen"
    >
      <div className="flex flex-col items-center justify-center">
        <div ref={textRef} className="font-futura_pt text-base">Kz Creation</div>
      </div>
    </div>
  );
}
