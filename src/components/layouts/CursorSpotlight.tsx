import { useEffect, useRef } from 'react';

export default function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current) return;

      const { clientX, clientY } = e;
      spotlightRef.current.style.setProperty('--x', `${clientX}px`);
      spotlightRef.current.style.setProperty('--y', `${clientY}px`);
    };

    const handleMouseLeave = () => {
      if (!spotlightRef.current) return;
      // マウスが画面外に出たときは中央に戻す
      const rect = document.body.getBoundingClientRect();
      spotlightRef.current.style.setProperty('--x', `${rect.width / 2}px`);
      spotlightRef.current.style.setProperty('--y', `${rect.height / 2}px`);
    };

    // 初期化時に中央に配置
    if (spotlightRef.current) {
      const rect = document.body.getBoundingClientRect();
      spotlightRef.current.style.setProperty('--x', `${rect.width / 2}px`);
      spotlightRef.current.style.setProperty('--y', `${rect.height / 2}px`);
    }

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="cursor-spotlight"
      aria-hidden="true"
    />
  );
}

