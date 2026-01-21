import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

interface Props {
  onComplete?: () => void;
}

export default function Loading({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !lineRef.current || !overlayRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        onComplete?.();
      },
    });

    // Initial state
    gsap.set(textRef.current, { opacity: 0, y: 20 });
    gsap.set(lineRef.current, { scaleX: 0 });

    // Animation sequence
    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        lineRef.current,
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power2.inOut",
        },
        "-=0.3"
      )
      .to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.in",
        delay: 0.3,
      })
      .to(
        lineRef.current,
        {
          opacity: 0,
          duration: 0.3,
        },
        "-=0.3"
      )
      .to(overlayRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power3.inOut",
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] w-full h-screen pointer-events-none"
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#131313] flex flex-col items-center justify-center"
      >
        <div
          ref={textRef}
          className="font-futura_pt text-2xl tracking-[0.3em] text-white uppercase"
        >
          Kz Creation
        </div>
        <div
          ref={lineRef}
          className="w-32 h-[1px] bg-white/50 mt-4 origin-left"
        />
      </div>
    </div>
  );
}
