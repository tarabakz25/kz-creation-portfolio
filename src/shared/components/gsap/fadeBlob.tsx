import { use, useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export const FadeBlob = ({ children, href, className }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animateSpped = 0.3;
    const ctx = gsap.context(() => {
      gsap.set(blobRef.current, {
        opacity: 0,
        x: -5,
      });

      containerRef.current?.addEventListener('mouseenter', () => {
        gsap.to(textRef.current, {
          x: 5,
          duration: animateSpped,
        });
        gsap.to(blobRef.current, {
          opacity: 1,
          x: 0,
          duration: animateSpped,
        });
      });

      containerRef.current?.addEventListener('mouseleave', () => {
        gsap.to(textRef.current, {
          x: 0,
          duration: animateSpped,
        });
        gsap.to(blobRef.current, {
          opacity: 0,
          x: -5,
          duration: animateSpped,
        });
      });

    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="py-1 flex items-center">
      <div
        ref={blobRef}
        className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-1 opacity-0"
      />
      <a ref={textRef} href={href} className={className}>
        {children}
      </a>
    </div>
  );
};
