import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export const MenuHover = ({ children, href, className }: Props) => {
  const lineTopRef = useRef<HTMLDivElement>(null);
  const lineBottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([lineTopRef.current, lineBottomRef.current], { scaleX: 0 });

      containerRef.current?.addEventListener("mouseenter", () => {
        gsap.to([lineTopRef.current, lineBottomRef.current], {
          scaleX: 1,
          duration: 0.5,
          ease: "power2.inOut",
        });
      });

      containerRef.current?.addEventListener("mouseleave", () => {
        gsap.to([lineTopRef.current, lineBottomRef.current], {
          scaleX: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="py-1 relative">
      <div
        ref={lineTopRef}
        className="absolute top-1 left-0 w-full h-[0.1rem] bg-white origin-right scale-x-0"
      />
      <a href={href} className={className}>
        {children}
      </a>
      <div
        ref={lineBottomRef}
        className="absolute bottom-0 left-0 w-full h-[0.1rem] bg-white origin-left scale-x-0"
      />
    </div>
  );
};
