import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

interface Props {
  children: React.ReactNode;
}

export default function ItemEffect({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  
  return (
    <div
      ref={containerRef}
      className='fixed inset-0 pointer-events-none z-40 overflow-hidden'
      aria-hidden='true'
    >
      <div
        ref={circleRef}
        className='absolute w-5 h-5 bg-white rounded-full opacity-100 will-change-transform pointer-events-auto'
        style={{
          top: 0,
          left: 0,
          transform: 'translate(-50%, -50%) scale(0)'
        }}
      >
      </div>
    </div>
  )
}