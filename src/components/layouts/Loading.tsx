import React, { useEffect, useState, useRef } from 'react';

type Cell = {
  row: number;
  col: number;
};

type Props = {
  gridSize?: number;
  className?: string;
  targetIndices?: number[];
  targetCells?: Cell[];
};

const Loading: React.FC<Props> = ({ gridSize = 32, className = '', targetIndices, targetCells }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [gird, setGrid] = useState<number[][]>([]);

  useEffect(() => {
    if (!contentRef.current) return;

    const cols = Math.ceil(contentRef.current.offsetWidth / gridSize);
    const rows = Math.ceil(contentRef.current.offsetHeight / gridSize);
    const newGrid: number[][] = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => 0)
    );
    setGrid(newGrid);
  }, [gridSize]);

  return (
    <div className="gird h-screen w-full" ref={contentRef}>
      {Array.from({ length: grid.length }).map((_, rowIndex) => (
        <div key={} className="tile bg-neutral-500"></div>
      ))}
    </div>
  )
}
