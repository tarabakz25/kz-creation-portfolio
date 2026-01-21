import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HoverCornerButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

/**
 * ホバー時にコーナーがアニメーションするボタンコンポーネント
 * GSAPを使用した滑らかなアニメーション
 */
export const HoverCornerButton: React.FC<HoverCornerButtonProps> = ({
  children,
  onClick,
  className = '',
}) => {
  const containerRef = useRef<HTMLButtonElement>(null);
  const topLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const topLeft = topLeftRef.current;
    const bottomRight = bottomRightRef.current;

    if (!container || !topLeft || !bottomRight) return;

    gsap.set(topLeft, { opacity: 0, x: 0, y: 0 });
    gsap.set(bottomRight, { opacity: 0, x: 0, y: 0 });

    const handleMouseEnter = () => {
      gsap.killTweensOf([topLeft, bottomRight]);

      gsap.to(topLeft, {
        opacity: 1,
        x: -4,
        y: -4,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      gsap.to(bottomRight, {
        opacity: 1,
        x: 4,
        y: 4,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handleMouseLeave = () => {
      gsap.killTweensOf([topLeft, bottomRight]);

      gsap.to(topLeft, {
        opacity: 0,
        x: 2,
        y: 2,
        duration: 0.15,
        ease: 'power2.in',
        overwrite: 'auto',
      });

      gsap.to(bottomRight, {
        opacity: 0,
        x: -2,
        y: -2,
        duration: 0.15,
        ease: 'power2.in',
        overwrite: 'auto',
      });
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={containerRef}
      onClick={onClick}
      type="button"
      className={`relative inline-flex items-center justify-center bg-transparent px-4 py-2 text-[#FCFCFC] font-eurostile font-regular text-xl transition-colors duration-300 hover:text-[#E5E5E5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5E5E5] ${className}`}
    >
      <div
        ref={topLeftRef}
        className="pointer-events-none absolute left-0 top-0"
        style={{ opacity: 0 }}
      >
        <div className="h-0.5 w-3 bg-current" />
        <div className="h-3 w-0.5 bg-current" />
      </div>
      <div
        ref={bottomRightRef}
        className="pointer-events-none absolute bottom-0 right-0"
        style={{ opacity: 0 }}
      >
        <div className="absolute bottom-0 right-0 h-0.5 w-3 bg-current" />
        <div className="absolute bottom-0 right-0 h-3 w-0.5 bg-current" />
      </div>
      <span className="relative z-10">{children}</span>
    </button>
  );
};
