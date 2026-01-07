import { use, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CursorEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<number>(0);
  const MAX_LINES = 1;
  
  const createLine = (x: number, y: number) => {
    if(activeLineRef.current >= MAX_LINES) return;
    const line = document.createElement('div');
    line.className = 'absolute w-1 h-1 bg-white rounded-full transform-left';
    line.style.left = `${x}px`;
    line.style.top = `${y}px`;
    
    const angle = [45, 135, 225, 315];
    const randomAngle = angle[Math.floor(Math.random() * angle.length)];
    line.style.transform = `rotate(${randomAngle}deg)`;
    
    containerRef.current?.appendChild(line);
    activeLineRef.current++;
    
    const maxLength = 100;
    const tl = gsap.timeline({
      onComplete: () => {
        line.remove();
        activeLineRef.current--;
      }
    });
    
    tl.to(line, {
      width: maxLength,
      duration: 0.5,
      ease: 'power2.inOut'
    }).to(line, {
      x: maxLength,
      width: 0,
      duration: 0.5,
      ease: 'power2.inOut'
    });
  };
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      createLine(clientX, clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div ref={containerRef} className='fixed inset-0 pointer-events-none z-[40] overflow-hidden' area-hidden='true' />
  )
};