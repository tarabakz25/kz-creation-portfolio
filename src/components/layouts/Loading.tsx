import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

import titleTextImage from '~/assets/images/kz_creation.svg?url';

interface Cell {
  id: number;
  row: number;
  col: number;
  distance: number;
}

interface LoadingContentProps {
  onComplete?: () => void;
}

const Loading: React.FC<LoadingContentProps> = ({ onComplete }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);
  
  const GRID_SIZE = 24;
  const CELL_SIZE = 40;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const calculatedCols = Math.ceil(window.innerWidth / CELL_SIZE);
    const calculatedRows = Math.ceil(window.innerHeight / CELL_SIZE);
    setCols(calculatedCols);
    setRows(calculatedRows);

    const centerX = Math.floor(calculatedCols / 2);
    const centerY = Math.floor(calculatedRows / 2);

    const cells: Cell[] = [];
    let id = 0;
    for (let row = 0; row < calculatedRows; row ++) {
      for (let col = 0; col < calculatedCols; col ++) {
        const distance = Math.hypot(col - centerX, row - centerY);
        cells.push({ id: id++, row, col, distance });
      }
    }

    // 完全ランダムにシャッフル
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cells[i], cells[j]] = [cells[j], cells[i]];
    }

    const timeline = gsap.timeline();

    cells.forEach((cell, index) => {
      const cellElement = document.querySelector(`[data-cell-id="${cell.id}"]`);
      if (cellElement) {
        // 完全ランダムな遅延時間（0〜2秒の範囲）
        const staggerDelay = Math.random() * 2;
        timeline.to(cellElement, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.in",
        }, staggerDelay);
      }
    });

    timeline.eventCallback("onComplete", () => {
      setIsAnimating(false);
      onComplete?.();
    });

    return () => {
      timeline.kill();
    }

  }, [onComplete, CELL_SIZE]);

  if (cols === 0 || rows === 0) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-[#252525]" ref={contentRef}>
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <img src={titleTextImage} alt="Loading..." className="w-64 h-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#252525]" ref={contentRef}>
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <img src={titleTextImage} alt="Loading..." className="w-64 h-auto" />
      </div>

      <div
        ref={containerRef}
        className="absolute inset-0 z-1"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${rows}, ${CELL_SIZE}px)`,
          gap: "0",
          padding: "0",
        }}
      >
        {Array.from({ length: rows * cols }).map((_, index) => (
          <div
            key={index}
            data-cell-id={index}
            className="bg-[#fcfcfc]"
            style={{
              willChange: "opacity, transform",
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Loading;
